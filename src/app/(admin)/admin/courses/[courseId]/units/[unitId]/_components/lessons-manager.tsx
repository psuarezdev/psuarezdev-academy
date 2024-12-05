'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import type { Course, Lesson, Unit } from '@prisma/client';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AddLessontModal from './add-lesson-modal';

type UnitWithCourseAndLessons = Unit & {
  course: Course;
  lessons: Lesson[];
};

export const columns: ColumnDef<Lesson>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Título
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('title') ?? 'N/A'}</div>,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Duración
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('duration')}</div>,
  }
];

interface LessonsManagerProps {
  unit: UnitWithCourseAndLessons;
  createLesson: (data: Lesson) => Promise<void>;
  updateLesson: (data: Partial<Lesson>) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  getVideo: (publicId: string) => Promise<string>;
}

export default function LessonsManager({ unit, createLesson, updateLesson, deleteLesson, getVideo }: LessonsManagerProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonToUpdate, setLessonToUpdate] = useState<Lesson & { videoUrl: string | null } | undefined>(undefined);
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: unit.lessons,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const handleLessonModalSubmit = async (data: Partial<Lesson>) => {
    try {
      if (data.id) {
        await updateLesson(data);
      } else {
        await createLesson(data as Lesson);
      }
      router.refresh();
    } catch (err) {
      console.error('Error al enviar el formulario: ', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLesson(id);
      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: 'Error inesperado, por favor intentelo de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setLessonToDelete(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3.5">
        <Input
          className="max-w-sm"
          placeholder="Filtrar títulos..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
        />
        <Button
          onClick={() => {
            setLessonToUpdate(undefined);
            setIsModalOpen(true);
          }}
        >
          Añadir nueva lección
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
                <TableHead>Acciones</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(row.original.id)}
                        >
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => {
                          const {video} = row.original;
                          const lastDotIndex = video.lastIndexOf('.');
                          const fileOriginalName = video.slice(0, lastDotIndex);
                          const videoUrl = await getVideo(fileOriginalName);

                          setLessonToUpdate({
                            ...row.original,
                            videoUrl
                          });
                          setIsModalOpen(true);
                        }}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => setLessonToDelete(row.original.id)}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} fila(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
      {lessonToDelete && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la unidad
                seleccionada y borrará sus datos de nuestros servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setLessonToDelete(null)}
                >
                  Cancelar
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" asChild>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(lessonToDelete)}
                >
                  Confirmar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {isModalOpen && (
        <AddLessontModal
          lesson={lessonToUpdate}
          onSubmit={handleLessonModalSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setLessonToUpdate(undefined);
          }}
        />
      )}
    </div>
  );
}
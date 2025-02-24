'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import type { Course, Rating, User } from '@prisma/client';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UploadPaths } from '@/lib/config';
import { getUploadPath } from '@/lib/utils';
import Description from '@/components/description';
import RatingStars from '@/components/rating-stars';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import RatingModal from './rating-modal';

export type RatingWithRelations = Rating & {
  user: Omit<User, 'password'>;
  course: Course;
};

interface RatingsManagerProps {
  ratings: RatingWithRelations[];
  users: Omit<User, 'password'>[];
  courses: Course[];
  createRating: (data: Omit<Omit<Rating, 'createdAt'>, 'updatedAt'>) => Promise<void>;
  updateRating: (data: Omit<Omit<Rating, 'createdAt'>, 'updatedAt'>) => Promise<void>;
  deleteRating: (id: string) => Promise<void>;
}

export const columns: ColumnDef<RatingWithRelations>[] = [
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Valoración
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        <RatingStars averageRating={row.original.rating} showRating />
      </div>
    ),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Comentario
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        <Description value={row.getValue('comment')} />
      </div>
    ),
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Curso
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <Link className="hover:underline" href={`/admin/courses/${row.original.course.id}`}>
        {
          row.original.course.title.length > 20
            ? row.original.course.title.substring(0, 20)
            : row.original.course.title
        }
      </Link>
    ),
  },
  {
    accessorKey: 'user',
    header: 'Usuario',
    cell: ({ row }) => (
      <div className="flex flex-col items-center transition-transform hover:scale-105">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={getUploadPath(UploadPaths.Avatars, row.original.user.avatar ?? '')}
                  alt="Avatar"
                />
                <AvatarFallback>N/A</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {row.original.user.firstName} {row.original.user.lastName}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];

export default function RatingsManager({ ratings, users, courses, createRating, updateRating, deleteRating }: RatingsManagerProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingToUpdate, setRatingToUpdate] = useState<RatingWithRelations | undefined>(undefined);
  const [ratingToDelete, setRatingToDelete] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: ratings,
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

  const onModalSubmit = async (data: Omit<Omit<Rating, 'createdAt'>, 'updatedAt'>) => {
    try {
      if (data.id && data.id.trim().length > 0) {
        await updateRating(data);
      } else {
        await createRating(data);
      }

      setIsModalOpen(false);
      router.refresh();
    } catch(err) {
      console.error(`Ha ocurrido un error a la hora de ${data.id ? 'actualizar ' : 'añadir'} la valoración:`, err);
      toast({
        title: 'Error',
        description: `Ha ocurrido un error a la hora de ${data.id ? 'actualizar ' : 'añadir'} la valoración`,
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRating(id);
      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: 'Error inesperado, por favor intentelo de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setRatingToDelete(null);
    }
  };

  console.log(ratingToDelete);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3.5">
        <Input
          className="max-w-sm"
          placeholder="Filtrar contenido..."
          value={(table.getColumn('comment')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('comment')?.setFilterValue(event.target.value)}
        />
        <Button
          onClick={() => {
            setRatingToUpdate(undefined);
            setIsModalOpen(true);
          }}
        >
          Añadir valoración
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
                        <DropdownMenuItem
                          onClick={() => {
                            setRatingToUpdate(row.original);
                            setIsModalOpen(true);
                          }}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => {
                            setRatingToDelete(row.original.id);
                            console.log('aqui');
                          }}
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
      {isModalOpen && (
        <RatingModal
          rating={ratingToUpdate}
          users={users}
          courses={courses}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onModalSubmit}
        />
      )}
      {ratingToDelete && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la valoración
                seleccionada y borrará sus datos de nuestros servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  onClick={() => setRatingToDelete(null)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" asChild>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(ratingToDelete)}
                >
                  Confirmar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { type RoadmapData } from '../page';
import { RoadampWithRelations } from './roadmaps-manager';
import { getUploadPath, isValidLevel } from '@/lib/utils';
import { Course, Level } from '@prisma/client';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, UploadPaths } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Editor, type EditorTextChangeEvent } from 'primereact/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CourseSelector from '@/components/course-selector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface RoadmapModal {
  roadmap?: RoadampWithRelations;
  courses: Course[];
  onClose: () => void;
  onSubmit: (data: Partial<RoadmapData>) => Promise<void>;
}

const roadmapSchema = z.object({
  id: z.string().optional(),
  courseIds: z.array(z.string(), { message: 'Debes seleccionar al menos 1 curso' }),
  title: z.string({ message: 'El título es obligatorio' })
    .min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  isActive: z
    .string()
    .refine((value) => value === 'true' || value === 'false')
    .default('false'),
  level: z
    .any()
    .refine(
      isValidLevel,
      `El nivel debe ser uno de los siguientes: ${Object.values(Level).join(', ')}`
    ),
  image: z
    .any()
    .refine(
      (files) => {
        if(files?.length === 0) return true;
        return files?.length > 0 && files?.[0]?.size <= MAX_IMAGE_SIZE;
      },
      `Tamaño máximo permitido ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
    )
    .refine(
      (files) => {
        if(files?.length === 0) return true;
        return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
      },
      `Solo los formatos ${ACCEPTED_IMAGE_TYPES.join(', ').replaceAll('image/', '.')} están soportados`
    )
    .optional()
});

type RoadmapFormData = z.infer<typeof roadmapSchema>;

export default function RoadmapModal({ roadmap, courses, onClose, onSubmit }: RoadmapModal) {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(
    roadmap?.image ? getUploadPath(UploadPaths.RoadmapsImages, roadmap?.image) : null
  );

  const form = useForm<RoadmapFormData>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      ...roadmap,
      isActive: roadmap?.isActive ? 'true' : 'false',
      courseIds: roadmap?.courses.map(c => c.id) ?? []
    }
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorTextChange = (e: EditorTextChangeEvent) => {
    setEditorValue(e.htmlValue ?? undefined);
    form.setValue('description', e.htmlValue ?? '');
  };

  const handleSubmit = async (data: RoadmapFormData) => {
    try {
      if(!roadmap?.image || !data.image) {
        return toast({
          title: 'Error',
          description: 'La imagen de la ruta es oblgatoría',
          variant: 'destructive'
        });
      }

      let image: string | undefined = undefined;

      if (data.image) {
        const formData = new FormData();
        formData.set('file', data.image?.[0]);
        formData.set('dir', UploadPaths.RoadmapsImages);

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: formData
        });

        const fileData = await res.json();

        if (fileData?.fileName) {
          image = fileData.fileName as string;
        };

        delete data.image;
      }

      if (!image) {
        throw new Error('La imagen es obligatoria para crear el curso');
      }

      setImagePreview(null);
      setEditorValue(undefined);
      form.reset();
      router.refresh();
      onClose();
    } catch (err) {
      console.error('Error enviando el formulario:', err);
      toast({
        title: 'Error',
        description: 'Error inesperado al crear el curso',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nueva ruta</DialogTitle>
          <DialogDescription>
            Añade un nuevo curso al sistema.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full flex justify-center">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={imagePreview ?? ''} alt="Avatar" />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                  className="mt-2"
                  {...form.register('image', {
                    onChange: (event) => {
                      handleImageChange(event);
                    }
                  })}
                />
              </div>
            </div>
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activo</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Level).map((value, index) => (
                        <SelectItem key={index} value={value}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="courseIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cursos</FormLabel>
                    <br />
                    <CourseSelector
                      widthClass="w-full"
                      courses={courses}
                      showCheck={false}
                      onSelect={(value) => {
                        if (!value) return;
                        const courseIndex = selectedCourses.findIndex(c => c.id === value.id);

                        if (courseIndex === -1) {
                          const newCourses = [...selectedCourses, value];
                          setSelectedCourses(newCourses);
                          form.setValue(field.name, newCourses.map(c => c.id));
                        } else {
                          const coursesFiltered = selectedCourses
                            .filter(c => c.id !== selectedCourses[courseIndex].id);
                          setSelectedCourses(coursesFiltered);
                          form.setValue(field.name, coursesFiltered.map(c => c.id));
                        }
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <ScrollArea className="h-40 border border-muted p-3">
                <ul className="list-disc pl-5">
                  {selectedCourses.map(selectedCourse => (
                    <li
                      key={selectedCourse.id}
                    >
                      <div className="flex items-center w-full justify-between">
                        {selectedCourse.title.substring(0, 50)}
                        {selectedCourse.title.length > 50 ? '...' : ''}
                        <X
                          className="text-red-500 transition-opacity hover:opacity-80 hover:cursor-pointer"
                          onClick={() => {
                            const coursesFiltered = selectedCourses.filter(c => c.id !== selectedCourse.id);
                            setSelectedCourses(coursesFiltered);
                            form.setValue('courseIds', coursesFiltered.map(c => c.id));
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            <div className="col-span-full">
              {form.formState.errors.courseIds && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.courseIds.message}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <FormLabel>Descripción</FormLabel>
            </div>
            <div className="col-span-full">
              <Editor
                value={editorValue}
                onTextChange={handleEditorTextChange}
                style={{ height: '320px' }}
              />
            </div>
            <div className="col-span-full">
              {form.formState.errors.description && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <DialogFooter className="col-span-full">
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

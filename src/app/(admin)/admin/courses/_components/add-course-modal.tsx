'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import * as z from 'zod';
import { Category, Course, Level, User } from '@prisma/client';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, UploadPaths } from '@/lib/config';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { cn, isValidLevel } from '@/lib/utils';
import InstructorSelector from '../../../../../components/instructor-selector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import CategorySelector from '../../../../../components/category-selector';

interface AddCourseModalProps {
  authUser: Omit<User, 'password'>;
  users: Omit<User, 'password'>[];
  categories: Category[];
  onSubmit: (data: Omit<Omit<Omit<Course, 'id'>, 'createdAt'>, 'updatedAt'>) => Promise<void>;
}

const prerequisitesRegex = /^([a-zA-Z]+(?:, [a-zA-Z]+)*)$/;

const courseSchema = z.object({
  userId: z.string().min(1, 'El instructor es obligatorio'),
  categoryId: z.string().min(1, 'La categoria es obligatoría'),
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
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
  prerequisites: z
    .any()
    .refine(
      (str: string) => (str ?? '').length === 0 || prerequisitesRegex.test(str),
      'Los prerequisitos deben estar se parados por ", "'
    ),
  image: z
    .any()
    .refine(
      (files) => files?.length > 0 && files?.[0]?.size <= MAX_IMAGE_SIZE,
      `Tamaño máximo permitido ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      `Solo los formatos ${ACCEPTED_IMAGE_TYPES.join(', ').replaceAll('image/', '.')} están soportados`
    )
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function AddCourseModal({ authUser, users, categories, onSubmit }: AddCourseModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CourseFormData>({ resolver: zodResolver(courseSchema) });
  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleSubmit = async (data: CourseFormData) => {
    try {
      let image = {
        imageUrl: undefined,
        imagePublicId: undefined
      };

      if (data.image) {
        const formData = new FormData();
        formData.set('file', data.image?.[0]);
        formData.set('dir', UploadPaths.CoursesImages);

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: formData
        });

        const fileData = await res.json();

        if (fileData?.secureUrl && fileData?.publicId) {
          image = {
            imageUrl: fileData.secureUrl,
            imagePublicId: fileData.publicId
          }
        };
        
        delete data.image;
      }

      if (!image.imageUrl || !image.imagePublicId) {
        throw new Error('La imagen es obligatoria para crear el curso');
      }

      await onSubmit({
        ...data,
        imageUrl: image.imageUrl,
        imagePublicId: image.imagePublicId,
        duration: 0,
        averageRating: 0,
        lessons: 0,
        isActive: data.isActive === 'true',
        level: data.level,
        prerequisites: data.prerequisites ?? null
      });
      setImagePreview(null);
      setEditorValue(undefined);
      form.reset();
      router.refresh();
    } catch (err) {
      console.error('Error enviando el formulario:', err);
      toast({
        title: 'Error',
        description: 'Error inesperado al crear el curso',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    if (authUser.role === 'instructor') {
      form.setValue('userId', authUser.id);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Añadir nuevo curso</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo curso</DialogTitle>
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
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="prerequisites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prerequisitos</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Prerequisito 1, Prerequisito 2, Prerequisito 3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {authUser.role === 'admin' && (
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profesor</FormLabel>
                    <br />
                    <InstructorSelector
                      widthClass="w-full"
                      users={users}
                      onSelect={(user) => {
                        if (user) form.setValue(field.name, user.id);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className={cn(authUser.role === 'instructor' && 'col-span-full')}>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <br />
                    <CategorySelector
                      widthClass="w-full"
                      categories={categories}
                      onSelect={(category) => {
                        if (category) form.setValue(field.name, category.id);
                      }}
                    />
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

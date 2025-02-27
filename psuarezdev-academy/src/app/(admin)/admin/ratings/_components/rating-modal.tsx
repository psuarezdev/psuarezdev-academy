'use client'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import UserSelector from '@/components/user-selector';
import { Course, Rating, User } from '@prisma/client';
import { RatingWithRelations } from './ratings-manager';
import CourseSelector from '@/components/course-selector';

interface RatingModalProps {
  rating?: RatingWithRelations;
  courses: Course[];
  users: Omit<User, 'password'>[];
  onClose: () => void;
  onSubmit: (data: Omit<Omit<Rating, 'createdAt'>, 'updatedAt'>) => Promise<void>;
}

const ratingSchema = z.object({
  id: z.string().optional(),
  userId: z.string({ message: 'El usuario es obligatorio' })
    .min(1, { message: 'El usuario es obligatorio' }),
  courseId: z.string({ message: 'El curso es obligatorio' })
    .min(1, { message: 'El curso es obligatorio' }),
  comment: z.string().min(3, 'El comentario debe tener al menos 3 caracteres'),
  rating: z.string({ message: 'La valoración es obligatoria' })
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 5,
      'El valor debe estar entre 0 y 5'
    )
});

type RatingFormData = z.infer<typeof ratingSchema>;

export default function RatingModal({ rating, users, courses, onClose, onSubmit }: RatingModalProps) {
  const [editorValue, setEditorValue] = useState<string | undefined>(rating?.comment ?? undefined);

  const form = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      id: rating?.id ?? undefined,
      userId: rating?.userId ?? undefined,
      courseId: rating?.courseId ?? undefined,
      comment: rating?.comment ?? '',
      rating: rating?.rating?.toString() ?? '0'
    }
  });

  const handleTextEditorChange = (e: EditorTextChangeEvent) => {
    setEditorValue(e.htmlValue ?? undefined);
    form.setValue('comment', e.htmlValue ?? '');
  };

  const handleSubmit = async (data: RatingFormData) => {
    try {
      await onSubmit({
        ...data,
        id: data.id ?? '',
        rating: Number(data.rating)
      });
    } catch (err) {
      console.error('Error enviando el formulario:', err);
    }
  };

  useEffect(() => {
    if (rating) {
      form.setValue('id', rating.id);
      form.setValue('userId', rating.userId);
      form.setValue('courseId', rating.courseId);
    }
  }, []);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{rating ? 'Editar valoración' : 'Añadir nueva valoración'}</DialogTitle>
          <DialogDescription>
            {rating ? 'Edite los detalles de la valoración. Haga clic en Guardar cuando haya terminado.' : 'Añade una nueva valoración al sistema.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valoración</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <br />
                  <UserSelector
                    users={users}
                    defaultValue={rating?.userId}
                    isInstructor={false}
                    onSelect={(value) => {
                      if (value) form.setValue(field.name, value.id);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso</FormLabel>
                    <br />
                    <CourseSelector
                      widthClass="w-full"
                      courses={courses}
                      defaultValue={rating?.courseId}
                      onSelect={(value) => {
                        if (value) form.setValue(field.name, value.id);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <Editor
                value={editorValue}
                onTextChange={handleTextEditorChange}
                style={{ height: '320px' }}
              />
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

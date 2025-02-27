'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Lesson } from '@prisma/client';
import { ACCEPTED_VIDEO_TYPES, MAX_VIDEO_SIZE, UploadPaths } from '@/lib/config';
import { useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { useToast } from '@/hooks/use-toast';

const lessonSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(3, 'La descripción es obligatoria'),
  duration: z
    .string()
    .refine(value => !isNaN(Number(value)) && Number(value) > 0, 'La duración debe ser mayor que 0'),
  video: z
    .any()
    .refine(
      (files) => files?.length === 0 || files?.[0]?.size <= MAX_VIDEO_SIZE,
      `Tamaño máximo permitido ${MAX_VIDEO_SIZE / 1024 / 1024 / 1024}GB`
    )
    .refine(
      (files) => files?.length === 0 || ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      `Solo los formatos ${ACCEPTED_VIDEO_TYPES.join(', ').replaceAll('video/', '.')} están soportados`
    )
});

type LessonFormData = z.infer<typeof lessonSchema>;

interface AddLessonModalProps {
  lesson?: Lesson;
  onClose: () => void;
  onSubmit: (data: Partial<Lesson>) => Promise<void>;
}

export default function AddLessontModal({ lesson, onClose, onSubmit }: AddLessonModalProps) {
  const { toast } = useToast();
  const [editorValue, setEditorValue] = useState<string | undefined>(lesson?.description);
  const [videoPreview, setVideoPreview] = useState<string | null>(lesson?.video ?? null);
  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title ?? '',
      duration: lesson?.duration?.toString() ?? '0',
      description: lesson?.description ?? ''
    }
  });

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorTextChange = (e: EditorTextChangeEvent) => {
    setEditorValue(e.htmlValue ?? undefined);
    form.setValue('description', e.htmlValue ?? '');
  };

  const handleSubmit = async (data: LessonFormData) => {
    try {
      let video: string | null = null;

      if (data.video) {
        const formData = new FormData();
        formData.set('file', data.video?.[0]);
        formData.set('dir', UploadPaths.CoursesVideos);

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: formData
        });

        const fileData = await res.json();

        if (fileData?.fileName) video = fileData.fileName;
      }

      if(!lesson && !video) {
        throw new Error('El video es obligatorio para crear la lección');
      }

      await onSubmit({
        ...data,
        video: video ?? lesson?.video,
        id: lesson?.id,
        duration: Number(data.duration)
      });
      onClose();
    } catch(err) {
      toast({
        title: 'Error',
        description: `Error al ${lesson?.id ? 'actualizar' : 'crear'} la unidad, ${err}`,
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nueva lección</DialogTitle>
          <DialogDescription>
            Añade una nuevo lección al sistema.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full flex justify-center">
              <div className="flex flex-col items-center">
                {videoPreview && (
                  <div className="mt-4">
                    <video width="320" height="240" controls>
                      <source src={videoPreview} />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                )}
                <Input
                  type="file"
                  accept={ACCEPTED_VIDEO_TYPES.join(', ')}
                  className="mt-2"
                  {...form.register('video', {
                    onChange: (event) => {
                      handleVideoChange(event);
                    }
                  })}
                />
              </div>
            </div>
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
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duración</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step={0.01} {...field} />
                  </FormControl>
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

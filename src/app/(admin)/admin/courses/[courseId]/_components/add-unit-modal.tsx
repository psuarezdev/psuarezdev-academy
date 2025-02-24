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
import { useRouter } from 'next/navigation';
import { Unit } from '@prisma/client';

interface AddUnitModalProps {
  unit?: Unit;
  onClose: () => void;
  onSubmit: (data: { id?: string, title: string }) => Promise<void>;
}

const unitSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres')
});

type UnitFormData = z.infer<typeof unitSchema>;

export default function AddUnitModal({ unit, onClose, onSubmit }: AddUnitModalProps) {
  const router = useRouter();
  const form = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      title: unit?.title ?? ''
    }
  });

  const handleSubmit = async (data: UnitFormData) => {
    try {
      await onSubmit({
        id: unit?.id,
        title: data.title
      });
      onClose();
      router.refresh();
    } catch (err) {
      console.error('Error enviando el formulario:', err);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nueva unidad</DialogTitle>
          <DialogDescription>
            Añade una nuevo unidad al sistema.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

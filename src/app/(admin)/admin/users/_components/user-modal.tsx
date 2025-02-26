'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Role, type User } from '@prisma/client';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, UploadPaths } from '@/lib/config';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUploadPath } from '@/lib/utils';

const userSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  lastName: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
  email: z.string().email('Dirección de correo electrónico no válida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').optional(),
  role: z.enum(['user', 'instructor', 'admin', 'support']),
  title: z.string().optional(),
  github: z.string().url('URL no válida').optional().or(z.literal('')),
  website: z.string().url('URL no válida').optional().or(z.literal('')),
  linkedin: z.string().url('URL no válida').optional().or(z.literal('')),
  avatar: z
    .any()
    .refine((files) => files?.length === 0 || files?.[0]?.size <= MAX_IMAGE_SIZE, `Tamaño máximo permitido ${MAX_IMAGE_SIZE / 1024 / 1024}MB`)
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      `Solo los formatos ${ACCEPTED_IMAGE_TYPES.join(', ').replaceAll('image/', '.')} están soportados`
    )
    .optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  user?: User;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => Promise<void>;
}

export function UserModal({ user, onClose, onSubmit }: UserModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.avatar ? getUploadPath(UploadPaths.Avatars, user.avatar) : null
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...user,
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      password: user ? undefined : '',
      email: user?.email ?? '',
      role: user?.role ?? 'user',
      title: user?.title ?? '',
      github: user?.github ?? '',
      website: user?.website ?? '',
      linkedin: user?.linkedin ?? '',
    },
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

  const handleSubmit = async (data: UserFormData) => {
    try {
      let image: string | undefined = undefined;

      if (data.avatar) {
        const formData = new FormData();
        formData.set('file', data.avatar?.[0]);
        formData.set('dir', UploadPaths.Avatars);

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: formData
        });

        const fileData = await res.json();

        if (fileData?.fileName) {
          image = fileData.fileName as string;
        }

        delete data.avatar;
      }

      await onSubmit({
        ...data,
        avatar: image,
        id: user ? user.id : undefined,
      });
    } catch (err) {
      console.error('Error enviando el formulario:', err);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Editar usuario' : 'Añadir nuevo usuario'}</DialogTitle>
          <DialogDescription>
            {user ? 'Edite los detalles del usuario. Haga clic en Guardar cuando haya terminado.' : 'Añade un nuevo usuario al sistema.'}
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
                  {...form.register('avatar', {
                    onChange: (event) => {
                      handleImageChange(event);
                    }
                  })}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Role).map((value, index) => (
                        <SelectItem key={index} value={value}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Web</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
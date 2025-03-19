'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Role, type User } from '@prisma/client';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, UploadPaths } from '@/lib/config';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { getUploadPath } from '@/lib/utils';

const userSchema = z.object({
  firstName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').optional(),
  lastName: z.string().min(3, 'El apellido debe tener al menos 3 caracteres').optional(),
  email: z.string().email('Dirección de correo electrónico no válida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').optional(),
  role: z.enum(['user', 'instructor', 'admin']),
  title: z.string().optional(),
  github: z.string().url('URL no válida').optional().or(z.literal('')),
  website: z.string().url('URL no válida').optional().or(z.literal('')),
  linkedin: z.string().url('URL no válida').optional().or(z.literal('')),
  image: z
    .any()
    .refine(
      (files) => files?.length === 0 || files?.[0]?.size <= MAX_IMAGE_SIZE,
      `Tamaño máximo permitido ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
    )
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      `Solo los formatos ${ACCEPTED_IMAGE_TYPES.join(', ').replaceAll('image/', '.')} están soportados`
    )
    .optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface EditProfileFormProps {
  authUser: Omit<User, 'password'>;
}

export default function EditProfileForm({ authUser }: EditProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(
    authUser.avatar ? getUploadPath(UploadPaths.Avatars, authUser.avatar) : null
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...authUser,
      image: undefined,
      firstName: authUser?.firstName ?? undefined,
      lastName: authUser?.lastName ?? undefined,
      password: authUser ? undefined : '',
      email: authUser?.email ?? '',
      role: authUser?.role ?? Role.user,
      title: authUser?.title ?? '',
      github: authUser?.github ?? '',
      website: authUser?.website ?? '',
      linkedin: authUser?.linkedin ?? '',
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
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        formData.append(key, data[key as keyof UserFormData]);
      });

      if (data.image?.[0]) {
        formData.append('file', data.image?.[0]);
      }

      formData.delete('image');

      const updateRes = await fetch('/api/profile', {
        method: 'PATCH',
        body: formData
      });

      if (!updateRes.ok) {
        throw new Error('Error al actualizar los datos del perfil');
      }

      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: 'Error al actualizar los datos del perfil',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
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
        <div className="col-span-full">
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
        </div>
        <div className="col-span-full">
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
        </div>
        <div className="col-span-full">
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
        </div>
        <div className="col-span-full">
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

const SignInSchema = z.object({
  email: z.string().min(3, { message: 'El usuario debe tener al menos 3 caracteres' }).email('Correo electrónico inválido'),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

interface SignInFormProps {
  onSignIn: (email: string, password: string) => Promise<boolean>;
}

export default function SignInForm({ onSignIn }: SignInFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      const { email, password } = data;
      const isAuth = await onSignIn(email, password);

      if (!isAuth) {
        setError('Usuario o contraseña incorrecto');
        return;
      }

      router.push('/');
    } catch {
      toast({
        title: 'Error',
        description: 'Se ha producido un error inesperado, inténtelo de nuevo.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Introduce tu correo electrónico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Introduce tu contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
}
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/lib/auth';
import SingInForm from './_components/sign-in-form';

export default function SingIn() {
  const onSignIn = async (email: string, password: string) => {
    'use server';
    const auth = await login(email, password);
    return !!auth;
  };

  return (
    <Card className="w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">PSuareDev Academy</CardTitle>
      </CardHeader>
      <CardContent>
        <SingInForm onSignIn={onSignIn} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Resgistrarse
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
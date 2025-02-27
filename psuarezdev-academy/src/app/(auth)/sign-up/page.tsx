import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { register } from '@/lib/auth';
import SignUpForm from './_components/sign-up-form';

export default function SignUp() {
  const onSignUp = async (firstName: string, lastName: string, email: string, password: string) => {
    'use server';
    const auth = await register(firstName, lastName, email, password);
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
        <SignUpForm onSignUp={onSignUp} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/sign-in" className="text-primary hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
import Link from 'next/link';
import { BookOpen, LogIn, Home } from 'lucide-react';
import { logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/footer';
import SignOutAction from './_components/sign-out-action';

export default function SignOut() {
  const onSignOut = async() => {
    'use server';
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <SignOutAction action={onSignOut} />
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">PSuareDev Academy</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Has Cerrado Sesión</CardTitle>
            <CardDescription className="text-center">
              Gracias por utilizar PSuareDev Academy. ¡Esperamos verte de nuevo pronto!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Tu sesión ha finalizado y has cerrado sesión de forma segura.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar sesión de nuevo
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver a la página principal
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

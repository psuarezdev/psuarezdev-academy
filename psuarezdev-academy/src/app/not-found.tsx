import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">PSuareDev Academy</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">404 - Página No Encontrada</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              ¡Uy! Parece que la página que busca se ha embarcado en su propia aventura de aprendizaje.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <p className="text-muted-foreground">
              No se preocupe, hasta los mejores desarrolladores se equivocan a veces. ¡Volvamos a encarrilarte!
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <BookOpen className="mr-2 h-4 w-4" />
                Explorar cursos
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

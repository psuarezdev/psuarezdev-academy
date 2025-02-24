import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default async function Certificates() {
  const auth = await getAuth();

  if (!auth) return redirect('/');

  const certificates = await prisma.certificate.findMany({
    where: { userId: auth.id }
  });

  if (!certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">No se han encontrado certificados</CardTitle>
            <CardDescription className="text-center">
              Aún no tienes certificados registrados en PSuareDev Academy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Explora nuestros cursos y obtén certificaciones para avanzar en tu aprendizaje.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ir a la página principal
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return redirect(`/certificates/${certificates[0].id}`);
}

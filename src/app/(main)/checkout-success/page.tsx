import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuth } from '@/lib/auth';

export default async function CheckoutSuccess() {
  const auth = await getAuth();

  if(!auth) return redirect('/');

  return (
    <div className="container mx-auto py-10 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">¡Pago Exitoso!</CardTitle>
          <CardDescription className="text-center">
            Tu suscripción ha sido activada correctamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Gracias por suscribirte. Ahora tienes acceso a todas nuestras funciones premium.
          </p>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2">Próximos pasos:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Explora las nuevas funciones en tu panel de control</li>
              <li>Configura tus preferencias de cuenta</li>
              <li>Comienza a usar nuestras herramientas avanzadas</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/">Ir a los cursos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">Ver Perfil</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
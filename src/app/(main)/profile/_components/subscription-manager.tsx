'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { formatDate } from '@/lib/utils';

interface SubscriptionManagerProps {
  subscription: {
    name: string;
    status: string;
    renewalDate: Date;
    isCancelled: boolean;
  };
}

export default function SubscriptionManager({ subscription }: SubscriptionManagerProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/subscriptions', { method: 'PUT' });
      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: `Error inesperado al ${subscription.isCancelled ? 'reactivar' : 'cancelar'} la suscripción`,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={subscription.isCancelled ? 'border-red-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Tu Suscripción
          <Badge variant={subscription.isCancelled ? 'destructive' : 'default'}>
            {subscription.isCancelled ? 'Cancelada' : 'Activa'}
          </Badge>
        </CardTitle>
        <CardDescription>Gestiona tu suscripción actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p>Plan actual: {subscription.name}</p>
          <p>Estado: {subscription.status === 'active' ? 'Activa' : 'Inactiva'}</p>
          <p>
            Fecha de renovación: {formatDate(subscription.renewalDate)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {
          subscription.isCancelled ? (
            <Button onClick={handleClick} disabled={isLoading}>
              {isLoading ? 'Reactivando...' : 'Reactivar Suscripción'}
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Cancelar Suscripción</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Perderás acceso a las funciones premium al final de tu período de facturación actual.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClick} disabled={isLoading}>
                    {isLoading ? 'Cancelando...' : 'Confirmar Cancelación'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
        }
      </CardFooter>
    </Card>
  );
}
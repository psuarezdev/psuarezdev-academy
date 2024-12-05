'use client';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface SubscribeButtonProps {
  children: React.ReactNode;
  priceId: string;
  accessToken?: string;
}

export default function SubscribeButton({ children, priceId, accessToken }: SubscribeButtonProps) {
  const { toast } = useToast();
  
  const handleSubscribe = async() => {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priceId })
      });

      if(!res.ok) throw new Error('Error al suscribirse');

      const checkoutUrl = (await res.json()).url;

      if(!checkoutUrl) throw new Error('Error al suscribirse');

      window.location.href = checkoutUrl; 
    } catch  {
      toast({
        title: 'Error',
        description: 'Error al suscribirse, asegurese que es está autenticado y que no tiene un plan ya activo',
        variant: 'destructive'
      });
    }
  };

  return (
    <Button className="w-full" onClick={handleSubscribe}>
      {children}
    </Button>
  );
}
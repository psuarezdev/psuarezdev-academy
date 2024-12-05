'use client';

import type { Certificate, User } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface CertificateButtonProps {
  authUser: Omit<User, 'password'>;
  courseId: string;
  totalCompleted: number;
  certificate: Certificate | null;
}

export default function CertificateButton({ courseId, certificate, totalCompleted }: CertificateButtonProps) {
  const { toast } = useToast();
  const router = useRouter();
  const disabled = totalCompleted < 100;

  const handleGetCertificate = async() => {
    if(disabled) return;

    if(!!certificate) {
      return router.push(`/certificates/${certificate.id}`);
    }

    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      }); 
      
      
      if(!res.ok) {
        throw new Error('Ha ocurrido un error al generar el certificado');
      }

      const data = await res.json() as Certificate;
      router.push(`/certificates/${data.id}`);
    } catch {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al generar el certificado, asegurate de terminar el curso primero',
        variant: 'destructive'
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className={cn(disabled && 'opacity-50')} onClick={handleGetCertificate}>
            {!!certificate ? 'Ver el certificado' : 'Obtener certificado'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{disabled && 'Debes completar como mínimo el 80% del curso'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
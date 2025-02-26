'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

export default function ShareButton({ courseName }: { courseName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Certificado en ${courseName}`,
        text: 'Mira mi nuevo certificado!',
        url: window.location.href,
      });
    } catch(err) {
      console.error('Error al compartir el certificado:', err);
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Compartir
      </Button>
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              El compartir no está soportado en este navegador.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
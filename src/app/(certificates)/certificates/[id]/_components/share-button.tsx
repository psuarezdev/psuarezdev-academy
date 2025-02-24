'use client';

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function ShareButton({ courseName }: { courseName: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificado en ${courseName}`,
        text: 'Mira mi nuevo certificado!',
        url: window.location.href,
      }).catch((error) => console.error('Error al compartir:', error));
    } else {
      alert('El compartir no está soportado en este navegador.');
    }
  };


  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2 className="w-4 h-4 mr-2" />
      Compartir
    </Button>
  );
}
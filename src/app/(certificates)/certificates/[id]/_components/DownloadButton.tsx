'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Certificate, Course } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import { UploadPaths } from '@/lib/config';
import { getUploadPath } from '@/lib/utils';

interface DownloadButtonProps {
  certificate: Certificate & {
    course: Course;
  };
}

export default function DownloadButton({ certificate }: DownloadButtonProps) {
  const { toast } = useToast();

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('No se pudo descargar la imagen');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo descargar la imagen',
        variant: 'destructive'
      });
    }
  };

  return (
    <Button onClick={async () => {
      await downloadImage(
        getUploadPath(UploadPaths.Certificates, `${certificate.id}.png`),
        `certificado-${certificate.course.title.replaceAll(' ', '-')}.png`
      );
    }}>
      <Download className="w-4 h-4 mr-2" />
      Descargar
    </Button>
  );
}
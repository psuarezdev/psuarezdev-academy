'use client'

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  courseId: string
  initialIsFavorite: boolean
}

export default function FavoriteButton({ courseId, initialIsFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);

    try {
      const res = await fetch(`/api/courses/${courseId}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('Failed to toggle favorite');
      }
    } catch {
      setIsFavorite(!isFavorite);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar los favoritos. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
    >
      <Heart className={isFavorite ? 'text-red-500 fill-current' : ''} />
    </Button>
  );
}


'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, StarHalf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CourseRatingFormProps {
  courseId: string;
  rating: number | undefined;
  comment?: string | null;
}

export function CourseRatingForm({ courseId, rating: initalRating, comment: initialComment }: CourseRatingFormProps) {
  const [rating, setRating] = useState(initalRating ?? 0);
  const [comment, setComment] = useState(initialComment ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRatingChange = (newRating: number) => {
    if (newRating === rating) {
      setRating(rating - 0.5);
    } else {
      setRating(newRating);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/courses/${courseId}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit rating')
      }

      toast({
        title: 'Valoración enviada',
        description: '¡Gracias por tu feedback!',
        variant: 'success'
      });
      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la valoración. Por favor, inténtalo de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className="p-1 focus:outline-none"
            onClick={() => handleRatingChange(value)}
          >
            {value <= rating ? (
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ) : value - 0.5 === rating ? (
              <StarHalf className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ) : (
              <Star className="w-6 h-6 text-gray-300" />
            )}
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Escribe tu reseña aquí..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full"
      />
      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? 'Enviando...' : 'Enviar valoración'}
      </Button>
    </form>
  );
}
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, StarHalf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

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

  const handleEditorTextChange = (e: EditorTextChangeEvent) => {
    setComment(e.htmlValue ?? '');
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
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index + 1}
            type="button"
            className="p-1 focus:outline-none"
            onClick={() => handleRatingChange(index + 1)}
          >
            {(index + 1) <= rating ? (
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ) : (index + 1) - 0.5 === rating ? (
              <div className="flex items-center">
                <StarHalf className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <StarHalf className="h-6 w-6 text-yellow-400 -ml-[23px] mr-1 -scale-x-[1]" />
              </div>
            ) : (
              <Star className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        ))}
      </div>
      <Editor
        value={comment}
        onTextChange={handleEditorTextChange}
        style={{ height: '320px' }}
      />
      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? 'Enviando...' : 'Enviar valoración'}
      </Button>
    </form>
  );
}
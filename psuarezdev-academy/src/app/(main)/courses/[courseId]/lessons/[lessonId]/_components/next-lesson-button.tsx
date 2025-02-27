'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NextLessonButtonProps {
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  disabled: boolean;
  nextLessonUrl: string;
}

export default function NextLessonButton({ isCompleted, disabled, nextLessonUrl, courseId, lessonId }: NextLessonButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleNavigation = async () => {
    try {
      if (!isCompleted) {
        const res = await fetch(
          `/api/courses/${courseId}/lessons/${lessonId}/complete`,
          {
            method: 'POST'
          }
        );

        if(!res.ok) throw new Error('Error al marcar la lección como completada');
      }

      if (disabled) {
        router.refresh();
      } else {
        router.push(nextLessonUrl);
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Error al marcar la lección como completada',
        variant: 'destructive'
      });
    }
  };

  return (
    <Button onClick={handleNavigation}>
      Siguiente lección
      <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
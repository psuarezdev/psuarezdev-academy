'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import type { Comment } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';

interface DeleteCommentButtonProps {
  comment: Comment;
  courseId: string;
  lessonId: string;
}

export default function DeleteCommentButton({ comment, courseId, lessonId }: DeleteCommentButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Trash2
      className="w-6 h-6 text-red-500 transition-colors hover:text-red-700 hover:cursor-pointer"
      onClick={async() => {
        try {
          const res = await fetch(
            `/api/courses/${courseId}/lessons/${lessonId}/comments/${comment.id}`,
            {
              method: 'DELETE'
            }
          );
    
          if(!res.ok) throw new Error('Error al eliminar el comentario.');
          router.refresh();
        } catch {
          toast({
            title: 'Error',
            description: 'Error al eliminar el comentario',
            variant: 'destructive'
          });
        }
      }}
    />
  );
}
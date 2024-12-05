'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Editor } from 'primereact/editor';

interface CommentsFormProps {
  courseId: string;
  lessonId: string;
}

export default function CommentsForm({ courseId, lessonId }: CommentsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (comment.trim().length < 3) {
      setError('El contenido del comentario es obligatorio');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `/api/courses/${courseId}/lessons/${lessonId}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: comment.trim() })
        }
      );

      if(!res.ok) throw new Error('Ha ocurrido un error inesperado.');

      setComment('');
      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error inesperado.',
        variant: 'destructive'
      });
    }

    setIsSubmitting(false);
  };

  const onEmojiPick = (emoji: string) => {
    if (isSubmitting) return;
    setComment(prev => `${prev}${emoji}`);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full" autoComplete="off">
      <div className="flex items-center gap-5 w-full">
        <div className="w-full space-y-2">
          <Editor 
            value={comment}
            onTextChange={(e) => setComment(e.htmlValue ?? '')}
            disabled={isSubmitting}
            style={{ height: '320px' }}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="relative">
          <Smile
            className="w-12 h-12 transition-transform hover:cursor-pointer hover:scale-105"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div className="absolute z-10 top-16 right-0 md:right-5">
              <EmojiPicker
                className="dark:bg-black dark:text-white [&>div>div>div>input]:dark:bg-black [&>div>ul>li>h2]:dark:bg-black [&>div>ul>li>h2]:dark:text-white"
                onEmojiClick={(e) => onEmojiPick(e.emoji)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-start sm:justify-end w-full sm:-ml-[68px]">
        <Button type="submit" disabled={isSubmitting}>
          <Send className="mr-2 h-4 w-4" /> Publicar comentario
        </Button>
      </div>
    </form>
  );
}

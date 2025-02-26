'use client';

import { useState } from 'react';
import { Headset } from 'lucide-react';
import { Editor, type EditorTextChangeEvent } from 'primereact/editor';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SUPPORT_EMAIL } from '@/lib/config';

interface SupportChatProps {
  sendEmail: (content: string) => Promise<void>;
  onClose: () => void;
}

export default function SupportChat({ sendEmail, onClose }: SupportChatProps) {
  const { toast } = useToast();

  const [form, setForm] = useState({ message: '', isSubmitting: false });

  const handleChange = (e: EditorTextChangeEvent) => {
    setForm({
      ...form,
      message: e.htmlValue ?? ''
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setForm({ ...form, isSubmitting: true });

      if (form.message.trim().length < 1) {
        throw new Error('El mensaje no puede estar vacío');
      }

      await sendEmail(form.message);
    } catch {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: form.message.trim().length < 1
          ? 'El mensaje no puede estar vacío'
          : 'Ha ocurrido un error, por favor intentelo de nuevo'
      });
    } finally {
      setForm({ ...form, isSubmitting: false });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Headset className="w-5 h-5 mr-2" />
            <span>Contactar con soporte</span>
          </DialogTitle>
          <DialogDescription>
            <p>
              Consulta todas tus dudas con nuestros agentes vía correo electrónico.
              <br />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-xs italic">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </DialogDescription>
        </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Editor
              value={form.message}
              onTextChange={handleChange}
              style={{ height: '350px' }}
            />
            <Button type="submit" className="w-full mt-3">
              Enviar
            </Button>
          </form>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
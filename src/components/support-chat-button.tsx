'use client';

import { useState } from 'react';
import Stripe from 'stripe';
import type { User } from '@prisma/client';
import { MessageCircleQuestion } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import SupportChat from '@/components/support-chat';

export type SupportChatButtonAuth = Omit<User & {
  accessToken?: string;
  subscription: Stripe.Response<Stripe.Subscription> | null;
}, 'password'>;

export interface SupportChatMessage {
  clientId: string;
  message: string;
}

interface SupportChatButtonProps {
  sendEmail: (content: string) => Promise<void>;
}

export default function SupportChatButton({ sendEmail }: SupportChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <MessageCircleQuestion
                className={`${buttonVariants()} w-14 h-14 hover:cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
              />
            </TooltipTrigger>
            <TooltipContent>
              Chat de soporte
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isOpen && (
        <SupportChat
          sendEmail={sendEmail}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

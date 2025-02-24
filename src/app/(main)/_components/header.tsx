import Link from 'next/link'
import Stripe from 'stripe';
import type { User } from '@prisma/client';
import { BookOpen, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import MobileNav from './mobile-nav';
import DesktopNav from './desktop-nav';

export type HeaderAuth = Omit<User & {
  subscription: Stripe.Response<Stripe.Subscription> | null;
}, 'password'> | null;

interface HeaderProps {
  auth: HeaderAuth;
}

export default async function Header({ auth }: HeaderProps) {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 shadow-sm border-b-[1px] border-b-gray-200 dark:border-b-gray-100/60">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <MobileNav auth={auth} />
      </Sheet>
      <Link href="/" className="flex items-center justify-center lg:ml-3 w-full lg:w-fit transition-opacity hover:opacity-80">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold ml-2">PSuareDev Academy</span>
      </Link>
      <DesktopNav auth={auth} />
    </header>
  );
}
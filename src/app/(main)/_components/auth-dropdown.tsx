import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from '@prisma/client';
import Stripe from 'stripe';
import { Award, GraduationCap, Heart, LogOut, Star, UserIcon } from 'lucide-react';
import { UploadPaths } from '@/lib/config';
import { getUploadPath } from '@/lib/utils';

interface AuthDropdownProps {
  authUser: Omit<User & {
    subscription: Stripe.Response<Stripe.Subscription> | null;
  }, 'password'>;
}

const navLinks = [
  {
    label: 'Perfil',
    href: '/profile',
    icon: UserIcon
  },
  {
    label: 'Certificados',
    href: '/certificates',
    icon: Award
  },
  {
    label: 'Mis favoritos',
    href: '/favorites',
    icon: Heart
  },
  {
    label: 'Mi aprendizaje',
    href: '/my-learning',
    icon: GraduationCap
  },
  {
    label: 'Mis valoraciones',
    href: '/my-ratings',
    icon: Star
  },
];

export default function AuthDropdown({ authUser }: AuthDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
        <Avatar className="h-9 w-9">
          <AvatarImage 
            src={authUser.avatar ? getUploadPath(UploadPaths.Avatars, authUser.avatar) : undefined} 
            alt="Avatar" 
          />
          <AvatarFallback>{authUser.firstName.charAt(0)}{authUser.lastName.charAt(0)}</AvatarFallback>
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <div className="flex flex-col">
            <p className="text-md font-medium">{authUser.firstName} {authUser.lastName}</p>
            <span className="text-sm text-muted-foreground">{authUser.email}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {navLinks.map(navLink => (
          <DropdownMenuItem key={navLink.href} asChild>
            <Link href={navLink.href} className="block w-full text-left" prefetch={false}>
              <navLink.icon className="w-5 h-5 mr-2" />
              {navLink.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="text-red-500" href="/sign-out">
            <LogOut className="w-5 h-5 mr-2" />
            Cerrar sesión
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
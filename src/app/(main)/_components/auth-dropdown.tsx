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
import { Award, GraduationCap, Heart, LogOut, UserIcon } from 'lucide-react';

interface AuthDropdownProps {
  authUser: Omit<User & {
    subscription: Stripe.Response<Stripe.Subscription> | null;
  }, 'password'>;
}

export default function AuthDropdown({ authUser }: AuthDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
        <Avatar className="h-9 w-9">
          <AvatarImage 
            src={authUser.imageUrl ? authUser.imageUrl : undefined} 
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
        <DropdownMenuItem asChild>
          <Link href="/profile" className="block w-full text-left" prefetch={false}>
            <UserIcon className="w-5 h-5 mr-2" />
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/certificates" className="block w-full text-left" prefetch={false}>
            <Award className="w-5 h-5 mr-2" />
            Certificados
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favorites" className="block w-full text-left" prefetch={false}>
            <Heart className="w-5 h-5 mr-2" />
            Mis favoritos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-learning" className="block w-full text-left" prefetch={false}>
            <GraduationCap className="w-5 h-5 mr-2" />
            Mi aprendizaje
          </Link>
        </DropdownMenuItem>
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
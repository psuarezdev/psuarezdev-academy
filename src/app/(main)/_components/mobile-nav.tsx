import Link from 'next/link'
import {
  Award,
  BadgeEuro,
  BookOpen,
  GraduationCap,
  Heart,
  Home,
  LogIn,
  LogOut,
  Shield,
  Star,
  UserIcon
} from 'lucide-react';
import { SheetContent } from '@/components/ui/sheet';
import { DialogTitle } from '@/components/ui/dialog';
import ThemeToogle from '@/components/theme-toggle';
import MobileNavItem from './mobile-nav-item';
import type { HeaderAuth } from './header';

export default function MobileNav({ auth }: { auth: HeaderAuth; }) {
  return (
    <SheetContent side="left">
      <DialogTitle className="mb-3">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-md font-bold ml-2">PSuareDev Academy</span>
        </Link>
      </DialogTitle>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <BookOpen className="h-6 w-6" />
        <span className="sr-only">PSuareDev Academy</span>
      </Link>
      <div className="grid gap-2 py-2">
        <MobileNavItem href="/">
          <Home className="w-5 h-5 mr-2" />
          Inicio
        </MobileNavItem>
        {(auth?.role === 'user' && auth.subscription?.status !== 'active') && (
          <MobileNavItem href="/pricing">
            <BadgeEuro className="w-5 h-5 mr-2" />
            Planes
          </MobileNavItem>
        )}
        <MobileNavItem href="/courses">
          <BookOpen className="w-5 h-5 mr-2" />
          Cursos
        </MobileNavItem>
        {auth && auth.role === 'admin' && (
          <MobileNavItem href="/admin">
            <Shield className="w-6 h-6 mr-2" />
            Admin
          </MobileNavItem>
        )}
        {!auth && (
          <MobileNavItem href="/sign-in">
            <LogIn className="w-5 h-5 mr-2" />
            Acceder
          </MobileNavItem>
        )}
        {auth && (
          <>
            <MobileNavItem href="/profile">
              <UserIcon className="w-5 h-5 mr-2" />
              Perfil
            </MobileNavItem>
            <MobileNavItem href="/certificates">
              <Award className="w-5 h-5 mr-2" />
              Certificados
            </MobileNavItem>
            <MobileNavItem href="/favorites">
              <Heart className="w-5 h-5 mr-2" />
              Mis favoritos
            </MobileNavItem>
            <MobileNavItem href="/my-learning">
              <GraduationCap className="w-5 h-5 mr-2" />
              Mi aprendizaje
            </MobileNavItem>
            <MobileNavItem href="my-ratings">
              <Star className="w-5 h-5 mr-2" />
              Mis valoraciones
            </MobileNavItem>
          </>
        )}
        {auth && (
          <MobileNavItem href="/sign-out">
            <LogOut className="w-5 h-5 mr-2" />
            Salir
          </MobileNavItem>
        )}
        <ThemeToogle className="w-full mt-5" />
      </div>
    </SheetContent>
  );
}

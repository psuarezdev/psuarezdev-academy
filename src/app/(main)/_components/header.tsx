import Link from 'next/link'
import { Award, BadgeEuro, BookOpen, GraduationCap, Heart, Home, LogIn, LogOut, MenuIcon, Shield, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import ThemeToogle from '@/components/theme-toggle';
import NavItem from './nav-item';
import MobileNavItem from './mobile-nav-item';
import { User } from '@prisma/client';
import Stripe from 'stripe';
import AuthDropdown from './auth-dropdown';

interface HeaderProps {
  auth: Omit<User & {
    subscription: Stripe.Response<Stripe.Subscription> | null;
  }, 'password'> | null;
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
        <SheetContent side="left">
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <BookOpen className="h-6 w-6" />
            <span className="sr-only">PSuareDev Academy</span>
          </Link>
          <div className="grid gap-2 py-6">
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
                <MobileNavItem href="/my-learning">
                  <Heart className="w-5 h-5 mr-2" />
                  Mis favoritos
                </MobileNavItem>
                <MobileNavItem href="/my-learning">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Mi aprendizaje
                </MobileNavItem>
                <MobileNavItem href="/sign-out">
                  <LogOut className="w-5 h-5 mr-2" />
                  Salir
                </MobileNavItem>
              </>
            )}
            {!auth && (
              <MobileNavItem href="/sign-in">
                <LogIn className="w-5 h-5 mr-2" />
                Acceder
              </MobileNavItem>
            )}
            <ThemeToogle className="w-full mt-5" />
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center justify-center ml-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">PSuareDev Academy</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <NavItem href="/">
          <Home className="w-5 h-5 mr-2" />
          Inicio
        </NavItem>
        {(auth?.role === 'user' && auth.subscription?.status !== 'active') && (
          <NavItem href="/pricing">
            <BadgeEuro className="w-5 h-5 mr-2" />
            Planes
          </NavItem>
        )}
        <NavItem href="/courses">
          <BookOpen className="w-5 h-5 mr-2" />
          Cursos
        </NavItem>
        {(auth && auth.role === 'admin') && (
          <NavItem href="/admin">
            <Shield className="w-6 h-6 mr-2" />
            Admin
          </NavItem>
        )}
        {!auth && (
          <NavItem href="/sign-in">
            <LogIn className="w-5 h-5 mr-2" />
            Acceder
          </NavItem>
        )}
        <ThemeToogle />
        {auth && <AuthDropdown authUser={auth} />}
      </nav>
    </header>
  );
}
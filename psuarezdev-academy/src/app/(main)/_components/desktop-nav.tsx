/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadgeEuro,
  BookOpen,
  GraduationCap,
  Home,
  LogIn,
  LogOut,
  Shield,
  UserIcon,
  Waypoints,
} from 'lucide-react';
import ThemeToogle from '@/components/theme-toggle';
import NavItem from './nav-item';
import AuthDropdown from './auth-dropdown';
import { HeaderAuth } from './header';
import { MIN_ROADMAPS_SUBSCRIPTION_PRICE } from '@/lib/config';

export default function DesktopNav({ auth }: { auth: HeaderAuth; }) {
  return (
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
      {(((auth?.subscription as any)?.plan?.amount ?? 0) / 100)>= MIN_ROADMAPS_SUBSCRIPTION_PRICE && (
        <NavItem href="/roadmaps">
          <Waypoints className="w-5 h-5 mr-2" />
          Rutas
        </NavItem>
      )}
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
      {auth && (
        <>
          <NavItem href="/profile">
            <UserIcon className="w-5 h-5 mr-2" />
            Perfil
          </NavItem>
          <NavItem href="/my-learning">
            <GraduationCap className="w-5 h-5 mr-2" />
            Mi Aprendizaje
          </NavItem>
          <NavItem href="/sign-out">
            <LogOut className="w-5 h-5 mr-2" />
            Salir
          </NavItem>
        </>
      )}
      <ThemeToogle />
      {auth && <AuthDropdown authUser={auth} />}
    </nav>
  );
}

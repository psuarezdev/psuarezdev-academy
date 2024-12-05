'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, BookOpen, LogOut, ChartColumnStacked } from 'lucide-react';
import type { User } from '@prisma/client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home, admin: true },
  { href: '/admin/users', label: 'Usuarios', icon: Users, admin: true },
  { href: '/admin/categories', label: 'Categorías', icon: ChartColumnStacked, admin: true },
  { href: '/admin/courses', label: 'Cursos', icon: BookOpen }
];

interface AdminSidebarProps { 
  authUser: Omit<User, 'password'> 
  onSignOut: () => Promise<void>;
}

export default function AdminSidebar({ authUser, onSignOut }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <h1 className="px-4 py-3 text-2xl font-bold">PSuareDev Academy</h1>
        <p className="px-4 text-base text-gray-500">Admin Panel</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4">
          {menuItems.map(item => {
            if(item.admin && authUser.role !== 'admin') return null;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton isActive={pathname === item.href} asChild>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={async() => {
          await onSignOut();
          router.push('/sign-out');
        }}>
          <LogOut className="w-6 h-6 mr-2" />
          Cerrar sesión
        </Button>
        <p className="px-4 py-2 text-sm text-gray-500">&copy; 2024 PSuareDev Academy</p>
      </SidebarFooter>
    </Sidebar>
  );
}
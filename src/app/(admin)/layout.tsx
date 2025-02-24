import { redirect } from 'next/navigation';
import { getAuth, logout } from '@/lib/auth';
import ThemeToogle from '@/components/theme-toggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from './_components/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode; }) {
  const auth = await getAuth();

  if (!auth || auth.role === 'user') return redirect('/');

  const onSignOut = async() => {
    'use server';
    logout();
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AdminSidebar authUser={auth} onSignOut={onSignOut} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between h-16 border-b px-4">
            <div className="flex items-center">
              <SidebarTrigger />
              <h2 className="ml-4 text-xl font-semibold">Panel de administrador</h2>
            </div>
            <ThemeToogle />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
import { getAuth } from '@/lib/auth';
import Footer from '@/components/footer';
import Header from './_components/header';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: { children: React.ReactNode; }) {
  const auth = await getAuth();

  if(auth && auth.role === 'instructor') return redirect('/admin/courses');

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header auth={auth} />
      {children}
      <Footer />
    </div>
  );
}
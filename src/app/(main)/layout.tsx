import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import { sendEmail } from '@/lib/resend';
import Footer from '@/components/footer';
import SupportChatButton from '@/components/support-chat-button';
import Header from './_components/header';

export default async function MainLayout({ children }: { children: React.ReactNode; }) {
  const auth = await getAuth();

  if(auth && auth.role === 'instructor') {
    return redirect('/admin/courses');
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header auth={auth} />
      {children}
      <Footer />
      {auth && <SupportChatButton sendEmail={sendEmail} />}
    </div>
  );
}
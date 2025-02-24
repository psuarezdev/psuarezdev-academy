import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import { resend } from '@/lib/resend';
import Footer from '@/components/footer';
import SupportChatButton from '@/components/support-chat-button';
import Header from './_components/header';

export default async function MainLayout({ children }: { children: React.ReactNode; }) {
  const auth = await getAuth();

  if(auth) {
    switch (auth.role) {
      case 'instructor':
        return redirect('/admin/courses');
      case 'support':
        return redirect('/admin/support-messages');
    }
  }

  const sendEmail = async(content: string) => {
    'use server';
    if(!auth || content.trim().length < 1) return;
    
    const res = await resend.emails.send({
      from: `${auth.firstName} ${auth.lastName} <${auth.email}>`,
      to: ['delivered@resend.dev'],
      subject: 'PSuarezDev Academy - Incidencia',
      html: content,
    });

    if(!res.data && res.error) {
      throw new Error(res.error.message);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header auth={auth} />
      {children}
      <Footer />
      {auth && <SupportChatButton sendEmail={sendEmail} />}
    </div>
  );
}
import { Resend } from 'resend';
import { getAuth } from './auth';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(content: string) => {
  'use server';

  const auth = await getAuth();

  if(!auth || content.trim().length < 1) return;
  
  const res = await resend.emails.send({
    from: `${auth?.firstName} ${auth?.lastName} <${auth?.email}>`,
    to: ['delivered@resend.dev'],
    subject: 'PSuarezDev Academy - Incidencia',
    html: content,
  });

  if(!res.data && res.error) {
    throw new Error(res.error.message);
  }
};

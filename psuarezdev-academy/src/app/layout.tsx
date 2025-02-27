import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from '@/providers';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'PSuareDev Academy',
  description: 'PSuareDev Academy es una plataforma de aprendizaje en línea que permite a los usuarios crear, compartir y descubrir cursos sobre una amplia variedad de temas. Desde programación y diseño hasta marketing y desarrollo personal, nuestra comunidad de instructores ofrece contenidos accesibles y de alta calidad para todos los niveles de habilidad. Únete hoy mismo y lleva tus conocimientos al siguiente nivel.',
  authors: [{
    name: 'Pablo Suárez',
    url: 'https://linkedin.com/in/pablosuarezbm/',
  }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

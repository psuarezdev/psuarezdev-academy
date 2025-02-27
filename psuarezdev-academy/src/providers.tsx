'use client';

import { ThemeProvider } from 'next-themes';
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from './components/ui/toaster';

export default function Providers({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <PrimeReactProvider>
        {children}
      </PrimeReactProvider>
    </ThemeProvider>
  );
}
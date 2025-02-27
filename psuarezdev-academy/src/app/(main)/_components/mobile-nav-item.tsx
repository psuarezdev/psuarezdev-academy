'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavItemProps { 
  href: string;
  children: React.ReactNode; 
}

export default function MobileNavItem({ href, children }: MobileNavItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center text-lg font-semibold transition-colors rounded-md p-2',
        href === pathname && 'bg-foreground text-background'
      )}
    >
      {children}
    </Link>
  );
}
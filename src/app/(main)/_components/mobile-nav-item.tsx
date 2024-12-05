import Link from 'next/link';

interface MobileNavItemProps { 
  href: string;
  children: React.ReactNode; 
}

export default function MobileNavItem({ href, children }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className="flex w-full items-center py-2 text-lg font-semibold"
    >
      {children}
    </Link>
  );
}
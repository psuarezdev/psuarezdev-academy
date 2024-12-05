import Link from 'next/link';

const links = [
  {
    label: 'Terminos de servicio',
    href: 'terms-of-service'
  }, 
  {
    label: 'Politica de privacidad',
    href: 'privacy-policy'
  },
  {
    label: 'Politica de cookies',
    href: 'cookie-policy'
  }
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">© 2024 PSuareDev Academy. Todos los derechos reservados.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {links.map((link, index) => (
          <Link 
            key={`footer-link-${index}`}
            href={link.href}
            className="text-xs hover:underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
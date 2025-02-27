import { getAuth } from '@/lib/auth';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { UploadPaths } from '@/lib/config';
import { getUploadPath } from '@/lib/utils';

interface CertificatesLayoutProps {
  children: React.ReactNode;
  params: { id: string; };
}

export default async function CertificatesLayout({ children, params }: CertificatesLayoutProps) {
  const auth = await getAuth();

  if (!auth) return children;

  const certificates = await prisma.certificate.findMany({
    where: { userId: auth?.id }
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:hidden">{children}</div>
      <aside className="w-full md:w-1/3 lg:w-1/4">
        <ScrollArea className="w-screen lg:w-fit h-[250px] lg:h-screen rounded-md border p-4">
          <div className="w-max lg:w-fit flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 ">
            {certificates.map(certificate => (
              <Button
                key={certificate.id}
                variant={certificate.id === params.id ? 'secondary' : 'ghost'}
                className="w-full h-full justify-start"
                asChild
              >
                <Link href={`/certificates/${certificate.id}`}>
                  <Image
                    key={certificate.id}
                    src={getUploadPath(UploadPaths.Certificates, `${certificate.id}.png`)}
                    alt={`Certificado ${certificate.id}`}
                    width={250}
                    height={250}
                  />
                </Link>
              </Button>
            ))}
          </div>
          <ScrollBar className="hidden md:flex" orientation="horizontal" />
        </ScrollArea>
      </aside>
      <div className="hidden lg:block w-full mr-10 2xl:mr-0">{children}</div>
    </div>
  );
}
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ShareButton from './_components/share-button';
import { getAuth } from '@/lib/auth';
import DownloadButton from './_components/DownloadButton';


interface CertificateProps {
  params: { id: string; };
}

export default async function Certificate({ params }: CertificateProps) {
  const auth = await getAuth();

  const certificate = await prisma.certificate.findUnique({
    where: { id: params.id },
    include: { course: true }
  });

  if (!certificate) return redirect('/');

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Image
        className="w-full h-full max-w-[1120px] max-h-[792px] mx-auto"
        src={certificate.imageUrl}
        alt={`Certificado ${certificate.id}`}
        width={1120}
        height={792}
      />
      <div className="flex gap-4 mt-5">
        <DownloadButton certificate={certificate} />
        {auth?.id === certificate.userId && (
          <ShareButton courseName={certificate.course.title} />
        )}
      </div>
    </div>
  );
}
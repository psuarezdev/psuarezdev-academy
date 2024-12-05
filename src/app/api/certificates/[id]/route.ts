import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getFile } from '@/lib/upload';
import { UploadPaths } from '@/lib/config';

export async function GET(req: NextRequest, { params }: { params: { id: string; } }) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: params.id },
      include: { course: true }
    });

    if (!certificate) {
      return NextResponse.json(
        { message: `No se ha encontrado el certificado con id: ${params.id}` },
        { status: 404 }
      );
    }

    const file = await getFile(UploadPaths.Certificates, `${certificate.id}.png`);

    if (!file) {
      return NextResponse.json(
        { message: 'Archivo no encontrado' },
        { status: 404 }
      );
    }

    return new NextResponse(file.stream(), {
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${certificate.id}.png"`,
        'Content-Length': file.size.toString()
      }
    });
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener el certificado' },
      { status: 500 }
    );
  }
}
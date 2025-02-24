import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { UploadPaths } from '@/lib/config';
import { getFile } from '@/lib/upload';
import { isValidUploadPath } from '@/lib/utils';
import { lookup } from 'mime-types';

interface Params {
  params: {
    dir: string;
    fileName: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = await getAuth();
    const { dir, fileName } = params;

    if (!isValidUploadPath(dir)) {
      return NextResponse.json(
        { message: `El campo path no es correcto, debe ser uno de los siguientes: ${Object.values(UploadPaths).join(', ')}` },
        { status: 400 }
      );
    }

    if (auth?.role !== 'admin' && dir === UploadPaths.CoursesVideos) {
      if (!auth || !auth.subscriptionId) {
        return NextResponse.json(
          { message: 'Sin autorización' },
          { status: 401 }
        );
      }
    }

    const file = await getFile(dir as UploadPaths, fileName);

    if (!file) {
      return NextResponse.json(
        { message: 'No se ha encontrado el archivo' },
        { status: 404 }
      );
    }

    return new NextResponse(file, {
      headers: {
        'Content-Type': lookup(fileName) || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Algo salio mal al subir el archivo, error inesperado.' },
      { status: 500 }
    );
  }
}
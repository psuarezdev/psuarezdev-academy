import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/upload';
import { isValidUploadPath } from '@/lib/utils';
import { UploadPaths } from '@/lib/config';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const authUser = await prisma.user.findUnique({
      where: { id: auth.id },
      select: { role: true }
    });

    if (!authUser) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const dir = formData.get('dir') as string;

    if (!file) {
      return NextResponse.json(
        { message: 'El campo file es requerido' },
        { status: 400 }
      );
    }

    if (!isValidUploadPath(dir)) {
      return NextResponse.json(
        { message: `El campo path no es correcto, debe ser uno de los siguientes: ${Object.values(UploadPaths).join(', ')}` },
        { status: 400 }
      );
    }

    if (authUser.role === 'user' && dir !== UploadPaths.Avatars) {
      return NextResponse.json(
        { message: 'Operación no permitida' },
        { status: 401 }
      );
    }

    const fileName = await uploadFile(dir as UploadPaths, file);

    if (!fileName) {
      return NextResponse.json(
        { message: 'Error al subir el archivo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ fileName });
  } catch {
    return NextResponse.json(
      { message: 'Algo salio mal al subir el archivo, error inesperado.' },
      { status: 500 }
    );
  }
}
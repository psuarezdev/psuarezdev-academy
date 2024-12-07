import { type NextRequest, NextResponse } from 'next/server';
import type { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { UploadPaths } from '@/lib/config';
import { remove } from '@/lib/cloudinary';

export async function GET() {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Unathorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(auth);
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');

    let image: {
      imageUrl?: string | null;
      imagePublicId?: string | null;
    } = {
      imageUrl: undefined,
      imagePublicId: undefined
    };

    if (file && file instanceof File) {
      if (auth.imagePublicId) {
        await remove(UploadPaths.Avatars, auth.imagePublicId);
      }

      const formData = new FormData();
      formData.set('file', file);
      formData.set('dir', UploadPaths.Avatars);

      const res = await fetch(`${process.env.BASE_URL}/api/uploads`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        body: formData
      });


      const fileData = await res.json();

      if (fileData?.secureUrl && fileData?.publicId) {
        image = {
          imageUrl: fileData.secureUrl,
          imagePublicId: fileData.publicId
        };
      } else {
        image = {
          imageUrl: auth.imageUrl,
          imagePublicId: auth.imagePublicId
        };
      }
    }

    const body: Partial<User> & { file?: File } = { ...image };

    formData.keys().forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body[key as keyof User] = formData.get(key) as any;
    });

    if (body.password) delete body.password;
    if (body.file) delete body.file;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, subscription, ...currentUser } = auth;

    const updatedUser = await prisma.user.update({
      where: { id: auth.id },
      data: { ...currentUser, ...body },
      omit: { password: true }
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'Error updating the user' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.log('Error:', err);
    return NextResponse.json(
      { message: 'Error inesperado al actualizar el usuario' },
      { status: 500 }
    );
  }
}
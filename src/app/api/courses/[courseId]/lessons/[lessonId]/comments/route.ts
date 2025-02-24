import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { lessonId: string } }) {
  try {
    const auth = await getAuth();
    const body = await req.json();

    if (!auth || !auth.subscription?.status || auth.subscription.status !== 'active') {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    if (!body.content || body.content.length < 3) {
      return NextResponse.json(
        { message: 'El contenido del comentario de tener una longitud mínima de 3 letras' },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        lessonId: params.lessonId,
        userId: auth.id,
        content: body.content
      }
    });

    if (!comment) {
      return NextResponse.json(
        { message: 'Error al crear el comentario' },
        { status: 500 }
      );
    }
    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error al crear el comentario' },
      { status: 500 }
    );
  }
}
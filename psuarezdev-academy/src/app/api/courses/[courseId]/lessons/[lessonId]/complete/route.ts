import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { lessonId: string } }) {
  try {
    const auth = await getAuth();

    if (!auth || !auth.subscription?.status || auth.subscription.status !== 'active') {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: params.lessonId }
    });

    if (!lesson) {
      return NextResponse.json(
        { message: `No se ha encontardo una lección con el id: ${params.lessonId}` },
        { status: 404 }
      );
    }

    const lessonCompletionCreated = await prisma.lessonCompletion.create({
      data: {
        userId: auth.id,
        lessonId: params.lessonId
      }
    });

    if(!lessonCompletionCreated) {
      return NextResponse.json(
        {message: 'Error al marcar la lección como completada'},
        {status: 500}
      );
    }

    return NextResponse.json(lessonCompletionCreated, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error al marcar la lección como completada' },
      { status: 500 }
    );
  }
}
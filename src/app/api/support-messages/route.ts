import { type NextRequest, NextResponse } from 'next/server';
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

    const { content } = await req.json();

    if (!content || content.trim().length < 1) {
      return NextResponse.json(
        { message: 'El contenido del mensaje no puedo estar vacío' },
        { status: 400 }
      );
    }

    const supportMessage = await prisma.supportMessage.create({
      data: {
        userId: auth.id,
        content
      }
    });

    if (!supportMessage) {
      return NextResponse.json(
        { message: 'Error al intentar guardar el mensaje de soporte' },
        { status: 500 }
      );
    }

    return NextResponse.json(supportMessage, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error al intentar guardar el mensaje de soporte' },
      { status: 500 }
    );
  }
}
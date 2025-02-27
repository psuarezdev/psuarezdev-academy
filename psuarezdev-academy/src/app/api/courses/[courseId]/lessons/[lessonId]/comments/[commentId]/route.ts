import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { commentId: string; } }) {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const commentFound = await prisma.comment.findUnique({
      where: {
        id: params.commentId,
        userId: auth.id
      }
    });

    if (!commentFound) {
      return NextResponse.json(
        { message: `No se ha encontrado el comentario con id: ${params.commentId}` },
        { status: 404 }
      );
    }

    const commentDeleted = await prisma.comment.delete({
      where: {
        id: params.commentId,
        userId: auth.id
      }
    });

    if (!commentDeleted) {
      return NextResponse.json(
        { message: 'Error al eliminar el comentario' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Se ha eliminado el comentario' });
  } catch {
    return NextResponse.json(
      { message: 'Error al eliminar el comentario' },
      { status: 500 }
    );
  }
}
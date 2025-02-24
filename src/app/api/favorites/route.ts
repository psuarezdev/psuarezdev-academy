import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const auth = await getAuth();
    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: auth.id },
      include: {
        course: {
          include: {
            units: {
              include: {
                lessons: {
                  include: {
                    lessonCompletions: {
                      where: {
                        userId: auth.id,
                      },
                    },
                  },
                },
              },
            },
          },
        }
      }
    });

    if (!favorites) {
      return NextResponse.json(
        { message: 'No se han encontrado cursos favoritos' },
        { status: 404 }
      );
    }

    return NextResponse.json(favorites.map(f => f.course));
  } catch {
    return NextResponse.json(
      { message: 'Error inesperado al obtener los favoritos' },
      { status: 500 }
    );
  }
}
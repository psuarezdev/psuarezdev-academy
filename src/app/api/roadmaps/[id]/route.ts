import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { MIN_ROADMAPS_SUBSCRIPTION_PRICE } from '@/lib/config';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuth();

    if (
      !auth ||
      !auth.subscription ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (((auth?.subscription as any)?.plan?.amount ?? 0) / 100) < MIN_ROADMAPS_SUBSCRIPTION_PRICE
    ) {
      return NextResponse.json(
        { message: 'Sin Autorización.' },
        { status: 401 }
      );
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: {
        id: params.id,
        isActive: true
      },
      include: {
        courses: {
          orderBy: { step: 'asc' },
          include: {
            course: {
              include: {
                units: {
                  include: {
                    _count: true
                  }
                },
                user: {
                  omit: {
                    password: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if(!roadmap) {
      return NextResponse.json(
        { message: 'No se ha encontrado la ruta' },
        { status: 404 }
      );
    }

    return NextResponse.json(roadmap);
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener los detalles de la ruta' },
      { status: 500 }
    );
  }
}
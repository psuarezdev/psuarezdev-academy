import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuth();

    if (
      !auth ||
      !auth.subscription
    ) {
      // TODO: Add to condition: (((auth?.subscription as any)?.plan?.amount ?? 0) / 100) < MIN_ROADMAPS_SUBSCRIPTION_PRICE
      return NextResponse.json(
        { message: 'Sin Autorización.' },
        { status: 401 }
      );
    }

    const { searchParams } = req.nextUrl;

    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') ?? '1');
    const pageSize = 12;
    const skip = (page - 1) * pageSize;

    const [roadmaps, roadmapsCount] = await Promise.all([
      prisma.roadmap.findMany({
        include: { courses: true },
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        skip,
        take: pageSize,
      }),
      prisma.roadmap.count({
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        }
      })
    ]);

    const totalPages = Math.ceil(roadmapsCount / pageSize);

    return NextResponse.json({ roadmaps, roadmapsCount, totalPages });
  } catch {
    return NextResponse.json(
      { message: 'Algo salio mal al obtener las rutas.' },
      { status: 500 }
    );
  }
}
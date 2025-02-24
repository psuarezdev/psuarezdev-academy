import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') ?? '1');
    const pageSize = 12;
    const skip = (page - 1) * pageSize;

    const [categories, coursesCount, courses] = await Promise.all([
      prisma.category.findMany(),
      prisma.course.count({
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        }
      }),
      prisma.course.findMany({
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        include: {
          category: true,
          user: {
            omit: { password: true }
          }
        },
        orderBy: { averageRating: 'desc' },
        skip,
        take: pageSize,
      })
    ]);

    const totalPages = Math.ceil(coursesCount / pageSize);

    return NextResponse.json({
      categories,
      courses,
      coursesCount,
      totalPages
    });
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener los cursos' },
      { status: 500 }
    );
  }
}
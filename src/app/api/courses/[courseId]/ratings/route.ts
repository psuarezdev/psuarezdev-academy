import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Rating } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId
      },
    });

    const ratings = await prisma.rating.findMany({
      where: {
        courseId: params.courseId
      },
      include: {
        user: {
          omit: { password: true }
        }
      }
    });

    if (!ratings) {
      return NextResponse.json(
        { message: `No se han encontrado valoraciones para el curso con id: ${params.courseId}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ course, ratings });
  } catch {
    NextResponse.json(
      { message: 'Error al obtener las valoraciones' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const auth = await getAuth();

    if (!auth || auth.subscription?.status !== 'active') {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    const { rating, comment } = await req.json();

    if (!rating || (rating < 0.5 || rating > 5)) {
      return NextResponse.json(
        { message: 'El rating es obligatorio y debe estar entre 0.5 y 5' },
        { status: 400 }
      );
    }

    const ratingFound = await prisma.rating.findFirst({
      where: {
        userId: auth.id,
        courseId: params.courseId
      }
    });

    let result: Rating | null = null;

    if (ratingFound) {
      result = await prisma.rating.update({
        where: { id: ratingFound.id },
        data: {
          rating: rating ?? ratingFound.rating,
          comment: comment ?? ratingFound.comment
        }
      });
    } else {
      result = await prisma.rating.create({
        data: {
          userId: auth.id,
          courseId: params.courseId,
          rating,
          comment
        }
      });
    }

    if (!result) {
      return NextResponse.json(
        { message: 'Error al valorar el curso' },
        { status: 500 }
      );
    }

    const ratings = await prisma.rating.findMany({
      where: {
        courseId: params.courseId
      }
    });

    const averageRating = ratings.length > 0
      ? (ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length)
      : 0;

    await prisma.course.update({
      where: { id: params.courseId, },
      data: { averageRating }
    });

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error al valorar el curso' },
      { status: 500 }
    );
  }
}

import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { Rating } from '@prisma/client';

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const auth = await getAuth();

    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        isActive: true
      },
      include: {
        user: {
          omit: { password: true },
        },
        ratings: true,
        units: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json(
        { message: `No se ha encontrado del curso con el id: ${params.courseId}` },
        { status: 404 }
      );
    }

    let rating: Rating | null = null;
    let totalCompleted: number | null = null;
    let isFavorite: boolean | null = null;

    if(auth) {
      isFavorite = (await prisma.favorite.count({
        where: {
          courseId: params.courseId,
          userId: auth.id
        }
      })) === 1;

      rating = await prisma.rating.findFirst({
        where: {
          userId: auth.id,
          courseId: params.courseId
        }
      });

      const units = await prisma.unit.findMany({
        where: {
          courseId: params.courseId
        },
        include: {
          lessons: {
            include: {
              lessonCompletions: {
                where: { userId: auth.id }
              },
              comments: {
                include: {
                  user: {
                    omit: { password: true }
                  }
                }
              }
            }
          },
        }
      });

      const lessons = units.flatMap(unit => unit.lessons);
      totalCompleted = (
        lessons.filter(lesson => lesson.lessonCompletions.length > 0).length / lessons.length
      ) * 100;
    }

    return NextResponse.json({
      ...course,
      rating,
      totalCompleted,
      isFavorite
    });
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener los detalles del curso' },
      { status: 500 }
    );
  }
}
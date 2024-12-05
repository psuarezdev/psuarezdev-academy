import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { courseId: string, lessonId: string } }) {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

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

    if (!units) {
      return NextResponse.json(
        { message: `No se han encontrado unidades para el curso con id: ${params.courseId}` },
        { status: 404 }
      );
    }

    const lessons = units.flatMap(unit => unit.lessons);
    const currentLessonIndex = lessons.findIndex(lesson => lesson.id === params.lessonId);

    if (currentLessonIndex === -1) {
      return NextResponse.json(
        { message: `No existe la lección con id: ${params.lessonId}` },
        { status: 404 }
      );
    }

    const currentLesson = lessons[currentLessonIndex];
    const isCompleted = currentLesson.lessonCompletions.length === 1;
    const totalCompleted = (
      lessons.filter(lesson => lesson.lessonCompletions.length > 0).length / lessons.length
    ) * 100;

    if (totalCompleted < 100 && auth.subscription?.status !== 'active') {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      units, 
      lessons, 
      currentLesson, 
      currentLessonIndex, 
      isCompleted, 
      totalCompleted 
    });
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener los detalles de la lección' },
      { status: 500 }
    );
  }
}
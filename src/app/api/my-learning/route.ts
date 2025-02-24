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

    const courses = await prisma.course.findMany({
      where: {
        units: {
          some: {
            lessons: {
              some: {
                lessonCompletions: {
                  some: {
                    userId: auth.id,
                  },
                },
              },
            },
          },
        },
      },
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
    });

    if (!courses) {
      return NextResponse.json(
        { message: 'Error al obtener el aprendizaje' },
        { status: 500 }
      );
    }

    const results = await Promise.all(courses.map(async(course) => {
      const completedLessons = course.units.reduce((acc, unit) => {
        return acc + unit.lessons.filter(l => l.lessonCompletions.length > 0).length;
      }, 0);
      const progress = course.lessons > 0 ? Math.round((completedLessons / course.lessons) * 100) : 0;
      const certificate = await prisma.certificate.findFirst({
        where: {
          userId: auth.id,
          courseId: course.id
        }
      });

      return {
        ...course,
        completedLessons,
        progress,
        certificate
      };
    }));

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener el aprendizaje' },
      { status: 500 }
    );
  }
}
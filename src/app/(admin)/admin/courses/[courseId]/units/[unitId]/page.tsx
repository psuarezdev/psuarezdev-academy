import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import LessonsManager from './_components/lessons-manager';
import { Lesson } from '@prisma/client';
import { removeFile } from '@/lib/upload';
import { UploadPaths } from '@/lib/config';
import { remove, getVideo } from '@/lib/cloudinary';

interface UnitDetailsProps {
  params: {
    courseId: string;
    unitId: string;
  };
}

export default async function UnitDetails({ params }: UnitDetailsProps) {
  const auth = await getAuth();

  if (!auth) return redirect('/');

  const where: {
    id: string;
    course: {
      id: string;
      userId?: string;
    }
  } = {
    id: params.unitId,
    course: {
      id: params.courseId
    }
  }

  if (auth.role === 'instructor') {
    where.course.userId = auth.id;
  }

  const unit = await prisma.unit.findFirst({
    where,
    include: {
      course: true,
      lessons: true
    }
  });

  if (!unit) return redirect('/admin');

  const updateCurrentLessonDuration = async(key: 'increment' | 'decrement', duration: number) => {
    'use server';
    
    await prisma.course.update({
      where: {
        id: params.courseId,
        units: {
          some: {
            id: unit.id
          }
        }
      },
      data: {
        duration: { [key]: duration },
        lessons: { [key]: 1 }
      }
    });
  };

  const createLesson = async (data: Lesson) => {
    'use server';

    const lessonCreated = await prisma.lesson.create({
      data: {
        ...data,
        unitId: unit.id,
      }
    });

    if (!lessonCreated) {
      throw new Error('Error al crear la lección');
    }

    await updateCurrentLessonDuration('increment', data.duration);
  };

  const updateLesson = async (data: Partial<Lesson>) => {
    'use server';

    const lessonFound = await prisma.lesson.findUnique({
      where: { id: data.id }
    });

    if (!lessonFound) {
      throw new Error(`No se ha encontrado la lección con id: ${data.id}`);
    }

    if (data.video) {
      const lastDotIndex = data.video.lastIndexOf('.');
      const fileOriginalName = data.video.slice(0, lastDotIndex);
      await removeFile(UploadPaths.CoursesVideos, fileOriginalName);
    }

    const newDuration = data.duration ?? lessonFound.duration;
    const oldDuration = lessonFound.duration ?? 0;

    await prisma.lesson.update({
      where: {
        id: data.id
      },
      data: {
        unitId: unit.id,
        title: data.title ?? lessonFound.title,
        duration: newDuration,
        description: data.description ?? lessonFound.description,
        video: data.video ?? lessonFound.video,
      }
    });

    await Promise.all([
      updateCurrentLessonDuration('decrement', oldDuration),
      updateCurrentLessonDuration('increment', newDuration),
    ]);
  };

  const deleteLesson = async (id: string) => {
    'use server';

    const lessonFound = await prisma.lesson.findUnique({ where: { id } });

    if (!lessonFound) {
      throw new Error(`No se ha encontrado la lección con id: ${id}`);
    }

    const lastDotIndex = lessonFound.video.lastIndexOf('.');
    const fileOriginalName = lessonFound.video.slice(0, lastDotIndex);
    await remove(UploadPaths.CoursesVideos, fileOriginalName);

    await updateCurrentLessonDuration('decrement', lessonFound.duration);

    await prisma.lesson.delete({ where: { id } });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/admin/courses/${unit.course.id}`}>
              {unit?.course.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{unit.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl my-10">Lecciones</h1>
      <LessonsManager
        unit={unit}
        createLesson={createLesson}
        updateLesson={updateLesson}
        deleteLesson={deleteLesson}
        getVideo={async(publicId: string) => {
          'use server';
          return getVideo(publicId);
        }}
      />
    </div>
  );
}
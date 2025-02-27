import type { Course, Roadmap } from '@prisma/client';
import prisma from '@/lib/prisma';
import RoadmapsManager from './_components/roadmaps-manager';
import { removeFile } from '@/lib/upload';
import { UploadPaths } from '@/lib/config';

export type RoadmapData = Roadmap & {
  courses: (Course & {
    step: number;
  })[];
};

export default async function Roadmaps() {
  const [roadmaps, courses] = await Promise.all([
    await prisma.roadmap.findMany({
      include: {
        courses: {
          include: {
            course: true
          }
        }
      }
    }),
    await prisma.course.findMany({
      where: {
        isActive: true
      }
    })
  ]);

  const createRoadmap = async(data: RoadmapData) => {
    'use server';

    await prisma.roadmap.create({
      data: {
        ...data,
        courses: {
          create: data.courses.map(course => ({
            step: course.step,
            course: { connect: { id: course.id } }
          }))
        }
      }
    });
  };

  const updateRoadmap = async(data: Partial<RoadmapData>) => {
    'use server';

    if(!data.id) {
      throw new Error('El id de la ruta es obligatorio');
    }

    const roadmapFound = await prisma.roadmap.findUnique({
      where: { id: data.id },
      include: { courses: true }
    });

    if(!roadmapFound) {
      throw new Error(`No existe la ruta con id: ${data.id}`);
    }

    if(roadmapFound.image !== data.image) {
      await removeFile(UploadPaths.RoadmapsImages, roadmapFound.image);
    }

    await prisma.roadmap.update({
      where: {
        id: roadmapFound.id
      },
      data: {
        title: data.title ?? roadmapFound.title,
        description: data.description ?? roadmapFound.description,
        level: data.level ?? roadmapFound.level,
        duration: data.duration ?? roadmapFound.duration,
        averageRating: data.averageRating ?? roadmapFound.averageRating,
        isActive: data.isActive ?? roadmapFound.isActive
      }
    });

    await prisma.roadmapCourse.deleteMany({
      where: {
        roadmapId: roadmapFound.id,
      }
    });

    await prisma.roadmapCourse.createMany({
      data: [
        ...(data.courses ?? []).map(course => ({
          roadmapId: roadmapFound.id,
          courseId: course.id,
          step: course.step
        }))
      ]
    });
  };

  const deleteRoadmap = async(id: string) => {
    'use server';

    const roadmap = await prisma.roadmap.findUnique({ where: { id } });

    if(!roadmap) {
      throw new Error(`No existe la ruta con id: ${id}`);
    }

    await prisma.roadmapCourse.deleteMany({
      where: { roadmapId: roadmap.id }
    });

    await prisma.roadmap.deleteMany({ 
      where: { id: roadmap.id } 
    });

    await removeFile(UploadPaths.RoadmapsImages, roadmap.image);
  };

  return (
    <div className="container mx-auto py-10">
      <RoadmapsManager
        roadmaps={roadmaps}
        courses={courses}
        createRoadmap={createRoadmap}
        updateRoadmap={updateRoadmap}
        deleteRoadmap={deleteRoadmap}
      />
    </div>
  );
}

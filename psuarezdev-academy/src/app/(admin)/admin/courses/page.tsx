import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import CoursesManager from './_components/courses-manager';
import { Course } from '@prisma/client';
import { redirect } from 'next/navigation';
import { UploadPaths } from '@/lib/config';
import { removeFile } from '@/lib/upload';

export default async function Courses() {
  const auth = await getAuth();

  if(!auth) return redirect('/');

  const where: { userId?: string } = {};

  if (auth && auth.role === 'instructor') {
    where.userId = auth.id;
  }

  const [users, categories, courses] = await Promise.all([
    prisma.user.findMany({
      where: { role: 'instructor' },
      omit: { password: true }
    }),
    prisma.category.findMany(),
    prisma.course.findMany({
      where,
      include: {
        category: true,
        user: {
          omit: { password: true }
        }
      }
    })
  ]);

  const createCourse = async(data: Omit<Omit<Omit<Course, 'id'>, 'createdAt'>, 'updatedAt'>) => {
    'use server';

    try {
      await prisma.course.create({
        data: {
          ...data,
          description: data.description
        }
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteCourse = async(id: string) => {
    'use server';
    
    const course = await prisma.course.findUnique({ 
      where: { id }, 
      include: {
        units: true,
        ratings: true
      }
    });

    if(!course) {
      throw new Error(`No existe el curso con id: ${id}`);
    }

    await removeFile(UploadPaths.CoursesImages,  course.image);
    
    await prisma.course.delete({ where: { id } });
  };

  return (
    <div className="container mx-auto py-10">
      <CoursesManager
        authUser={auth}
        users={users}
        categories={categories}
        courses={courses}
        createCourse={createCourse}
        deleteCourse={deleteCourse} 
      />
    </div>
  );
}
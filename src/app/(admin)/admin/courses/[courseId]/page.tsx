import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import EditCourseForm from './_components/edit-course-form';
import { Course } from '@prisma/client';
import UnitsManager from './_components/units-manager';
import { removeFile } from '@/lib/upload';
import { UploadPaths } from '@/lib/config';

interface CourseEditProps {
  params: { courseId: string };
}

export default async function CourseEdit({ params }: CourseEditProps) {
  const auth = await getAuth();

  if(!auth) return redirect('/');

  const where: { id: string, userId?: string } = {
    id: params.courseId
  };

  if (auth && auth.role === 'instructor') {
    where.userId = auth.id;
  }

  const [course, categories, users] = await Promise.all([
    prisma.course.findUnique({
      where,
      include: {
        units: {
          include: { lessons: true }
        }
      }
    }),
    prisma.category.findMany(),
    prisma.user.findMany({
      where: { role: 'instructor' },
      omit: { password: true }
    })
  ]);
  
  if (!course) return redirect('/admin/courses');

  const editCourse = async(data: Partial<Course>) => {
    'use server';
  
    if(data.image) {
      await removeFile(UploadPaths.CoursesImages, course.image);
    }

    await prisma.course.update({
      where,
      data: {
        ...data,
        image: data.image ?? course.image
      }
    });
  };

  const createUnit = async(title: string) => {
    'use server';
    await prisma.unit.create({
      data: {
        title,
        courseId: course.id
      }
    });
  };

  const updateUnit = async(id: string, title: string) => {
    'use server';
    await prisma.unit.update({
      where: { 
        id,
        courseId: course.id 
      },
      data: { title }
    });
  };

  const deleteUnit = async(id: string) => {
    'use server';
    await prisma.unit.delete({ where: { id } });
  };
  
  return (
    <div className="container mx-auto py-10">
      <EditCourseForm
        authUser={auth}
        users={users}
        categories={categories}
        course={course}
        editCourse={editCourse}
      />
      <br />
      <UnitsManager 
        course={course}
        createUnit={createUnit}
        updateUnit={updateUnit}
        deleteUnit={deleteUnit}
      />
    </div>
  );
}

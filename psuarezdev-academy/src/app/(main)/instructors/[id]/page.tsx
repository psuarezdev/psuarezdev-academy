import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import InstructorProfile from './_components/instructor-profile';

interface TeacherPageProps {
  params: { id: string };
  searchParams: { page?: string };
}

export default async function TeacherPage({ params, searchParams }: TeacherPageProps) {
  const page = parseInt(searchParams.page ?? '1');
  const pageSize = 6;

  const [instructor, coursesCount, courses] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.id },
      omit: { password: true }
    }),
    prisma.course.count({
      where: { userId: params.id },
    }),
    prisma.course.findMany({
      where: { userId: params.id },
      include: { category: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { averageRating: 'desc' }
    })
  ]);

  if (!instructor) return redirect('/');

  const ratings = await prisma.rating.findMany({
    where: {
      course: {
        userId: instructor.id
      }
    }
  });

  const totalPages = Math.ceil(coursesCount / pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <InstructorProfile
        instructor={instructor}
        courses={courses}
        currentPage={page}
        totalPages={totalPages}
        ratings={ratings}
      />
    </div>
  );
}
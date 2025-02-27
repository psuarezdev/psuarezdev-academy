import { redirect } from 'next/navigation';
import { Category, Course, User } from '@prisma/client';
import qs from 'qs';
import CoursesContent from './_components/courses-content';

interface CoursesProps {
  searchParams: {
    q: string;
    page: string;
  }
}

export interface CoursesResponse {
  categories: Category[];
  courses: (Course & {
    category: Category;
    user: Omit<User, 'password'>
  })[];
  coursesCount: number;
  totalPages: number;
}

export default async function Courses({ searchParams }: CoursesProps) {
  const queryString = qs.stringify(searchParams, { addQueryPrefix: true });
  const res = await fetch(`${process.env.BASE_URL}/api/courses${queryString}`);

  if (!res.ok) return redirect('/');

  const { categories, courses, totalPages } = await res.json() as CoursesResponse;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explora Nuestros Cursos</h1>
      <CoursesContent
        categories={categories}
        courses={courses}
        currentPage={parseInt(searchParams.page ?? '1')}
        totalPages={totalPages}
        searchQuery={searchParams.q ?? ''}
      />
    </div>
  );
}
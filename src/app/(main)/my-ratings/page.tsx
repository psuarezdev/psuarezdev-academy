import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import RatingCard from '@/components/rating-card';
import Link from 'next/link';

export default async function MyRatings() {
  const auth = await getAuth();

  if (!auth) return redirect('/');

  const ratings = await prisma.rating.findMany({
    where: { userId: auth.id },
    include: { course: true }
  });

  return (
    <main className="container mx-auto py-8">
      <div className="grid gap-6 w-full">
        {ratings.map(rating => (
          <>
            <h2 className="text-center text-3xl font-medium mb-3">
              <Link
                href={`/courses/${rating.courseId}`}
                className="transition-opacity hover:opacity-70"
              >
                {rating.course.title}
              </Link>
            </h2>
            <RatingCard
              className="h-fit"
              rating={{ ...rating, user: auth }}
            />
          </>
        ))}
      </div>
    </main>
  );
}

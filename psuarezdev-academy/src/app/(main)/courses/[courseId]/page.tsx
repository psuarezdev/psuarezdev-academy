import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Course, Lesson, Rating, Unit, User } from '@prisma/client';
import { getAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Description from '@/components/description';
import { CourseRatingForm } from './_components/course-rating-form';
import CourseInfoSection from './_components/course-info-section';
import CourseUnitsList from './_components/course-units-list';
import CourseInstructorCard from './_components/course-instructor-card';
import CourseRatings from './_components/course-ratings';
import CoursePrerequisites from './_components/course-prerequisites';
import FavoriteButton from '@/components/favorite-button';

interface CourseProps {
  params: { courseId: string; };
}

export type CourseResponse = Course & {
  user: Omit<User, 'password'>;
  ratings: Rating[];
  rating: Rating | null;
  totalCompleted: number | null;
  isFavorite: boolean | null;
  units: (Unit & {
    lessons: Lesson[];
  })[];
}

export default async function Course({ params }: CourseProps) {
  const auth = await getAuth();

  const res = await fetch(
    `${process.env.BASE_URL}/api/courses/${params.courseId}`,
    {
      method: 'GET',
      headers: { Authorization: auth ? `Bearer ${auth.accessToken}` : '' }
    }
  );

  if (!res.ok) return redirect('/');

  const course = await res.json() as CourseResponse;

  return (
    <main className="container w-full mx-auto pt-20 flex-1">
      <CourseInfoSection course={course} />
      <section className="w-full px-0 xl:px-12 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <Description value={course.description} />
              <CourseUnitsList isAuth={!!auth} course={course} />
              {(auth && auth.subscription?.status === 'active') && (
                <Card>
                  <CardHeader>
                    <CardTitle>Valora el curso</CardTitle>
                    <CardDescription>
                      Haz clic en una estrella para valorar. Si deseas dar una valoración intermedia,
                      <br />
                      haz clic dos veces en la misma estrella para seleccionar la mitad.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CourseRatingForm
                      courseId={course.id}
                      rating={course.rating?.rating}
                      comment={course.rating?.comment}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="space-y-8">
              <CourseInstructorCard user={course.user} />
              <CourseRatings
                courseId={params.courseId}
                averageRating={course.averageRating}
                ratingsCount={course.ratings.length}
              />
              {course?.prerequisites && (
                <CoursePrerequisites prerequisites={(course.prerequisites ?? []).split(', ')} />
              )}
              <div className="flex items-center gap-2">
                <Button size="lg" className="w-full" asChild>
                  {
                    (!auth || (auth && auth.subscription?.status !== 'active' && (course.totalCompleted ?? 0) < 100)) ? (
                      <Link href="/pricing">
                        Inscribirse Ahora
                      </Link>
                    ) : (
                      <Link href={`/courses/${params.courseId}/lessons/${course.units?.[0]?.lessons?.[0]?.id}`}>
                        Acceder al curso
                      </Link>
                    )
                  }
                </Button>
                {auth && (
                  <FavoriteButton
                    courseId={course.id}
                    initialIsFavorite={course.isFavorite ?? false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

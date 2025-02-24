import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Certificate, Course, Lesson, LessonCompletion, Unit } from '@prisma/client';
import {  Home } from 'lucide-react';
import { getAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MyLearningCourseCard from './_components/my-learning-course-card';

export type MyLearningResponse = Course & {
  units: (Unit & {
    lessons: (Lesson & {
      lessonCompletions: LessonCompletion[];
    })[];
  })[];
  completedLessons: number;
  progress: number;
  certificate: Certificate | null;
};

export default async function MyLearning() {
  const auth = await getAuth();

  if (!auth) return redirect('/');

  const coursesRes = await fetch(`${process.env.BASE_URL}/api/my-learning`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${auth.accessToken}` }
  });

  if (!coursesRes.ok) return redirect('/');

  const courses = (await coursesRes.json() as MyLearningResponse[])
    .sort((a, b) => a.completedLessons - b.completedLessons);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi aprendizaje</h1>
      {!courses || courses.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">No se han encontrado cursos</CardTitle>
              <CardDescription className="text-center">
                Aún no tienes cursos registrados en PSuareDev Academy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Explora nuestros cursos y obtén certificaciones para avanzar en tu aprendizaje.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/courses">
                  <Home className="mr-2 h-4 w-4" />
                  Ir a la página de cursos
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => <MyLearningCourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}
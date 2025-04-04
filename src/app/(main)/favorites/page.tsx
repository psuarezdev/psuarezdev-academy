import Image from 'next/image';
import { BookOpen, Clock, BarChart, Home} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { formatDuration, getUploadPath } from '@/lib/utils';
import { Course, Lesson, LessonCompletion, Unit } from '@prisma/client';
import Link from 'next/link';
import { UploadPaths } from '@/lib/config';

type FavoritesResponse = Course & {
  units: (Unit & {
    lessons: (Lesson & {
      lessonCompletions: LessonCompletion[];
    })[];
  })[];
};

export default async function MyLearning() {
  const auth = await getAuth();

  if (!auth) return redirect('/');

  const coursesRes = await fetch(`${process.env.BASE_URL}/api/favorites`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${auth.accessToken}` }
  });

  if (!coursesRes.ok) return redirect('/');

  const courses = await coursesRes.json() as FavoritesResponse[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis favoritos</h1>
      {!courses || courses.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">No se han encontrado favoritos</CardTitle>
              <CardDescription className="text-center">
                Aún no tienes cursos favoritos registrados en PSuareDev Academy.
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
        {courses.map(course => {
          return (
            <Card key={course.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={getUploadPath(UploadPaths.CoursesImages, course.image)}
                  alt={course.title}
                  width={500}
                  height={250}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{course.lessons} lecciones</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BarChart className="w-4 h-4 mr-2" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>
                      Ver el curso
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/course-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default async function Home() {
  const topCourses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { averageRating: 'desc' },
    include: { category: true, user: true },
    take: 10,
  });

  return (
    <main className="overflow-x-hidden">
      <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Bienvenido a PSuareDev Academy
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Potencia tu carrera con nuestra innovadora plataforma de aprendizaje en línea. Aprende y crece con nosotros.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/courses">
                  Explorar Cursos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Saber más</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <BookOpen className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Cursos de Alta Calidad</h2>
              <p className="text-center text-muted-foreground">
                Accede a cursos diseñados por expertos en la industria.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Users className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Comunidad Activa</h2>
              <p className="text-center text-muted-foreground">
                Conecta con otros estudiantes y profesionales del sector.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Award className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Certificaciones Reconocidas</h2>
              <p className="text-center text-muted-foreground">
                Obtén certificados que impulsarán tu carrera profesional.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
            Top 10 Cursos Destacados
          </h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background">
            <div className="flex w-max space-x-4 p-4">
              {topCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  className="w-[300px]"
                  imageHeightClass="h-36"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/courses">
                Ver Todos los Cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
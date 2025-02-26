import { redirect } from 'next/navigation';
import type { Course, Roadmap, RoadmapCourse, User } from '@prisma/client';
import { getAuth } from '@/lib/auth';
import Description from '@/components/description';
import { Separator } from '@/components/ui/separator';
import RoadmapInstructorCard from './_components/roadmap-instructor-card';
import RoadmapCoursesList from './_components/roadmap-courses-list';
import prisma from '@/lib/prisma';

interface RoadmapProps {
  params: { id: string; };
}

export type RoadampCourseResponse = Course & {
  user: Omit<User, 'password'>;
};

export type RoadmapResponse = Roadmap & {
  instructors:  Omit<User, 'password'>[];
  courses: (RoadmapCourse & {
    course: RoadampCourseResponse;
  })[];
}

export default async function Roadmap({ params }: RoadmapProps) {
  const auth = await getAuth();

  if(!auth) return redirect('/');

  const res = await fetch(
    `${process.env.BASE_URL}/api/roadmaps/${params.id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }
  );

  if (!res.ok) return redirect('/roadmaps');

  const roadmap = await res.json() as RoadmapResponse;

  const certificates = await prisma.certificate.findMany({
    where: { userId: auth.id }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full flex flex-col lg:grid grid-cols-12 lg:space-x-5">
        <section className="col-span-9 relative z-20">
          <div className="w-full py-12 px-6 bg-gradient-to-tr from-muted via-muted to-red-800 dark:from-black dark:via-black/50 dark:to-red-800">
            <h1 className="text-3xl font-bold mb-8">
              Explora Nuestras Rutas de Aprendizaje
            </h1>
            <Description value={roadmap.description} />
          </div>
          <RoadmapCoursesList 
            auth={auth}
            courses={roadmap.courses} 
            certificates={certificates}
          />            
        </section>
        <section className="col-span-3 mt-10 lg:mt-0">
          <h2 className="text-xl font-bold mb-3">
            Profesores
          </h2>
          <Separator className="mb-4" />
          <div className="flex flex-col justify-center gap-3">
            {roadmap.instructors.map(instructor => (
              <RoadmapInstructorCard
                key={`instructor-card-${instructor.id}`}
                instructor={instructor}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

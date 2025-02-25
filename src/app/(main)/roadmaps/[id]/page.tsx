import { redirect } from 'next/navigation';
import type { Course, Roadmap, RoadmapCourse, Unit, User } from '@prisma/client';
import { getAuth } from '@/lib/auth';
import Description from '@/components/description';
import { Separator } from '@/components/ui/separator';
import RoadmapInstructorCard from './_components/roadmap-instructor-card';
import RoadmapCourseCard from './_components/roadmap-course-card';

interface RoadmapProps {
  params: { id: string; };
}

export type RoadampCourseResponse = Course & {
  user: Omit<User, 'password'>;
  units: (Unit & {
    _count: {
      lessons: number;
    }
  })[];
};

type RoadmapResponse = Roadmap & {
  courses: (RoadmapCourse & {
    course: RoadampCourseResponse;
  })[];
}

export default async function Roadmap({ params }: RoadmapProps) {
  const auth = await getAuth();

  const res = await fetch(
    `${process.env.BASE_URL}/api/roadmaps/${params.id}`,
    {
      method: 'GET',
      headers: { Authorization: auth ? `Bearer ${auth.accessToken}` : '' }
    }
  );

  if (!res.ok) return redirect('/roadmaps');

  const roadmap = await res.json() as RoadmapResponse;

  const instructors = roadmap.courses
    .map(c => c.course.user)
    .filter((user, index, self) => index === self.findIndex(u => u.id === user.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full flex flex-col lg:grid grid-cols-12 lg:space-x-5">
        <section className="col-span-9">
          <div className="w-full py-12 px-6 bg-gradient-to-tr from-muted via-muted to-red-800 dark:from-black dark:via-black/50 dark:to-red-800">
            <h1 className="text-3xl font-bold mb-8">
              Explora Nuestras Rutas de Aprendizaje
            </h1>
            <Description value={roadmap.description} />
          </div>
          <div className="flex flex-col justify-center gap-6 bg-muted/65 p-5">
            {roadmap.courses.map(({ course }, index) => (
              <div key={`course-card-${course.id}`} className="flex items-center gap-6 w-full">
                <div className="relative">
                  <div className="py-3 px-5 bg-muted w-fit rounded-full border border-black/60 dark:border-white/60">
                    {index + 1}
                  </div>
                  {index < roadmap.courses.length - 1 && (
                    <Separator className="absolute h-[2px] left-[-84.5px] -bottom-16 -z-10 rotate-90 w-[220px] bg-black/60 dark:bg-white/60" />
                  )}
                </div>
                <RoadmapCourseCard course={course} />
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-3 mt-10 lg:mt-0">
          <h2 className="text-xl font-bold mb-3">
            Profesores
          </h2>
          <Separator className="mb-4" />
          <div className="flex flex-col justify-center gap-3">
            {instructors.map(instructor => (
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

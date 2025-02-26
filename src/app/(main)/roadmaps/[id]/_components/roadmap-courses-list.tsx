import type { Certificate, RoadmapCourse, User } from '@prisma/client';
import { type RoadampCourseResponse } from '../page';
import RoadmapCourseCard from './roadmap-course-card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RoadmapCoursesListProps {
  auth: Omit<User, 'password'>;
  certificates: Certificate[];
  courses: (RoadmapCourse & {
    course: RoadampCourseResponse;
  })[];
}

export default function RoadmapCoursesList({ auth, courses, certificates }: RoadmapCoursesListProps) {
  return (
    <div className="relative flex flex-col justify-center gap-6 bg-muted/65 p-5 overflow-y-hidden -z-10">
      {courses.map(({ course }, index) => {
        const isCompleted = certificates.some(c => c.courseId === course.id && c.userId === auth.id);

        return (
          <div
            key={`course-card-${course.id}`}
            className="flex items-center gap-6 w-full"
          >
            <div className="relative hidden md:block">
              {index === 0 && (
                <div className="-z-10 absolute left-0 bottom-full w-[50px] h-[500px] bg-[#F8F8F8] dark:bg-[#1C1C1C]" />
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={cn(
                      'py-3 px-5 bg-muted w-fit rounded-full border border-black/60 dark:border-white/60',
                      isCompleted && 'bg-green-600 border-green-800 dark:border-green-800'
                    )}>
                      {index + 1}
                    </div>
                  </TooltipTrigger>
                  {isCompleted && (
                    <TooltipContent>Curso completado</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              {index === courses.length - 1 && (
                <div className="-z-10 absolute left-0 top-full w-[50px] h-[500px] bg-[#F8F8F8] dark:bg-[#1C1C1C]" />
              )}
            </div>
            <RoadmapCourseCard course={course} />
          </div>
        );
      })}
      <div
        className="hidden md:block absolute h-full border border-black/60 dark:border-white/60 left-11 -z-20"
      />
    </div>
  );
}

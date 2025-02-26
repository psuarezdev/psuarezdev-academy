import RoadmapCourseCard from './roadmap-course-card';
import { type RoadmapResponse } from '../page';

export default function RoadmapCoursesList({ roadmap }: { roadmap: RoadmapResponse }) {
  return (
    <div className="relative flex flex-col justify-center gap-6 bg-muted/65 p-5 overflow-y-hidden -z-10">
      {roadmap.courses.map(({ course }, index) => (
        <div
          key={`course-card-${course.id}`}
          className="flex items-center gap-6 w-full"
        >
          <div className="relative hidden md:block">
            {index === 0 && (
              <div className="-z-10 absolute left-0 bottom-full w-[50px] h-[500px] bg-white dark:bg-[#1C1C1C]" />
            )}
            <div className="py-3 px-5 bg-muted w-fit rounded-full border border-black/60 dark:border-white/60">
              {index + 1}
            </div>
            {index === roadmap.courses.length - 1 && (
              <div className="-z-10 absolute left-0 top-full w-[50px] h-[500px] bg-white dark:bg-[#1C1C1C]" />
            )}
          </div>
          <RoadmapCourseCard course={course} />
        </div>
      ))}
      <div
        className="hidden md:block absolute h-full border border-black/60 dark:border-white/60 left-11 -z-20"
      />
    </div>
  );
}

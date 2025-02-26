import Link from 'next/link';
import Image from 'next/image';
import { UploadPaths } from '@/lib/config';
import { formatDuration, getUploadPath } from '@/lib/utils';
import RatingStars from '@/components/rating-stars';
import Description from '@/components/description';
import { type RoadampCourseResponse } from '../page';
import { BookOpen, Clock } from 'lucide-react';

export default function RoadmapCourseCard({ course }: { course: RoadampCourseResponse }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="relative flex flex-col md:flex-row items-start gap-3 bg-muted rounded-md p-3 transition-opacity hover:opacity-90 w-full"
    >
      <Image
        className="w-full md:w-[300] object-cover rounded-md"
        src={getUploadPath(UploadPaths.CoursesImages, course.image)}
        alt="Course Image"
        width={300}
        height={300}
      />
      <div className="w-full p-2">
        <h2 className="text-xl font-bold">
          {course.title}
        </h2>
        <div className="text-muted-foreground [&_h2]:text-base mb-5">
          <div className="hidden md:block">
            <Description value={course.description.substring(0, 125)} />
          </div>
          <div className="block md:hidden">
            <Description value={course.description} />
          </div>
        </div>
        <RatingStars averageRating={course.averageRating} showRating />
        <div className="flex items-center">
          <span className="flex items-center text-muted-foreground text-sm mt-1.5">
            <Clock className="w-5 h-5 mr-2" /> {formatDuration(course.duration)}
          </span>
          <span className="text-base text-muted-foreground mx-3">|</span>
          <span className="flex items-center text-muted-foreground text-sm mt-1.5">
            <BookOpen className="w-5 h-5 mr-2" />
            {course.units.reduce((acc, unit) => acc + unit._count.lessons, 0)} lecciones
          </span>
        </div>
      </div>
    </Link>
  );
}

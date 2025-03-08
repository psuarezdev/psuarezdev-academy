'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Certificate } from '@prisma/client';
import { UploadPaths } from '@/lib/config';
import { formatDuration, getUploadPath } from '@/lib/utils';
import RatingStars from '@/components/rating-stars';
import Description from '@/components/description';
import { Award, BookOpen, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type RoadampCourseResponse } from '../page';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface RoadmapCourseCardProps {
  course: RoadampCourseResponse;
  certificate?: Certificate;
}

export default function RoadmapCourseCard({ course, certificate }: RoadmapCourseCardProps) {
  const router = useRouter();

  return (
    <article 
      className="relative flex flex-col lg:flex-row items-start gap-3 bg-muted rounded-md p-3 transition-opacity hover:opacity-90 w-full"
      onClick={() => router.push(`/courses/${course.id}`)}
    >
      <Image
        className="w-full md:w-[300] object-cover rounded-md"
        src={getUploadPath(UploadPaths.CoursesImages, course.image)}
        alt="Course Image"
        width={300}
        height={300}
      />
      <div className="w-full p-2">
        <div className="flex items-center justify-between w-full mb-1">
          <h2 className="text-xl font-bold">{course.title}</h2>
          {!!certificate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    href={`/certificates/${certificate.id}`}
                    className="absolute -top-3 -right-3 bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded-full"
                  >
                    <Award className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Ir al certificado
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="text-muted-foreground [&_h2]:text-base mb-5">
          <div className="hidden md:block">
            <Description value={course.description.substring(0, 125)} />
          </div>
          <div className="block md:hidden">
            <Description value={course.description} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <RatingStars averageRating={course.averageRating} showRating />
          {!!certificate && (
            <Badge variant="success" className="w-fit mt-1.5 lg:mt-0 lg:ml-2">
              Completado
            </Badge>
          )}
        </div>
        <div className="flex items-center text-muted-foreground text-sm mt-1.5">
          <span className="flex items-center">
            <Clock className="w-5 h-5 mr-2" /> {formatDuration(course.duration)}
          </span>
          <span className="text-base text-muted-foreground mx-3">|</span>
          <span className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            {course.lessons} lecciones
          </span>
        </div>
      </div>
    </article>
  );
}

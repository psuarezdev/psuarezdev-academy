'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BarChart, BookOpen, Clock } from 'lucide-react';
import { cn, formatDuration, getUploadPath } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Course, User } from '@prisma/client';
import RatingStars from './rating-stars';
import { UploadPaths } from '@/lib/config';

interface CourseCardProps {
  className?: string;
  imageHeightClass?: string;
  course: Course & { user: Omit<User, 'password'>; };
}

export default function CourseCard({ course, className, imageHeightClass }: CourseCardProps) {
  return (
    <Card className={`flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div>
        <CardHeader className="p-0">
          {getUploadPath(UploadPaths.CoursesImages, course.image)}
          <Image
            className={cn('w-full object-cover rounded-t-lg', imageHeightClass ? imageHeightClass : 'h-48')}
            src={getUploadPath(UploadPaths.CoursesImages, course.image)}
            alt={course.title}
            width={300}
            height={300}
          />
          <CardTitle className="p-4 text-lg">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{course.lessons} Lecciones</p>
          </div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{formatDuration(course.duration)}</p>
          </div>
          <div className="flex items-center mb-4">
            <BarChart className="w-4 h-4 mr-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground capitalize">{course.level}</p>
          </div>
          <Badge variant="secondary" className="mb-2">
            <Link href={`/instructors/${course.user.id}`}>
              {course.user.firstName} {course.user.lastName}
            </Link>
          </Badge>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        <RatingStars averageRating={course.averageRating} />
        <Button asChild>
          <Link href={`/courses/${course.id}`}>
            Ver el curso
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
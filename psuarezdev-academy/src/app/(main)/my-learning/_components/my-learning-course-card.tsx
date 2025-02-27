import Image from 'next/image';
import { BookOpen, Clock, BarChart, Play, CheckCircle, Award } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatDuration, getUploadPath } from '@/lib/utils';
import Link from 'next/link';
import { UploadPaths } from '@/lib/config';
import type { MyLearningResponse } from '../page';

export default function MyLearningCourseCard({ course }: { course: MyLearningResponse }) {
  return (
    <Card className="flex flex-col">
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
            <span>{course.completedLessons}/{course.lessons} lecciones</span>
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
        <Progress className="w-full" value={course.progress} />
        <p className="text-sm text-right mt-1">{course.progress}% completado</p>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex flex-col gap-1.5 w-full">
          {course.certificate && (
            <Button className="w-full" variant={course.completedLessons === course.lessons ? 'secondary' : 'default'} asChild>
              <Link href={`/certificates/${course.certificate.id}`}>
                <Award className="w-4 h-4 mr-2" />
                Certificado
              </Link>
            </Button>
          )}
          <Button className="w-full" variant={course.completedLessons === course.lessons ? 'secondary' : 'default'} asChild>
            <Link href={`/courses/${course.id}`}>
              {course.completedLessons === course.lessons ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completado
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  En curso
                </>
              )}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

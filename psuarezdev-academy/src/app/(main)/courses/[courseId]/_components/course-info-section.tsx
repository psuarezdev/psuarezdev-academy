import Link from 'next/link';
import { Clock, Code, GraduationCap } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDuration, getUploadPath } from '@/lib/utils';
import { CourseResponse } from '../page';
import { UploadPaths } from '@/lib/config';

export default function CourseInfoSection({ course }: { course: CourseResponse; }) {
  return (
    <section className="w-full py-12 md:py-24 bg-muted rounded">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
          <div className="flex flex-col justify-center space-y-4 xl:col-span-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-5">
                {course.title}
              </h1>
              <div className="max-w-[600px] text-muted-foreground md:text-xl">
                <p className="mb-2">Profesor:</p>
                <div className="flex items-center gap-1.5 mb-2">
                  <Avatar>
                    <AvatarImage
                      src={course.user.avatar ? getUploadPath(UploadPaths.Avatars, course.user.avatar) : undefined}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {course.user.firstName?.charAt(0)?.toUpperCase()}
                      {course.user.lastName?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Link className="hover:underline" href={`/instructors/${course.user.id}`}>
                    {course.user.firstName} {course.user.lastName}
                  </Link>
                </div>
                {course.user.title && <p className="text-base">{course.user.title}</p>}
                {course.user.website && (
                  <p className="text-base [&>a]:-ml-2">
                    Web:
                    <a
                      className={buttonVariants({ variant: 'link' })}
                      href={course.user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {course.user.website}
                    </a>
                  </p>
                )}
                {course.user.github && (
                  <p className="text-base [&>a]:-ml-0.5">
                    Github:
                    <a
                      className={buttonVariants({ variant: 'link' })}
                      href={course.user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {course.user.github}
                    </a>
                  </p>
                )}
                {course.user.linkedin && (
                  <p className="text-base [&>a]:-ml-2">
                    linkedIn:
                    <a
                      className={buttonVariants({ variant: 'link' })}
                      href={course.user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {course.user.linkedin}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:flex-col justify-center xl:justify-end">
            <Card className="w-full lg:w-auto">
              <CardHeader>
                <CardTitle>Información del curso</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="capitalize">{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Certificado de finalización</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
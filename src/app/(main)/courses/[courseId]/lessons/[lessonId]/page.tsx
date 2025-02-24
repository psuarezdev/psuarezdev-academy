import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { cn, getUploadPath } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CommentsForm from './_components/comments-form';
import VideoPlayer from './_components/video-player';
import Description from '@/components/description';
import { getAuth } from '@/lib/auth';
import NextLessonButton from './_components/next-lesson-button';
import type { Comment, Lesson, LessonCompletion, Unit, User } from '@prisma/client';
import prisma from '@/lib/prisma';
import CommentsList from './_components/comment-list';
import LessonNavigation from './_components/lesson-navigation';
import { UploadPaths } from '@/lib/config';

interface LessonProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export type LessonWithRelations = Lesson & {
  lessonCompletions: LessonCompletion[];
  comments: (Comment & {
    user: Omit<User, 'password'>;
  })[];
};

export interface LessonResponse {
  units: (Unit & {
    lessons: LessonWithRelations[];
  })[];
  lessons: LessonWithRelations[];
  currentLesson: LessonWithRelations;
  currentLessonIndex: number;
  isCompleted: boolean;
  totalCompleted: number;
}

export default async function Lesson({ params }: LessonProps) {
  const auth = await getAuth();

  if (!auth) {
    return redirect(`/courses/${params.courseId}`);
  }

  const res = await fetch(
    `${process.env.BASE_URL}/api/courses/${params.courseId}/lessons/${params.lessonId}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }
  );

  if (!res.ok) return redirect(`/courses/${params.courseId}`);

  const {
    units,
    lessons,
    currentLesson,
    currentLessonIndex,
    isCompleted,
    totalCompleted
  } = await res.json() as LessonResponse;

  const certificate = await prisma.certificate.findFirst({
    where: {
      userId: auth.id,
      courseId: params.courseId
    }
  });

  if (totalCompleted < 100 && auth.subscription?.status !== 'active') {
    return redirect(`/courses/${params.courseId}`);
  }

  return (
    <main className="flex-1 flex flex-col lg:flex-row">
      <div className="lg:flex-1 p-4 lg:p-6">
        <Button className="mb-3" asChild>
          <Link href={`/courses/${params.courseId}`}>
            Volver al curso
          </Link>
        </Button>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <VideoPlayer src={getUploadPath(UploadPaths.CoursesVideos, currentLesson.video)} />
        </div>
        <div className="mt-4 space-y-4">
          <div className="mb-4">
            <h1 className="flex items-end text-2xl font-bold">
              {currentLesson.title}
              {isCompleted && <Check className="w-6 h-6 ml-1 text-green-500" />}
            </h1>
          </div>
          <div className="text-muted-foreground">
            <Description value={currentLesson.description} />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link
                className={cn(currentLessonIndex === 0 && 'pointer-events-none opacity-50')}
                href={`/courses/${params.courseId}/lessons/${lessons[currentLessonIndex - 1]?.id}`}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Lección anterior
              </Link>
            </Button>
            <NextLessonButton
              isCompleted={isCompleted}
              disabled={currentLessonIndex === lessons.length - 1}
              courseId={params.courseId}
              lessonId={params.lessonId}
              nextLessonUrl={`/courses/${params.courseId}/lessons/${lessons[currentLessonIndex + 1]?.id}`}
            />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-4">
          <CommentsForm courseId={params.courseId} lessonId={params.lessonId} />
          <h3 className="text-lg font-semibold">Comentarios</h3>
          <CommentsList
            authUser={auth}
            courseId={params.courseId}
            lessonId={params.lessonId}
            comments={currentLesson.comments}
          />
        </div>
      </div>
      <LessonNavigation
        authUser={auth}
        courseId={params.courseId}
        units={units}
        currentLesson={currentLesson}
        totalCompleted={totalCompleted}
        certificate={certificate}
      />
    </main>
  );
}

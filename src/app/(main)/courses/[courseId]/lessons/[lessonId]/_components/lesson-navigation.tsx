import Link from 'next/link';
import { PlayCircle, Check } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CertificateButton from './certificate-button';
import type { Certificate, Unit, User } from '@prisma/client';
import { LessonWithRelations } from '../page';

interface LessonNavigationProps {
  authUser: Omit<User, 'password'>;
  courseId: string;
  certificate: Certificate | null;
  units: (Unit & {
    lessons: LessonWithRelations[];
  })[];
  currentLesson: LessonWithRelations;
  totalCompleted: number;
}

export default function LessonNavigation({ authUser, courseId, units, currentLesson, totalCompleted, certificate }: LessonNavigationProps) {
  return (
    <div className="lg:w-80 border-t lg:border-l lg:border-t-0">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Contenido del curso</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="py-2 px-4">
          <Accordion type="multiple" className="w-full">
            {units.map(unit => (
              <AccordionItem key={unit.id} value={unit.id}>
                <AccordionTrigger className="text-start">
                  {
                    unit.title.length > 30
                      ? `${unit.title.substring(0, 30)}...`
                      : unit.title
                  }
                </AccordionTrigger>
                <AccordionContent>
                  {unit.lessons.map(lesson => (
                    <Link key={lesson.id} href={`/courses/${courseId}/lessons/${lesson.id}`}>
                      <div
                        className={cn(
                          'flex items-center justify-between py-2 px-2',
                          currentLesson.id === lesson.id && 'bg-muted rounded'
                        )}
                      >
                        <button
                          className="flex items-center text-sm font-medium text-start"
                        >
                          {lesson.lessonCompletions.length === 1
                            ? <Check className="mr-2 h-8 w-8 text-green-500" />
                            : <PlayCircle className="mr-2 h-8 w-8 text-primary" />
                          }
                          {
                            lesson.title.length > 50
                              ? `${lesson.title.substring(0, 50)}...`
                              : lesson.title
                          }
                        </button>
                        <span className="text-xs text-center text-muted-foreground">
                          {formatDuration(lesson.duration)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-center my-5">
            Porcentaje completado del curso{' '}
            ({totalCompleted.toFixed(0)}%)
          </p>
          <div className="flex items-center justify-center">
            <CertificateButton
              authUser={authUser}
              courseId={courseId}
              certificate={certificate}
              totalCompleted={totalCompleted}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
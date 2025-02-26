import { BookOpen, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn, formatDuration } from '@/lib/utils';
import Link from 'next/link';
import { CourseResponse } from '../page';

interface CourseUnitsListProps {
  isAuth: boolean;
  course: CourseResponse;
}

export default function CourseUnitsList({ isAuth, course }: CourseUnitsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold tracking-tighter">Currículum del curso</h3>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          <span>{formatDuration(course.duration)}</span>
        </div>
        <span>|</span>
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          <span>{course.lessons} lecciones</span>
        </div>
      </div>
      <Accordion type="multiple" className="w-full">
        {course?.units?.map((unit, index) => (
          <AccordionItem key={`unit-${unit.id}`} value={`unit-${index + 1}`}>
            <AccordionTrigger>{unit.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2 ml-2">
                {unit.lessons?.map(lesson => (
                  <li className="flex items-center justify-between" key={`lesson-${lesson.id}`}>
                    <Link className="lg:truncate hover:underline" href={isAuth ? `/courses/${course.id}/lessons/${lesson.id}` : '#'}>
                      {
                        lesson.title.length > 75
                          ? `${lesson.title.substring(0, 75)}...`
                          : lesson.title
                      }
                    </Link>
                    <span className="flex items-center justify-between">
                      <Clock className={cn('w-4 h-4', lesson.duration < 10 ? 'mr-3.5' : 'mr-2')} />
                      <span>{formatDuration(lesson.duration)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
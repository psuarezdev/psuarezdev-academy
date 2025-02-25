import Link from 'next/link';
import { BarChart, BookOpen, Clock } from 'lucide-react';
import type { Roadmap, RoadmapCourse } from '@prisma/client';
import { formatDuration } from '@/lib/utils';
import Description from '@/components/description';
import RatingStars from '@/components/rating-stars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface RoadmapCardProps {
  className?: string;
  roadmap: Roadmap & {
    courses: RoadmapCourse[];
  }
}

export default function RoadmapCard({ roadmap, className }: RoadmapCardProps) {
  return (
    <Card className={`flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">
          {roadmap.title}
        </h3>
      </CardHeader>
      <CardContent>
        <div>
          <Description value={`${roadmap.description.substring(0, 275).trim()}...`} />
          <div className="flex flex-col justify-center mt-5">
            <div className="flex items-center mb-2">
              <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{roadmap.courses.length} Cursos</p>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{formatDuration(roadmap.duration)}</p>
            </div>
            <div className="flex items-center mb-4">
              <BarChart className="w-4 h-4 mr-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground capitalize">{roadmap.level}</p>
            </div>
            <RatingStars averageRating={roadmap.averageRating} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button asChild>
          <Link href={`/roadmaps/${roadmap.id}`}>
            Ver la ruta
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

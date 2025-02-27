import Link from 'next/link';
import { BarChart, BookOpen, Clock } from 'lucide-react';
import type { Roadmap, RoadmapCourse } from '@prisma/client';
import { formatDuration, getUploadPath } from '@/lib/utils';
import Description from '@/components/description';
import RatingStars from '@/components/rating-stars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { UploadPaths } from '@/lib/config';

interface RoadmapCardProps {
  className?: string;
  roadmap: Roadmap & {
    courses: RoadmapCourse[];
  }
}

export default function RoadmapCard({ roadmap, className }: RoadmapCardProps) {
  return (
    <Card className={`flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardHeader className="p-0">
        <Image
          className="w-full object-cover"
          src={getUploadPath(UploadPaths.RoadmapsImages, roadmap.image)}
          alt={roadmap.title}
          width={500}
          height={500}
        />
        <CardTitle className="p-4 text-lg">{roadmap.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Description value={`${roadmap.description.substring(0, 275).trim()}...`} />
          <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-3 2xl:gap-5 text-muted-foreground mt-5 mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <p className="text-sm">{roadmap.courses.length} Cursos</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <p className="text-sm">{formatDuration(roadmap.duration)}</p>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              <p className="text-sm capitalize">{roadmap.level}</p>
            </div>
          </div>
          <div className="mb-3">
            <RatingStars averageRating={roadmap.averageRating} />
          </div>
          <Button asChild>
            <Link href={`/roadmaps/${roadmap.id}`}>
              Ver la ruta
            </Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}

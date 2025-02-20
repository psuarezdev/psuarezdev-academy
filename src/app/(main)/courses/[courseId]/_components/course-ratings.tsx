import RatingStars from "@/components/rating-stars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roundToHalf } from "@/lib/utils";
import Link from "next/link";

interface CourseRatingsProps {
  courseId: string;
  averageRating: number;
  ratingsCount: number;
}

export default function CourseRatings({ courseId, averageRating, ratingsCount }: CourseRatingsProps) {
  return (
    <div>
      <Link href={`/courses/${courseId}/ratings`}>
        <Card>
          <CardHeader>
            <CardTitle>Valoraciones del curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <RatingStars averageRating={averageRating} />
              <div>
                <span className="font-semibold">{roundToHalf(averageRating)}</span>{' '}
                 <span className="text-muted-foreground">
                  ({ratingsCount}{' '}
                  valoraci{ratingsCount == 1 ? 'ó' : ''}n{ratingsCount != 1 ? 'es' : ''})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

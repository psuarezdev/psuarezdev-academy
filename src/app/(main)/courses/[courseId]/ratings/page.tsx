import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating, User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import RatingStars from '@/components/rating-stars';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type RatingsResponse = Rating & {
  user: Omit<User, 'password'>
};

interface RatingsProps {
  params: {
    courseId: string;
  };
}

export default async function Ratings({ params }: RatingsProps) {
  const res = await fetch(`${process.env.BASE_URL}/api/courses/${params.courseId}/ratings`);

  if (!res.ok) return redirect(`/courses/${params.courseId}`);

  const data = await res.json() as RatingsResponse[];

  return (
    <div className="container mx-auto py-8">
      <Button variant="outline" className="mb-4" asChild>
        <Link href={`/courses/${params.courseId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al curso
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">Valoraciones del Curso</h1>
      <div className="grid gap-6">
        {data.map(rating => (
          <Card key={rating.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage 
                      src={rating.user.imageUrl ?? undefined} 
                      alt="Avatar" 
                    />
                    <AvatarFallback>
                      {rating.user.firstName.at(0)}{rating.user.lastName.at(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {rating.user.firstName} {rating.user.lastName}
                    </CardTitle>
                    <CardDescription>
                      {format(rating.createdAt, "d 'de' MMMM 'de' yyyy", { locale: es })}
                    </CardDescription>
                  </div>
                </div>
                <RatingStars
                  averageRating={rating.rating}
                  ratingPosition="start"
                  showRating
                />
              </div>
            </CardHeader>
            {rating.comment && rating.comment.trim().length > 0 && (
              <CardContent>
                <p>{rating.comment}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
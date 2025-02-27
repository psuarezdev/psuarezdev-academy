import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating, User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RatingStars from '@/components/rating-stars';
import Description from '@/components/description';
import { UploadPaths } from '@/lib/config';
import { formatDate, getUploadPath } from '@/lib/utils';

interface RatingCardProps {
  className?: string;
  rating: Rating & {
    user: Omit<User, 'password'>;
  };
}

export default function RatingCard({ className, rating }: RatingCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage 
                src={rating.user.avatar ? getUploadPath(UploadPaths.Avatars, rating.user.avatar) : undefined} 
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
                {formatDate(rating.createdAt)}
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
          <Description value={rating.comment} />
        </CardContent>
      )}
    </Card>
);
}

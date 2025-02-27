import { Star, StarHalf } from 'lucide-react';
import { roundToHalf } from '@/lib/utils';

interface RatingStarsProps {
  averageRating: number;
  showRating?: boolean;
  ratingPosition?: 'start' | 'end';
}

export default function RatingStars({ averageRating, showRating = false, ratingPosition = 'end' }: RatingStarsProps) {
  const roundedRating = roundToHalf(averageRating);
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {showRating && ratingPosition === 'start' && (
        <span className="text-sm font-medium mr-1">
          {roundedRating}
        </span>
      )}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} fill="#FACC15" className="h-4 w-4 text-yellow-400 mr-1" />
        ))}
      {halfStar && (
        <>
          <StarHalf fill="#FACC15" className="h-4 w-4 text-yellow-400" />
          <StarHalf className="h-4 w-4 text-yellow-400 -ml-[15px] mr-1 -scale-x-[1]" />
        </>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-300 mr-1" />
        ))}
      {showRating && ratingPosition === 'end' && (
        <span className="text-sm font-medium ml-1">
          {roundedRating}
        </span>
      )}
    </div>
  );
}
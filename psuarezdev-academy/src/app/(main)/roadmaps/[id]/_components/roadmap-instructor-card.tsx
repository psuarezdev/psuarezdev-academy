import type { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UploadPaths } from '@/lib/config';
import { getUploadPath } from '@/lib/utils';
import Link from 'next/link';

export default function RoadmapInstructorCard({ instructor }: { instructor: Omit<User, 'password'> }) {
  return (
    <Link className="transition-opacity hover:opacity-80" href={`/instructors/${instructor.id}`}>
      <Card>
        <CardHeader className="p-3" />
        <CardContent>
          <div className="flex flex-col xl:flex-row items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={getUploadPath(UploadPaths.Avatars, instructor.avatar ?? '')}
                alt={`${instructor.firstName} ${instructor.lastName}`}
              />
              <AvatarFallback>
                {instructor.firstName.at(0)?.toUpperCase()}
                {instructor.lastName.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl text-center mb-2">
                {instructor.firstName} {instructor.lastName}
              </p>
              {instructor.title && (
                <span className="text-center text-muted-foreground">
                  {instructor.title}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

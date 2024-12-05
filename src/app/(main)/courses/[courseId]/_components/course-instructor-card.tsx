import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@prisma/client';

export default function CourseInstructorCard({ user }: { user: Omit<User, 'password'>; }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profesor</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={user.imageUrl ?? undefined}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          <AvatarFallback>
            {user?.firstName?.charAt(0)?.toUpperCase()}{user?.lastName?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-lg font-semibold">{user?.firstName} {user?.lastName}</h4>
          <p className="text-sm text-muted-foreground">{user?.title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
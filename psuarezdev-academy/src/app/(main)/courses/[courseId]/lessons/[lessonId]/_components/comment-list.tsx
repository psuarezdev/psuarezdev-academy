import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Comment, User } from '@prisma/client';
import DeleteCommentButton from './delete-comment-button';
import { Separator } from '@/components/ui/separator';
import Description from '@/components/description';
import { UploadPaths } from '@/lib/config';
import { getUploadPath } from '@/lib/utils';

interface CommentsListProps {
  courseId: string;
  lessonId: string;
  authUser: Omit<User, 'password'>;
  comments?: (Comment & {
    user: Omit<User, 'password'>;
  })[];
}

export default function CommentsList({ authUser, courseId, lessonId, comments }: CommentsListProps) {
  return (
    <ScrollArea className="h-[500px] w-full space-y-4">
      {comments?.map((comment, index) => (
        <>
          <div key={`comment-${comment.id}`} className="flex items-start justify-between">
            <div className="flex w-full space-x-4">
              <Avatar>
                <AvatarImage 
                  src={comment.user.avatar ? getUploadPath(UploadPaths.Avatars, comment.user.avatar) : undefined} 
                  alt="Avatar"
                />
                <AvatarFallback>
                  {comment.user?.firstName?.charAt(0)?.toUpperCase()}{comment.user?.lastName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">
                    {
                      comment.user.firstName
                        ? `${comment.user?.firstName} ${comment.user?.lastName}`
                        : comment.user.email
                    }
                  </h4>
                  {comment.user.firstName && (
                    <span className="text-xs text-muted-foreground">
                      | {comment.user.email}
                    </span>
                  )}
                </div>
                <Description value={comment.content} />
              </div>
            </div>
            {comment.userId === authUser.id && (
              <DeleteCommentButton
                comment={comment}
                courseId={courseId}
                lessonId={lessonId}
              />
            )}
          </div>
          {index < (comments ?? []).length - 1 && <Separator className="my-3" />}
        </>
      ))}
      <div className="h-[50px]" />
    </ScrollArea>
  );
}
'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { Course, Category, User, Rating } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import CourseCard from '@/components/course-card';
import { Button } from '@/components/ui/button';
import { Github, LinkedIn } from '@/components/icons';
import { Globe } from 'lucide-react';
import { UploadPaths } from '@/lib/config';
import RatingStars from '@/components/rating-stars';
import { getUploadPath } from '@/lib/utils';

interface InstructorProfileProps {
  instructor: Omit<User, 'password'>;
  courses: (Course & { category: Category })[];
  currentPage: number;
  totalPages: number;
  ratings: Rating[];
}

export default function InstructorProfile({ instructor, courses, ratings, currentPage, totalPages }: InstructorProfileProps) {
  const router = useRouter();
  const pathname = usePathname();

  let ratingGroups: { [key: string]: Rating[] } = {};

  Array.from({ length: 5 }).forEach((_, index) => {
    ratingGroups[`${index + 1}`] = [];
  });

  ratingGroups = {
    ...ratingGroups,
    ...Object.groupBy(ratings, item => Math.trunc(item.rating))
  };

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="flex flex-col items-center w-fit h-[264px] mb-5 px-10">
        <div className="flex items-center justify-center gap-6">
          <div>
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage
                  src={instructor.avatar ? getUploadPath(UploadPaths.Avatars, instructor.avatar) : undefined}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{instructor.firstName} {instructor.lastName}</CardTitle>
              <CardDescription className="text-center">{instructor.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                {instructor.website && (
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={instructor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Portfolio del instructor"
                    >
                      <Globe className="w-10 h-10" />
                      <span className="sr-only">Portfolio del instructor</span>
                    </a>
                  </Button>
                )}
                {instructor.github && (
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={instructor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub del instructor"
                    >
                      <Github className="w-10 h-10" />
                      <span className="sr-only">GitHub del instructor</span>
                    </a>
                  </Button>
                )}
                {instructor.linkedin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn del instructor"
                    >
                      <LinkedIn className="w-10 h-10" />
                      <span className="sr-only">LinkedIn del instructor</span>
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
          <div className="text-muted-foreground">
            <p className="mb-3">Valoraciones</p>
            {Object.keys(ratingGroups)
              .sort((a, b) => Number(b) - Number(a))
              .map(ratingGroupKey => (
                <div
                  key={`rating-group-${ratingGroupKey}`}
                  className="flex items-center gap-1.5"
                >
                  <RatingStars averageRating={Number(ratingGroupKey)} />
                  <span className="text-sm font-medium ml-1">
                    {ratingGroups[ratingGroupKey].length}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </Card>
      <div>
        <h2 className="text-2xl font-bold mb-4">Cursos del profesor</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              className="max-w-sm"
              course={{
                ...course,
                user: instructor
              }}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
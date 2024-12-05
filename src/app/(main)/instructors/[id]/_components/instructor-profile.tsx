'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { Course, Category, User } from '@prisma/client';
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

interface InstructorProfileProps {
  instructor: Omit<User, 'password'>;
  courses: (Course & { category: Category })[];
  currentPage: number;
  totalPages: number;
}

export default function InstructorProfile({ instructor, courses, currentPage, totalPages }: InstructorProfileProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1 flex flex-col items-center">
        <CardHeader>
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage 
              src={instructor.image ?? undefined} 
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
      </Card>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Cursos del profesor</h2>
        <div className="grid gap-4 sm:grid-cols-2">
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
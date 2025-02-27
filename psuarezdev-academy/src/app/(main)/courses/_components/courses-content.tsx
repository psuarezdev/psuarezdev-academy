'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { Category, Course, User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import CourseCard from '@/components/course-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CoursesContentProps {
  categories: Category[];
  courses: (
    Course & { 
      user: Omit<User, 'password'>;
      category: Category;
    }
  )[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export default function CoursesContent({ categories, courses, currentPage, totalPages, searchQuery }: CoursesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('q', searchTerm);
    params.set('page', '1');
    router.push(`/courses?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/courses?${params.toString()}`);
  };

  const filteredCourses = courses.filter(course => {
    return !selectedCategory || (course.category.id === selectedCategory);
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Categorías</h2>
          {categories.map(category => (
            <div key={category.id} className="flex items-center mb-2 transition-opacity hover:opacity-80">
              <Checkbox
                id={category.id}
                checked={selectedCategory === category.id}
                onCheckedChange={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              />
              <label 
                htmlFor={category.id} 
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </aside>
      <main className="w-full md:w-3/4">
        <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
          <Input
            className="flex-1"
            placeholder="Buscar cursos..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </form>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
        <Pagination>
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
      </main>
    </div>
  );
}
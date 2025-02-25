'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Roadmap, RoadmapCourse } from '@prisma/client';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import RoadmapCard from '@/components/roadmap-card';

interface RoadmapsContentProps {
  roadmaps: (Roadmap & {
    courses: RoadmapCourse[];
  })[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export default function RoadmapsContent({ roadmaps, currentPage, totalPages, searchQuery }: RoadmapsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchQuery);

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

  return (
    <main className="w-full">
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
        {roadmaps.map(roadmap => <RoadmapCard key={roadmap.id} roadmap={roadmap} />)}
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
  );
}

import { notFound, redirect } from 'next/navigation';
import { Roadmap, RoadmapCourse } from '@prisma/client';
import qs from 'qs';
import { getAuth } from '@/lib/auth';
import RoadmapsContent from './_components/roadmaps-content';
import { MIN_ROADMAPS_SUBSCRIPTION_PRICE } from '@/lib/config';

export interface RoadmapResponse {
  roadmaps: (Roadmap & {
    courses: RoadmapCourse[];
  })[];
  roadmapsCount: number;
  totalPages: number;
} 

interface RoadmapsProps {
  searchParams: {
    q: string;
    page: string;
  };
}

export default async function Roadmaps({ searchParams }: RoadmapsProps) {
  const auth = await getAuth();

  if (
    !auth ||
    !auth.subscription ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (((auth?.subscription as any)?.plan?.amount ?? 0) / 100) < MIN_ROADMAPS_SUBSCRIPTION_PRICE
  ) return notFound();

  const queryString = qs.stringify(searchParams, { addQueryPrefix: true });
  const res = await fetch(`${process.env.BASE_URL}/api/roadmaps${queryString}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }
  );

  if(!res.ok) return redirect('/');

  const { roadmaps, totalPages } = await res.json() as RoadmapResponse;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explora Nuestras Rutas de Aprendizaje</h1>
      <RoadmapsContent 
        roadmaps={roadmaps}
        currentPage={parseInt(searchParams.page ?? '1')}
        totalPages={totalPages}
        searchQuery={searchParams.q ?? ''}
      />
    </div>
  );
}

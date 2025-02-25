import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { type RoadmapData } from '../page';
import { RoadampWithRelations } from './roadmaps-manager';

interface RoadmapModal {
  roadmap?: RoadampWithRelations;
  createRoadmap: (data: RoadmapData) => Promise<void>;
  updateRoadmap: (data: Partial<RoadmapData>) => Promise<void>;
}

export default function RoadmapModal({ roadmap, createRoadmap, updateRoadmap }: RoadmapModal) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div>RoadmapModal</div>
  );
}

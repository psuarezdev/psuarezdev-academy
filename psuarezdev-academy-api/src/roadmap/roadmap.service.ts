import { CustomApiError } from '@/lib/errors';
import { PrismaClient } from '@prisma/client';

export class RoadmapService {
  constructor(private readonly prisma: PrismaClient) { }

  async findAll(query: string, pageSize: number, skip: number) {
    const [roadmaps, roadmapsCount] = await Promise.all([
      this.prisma.roadmap.findMany({
        include: { courses: true },
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        skip,
        take: pageSize
      }),
      this.prisma.roadmap.count({
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        }
      })
    ]);

    const totalPages = Math.ceil(roadmapsCount / pageSize);

    return { roadmaps, roadmapsCount, totalPages };
  }

  async findById(id: string) {
    const roadmap = await this.prisma.roadmap.findUnique({
      where: {
        id,
        isActive: true
      },
      include: {
        courses: {
          orderBy: { step: 'asc' },
          include: {
            course: true
          }
        }
      }
    });

    if (!roadmap) {
      throw new CustomApiError(404, 'Roadmap not found');
    }

    const instructors = await this.prisma.user.findMany({
      where: {
        role: 'instructor',
        courses: {
          some: {
            id: {
              in: roadmap.courses.map(c => c.courseId)
            }
          }
        }
      },
      distinct: ['id']
    });

    return { ...roadmap, instructors };
  }
}

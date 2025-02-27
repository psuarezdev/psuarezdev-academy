import { CustomApiError } from '@/lib/errors';
import { UserDTO } from '@/user/dto/user.dto';
import { PrismaClient, Rating } from '@prisma/client';

export class CourseService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(query: string, pageSize: number, skip: number) {
    const [categories, coursesCount, courses] = await Promise.all([
      this.prisma.category.findMany(),
      this.prisma.course.count({
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        }
      }),
      this.prisma.course.findMany({
        where: {
          isActive: true,
          title: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        include: {
          category: true,
          user: {
            omit: { password: true }
          }
        },
        orderBy: { averageRating: 'desc' },
        skip,
        take: pageSize
      })
    ]);

    const totalPages = Math.ceil(coursesCount / pageSize);

    return {
      categories,
      courses,
      coursesCount,
      totalPages
    };
  }

  async finById(courseId: string, user?: UserDTO) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
        isActive: true
      },
      include: {
        user: {
          omit: { password: true }
        },
        ratings: true,
        units: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      throw new CustomApiError(404, `Course with id: ${courseId} not found`);
    }

    let rating: Rating | null = null;
    let totalCompleted: number | null = null;
    let isFavorite: boolean | null = null;

    if(user) {
      isFavorite = (await this.prisma.favorite.count({
        where: {
          courseId,
          userId: user.id
        }
      })) === 1;

      rating = await this.prisma.rating.findFirst({
        where: {
          userId: user.id,
          courseId
        }
      });

      const units = await this.prisma.unit.findMany({
        where: {
          courseId
        },
        include: {
          lessons: {
            include: {
              lessonCompletions: {
                where: { userId: user.id }
              },
              comments: {
                include: {
                  user: {
                    omit: { password: true }
                  }
                }
              }
            }
          }
        }
      });

      const lessons = units.flatMap(unit => unit.lessons);
      totalCompleted = (
        lessons.filter(lesson => lesson.lessonCompletions.length > 0).length / lessons.length
      ) * 100;
    }

    return {
      ...course,
      rating,
      totalCompleted,
      isFavorite
    };
  }
}

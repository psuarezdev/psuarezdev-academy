import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UtilsService } from '@/shared/utils.service';
import { UserDTO } from './dto/user.dto';
import { CustomApiError } from '@/lib/errors';

export class UserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly utilsService: UtilsService
  ) { }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return (await this.utilsService.mapToDto(user, UserDTO)).dto;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findFavorites(user: UserDTO) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: {
            units: {
              include: {
                lessons: {
                  include: {
                    lessonCompletions: {
                      where: {
                        userId: user.id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!favorites) {
      throw new CustomApiError(404, 'No favorite courses found');
    }

    return favorites.map(f => f.course);
  }

  async findLearning(user: UserDTO) {
    const courses = await this.prisma.course.findMany({
      where: {
        units: {
          some: {
            lessons: {
              some: {
                lessonCompletions: {
                  some: {
                    userId: user.id
                  }
                }
              }
            }
          }
        }
      },
      include: {
        units: {
          include: {
            lessons: {
              include: {
                lessonCompletions: {
                  where: {
                    userId: user.id
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!courses) {
      throw new CustomApiError(500, 'Error in obtaining learning');
    }

    const results = await Promise.all(courses.map(async (course) => {
      const completedLessons = course.units.reduce((acc, unit) => {
        return acc + unit.lessons.filter(l => l.lessonCompletions.length > 0).length;
      }, 0);
      const progress = course.lessons > 0 ? Math.round((completedLessons / course.lessons) * 100) : 0;
      const certificate = await this.prisma.certificate.findFirst({
        where: {
          userId: user.id,
          courseId: course.id
        }
      });

      return {
        ...course,
        completedLessons,
        progress,
        certificate
      };
    }));

    return results;
  }

  async create(dto: CreateUserDTO) {
    const passwordHash = await hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        role: 'user',
        password: passwordHash
      }
    });

    return await this.utilsService.mapToDto(user, UserDTO);
  }

  async updateSubscription(email: string, subscriptionId: string | null) {
    await this.prisma.user.update({
      where: { email },
      data: { subscriptionId }
    });
  }
}

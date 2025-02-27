import { PrismaClient } from '@prisma/client';
import { UserDTO } from '@/user/dto/user.dto';

export class FavoriteService {
  constructor(private readonly prisma: PrismaClient) { }

  async findAll(user: UserDTO) {
    return await this.prisma.favorite.findMany({
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
  }

  async toggle(user: UserDTO, courseId: string) {
    try {
      const favoriteFound = await this.prisma.favorite.findFirst({
        where: {
          userId: user.id,
          courseId
        }
      });

      if (favoriteFound) {
        await this.prisma.favorite.delete({
          where: { id: favoriteFound.id }
        });
      } else {
        await this.prisma.favorite.create({
          data: {
            userId: user.id,
            courseId
          }
        });
      }

      return true;
    } catch {
      return false;
    }
  }
}

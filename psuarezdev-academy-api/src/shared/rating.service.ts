import { PrismaClient, Rating } from '@prisma/client';
import { CourseService } from '@/course/course.service';
import { CustomApiError } from '@/lib/errors';
import { UserDTO } from '@/user/dto/user.dto';

export class RatingService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly courseService: CourseService
  ) { }

  async findByCourse(courseId: string) {
    const ratings = await this.prisma.rating.findMany({
      where: { courseId },
      include: {
        user: {
          omit: { password: true }
        }
      }
    });

    if (!ratings) {
      throw new CustomApiError(
        404,
        `No ratings found for the course with id: ${courseId}`
      );
    }

    return ratings;
  }

  async findByUserAndCourse(userId: string, courseId: string) {
    return await this.prisma.rating.findFirst({
      where: { userId, courseId }
    });
  }

  async create(user: UserDTO, courseId: string, rating: number, comment: string) {
    const ratingFound = await this.findByUserAndCourse(user.id, courseId);

    let result: Rating | null = null;

    if (ratingFound) {
      result = await this.prisma.rating.update({
        where: { id: ratingFound.id },
        data: {
          rating: rating ?? ratingFound.rating,
          comment: comment ?? ratingFound.comment
        }
      });
    } else {
      result = await this.prisma.rating.create({
        data: {
          userId: user.id,
          courseId,
          rating,
          comment
        }
      });
    }

    if (!result) {
      return NextResponse.json(
        { message: 'Error al valorar el curso' },
        { status: 500 }
      );
    }

    const ratings = await
  }
}

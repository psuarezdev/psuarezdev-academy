import os from 'node:os';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { Certificate, Course, PrismaClient, User } from '@prisma/client';
import { UtilsService } from '@/shared/utils.service';
import { UserDTO } from '@/user/dto/user.dto';
import { rename } from 'node:fs/promises';
import { UploadPaths } from '@/lib/config';
import { CustomApiError } from '@/lib/errors';
import { UploadService } from '@/upload/upload.service';

type CertificateWithRelations = Certificate & {
  totalDuration: number;
  user: Omit<User, 'password'>;
  course: Course & {
    user: Omit<User, 'password'>;
  };
};

export class CertificateService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly utilsService: UtilsService,
    private readonly uploadService: UploadService
  ) { }

  #endPointPath = join(process.cwd(), 'src', 'app', 'api', 'certificates');

  async findById(id: string) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
      include: { course: true }
    });

    if (!certificate) {
      throw new CustomApiError(404, `Certificate with id: ${id} not found`);
    }

    const file = await this.uploadService.getFile(UploadPaths.Certificates, `${certificate.id}.png`);

    if (!file) {
      throw new CustomApiError(404, 'File not found');
    }

    return { certificate, file };
  }

  async create(user: UserDTO, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        units: {
          include: {
            lessons: {
              select: {
                id: true,
                duration: true
              }
            }
          }
        }
      }
    });

    if (!course) {
      throw new CustomApiError(404, 'Course not found');
    }

    const certificateFound = await this.prisma.certificate.findFirst({
      where: {
        userId: user.id,
        courseId: course.id
      }
    });

    if (certificateFound) {
      throw new CustomApiError(409, 'You have already obtained the certificate for this course');
    }

    const completedLessons = await this.prisma.lessonCompletion.findMany({
      where: {
        userId: user.id,
        lessonId: {
          in: course.units.flatMap(unit => unit.lessons.map(lesson => lesson.id))
        }
      },
      select: {
        lessonId: true,
        completedAt: true
      }
    });

    const totalLessons = course.units.flatMap(unit => unit.lessons);
    const completedLessonIds = completedLessons.map(lesson => lesson.lessonId);

    const allCompleted = totalLessons.every(lesson => completedLessonIds.includes(lesson.id));

    if (!allCompleted) {
      throw new CustomApiError(400, 'You must complete the course before obtaining the certificate');
    }

    const lastCompletedLesson = completedLessons.sort((a, b) => {
      return b.completedAt.getTime() - a.completedAt.getTime();
    })[0];

    const certificatePath = join(this.#endPointPath, 'python', 'certificate.png');

    const certificate = await this.prisma.certificate.create({
      data: {
        courseId,
        userId: user.id,
        duration: course.duration,
        issuedAt: lastCompletedLesson.completedAt
      },
      include: {
        user: {
          omit: {
            password: true
          }
        },
        course: {
          include: {
            user: {
              omit: {
                password: true
              }
            }
          }
        }
      }
    });

    if (!certificate) {
      throw new CustomApiError(500, 'Error inesperado al generar el certificado');
    }

    const { success } = await this.#generateCertificate(this.#endPointPath, {
      ...certificate,
      totalDuration: course.duration
    });

    if (!success) {
      await this.prisma.certificate.delete({
        where: { id: certificate.id }
      });

      throw new CustomApiError(500, 'Error al generar el certificado');
    }

    await rename(
      certificatePath,
      join(process.cwd(), '..', 'uploads', UploadPaths.Certificates, `${certificate.id}.png`)
    );

    return certificate;
  }

  async #generateCertificate(cwd: string, certificate: CertificateWithRelations): Promise<{ success: boolean }> {
    return await new Promise((resolve, reject) => {
      const pythonCommand = os.platform() === 'win32' ? 'python' : 'python3';

      const pythonProcess = spawn(
        pythonCommand,
        [
          join('python', 'generate_certificate.py'),
          certificate.id,
          `${certificate.user.firstName} ${certificate.user.lastName}`,
          certificate.course.title,
          this.utilsService.formatDuration(certificate.totalDuration),
          this.utilsService.formatDate(certificate.issuedAt),
          `${certificate.course.user.firstName} ${certificate.course.user.lastName}`
        ],
        { cwd }
      );

      pythonProcess.on('close', (code) => resolve({ success: code === 0 }));

      // pythonProcess.stderr.on('data', (data) => {
      //   console.log('error data', data.toString());
      // });

      pythonProcess.on('error', () => reject({ success: false }));
    });
  }
}

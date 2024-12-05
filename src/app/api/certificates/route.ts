import os from 'node:os';
import { spawn } from 'node:child_process';
import { type NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { join } from 'node:path';
import { Certificate, Course, User } from '@prisma/client';
import { UploadPaths } from '@/lib/config';
import { formatDuration } from '@/lib/utils';
import { upload } from '@/lib/cloudinary';
import { unlink } from 'node:fs/promises';

type CertificateWithRelations = Certificate & {
  totalDuration: number;
  user: Omit<User, 'password'>;
  course: Course & {
    user: Omit<User, 'password'>;
  };
};


function generateCertificate(cwd: string, certificate: CertificateWithRelations): Promise<{ success: boolean }> {
  return new Promise((resolve, reject) => {
    const pythonCommand = os.platform() === 'win32' ? 'python' : 'python3';

    const pythonProcess = spawn(
      pythonCommand,
      [
        join('python', 'generate_certificate.py'),
        certificate.id,
        `${certificate.user.firstName} ${certificate.user.lastName}`,
        certificate.course.title,
        formatDuration(certificate.totalDuration),
        format(certificate.issuedAt, "d 'de' MMMM 'de' yyyy", { locale: es }),
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

export async function POST(req: NextRequest) {
  try {
    const endPointPath = join(process.cwd(), 'src', 'app', 'api', 'certificates');
    const body = await req.json();
    const auth = await getAuth();
    const { courseId } = body;

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    if (!courseId) {
      return NextResponse.json(
        { message: 'El id del curso es obligatorio' },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
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
      return NextResponse.json(
        { message: 'No se ha encontrado el curso' },
        { status: 404 }
      );
    }

    const certificateFound = await prisma.certificate.findFirst({
      where: {
        userId: auth.id,
        courseId: course.id
      }
    });

    if (certificateFound) {
      return NextResponse.json(
        { message: 'Ya has obtenido el certificado para este curso' },
        { status: 409 }
      );
    }

    const completedLessons = await prisma.lessonCompletion.findMany({
      where: {
        userId: auth.id,
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
      return NextResponse.json(
        { message: 'Debes completar el curso antes de obtener el certificado' },
        { status: 400 }
      );
    }

    const lastCompletedLesson = completedLessons.sort((a, b) => {
      return b.completedAt.getTime() - a.completedAt.getTime();
    })[0];

    const certificatePath = join(endPointPath, 'python', 'certificate.png');

    const certificate = await prisma.certificate.create({
      data: {
        courseId,
        userId: auth.id,
        duration: course.duration,
        issuedAt: lastCompletedLesson.completedAt,
        image: ''
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
            },
          }
        }
      }
    });

    if (!certificate) {
      throw new Error('Error inesperado al generar el certificado');
    }

    const { success } = await generateCertificate(endPointPath, {
      ...certificate,
      totalDuration: course.duration,
      image: certificatePath
    });

    if (!success) {
      await prisma.certificate.delete({
        where: { id: certificate.id }
      });

      throw new Error('Error al generar el certificado');
    }

    const cloudinaryRes = await upload(certificatePath, {
      resource_type: 'image',
      type: 'upload',
      folder: `psuarezdev-academy/${UploadPaths.Certificates}`,
    });

    await unlink(certificatePath);

    if (!cloudinaryRes || !cloudinaryRes.secure_url) {
      return NextResponse.json(
        { message: 'Error al crear el certificado' },
        { status: 500 }
      );
    }

    await prisma.certificate.update({
      where: { id: certificate.id },
      data: {
        image: cloudinaryRes.secure_url
      }
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error inesperado al generar el certificado' },
      { status: 500 }
    );
  }
}
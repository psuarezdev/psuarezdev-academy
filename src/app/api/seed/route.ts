import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// import { faker } from '@faker-js/faker';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { message: 'Servicio no disponible' },
        { status: 503 }
      );
    }

    // TODO: Mejorar esta seed, añadiendo bien las imagenes/videos de los cursos e instructores 

    await prisma.$executeRaw`TRUNCATE TABLE "lesson_completions", "certificates", "comments", "ratings", "lessons", "units", "courses", "categories", "favorites", "users" RESTART IDENTITY CASCADE;`;
    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin'
      }
    });

    return NextResponse.json({ message: 'Seed ejecutada exitosamente' });
  } catch (err) {
    return NextResponse.json(
      { message: `Error inesperado al ejecutar la seed: ${err}` },
      { status: 500 }
    );
  }
}
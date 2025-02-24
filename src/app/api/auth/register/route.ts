import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isValidEmail } from '@/lib/utils';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, password } = body;

    if (!firstName || firstName.length < 3) {
      return NextResponse.json(
        { message: 'El nombre debe tener una longitud mínima de 3 letras' },
        { status: 400 }
      );
    }

    if (!lastName || lastName.length < 3) {
      return NextResponse.json(
        { message: 'Los apelliodos deben tener una longitud mínima de 3 letras' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Formato de email invalido' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: 'La contraseña deben tener una longitud mínima de 6 letras' },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await hash(password, 10)
      },
      omit: { password: true }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Error al crear el usuario' },
        { status: 500 }
      );
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    const accessToken = sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: '30d'
    });

    return NextResponse.json({ user, accessToken }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error inesperado al registrar el usuario' },
      { status: 500 }
    );
  }
}
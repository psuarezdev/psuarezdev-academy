import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '@/lib/prisma';
import { isValidEmail } from '@/lib/utils';
import { sign } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

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

    const userFound = await prisma.user.findUnique({ where: { email } });

    if (!userFound) {
      return NextResponse.json(
        { message: 'No se ha encontrado el usuario' },
        { status: 404 }
      );
    }

    const passwordMatch = await compare(password, userFound.password);

    if(!passwordMatch) {
      return NextResponse.json(
        { message: 'Credenciales invalidas' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = userFound;

    const payload = {
      id: user.id,
      email: user.email
    };

    const accessToken = sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: '30d'
    });

    return NextResponse.json({ user, accessToken });
  } catch {
    return NextResponse.json(
      { message: 'Error inesperado al autenticar el usuario' },
      { status: 500 }
    );
  }
}
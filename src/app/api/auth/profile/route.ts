import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    return NextResponse.json(auth);
  } catch {
    return NextResponse.json(
      { message: 'Error inesperado al autenticar el usuario' },
      { status: 500 }
    );
  }
}
import { spawn } from 'node:child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { message: 'Servicio no disponible' },
        { status: 503 }
      );
    }

    const seedProcessPromise: { success: boolean } = await new Promise((resolve, reject) => {
      const seedProcess = spawn(
        'docker exec postgres16 pg_dump -U postgres -d psuarezdev_academy -f psuarezdev-academy.sql'
      );

      seedProcess.on('close', (code) => resolve({ success: code === 0 }));
      seedProcess.on('error', () => reject({ success: false }));
    });

    if(!seedProcessPromise.success) {
      throw new Error('Error en el SeedProcess');
    }

    return NextResponse.json({ message: 'Seed ejecutada exitosamente' });
  } catch (err) {
    return NextResponse.json(
      { message: `Error inesperado al ejecutar la seed: ${process.env.NODE_ENV !== 'production' ? err : ''}` },
      { status: 500 }
    );
  }
}
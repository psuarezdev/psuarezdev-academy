import { NextResponse } from 'next/server';
import { getSubscriptions, stripe } from '@/lib/stripe';
import { getAuth } from '@/lib/auth';

export async function GET() {
  try {
    const subscriptions = await getSubscriptions();

    if(!subscriptions) {
      return NextResponse.json(
        { message: 'Error al obtener las suscripciones' },
        { status: 500 }
      );
    }

    return NextResponse.json(subscriptions);
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener las suscripciones' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  try {
    const auth = await getAuth();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    if (!auth.subscription) return;

    await stripe.subscriptions.update(
      auth.subscription?.id,
      { cancel_at_period_end: !auth.subscription?.cancel_at_period_end }
    );

    return NextResponse.json({
      message: `Suscripción ${auth.subscription?.cancel_at_period_end ? 'cancelada' : 'reactivada'}`
    });
  } catch {
    return NextResponse.json(
      { message: 'Error al intentar actualizar la suscripción' },
      { status: 500 }
    );
  }
}
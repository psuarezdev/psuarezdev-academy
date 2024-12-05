import { type NextRequest, NextResponse } from 'next/server';;
import { getAuth } from '@/lib/auth';
import { getSubscriptions, stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuth();
    const body = await req.json();

    if (!auth) {
      return NextResponse.json(
        { message: 'Sin autorización' },
        { status: 401 }
      );
    }

    if(!body.priceId) {
      return NextResponse.json(
        { message: 'El Id de la suscription es obligatorio' },
        { status: 400 }
      );
    }

    const subscriptions = await getSubscriptions();

    if(!subscriptions || subscriptions.length === 0 || !(subscriptions?.some(sub => sub.id === body.priceId))) {
      return NextResponse.json(
        { message: 'El Id no es valido' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${process.env.BASE_URL}/checkout-success`,
      cancel_url: `${process.env.BASE_URL}/pricing`,
      customer_email: auth.email,
      metadata: { userId: auth.id },
      line_items: [
        {
          price: body.priceId,
          quantity: 1
        }
      ],
    });

    if(!session) {
      return NextResponse.json(
        { message: 'Error el crear la sessión del pago' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Algo salio mal al crear la sesión del pago.' },
      { status: 500 }
    );
  }
}
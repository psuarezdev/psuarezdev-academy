import { type NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getCustomer, stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.text();
  let signature: string | null = null;
  signature = headers().get('Stripe-Signature');
  
  if(!signature) signature = req.headers.get('Stripe-Signature');

  if (!signature) {
    return NextResponse.json(
      { message: "Falta el Stripe Signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event | null = null;
  let customerFound: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> | null = null;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    switch (event.type) {
      case 'customer.subscription.created':
        customerFound = await getCustomer(event.data.object.customer as string);

        if (!customerFound || !('email' in customerFound) || !customerFound.email) {
          throw new Error('El usuario a ha sido eliminado o no tiene el email asignado');
        }

        await prisma.user.update({
          where: { email: customerFound.email },
          data: {
            subscriptionId: event.data.object.id
          }
        });

        break;
      case 'customer.subscription.updated':
        customerFound = await getCustomer(event.data.object.customer as string);

        if (!customerFound || !('email' in customerFound) || !customerFound.email) {
          throw new Error('El usuario a ha sido eliminado o no tiene el email asignado');
        }

        await prisma.user.update({
          where: { email: customerFound.email },
          data: {
            subscriptionId: event.data.object.status === 'active' ? event.data.object.id : null
          }
        });
        break;
      case 'customer.subscription.deleted':
        customerFound = await getCustomer(event.data.object.customer as string);

        if (!customerFound || !('email' in customerFound) || !customerFound.email) {
          throw new Error('El usuario a ha sido eliminado o no tiene el email asignado');
        }

        await prisma.user.update({
          where: { email: customerFound.email },
          data: {
            subscriptionId: null
          }
        });
        break;
    }
    
    return new NextResponse(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Error inesperado, compruebe que el Stripe Signature sea correcto' },
      { status: 500 }
    );
  }
}
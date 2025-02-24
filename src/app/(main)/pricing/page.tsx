import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getSubscriptions } from '@/lib/stripe';
import PricingCard from './_components/pricing-card';

const features = ['Acceso a todos los cursos', 'Soporte prioritario', 'Soporte por correo electrónico y chat', 'Certificado de finalización'];

export default async function Pricing() {
  const auth = await getAuth();

  if (auth && auth.subscription && auth.subscription.status === 'active') {
    return redirect('/');
  }

  const subscriptions = await getSubscriptions();

  if (!subscriptions) return redirect('/');

  return (
    <div className="container mx-auto p-10 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-6">Suscripciones diseñadas a tu medida</h1>
      <p className="text-muted-foreground text-base text-center mb-12 text-balance">
        Desde PSuarezdev Academy nos hemos centrado en ofrecer el plan que mejor se adapte a ti.
        <br />
        Todos los planes de pago tienen todas las características premium activadas.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {subscriptions
          .sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
          .map((subscription, index) => (
            <PricingCard
              key={index}
              accessToken={auth?.accessToken}
              data={{
                id: subscription.id as string,
                name: subscription.productDetails.name,
                amount: (subscription.unit_amount ?? 0) / 100,
                description: subscription.productDetails.description ?? '',
                features
              }}
            />
          ))}
      </div>
    </div>
  );
}
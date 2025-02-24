import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import EditProfileForm from './_components/edit-profile-form';
import SubscriptionManager from './_components/subscription-manager';

export default async function Profile() {
  const auth = await getAuth();

  if (!auth) return redirect('/sign-in');

  const { subscription, ...authUser } = auth;

  return (
    <div className="container mx-auto py-10 space-y-10">
      <EditProfileForm authUser={authUser} />
      {(auth.subscription && auth.subscription.status === 'active') && (
        <SubscriptionManager
          subscription={{
            status: auth.subscription.status,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name: `${subscription?.productDetails?.name} - ${((auth.subscription as any)?.plan?.amount ?? '') / 100}€`,
            renewalDate: new Date(auth.subscription.current_period_end * 1000),
            isCancelled: auth.subscription.cancel_at_period_end
          }}
        />
      )}
    </div>
  );
}
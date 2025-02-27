import { cookies, headers } from 'next/headers';
import type { User } from '@prisma/client';
import Stripe from 'stripe';

export type ProductDetail = {
  name: string;
  description: string | null;
  metadata: Stripe.Metadata;
};

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) return null;

    const { user, accessToken } = await res.json();

    cookies().set('accessToken', accessToken);

    return user;
  } catch {
    return null;
  }
}

export async function register(firstName: string, lastName: string, email: string, password: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    if (!res.ok) return null;

    const { user, accessToken } = await res.json();

    cookies().set('accessToken', accessToken);

    return user;
  } catch {
    return null;
  }
}

export function logout() {
  const cookieStore = cookies();
  const accessToken = cookieStore.has('accessToken');
  if (!accessToken) return;
  cookieStore.delete('accessToken');
}

export async function getAuth() {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const authorizationHeader = headers().get('Authorization');

    const tokenFromHeader = authorizationHeader?.startsWith('Bearer ')
      ? authorizationHeader.substring(7)
      : null;

    const res = await fetch(`${process.env.API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken || tokenFromHeader}`
      }
    });

    if (!res.ok) return null;

    const data = await res.json() as {
      user: Omit<User, 'password'>;
      subscription: Stripe.Response<Stripe.Subscription> & {
        productDetails: ProductDetail | null;
      };
    };

    return {
      ...data.user, 
      accessToken, 
      subscription: data.subscription 
    };
  } catch {
    return null;
  }
}
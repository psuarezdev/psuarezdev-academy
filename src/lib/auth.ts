import { cookies, headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import type { User } from '@prisma/client';
import { getSubscription } from './stripe';
import prisma from './prisma';

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
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
    const res = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
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

    const payload = verify((accessToken || tokenFromHeader) ?? '', `${process.env.JWT_SECRET}`);

    if (!payload || !(payload as JwtPayload)?.id) return null;

    if ((payload as JwtPayload).exp < Math.floor(Date.now() / 1000)) {
      cookies().delete('accessToken');
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: (payload as User).id },
      omit: { password: true },
    });

    if (!user) return null;

    const subscription = user.subscriptionId ? await getSubscription(user.subscriptionId) : null;

    return { ...user, accessToken, subscription };
  } catch {
    return null;
  }
}

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
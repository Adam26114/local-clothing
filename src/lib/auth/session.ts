import { cookies } from 'next/headers';

import { Role } from '@/lib/types';

const ROLE_COOKIE = 'khit_role';
const EMAIL_COOKIE = 'khit_email';
const NAME_COOKIE = 'khit_name';
const SESSION_COOKIE = 'khit_session';

export type AppSession = {
  isAuthenticated: boolean;
  email?: string;
  name?: string;
  role: Role;
};

export function isSuperAdminEmail(email: string): boolean {
  const allowed = (process.env.SUPERADMIN_EMAILS ?? '')
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

export async function getSession(): Promise<AppSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return { isAuthenticated: false, role: 'customer' };
  }

  const roleValue = cookieStore.get(ROLE_COOKIE)?.value;
  const role: Role = roleValue === 'admin' ? 'admin' : 'customer';
  const email = cookieStore.get(EMAIL_COOKIE)?.value;
  const name = cookieStore.get(NAME_COOKIE)?.value;
  return { isAuthenticated: true, role, email, name };
}

export async function createSession(payload: {
  email: string;
  name: string;
  role: Role;
}): Promise<void> {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set(SESSION_COOKIE, 'active', { expires, httpOnly: true, sameSite: 'lax' });
  cookieStore.set(EMAIL_COOKIE, payload.email, { expires, httpOnly: true, sameSite: 'lax' });
  cookieStore.set(NAME_COOKIE, payload.name, { expires, httpOnly: true, sameSite: 'lax' });
  cookieStore.set(ROLE_COOKIE, payload.role, { expires, httpOnly: true, sameSite: 'lax' });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(EMAIL_COOKIE);
  cookieStore.delete(NAME_COOKIE);
  cookieStore.delete(ROLE_COOKIE);
}

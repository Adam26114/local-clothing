'use server';

import { redirect } from 'next/navigation';

import { createSession, isSuperAdminEmail } from '@/lib/auth/session';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !password) {
    redirect('/auth/login?error=missing');
  }

  const role = isSuperAdminEmail(email) ? 'admin' : 'customer';

  await createSession({
    email,
    name: email.split('@')[0] ?? 'Customer',
    role,
  });

  if (role === 'admin') {
    redirect('/admin');
  }

  redirect('/account');
}

export async function registerAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '').trim();

  if (!name || !email || !password) {
    redirect('/auth/register?error=missing');
  }

  const role = isSuperAdminEmail(email) ? 'admin' : 'customer';

  await createSession({
    email,
    name,
    role,
  });

  redirect(role === 'admin' ? '/admin' : '/account');
}

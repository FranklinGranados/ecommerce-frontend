'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchAPI } from '@/lib/api';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let token: string;

  try {
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    token = data.access_token;
  } catch (error) {
    redirect('/login?error=' + encodeURIComponent('Credenciales incorrectas'));
  }

  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  redirect('/products');
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  } catch (error: any) {
    redirect('/login?error=' + encodeURIComponent(error.message));
  }

  redirect('/login?message=' + encodeURIComponent('Cuenta creada. Ahora iniciá sesión'));
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  redirect('/login');
}
import { verifyJWT, signJWT } from './auth';
import { cookies } from 'next/headers';

export async function createSession(username: string): Promise<string> {
  const token = await signJWT({ username });
  const isProd = process.env.NODE_ENV === 'production';
  // When setting the cookie in the login route:
  const cookieStore = await cookies();
  cookieStore.set('nova-session', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  return token;
}

export async function verifySession(token: string): Promise<any> {
  return verifyJWT(token);
}

export async function getSession(request: Request): Promise<any> {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').reduce((acc: Record<string, string>, cookie) => {
    const [name, ...value] = cookie.trim().split('=');
    if (name) acc[name] = value.join('=');
    return acc;
  }, {});

  const token = cookies['nova-session'];
  if (!token) return null;

  return verifySession(token);
}

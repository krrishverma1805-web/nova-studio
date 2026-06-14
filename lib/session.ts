import { verifyJWT, signJWT } from './auth';

export async function createSession(username: string): Promise<string> {
  return signJWT({ username });
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

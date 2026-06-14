import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('nova-session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  const session = await verifySession(token);
  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/((?!login).*)'],
};

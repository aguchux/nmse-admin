// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allowed paths that don't require authentication
  const allowedPaths = [
    /^\/auth\//,
    /^\/api\//,
    /^\/_next\//,
    /^\/public\//,
    /^\/favicon.ico$/,
  ];
  if (allowedPaths.some((regex) => regex.test(pathname))) {
    return NextResponse.next();
  }
  // Read token from cookies
  const token = req.cookies.get('__session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return NextResponse.next();

//   try {
//     const verified = await verifyToken(token);
//     if (!verified || !verified.payload.sub) {
//       console.error('Token verification failed:', verified);
//       return NextResponse.redirect(new URL('/auth/login', req.url));
//     }
//     // Token is valid; proceed with the request
//     return NextResponse.next();
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }
}

// Apply middleware to all routes except those in the matcher below
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
};

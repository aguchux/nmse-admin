// middleware.ts
// Middleware to verify JWT tokens in cookies
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './libs/actions/token';

export async function middleware(req: NextRequest) {
    // Get the path from the URL
    const { pathname } = req.nextUrl;
    // Allowed paths that don't require authentication
    const allowedPaths = [
        /^\/auth\//,
        /^\/api\//,
        /^\/_next\//,
        /^\/public\//,
        /^\/favicon.ico$/,
    ];
    // Skip middleware for allowed paths
    if (allowedPaths.some((regex) => regex.test(pathname))) {
        return NextResponse.next();
    }
    // Read token from cookies
    const token = req.cookies.get('__session')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
    try {
        const verified = await verifyToken(token);
        if (!verified || !verified.payload) {
            console.error('Token verification failed:', verified.payload);
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        }
        console.log('Token verified:', verified.payload);
        // Token is valid; proceed with the request
        return NextResponse.next();
    } catch (error) {
        console.error('Token verification failed:');
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
}

// Apply middleware to all routes except those in the matcher below
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
};

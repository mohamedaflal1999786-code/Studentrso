import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from './lib/security-shield';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, _next internal files, and favicon for zero overhead
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // images, fonts, icons, etc.
  ) {
    return NextResponse.next();
  }

  // 1b. Catch root OAuth redirects: If Google/Supabase redirected to / with ?code= or ?error=,
  // forward immediately to /auth/callback so the authorization code is exchanged into a student session!
  if (
    pathname === '/' &&
    (request.nextUrl.searchParams.has('code') || request.nextUrl.searchParams.has('error'))
  ) {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = '/auth/callback';
    return NextResponse.redirect(callbackUrl);
  }

  // 2. Client Identifier for Rate Limiting (IP or forwarded header)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // 3. Apply Edge Rate Limiting for API routes (200 requests/min per IP)
  if (pathname.startsWith('/api/')) {
    const rateCheck = checkRateLimit(ip, 200, 60000);
    if (!rateCheck.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded. Too many requests. Please try again shortly.',
          retryAfterMs: rateCheck.resetMs,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(rateCheck.resetMs / 1000).toString(),
            'X-RateLimit-Limit': '200',
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

  // 4. Attach Comprehensive Security & High-Performance Headers
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // Cache acceleration headers for high concurrency
  if (pathname.startsWith('/api/scholarships/records') || pathname.startsWith('/api/audit/')) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

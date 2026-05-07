import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PREVIEW_HOST_FRAGMENTS = ['.pages.dev', '.workers.dev'];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isPreviewHost = PREVIEW_HOST_FRAGMENTS.some((f) => hostname.includes(f));

  const response = NextResponse.next();

  // Block indexing of any preview host
  if (isPreviewHost) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  // ?na query -> 7d noAds cookie
  if (request.nextUrl.searchParams.has('na')) {
    response.cookies.set('noAds', '1', { maxAge: 604800, path: '/' });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|assets|favicon.ico|robots.txt|manifest.json|api).*)'],
};

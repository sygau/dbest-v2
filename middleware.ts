import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROD_HOST = 'dse.best';
const PREVIEW_HOST_FRAGMENTS = ['.pages.dev', '.workers.dev'];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isProd = process.env.IS_PROD === 'true';
  const isPreviewHost = PREVIEW_HOST_FRAGMENTS.some((f) => hostname.includes(f));

  // 1. Production canonicalization: redirect any preview host -> dse.best.
  if (isProd && isPreviewHost) {
    const url = new URL(`https://${PROD_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  // 2. Block indexing of any non-prod host (preview workers, .pages.dev, etc.).
  if (isPreviewHost) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  // 3. ?na query -> 7d noAds cookie.
  if (request.nextUrl.searchParams.has('na')) {
    response.cookies.set('noAds', '1', { maxAge: 604800, path: '/' });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|assets|favicon.ico|robots.txt|manifest.json|api).*)'],
};

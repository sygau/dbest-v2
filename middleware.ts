import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isProdEnv = process.env.IS_PROD === 'true';

  // Only redirect if we are in the Prod environment and hitting the pages.dev alias
  if (isProdEnv && hostname.includes('.pages.dev')) {
    const redirectUrl = new URL(`https://dse.best${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // --- Start No Ads (?na) Cookie Logic ---
  const response = NextResponse.next()

  if (request.nextUrl.searchParams.has('na')) {
    // Set cookie for 7 days (604800 seconds)
    response.cookies.set('noAds', '1', { 
      maxAge: 604800, 
      path: '/' 
    })
  }

  return response
}


export const config = {
  // Exclude assets, Next internals, and API routes.
  matcher: [
    '/((?!_next|assets|favicon.ico|robots.txt|manifest.json|_vercel|api).*)'
  ]
}

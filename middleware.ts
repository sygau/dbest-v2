import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isMaintenanceEnabled = (process.env.MAINTENANCE_MODE === 'true' || process.env.MAINTENANCE_MODE === '1')
const isMaydayEnabled = (process.env.MAYDAY === 'true' || process.env.MAYDAY === '1')

export function middleware(request: NextRequest) {
  // Mayday mode - redirect all traffic to mayday.dse.best
  if (isMaydayEnabled) {
    const maydayUrl = new URL('https://mayday.dse.best' + request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(maydayUrl)
  }

  // Maintenance mode - show maintenance page
  if (isMaintenanceEnabled) {
    const { pathname } = request.nextUrl

    // Allow only the maintenance page and essential static/Next internals
    const isAllowed = (
      pathname === '/maintenance' ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/assets') ||
      pathname.startsWith('/public') ||
      pathname.startsWith('/favicon') ||
      pathname === '/favicon.ico' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname === '/manifest.json' ||
      pathname.startsWith('/_vercel')
    )

    if (isAllowed) {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // Exclude assets and Next internals as an optimization
  matcher: [
    '/((?!_next|assets|favicon.ico|robots.txt|sitemap.xml|manifest.json|_vercel).*)'
  ]
} 
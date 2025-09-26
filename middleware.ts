import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isMaintenanceEnabled = (process.env.MAINTENANCE_MODE === 'true' || process.env.MAINTENANCE_MODE === '1')

// Passcode gate envs
const isPasscodeMode = (process.env.PASSCODE_MODE === 'true' || process.env.PASSCODE_MODE === '1')
const passcodeCookieName = process.env.PASSCODE_COOKIE_NAME || 'site_pass'

function getSecretsList(): string[] {
  const raw = (process.env.PASSCODE_SECRETS || process.env.PASSCODE_SECRET || '').trim()
  if (!raw) return []
  return raw.split(',').map(s => s.trim()).filter(Boolean).sort()
}

async function getSecretsVersion(): Promise<string | null> {
  const list = getSecretsList()
  if (list.length === 0) return null
  const joined = list.join('|')
  const data = new TextEncoder().encode(joined)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(hashBuffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  const base64 = btoa(binary)
  const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
  return base64url
}

export async function middleware(request: NextRequest) {
  // Redirect pages.dev subdomain to main domain
  const hostname = request.headers.get('host') || ''
  if (hostname.includes('.pages.dev')) {
    const redirectUrl = new URL(`https://dse.best${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(redirectUrl, 301)
  }

  // Redirect xv-dbest.vercel.app to x.dse.best
  if (hostname === 'xv-dbest.vercel.app') {
    const redirectUrl = new URL(`https://x.dse.best${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(redirectUrl, 301)
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

  // Passcode gate - simple cookie-based access control
  if (isPasscodeMode) {
    const { pathname, search } = request.nextUrl

    // Allow list: lock page, unlock API, and essential internals/static
    const isAllowedPass = (
      pathname === '/lock' ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/assets') ||
      pathname.startsWith('/public') ||
      pathname === '/favicon.ico' ||
      pathname === '/robots.txt' ||
      pathname === '/manifest.json' ||
      pathname.startsWith('/_vercel')
    )

    // Special restriction for appendLinksX.js - only allow for authorized users
    if (pathname === '/assets/js/appendLinksX.js') {
      const passCookie = request.cookies.get(passcodeCookieName)?.value
      const currentVersion = await getSecretsVersion()
      if (!currentVersion || passCookie !== currentVersion) {
        return new NextResponse('Access Denied', { status: 403 })
      }
    }

    if (!isAllowedPass) {
      const passCookie = request.cookies.get(passcodeCookieName)?.value
      const currentVersion = await getSecretsVersion()
      if (!currentVersion || passCookie !== currentVersion) {
        const url = request.nextUrl.clone()
        url.pathname = '/lock'
        url.search = search ? `?next=${encodeURIComponent(pathname + search)}` : `?next=${encodeURIComponent(pathname)}`
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  // Exclude assets, Next internals, AND API routes
  matcher: [
    '/((?!_next|assets|favicon.ico|robots.txt|manifest.json|_vercel|api).*)'
  ]
} 
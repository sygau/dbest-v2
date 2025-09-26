import type { NextRequest } from 'next/server'

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge'

// Simple in-memory rate limiter (per process)
const attemptsByIp = new Map<string, { count: number; first: number }>()
const WINDOW_MS = 60 * 1000 // 1 minute window
const MAX_ATTEMPTS = 10 // max attempts per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attemptsByIp.get(ip)
  if (!entry) {
    attemptsByIp.set(ip, { count: 1, first: now })
    return false
  }
  // Reset window
  if (now - entry.first > WINDOW_MS) {
    attemptsByIp.set(ip, { count: 1, first: now })
    return false
  }
  entry.count += 1
  if (entry.count > MAX_ATTEMPTS) return true
  return false
}

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

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  // Basic anti-CSRF: enforce same-origin
  const origin = req.headers.get('origin') || ''
  const host = req.headers.get('host') || ''
  if (!origin || !origin.includes(host)) {
    return new Response(JSON.stringify({ ok: false, error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             req.headers.get('x-real-ip') || 
             'unknown'
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ ok: false, error: 'Too many attempts, slow down.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const secrets = getSecretsList()
  if (secrets.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const cookieName = process.env.PASSCODE_COOKIE_NAME || 'site_pass'
  const maxAgeDays = parseInt(process.env.PASSCODE_MAX_AGE_DAYS || '7', 10)
  const maxAgeSeconds = Math.max(1, maxAgeDays) * 24 * 60 * 60

  let body
  try {
    body = await req.json()
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const { passcode } = body || {}
  if (!passcode || typeof passcode !== 'string') {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid passcode' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Validate against any configured secret (case-insensitive)
  const passLc = passcode.trim().toLowerCase()
  const isValid = secrets.some(s => s.toLowerCase() === passLc)
  if (!isValid) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid passcode' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Set versioned cookie tied to the current secrets set
  const version = await getSecretsVersion()
  if (!version) {
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const isSecure = process.env.NODE_ENV === 'production'
  const cookieValue = `${cookieName}=${version}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}; ${isSecure ? 'Secure;' : ''}`
  
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Set-Cookie': cookieValue
    }
  })
} 
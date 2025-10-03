import type { NextApiRequest, NextApiResponse } from 'next'

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

// CDN URL configuration with versioning support
// Note: CDN URLs are now stored in environment variables for security
const CDN_CONFIG = {
  // Primary CDN URL from environment variable
  primaryUrl: process.env.SECURE_CDN_URL || 'https://x7m2qv9gkz1w8n3r5t6b4c0aehjldpuoyfsvxiwqzmnk3g7r2t9b6c5aeh.pages.dev',
  // Fallback CDN URL
  fallbackUrl: 'https://dbest-cdn.pages.dev',
  // Version for cache invalidation
  version: '1.0.0',
  // Cache expiry in hours (24 hours default)
  cacheExpiryHours: 24
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('SECURE CDN API CALLED:', req.method, req.url)

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Server error' })
  }

  const secrets = getSecretsList()
  if (secrets.length === 0) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }

  const cookieName = process.env.PASSCODE_COOKIE_NAME || 'site_pass'
  
  // Check authorization cookie
  const passCookie = req.cookies[cookieName]
  const currentVersion = await getSecretsVersion()
  
  if (!currentVersion || passCookie !== currentVersion) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  // Get current timestamp for cache expiry
  const now = new Date()
  const expiryTime = new Date(now.getTime() + (CDN_CONFIG.cacheExpiryHours * 60 * 60 * 1000))

  // Return CDN configuration with versioning and expiry
  return res.status(200).json({
    ok: true,
    cdnUrl: CDN_CONFIG.primaryUrl,
    fallbackUrl: CDN_CONFIG.fallbackUrl,
    version: CDN_CONFIG.version,
    expiresAt: expiryTime.toISOString(),
    cacheExpiryHours: CDN_CONFIG.cacheExpiryHours
  })
}

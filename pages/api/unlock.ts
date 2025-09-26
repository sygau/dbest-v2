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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Debug logging
  console.log('Next.js API Request:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    host: req.headers.host,
    referer: req.headers.referer
  })

  const secrets = getSecretsList()
  if (secrets.length === 0) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }

  const cookieName = process.env.PASSCODE_COOKIE_NAME || 'site_pass'
  const maxAgeDays = parseInt(process.env.PASSCODE_MAX_AGE_DAYS || '7', 10)
  const maxAgeSeconds = Math.max(1, maxAgeDays) * 24 * 60 * 60

  const { passcode } = req.body || {}
  if (!passcode || typeof passcode !== 'string') {
    return res.status(400).json({ ok: false, error: 'Invalid passcode' })
  }

  // Validate against any configured secret (case-insensitive)
  const passLc = passcode.trim().toLowerCase()
  const isValid = secrets.some(s => s.toLowerCase() === passLc)
  if (!isValid) {
    return res.status(401).json({ ok: false, error: 'Invalid passcode' })
  }

  // Set versioned cookie tied to the current secrets set
  const version = await getSecretsVersion()
  if (!version) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }

  const isSecure = process.env.NODE_ENV === 'production'
  res.setHeader('Set-Cookie', `${cookieName}=${version}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}; ${isSecure ? 'Secure;' : ''}`)
  
  return res.status(200).json({ ok: true })
}

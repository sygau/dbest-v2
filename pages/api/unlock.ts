import type { NextApiRequest, NextApiResponse } from 'next'

// NTFY notification helper for successful authentications
async function sendAuthNotification(userInfo: any, passcode: string) {
  const url = 'https://ntfy.sh/DBEST_XV_ENTRYANDMANAGEMENTALERTS'
  
  // Build location info with emojis
  let locationInfo = ''
  if (userInfo.geography) {
    const geo = userInfo.geography
    locationInfo = `🌍 ${geo.country || 'Unknown'}`
    if (geo.regionName) locationInfo += `/${geo.regionName}`
    if (geo.city) locationInfo += `, ${geo.city}`
  } else {
    locationInfo = '🌍 Unknown location'
  }

  // Build device and browser info
  let deviceBrowserInfo = ''
  if (userInfo.device) {
    const deviceEmoji = getDeviceEmoji(userInfo.device)
    deviceBrowserInfo = `${deviceEmoji} ${userInfo.device}`
    if (userInfo.browser) {
      deviceBrowserInfo += ` | ${userInfo.browser}`
    }
  } else {
    deviceBrowserInfo = '💻 Unknown device'
    if (userInfo.browser) {
      deviceBrowserInfo += ` | ${userInfo.browser}`
    }
  }

  // Build message content
  const messageContent = `🔓 Successful Authentication\n\nPasscode: ${passcode}\n\n${locationInfo}\n${deviceBrowserInfo}\n🔗 IP: ${userInfo.ip || 'Unknown'}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Title': '🔓 xDB Authentication',
        'X-Priority': '4',
        'X-Click': 'https://x.dse.best',
        'X-Icon': 'https://dse.best/assets/images/logo-icon.png',
        'X-Actions': `view, Visit Site, https://x.dse.best; http, IP Info, https://ipinfo.io/${userInfo.ip || ''}`
      },
      body: messageContent
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    console.log('NTFY authentication notification sent!', response.status)
  } catch (error) {
    console.error('Failed to send NTFY notification:', error)
  }
}

// Device detection helper
function detectDevice(userAgent: string): string {
  if (!userAgent) return 'Unknown'
  
  const ua = userAgent.toLowerCase()
  
  // Mobile devices
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('ipod')) {
    if (ua.includes('android')) return 'Android Mobile'
    if (ua.includes('iphone')) return 'iPhone'
    if (ua.includes('ipod')) return 'iPod'
    return 'Mobile'
  }
  
  // Tablets
  if (ua.includes('tablet') || ua.includes('ipad')) {
    if (ua.includes('ipad')) return 'iPad'
    return 'Tablet'
  }
  
  // Desktop browsers
  if (ua.includes('windows')) return 'Windows Desktop'
  if (ua.includes('macintosh') || ua.includes('mac os')) return 'Mac Desktop'
  if (ua.includes('linux')) return 'Linux Desktop'
  if (ua.includes('chromeos')) return 'Chrome OS'
  
  return 'Desktop'
}

// Browser detection helper
function detectBrowser(userAgent: string): string {
  if (!userAgent) return 'Unknown'
  
  const ua = userAgent.toLowerCase()
  
  // Chrome-based browsers
  if (ua.includes('chrome') && !ua.includes('edg')) {
    if (ua.includes('brave')) return 'Brave'
    if (ua.includes('opera') || ua.includes('opr')) return 'Opera'
    return 'Chrome'
  }
  
  // Edge
  if (ua.includes('edg')) return 'Edge'
  
  // Firefox
  if (ua.includes('firefox')) return 'Firefox'
  
  // Safari
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari'
  
  return 'Unknown'
}

// Device emoji helper
function getDeviceEmoji(device: string): string {
  const deviceLower = device.toLowerCase()
  
  if (deviceLower.includes('mobile') || deviceLower.includes('android') || deviceLower.includes('iphone')) {
    return '📱'
  } else if (deviceLower.includes('tablet') || deviceLower.includes('ipad')) {
    return '📱'
  } else if (deviceLower.includes('windows')) {
    return '🖥️'
  } else if (deviceLower.includes('mac')) {
    return '🍎'
  } else if (deviceLower.includes('linux')) {
    return '🐧'
  } else if (deviceLower.includes('chromeos')) {
    return '🌐'
  } else {
    return '💻'
  }
}

// Geolocation helper
async function getGeoData(ip: string) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    if (!response.ok) throw new Error('Geo API failed')
    return await response.json()
  } catch (error) {
    console.error('Failed to get geo data:', error)
    return null
  }
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestId = Math.random().toString(36).substring(2, 15)
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection?.remoteAddress || 'unknown'
  const userAgent = req.headers['user-agent'] || 'unknown'
  
  console.log(`[${requestId}] UNLOCK API CALLED:`, {
    method: req.method,
    url: req.url,
    ip: clientIP,
    userAgent: userAgent.substring(0, 100), // Truncate for security
    timestamp: new Date().toISOString()
  })

  // Request size limit (1MB)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10)
  const maxSize = 1024 * 1024 // 1MB
  
  if (contentLength > maxSize) {
    console.log(`[${requestId}] SECURITY: Request too large:`, {
      contentLength,
      maxSize,
      ip: clientIP
    })
    return res.status(413).json({ ok: false, error: 'Unauthorized' })
  }

  const allowedOrigins = [
    'https://x.dse.best',
    'https://www.x.dse.best'
  ]
  
  const origin = req.headers.origin
  
  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`[${requestId}] SECURITY: Invalid method:`, {
      method: req.method,
      ip: clientIP,
      userAgent: userAgent.substring(0, 50)
    })
    return res.status(405).json({ ok: false, error: 'Unauthorized' })
  }
  
  // Check origin for security
  if (!origin || !allowedOrigins.includes(origin)) {
    console.log(`[${requestId}] SECURITY: Invalid origin:`, {
      origin,
      ip: clientIP,
      userAgent: userAgent.substring(0, 50)
    })
    return res.status(403).json({ ok: false, error: 'Unauthorized' })
  }

  const secrets = getSecretsList()
  if (secrets.length === 0) {
    console.log(`[${requestId}] SECURITY: No secrets configured:`, {
      ip: clientIP
    })
    return res.status(500).json({ ok: false, error: 'Unauthorized' })
  }

  const cookieName = process.env.PASSCODE_COOKIE_NAME || 'site_pass'
  const maxAgeDays = parseInt(process.env.PASSCODE_MAX_AGE_DAYS || '7', 10)
  const maxAgeSeconds = Math.max(1, maxAgeDays) * 24 * 60 * 60

  const { passcode } = req.body || {}
  if (!passcode || typeof passcode !== 'string') {
    console.log(`[${requestId}] SECURITY: Invalid passcode format:`, {
      hasPasscode: !!passcode,
      passcodeType: typeof passcode,
      ip: clientIP
    })
    return res.status(400).json({ ok: false, error: 'Unauthorized' })
  }

  // Validate against any configured secret (case-insensitive)
  const passLc = passcode.trim().toLowerCase()
  const isValid = secrets.some(s => s.toLowerCase() === passLc)
  if (!isValid) {
    console.log(`[${requestId}] SECURITY: Invalid passcode attempt:`, {
      passcodeLength: passcode.length,
      ip: clientIP,
      userAgent: userAgent.substring(0, 50)
    })
    return res.status(401).json({ ok: false, error: 'Invalid passcode' })
  }

  // Set versioned cookie tied to the current secrets set
  const version = await getSecretsVersion()
  if (!version) {
    console.log(`[${requestId}] SECURITY: Failed to generate version:`, {
      ip: clientIP
    })
    return res.status(500).json({ ok: false, error: 'Unauthorized' })
  }

  const isSecure = process.env.NODE_ENV === 'production'
  res.setHeader('Set-Cookie', `${cookieName}=${version}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}; ${isSecure ? 'Secure;' : ''}`)
  
  console.log(`[${requestId}] SUCCESS: Valid passcode accepted:`, {
    ip: clientIP,
    userAgent: userAgent.substring(0, 50),
    cookieVersion: version.substring(0, 8) + '...', // Partial version for logging
    maxAge: maxAgeSeconds
  })
  
  // Send NTFY notification for successful authentication
  try {
    const geoData = await getGeoData(clientIP)
    const deviceInfo = detectDevice(userAgent)
    const browserInfo = detectBrowser(userAgent)
    
    await sendAuthNotification({
      ip: clientIP,
      geography: geoData,
      device: deviceInfo,
      browser: browserInfo
    }, passcode)
  } catch (error) {
    console.error(`[${requestId}] Failed to send auth notification:`, error)
  }
  
  return res.status(200).json({ ok: true })
}

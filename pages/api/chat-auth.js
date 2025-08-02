const Ably = require('ably');
// Initialize rate limiting map
const rateLimits = new Map();

// Rate limit settings
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute

function isRateLimited(clientId) {
  const now = Date.now();
  const userLimit = rateLimits.get(clientId);

  if (!userLimit) {
    rateLimits.set(clientId, {
      count: 1,
      windowStart: now
    });
    return false;
  }

  if (now - userLimit.windowStart > RATE_LIMIT_WINDOW) {
    rateLimits.set(clientId, {
      count: 1,
      windowStart: now
    });
    return false;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return true;
  }

  userLimit.count++;
  return false;
}

export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Parse the request body if it's a string
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { clientId, username } = body || {};

    if (!clientId) {
      return res.status(400).json({ error: 'Missing clientId' });
    }

    // Check rate limiting
    if (isRateLimited(clientId)) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    // Check if ABLY_API_KEY is set
    if (!process.env.ABLY_API_KEY) {
      console.error('ABLY_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Ably instance
    const ably = new Ably.Rest(process.env.ABLY_API_KEY);

    // Create token request
    const tokenParams = {
      clientId,
      capability: {
        'dsebest-livechat': ['publish', 'subscribe', 'presence', 'history']
      }
    };

    const tokenRequest = await ably.auth.createTokenRequest(tokenParams);
    return res.status(200).json(tokenRequest);

  } catch (error) {
    console.error('Token generation error:', error);
    return res.status(500).json({ 
      error: 'Error generating token',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

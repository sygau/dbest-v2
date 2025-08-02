const Ably = require('ably/promises');

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
    // Reset window
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

// Basic profanity check (can be expanded)
function moderateContent(text) {
  // Add your profanity list or use a package like bad-words
  const basicBadWords = ['badword1', 'badword2']; // Replace with actual bad words
  const containsBadWords = basicBadWords.some(word => 
    text.toLowerCase().includes(word.toLowerCase())
  );
  
  return {
    isClean: !containsBadWords,
    reason: containsBadWords ? 'Message contains inappropriate content' : null
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, username, action } = req.body;

  if (!clientId || !username) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Check rate limiting
  if (isRateLimited(clientId)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  try {
    const ably = new Ably.Rest(process.env.ABLY_API_KEY);

    // For message moderation
    if (action === 'moderate') {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'No message to moderate' });
      }

      const modResult = moderateContent(message);
      if (!modResult.isClean) {
        return res.status(403).json({ error: modResult.reason });
      }
      
      return res.status(200).json({ status: 'Message approved' });
    }

    // For token generation
    const tokenParams = { clientId, capability: {
      'dsebest-livechat': ['publish', 'subscribe', 'presence', 'history']
    }};

    const tokenRequest = await ably.auth.createTokenRequest(tokenParams);
    
    res.status(200).json(tokenRequest);
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Error generating token' });
  }
}

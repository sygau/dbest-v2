const Ably = require('ably/promises');

// Initialize tracking maps
const rateLimits = new Map();
const userIPs = new Map();
const shadowBanned = new Map();

// Filesystem for logging
const fs = require('fs');
const path = require('path');

// Rate limit settings
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 20; // 20 requests per minute
const BLOCK_THRESHOLD = 3; // Number of rate limit violations before blocking
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Track rate limit violations
const violationCounts = new Map();
const blockedUsers = new Map();

function isRateLimited(clientId) {
  const now = Date.now();

  // Check if user is blocked
  const blockData = blockedUsers.get(clientId);
  if (blockData) {
    if (now - blockData.blockedAt < BLOCK_DURATION) {
      return { blocked: true, remaining: BLOCK_DURATION - (now - blockData.blockedAt) };
    } else {
      blockedUsers.delete(clientId);
      violationCounts.delete(clientId);
    }
  }

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
    // Increment violation count
    const violations = (violationCounts.get(clientId) || 0) + 1;
    violationCounts.set(clientId, violations);

    // Check if user should be blocked
    if (violations >= BLOCK_THRESHOLD) {
      blockedUsers.set(clientId, { blockedAt: now });
      return { blocked: true, remaining: BLOCK_DURATION };
    }

    return { limited: true, resetTime: userLimit.windowStart + RATE_LIMIT_WINDOW - now };
  }

  userLimit.count++;
  return false;
}

// Logging function for moderation events
async function logModeration(clientId, ip, username, message, reason, action) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${action}: ${username} (${clientId}) from ${ip}\nMessage: ${message}\nReason: ${reason}\n---\n`;
  
  try {
    const logPath = path.join(process.cwd(), 'logs', 'moderation.log');
    // Ensure logs directory exists
    await fs.promises.mkdir(path.join(process.cwd(), 'logs'), { recursive: true });
    await fs.promises.appendFile(logPath, logEntry);
  } catch (error) {
    console.error('Failed to write moderation log:', error);
  }
}

// Shadow ban check
function isShadowBanned(clientId) {
  const banData = shadowBanned.get(clientId);
  if (!banData) return false;
  
  // Check if ban is still active
  if (Date.now() - banData.bannedAt < banData.duration) {
    return true;
  } else {
    shadowBanned.delete(clientId);
    return false;
  }
}

// Content moderation with multiple checks
function moderateContent(text, clientId, ip, username) {
  // 1. Check for HTML/script tags
  const hasHTML = /<[^>]*>/.test(text);
  if (hasHTML) {
    return {
      isClean: false,
      reason: 'HTML tags are not allowed'
    };
  }

  // 2. Check for URLs/links
  const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\.[a-z]{2,}\/[^\s]+)/gi;
  if (urlPattern.test(text)) {
    return {
      isClean: false,
      reason: 'Links are not allowed in messages'
    };
  }

  // 3. Check message length
  if (text.length > 350) {
    return {
      isClean: false,
      reason: 'Message is too long (max 350 characters)'
    };
  }

  // 4. Advanced profanity check
  const profanityPatterns = [
    // Add your profanity patterns here
    /\b(fuck|shit|damn|bitch)\b/i,
    // Add more patterns as needed
    // Unicode-aware patterns for common evasion tactics
    /[\u0430-\u044f]{0,}(f+[^a-z]*u+[^a-z]*c+[^a-z]*k+)/i,
  ];

  for (const pattern of profanityPatterns) {
    if (pattern.test(text)) {
      return {
        isClean: false,
        reason: 'Message contains inappropriate language'
      };
    }
  }

  // 5. Check for spam patterns
  const spamPatterns = [
    /(.)\1{4,}/,  // Repeated characters (e.g., "aaaaa")
    /(.{3,})\1{2,}/i  // Repeated words or patterns
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(text)) {
      return {
        isClean: false,
        reason: 'Message appears to be spam'
      };
    }
  }
  
  return {
    isClean: true,
    reason: null
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, username, action } = req.body;
  
  // Get client IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
             req.headers['x-real-ip'] || 
             req.socket.remoteAddress;

  if (!clientId || !username) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Track user IP
  userIPs.set(clientId, {
    ip,
    lastSeen: Date.now(),
    username
  });

  // Check if user is shadow banned
  const shadowBanStatus = isShadowBanned(clientId);
  
  // Check rate limiting
  const rateLimitStatus = isRateLimited(clientId);
  if (rateLimitStatus && rateLimitStatus.blocked) {
    // Log permanent blocks
    await logModeration(clientId, ip, username, 'N/A', 'Rate limit violation led to block', 'BLOCKED');
    return res.status(429).json(rateLimitStatus);
  }

  try {
    const ably = new Ably.Rest(process.env.ABLY_API_KEY);

    // For message moderation
    if (action === 'moderate') {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'No message to moderate' });
      }

      // Check existing shadow ban
      if (shadowBanStatus) {
        // Silently accept but don't broadcast message
        return res.status(200).json({ 
          status: 'Message approved',
          shadow: true // Client will show message only to sender
        });
      }

      const modResult = moderateContent(message, clientId, ip, username);
      
      // Handle moderation result
      if (!modResult.isClean) {
        // Log medium/high severity violations
        if (modResult.severity !== 'low') {
          await logModeration(
            clientId, 
            ip, 
            username, 
            message, 
            modResult.reason,
            modResult.severity === 'high' ? 'SHADOW_BANNED' : 'VIOLATION'
          );
        }

        if (modResult.shadow) {
          // For shadow banned content, pretend it was accepted
          return res.status(200).json({ 
            status: 'Message approved',
            shadow: true
          });
        }
        
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

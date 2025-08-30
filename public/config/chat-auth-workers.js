// Cloudflare Workers version of chat-auth.js
// Optimized for Workers runtime with KV storage and Durable Objects support

// Environment variables (set in Cloudflare Workers dashboard)
const ABLY_API_KEY = 'YOUR_ABLY_API_KEY';
const LOGFLARE_API_KEY = 'YOUR_LOGFLARE_API_KEY';
const LOGFLARE_SOURCE_ID = 'YOUR_LOGFLARE_SOURCE_ID';
const MOD_SECRET_KEY = 'YOUR_MOD_SECRET_KEY';
const MOD_ID = 'YOUR_MOD_ID';
const MOD_IP = 'YOUR_MOD_IP';

// CORS configuration
const ALLOWED_ORIGINS = [
  'https://dse.best',
  'https://www.dse.best',
  'https://dbest-cdn.pages.dev'
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 15; // 15 requests per minute
const BLOCK_THRESHOLD = 2;
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Enhanced logging with Logflare
async function logToLogflare(event, metadata = {}) {
  if (!LOGFLARE_API_KEY || LOGFLARE_API_KEY === 'YOUR_LOGFLARE_API_KEY') {
    console.log('LOGFLARE_EVENT:', JSON.stringify({ event, metadata }, null, 2));
    return;
  }

  try {
    const logEntry = {
      message: event,
      metadata: {
        timestamp: new Date().toISOString(),
        service: 'dse-chat-workers',
        ...metadata
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`https://api.logflare.app/logs?source=${LOGFLARE_SOURCE_ID}`, {
      method: 'POST',
      headers: {
        'X-API-KEY': LOGFLARE_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logEntry),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to log to Logflare:', error.message);
    console.log('LOGFLARE_EVENT:', JSON.stringify({ event, metadata }, null, 2));
  }
}

// NTFY notification helper
async function sendNtfyNotification(messageData, userInfo = {}) {
  const url = 'https://ntfy.sh/DefinitelyWouldntbeDSEdotBESTwebsiteChatMessagingServiceEndpoint';

  let locationInfo = '';
  if (userInfo.geography) {
    const geo = userInfo.geography;
    locationInfo = `🌍 ${geo.country || 'Unknown'}`;
    if (geo.regionName) locationInfo += `/${geo.regionName}`;
    if (geo.city) locationInfo += `, ${geo.city}`;
  } else {
    locationInfo = '🌍 Unknown location';
  }

  let deviceBrowserInfo = '';
  if (userInfo.device) {
    const deviceEmoji = getDeviceEmoji(userInfo.device);
    deviceBrowserInfo = `${deviceEmoji} ${userInfo.device}`;
    if (userInfo.browser) {
      deviceBrowserInfo += ` | ${userInfo.browser}`;
    }
  } else {
    deviceBrowserInfo = '💻 Unknown device';
    if (userInfo.browser) {
      deviceBrowserInfo += ` | ${userInfo.browser}`;
    }
  }

  const messageContent = `${messageData.text}\n\n${locationInfo}\n${deviceBrowserInfo}\n🔗 ${userInfo.ip || 'Unknown IP'}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Title': messageData.sender,
        'X-Priority': '3',
        'X-Click': 'https://dse.best/chat',
        'X-Icon': 'https://dse.best/assets/images/logo-icon.png',
        'X-Actions': `view, Chat, https://dse.best/chat; http, IP Info, https://ipinfo.io/${userInfo.ip || ''}`
      },
      body: messageContent
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log('NTFY notification sent!', response.status);
  } catch (error) {
    console.error('Failed to send NTFY notification:', error);
  }
}

// Helper functions
function getDeviceEmoji(device) {
  const deviceLower = device.toLowerCase();
  
  if (deviceLower.includes('mobile') || deviceLower.includes('android') || deviceLower.includes('iphone')) {
    return '📱';
  } else if (deviceLower.includes('tablet') || deviceLower.includes('ipad')) {
    return '📱';
  } else if (deviceLower.includes('windows')) {
    return '🖥️';
  } else if (deviceLower.includes('mac')) {
    return '🍎';
  } else if (deviceLower.includes('linux')) {
    return '🐧';
  } else if (deviceLower.includes('chromeos')) {
    return '🌐';
  } else {
    return '💻';
  }
}

function detectDevice(userAgent) {
  if (!userAgent) return 'Unknown';
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('ipod')) {
    if (ua.includes('android')) return 'Android Mobile';
    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('ipod')) return 'iPod';
    return 'Mobile';
  }
  
  if (ua.includes('tablet') || ua.includes('ipad')) {
    if (ua.includes('ipad')) return 'iPad';
    return 'Tablet';
  }
  
  if (ua.includes('windows')) return 'Windows Desktop';
  if (ua.includes('macintosh') || ua.includes('mac os')) return 'Mac Desktop';
  if (ua.includes('linux')) return 'Linux Desktop';
  if (ua.includes('chromeos')) return 'Chrome OS';
  
  return 'Desktop';
}

function detectBrowser(userAgent) {
  if (!userAgent) return 'Unknown';
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('chrome') && !ua.includes('edg')) {
    if (ua.includes('brave')) return 'Brave';
    if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
    return 'Chrome';
  }
  
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('edg')) return 'Edge';
  if (ua.includes('msie') || ua.includes('trident')) return 'Internet Explorer';
  
  return 'Unknown Browser';
}

// IP geolocation helper
async function getGeolocation(ip) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        country: data.country || 'Unknown',
        region: data.regionName || 'Unknown',
        city: data.city || 'Unknown'
      };
    }
  } catch (error) {
    console.warn('Geolocation lookup failed:', error.message);
  }
  
  return { country: 'Unknown', region: 'Unknown', city: 'Unknown' };
}

// Moderator check
function isModerator(clientId, ip, secretmodkey = null) {
  if (secretmodkey && secretmodkey === MOD_SECRET_KEY) {
    return true;
  }
  
  return clientId === MOD_ID || ip === MOD_IP;
}

// Rate limiting with KV storage
async function isRateLimited(clientId, ip, env) {
  if (isModerator(clientId, ip)) return false;

  const key = `rate_limit:${ip}`;
  const now = Date.now();
  
  try {
    const current = await env.CHAT_KV.get(key, 'json') || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    if (now > current.resetTime) {
      // Reset window
      await env.CHAT_KV.put(key, JSON.stringify({ count: 1, resetTime: now + RATE_LIMIT_WINDOW }), { expirationTtl: 60 });
      return false;
    }
    
    if (current.count >= MAX_REQUESTS) {
      return true;
    }
    
    // Increment count
    await env.CHAT_KV.put(key, JSON.stringify({ count: current.count + 1, resetTime: current.resetTime }), { expirationTtl: 60 });
    return false;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return false; // Fail open
  }
}

// Ban checking with KV storage
async function isUserBanned(clientId, ip, env) {
  if (isModerator(clientId, ip)) return false;
  
  try {
    const banKey = `ban:${clientId}`;
    const ipBanKey = `ban_ip:${ip}`;
    
    const userBan = await env.CHAT_KV.get(banKey);
    const ipBan = await env.CHAT_KV.get(ipBanKey);
    
    return !!(userBan || ipBan);
  } catch (error) {
    console.error('Ban check error:', error);
    return false; // Fail open
  }
}

// Content moderation functions
function moderateContent(text, clientId, ip, username) {
  if (isModerator(clientId, ip)) {
    return {
      isClean: true,
      reason: null,
      cleanText: text
    };
  }

  const cleanText = String(text || '').trim();
  
  if (!cleanText) {
    return {
      isClean: false,
      reason: 'Message cannot be empty'
    };
  }

  // HTML/script tags check
  if (/<[^>]*>/.test(cleanText)) {
    return {
      isClean: false,
      reason: 'HTML tags are not allowed',
      severity: 'high'
    };
  }

  // JavaScript-like content check
  if (/(javascript|script|eval|function|alert|document|window|location|innerHTML|outerHTML|onload|onerror)\s*[\(\:=]/i.test(cleanText)) {
    return {
      isClean: false,
      reason: 'JavaScript-like content is not allowed',
      severity: 'high'
    };
  }

  // Link/domain detection
  const linkPatterns = [
    /(https?:\/\/[^\s]+)/gi,
    /(www\.[^\s]+)/gi,
    /\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/gi,
    /(bit\.ly|tinyurl|t\.co|goo\.gl|short\.link|ow\.ly|is\.gd|buff\.ly)/gi,
    /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/gi,
    /(discord\.gg|discord\.com\/invite)/gi,
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi
  ];

  for (const pattern of linkPatterns) {
    if (pattern.test(cleanText)) {
      return {
        isClean: false,
        reason: 'Links and domains are not allowed in messages',
        severity: 'medium'
      };
    }
  }

  // Message length check
  if (cleanText.length > 150) {
    return {
      isClean: false,
      reason: 'Message is too long (max 150 characters)',
      severity: 'low'
    };
  }

  // Profanity check (simplified)
  const profanityPatterns = [
    /\b(fuck|shit|damn|bitch|ass|hell|crap|piss|bastard|whore|slut|cunt|cock|dick|pussy|tits|boobs|sex|nude|naked|penis|vagina|anal|oral|masturbate|orgasm)\b/i,
    /\b(他媽的|幹你娘|操你媽|去死|白癡|智障|腦殘|垃圾|廢物|幹|操|靠北|靠腰|機掰|雞掰|屌|懶叫|鳥|屁眼|婊子|臭婊子|賤人|死人頭|王八蛋|混蛋|畜生|禽獸|狗屎|狗娘養的|傻逼|傻瓜|傻屄|狗日的|你妹|草泥马|日你妈|死全家|滾蛋|死肥豬|二逼|他妈的|变态|我操|我靠|操你妈)\b/i,
    /\b(屌你|屌|瘀|閪|西|撚|柒頭|仆街|仆你個街|死仔包|死八婆|鬼佬|死鬼佬|死開|收皮|執嘢|搵笨|搵死|食屎|食蕉|碌葛|九唔搭八|頂你|頂你個肺|戇居|低能|白痴|戇鳩|傻瓜|蠢材|衰仔|衰佬|衰婆)\b/i
  ];

  for (const pattern of profanityPatterns) {
    if (pattern.test(cleanText)) {
      return {
        isClean: false,
        reason: 'Message contains inappropriate language',
        severity: 'high'
      };
    }
  }

  // HTML entity encode the text
  const safeText = cleanText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return {
    isClean: true,
    reason: null,
    cleanText: safeText
  };
}

// Username moderation
async function moderateUsername(username, clientId, ip) {
  if (isModerator(clientId, ip)) {
    return {
      isClean: true,
      reason: null,
      cleanUsername: username
    };
  }

  const cleanUsername = String(username || '').trim();
  
  if (!cleanUsername) {
    return {
      isClean: false,
      reason: 'Username cannot be empty'
    };
  }

  if (cleanUsername.length > 14 || cleanUsername.length < 3) {
    return {
      isClean: false,
      reason: 'Username must be 3-14 characters long'
    };
  }

  // HTML/script tags check
  if (/<[^>]*>/.test(cleanUsername)) {
    return {
      isClean: false,
      reason: 'HTML tags are not allowed in usernames',
      severity: 'high'
    };
  }

  // JavaScript-like content check
  if (/(javascript|script|eval|function|alert|document|window|location|innerHTML|outerHTML|onload|onerror)\s*[\(\:=]/i.test(cleanUsername)) {
    return {
      isClean: false,
      reason: 'JavaScript-like content is not allowed in usernames',
      severity: 'high'
    };
  }

  // Link/domain check
  const linkPatterns = [
    /(https?:\/\/[^\s]+)/gi,
    /(www\.[^\s]+)/gi,
    /\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/gi,
    /(bit\.ly|tinyurl|t\.co|goo\.gl|short\.link|ow\.ly|is\.gd|buff\.ly)/gi,
    /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/gi,
    /(discord\.gg|discord\.com\/invite)/gi,
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi
  ];

  for (const pattern of linkPatterns) {
    if (pattern.test(cleanUsername)) {
      return {
        isClean: false,
        reason: 'Links and domains are not allowed in usernames',
        severity: 'medium'
      };
    }
  }

  // Profanity check
  const profanityPatterns = [
    /\b(fuck|shit|damn|bitch|ass|hell|crap|piss|bastard|whore|slut|cunt|cock|dick|pussy|tits|boobs|sex|nude|naked|penis|vagina|anal|oral|masturbate|orgasm)\b/i,
    /\b(他媽的|幹你娘|操你媽|去死|白癡|智障|腦殘|垃圾|廢物|幹|操|靠北|靠腰|機掰|雞掰|屌|懶叫|鳥|屁眼|婊子|臭婊子|賤人|死人頭|王八蛋|混蛋|畜生|禽獸|狗屎|狗娘養的|傻逼|傻瓜|傻屄|狗日的|你妹|草泥马|日你妈|死全家|滾蛋|死肥豬|二逼|他妈的|变态|我操|我靠|操你妈)\b/i,
    /\b(屌你|屌|瘀|閪|西|撚|柒頭|仆街|仆你個街|死仔包|死八婆|鬼佬|死鬼佬|死開|收皮|執嘢|搵笨|搵死|食屎|食蕉|碌葛|九唔搭八|頂你|頂你個肺|戇居|低能|白痴|戇鳩|傻瓜|蠢材|衰仔|衰佬|衰婆)\b/i
  ];

  for (const pattern of profanityPatterns) {
    if (pattern.test(cleanUsername)) {
      return {
        isClean: false,
        reason: 'Username contains inappropriate language',
        severity: 'high'
      };
    }
  }

  // Admin impersonation check
  const adminPatterns = [
    /\b(admin|administrator|mod|moderator|staff|owner|dse\.?best|system|bot|official)\b/i,
    /\b(管理|管理员|版主|官方|系統|机器人)\b/i
  ];

  for (const pattern of adminPatterns) {
    if (pattern.test(cleanUsername)) {
      return {
        isClean: false,
        reason: 'Username cannot impersonate staff or official accounts',
        severity: 'high'
      };
    }
  }

  return {
    isClean: true,
    reason: null,
    cleanUsername: cleanUsername
  };
}

// Main handler function
export default {
  async fetch(request, env, ctx) {
    // CORS handling
    const origin = request.headers.get('origin');
    const corsHeaders = {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Credentials': 'true',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'none'; script-src 'self'"
    };

    if (ALLOWED_ORIGINS.includes(origin)) {
      corsHeaders['Access-Control-Allow-Origin'] = origin;
    }

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    try {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.json();
      const { clientId, username, message, action, secretmodkey } = body;
      
      // Validate inputs
      const cleanClientId = String(clientId || '').trim();
      let cleanUsername = String(username || '').trim();
      
      // Get client IP
      const ip = request.headers.get('cf-connecting-ip') ||
                 request.headers.get('true-client-ip') ||
                 request.headers.get('x-forwarded-for')?.split(',')[0] || 
                 request.headers.get('x-real-ip') || 
                 'unknown';
      
      const userAgent = request.headers.get('user-agent') || '';
      const deviceInfo = detectDevice(userAgent);
      
      // Get geolocation data
      const geoData = await getGeolocation(ip);

      if (!cleanClientId || !cleanUsername) {
        return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Check for malicious clientId patterns
      if (cleanClientId.length > 100 || /[<>\"'&]/.test(cleanClientId)) {
        return new Response(JSON.stringify({ error: 'Invalid client ID format' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Apply username moderation
      const usernameModResult = await moderateUsername(cleanUsername, cleanClientId, ip);
      if (!usernameModResult.isClean) {
        await logToLogflare('username_violation', {
          event_type: 'username_violation',
          client_id: cleanClientId,
          username: cleanUsername,
          ip_address: ip,
          device_info: deviceInfo,
          geography: geoData,
          violation_reason: usernameModResult.reason,
          severity: usernameModResult.severity || 'medium',
          user_agent: userAgent
        });
        
        return new Response(JSON.stringify({ error: usernameModResult.reason }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      cleanUsername = usernameModResult.cleanUsername;

      // Check if user is banned
      if (await isUserBanned(cleanClientId, ip, env)) {
        return new Response(JSON.stringify({ error: 'You are permanently banned from the chat' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Check rate limiting
      if (await isRateLimited(cleanClientId, ip, env)) {
        await logToLogflare('rate_limit_violation', {
          event_type: 'rate_limit_violation',
          client_id: cleanClientId,
          username: cleanUsername,
          ip_address: ip,
          device_info: deviceInfo,
          geography: geoData,
          user_agent: userAgent,
          timestamp: new Date().toISOString()
        });
        
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Log user join events
      await logToLogflare('user_join', {
        event_type: 'user_join',
        client_id: cleanClientId,
        username: cleanUsername,
        ip_address: ip,
        device_info: deviceInfo,
        geography: geoData,
        user_agent: userAgent,
        timestamp: new Date().toISOString()
      });

      // Check moderator status
      if (action === 'check_mod') {
        const isMod = isModerator(cleanClientId, ip, secretmodkey);
        return new Response(JSON.stringify({ isModerator: isMod }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Handle moderation
      if (action === 'moderate') {
        const text = message;
        
        // Handle commands
        if (text && text.startsWith('/')) {
          if (text.toLowerCase() === '/help') {
            const isModHelper = isModerator(cleanClientId, ip, secretmodkey);
            const helpText = isModHelper ? 
              `Available moderator commands:
/help - Show this help message
Note: Most moderation features require external database integration` :
              `Available commands:
/help - Show this help message`;

            return new Response(JSON.stringify({
              status: 'success',
              command: true,
              message: helpText,
              private: true,
              doNotBroadcast: true
            }), {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }

          return new Response(JSON.stringify({
            status: 'error',
            command: true,
            message: '❌ Unknown command. Type /help to see available commands.',
            private: true
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Normal message moderation
        const modResult = moderateContent(text, cleanClientId, ip, cleanUsername);
        if (!modResult.isClean) {
          await logToLogflare('message_violation', {
            event_type: 'message_violation',
            client_id: cleanClientId,
            username: cleanUsername,
            ip_address: ip,
            device_info: deviceInfo,
            geography: geoData,
            message_content: text,
            violation_reason: modResult.reason,
            severity: modResult.severity || 'medium',
            user_agent: userAgent,
            timestamp: new Date().toISOString()
          });
          
          return new Response(JSON.stringify({ error: modResult.reason }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        const isMod = isModerator(cleanClientId, ip, secretmodkey);
        return new Response(JSON.stringify({ 
          status: 'Message approved',
          isModerator: isMod 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Handle message publishing
      if (action === 'publish') {
        const messageText = body.text;
        
        const modResult = moderateContent(messageText, cleanClientId, ip, cleanUsername);
        if (!modResult.isClean) {
          await logToLogflare('message_violation', {
            event_type: 'message_violation',
            client_id: cleanClientId,
            username: cleanUsername,
            ip_address: ip,
            device_info: deviceInfo,
            geography: geoData,
            message_content: messageText,
            violation_reason: modResult.reason,
            severity: modResult.severity || 'medium',
            user_agent: userAgent,
            timestamp: new Date().toISOString()
          });
          
          return new Response(JSON.stringify({ error: modResult.reason }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const isMod = isModerator(cleanClientId, ip, secretmodkey);
        
        await logToLogflare('message_sent', {
          event_type: 'message_sent',
          client_id: cleanClientId,
          username: cleanUsername,
          ip_address: ip,
          device_info: deviceInfo,
          geography: geoData,
          message_content: modResult.cleanText,
          is_moderator: isMod,
          user_agent: userAgent,
          timestamp: new Date().toISOString()
        });
        
        // Publish through Ably
        const ably = new Ably.Rest(ABLY_API_KEY);
        await ably.channels.get('dsebest-livechat').publish('message', {
          clientId: cleanClientId,
          sender: cleanUsername,
          text: modResult.cleanText,
          timestamp: Date.now(),
          isModerator: isMod
        });

        // Send NTFY notification for non-moderator messages
        if (!isMod) {
          try {
            await sendNtfyNotification({
              sender: cleanUsername,
              text: modResult.cleanText
            }, {
              ip: ip,
              geography: geoData,
              device: deviceInfo,
              browser: detectBrowser(userAgent)
            });
          } catch (error) {
            console.error('Failed to send notification:', error);
          }
        }

        return new Response(JSON.stringify({ status: 'published' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Handle user leave events
      if (action === 'leave') {
        await logToLogflare('user_leave', {
          event_type: 'user_leave',
          client_id: cleanClientId,
          username: cleanUsername,
          ip_address: ip,
          device_info: deviceInfo,
          geography: geoData,
          session_duration: 0,
          leave_reason: 'explicit_leave',
          timestamp: new Date().toISOString()
        });
        
        return new Response(JSON.stringify({ status: 'User left successfully' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Token generation (default action)
      await logToLogflare('connection_attempt', {
        event_type: 'connection_attempt',
        client_id: cleanClientId,
        username: cleanUsername,
        ip_address: ip,
        device_info: deviceInfo,
        geography: geoData,
        user_agent: userAgent,
        timestamp: new Date().toISOString()
      });
      
      const ably = new Ably.Rest(ABLY_API_KEY);
      const tokenParams = { 
        clientId: cleanClientId, 
        capability: {
          'dsebest-livechat': ['publish', 'subscribe', 'presence', 'history']
        }
      };
      const tokenRequest = await ably.auth.createTokenRequest(tokenParams);
      
      await logToLogflare('token_generated', {
        event_type: 'token_generated',
        client_id: cleanClientId,
        username: cleanUsername,
        ip_address: ip,
        device_info: deviceInfo,
        geography: geoData,
        timestamp: new Date().toISOString()
      });
      
      return new Response(JSON.stringify(tokenRequest), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
}; 
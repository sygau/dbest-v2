const Ably = require('ably/promises');

// Note: Removed all Maps since serverless functions are stateless
// Data will be lost between function invocations anyway

// Logflare configuration
const LOGFLARE_API_KEY = process.env.LOGFLARE_API_KEY || '7MnWPFtPMj28';
const LOGFLARE_SOURCE_ID = process.env.LOGFLARE_SOURCE_ID || '4cd60bba-acd6-4e2b-83f6-0271b53350db';
const LOGFLARE_ENDPOINT = `https://api.logflare.app/logs?source=${LOGFLARE_SOURCE_ID}`;

// Enhanced logging with Logflare using fetch (optimized for serverless)
async function logToLogflare(event, metadata = {}) {
  // Skip logging for high-frequency events in production
  if (process.env.NODE_ENV === 'production') {
    const skipEvents = ['connection_attempt', 'token_generated', 'message_sent'];
    if (skipEvents.includes(event)) {
      return; // Skip logging for these events to reduce CPU usage
    }
  }

  if (!LOGFLARE_API_KEY || LOGFLARE_API_KEY === 'YOUR_LOGFLARE_API_KEY') {
    console.log('LOGFLARE_EVENT:', JSON.stringify({ event, metadata }, null, 2));
    return;
  }

  try {
    const logEntry = {
      message: event,
      metadata: {
        timestamp: new Date().toISOString(),
        service: 'dse-chat',
        ...metadata
      }
    };

    // Reduced timeout for faster response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(LOGFLARE_ENDPOINT, {
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
    // Fallback to console logging
    console.log('LOGFLARE_EVENT:', JSON.stringify({ event, metadata }, null, 2));
  }
}

// NTFY notification helper
async function sendNtfyNotification(messageData, userInfo = {}) {
  const url = `https://ntfy.sh/DefinitelyWouldntbeDSEdotBESTwebsiteChatMessagingServiceEndpoint`;

  // Build location info with emojis
  let locationInfo = '';
  if (userInfo.geography) {
    const geo = userInfo.geography;
    locationInfo = `🌍 ${geo.country || 'Unknown'}`;
    if (geo.regionName) locationInfo += `/${geo.regionName}`;
    if (geo.city) locationInfo += `, ${geo.city}`;
  } else {
    locationInfo = '🌍 Unknown location';
  }

  // Build device and browser info on same line
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

  // Build message content with enhanced user info
  const messageContent = `${messageData.text}\n\n${locationInfo}\n${deviceBrowserInfo}\n🔗 ${userInfo.ip || 'Unknown IP'}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Title': messageData.sender,
        'X-Priority': '3',
        'X-Click' : 'https://dse.best/chat',
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

// Helper function to get device emoji
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

// Helper function to get browser emoji
function getBrowserEmoji(browser) {
  const browserLower = browser.toLowerCase();
  
  if (browserLower.includes('chrome')) {
    return '🔴';
  } else if (browserLower.includes('firefox')) {
    return '🦊';
  } else if (browserLower.includes('safari')) {
    return '🌐';
  } else if (browserLower.includes('edge')) {
    return '🔵';
  } else if (browserLower.includes('opera')) {
    return '🔴';
  } else if (browserLower.includes('brave')) {
    return '🦁';
  } else {
    return '🌐';
  }
}

// Device detection helper
function detectDevice(userAgent) {
  if (!userAgent) return 'Unknown';
  
  const ua = userAgent.toLowerCase();
  
  // Mobile devices
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('ipod')) {
    if (ua.includes('android')) return 'Android Mobile';
    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('ipod')) return 'iPod';
    return 'Mobile';
  }
  
  // Tablets
  if (ua.includes('tablet') || ua.includes('ipad')) {
    if (ua.includes('ipad')) return 'iPad';
    return 'Tablet';
  }
  
  // Desktop browsers
  if (ua.includes('windows')) return 'Windows Desktop';
  if (ua.includes('macintosh') || ua.includes('mac os')) return 'Mac Desktop';
  if (ua.includes('linux')) return 'Linux Desktop';
  if (ua.includes('chromeos')) return 'Chrome OS';
  
  return 'Desktop';
}

// Browser detection helper
function detectBrowser(userAgent) {
  if (!userAgent) return 'Unknown';
  
  const ua = userAgent.toLowerCase();
  
  // Chrome-based browsers
  if (ua.includes('chrome') && !ua.includes('edg')) {
    if (ua.includes('brave')) return 'Brave';
    if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
    return 'Chrome';
  }
  
  // Firefox
  if (ua.includes('firefox')) return 'Firefox';
  
  // Safari
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  
  // Edge
  if (ua.includes('edg')) return 'Edge';
  
  // Internet Explorer (legacy)
  if (ua.includes('msie') || ua.includes('trident')) return 'Internet Explorer';
  
  return 'Unknown Browser';
}

// IP geolocation helper using fetch
async function getGeolocation(ip) {
  try {
    // Proceed with lookup for all IPs (no private IP short-circuit)
    
    // Create AbortController for timeout
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

// Moderator settings
const MOD_ID = process.env.MOD_ID || 'YOUR_CLIENT_ID';
const MOD_IP = '218.103.134.106'; // Trusted moderator IP
const MOD_SECRET_KEY = process.env.MOD_SECRET_KEY || 'dsebest88388'; // Secret key for mod auth

// Helper function to check if user is moderator
function isModerator(clientId, ip, secretmodkey = null) {
  // Check secret key first (primary method)
  if (secretmodkey && secretmodkey === MOD_SECRET_KEY) {
    return true;
  }
  
  // Fallback to IP/ID check
  return clientId === MOD_ID || ip === MOD_IP;
}

// Command patterns
const MOD_COMMANDS = {
  ban: /^\/ban (\S+)$/i,     // /ban clientId - permanent ban
  unban: /^\/unban (\S+)$/i, // /unban clientId
  banip: /^\/banip (\S+)$/i, // /banip IP - ban specific IP
  unbanip: /^\/unbanip (\S+)$/i, // /unbanip IP - unban specific IP
  info: /^\/info (\S+)$/i,   // /info clientId - show user info
  help: /^\/help$/i,         // /help - show available commands
  purge: /^\/purge$/i,       // /purge - clear chat with placeholder messages
  whois: /^\/whois (\S+)$/i, // /whois username - get user's client ID
  listbans: /^\/listbans$/i, // /listbans - show all banned users and IPs
  online: /^\/online$/i,     // /online - show currently active users
  stats: /^\/stats$/i,       // /stats - show user statistics
  link: /^\/link (.+)$/i     // /link url - send clickable link as moderator
};

// Rate limit settings
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 15; // 15 requests per minute (increased from 8)
const BLOCK_THRESHOLD = 2; // Number of rate limit violations before blocking
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Ban types enum
const BAN_TYPES = {
  PERMANENT: 'permanent',
  TEMPORARY: 'temporary'
};

// Note: Removed all Maps since serverless functions are stateless
// Data will be lost between function invocations anyway

// Note: Removed cleanup function since Maps are removed
// Serverless functions are stateless anyway

// Note: setInterval removed for serverless compatibility
// Cleanup will be handled on-demand during requests

// Simplified ban check function (no persistent data in serverless)
function isUserBanned(clientId, ip, secretmodkey = null) {
  // Never ban moderators
  if (isModerator(clientId, ip, secretmodkey)) return false;
  
  // No persistent bans in serverless - would need external database
  return false;
}

function isRateLimited(clientId, ip, secretmodkey = null) {
  // Never rate-limit moderators - completely bypass all rate limiting
  if (isModerator(clientId, ip, secretmodkey)) return false;

  // No persistent rate limiting in serverless - would need external database
  return false;
}

// Note: Removed rate limit helper function since Maps are removed
// Serverless functions are stateless anyway

// Logging function for moderation events
async function logModeration(clientId, ip, username, message, reason, action) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${action}: ${username} (${clientId}) from ${ip}\nMessage: ${message}\nReason: ${reason}`;
  console.log('MODERATION_LOG:', logEntry);
}

// Username moderation function
async function moderateUsername(username, clientId, ip) {
  // Skip moderation for moderators entirely
  if (isModerator(clientId, ip)) {
    return {
      isClean: true,
      reason: null,
      cleanUsername: username
    };
  }

  // Ensure username is a string and trim it
  const cleanUsername = String(username || '').trim();
  
  if (!cleanUsername) {
    return {
      isClean: false,
      reason: 'Username cannot be empty'
    };
  }

  // Check for restricted name "Jable" or names containing "Jable"
  if (cleanUsername.toLowerCase().includes('jable')) {
    return {
      isClean: false,
      reason: 'This name is restricted and cannot be used',
      severity: 'high'
    };
  }

  // Length validation - DISABLED for moderators
  if (!isModerator(clientId, ip) && (cleanUsername.length > 14 || cleanUsername.length < 3)) {
    return {
      isClean: false,
      reason: 'Username must be 3-14 characters long'
    };
  }

  // Check for HTML/script tags (skip for moderators)
  if (!isModerator(clientId, ip)) {
    const hasHTML = /<[^>]*>/.test(cleanUsername);
    if (hasHTML) {
      return {
        isClean: false,
        reason: 'HTML tags are not allowed in usernames',
        severity: 'high'
      };
    }

    // Check for JavaScript-like content
    const hasJS = /(javascript|script|eval|function|alert|document|window|location|innerHTML|outerHTML|onload|onerror)\s*[\(\:=]/i.test(cleanUsername);
    if (hasJS) {
      return {
        isClean: false,
        reason: 'JavaScript-like content is not allowed in usernames',
        severity: 'high'
      };
    }

    // Check for links/domains
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
  }

  // Apply the same profanity filtering as messages (skip for moderators)
  if (!isModerator(clientId, ip)) {
    const profanityPatterns = [
      // Basic profanity (English) - core set for usernames
      /\b(fuck|shit|damn|bitch|ass|hell|crap|piss|bastard|whore|slut|cunt|cock|dick|pussy|tits|boobs|sex|nude|naked|penis|vagina|anal|oral|masturbate|orgasm)\b/i,
      
      // Strong profanity
      /\b(motherfucker|asshole|douchebag|jackass|dickhead|shithead|fuckface|cocksucker|twat|prick)\b/i,
      
      // Sexual content
      /\b(horny|kinky|fetish|bdsm|porn|xxx|onlyfans|escort|prostitute|hooker)\b/i,

      // Numbers and symbols replacing letters
      /\b\w*f+[^a-z]*u+[^a-z]*c+[^a-z]*k+\w*\b/i,
      /\b\w*sh[1!]t\w*\b/i,
      /\b\w*b[1!]tch\w*\b/i,
      /\b\w*[4@]s{2,}\w*\b/i,
      /\b\w*p[0o]rn\w*\b/i,
      /\bs[3e]x\b/i,
      
      // Chinese profanity (core set)
      /\b(他媽的|幹你娘|操你媽|去死|白癡|智障|腦殘|垃圾|廢物|幹|操|靠北|靠腰|機掰|雞掰|屌|懶叫|鳥|屁眼|婊子|臭婊子|賤人|死人頭|王八蛋|混蛋|畜生|禽獸|狗屎|狗娘養的|傻逼|傻瓜|傻屄|狗日的|你妹|草泥马|日你妈|死全家|滾蛋|死肥豬|二逼|他妈的|变态|我操|我靠|操你妈)\b/i,
      
      // Cantonese profanity (core set)
      /\b(屌你|屌|瘀|閪|西|撚|柒頭|仆街|仆你個街|死仔包|死八婆|鬼佬|死鬼佬|死開|收皮|執嘢|搵笨|搵死|食屎|食蕉|碌葛|九唔搭八|頂你|頂你個肺|戇居|低能|白痴|戇鳩|傻瓜|蠢材|衰仔|衰佬|衰婆)\b/i,
      
      // Hate speech and slurs
      /\b(nigger|faggot|retard|nazi|hitler|chink|gook|spic|wetback|beaner|cracker|honky|kike|jap|raghead|towelhead|sandnigger)\b/i,
      
      // Common bypass attempts - more specific patterns
      /\bf+[u\*\-_]+c+[k\*\-_]+\b/i,
      /\bs+h+[i\*\-_]+t+\b/i,  // More specific: requires 'h' after 's'
      /\bb+[i\*\-_]+t+[c\*\-_]+h+\b/i,
      /\bd+[i\*\-_]+[u\*\-_]+\b/i,
      /\bp+[o\*\-_]+r+[n\*\-_]+\b/i
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
  }

  // Check for excessive special characters or numbers (skip for moderators)
  if (!isModerator(clientId, ip)) {
    const specialCharCount = (cleanUsername.match(/[^a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
    if (specialCharCount > cleanUsername.length * 0.4) {
      return {
        isClean: false,
        reason: 'Username contains too many special characters',
        severity: 'medium'
      };
    }

    // Check for admin/moderator impersonation
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
  }

  // Comprehensive XSS protection for username
  const safeUsername = sanitizeForXSS(cleanUsername, clientId, ip);
  
  return {
    isClean: true,
    reason: null,
    cleanUsername: safeUsername
  };
}

// Comprehensive XSS sanitization function
function sanitizeForXSS(input, clientId = null, ip = null) {
  // Skip XSS sanitization for moderators entirely
  if (clientId && ip && isModerator(clientId, ip)) {
    return input; // Return original input for moderators
  }
  
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Step 1: Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Step 2: Remove Unicode control characters and invisible characters
  sanitized = sanitized.replace(/[\u200B-\u200D\uFEFF\u00AD\u061C\u180E\u2060-\u2069]/g, '');
  
  // Step 3: Only encode truly dangerous HTML characters
  const htmlEntities = {
    '<': '&lt;',
    '>': '&gt;',
  };
  
  // Step 4: Replace only dangerous HTML characters with entities
  sanitized = sanitized.replace(/[<>]/g, (match) => {
    return htmlEntities[match] || match;
  });
  
  // Step 5: Remove any remaining script-like patterns
  const scriptPatterns = [
    /javascript:/gi,
    /vbscript:/gi,
    /onload/gi,
    /onerror/gi,
    /onclick/gi,
    /onmouseover/gi,
    /onfocus/gi,
    /onblur/gi,
    /onchange/gi,
    /onsubmit/gi,
    /onreset/gi,
    /onselect/gi,
    /onunload/gi,
    /onabort/gi,
    /onbeforeunload/gi,
    /onerror/gi,
    /onhashchange/gi,
    /onmessage/gi,
    /onoffline/gi,
    /ononline/gi,
    /onpagehide/gi,
    /onpageshow/gi,
    /onpopstate/gi,
    /onresize/gi,
    /onstorage/gi,
    /oncontextmenu/gi,
    /oninput/gi,
    /oninvalid/gi,
    /onsearch/gi,
    /onkeydown/gi,
    /onkeypress/gi,
    /onkeyup/gi,
    /onmousedown/gi,
    /onmousemove/gi,
    /onmouseout/gi,
    /onmouseup/gi,
    /onwheel/gi,
    /ondrag/gi,
    /ondragend/gi,
    /ondragenter/gi,
    /ondragleave/gi,
    /ondragover/gi,
    /ondragstart/gi,
    /ondrop/gi,
    /oncopy/gi,
    /oncut/gi,
    /onpaste/gi,
    /onbeforecopy/gi,
    /onbeforecut/gi,
    /onbeforepaste/gi,
    /onselectstart/gi,
    /onselectionchange/gi,
    /onfullscreenchange/gi,
    /onfullscreenerror/gi,
    /onwebkitfullscreenchange/gi,
    /onwebkitfullscreenerror/gi,
    /onmozfullscreenchange/gi,
    /onmozfullscreenerror/gi,
    /onmsfullscreenchange/gi,
    /onmsfullscreenerror/gi
  ];
  
  scriptPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  // Step 6: Remove any data URLs
  sanitized = sanitized.replace(/data:/gi, '');
  
  // Step 7: Remove any remaining HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Step 8: Normalize whitespace and trim
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  
  // Step 9: Limit length to prevent buffer overflow attacks
  if (sanitized.length > 50) {
    sanitized = sanitized.substring(0, 50);
  }
  
  return sanitized;
}

// Modular spam detection system
function detectSpam(text, clientId = null, ip = null) {
  // Skip spam detection for moderators entirely
  if (clientId && ip && isModerator(clientId, ip)) {
    return { isClean: true };
  }

  const spamChecks = [
    // Character repetition spam
    {
      pattern: /(.)\1{4,}/,
      reason: 'Excessive character repetition detected',
      severity: 'medium'
    },
    // Word/phrase repetition
    {
      pattern: /(.{3,})\1{2,}/i,
      reason: 'Repetitive content detected',
      severity: 'medium'
    },
    // Excessive caps
    {
      pattern: /[A-Z]{8,}/,
      reason: 'Excessive capital letters',
      severity: 'low'
    },
    // Pattern spamming (abcabcabc)
    {
      pattern: /(.)\1(.)\2(.)\3/i,
      reason: 'Spam pattern detected',
      severity: 'medium'
    },
    // Alternating characters spam
    {
      pattern: /^(.)(.)(\1\2){3,}/,
      reason: 'Alternating spam pattern detected',
      severity: 'medium'
    },
    // Unicode spam (invisible characters, zero-width, etc.)
    {
      pattern: /[\u200B-\u200D\uFEFF\u00AD\u061C\u180E\u2060\u2061\u2062\u2063\u2064\u2065\u2066\u2067\u2068\u2069]{3,}/,
      reason: 'Invisible character spam detected',
      severity: 'high'
    },
    // Emoji spam
    {
      pattern: /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]){5,}/u,
      reason: 'Excessive emoji usage',
      severity: 'low'
    },
    // Number spam
    {
      pattern: /\d{10,}/,
      reason: 'Excessive numbers detected',
      severity: 'medium'
    },
    // Special character spam
    {
      pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]{8,}/,
      reason: 'Excessive special characters',
      severity: 'medium'
    },
    // Mixed case spam (aLtErNaTiNg)
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{10,}$/,
      test: (text) => {
        if (text.length < 10) return false;
        let caseChanges = 0;
        let lastCase = null;
        for (let char of text) {
          if (/[a-zA-Z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            if (lastCase !== null && lastCase !== isUpper) {
              caseChanges++;
            }
            lastCase = isUpper;
          }
        }
        return caseChanges > text.length * 0.3; // More than 30% case changes
      },
      reason: 'Alternating case spam detected',
      severity: 'medium'
    }
  ];

  for (const check of spamChecks) {
    let isSpam = false;
    
    if (check.test) {
      isSpam = check.test(text);
    } else if (check.pattern) {
      isSpam = check.pattern.test(text);
    }
    
    if (isSpam) {
      return {
        isClean: false,
        reason: check.reason,
        severity: check.severity
      };
    }
  }

  // Advanced heuristics
  
  // Check for high entropy (random-looking text)
  const entropy = calculateEntropy(text);
  if (entropy > 4.5 && text.length > 20) {
    return {
      isClean: false,
      reason: 'Message appears to be random characters',
      severity: 'medium'
    };
  }

  // Check consonant/vowel ratio for gibberish
  if (text.length > 15) {
    const consonants = (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
    const vowels = (text.match(/[aeiouAEIOU]/g) || []).length;
    const ratio = consonants / (vowels + 1); // +1 to avoid division by zero
    
    if (ratio > 5 || (vowels === 0 && consonants > 8)) {
      return {
        isClean: false,
        reason: 'Message appears to be gibberish',
        severity: 'medium'
      };
    }
  }

  return { isClean: true };
}

// Helper function to calculate text entropy
function calculateEntropy(text) {
  const freq = {};
  for (let char of text.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  let entropy = 0;
  const len = text.length;
  
  for (let char in freq) {
    const p = freq[char] / len;
    entropy -= p * Math.log2(p);
  }
  
  return entropy;
}

// Content moderation with multiple checks
function moderateContent(text, clientId, ip, username) {
  // Skip moderation for moderators entirely
  if (isModerator(clientId, ip)) {
    return {
      isClean: true,
      reason: null,
      cleanText: text // Return original text for moderators
    };
  }

  // Ensure text is a string and limit length
  const cleanText = String(text || '').trim();
  
  if (!cleanText) {
    return {
      isClean: false,
      reason: 'Message cannot be empty'
    };
  }

  // Enhanced security checks
  
  // 1. Check for HTML/script tags - stronger XSS prevention
  const hasHTML = /<[^>]*>/.test(cleanText);
  if (hasHTML) {
    return {
      isClean: false,
      reason: 'HTML tags are not allowed',
      severity: 'high'
    };
  }

  // 2. Check for JavaScript-like content (enhanced)
  const hasJS = /(javascript|script|eval|function|alert|document|window|location|innerHTML|outerHTML|onload|onerror)\s*[\(\:=]/i.test(cleanText);
  if (hasJS) {
    return {
      isClean: false,
      reason: 'JavaScript-like content is not allowed',
      severity: 'high'
    };
  }

  // 3. Enhanced link/domain detection (stricter)
  const linkPatterns = [
    // Standard URLs
    /(https?:\/\/[^\s]+)/gi,
    /(www\.[^\s]+)/gi,
    // Domain-like patterns without protocol
    /\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/gi,
    // Common short URL patterns
    /(bit\.ly|tinyurl|t\.co|goo\.gl|short\.link|ow\.ly|is\.gd|buff\.ly)/gi,
    // IP addresses
    /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/gi,
    // Discord/social media invites
    /(discord\.gg|discord\.com\/invite)/gi,
    // Email-like patterns
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
    // Suspicious domain extensions
    /\b\w+\.(tk|ml|ga|cf|click|download|exe|zip|rar)\b/gi
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

  // 4. Check for potential data exfiltration attempts
  const dataExfilPattern = /(fetch|xhr|xmlhttprequest|websocket|ajax)/i;
  if (dataExfilPattern.test(cleanText)) {
    return {
      isClean: false,
      reason: 'Suspicious content detected',
      severity: 'high'
    };
  }

  // 5. Check message length (server-side enforcement) - DISABLED for moderators
  if (cleanText.length > 150) {
    return {
      isClean: false,
      reason: 'Message is too long (max 150 characters)',
      severity: 'low'
    };
  }

  // 6. Enhanced profanity check (much stricter)
  const profanityPatterns = [
    // Basic profanity (English) - expanded
    /\b(fuck|shit|damn|bitch|ass|hell|crap|piss|bastard|whore|slut|cunt|cock|dick|pussy|tits|boobs|sex|intercourse|nude|naked|penis|vagina|anal|oral|masturbate|orgasm|cumshot|blowjob|handjob|dildo|vibrator)\b/i,
    
    // Additional strong profanity
    /\b(motherfucker|asshole|douchebag|jackass|dickhead|shithead|fuckface|cocksucker|twat|prick|knobhead|tosser|wanker|bellend|pillock|minger|scrubber|slag)\b/i,
    
    // Sexual content
    /\b(horny|kinky|fetish|bdsm|threesome|gangbang|bukkake|creampie|deepthroat|rimjob|69|fisting|squirt|milf|gilf|cougar|escort|prostitute|hooker)\b/i,
    
    // Adult websites and platforms
    /\b(onlyfans|xvideos|redtube|youjizz|xhamster|spankwire|chaturbate|cam4|livejasmin|missav|thisav|brazzers|jav|javhd|hentai|hanime|nhentai|loli|rule34|xnxx|redtube|youporn|eporner)\b/i,

    // Body parts (vulgar)
    /\b(ballsack|nutsack|scrotum|clitoris|labia|areola|nipples|butthole|anus|rectum|pubic|genital|erection|boner)\b/i,
    
    // Leetspeak and obfuscated variants
    /\b\w*[f][^a-z]*[u][^a-z]*[c][^a-z]*[k]\w*\b/i,
    /\b\w*[s][^a-z]*[h][^a-z]*[i][^a-z]*[t]\w*\b/i,
    /\b\w*[b][^a-z]*[i][^a-z]*[t][^a-z]*[c][^a-z]*[h]\w*\b/i,
    /\b\w*[4@]ss\w*\b/i,
    /\b\w*[d][^a-z]*[a][^a-z]*[m][^a-z]*[n]\w*\b/i,
    
    // Numbers and symbols replacing letters
    /\b\w*f+[^a-z]*u+[^a-z]*c+[^a-z]*k+\w*\b/i,
    /\b\w*sh[1!]t\w*\b/i,
    /\b\w*b[1!]tch\w*\b/i,
    /\b\w*[4@]s{2,}\w*\b/i,
    /\b\w*p[0o]rn\w*\b/i,
    /\bs[3e]x\b/i, // Fixed: more specific to avoid catching "test"
    
    // Chinese profanity (Mandarin)
    /\b(他媽的|幹你娘|操你媽|去死|白癡|智障|腦殘|垃圾|廢物|幹|操|靠北|靠腰|機掰|雞掰|屌|懶叫|鳥|屁眼|婊子|臭婊子|賤人|死人頭|王八蛋|混蛋|畜生|禽獸|狗屎|狗娘養的|傻逼|傻瓜|傻屄|狗日的|你妹|草泥马|日你妈|死全家|滾蛋|死肥豬|二逼|他妈的|变态|我操|我靠|操你妈|操你祖宗十八代|死肥猪|滚|滚开|滚蛋|笨蛋|臭鸡蛋)\b/i,
    
    // Cantonese profanity (Hong Kong)
    /\b(屌你|屌|瘀|閪|西|撚|柒頭|仆街|仆你個街|死仔包|死八婆|鬼佬|死鬼佬|死開|收皮|執嘢|搵笨|搵死|食屎|食蕉|碌葛|九唔搭八|頂你|頂你個肺|戇居|低能|白痴|戇鳩|傻瓜|蠢材|衰仔|衰佬|衰婆|你老母|屌你老母|你阿媽|屌你阿媽|死雞|死豬|死牛|死狗|屎忽鬼|屎坑婆|屎窟鬼|雞|鳩|撚樣|撚嘢|鳩嘢|柒嘢|西嘢|閪嘢|哨牙|爛牙|爛舌頭|含撚|含鳩|含西|去死啦|死啦|仆你|推你|屌機|撚機|鳩機|柒機|西機|閪機)\b/i,
    
    // Cantonese romanization variants
    /\b(diu|dllm|sldpk|dnlm|dlnm|dn|sb3|on9|6uo|onl79|on99|0n9|seven|onnine)\b/i,
    
    // More Cantonese (traditional characters and variants)
    /\b(戇撚|戇鳩|撚頭|撚仔|鳩仔|西仔|閪仔|柒仔|戇豬|蠢豬|低撚能|撚低能|鳩低能|死撚仔|死鳩仔|死西仔|死閪仔|死柒仔|撚樣衰|鳩樣衰|西樣衰|閪樣衰|柒樣衰|屌你撚|屌你鳩|屌你西|屌你閪|屌你柒|含撚包|含鳩包|含西包|含閪包|含柒包|屌撚你|屌鳩你|屌西你|屌閪你|屌柒你|PK|仆街仔|仆街死|咸濕|妖|神經病|唔該死|死扑街|戇屎|慳啲啦|撈撈|搵扑街|阮囡|臭雞|臭閪|屎忽|死屍頭|屌屎)\b/i,
    
    // Hate speech and slurs
    /\b(nigger|faggot|retard|nazi|hitler|kill\s*yourself|kys|suicide|chink|gook|spic|wetback|beaner|cracker|honky|kike|jap|raghead|towelhead|sandnigger|camel\s*jockey)\b/i,
    
    // Drug references
    /\b(cocaine|heroin|meth|weed|marijuana|cannabis|drug|drugs|ice|crack|ecstasy|molly|mdma|lsd|acid|shrooms|mushrooms|ketamine|special\s*k|opium|fentanyl|oxy|xanax|adderall|ritalin|dope|pot|ganja|hash|blunt|joint|bong|pipe|needle|syringe|dealer|pusher)\b/i,
    
    // Spam-like repetitive patterns
    /(.)\1{5,}/i, // 6+ repeated characters
    /\b(\w+)\s+\1\s+\1\b/i, // Same word repeated 3+ times
    
    // Common bypass attempts - more specific patterns
    /\bf+[u\*\-_]+c+[k\*\-_]+\b/i,
    /\bs+h+[i\*\-_]+t+\b/i,  // More specific: requires 'h' after 's'
    /\bb+[i\*\-_]+t+[c\*\-_]+h+\b/i,
    /\bd+[i\*\-_]+[u\*\-_]+\b/i,
    /\bp+[o\*\-_]+r+[n\*\-_]+\b/i,
    
    // Character substitution patterns
    /\b\w*[ph]+[4@a]*[gg]*[oò0ó]+[t7]+\w*\b/i, // faggot variants
    /\b\w*[r3e]+[t7]+[4@a]+[r3e]*[d]+\w*\b/i, // retard variants
    /\b\w*[n]+[1il!]+[g9]+[g9]+[3ea]+[r3e]\w*\b/i, // racial slur variants
    
    // Asterisk/symbol bypass attempts
    /\bf\*+u\*+c\*+k\b/i,
    /\bs\*+h\*+i\*+t\b/i,
    /\bb\*+i\*+t\*+c\*+h\b/i,
    /\ba\*+s\*+s\b/i,
    /\bp\*+o\*+r\*+n\b/i,
    /\bd\*+a\*+m\*+n\b/i,
    
    // Unicode and special character bypass attempts
    /[ḟƒ]+[ùúûüũūŭů]+[çćĉċč]+[ķk]+/i, // f*ck with unicode
    /[śŝşšș]+[ĥħ]+[ìíîïĩīĭį]+[ţťŧ]+/i, // sh*t with unicode
    /[ḃƀ]+[ìíîïĩīĭį]+[ţťŧ]+[çćĉċč]+[ĥħ]+/i // b*tch with unicode
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

  // 7. Enhanced spam detection (modularized)
  const spamDetectionResult = detectSpam(cleanText, clientId, ip);
  if (!spamDetectionResult.isClean) {
    return spamDetectionResult;
  }

  // 8. Check for potential injection attempts
  const injectionPatterns = [
    /['"]\s*[;\|&`$()]/,
    /union\s+select/i,
    /drop\s+table/i,
    /exec\s*\(/i
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(cleanText)) {
      return {
        isClean: false,
        reason: 'Suspicious content detected',
        severity: 'high'
      };
    }
  }
  
  // HTML entity encode the text for extra safety (skip for moderators)
  let safeText = cleanText;
  if (!isModerator(clientId, ip)) {
    safeText = cleanText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  return {
    isClean: true,
    reason: null,
    cleanText: safeText // Return original text for moderators, encoded for others
  };
}

export default async function handler(req, res) {

  // CORS Configuration
  const allowedOrigins = [
    'https://dse.best',
    'https://www.dse.best',
    'https://dbest-cdn.pages.dev'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'");

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { clientId, username, message, action, secretmodkey } = req.body;
    
    // Validate and sanitize inputs
    const cleanClientId = String(clientId || '').trim();
    let cleanUsername = String(username || '').trim();
    
    // Get client IP and additional request info
    const ip = req.headers['cf-connecting-ip'] ||
               req.headers['true-client-ip'] ||
               req.headers['x-forwarded-for']?.split(',')[0] || 
               req.headers['x-real-ip'] || 
               req.socket.remoteAddress;
    
    const userAgent = req.headers['user-agent'] || '';
    const deviceInfo = detectDevice(userAgent);
    
    // Get geolocation data
    const geoData = await getGeolocation(ip);

    if (!cleanClientId || !cleanUsername) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Check for malicious clientId patterns
    if (cleanClientId.length > 100 || /[<>\"'&]/.test(cleanClientId)) {
      return res.status(400).json({ error: 'Invalid client ID format' });
    }

    // Apply username moderation (NEW!)
    const usernameModResult = await moderateUsername(cleanUsername, cleanClientId, ip);
    if (!usernameModResult.isClean) {
      // Log username violation
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
      
      return res.status(400).json({ error: usernameModResult.reason });
    }
    
    // Use the cleaned username
    cleanUsername = usernameModResult.cleanUsername;

    // Note: Removed user tracking since Maps are removed
    // Serverless functions are stateless anyway
    const currentTime = Date.now();
    const isNewUser = true; // Always treat as new user since no persistence
    const isUsernameChange = false;

    // Log user join events (simplified since no persistence)
    if (isNewUser) {
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
    }

    // Check if user is banned
    if (isUserBanned(cleanClientId, ip, secretmodkey)) {
      return res.status(403).json({ error: 'You are permanently banned from the chat' });
    }
    
    // Check rate limiting
    const rateLimitStatus = isRateLimited(cleanClientId, ip, secretmodkey);
    if (rateLimitStatus && rateLimitStatus.blocked) {
      await logModeration(cleanClientId, ip, cleanUsername, 'N/A', 'Rate limit violation', 'RATE_LIMIT');
      
      // Log rate limit violation
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
      
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    const ably = new Ably.Rest(process.env.ABLY_API_KEY);

    // Check moderator status
    if (req.body.action === 'check_mod') {
      const isMod = isModerator(cleanClientId, ip, secretmodkey);
      return res.status(200).json({ 
        isModerator: isMod 
      });
    }

    // Handle commands or moderation
    if (req.body.action === 'moderate') {
      const text = message;
      // Check for commands first before any moderation
      if (text && text.startsWith('/')) {
        let match;

        // Help command - available to all users
        if (MOD_COMMANDS.help.test(message)) {
          const isModHelper = isModerator(cleanClientId, ip, secretmodkey);
          const helpText = isModHelper ? 
            `Available moderator commands:
/help - Show this help message
/whois <username> - Get client ID and info for a user by their username
/info <clientid> - Show detailed information for a client ID
/ban <clientid> - Permanently ban a user and their IP
/unban <clientid> - Remove a user's ban
/banip <ip> - Ban a specific IP address
/unbanip <ip> - Unban a specific IP address
/listbans - Show all banned users and IPs
/online - Show currently active users
/stats - Show user statistics and cleanup info
/purge - Clear chat by flooding with placeholder messages
/link <url> - Send a clickable link as a message` :
            `Available commands:
/help - Show this help message`;

          return res.status(200).json({
            status: 'success',
            command: true,
            message: helpText,
            private: true,
            doNotBroadcast: true
          });
        }

        // Moderator-only commands
        if (isModerator(cleanClientId, ip, secretmodkey)) {
          // Info command (simplified - no persistent data)
          if (match = MOD_COMMANDS.info.exec(message)) {
            const [, targetId] = match;
            
            if (!targetId || targetId.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /info <clientId>',
                private: true
              });
            }
            
            return res.status(200).json({
              status: 'success',
              command: true,
              message: `User Info:\nClient ID: ${targetId}\nStatus: Unknown (no persistent data in serverless)\nNote: Serverless functions are stateless`,
              private: true,
              doNotBroadcast: true
            });
          }

          // Ban command (simplified - no persistent data)
          if (match = MOD_COMMANDS.ban.exec(message)) {
            const [, targetId] = match;
            
            if (!targetId || targetId.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /ban <clientId>',
                private: true
              });
            }
            
            return res.status(200).json({ 
              status: 'Command executed',
              command: true,
              message: `⚠️ Ban command disabled - no persistent data in serverless functions. User ${targetId} would be banned if using external database.`
            });
          }

          // Unban command (simplified - no persistent data)
          if (match = MOD_COMMANDS.unban.exec(message)) {
            const [, targetId] = match;
            
            if (!targetId || targetId.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /unban <clientId>',
                private: true
              });
            }
            
            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `⚠️ Unban command disabled - no persistent data in serverless functions. User ${targetId} would be unbanned if using external database.`
            });
          }

          // Ban IP command (simplified - no persistent data)
          if (match = MOD_COMMANDS.banip.exec(message)) {
            const [, targetIP] = match;
            
            if (!targetIP || targetIP.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /banip <ip_address>',
                private: true
              });
            }
            
            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `⚠️ Ban IP command disabled - no persistent data in serverless functions. IP ${targetIP} would be banned if using external database.`
            });
          }

          // Unban IP command (simplified - no persistent data)
          if (match = MOD_COMMANDS.unbanip.exec(message)) {
            const [, targetIP] = match;
            
            if (!targetIP || targetIP.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /unbanip <ip_address>',
                private: true
              });
            }
            
            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `⚠️ Unban IP command disabled - no persistent data in serverless functions. IP ${targetIP} would be unbanned if using external database.`
            });
          }

          // List bans command (simplified - no persistent data)
          if (MOD_COMMANDS.listbans.test(message)) {
            return res.status(200).json({
              status: 'success',
              command: true,
              message: 'No active bans.\n\nNote: Serverless functions are stateless - no persistent data available.',
              private: true
            });
          }

          // Purge command - flood chat with placeholder messages
          if (MOD_COMMANDS.purge.test(message)) {
            const count = 50; // Fixed count of 50 messages
            
            const channel = ably.channels.get('dsebest-livechat');
            const now = Date.now();

            try {
              // Send placeholder messages to push old messages out of view
              const placeholderMessages = [
                ".",
                "‌", // Zero-width non-joiner
                "⠀", // Braille blank
                " ", // Regular space
                "　" // Full-width space
              ];

              for (let i = 0; i < count; i++) {
                await channel.publish('message', {
                  id: `purge-${now}-${i}`,
                  clientId: 'SYSTEM',
                  sender: 'System',  // Changed from 'username' to 'sender'
                  text: placeholderMessages[i % placeholderMessages.length],
                  timestamp: Date.now(),
                  isModerator: true,
                  isPurgeMessage: true // Special flag to identify purge messages
                });
                
                // Small delay to avoid rate limiting
                if (i % 10 === 0 && i > 0) {
                  await new Promise(resolve => setTimeout(resolve, 100));
                }
              }

              await logModeration(cleanClientId, ip, cleanUsername, 
                'N/A', 
                `Purged chat with ${count} placeholder messages`, 
                'MOD_PURGE');

              return res.status(200).json({
                status: 'Command executed',
                command: true,
                message: `🧹 Chat purged with ${count} placeholder messages`
              });
            } catch (error) {
              console.error('Error during purge:', error);
              return res.status(500).json({
                status: 'error',
                command: true,
                message: `Failed to purge chat: ${error.message}`,
                private: true
              });
            }
          }

          // Online command - show active users (simplified - no persistent data)
          if (MOD_COMMANDS.online.test(message)) {
            return res.status(200).json({
              status: 'success',
              command: true,
              message: 'No users currently active\n\nNote: Serverless functions are stateless - no persistent user data available.',
              private: true
            });
          }

          // Stats command - show system statistics (simplified - no persistent data)
          if (MOD_COMMANDS.stats.test(message)) {
            const stats = `📊 System Statistics:

Active Users: 0 (no persistent data)
Historical Data: 0 users (no persistent data)
Banned Users: 0 (no persistent data)
Banned IPs: 0 (no persistent data)
Server Uptime: N/A (serverless)

💾 Memory Usage:
- Active user data: 0 entries
- Historical data: 0 entries
- Rate limits: 0 entries
- Violation counts: 0 entries

🧹 Cleanup Info:
- Serverless functions are stateless
- No persistent data between invocations
- Consider using external database for persistence`;

            return res.status(200).json({
              status: 'success',
              command: true,
              message: stats,
              private: true
            });
          }

          // Whois command (simplified - no persistent data)
          if (match = MOD_COMMANDS.whois.exec(message)) {
            const [, targetUsername] = match;
            
            if (!targetUsername || targetUsername.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /whois <username>',
                private: true
              });
            }
            
            return res.status(200).json({
              status: 'error',
              command: true,
              message: `❌ No users found with username "${targetUsername}"\n\nNote: Serverless functions are stateless - no persistent user data available.`,
              private: true
            });
          }

          // Link command - send clickable link as moderator
          if (match = MOD_COMMANDS.link.exec(message)) {
            const [, url] = match;
            
            if (!url || url.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /link <url>',
                private: true
              });
            }

            // Validate and clean the URL
            let cleanUrl = url.trim();
            
            // Add protocol if missing
            if (!cleanUrl.match(/^https?:\/\//)) {
              cleanUrl = 'https://' + cleanUrl;
            }

            // Basic URL validation
            try {
              new URL(cleanUrl);
            } catch (error) {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid URL format. Please provide a valid URL.',
                private: true
              });
            }

            // Publish the link message through Ably as a normal message with link formatting
            try {
              const ably = new Ably.Rest(process.env.ABLY_API_KEY);
              const channel = ably.channels.get('dsebest-livechat');
              
              // Send as normal message with link formatting
              await channel.publish('message', {
                clientId: cleanClientId,
                sender: cleanUsername,
                text: `[LINK]${cleanUrl}[/LINK]`, // Simple link format
                timestamp: Date.now(),
                isModerator: true
              });

              return res.status(200).json({
                status: 'success',
                command: true,
                message: `✅ Link sent successfully: ${cleanUrl}`,
                private: true,
                doNotBroadcast: true
              });
            } catch (error) {
              console.error('Error publishing link message:', error);
              return res.status(500).json({
                status: 'error',
                command: true,
                message: 'Failed to send link. Please try again.',
                private: true
              });
            }
          }
        }

        // Check if the command looks like a valid command but with wrong syntax
        const commandPrefixes = ['/ban', '/unban', '/banip', '/unbanip', '/info', '/whois', '/purge', '/listbans', '/help', '/online', '/stats', '/link'];
        const commandWord = text.split(' ')[0].toLowerCase();
        
        if (commandPrefixes.some(prefix => commandWord.startsWith(prefix))) {
          // It's a recognized command but with invalid syntax
          const baseCommand = commandPrefixes.find(prefix => commandWord.startsWith(prefix));
          let helpText = '';
          
          switch (baseCommand) {
            case '/ban':
              helpText = 'Correct usage: /ban <clientId>';
              break;
            case '/unban':
              helpText = 'Correct usage: /unban <clientId>';
              break;
            case '/banip':
              helpText = 'Correct usage: /banip <ip_address>';
              break;
            case '/unbanip':
              helpText = 'Correct usage: /unbanip <ip_address>';
              break;
            case '/info':
              helpText = 'Correct usage: /info <clientId>';
              break;
            case '/whois':
              helpText = 'Correct usage: /whois <username>';
              break;
            case '/purge':
              helpText = 'Correct usage: /purge (no parameters needed)';
              break;
            case '/listbans':
              helpText = 'Correct usage: /listbans (no parameters needed)';
              break;
            case '/help':
              helpText = 'Correct usage: /help (no parameters needed)';
              break;
            case '/online':
              helpText = 'Correct usage: /online (no parameters needed)';
              break;
            case '/stats':
              helpText = 'Correct usage: /stats (no parameters needed)';
              break;
            case '/link':
              helpText = 'Correct usage: /link <url>';
              break;
          }
          
          return res.status(400).json({
            status: 'error',
            command: true,
            message: `❌ Invalid command syntax. ${helpText}`,
            private: true
          });
        }

        // If we get here, it's an unknown command
        return res.status(400).json({
          status: 'error',
          command: true,
          message: '❌ Unknown command. Type /help to see available commands.',
          private: true
        });
      }


      // Normal message moderation
      const modResult = moderateContent(text, cleanClientId, ip, cleanUsername);
      if (!modResult.isClean) {
        if (modResult.severity !== 'low') {
          await logModeration(
            cleanClientId, 
            ip, 
            cleanUsername, 
            text,
            modResult.reason,
            'VIOLATION'
          );
          
          // Log message violation to Logflare
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
        }
        return res.status(403).json({ error: modResult.reason });
      }
      
      // Check if sender is moderator
      const isMod = isModerator(cleanClientId, ip, secretmodkey);
      return res.status(200).json({ 
        status: 'Message approved',
        isModerator: isMod 
      });
    }

    // For message publishing
    if (req.body.action === 'publish') {
      const messageText = req.body.text;
      
      // Check if the message is clean
      const modResult = moderateContent(messageText, cleanClientId, ip, cleanUsername);
      if (!modResult.isClean) {
        // Log message violation to Logflare
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
        
        return res.status(403).json({ error: modResult.reason });
      }

      // Check if sender is moderator
      const isMod = isModerator(cleanClientId, ip, secretmodkey);
      
      // Log successful message to Logflare
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
      
      // Create sanitized message object
      const sanitizedMessage = {
        clientId: cleanClientId,
        sender: cleanUsername,  // Changed from 'username' to 'sender' to match client expectations
        text: modResult.cleanText,
        timestamp: Date.now()
      };
      
      // Publish through server's Ably instance with verified status
      await ably.channels.get('dsebest-livechat').publish('message', {
        ...sanitizedMessage,
        isModerator: isMod // Server-verified moderator status
      });

      // Send NTFY notification for new messages (only for non-moderator messages)
      if (!isMod) {
        try {
          await sendNtfyNotification(sanitizedMessage, {
            ip: ip,
            geography: geoData,
            device: deviceInfo,
            browser: detectBrowser(userAgent)
          });
        } catch (error) {
          console.error('Failed to send notification:', error);
          // Don't fail the message send if notification fails
        }
      }

      return res.status(200).json({ status: 'published' });
    }

    // Handle explicit user leave events (simplified - no persistent data)
    if (req.body.action === 'leave') {
      // Log user leave (simplified since no persistent data)
      await logToLogflare('user_leave', {
        event_type: 'user_leave',
        client_id: cleanClientId,
        username: cleanUsername,
        ip_address: ip,
        device_info: deviceInfo,
        geography: geoData,
        session_duration: 0, // No persistent data to calculate duration
        leave_reason: 'explicit_leave',
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ status: 'User left successfully' });
    }

    // For token generation
    if (req.body.action === 'token' || !req.body.action) {
      // Log connection attempt
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
    }
    
    const tokenParams = { clientId: cleanClientId, capability: {
      'dsebest-livechat': ['publish', 'subscribe', 'presence', 'history']
    }};
    const tokenRequest = await ably.auth.createTokenRequest(tokenParams);
    
    // Log successful token generation
    await logToLogflare('token_generated', {
      event_type: 'token_generated',
      client_id: cleanClientId,
      username: cleanUsername,
      ip_address: ip,
      device_info: deviceInfo,
      geography: geoData,
      timestamp: new Date().toISOString()
    });
    
    return res.status(200).json(tokenRequest);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

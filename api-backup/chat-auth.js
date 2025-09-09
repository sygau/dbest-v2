const Ably = require('ably');

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

// Enhanced IP information lookup for detailed analysis
async function getDetailedIPInfo(ip) {
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Use ip-api.com with more detailed fields
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,isp,org,timezone,mobile,proxy,hosting,query`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        ip: data.query || ip,
        country: data.country || 'Unknown',
        region: data.regionName || 'Unknown', 
        city: data.city || 'Unknown',
        isp: data.isp || 'Unknown',
        org: data.org || 'Unknown',
        timezone: data.timezone || 'Unknown',
        isMobile: data.mobile || false,
        isProxy: data.proxy || false,
        isHosting: data.hosting || false
      };
    } else {
      return {
        error: data.message || 'IP lookup failed'
      };
    }
  } catch (error) {
    console.warn('Detailed IP lookup failed:', error.message);
    return {
      error: error.message || 'Network error during IP lookup'
    };
  }
}

// Moderator settings
const MOD_SECRET_KEY = process.env.MOD_SECRET_KEY || 'dsebest88388'; // Secret key for mod auth

// Helper function to check if user is moderator
function isModerator(clientId, ip, secretmodkey = null) {
  // Only secret key authentication is valid for moderators
  const isMod = secretmodkey && secretmodkey === MOD_SECRET_KEY;
  console.log('DEBUG: isModerator check:', {
    secretmodkey: secretmodkey ? '***' : null,
    MOD_SECRET_KEY: MOD_SECRET_KEY,
    isMod: isMod
  });
  return isMod;
}

// Command patterns
const MOD_COMMANDS = {
  help: /^\/help$/i,         // /help - show available commands
  purge: /^\/purge$/i,       // /purge - clear chat with placeholder messages
  online: /^\/online$/i,     // /online - show currently active users
  link: /^\/link (.+)$/i,    // /link url - send clickable link as moderator
  ipinfo: /^\/ipinfo (\S+)$/i // /ipinfo ip - get detailed IP information
};

// Rate limit settings
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 15; // 15 requests per minute (increased from 8)
const BLOCK_THRESHOLD = 2; // Number of rate limit violations before blocking
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Note: Removed all Maps since serverless functions are stateless
// Data will be lost between function invocations anyway

// Note: Removed cleanup function since Maps are removed
// Serverless functions are stateless anyway

// Note: setInterval removed for serverless compatibility
// Cleanup will be handled on-demand during requests

function isRateLimited(clientId, ip, secretmodkey = null, isMod = null) {
  // Never rate-limit moderators - completely bypass all rate limiting
  if (isMod !== null ? isMod : isModerator(clientId, ip, secretmodkey)) return false;

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

// Unified content moderation function for both usernames and messages
async function moderateContent(text, type = 'message', clientId = null, ip = null, secretmodkey = null, isMod = null) {
  // Check moderator status once at the beginning
  const isModStatus = isMod !== null ? isMod : isModerator(clientId, ip, secretmodkey);
  
  console.log('DEBUG: moderateContent - type:', type, 'isMod:', isMod, 'isModStatus:', isModStatus, 'text:', text?.substring(0, 20));
  
  // Skip moderation for moderators entirely
  if (isModStatus) {
    console.log('DEBUG: Skipping moderation for moderator');
    return {
      isClean: true,
      reason: null,
      cleanText: text // Return original text for moderators
    };
  }

  // Ensure text is a string and trim it
  const cleanText = String(text || '').trim();
  
  if (!cleanText) {
    return {
      isClean: false,
      reason: `${type === 'username' ? 'Username' : 'Message'} cannot be empty`
    };
  }

  // Length validation based on type
  const maxLength = type === 'username' ? 14 : 150;
  const minLength = type === 'username' ? 3 : 1;
  
  if (cleanText.length > maxLength) {
    return {
      isClean: false,
      reason: `${type === 'username' ? 'Username' : 'Message'} cannot be longer than ${maxLength} characters`
    };
  }
  
  if (cleanText.length < minLength) {
    return {
      isClean: false,
      reason: `${type === 'username' ? 'Username' : 'Message'} must be at least ${minLength} character${minLength > 1 ? 's' : ''} long`
    };
  }

  // Special handling for usernames - check for "Jable" restriction
  if (type === 'username' && (cleanText.toLowerCase().includes('jable') || cleanText.toLowerCase().includes('jabie'))) {
    console.log('DEBUG: Jable restriction triggered for username:', cleanText);
    return {
      isClean: false,
      reason: 'This name is restricted and cannot be used',
      severity: 'high'
    };
  }

  // Special handling for messages - check for sticker format
  if (type === 'message') {
    const stickerMatch = cleanText.match(/^\[([A-Za-z0-9_-]+)\]$/);
    if (stickerMatch) {
      const stickerName = stickerMatch[1];
      
      // Validate sticker name (allow all available stickers)
      const allowedStickers = [
        // Public/accessible to everyone
        'excited', 'wave', 'shocked', 'shh', 'thumbsdown', 
        'agree', 'heart1', 'clap', 'thumbsup_glasses',
        'ace', 'yay', 'wot', 'tophat', 'sorry', 'frown',
        'hmmm', 'hungry', 'backstab',
        
        // Moderator only stickers
        'mh', 'ifc', 'middlefinger', 'police1', 'mh2', 'police2',
        'jable', 'saibou', 'mh3', 'mh4', 'hahah', 'goodmorning',
        'job', 'red', 'beer', 'smoke', 'keepscrolling',
        
        // All a_ stickers are moderator only
        'a_clap', 'a_laugh', 'a_pc', 'a_hammer', 'a_hellnah', 
        'a_juggle', 'a_wave', 'a_angrywalk', 'a_ball', 'a_boo', 
        'a_faint', 'a_gun', 'a_keyboard', 'a_pray', 'a_reading', 
        'a_sadbye', 'a_ski', 'a_sprint', 'a_taphead'
      ];
      
      if (!allowedStickers.includes(stickerName.toLowerCase())) {
        return {
          isClean: false,
          reason: 'Invalid sticker name.',
          severity: 'low'
        };
      }
      
      // Sticker messages are always clean and don't need additional validation
      return {
        isClean: true,
        reason: null,
        cleanText: cleanText
      };
    }

    // Check for multiple stickers in a single message (prevent [excited][excited])
    const stickerCount = (cleanText.match(/\[[A-Za-z0-9_-]+\]/g) || []).length;
    if (stickerCount > 1) {
      return {
        isClean: false,
        reason: 'Only one sticker per message is allowed.',
        severity: 'low'
      };
    }
  }

  // Enhanced security checks - Ordered by complexity (fastest first)
  // 1. FAST: Check for HTML/script tags (simple regex)
  const hasHTML = /<[^>]*>/.test(cleanText);
  if (hasHTML) {
    return {
      isClean: false,
      reason: 'HTML tags are not allowed',
      severity: 'high'
    };
  }

  // 2. FAST: Check for JavaScript-like content (simple regex)
  const hasJS = /(javascript|script|eval|function|alert|document|window|location|innerHTML|outerHTML|onload|onerror)\s*[\(\:=]/i.test(cleanText);
  if (hasJS) {
    return {
      isClean: false,
      reason: 'JavaScript-like content is not allowed',
      severity: 'high'
    };
  }

  // 3. FAST: Check for potential data exfiltration attempts (simple regex) - messages only
  if (type === 'message') {
    const dataExfilPattern = /(fetch|xhr|xmlhttprequest|websocket|ajax)/i;
    if (dataExfilPattern.test(cleanText)) {
      return {
        isClean: false,
        reason: 'Suspicious content detected',
        severity: 'high'
      };
    }
  }

  // 4. SLOW: Enhanced link/domain detection (multiple regex patterns)
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
        reason: `Links and domains are not allowed in ${type === 'username' ? 'usernames' : 'messages'}`,
        severity: 'medium'
      };
    }
  }

  // 5. Username-specific checks
  if (type === 'username') {
    // Check for admin/moderator impersonation (simple regex)
    const adminPatterns = [
      /\b(admin|administrator|mod|moderator|staff|owner|dse\.?best|system|bot|official)\b/i,
      /\b(管理|管理员|版主|官方|系統|机器人|DSEBEST)\b/i
    ];

    for (const pattern of adminPatterns) {
      if (pattern.test(cleanText)) {
        console.log('DEBUG: Admin impersonation restriction triggered for username:', cleanText);
        return {
          isClean: false,
          reason: 'Username cannot impersonate staff or official accounts',
          severity: 'high'
        };
      }
    }

    // Check for excessive special characters (regex + math)
    const specialCharCount = (cleanText.match(/[^a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
    if (specialCharCount > cleanText.length * 0.4) {
      return {
        isClean: false,
        reason: 'Username contains too many special characters',
        severity: 'medium'
      };
    }
  }

  // 6. Message-specific spam detection
  if (type === 'message') {
    const spamDetectionResult = detectSpam(cleanText, clientId, ip);
    if (!spamDetectionResult.isClean) {
      return spamDetectionResult;
    }

    // Check for potential injection attempts
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
  }

  // 7. Comprehensive profanity check using word boundary approach (shared for both)
  const BANNED_WORDS = new Set([
    // English profanity
    'fuck', 'shit', 'damn', 'bitch', 'ass', 'hell', 'crap', 'piss', 'bastard', 'whore', 'slut', 'cunt', 'cock', 'dick', 'pussy', 'tits', 'boobs', 'sex', 'intercourse', 'nude', 'naked', 'penis', 'vagina', 'anal', 'oral', 'masturbate', 'orgasm', 'cum', 'blowjob', 'handjob', 'dildo', 'vibrator',
    'motherfucker', 'asshole', 'douchebag', 'jackass', 'dickhead', 'shithead', 'fuckface', 'cocksucker', 'twat', 'prick', 'knobhead', 'tosser', 'wanker', 'bellend', 'pillock', 'minger', 'scrubber', 'slag',
    'horny', 'kinky', 'fetish', 'bdsm', 'threesome', 'gangbang', 'bukkake', 'creampie', 'deepthroat', 'rimjob', 'fisting', 'squirt', 'milf', 'gilf', 'cougar', 'escort', 'prostitute', 'hooker',
    'ballsack', 'nutsack', 'scrotum', 'clitoris', 'labia', 'areola', 'nipples', 'butthole', 'anus', 'rectum', 'pubic', 'genital', 'erection', 'boner',
    
    // Adult websites and platforms
    'onlyfans', 'xvideos', 'redtube', 'youjizz', 'xhamster', 'spankwire', 'chaturbate', 'cam4', 'livejasmin', 'missav', 'thisav', 'brazzers', 'jav', 'javhd', 'hentai', 'hanime', 'nhentai', 'loli', 'rule34', 'xnxx', 'youporn', 'eporner',
    
    // Hate speech and slurs
    'nigger', 'faggot', 'retard', 'nazi', 'hitler', 'kys', 'suicide', 'chink', 'gook', 'spic', 'wetback', 'beaner', 'cracker', 'honky', 'kike', 'jap', 'raghead', 'towelhead', 'sandnigger', 'cameljockey',
    
    // Drug references
    'cocaine', 'heroin', 'meth', 'weed', 'marijuana', 'cannabis', 'drug', 'drugs', 'crack', 'ecstasy', 'molly', 'mdma', 'lsd', 'acid', 'shrooms', 'mushrooms', 'ketamine', 'specialk', 'opium', 'fentanyl', 'oxy', 'xanax', 'adderall', 'ritalin', 'dope', 'pot', 'ganja', 'hash', 'blunt', 'joint', 'bong', 'pipe', 'needle', 'syringe', 'dealer', 'pusher',
    
    // Chinese profanity (Mandarin)
    '他媽的', '幹你娘', '操你媽', '去死', '白癡', '智障', '腦殘', '垃圾', '廢物', '幹', '操', '靠北', '靠腰', '機掰', '雞掰', '屌', '懶叫', '鳥', '屁眼', '婊子', '臭婊子', '賤人', '死人頭', '王八蛋', '混蛋', '畜生', '禽獸', '狗屎', '狗娘養的', '傻逼', '傻瓜', '傻屄', '狗日的', '你妹', '草泥马', '日你妈', '死全家', '滾蛋', '死肥豬', '二逼', '他妈的', '变态', '我操', '我靠', '操你妈', '操你祖宗十八代', '死肥猪', '滚', '滚开', '滚蛋', '笨蛋', '臭鸡蛋',
    
    // Cantonese profanity (Hong Kong)
    '屌你', '屌', '瘀', '閪', '撚', '柒頭', '仆街', '仆你個街', '死仔包', '死八婆', '鬼佬', '死鬼佬', '死開', '執嘢', '搵笨', '搵死', '食屎', '食蕉', '碌葛', '九唔搭八', '頂你', '頂你個肺', '戇居', '低能', '白痴', '戇鳩', '傻瓜', '蠢材', '衰仔', '衰佬', '衰婆', '你老母', '屌你老母', '你阿媽', '屌你阿媽', '死雞', '死豬', '死牛', '死狗', '屎忽鬼', '屎坑婆', '屎窟鬼', '雞', '鳩', '撚樣', '撚嘢', '鳩嘢', '柒嘢', '西嘢', '閪嘢', '哨牙', '爛牙', '爛舌頭', '含撚', '含鳩', '含西', '去死啦', '仆你',
    
    // Cantonese romanization variants
    'diu', 'dllm', 'sldpk', 'dnlm', 'dlnm', 'dn', 'sb3', 'on9', '6uo', 'onl79', 'on99', '0n9', '8964',
    
    // More Cantonese (traditional characters and variants)
    '戇撚', '戇鳩', '撚頭', '撚仔', '鳩仔', '西仔', '閪仔', '柒仔', '戇豬', '蠢豬', '低撚能', '撚低能', '鳩低能', '死撚仔', '死鳩仔', '死西仔', '死閪仔', '死柒仔', '撚樣衰', '鳩樣衰', '西樣衰', '閪樣衰', '柒樣衰', '屌你撚', '屌你鳩', '屌你西', '屌你閪', '屌你柒', '含撚包', '含鳩包', '含西包', '含閪包', '含柒包', '屌撚你', '屌鳩你', '屌西你', '屌閪你', '屌柒你', 'pk', '仆街仔', '仆街死', '咸濕', '妖', '神經病', '唔該死', '死扑街', '戇屎', '慳啲啦', '撈撈', '搵扑街', '阮囡', '臭雞', '臭閪', '屎忽', '死屍頭', '屌屎'
  ]);

  // Efficient word boundary profanity check
  function checkProfanity(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return words.some(word => BANNED_WORDS.has(word));
  }

  // Check profanity
  if (checkProfanity(cleanText)) {
    return {
      isClean: false,
      reason: `${type === 'username' ? 'Username' : 'Message'} contains inappropriate language`,
      severity: 'high'
    };
  }
  
  // HTML entity encode the text for extra safety (messages only, usernames stay as-is)
  const safeText = type === 'message' ? 
    cleanText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;') :
    cleanText;
  
  return {
    isClean: true,
    reason: null,
    cleanText: safeText
  };
}

// Comprehensive XSS sanitization function
function sanitizeForXSS(input, clientId = null, ip = null, secretmodkey = null) {
  // Note: Moderator check is handled at the calling function level
  
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
  // Note: Moderator check is handled at the calling function level

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
    
    // Get client IP with improved Cloudflare handling
    function getRealClientIP(req) {
      // Try Cloudflare headers first
      const cfConnectingIP = req.headers['cf-connecting-ip'];
      if (cfConnectingIP && !isCloudflareIP(cfConnectingIP)) {
        return cfConnectingIP;
      }
      
      // Try other proxy headers
      const trueClientIP = req.headers['true-client-ip'];
      if (trueClientIP && !isCloudflareIP(trueClientIP)) {
        return trueClientIP;
      }
      
      // Parse X-Forwarded-For (get the first non-Cloudflare IP)
      const xForwardedFor = req.headers['x-forwarded-for'];
      if (xForwardedFor) {
        const ips = xForwardedFor.split(',').map(ip => ip.trim());
        for (const ip of ips) {
          if (ip && !isPrivateIP(ip) && !isCloudflareIP(ip)) {
            return ip;
          }
        }
      }
      
      const xRealIP = req.headers['x-real-ip'];
      if (xRealIP && !isCloudflareIP(xRealIP)) {
        return xRealIP;
      }
      
      // Last resort - direct connection
      return req.socket.remoteAddress || 'unknown';
    }
    
    // Helper function to check if IP is a Cloudflare IP
    function isCloudflareIP(ip) {
      if (!ip) return false;
      const cloudflareRanges = [
        '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
        '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
        '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
        '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22'
      ];
      
      // Simple check for common Cloudflare IP ranges
      return ip.startsWith('104.') || ip.startsWith('172.') || 
             ip.startsWith('173.') || ip.startsWith('198.') ||
             ip.startsWith('162.') || ip.startsWith('141.') ||
             ip.startsWith('108.') || ip.startsWith('188.') ||
             ip.startsWith('190.') || ip.startsWith('197.') ||
             ip.startsWith('103.') || ip.startsWith('131.');
    }
    
    // Helper function to check if IP is private
    function isPrivateIP(ip) {
      if (!ip) return false;
      return ip.startsWith('10.') || ip.startsWith('192.168.') || 
             ip.startsWith('172.16.') || ip === '127.0.0.1' || ip === '::1';
    }
    
    const ip = getRealClientIP(req);
    
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

    // Check moderator status once for the entire request
    const isMod = isModerator(cleanClientId, ip, secretmodkey);
    console.log('DEBUG: Main handler isMod:', isMod, 'for username:', cleanUsername);
    
    // Apply unified content moderation for username
    const usernameModResult = await moderateContent(cleanUsername, 'username', cleanClientId, ip, secretmodkey, isMod);
    const hasRestrictedUsername = !usernameModResult.isClean;
    
    if (hasRestrictedUsername) {
      // Username violation detected but no logging
      console.log('Username violation:', usernameModResult.reason);
    }
    
    // Use the cleaned username (or original if restricted)
    cleanUsername = usernameModResult.isClean ? usernameModResult.cleanText : cleanUsername;

    // Note: Removed user tracking since Maps are removed
    // Serverless functions are stateless anyway
    const currentTime = Date.now();
    
    // Check rate limiting
    const rateLimitStatus = isRateLimited(cleanClientId, ip, secretmodkey, isMod);
    if (rateLimitStatus && rateLimitStatus.blocked) {
      await logModeration(cleanClientId, ip, cleanUsername, 'N/A', 'Rate limit violation', 'RATE_LIMIT');
      
      // Log rate limit violation
      // Rate limit exceeded
      console.log('Rate limit exceeded for:', cleanClientId, cleanUsername, ip);
      
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    // Use hardcoded Ably API key
    const ably = new Ably.Rest('fOPjAQ.LL-6_A:1QcafkRsuzspOaW3zofjg8Cu_5WjxEjpHUF0syG4uCs');

    // Check moderator status
    if (req.body.action === 'check_mod') {
      return res.status(200).json({ 
        isModerator: isMod 
      });
    }

    // Handle commands or moderation
    if (req.body.action === 'moderate') {
      const text = message;
      
      // Block messages from users with restricted usernames (except moderators)
      if (hasRestrictedUsername && !isMod) {
        return res.status(400).json({ 
          error: `Cannot send messages: ${usernameModResult.reason}` 
        });
      }
      // Check for commands first before any moderation
      if (text && text.startsWith('/')) {
        let match;

        // Help command - available to all users
        if (MOD_COMMANDS.help.test(message)) {
          const helpText = isMod ? 
            `Available moderator commands:
/help - Show this help message
/online - Show currently active users
/purge - Clear chat by flooding with placeholder messages
/link <url> - Send a clickable link as a message
/ipinfo <ip> - Get detailed information about an IP address` :
            `Available commands:
/help - Show this help message
/online - Show currently active users`;

          return res.status(200).json({
            status: 'success',
            command: true,
            message: helpText,
            private: true,
            doNotBroadcast: true
          });
        }

        // Online command - available to all users
        if (MOD_COMMANDS.online.test(message)) {
          try {
            const channel = ably.channels.get('dsebest-livechat');
            
            const presenceData = await channel.presence.get();
            
            // Debug logging to understand the response structure
            console.log('Presence response type:', typeof presenceData);
            console.log('Is array:', Array.isArray(presenceData));
            console.log('Presence data:', presenceData);
            
            // Safely handle different response formats
            let presenceSet = [];
            
            if (Array.isArray(presenceData)) {
              presenceSet = presenceData;
            } else if (presenceData && Array.isArray(presenceData.items)) {
              presenceSet = presenceData.items;
            } else if (presenceData && Array.isArray(presenceData.members)) {
              presenceSet = presenceData.members;
            } else if (presenceData && presenceData.length !== undefined) {
              // Handle array-like objects
              presenceSet = Array.from(presenceData);
            } else {
              // If it's a single object, wrap it in an array
              presenceSet = presenceData ? [presenceData] : [];
            }
            
            if (presenceSet.length === 0) {
              return res.status(200).json({
                status: 'success',
                command: true,
                message: 'No users currently online.',
                private: true
              });
            }
            
            // Extract usernames from presence data
            const usernames = presenceSet
              .filter(member => member && (member.data?.username || member.clientId))
              .map(member => {
                // Try to get username from data or clientId
                return member.data?.username || member.clientId || 'Unknown';
              })
              .filter(username => username && username !== 'Unknown')
              .sort()
              .filter((username, index, arr) => arr.indexOf(username) === index); // Remove duplicates
            
            const onlineList = usernames.length > 0 
              ? `👥 Online Users (${usernames.length}):\n\n${usernames.join('\n')}`
              : 'No users currently online.';
            
            return res.status(200).json({
              status: 'success',
              command: true,
              message: onlineList,
              private: true
            });
          } catch (error) {
            console.error('Error fetching online users:', error);
            return res.status(200).json({
              status: 'success',
              command: true,
              message: `Error fetching online users: ${error.message}`,
              private: true
            });
          }
        }

        // Moderator-only commands
        if (isMod) {
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

            // Publish the link message through Ably using [LINK] format
            try {
              // Use the existing ably instance from the main handler
              const channel = ably.channels.get('dsebest-livechat');
              
              // Send message in [LINK] format that client expects
              const linkText = `[LINK]${cleanUrl}[/LINK]`;
              
              // Send as normal message with [LINK] formatting
              await channel.publish('message', {
                clientId: cleanClientId,
                sender: cleanUsername,
                text: linkText,
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

          // IP Info command - get detailed IP information
          if (match = MOD_COMMANDS.ipinfo.exec(message)) {
            const [, targetIp] = match;
            
            if (!targetIp || targetIp.trim() === '') {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid usage. Correct format: /ipinfo <ip>',
                private: true
              });
            }

            const cleanIp = targetIp.trim();
            
            // Basic IP address validation
            const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
            
            if (!ipv4Regex.test(cleanIp) && !ipv6Regex.test(cleanIp)) {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: 'Invalid IP address format. Please provide a valid IPv4 or IPv6 address.',
                private: true
              });
            }

            try {
              console.log(`Moderator ${cleanUsername} requested IP info for: ${cleanIp}`);
              
              // Get detailed IP information
              const ipInfo = await getDetailedIPInfo(cleanIp);
              
              if (ipInfo.error) {
                return res.status(200).json({
                  status: 'success',
                  command: true,
                  message: `❌ Failed to lookup IP ${cleanIp}: ${ipInfo.error}`,
                  private: true
                });
              }

              // Format the response with essential information only
              const locationEmoji = ipInfo.isMobile ? '📱' : ipInfo.isHosting ? '🖥️' : ipInfo.isProxy ? '🔀' : '🌍';
              const securityFlags = [];
              if (ipInfo.isProxy) securityFlags.push('🔀 Proxy');
              if (ipInfo.isHosting) securityFlags.push('🖥️ Hosting');
              if (ipInfo.isMobile) securityFlags.push('📱 Mobile');
              
              const ipInfoText = `${locationEmoji} ${ipInfo.ip}

📍 ${ipInfo.city || 'Unknown'}, ${ipInfo.region || 'Unknown'}, ${ipInfo.country || 'Unknown'}
🌐 ${ipInfo.isp || 'Unknown'}
⏰ ${ipInfo.timezone || 'Unknown'}${securityFlags.length > 0 ? `\n🔒 ${securityFlags.join(', ')}` : ''}`;

              // Log the IP lookup for moderation purposes
              await logModeration(cleanClientId, ip, cleanUsername, 
                `/ipinfo ${cleanIp}`, 
                `IP information lookup`, 
                'MOD_IPINFO');

              return res.status(200).json({
                status: 'success',
                command: true,
                message: ipInfoText,
                private: true
              });
            } catch (error) {
              console.error('Error during IP info lookup:', error);
              return res.status(500).json({
                status: 'error',
                command: true,
                message: `Failed to lookup IP information: ${error.message}`,
                private: true
              });
            }
          }
        }

        // Check if the command looks like a valid command but with wrong syntax
        const commandPrefixes = ['/purge', '/help', '/online', '/link', '/ipinfo'];
        const commandWord = text.split(' ')[0].toLowerCase();
        
        if (commandPrefixes.some(prefix => commandWord.startsWith(prefix))) {
          // It's a recognized command but with invalid syntax
          const baseCommand = commandPrefixes.find(prefix => commandWord.startsWith(prefix));
          let helpText = '';
          
          switch (baseCommand) {
            case '/purge':
              helpText = 'Correct usage: /purge (no parameters needed)';
              break;
            case '/help':
              helpText = 'Correct usage: /help (no parameters needed)';
              break;
            case '/online':
              helpText = 'Correct usage: /online (no parameters needed)';
              break;
            case '/link':
              helpText = 'Correct usage: /link <url>';
              break;
            case '/ipinfo':
              helpText = 'Correct usage: /ipinfo <ip>';
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
      const modResult = await moderateContent(text, 'message', cleanClientId, ip, secretmodkey, isMod);
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
          
          // Message violation detected but no logging
          console.log('Message violation:', modResult.reason);
        }
        return res.status(403).json({ error: modResult.reason });
      }
      
      // Use already checked moderator status
      return res.status(200).json({ 
        status: 'Message approved',
        isModerator: isMod 
      });
    }

    // For message publishing
    if (req.body.action === 'publish') {
      const messageText = req.body.text;
      
      // Block messages from users with restricted usernames (except moderators)
      if (hasRestrictedUsername && !isMod) {
        return res.status(400).json({ 
          error: `Cannot send messages: ${usernameModResult.reason}` 
        });
      }
      
      // Check if the message is clean
      const modResult = await moderateContent(messageText, 'message', cleanClientId, ip, secretmodkey, isMod);
      if (!modResult.isClean) {
        // Message violation detected but no logging
        console.log('Message violation:', modResult.reason);
        
        return res.status(403).json({ error: modResult.reason });
      }

      // Use already checked moderator status
      
      // Create sanitized message object
      const sanitizedMessage = {
        clientId: cleanClientId,
        sender: cleanUsername,  // Changed from 'username' to 'sender' to match client expectations
        text: modResult.cleanText,
        timestamp: Date.now()
      };
      
      // Publish main message (without IP) to public channel
      await ably.channels.get('dsebest-livechat').publish('message', {
        ...sanitizedMessage,
        isModerator: isMod // Server-verified moderator status
      });
      
      // Publish IP data separately to moderator-only channel
      await ably.channels.get('dsebest-livechat').publish('user-ip', {
        messageId: sanitizedMessage.timestamp, // Use timestamp as message ID for correlation
        clientId: cleanClientId,
        userIP: ip,
        timestamp: sanitizedMessage.timestamp
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
      // No logging for user leave to reduce CPU overhead
      return res.status(200).json({ status: 'User left successfully' });
    }
    
    const tokenParams = { clientId: cleanClientId, capability: {
      'dsebest-livechat': ['publish', 'subscribe', 'presence', 'history']
    }};
    const tokenRequest = await ably.auth.createTokenRequest(tokenParams);
        
    return res.status(200).json(tokenRequest);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

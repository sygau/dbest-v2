const Ably = require('ably/promises');

// Initialize tracking maps
const rateLimits = new Map();
const userIPs = new Map();
const violationCounts = new Map();

// Moderator settings
const MOD_ID = process.env.MOD_ID || 'YOUR_CLIENT_ID';
const MOD_IP = '119.237.203.252'; // Trusted moderator IP

// Helper function to check if user is moderator
function isModerator(clientId, ip) {
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
  listbans: /^\/listbans$/i  // /listbans - show all banned users and IPs
};

// Rate limit settings
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 8; // 8 requests per minute
const BLOCK_THRESHOLD = 2; // Number of rate limit violations before blocking
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Ban types enum
const BAN_TYPES = {
  PERMANENT: 'permanent',
  TEMPORARY: 'temporary'
};

// Track bans - simple Map of clientId -> banInfo
const blockedUsers = new Map();
// Track IP bans separately for stronger enforcement
const blockedIPs = new Map();
// Track fingerprinting data to detect ban evasion
const userFingerprints = new Map();

// Enhanced ban check function with IP-level enforcement
function isUserBanned(clientId, ip) {
  // Never ban moderators
  if (isModerator(clientId, ip)) return false;
  
  // Check direct client ID ban
  if (blockedUsers.has(clientId)) return true;
  
  // Check IP ban (stronger enforcement)
  if (blockedIPs.has(ip)) return true;
  
  // Check for ban evasion by looking for other banned clients from same IP
  const ipUsers = Array.from(userIPs.entries())
    .filter(([, data]) => data.ip === ip)
    .map(([id]) => id);
  
  for (const userId of ipUsers) {
    if (blockedUsers.has(userId)) {
      // Auto-ban this client ID as well for ban evasion
      blockedUsers.set(clientId, {
        bannedAt: Date.now(),
        type: BAN_TYPES.PERMANENT,
        reason: 'Ban evasion detected',
        originalBannedUser: userId,
        ip: ip
      });
      return true;
    }
  }
  
  return false;
}

function isRateLimited(clientId, ip) {
  // Never rate-limit moderators
  if (isModerator(clientId, ip)) return false;

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

  // Enhanced rate limiting: also check by IP to prevent easy circumvention
  const ipRateKey = `ip_${ip}`;
  const userLimit = rateLimits.get(clientId);
  const ipLimit = rateLimits.get(ipRateKey);
  
  // Check both client ID and IP rate limits
  const clientExceeded = checkRateLimit(clientId, userLimit, now);
  const ipExceeded = checkRateLimit(ipRateKey, ipLimit, now);
  
  if (clientExceeded || ipExceeded) {
    return clientExceeded || ipExceeded;
  }

  return false;
}

// Helper function to check rate limits
function checkRateLimit(key, limitData, now) {
  if (!limitData) {
    rateLimits.set(key, {
      count: 1,
      windowStart: now
    });
    return false;
  }

  if (now - limitData.windowStart > RATE_LIMIT_WINDOW) {
    rateLimits.set(key, {
      count: 1,
      windowStart: now
    });
    return false;
  }

  if (limitData.count >= MAX_REQUESTS) {
    // Increment violation count
    const violations = (violationCounts.get(key) || 0) + 1;
    violationCounts.set(key, violations);

    // Check if user should be blocked
    if (violations >= BLOCK_THRESHOLD) {
      if (key.startsWith('ip_')) {
        const ip = key.substring(3);
        blockedIPs.set(ip, { blockedAt: now, reason: 'Rate limit violations' });
      } else {
        blockedUsers.set(key, { blockedAt: now, reason: 'Rate limit violations' });
      }
      return { blocked: true, remaining: BLOCK_DURATION };
    }

    return { limited: true, resetTime: limitData.windowStart + RATE_LIMIT_WINDOW - now };
  }

  limitData.count++;
  return false;
}

// Logging function for moderation events
async function logModeration(clientId, ip, username, message, reason, action) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${action}: ${username} (${clientId}) from ${ip}\nMessage: ${message}\nReason: ${reason}`;
  console.log('MODERATION_LOG:', logEntry);
}

// Modular spam detection system
function detectSpam(text) {
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

  // 5. Check message length (server-side enforcement)
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
    
    // Common bypass attempts
    /[f]+[u\*\-_]*[c]+[k\*\-_]+/i,
    /[s]+[h\*\-_]*[i\*\-_]*[t]+/i,
    /[b]+[i\*\-_]*[t\*\-_]*[c]+[h\*\-_]*/i,
    /[d]+[i\*\-_]*[u\*\-_]+/i,
    /[p]+[o\*\-_]*[r]+[n\*\-_]*/i,
    
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
  const spamDetectionResult = detectSpam(cleanText);
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
  
  // HTML entity encode the text for extra safety
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
    cleanText: safeText // Return HTML-encoded text
  };
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { clientId, username, message, action } = req.body;
    
    // Validate and sanitize inputs
    const cleanClientId = String(clientId || '').trim();
    let cleanUsername = String(username || '').trim();
    
    // HTML encode username for safety
    cleanUsername = cleanUsername
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
    
    // Get client IP
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
               req.headers['x-real-ip'] || 
               req.socket.remoteAddress;

    if (!cleanClientId || !cleanUsername) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Additional input validation
    if (cleanUsername.length > 14 || cleanUsername.length < 3) {
      return res.status(400).json({ error: 'Invalid username length' });
    }

    // Check for malicious clientId patterns
    if (cleanClientId.length > 100 || /[<>\"'&]/.test(cleanClientId)) {
      return res.status(400).json({ error: 'Invalid client ID format' });
    }

    // Track user IP
    userIPs.set(cleanClientId, {
      ip,
      lastSeen: Date.now(),
      username: cleanUsername
    });

    // Check if user is banned
    if (isUserBanned(cleanClientId, ip)) {
      return res.status(403).json({ error: 'You are permanently banned from the chat' });
    }
    
    // Check rate limiting
    const rateLimitStatus = isRateLimited(cleanClientId, ip);
    if (rateLimitStatus && rateLimitStatus.blocked) {
      await logModeration(cleanClientId, ip, cleanUsername, 'N/A', 'Rate limit violation', 'RATE_LIMIT');
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    const ably = new Ably.Rest(process.env.ABLY_API_KEY);

    // Handle commands or moderation
    if (req.body.action === 'moderate') {
      const text = message;
      // Check for commands first before any moderation
      if (text && text.startsWith('/')) {
        let match;

        // Help command - available to all users
        if (MOD_COMMANDS.help.test(message)) {
          const isModHelper = isModerator(cleanClientId, ip);
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
/purge - Clear chat by flooding with placeholder messages` :
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
        if (isModerator(cleanClientId, ip)) {
          // Info command
          if (match = MOD_COMMANDS.info.exec(message)) {
            const [, targetId] = match;
            const targetData = userIPs.get(targetId);
            const banData = blockedUsers.get(targetId);
            
            let status = 'Active';
            if (banData) status = banData.type === BAN_TYPES.PERMANENT ? 'Permanently Banned' : 'Temporarily Banned';

            const info = {
              clientId: targetId,
              username: targetData?.username || 'Unknown',
              ip: targetData?.ip || 'Unknown',
              status,
              lastSeen: targetData ? new Date(targetData.lastSeen).toISOString() : 'Never',
              banInfo: banData || 'None'
            };

            return res.status(200).json({
              status: 'success',
              command: true,
              message: `User Info:\n${JSON.stringify(info, null, 2)}`,
              private: true,
              doNotBroadcast: true
            });
          }

          // Ban command
          if (match = MOD_COMMANDS.ban.exec(message)) {
            const [, targetId] = match;
            const targetData = userIPs.get(targetId);
            
            if (!targetData) {
              return res.status(400).json({
                status: 'error',
                command: true,
                message: `User ${targetId} not found in active users`,
                private: true
              });
            }

            // Enhanced ban with IP blocking
            const banData = {
              bannedAt: Date.now(),
              type: BAN_TYPES.PERMANENT,
              moderator: clientId,
              reason: 'Moderator ban',
              ip: targetData.ip,
              duration: Infinity
            };

            blockedUsers.set(targetId, banData);
            // Also ban the IP
            blockedIPs.set(targetData.ip, {
              bannedAt: Date.now(),
              reason: 'Associated with banned user',
              bannedUser: targetId,
              moderator: clientId
            });
            
            // Ban all other users from the same IP
            const ipUsers = Array.from(userIPs.entries())
              .filter(([, data]) => data.ip === targetData.ip)
              .map(([id]) => id);
              
            ipUsers.forEach(userId => {
              if (userId !== targetId) {
                blockedUsers.set(userId, {
                  ...banData,
                  reason: 'Same IP as banned user',
                  originalBannedUser: targetId
                });
              }
            });
              
            await logModeration(targetId, targetData.ip, targetData.username, 
              'N/A', 
              `Permanently banned by moderator ${username}. IP banned. Associated IDs: ${ipUsers.join(', ')}`, 
              'MOD_BAN');

            return res.status(200).json({ 
              status: 'Command executed',
              command: true,
              message: `User ${targetId} and IP ${targetData.ip} have been permanently banned. ${ipUsers.length} accounts affected.`
            });
          }

          // Unban command
          if (match = MOD_COMMANDS.unban.exec(message)) {
            const [, targetId] = match;
            const targetData = userIPs.get(targetId);
            
            blockedUsers.delete(targetId);
            
            // Also unban the IP if no other banned users share it
            if (targetData?.ip) {
              const otherBannedFromIP = Array.from(blockedUsers.entries())
                .filter(([, data]) => data.ip === targetData.ip && targetId !== targetId);
              
              if (otherBannedFromIP.length === 0) {
                blockedIPs.delete(targetData.ip);
              }
            }

            await logModeration(targetId, targetData?.ip || 'unknown', targetId,
              'N/A', `Unbanned by moderator ${username}`, 'MOD_UNBAN');
            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `User ${targetId} has been unbanned`
            });
          }

          // Ban IP command
          if (match = MOD_COMMANDS.banip.exec(message)) {
            const [, targetIP] = match;
            
            blockedIPs.set(targetIP, {
              bannedAt: Date.now(),
              reason: 'Direct IP ban by moderator',
              moderator: clientId
            });

            // Ban all users currently using this IP
            const affectedUsers = Array.from(userIPs.entries())
              .filter(([, data]) => data.ip === targetIP)
              .map(([id]) => id);

            affectedUsers.forEach(userId => {
              blockedUsers.set(userId, {
                bannedAt: Date.now(),
                type: BAN_TYPES.PERMANENT,
                moderator: clientId,
                reason: 'IP banned by moderator',
                ip: targetIP
              });
            });

            await logModeration('SYSTEM', targetIP, 'N/A', 'N/A', 
              `IP banned by moderator ${username}. Affected users: ${affectedUsers.join(', ')}`, 
              'MOD_IP_BAN');

            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `IP ${targetIP} has been banned. ${affectedUsers.length} users affected.`
            });
          }

          // Unban IP command
          if (match = MOD_COMMANDS.unbanip.exec(message)) {
            const [, targetIP] = match;
            
            blockedIPs.delete(targetIP);

            await logModeration('SYSTEM', targetIP, 'N/A', 'N/A',
              `IP unbanned by moderator ${username}`, 'MOD_IP_UNBAN');
              
            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `IP ${targetIP} has been unbanned`
            });
          }

          // List bans command
          if (MOD_COMMANDS.listbans.test(message)) {
            const bannedUsers = Array.from(blockedUsers.entries()).slice(0, 10);
            const bannedIPs = Array.from(blockedIPs.entries()).slice(0, 10);
            
            let banList = 'Recent Bans:\n\n';
            
            if (bannedUsers.length > 0) {
              banList += 'Banned Users:\n';
              bannedUsers.forEach(([id, data]) => {
                banList += `• ${id} (${data.reason || 'No reason'})\n`;
              });
              banList += '\n';
            }
            
            if (bannedIPs.length > 0) {
              banList += 'Banned IPs:\n';
              bannedIPs.forEach(([ip, data]) => {
                banList += `• ${ip} (${data.reason || 'No reason'})\n`;
              });
            }
            
            if (bannedUsers.length === 0 && bannedIPs.length === 0) {
              banList += 'No active bans.';
            }

            return res.status(200).json({
              status: 'success',
              command: true,
              message: banList,
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
                message: `Chat purged with ${count} placeholder messages`
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

          // Whois command
          if (match = MOD_COMMANDS.whois.exec(message)) {
            const [, targetUsername] = match;
            const matches = Array.from(userIPs.entries())
              .filter(([, data]) => data.username.toLowerCase() === targetUsername.toLowerCase())
              .map(([clientId, data]) => ({
                clientId,
                username: data.username,
                ip: data.ip,
                lastSeen: new Date(data.lastSeen).toISOString()
              }));

            if (matches.length === 0) {
              return res.status(200).json({
                status: 'error',
                command: true,
                message: `No users found with username "${targetUsername}"`,
                private: true
              });
            }

            const message = matches.map(user => 
              `User: ${user.username}\nClient ID: ${user.clientId}\nIP: ${user.ip}\nLast seen: ${user.lastSeen}`
            ).join('\n\n');

            return res.status(200).json({
              status: 'success',
              command: true,
              message: `Found ${matches.length} match${matches.length > 1 ? 'es' : ''}:\n\n${message}`,
              private: true
            });
          }
        }

        // If we get here, it's an unknown command
        return res.status(400).json({
          status: 'error',
          command: true,
          message: 'Unknown command',
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
        }
        return res.status(403).json({ error: modResult.reason });
      }
      
      // Check if sender is moderator
      const isMod = isModerator(cleanClientId, ip);
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
        return res.status(403).json({ error: modResult.reason });
      }

      // Check if sender is moderator
      const isMod = isModerator(cleanClientId, ip);
      
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

      return res.status(200).json({ status: 'published' });
    }

    // For token generation
    const tokenParams = { clientId, capability: {
      'dsebest-livechat': ['publish', 'subscribe', 'presence', 'history']
    }};
    const tokenRequest = await ably.auth.createTokenRequest(tokenParams);
    return res.status(200).json(tokenRequest);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

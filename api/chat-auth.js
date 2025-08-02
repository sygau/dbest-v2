const Ably = require('ably/promises');

// Initialize tracking maps
const rateLimits = new Map();
const userIPs = new Map();
const violationCounts = new Map();

// Moderator settings
const MOD_ID = process.env.MOD_ID || 'YOUR_CLIENT_ID';
const MOD_IP = '219.76.84.8'; // Trusted moderator IP

// Helper function to check if user is moderator
function isModerator(clientId, ip) {
  return clientId === MOD_ID || ip === MOD_IP;
}

// Command patterns
const MOD_COMMANDS = {
  ban: /^\/ban (\S+)$/i,     // /ban clientId - permanent ban
  unban: /^\/unban (\S+)$/i, // /unban clientId
  info: /^\/info (\S+)$/i,   // /info clientId - show user info
  help: /^\/help$/i,         // /help - show available commands
  purge: /^\/purge(?:\s+(\d+|all))?$/i,  // /purge [number|all] - purge messages
  whois: /^\/whois (\S+)$/i  // /whois username - get user's client ID
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

// Simple ban check function
function isUserBanned(clientId) {
  return blockedUsers.has(clientId);
}

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
  const logEntry = `[${timestamp}] ${action}: ${username} (${clientId}) from ${ip}\nMessage: ${message}\nReason: ${reason}`;
  console.log('MODERATION_LOG:', logEntry);
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
    /\b(fuck|shit|damn|bitch)\b/i,
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
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { clientId, username, message, action } = req.body;
    
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

    // Check if user is banned
    if (isUserBanned(clientId)) {
      return res.status(403).json({ error: 'You are permanently banned from the chat' });
    }
    
    // Check rate limiting
    const rateLimitStatus = isRateLimited(clientId);
    if (rateLimitStatus && rateLimitStatus.blocked) {
      await logModeration(clientId, ip, username, 'N/A', 'Rate limit violation', 'RATE_LIMIT');
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
          const isModHelper = isModerator(clientId, ip);
          const helpText = isModHelper ? 
            `Available commands:
/help - Show this help message
/whois <username> - Get client ID and info for a user by their username
/info <clientid> - Show detailed information for a client ID
/ban <clientid> - Permanently ban a user
/unban <clientid> - Remove a user's ban
/purge [number|all] - Purge messages` :
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
        if (isModerator(clientId, ip)) {
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

            const banData = {
              bannedAt: Date.now(),
              type: BAN_TYPES.PERMANENT,
              moderator: clientId,
              reason: 'Moderator ban',
              ip: targetData.ip,
              duration: Infinity
            };

            blockedUsers.set(targetId, banData);
            
            // Also check for IP bans
            const ipBans = Array.from(blockedUsers.entries())
              .filter(([, data]) => data.ip === targetData.ip)
              .map(([id]) => id);
              
            await logModeration(targetId, targetData.ip, targetData.username, 
              'N/A', 
              `Permanently banned by moderator ${username}. Associated IDs: ${ipBans.join(', ')}`, 
              'MOD_BAN');

            return res.status(200).json({ 
              status: 'Command executed',
              command: true,
              message: `User ${targetId} has been permanently banned`
            });
          }

          // Unban command
          if (match = MOD_COMMANDS.unban.exec(message)) {
            const [, targetId] = match;
            blockedUsers.delete(targetId);

            await logModeration(targetId, userIPs.get(targetId)?.ip || 'unknown', targetId,
              'N/A', `Unbanned by moderator ${username}`, 'MOD_UNBAN');
            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `User ${targetId} has been unbanned`
            });
          }

          // Purge command
          if (match = MOD_COMMANDS.purge.exec(message)) {
            const [, amount = "all"] = match;
            const count = amount === "all" ? 'all' : parseInt(amount) || 50;
            
            const channel = ably.channels.get('dsebest-livechat');

            if (count === 'all') {
              // Delete all messages from history first using REST API
              const deleteParams = new URLSearchParams();
              deleteParams.append('start', '0');  // From beginning of time
              deleteParams.append('end', Date.now().toString());  // Until now
              
              await fetch(`https://rest.ably.io/channels/dsebest-livechat/messages?${deleteParams}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Basic ${Buffer.from(process.env.ABLY_API_KEY).toString('base64')}`,
                }
              });

              // Then notify clients
              await channel.publish('command', {
                type: 'purge',
                count: 'all',
                moderator: username,
                timestamp: Date.now()
              });
            } else {
              // Get specific number of messages
              const history = await channel.history({ limit: count });
              const messages = history.items;

              if (messages.length > 0) {
                // Delete messages from history using REST API
                const deleteParams = new URLSearchParams();
                deleteParams.append('start', messages[messages.length - 1].timestamp);  // From oldest message
                deleteParams.append('end', messages[0].timestamp);  // To newest message
                
                await fetch(`https://rest.ably.io/channels/dsebest-livechat/messages?${deleteParams}`, {
                  method: 'DELETE',
                  headers: {
                    'Authorization': `Basic ${Buffer.from(process.env.ABLY_API_KEY).toString('base64')}`,
                  }
                });

                // Notify clients about each deleted message
                for (const msg of messages) {
                  await channel.publish('command', {
                    type: 'delete',
                    messageId: msg.id,
                    moderator: username,
                    timestamp: Date.now()
                  });
                }
              }
            }

            return res.status(200).json({
              status: 'Command executed',
              command: true,
              message: `Purged ${amount === "all" ? "all" : count} messages`
            });
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
      const modResult = moderateContent(text, clientId, ip, username);
      if (!modResult.isClean) {
        if (modResult.severity !== 'low') {
          await logModeration(
            clientId, 
            ip, 
            username, 
            text,
            modResult.reason,
            'VIOLATION'
          );
        }
        return res.status(403).json({ error: modResult.reason });
      }
      
      // Check if sender is moderator
      const isMod = isModerator(clientId, ip);
      return res.status(200).json({ 
        status: 'Message approved',
        isModerator: isMod 
      });
    }

    // For message publishing
    if (req.body.action === 'publish') {
      const messageText = req.body.text;
      
      // Check if the message is clean
      const modResult = moderateContent(messageText, clientId, ip, username);
      if (!modResult.isClean) {
        return res.status(403).json({ error: modResult.reason });
      }

      // Check if sender is moderator
      const isMod = isModerator(clientId, ip);
      
      // Publish through server's Ably instance with verified status
      await ably.channels.get('dsebest-livechat').publish('message', {
        ...message,
        isModerator: isMod // Server-verified moderator status
      });

      return res.status(200).json({ status: 'published' });
    }

    // For purging messages
    if (req.body.action === 'purge') {
      const { count } = req.body;
      if (!isModerator(clientId, ip)) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const channel = ably.channels.get('dsebest-livechat');

      try {
        if (count === 'all') {
          // Get all messages first
          const history = await channel.history({ limit: 1000, direction: 'forwards' });
          const messages = history.items;

          if (messages.length > 0) {
            // Use the REST client to delete messages
            const rest = new Ably.Rest(process.env.ABLY_API_KEY);
            const restChannel = rest.channels.get(channel.name);

            // Remove each message individually to ensure they're deleted
            const deletePromises = messages.map(msg => 
              restChannel.deleteMessage(msg.id)
            );
            await Promise.all(deletePromises);
          }

          // Then notify clients
          await channel.publish('command', {
            type: 'purge',
            count: 'all',
            moderator: username,
            timestamp: Date.now()
          });
        } else {
          // Get last N messages
          const history = await channel.history({ limit: count });
          const messages = history.items;

          if (messages.length > 0) {
            // Use the REST client to delete messages
            const rest = new Ably.Rest(process.env.ABLY_API_KEY);
            const restChannel = rest.channels.get(channel.name);

            // Remove each message individually
            const deletePromises = messages.map(msg => 
              restChannel.deleteMessage(msg.id)
            );
            await Promise.all(deletePromises);

            // Notify clients about each deleted message
            for (const msg of messages) {
              await channel.publish('command', {
                type: 'delete',
                messageId: msg.id,
                moderator: username,
                timestamp: Date.now()
              });
            }
          }
        }
      } catch (error) {
        console.error('Error during purge:', error);
        return res.status(500).json({ error: 'Failed to purge messages: ' + error.message });
      }

      return res.status(200).json({ status: 'purge complete' });
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

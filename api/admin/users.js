import { verifyAdminAuth } from './auth.js';

// Admin users endpoint
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        // Verify authentication
        const authResult = verifyAdminAuth(req);
        if (!authResult.authenticated) {
            return res.status(401).json({ error: authResult.error });
        }

        try {
            // Ably REST API configuration
            const ABLY_API_KEY = process.env.ABLY_API_KEY;
            if (!ABLY_API_KEY) {
                return res.status(500).json({ error: 'Ably API key not configured' });
            }

            const [keyName, keySecret] = ABLY_API_KEY.split(':');
            const authHeader = Buffer.from(`${keyName}:${keySecret}`).toString('base64');

            // Get channel history to extract user information
            const historyResponse = await fetch(
                'https://rest.ably.io/channels/dse-chat/messages?limit=1000',
                {
                    headers: {
                        'Authorization': `Basic ${authHeader}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!historyResponse.ok) {
                throw new Error(`Ably API error: ${historyResponse.status}`);
            }

            const historyData = await historyResponse.json();
            const messages = historyData.items || [];

            // Extract user information from messages
            const usersMap = new Map();
            const bannedUsers = new Set();

            messages.forEach(msg => {
                try {
                    const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
                    
                    // Check for ban messages
                    if (data.type === 'system' && data.text && data.text.includes('has been banned')) {
                        // Extract banned user info from system message
                        const match = data.text.match(/User (.+?) has been banned/);
                        if (match) {
                            bannedUsers.add(match[1]);
                        }
                    }

                    // Regular user message
                    if (data.sender && data.clientId) {
                        const userId = data.clientId;
                        
                        if (!usersMap.has(userId)) {
                            usersMap.set(userId, {
                                username: data.sender,
                                clientId: data.clientId,
                                ip: data.ip || 'Unknown',
                                firstSeen: msg.timestamp,
                                lastSeen: msg.timestamp,
                                messageCount: 0
                            });
                        }

                        const user = usersMap.get(userId);
                        user.messageCount++;
                        user.lastSeen = Math.max(user.lastSeen, msg.timestamp);
                        user.firstSeen = Math.min(user.firstSeen, msg.timestamp);
                        
                        // Update username and IP if more recent
                        if (msg.timestamp === user.lastSeen) {
                            user.username = data.sender;
                            if (data.ip) {
                                user.ip = data.ip;
                            }
                        }
                    }
                } catch (e) {
                    // Skip invalid messages
                }
            });

            // Convert to array and add ban status
            const users = Array.from(usersMap.values()).map(user => ({
                ...user,
                banned: bannedUsers.has(user.username) || bannedUsers.has(user.clientId)
            }));

            // Sort by last seen (most recent first)
            users.sort((a, b) => b.lastSeen - a.lastSeen);

            return res.status(200).json(users);
        } catch (error) {
            console.error('Users error:', error);
            return res.status(500).json({ 
                error: 'Failed to fetch users',
                details: error.message 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

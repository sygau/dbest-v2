import { verifyAdminAuth } from './auth.js';

// Admin stats endpoint
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

            // Get channel history to calculate stats
            const historyResponse = await fetch(
                'https://rest.ably.io/channels/dse-chat/messages?limit=1000',
                {
                    headers: {
                        'Authorization': `Basic ${authHeader}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            let stats = {
                totalUsers: 0,
                activeUsers: 0,
                totalMessages: 0,
                bannedUsers: 0
            };

            if (historyResponse.ok) {
                const historyData = await historyResponse.json();
                const messages = historyData.items || [];

                // Calculate total messages
                stats.totalMessages = messages.length;

                // Get unique users
                const users = new Set();
                const activeUsers = new Set();
                const now = Date.now();
                const oneDayAgo = now - (24 * 60 * 60 * 1000);

                messages.forEach(msg => {
                    try {
                        const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
                        if (data.sender) {
                            users.add(data.sender);
                            
                            // Check if user was active in last 24 hours
                            if (msg.timestamp && msg.timestamp > oneDayAgo) {
                                activeUsers.add(data.sender);
                            }
                        }
                    } catch (e) {
                        // Skip invalid messages
                    }
                });

                stats.totalUsers = users.size;
                stats.activeUsers = activeUsers.size;

                // Count banned users (look for ban messages)
                const banMessages = messages.filter(msg => {
                    try {
                        const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
                        return data.type === 'system' && 
                               data.text && 
                               data.text.includes('has been banned');
                    } catch (e) {
                        return false;
                    }
                });
                
                stats.bannedUsers = banMessages.length;
            }

            return res.status(200).json(stats);
        } catch (error) {
            console.error('Stats error:', error);
            return res.status(500).json({ 
                error: 'Failed to fetch stats',
                details: error.message 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

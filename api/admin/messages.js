import { verifyAdminAuth } from './auth.js';

// Admin messages endpoint
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

            // Get recent messages (limit to last 50)
            const limit = req.query.limit || 50;
            const historyResponse = await fetch(
                `https://rest.ably.io/channels/dse-chat/messages?limit=${limit}&direction=backwards`,
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

            // Process and format messages
            const formattedMessages = messages
                .map(msg => {
                    try {
                        const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
                        
                        // Skip system messages unless they're important
                        if (data.type === 'system' && !data.text.includes('banned')) {
                            return null;
                        }

                        return {
                            id: msg.id,
                            timestamp: msg.timestamp || Date.now(),
                            sender: data.sender || 'Unknown',
                            clientId: data.clientId || 'Unknown',
                            text: data.text || '',
                            type: data.type || 'message',
                            ip: data.ip || 'Unknown'
                        };
                    } catch (e) {
                        // Return malformed message info
                        return {
                            id: msg.id,
                            timestamp: msg.timestamp || Date.now(),
                            sender: 'Unknown',
                            clientId: 'Unknown',
                            text: '[Malformed message]',
                            type: 'error',
                            ip: 'Unknown'
                        };
                    }
                })
                .filter(msg => msg !== null)
                .reverse(); // Newest first

            return res.status(200).json(formattedMessages);
        } catch (error) {
            console.error('Messages error:', error);
            return res.status(500).json({ 
                error: 'Failed to fetch messages',
                details: error.message 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

import { verifyAdminAuth } from './auth.js';

// Admin chat purge endpoint
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
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

            // Since Ably doesn't have a direct "clear history" API for free tier,
            // we'll send a special system message indicating a purge
            // The frontend can handle this by clearing local message display
            const purgeMessage = {
                name: 'message',
                data: JSON.stringify({
                    type: 'system',
                    subtype: 'purge',
                    text: `🧹 Chat has been purged by admin ${authResult.username}`,
                    timestamp: Date.now(),
                    admin: authResult.username,
                    action: 'purge'
                })
            };

            const publishResponse = await fetch(
                'https://rest.ably.io/channels/dse-chat/messages',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${authHeader}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(purgeMessage)
                }
            );

            if (!publishResponse.ok) {
                throw new Error(`Failed to publish purge message: ${publishResponse.status}`);
            }

            // Note: In a production environment with database storage,
            // you would also clear the message history from your database here

            return res.status(200).json({ 
                success: true,
                message: 'Chat has been purged',
                timestamp: new Date().toISOString(),
                admin: authResult.username
            });
        } catch (error) {
            console.error('Purge error:', error);
            return res.status(500).json({ 
                error: 'Failed to purge chat',
                details: error.message 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

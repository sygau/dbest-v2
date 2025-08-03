import { verifyAdminAuth } from './auth.js';

// Admin ban/unban endpoint
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
            const { clientId, ip, action } = req.body;

            if (!action || !['ban', 'unban', 'banip'].includes(action)) {
                return res.status(400).json({ error: 'Invalid action' });
            }

            if ((action === 'ban' || action === 'unban') && !clientId) {
                return res.status(400).json({ error: 'Client ID is required for user ban/unban' });
            }

            if (action === 'banip' && !ip) {
                return res.status(400).json({ error: 'IP address is required for IP ban' });
            }

            // Ably REST API configuration
            const ABLY_API_KEY = process.env.ABLY_API_KEY;
            if (!ABLY_API_KEY) {
                return res.status(500).json({ error: 'Ably API key not configured' });
            }

            const [keyName, keySecret] = ABLY_API_KEY.split(':');
            const authHeader = Buffer.from(`${keyName}:${keySecret}`).toString('base64');

            let systemMessage;
            let targetIdentifier;

            if (action === 'ban') {
                systemMessage = `🔨 User ${clientId} has been banned by admin ${authResult.username}`;
                targetIdentifier = clientId;
            } else if (action === 'unban') {
                systemMessage = `✅ User ${clientId} has been unbanned by admin ${authResult.username}`;
                targetIdentifier = clientId;
            } else if (action === 'banip') {
                systemMessage = `🚫 IP address ${ip} has been banned by admin ${authResult.username}`;
                targetIdentifier = ip;
            }

            // Send system message to chat
            const messagePayload = {
                name: 'message',
                data: JSON.stringify({
                    type: 'system',
                    text: systemMessage,
                    timestamp: Date.now(),
                    admin: authResult.username,
                    action: action,
                    target: targetIdentifier
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
                    body: JSON.stringify(messagePayload)
                }
            );

            if (!publishResponse.ok) {
                throw new Error(`Failed to publish ban message: ${publishResponse.status}`);
            }

            // For a real implementation, you would also update a database or ban list here
            // For this PoC, we just publish the system message which the chat middleware can check

            return res.status(200).json({ 
                success: true,
                message: systemMessage,
                action: action,
                target: targetIdentifier,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Ban action error:', error);
            return res.status(500).json({ 
                error: 'Failed to perform ban action',
                details: error.message 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

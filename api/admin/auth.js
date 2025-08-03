// Admin authentication endpoint
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Simple hardcoded credentials for PoC
    const ADMIN_CREDENTIALS = {
        'admin': 'dse2024!',
        'moderator': 'mod2024!'
    };

    // Secret for JWT-like token (in production, use environment variable)
    const JWT_SECRET = 'dse-admin-secret-2024';

    if (req.method === 'POST') {
        // Login
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ 
                    error: 'Username and password are required' 
                });
            }

            if (ADMIN_CREDENTIALS[username] && ADMIN_CREDENTIALS[username] === password) {
                // Create a simple token (username + timestamp + signature)
                const timestamp = Date.now();
                const payload = `${username}:${timestamp}`;
                const signature = require('crypto')
                    .createHmac('sha256', JWT_SECRET)
                    .update(payload)
                    .digest('hex');
                
                const token = `${payload}:${signature}`;

                // Set httpOnly cookie (expires in 24 hours)
                const cookieOptions = [
                    `admin_token=${token}`,
                    'HttpOnly',
                    'Secure',
                    'SameSite=Strict',
                    'Path=/',
                    `Max-Age=${24 * 60 * 60}` // 24 hours
                ];

                res.setHeader('Set-Cookie', cookieOptions.join('; '));

                return res.status(200).json({ 
                    success: true, 
                    username,
                    message: 'Login successful' 
                });
            } else {
                return res.status(401).json({ 
                    error: 'Invalid credentials' 
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    } else if (req.method === 'GET') {
        // Check authentication
        try {
            const token = req.cookies?.admin_token;

            if (!token) {
                return res.status(401).json({ 
                    error: 'Not authenticated' 
                });
            }

            // Verify token
            const [username, timestamp, signature] = token.split(':');
            const payload = `${username}:${timestamp}`;
            const expectedSignature = require('crypto')
                .createHmac('sha256', JWT_SECRET)
                .update(payload)
                .digest('hex');

            if (signature !== expectedSignature) {
                return res.status(401).json({ 
                    error: 'Invalid token' 
                });
            }

            // Check if token is expired (24 hours)
            const tokenAge = Date.now() - parseInt(timestamp);
            if (tokenAge > 24 * 60 * 60 * 1000) {
                return res.status(401).json({ 
                    error: 'Token expired' 
                });
            }

            // Check if username is valid
            if (!ADMIN_CREDENTIALS[username]) {
                return res.status(401).json({ 
                    error: 'Invalid user' 
                });
            }

            return res.status(200).json({ 
                authenticated: true, 
                username,
                loginTime: new Date(parseInt(timestamp)).toISOString()
            });
        } catch (error) {
            console.error('Auth check error:', error);
            return res.status(401).json({ 
                error: 'Authentication failed' 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

// Helper function to verify admin authentication (for other endpoints)
export function verifyAdminAuth(req) {
    const JWT_SECRET = 'dse-admin-secret-2024';
    const ADMIN_CREDENTIALS = {
        'admin': 'dse2024!',
        'moderator': 'mod2024!'
    };

    try {
        const token = req.cookies?.admin_token;

        if (!token) {
            return { authenticated: false, error: 'No token provided' };
        }

        const [username, timestamp, signature] = token.split(':');
        const payload = `${username}:${timestamp}`;
        const expectedSignature = require('crypto')
            .createHmac('sha256', JWT_SECRET)
            .update(payload)
            .digest('hex');

        if (signature !== expectedSignature) {
            return { authenticated: false, error: 'Invalid token signature' };
        }

        // Check if token is expired (24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        if (tokenAge > 24 * 60 * 60 * 1000) {
            return { authenticated: false, error: 'Token expired' };
        }

        // Check if username is valid
        if (!ADMIN_CREDENTIALS[username]) {
            return { authenticated: false, error: 'Invalid user' };
        }

        return { 
            authenticated: true, 
            username,
            loginTime: new Date(parseInt(timestamp)).toISOString()
        };
    } catch (error) {
        return { authenticated: false, error: 'Token verification failed' };
    }
}

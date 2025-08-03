// Admin logout endpoint
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
        try {
            // Clear the admin cookie
            const cookieOptions = [
                'admin_token=',
                'HttpOnly',
                'Secure',
                'SameSite=Strict',
                'Path=/',
                'Max-Age=0' // Expire immediately
            ];

            res.setHeader('Set-Cookie', cookieOptions.join('; '));

            return res.status(200).json({ 
                success: true,
                message: 'Logged out successfully' 
            });
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Method not allowed' 
        });
    }
}

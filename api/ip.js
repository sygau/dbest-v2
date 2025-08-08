export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cfConnectingIp = req.headers['cf-connecting-ip'] || null;
  const trueClientIp = req.headers['true-client-ip'] || null;
  const xForwardedForRaw = req.headers['x-forwarded-for'] || null;
  const xForwardedForFirst = Array.isArray(xForwardedForRaw)
    ? xForwardedForRaw[0]
    : (xForwardedForRaw ? String(xForwardedForRaw).split(',')[0].trim() : null);
  const xRealIp = req.headers['x-real-ip'] || null;
  const socketRemoteAddress = req.socket?.remoteAddress || null;

  const detectedIp = cfConnectingIp || trueClientIp || xForwardedForFirst || xRealIp || socketRemoteAddress;
  const methodUsed = detectedIp === cfConnectingIp ? 'cf-connecting-ip'
    : detectedIp === trueClientIp ? 'true-client-ip'
    : detectedIp === xForwardedForFirst ? 'x-forwarded-for:first'
    : detectedIp === xRealIp ? 'x-real-ip'
    : 'socket.remoteAddress';

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  return res.status(200).json({
    detectedIp,
    methodUsed,
    headers: {
      cfConnectingIp,
      trueClientIp,
      xForwardedForFirst,
      xForwardedForRaw,
      xRealIp
    },
    socketRemoteAddress
  });
} 
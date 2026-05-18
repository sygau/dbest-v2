/**
 * Worker entry — thin router.
 *
 * Its only job: accept the WebSocket upgrade, attach Cloudflare geo + the
 * real client IP as headers, and forward to the single ChatRoom DO instance.
 * All chat logic lives in the Durable Object.
 */
import { CONFIG, type Env } from './config';

export { ChatRoom } from './ChatRoom';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('dse.best chat worker — connect via WebSocket.', {
        status: 426,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Origin allowlist — blocks other sites' browser JS from opening sockets.
    const origin = request.headers.get('Origin');
    if (origin && !(CONFIG.ALLOWED_ORIGINS as readonly string[]).includes(origin)) {
      return new Response('Forbidden origin', { status: 403 });
    }

    // Cloudflare-provided geo (free plan: country + ASN + ASN org).
    const cf = (request.cf || {}) as IncomingRequestCfProperties;
    const forwarded = new Request(request);
    forwarded.headers.set('X-Chat-IP', request.headers.get('CF-Connecting-IP') || 'unknown');
    forwarded.headers.set('X-Chat-Country', String(cf.country || 'XX'));
    forwarded.headers.set('X-Chat-ASN', String(cf.asn ?? ''));
    forwarded.headers.set('X-Chat-ASOrg', String(cf.asOrganization || ''));

    const id = env.CHAT_ROOM.idFromName(CONFIG.ROOM_NAME);
    return env.CHAT_ROOM.get(id).fetch(forwarded);
  },
};

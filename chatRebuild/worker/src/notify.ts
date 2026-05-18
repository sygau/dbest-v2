/**
 * NTFY push notifications.
 *
 * Geo comes entirely from request.cf (free plan: country + ASN + ASN org).
 * City / region / timezone are paid-plan fields — intentionally omitted.
 * No external ip-api.com request.
 */
import { CONFIG } from './config';
import type { ChatMessage, GeoInfo } from './types';

/** Fire-and-forget — never blocks or fails the message path. */
export async function sendNtfy(msg: ChatMessage, geo: GeoInfo): Promise<void> {
  if (!CONFIG.NTFY_ENABLED) return;

  const location = `🌍 ${geo.country || 'Unknown'}` +
    (geo.asOrg ? ` · ${geo.asOrg}` : '') +
    (geo.asn ? ` (AS${geo.asn})` : '');
  const body = `${msg.text}\n\n${location}\n🔗 ${geo.ip || 'Unknown IP'}`;

  try {
    await fetch(`https://ntfy.sh/${CONFIG.NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        'X-Title': msg.sender,
        'X-Priority': '3',
        'X-Click': CONFIG.NTFY_CLICK_URL,
        'X-Icon': CONFIG.NTFY_ICON,
      },
      body,
    });
  } catch {
    // Notifications are best-effort; swallow errors.
  }
}

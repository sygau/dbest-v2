// Cloudflare Turnstile server verification.
// Skipped when IS_PROD !== 'true' (dev convenience) or when secret missing.

export async function verifyTurnstile(token: string | undefined, secret: string | undefined, remoteIp?: string): Promise<boolean> {
  if (!secret) return true; // dev / unconfigured
  if (!token) return false;

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await r.json() as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

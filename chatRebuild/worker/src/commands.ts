/**
 * Slash-command parsing. Pure functions — no state.
 * The ChatRoom DO executes the parsed command (it owns sockets + storage).
 */

export type ParsedCommand =
  | { name: 'help' }
  | { name: 'online' }
  | { name: 'purge' }
  | { name: 'link'; url: string }
  | { name: 'img'; url: string }
  | { name: 'ipinfo'; ip: string }
  | { name: 'lockdown'; enable: boolean }
  | { name: 'ban'; ip: string }
  | { name: 'unknown'; hint: string };

const PATTERNS = {
  help: /^\/help\s*$/i,
  online: /^\/online\s*$/i,
  purge: /^\/purge\s*$/i,
  link: /^\/link\s+(.+)$/i,
  img: /^\/(?:img|image)\s+(.+)$/i,
  ipinfo: /^\/ipinfo\s+(\S+)$/i,
  lockdown: /^\/lockdown\s+(on|off)$/i,
  ban: /^\/ban\s+(\S+)$/i,
};

/** Returns null when the text is not a command at all. */
export function parseCommand(text: string): ParsedCommand | null {
  if (!text.startsWith('/')) return null;
  let m: RegExpExecArray | null;

  if (PATTERNS.help.test(text)) return { name: 'help' };
  if (PATTERNS.online.test(text)) return { name: 'online' };
  if (PATTERNS.purge.test(text)) return { name: 'purge' };
  if ((m = PATTERNS.link.exec(text))) return { name: 'link', url: m[1].trim() };
  if ((m = PATTERNS.img.exec(text))) return { name: 'img', url: m[1].trim() };
  if ((m = PATTERNS.ipinfo.exec(text))) return { name: 'ipinfo', ip: m[1].trim() };
  if ((m = PATTERNS.lockdown.exec(text))) return { name: 'lockdown', enable: m[1].toLowerCase() === 'on' };
  if ((m = PATTERNS.ban.exec(text))) return { name: 'ban', ip: m[1].trim() };

  // Looks like a command but malformed — give a usage hint.
  const word = text.split(/\s+/)[0].toLowerCase();
  const hints: Record<string, string> = {
    '/link': 'Usage: /link <url>',
    '/img': 'Usage: /img <direct image url>',
    '/image': 'Usage: /image <direct image url>',
    '/ipinfo': 'Usage: /ipinfo <ip>',
    '/lockdown': 'Usage: /lockdown on|off',
    '/ban': 'Usage: /ban <ip>',
  };
  if (hints[word]) return { name: 'unknown', hint: hints[word] };
  return { name: 'unknown', hint: 'Unknown command. Type /help.' };
}

export function helpText(isMod: boolean): string {
  if (!isMod) {
    return [
      'Available commands:',
      '/help — show this message',
      '/online — show how many users are online',
    ].join('\n');
  }
  return [
    'Moderator commands:',
    '/help — show this message',
    '/online — list online users',
    '/purge — clear the chat for everyone',
    '/link <url> — post a clickable link',
    '/img <url> — embed an image',
    '/ipinfo <ip> — geo info for an IP seen in this room',
    '/lockdown on|off — restrict sending to moderators',
    '/ban <ip> — permanently ban an IP',
  ].join('\n');
}

const IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$/;
const IPV6 = /^(?:[0-9a-fA-F]{1,4}:){2,7}[0-9a-fA-F]{0,4}$|^::1$/;

export function isValidIp(ip: string): boolean {
  return IPV4.test(ip) || IPV6.test(ip);
}

/** Emoji shortcode expansion — :heart: → ❤️ etc. */

const EMOJI: Record<string, string> = {
  ':heart:': '❤️',
  ':love:': '💕',
  ':smile:': '😊',
  ':laugh:': '😂',
  ':cry:': '😢',
  ':angry:': '😠',
  ':thumbsup:': '👍',
  ':thumbsdown:': '👎',
  ':fire:': '🔥',
  ':star:': '⭐',
};

export function expandEmoji(text: string): string {
  let out = text;
  for (const [code, emoji] of Object.entries(EMOJI)) {
    out = out.split(code).join(emoji);
  }
  return out;
}

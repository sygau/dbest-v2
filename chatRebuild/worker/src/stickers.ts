/**
 * Sticker registry — server side.
 * Only the names matter here (permission check). Image paths live client-side.
 * Mirror of lib/chat/stickers.ts — keep in sync.
 */

export const REGULAR_STICKERS = [
  'excited', 'wave', 'shocked', 'shh', 'thumbsdown', 'agree', 'heart1',
  'clap', 'thumbsup_glasses', 'ace', 'yay', 'wot', 'tophat', 'sorry',
  'frown', 'hmmm', 'hungry', 'backstab',
];

export const MOD_STICKERS = [
  'ifc', 'middlefinger', 'police1', 'police2', 'jable', 'saibou', 'mh3',
  'mh4', 'hahah', 'goodmorning', 'job', 'red', 'beer', 'smoke', 'keepscrolling',
  'a_clap', 'a_laugh', 'a_pc', 'a_hammer', 'a_hellnah', 'a_juggle', 'a_wave',
  'a_angrywalk', 'a_ball', 'a_boo', 'a_faint', 'a_gun', 'a_keyboard', 'a_pray',
  'a_reading', 'a_sadbye', 'a_ski', 'a_sprint', 'a_taphead',
];

const REGULAR = new Set(REGULAR_STICKERS);
const MOD = new Set(MOD_STICKERS);

export type StickerCheck = { known: boolean; modOnly: boolean };

export function checkSticker(name: string): StickerCheck {
  const n = name.toLowerCase();
  if (REGULAR.has(n)) return { known: true, modOnly: false };
  if (MOD.has(n)) return { known: true, modOnly: true };
  return { known: false, modOnly: false };
}

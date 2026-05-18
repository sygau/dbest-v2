/**
 * Sticker registry — client side (names + image paths).
 * Mirror of chatRebuild/worker/src/stickers.ts (names must match).
 */

export interface Sticker {
  name: string;
  url: string;
  modOnly: boolean;
}

const REGULAR_NAMES = [
  'excited', 'wave', 'shocked', 'shh', 'thumbsdown', 'agree', 'heart1',
  'clap', 'thumbsup_glasses', 'ace', 'yay', 'wot', 'tophat', 'sorry',
  'frown', 'hmmm', 'hungry', 'backstab',
];

const MOD_NAMES = [
  'ifc', 'middlefinger', 'police1', 'police2', 'jable', 'saibou', 'mh3',
  'mh4', 'hahah', 'goodmorning', 'job', 'red', 'beer', 'smoke', 'keepscrolling',
  'a_clap', 'a_laugh', 'a_pc', 'a_hammer', 'a_hellnah', 'a_juggle', 'a_wave',
  'a_angrywalk', 'a_ball', 'a_boo', 'a_faint', 'a_gun', 'a_keyboard', 'a_pray',
  'a_reading', 'a_sadbye', 'a_ski', 'a_sprint', 'a_taphead',
];

const toSticker = (modOnly: boolean) => (name: string): Sticker => ({
  name,
  url: `/assets/stickers/${name}.webp`,
  modOnly,
});

export const REGULAR_STICKERS: Sticker[] = REGULAR_NAMES.map(toSticker(false));
export const MOD_STICKERS: Sticker[] = MOD_NAMES.map(toSticker(true));

const BY_NAME = new Map<string, Sticker>(
  [...REGULAR_STICKERS, ...MOD_STICKERS].map((s) => [s.name, s]),
);

/** Look up a sticker for rendering (any sticker is viewable by anyone). */
export function getSticker(name: string): Sticker | null {
  return BY_NAME.get(name.toLowerCase()) ?? null;
}

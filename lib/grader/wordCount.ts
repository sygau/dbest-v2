// Isomorphic — usable from client + server. No Node-only deps.

export function countWordsEn(s: string): number {
  const m = s.trim().match(/\b[\p{L}\p{N}'-]+\b/gu);
  return m ? m.length : 0;
}

export function countCharsCh(s: string): number {
  const m = s.match(/[一-鿿㐀-䶿]/gu);
  return m ? m.length : 0;
}

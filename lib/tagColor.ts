function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h *= 60
  }
  return [h, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function tagColor(baseHex: string, seed: string): string {
  const safeBase = baseHex && /^#?[0-9a-f]{3,8}$/i.test(baseHex) ? baseHex : '#549ee8'
  const [r, g, b] = hexToRgb(safeBase)
  const [h, s, l] = rgbToHsl(r, g, b)
  const hash = hashStr(seed)
  const newH = (h + ((hash % 30) - 15) + 360) % 360
  const newS = Math.max(25, Math.min(80, s + ((hash % 20) - 10)))
  const newL = Math.max(38, Math.min(60, l))
  return hslToHex(newH, newS, newL)
}

export function tagBgColor(baseHex: string, seed: string): { bg: string; fg: string } {
  const c = tagColor(baseHex, seed)
  return { bg: c, fg: '#fff' }
}

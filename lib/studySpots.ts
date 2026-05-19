export type SpotType = 'library' | 'cafe' | 'coworking' | 'public-space'
export type SpotRegion = 'hk-island' | 'kowloon' | 'nt'
export type SpotSetting = 'indoor' | 'outdoor' | 'mixed'
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface StudySpot {
  id: string
  name: string
  type: SpotType
  region: SpotRegion
  district: string
  address: string
  coords: [number, number]
  hours: Record<DayKey, string>
  setting: SpotSetting
  nearby_mtr: string
  photo: string
  wifi: boolean
  power_outlets: boolean
  purchase_required: boolean
  study_rooms: boolean
  tags: string[]
  notes: string
  google_maps_url: string
  status: boolean
}

export const TYPE_META: Record<SpotType, { label: string; en: string; color: string }> = {
  library: { label: '公共圖書館', en: 'Library', color: '#549ee8' },
  cafe: { label: '咖啡店', en: 'Cafe', color: '#d98e3f' },
  coworking: { label: '自修空間', en: 'Study Space', color: '#7c5ce7' },
  'public-space': { label: '公共空間', en: 'Public Space', color: '#34a853' },
}

// Region badge colours — hard-coded, shared by cards / overlay / map.
export const REGION_META: Record<SpotRegion, { label: string; en: string; color: string }> = {
  'hk-island': { label: '香港島', en: 'HK Island', color: '#c2410c' },
  kowloon: { label: '九龍', en: 'Kowloon', color: '#7c3aed' },
  nt: { label: '新界', en: 'New Territories', color: '#0f766e' },
}

export const DAYS: { key: DayKey; label: string }[] = [
  { key: 'mon', label: '一' },
  { key: 'tue', label: '二' },
  { key: 'wed', label: '三' },
  { key: 'thu', label: '四' },
  { key: 'fri', label: '五' },
  { key: 'sat', label: '六' },
  { key: 'sun', label: '日' },
]

/** Current weekday + minutes-since-midnight in Hong Kong time. */
export function hkNow(): { day: DayKey; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Hong_Kong',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const map: Record<string, DayKey> = {
    Mon: 'mon', Tue: 'tue', Wed: 'wed', Thu: 'thu', Fri: 'fri', Sat: 'sat', Sun: 'sun',
  }
  const wd = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  let h = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10)
  if (h === 24) h = 0
  const m = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10)
  return { day: map[wd] ?? 'mon', minutes: h * 60 + m }
}

/** True if the spot is open right now (HK time). Call only on the client. */
export function isOpenNow(spot: StudySpot): boolean {
  const { day, minutes } = hkNow()
  const today = spot.hours[day]
  if (!today || today.toLowerCase() === 'closed') return false
  const m = today.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)
  if (!m) return false
  const start = +m[1] * 60 + +m[2]
  const end = +m[3] * 60 + +m[4]
  return minutes >= start && minutes < end
}

export function todayKey(): DayKey {
  return hkNow().day
}

export const SETTING_META: Record<SpotSetting, { label: string; en: string }> = {
  indoor: { label: '室內', en: 'Indoor' },
  outdoor: { label: '室外', en: 'Outdoor' },
  mixed: { label: '室內外', en: 'Indoor & Outdoor' },
}

/** Great-circle distance in km between two [lat, lng] points. */
export function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

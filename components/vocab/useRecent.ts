import { useCallback, useEffect, useState } from 'react'

const RECENT_KEY = 'vocab-recent'
const MAX_RECENT = 8

export interface RecentItem {
  sectionSlug: string
  setSlug: string
  ts: number
}

function readRecent(): RecentItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is RecentItem =>
        x && typeof x.sectionSlug === 'string' && typeof x.setSlug === 'string' && typeof x.ts === 'number',
    )
  } catch {
    return []
  }
}

function writeRecent(list: RecentItem[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export function useRecent() {
  const [recent, setRecent] = useState<RecentItem[]>([])

  useEffect(() => {
    setRecent(readRecent())
  }, [])

  const bump = useCallback((sectionSlug: string, setSlug: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((r) => !(r.sectionSlug === sectionSlug && r.setSlug === setSlug))
      const next = [{ sectionSlug, setSlug, ts: Date.now() }, ...filtered].slice(0, MAX_RECENT)
      writeRecent(next)
      return next
    })
  }, [])

  return { recent, bump }
}

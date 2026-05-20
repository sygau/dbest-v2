import { useCallback, useEffect, useState } from 'react'

const SETS_KEY = 'vocab-bookmarks-sets'
const ENTRIES_KEY = 'vocab-bookmarks-entries'

function readList(key: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

function writeList(key: string, list: string[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // ignore quota / privacy mode
  }
}

export function setKey(sectionSlug: string, setSlug: string) {
  return `${sectionSlug}/${setSlug}`
}

export function useBookmarks() {
  const [sets, setSets] = useState<string[]>([])
  const [entries, setEntries] = useState<string[]>([])

  useEffect(() => {
    setSets(readList(SETS_KEY))
    setEntries(readList(ENTRIES_KEY))

    function onStorage(e: StorageEvent) {
      if (e.key === SETS_KEY) setSets(readList(SETS_KEY))
      if (e.key === ENTRIES_KEY) setEntries(readList(ENTRIES_KEY))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const hasSet = useCallback((key: string) => sets.includes(key), [sets])
  const hasEntry = useCallback((id: string) => entries.includes(id), [entries])

  const toggleSet = useCallback((key: string) => {
    setSets((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      writeList(SETS_KEY, next)
      return next
    })
  }, [])

  const toggleEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
      writeList(ENTRIES_KEY, next)
      return next
    })
  }, [])

  return { sets, entries, hasSet, hasEntry, toggleSet, toggleEntry }
}

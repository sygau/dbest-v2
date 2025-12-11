import Head from 'next/head'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function LockPage() {
  const router = useRouter()
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cooldownMs, setCooldownMs] = useState(0)
  const timerRef = useRef<number | null>(null)

  const STORAGE_KEY = 'lock_attempts_v1'

  const readState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return { attempts: 0, last: 0, penalty: 0 }
      const parsed = JSON.parse(raw)
      return {
        attempts: Number(parsed.attempts) || 0,
        last: Number(parsed.last) || 0,
        penalty: Number(parsed.penalty) || 0,
      }
    } catch {
      return { attempts: 0, last: 0, penalty: 0 }
    }
  }

  const writeState = (s: { attempts: number; last: number; penalty: number }) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    } catch {}
  }

  const getSafeNext = (): string => {
    const raw = typeof router.query.next === 'string' ? router.query.next : '/'
    if (!raw) return '/'
    if (raw.startsWith('/') && !raw.startsWith('//')) return raw
    return '/'
  }

  useEffect(() => {
    // Initialize cooldown if any
    const now = Date.now()
    const s = typeof window !== 'undefined' ? readState() : { attempts: 0, last: 0, penalty: 0 }
    const remaining = Math.max(0, (s.last || 0) + (s.penalty || 0) - now)
    if (remaining > 0) setCooldownMs(remaining)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (cooldownMs <= 0) return
    timerRef.current = window.setInterval(() => {
      setCooldownMs((ms) => {
        if (ms <= 1000) {
          if (timerRef.current) window.clearInterval(timerRef.current)
          return 0
        }
        return ms - 1000
      })
    }, 1000) as unknown as number
  }, [cooldownMs])

  const canSubmit = cooldownMs <= 0 && !loading

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError(null)

    const now = Date.now()
    const s = readState()

    const nextAttempts = (s.attempts || 0) + 1
    let penalty = s.penalty || 0
    if (nextAttempts > 5) {
      penalty = 3_000
    } else {
      penalty = 0
    }

    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        const newState = { attempts: nextAttempts, last: now, penalty }
        writeState(newState)
        if (penalty > 0) setCooldownMs(penalty)
        setError(data.error || 'Invalid passcode')
        setLoading(false)
        return
      }
      writeState({ attempts: 0, last: 0, penalty: 0 })
      const safeNext = getSafeNext()
      router.replace(safeNext)
    } catch (err) {
      const newState = { attempts: nextAttempts, last: now, penalty }
      writeState(newState)
      if (penalty > 0) setCooldownMs(penalty)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>x.dse.best</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0e1f',
        color: '#e5e7eb'
      }}>
        <div style={{ width: '100%', maxWidth: 360, padding: 20 }}>
          <div style={{ marginBottom: 12, textAlign: 'center' }}>
            <h1 style={{ fontSize: 18, margin: 0, fontWeight: 600 }}>HM Tech</h1>
            <p style={{ fontSize: 13, marginTop: 6, color: '#9ca3af' }}>Enter passcode to continue</p>
          </div>
          <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                id="passcode"
                type="text"
                placeholder="Passcode"
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                inputMode="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                aria-label="Passcode"
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 10,
                  border: '1px solid #374151',
                  background: '#111827',
                  color: '#e5e7eb',
                  padding: '0 12px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  height: 42,
                  padding: '0 14px',
                  borderRadius: 10,
                  border: '1px solid #4f46e5',
                  background: canSubmit ? '#4f46e5' : '#374151',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: canSubmit ? 'pointer' : 'not-allowed'
                }}
              >
                {loading ? '...' : cooldownMs > 0 ? Math.ceil(cooldownMs / 1000).toString() : 'Enter'}
              </button>
            </div>
            {error && (
              <div role="alert" style={{ color: '#fca5a5', fontSize: 13, marginTop: 10 }}>{error}</div>
            )}
          </form>
          <div style={{ marginTop: 20, fontSize: 11, textAlign: 'center', color: '#6b7280' }}>
            &copy; 2025 Hung Mau Technologes Inc | All rights reserved
          </div>
        </div>
      </div>
    </>
  )
}
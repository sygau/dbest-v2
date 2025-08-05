'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

declare global {
  interface Window {
    Pace: any
  }
}

export default function PaceLoader() {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      if (typeof window !== 'undefined' && window.Pace) {
        window.Pace.restart()
      }
    }

    const handleComplete = () => {
      if (typeof window !== 'undefined' && window.Pace) {
        setTimeout(() => {
          window.Pace.stop()
          document.documentElement.classList.remove('pace-running')
          document.documentElement.classList.add('pace-done')
        }, 100)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return null
}

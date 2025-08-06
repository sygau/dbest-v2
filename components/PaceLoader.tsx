'use client'
import { useRouter } from 'next/router'
import { useEffect, memo } from 'react'

declare global {
  interface Window {
    Pace: any
  }
}

const PaceLoader = memo(function PaceLoader() {
  const router = useRouter()

  useEffect(() => {
    // Initialize Pace.js when component mounts
    const loadPace = async () => {
      if (typeof window !== 'undefined') {
        const Pace = (await import('pace-js')).default
        
        // Configure Pace.js with optimized settings
        Pace.start({
          ajax: {
            trackMethods: ['GET', 'POST', 'PUT', 'DELETE'],
            trackWebSockets: true,
            ignoreURLs: ['/api/health', '/assets/', '/_next/']
          },
          elements: {
            selectors: ['[data-pace-track]']
          },
          restartOnPushState: true,
          restartOnRequestAfter: false,
          ghostTime: 100,
          maxProgressPerFrame: 20,
          easeFactor: 1.25,
          startOnPageLoad: true,
          minTime: 250
        })

        // Store Pace instance globally for router events
        window.Pace = Pace
      }
    }

    loadPace()
  }, [])

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
})

export default PaceLoader

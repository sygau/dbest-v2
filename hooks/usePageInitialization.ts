import { useRouter } from 'next/router'
import { useEffect } from 'react'

declare global {
  interface Window {
    initPaperLinks?: () => void
    updateCountdown?: () => void
    countdownInterval?: NodeJS.Timeout
    blogPagination?: any
    initializePage?: () => void
    adsbygoogle?: unknown[]
  }
}

const usePageInitialization = () => {
  const router = useRouter()

  const initializePage = () => {
    if (typeof window !== 'undefined') {
      // Main page initialization
      if (typeof window.initializePage === 'function') {
        window.initializePage()
      }

      // Re-trigger Google AdSense Auto Ads
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        console.log('AdSense re-triggered.')
      } catch (e) {
        console.warn('AdSense reload failed:', e)
      }
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      console.log('Route change completed, scheduling page initialization...')
      setTimeout(initializePage, 500) // Slightly longer delay for layout stabilization
    }

    console.log('usePageInitialization mounted, scheduling initial page setup...')
    setTimeout(initializePage, 500)

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)

      if (typeof window !== 'undefined') {
        if (window.countdownInterval) {
          clearInterval(window.countdownInterval)
        }
      }
    }
  }, [router.pathname])

  return null
}

export default usePageInitialization

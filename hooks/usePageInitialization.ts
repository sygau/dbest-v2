import { useRouter } from 'next/router'
import { useEffect } from 'react'

declare global {
  interface Window {
    initPaperLinks?: () => void
    updateCountdown?: () => void
    countdownInterval?: NodeJS.Timeout
    blogPagination?: any
    initializePage?: () => void
    adsbygoogle?: any[]
  }
}

const usePageInitialization = () => {
  const router = useRouter()

  const initializePage = () => {
    if (typeof window !== 'undefined') {
      // Main page initialization (custom logic)
      if (typeof window.initializePage === 'function') {
        window.initializePage()
      }

      // Re-trigger Google AdSense
      try {
        // Only signal AdSense to scan for unprocessed slots. DO NOT touch the ad DOM.
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({})
          console.log('AdSense re-tried via .push({}) after route/content change')
        } else {
          console.warn('AdSense script not loaded yet')
        }
      } catch (e) {
        console.warn('AdSense reload failed:', e)
        // Optionally, retry logic
        setTimeout(() => {
          try {
            window.adsbygoogle && window.adsbygoogle.push({})
          } catch (retryError) {
            console.warn('AdSense retry failed:', retryError)
          }
        }, 1000)
      }
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setTimeout(initializePage, 1000) // Delay for layout/content to settle
    }

    setTimeout(initializePage, 1000) // Initial page load

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      if (typeof window !== 'undefined' && window.countdownInterval) {
        clearInterval(window.countdownInterval)
      }
    }
  }, [router.asPath])

  return null
}

export default usePageInitialization

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

      // Improved AdSense initialization for auto ads
      const initializeAdSense = () => {
        try {
          // Check if AdSense script is loaded
          if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            // For auto ads, we don't need to manually push - it should work automatically
            // But we can signal AdSense to scan for new content if needed
            console.log('AdSense script loaded, auto ads should work automatically')
            
            // Only push if there are unprocessed ad slots (for manual ads, not auto ads)
            // For auto ads, this is usually not necessary
            // window.adsbygoogle.push({})
          } else {
            console.warn('AdSense script not loaded yet, retrying...')
            // Retry after a short delay
            setTimeout(initializeAdSense, 500)
          }
        } catch (e) {
          console.warn('AdSense initialization failed:', e)
        }
      }

      // Initialize AdSense with a slight delay to ensure DOM is ready
      setTimeout(initializeAdSense, 100)
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      // Increased delay for route changes to ensure content is fully loaded
      setTimeout(initializePage, 1500)
    }

    // Initial page load with shorter delay
    setTimeout(initializePage, 1000)

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

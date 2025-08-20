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

  const reloadAds = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        // Force AdSense to re-evaluate all ad containers on the page
        // This ensures ads below the fold also load
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      } catch (error) {
        console.error('Error reloading AdSense ads:', error)
      }
    }
  }

  const initializePage = () => {
    if (typeof window !== 'undefined') {
      // Main page initialization (custom logic)
      if (typeof window.initializePage === 'function') {
        window.initializePage()
      }
      reloadAds()
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      // Delay for layout/content to settle
      setTimeout(initializePage, 300)
    }

    // Initial page load
    setTimeout(initializePage, 300)

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

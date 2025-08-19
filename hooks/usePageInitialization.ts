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

      // Auto ads work automatically - no manual intervention needed
      // The AdSense script in _document.tsx handles everything
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      // Delay for layout/content to settle
      setTimeout(initializePage, 1000)
    }

    // Initial page load
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

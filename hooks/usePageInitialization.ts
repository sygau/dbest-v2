import { useRouter } from 'next/router'
import { useEffect } from 'react'

declare global {
  interface Window {
    initPaperLinks?: () => void
    updateCountdown?: () => void
    countdownInterval?: NodeJS.Timeout
    blogPagination?: any
    initializePage?: () => void
  }
}

const usePageInitialization = () => {
  const router = useRouter()

  const initializePage = () => {
    // Call the global initialization functions defined in _document.tsx
    if (typeof window !== 'undefined') {
      // Main page initialization (only for general paper links functionality)
      if (typeof window.initializePage === 'function') {
        window.initializePage()
      }
      // Note: Page-specific scripts (countdown, chat, blog) are now handled 
      // directly in their respective TSX components via useEffect
    }
  }

  useEffect(() => {
    // Initialize page when route changes
    const handleRouteChangeComplete = () => {
      console.log('Route change completed, scheduling page initialization...');
      // Shorter delay since we only need to initialize paper links
      setTimeout(initializePage, 200)
    }

    // Initialize on mount with delay
    console.log('usePageInitialization mounted, scheduling initial page setup...');
    setTimeout(initializePage, 200)

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      
      // Cleanup on unmount - call any global cleanup if needed
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

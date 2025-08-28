import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUIInitialization from './useUIInitialization'

declare global {
  interface Window {
    initPaperLinks?: () => void
    updateCountdown?: () => void
    countdownInterval?: NodeJS.Timeout
    blogPagination?: any
    initializePage?: () => void
  }
}

/**
 * Hook to initialize page functionality
 * Now uses React hooks instead of jQuery-based functionality
 */
const usePageInitialization = () => {
  const router = useRouter()
  
  // Initialize all UI functionality using our new React hooks
  const ui = useUIInitialization()

  const initializePage = () => {
    if (typeof window !== 'undefined') {
      // Initialize paper links if available (subject-specific functionality)
      if (typeof window.initPaperLinks === 'function') {
        window.initPaperLinks()
      }
      
      // Initialize countdown if on countdown page
      if (router.pathname === '/countdown' && typeof window.updateCountdown === 'function') {
        window.updateCountdown()
      }
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

  // Return UI methods for use in components if needed
  return ui
}

export default usePageInitialization

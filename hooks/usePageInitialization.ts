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
        // Clean up any existing AdSense instances
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          // Find all ad containers
          const adsenseElements = document.querySelectorAll('ins.adsbygoogle');
          
          // Clear and prepare for re-initialization
          adsenseElements.forEach(element => {
            // Clear the inner HTML of the ad container
            element.innerHTML = '';
            
            // Remove the data-ad-status attribute completely
            element.removeAttribute('data-ad-status');
            
            // Force browser to recognize the element as "new"
            const parent = element.parentNode;
            if (parent) {
              const newAdElement = element.cloneNode(true);
              parent.replaceChild(newAdElement, element);
            }
          });
          
          console.log('Cleaned up existing AdSense instances');
        }
        
        // Initialize new AdSense instances
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense re-triggered.');
      } catch (e) {
        console.warn('AdSense reload failed:', e);
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
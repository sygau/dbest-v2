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
      // Main page initialization
      if (typeof window.initializePage === 'function') {
        window.initializePage()
      }

      // Re-trigger Google AdSense Auto Ads
      try {
        // Check if AdSense script is loaded
        if (!window.adsbygoogle) {
          console.warn('AdSense script not loaded yet');
          return;
        }

        // Find all ad containers that haven't been processed
        const adsenseElements = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
        
        if (adsenseElements.length > 0) {
          // Push to AdSense queue for each unprocessed ad
          adsenseElements.forEach(() => {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          });
          
          console.log(`AdSense re-triggered for ${adsenseElements.length} ads`);
        } else {
          // If no unprocessed ads found, try to refresh existing ones
          const allAdsenseElements = document.querySelectorAll('ins.adsbygoogle');
          allAdsenseElements.forEach(element => {
            // Remove processing status to allow re-initialization
            element.removeAttribute('data-adsbygoogle-status');
            element.removeAttribute('data-ad-status');
            // Clear the content
            element.innerHTML = '';
          });
          
          // Push to queue once for all refreshed ads
          if (allAdsenseElements.length > 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log(`AdSense refreshed for ${allAdsenseElements.length} existing ads`);
          }
        }
      } catch (e) {
        console.warn('AdSense reload failed:', e);
        // Retry mechanism
        setTimeout(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (retryError) {
            console.warn('AdSense retry failed:', retryError);
          }
        }, 1000);
      }
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      console.log('Route change completed, scheduling page initialization...')
      setTimeout(initializePage, 1000) // Longer delay for better stability
    }

    console.log('usePageInitialization mounted, scheduling initial page setup...')
    setTimeout(initializePage, 1000)

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)

      if (typeof window !== 'undefined') {
        if (window.countdownInterval) {
          clearInterval(window.countdownInterval)
        }
      }
    }
  }, [router.asPath]) // Changed from router.pathname to router.asPath

  return null
}

export default usePageInitialization

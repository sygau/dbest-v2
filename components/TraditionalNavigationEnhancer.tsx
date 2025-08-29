import { useEffect, useState } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

export default function TraditionalNavigationEnhancer() {
  const { isTraditionalMode } = useNavigationMode()
  const [isNavigating, setIsNavigating] = useState(false)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)

  useEffect(() => {
    if (!isTraditionalMode) return

    // Store scroll position before navigation
    const handleBeforeUnload = () => {
      setLastScrollPosition(window.scrollY)
      localStorage.setItem('lastScrollPosition', window.scrollY.toString())
      localStorage.setItem('lastPath', window.location.pathname)
    }

    // Restore scroll position after navigation
    const handleLoad = () => {
      const savedScrollPosition = localStorage.getItem('lastScrollPosition')
      const savedPath = localStorage.getItem('lastPath')
      
      if (savedScrollPosition && savedPath === window.location.pathname) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition))
        }, 100)
      }
    }

    // Handle navigation clicks with smooth transition
    const handleNavigationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (!link || !link.href) return
      
      // Only handle internal navigation
      if (!link.href.startsWith(window.location.origin)) return
      
      // Skip if it's already the current page
      if (link.href === window.location.href) return
      
      // Skip if it's a download link or external link
      if (link.href.includes('.pdf') || link.href.includes('mailto:') || link.href.includes('tel:')) return
      
      e.preventDefault()
      setIsNavigating(true)
      
      // Store current state
      setLastScrollPosition(window.scrollY)
      localStorage.setItem('lastScrollPosition', window.scrollY.toString())
      localStorage.setItem('lastPath', window.location.pathname)
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        window.location.href = link.href
      }, 100)
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('load', handleLoad)
    document.addEventListener('click', handleNavigationClick)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('click', handleNavigationClick)
    }
  }, [isTraditionalMode])

  // Show loading indicator during navigation
  if (isNavigating && isTraditionalMode) {
    return (
      <>
        {/* Loading bar */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, #7928ca, #ff0080, #04e09a, #e0d504)',
            zIndex: 9999,
            animation: 'loading-bar 0.5s ease-in-out'
          }}
        />
        
        {/* Page transition overlay */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(2px)',
            zIndex: 9998,
            animation: 'fade-in 0.2s ease-in-out'
          }}
        />
      </>
    )
  }

  return null
}

// Add the animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes loading-bar {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }
    
    @keyframes fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `
  document.head.appendChild(style)
} 
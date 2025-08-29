import { useEffect, useState } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

export default function TraditionalNavigationHandler() {
  const { isTraditionalMode } = useNavigationMode()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    if (!isTraditionalMode) return

    // Handle navigation clicks in traditional mode
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
      
      // Store current scroll position
      const scrollPosition = window.scrollY
      
      // Use traditional navigation but with a smooth transition
      setTimeout(() => {
        window.location.href = link.href
        
        // After navigation, try to restore scroll position
        setTimeout(() => {
          if (window.location.href === link.href) {
            window.scrollTo(0, scrollPosition)
          }
        }, 100)
      }, 50)
    }

    // Handle form submissions
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement
      if (form && form.action && form.action.startsWith(window.location.origin)) {
        setIsNavigating(true)
      }
    }

    // Add event listeners
    document.addEventListener('click', handleNavigationClick)
    document.addEventListener('submit', handleFormSubmit)

    return () => {
      document.removeEventListener('click', handleNavigationClick)
      document.removeEventListener('submit', handleFormSubmit)
    }
  }, [isTraditionalMode])

  // Show loading indicator during navigation
  if (isNavigating && isTraditionalMode) {
    return (
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
    )
  }

  return null
}

// Add the loading animation
const style = document.createElement('style')
style.textContent = `
  @keyframes loading-bar {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }
`
document.head.appendChild(style) 
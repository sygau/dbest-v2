import { useEffect, useState, useRef } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

export default function TraditionalLayoutManager() {
  const { isTraditionalNewMode } = useNavigationMode()
  const [isNavigating, setIsNavigating] = useState(false)
  const originalElements = useRef<{
    header?: HTMLElement
    sidebar?: HTMLElement
    sidebarNav?: HTMLElement
    sidebarNavItems?: HTMLElement
    scrollPosition?: number
    scrollHandler?: (e: Event) => void
  }>({})
  
  // Store scroll position before navigation
  const storeScrollPosition = () => {
    // Skip in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping scroll position storage in development mode')
      return
    }
    
    const sidebarNav = document.querySelector('.sidebar-nav') as HTMLElement
    if (sidebarNav) {
      const scrollTop = sidebarNav.scrollTop
      sessionStorage.setItem('sidebarScrollPosition', scrollTop.toString())
      console.log('Stored scroll position:', scrollTop)
    }
  }
  
  // Restore scroll position after navigation
  const restoreScrollPosition = () => {
    // Skip in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping scroll position restoration in development mode')
      return
    }
    
    const savedPosition = sessionStorage.getItem('sidebarScrollPosition')
    if (!savedPosition) return
    
    console.log('Attempting to restore scroll position:', savedPosition)
    
    // Try multiple approaches to restore scroll position
    const tryRestore = () => {
      const sidebarNav = document.querySelector('.sidebar-nav') as HTMLElement
      if (sidebarNav) {
        const targetPosition = parseInt(savedPosition)
        sidebarNav.scrollTop = targetPosition
        
        // Force scroll after a brief delay
        setTimeout(() => {
          sidebarNav.scrollTop = targetPosition
          console.log('Restored scroll position to:', sidebarNav.scrollTop)
        }, 10)
        
        // Try again after layout is stable
        setTimeout(() => {
          sidebarNav.scrollTop = targetPosition
        }, 100)
        
        // Final attempt after everything is loaded
        setTimeout(() => {
          sidebarNav.scrollTop = targetPosition
        }, 500)
      }
    }
    
    // Try immediately
    tryRestore()
    
    // Try after DOM is ready
    setTimeout(tryRestore, 50)
    
    // Try after page load
    setTimeout(tryRestore, 200)
    
    // Try after everything is stable
    setTimeout(tryRestore, 1000)
  }

  useEffect(() => {
    if (!isTraditionalNewMode) return

    // Preserve original elements in place
    const preserveLayout = () => {
      const header = document.querySelector('.top-header') as HTMLElement
      const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement
      const sidebarNav = document.querySelector('.sidebar-nav') as HTMLElement
      const sidebarNavItems = document.querySelector('.sidebar-nav .sidebar-menu') as HTMLElement
      
      if (header && sidebar && sidebarNav && sidebarNavItems) {
        // Store current scroll position
        const scrollPosition = sidebarNav.scrollTop
        
        // Get current positions
        const navRect = sidebarNavItems.getBoundingClientRect()
        
        // Store original elements
        originalElements.current = { 
          header, 
          sidebar, 
          sidebarNav, 
          sidebarNavItems, 
          scrollPosition 
        }
        
        // Make header fixed and bring to front
        header.style.cssText += `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 10000 !important;
          background: var(--bs-body-bg) !important;
          border-bottom: 1px solid var(--bs-border-color) !important;
        `
        
        // Make sidebar fixed and bring to front
        sidebar.style.cssText += `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 260px !important;
          height: 100vh !important;
          z-index: 9999 !important;
          background: var(--bs-body-bg) !important;
          border-right: 1px solid var(--bs-border-color) !important;
          overflow: hidden !important;
        `
        
        // Lock sidebar nav in place
        sidebarNav.style.cssText += `
          margin-top: 0 !important;
          height: 100vh !important;
          background-color: var(--bs-body-bg) !important;
          overflow-y: auto !important;
          transform: none !important;
          transition: none !important;
          position: relative !important;
          top: 0 !important;
          scroll-behavior: auto !important;
        `
        
        // Lock the navigation items in absolute position
        sidebarNavItems.style.cssText += `
          position: absolute !important;
          top: ${navRect.top}px !important;
          left: ${navRect.left}px !important;
          width: ${navRect.width}px !important;
          height: ${navRect.height}px !important;
          transform: none !important;
          transition: none !important;
          margin: 0 !important;
          padding: 10px !important;
        `
        
        // Force scroll position to stay the same
        sidebarNav.scrollTop = scrollPosition
        
        // Ensure sidebar header stays in place
        const sidebarHeader = sidebar.querySelector('.sidebar-header')
        if (sidebarHeader && sidebarHeader instanceof HTMLElement) {
          sidebarHeader.style.cssText += `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 260px !important;
            height: 70px !important;
            z-index: 10001 !important;
            background-color: var(--bs-body-bg) !important;
            border-right: 1px solid var(--bs-border-color) !important;
            transform: none !important;
            transition: none !important;
          `
        }
        
        // Prevent any scroll changes during navigation
        const preventScroll = (e: Event) => {
          e.preventDefault()
          sidebarNav.scrollTop = scrollPosition
        }
        
        sidebarNav.addEventListener('scroll', preventScroll, { passive: false })
        originalElements.current.scrollHandler = preventScroll
      }
    }

    // Restore original layout
    const restoreLayout = () => {
      const { header, sidebar, sidebarNav, sidebarNavItems, scrollHandler } = originalElements.current
      
      if (header) {
        header.style.position = ''
        header.style.top = ''
        header.style.left = ''
        header.style.right = ''
        header.style.zIndex = ''
        header.style.background = ''
        header.style.borderBottom = ''
      }
      
      if (sidebar) {
        sidebar.style.position = ''
        sidebar.style.top = ''
        sidebar.style.left = ''
        sidebar.style.width = ''
        sidebar.style.height = ''
        sidebar.style.zIndex = ''
        sidebar.style.background = ''
        sidebar.style.borderRight = ''
        sidebar.style.overflow = ''
      }
      
      if (sidebarNav) {
        sidebarNav.style.marginTop = ''
        sidebarNav.style.height = ''
        sidebarNav.style.backgroundColor = ''
        sidebarNav.style.overflowY = ''
        sidebarNav.style.transform = ''
        sidebarNav.style.transition = ''
        sidebarNav.style.position = ''
        sidebarNav.style.top = ''
        sidebarNav.style.scrollBehavior = ''
        
        // Remove scroll handler
        if (scrollHandler) {
          sidebarNav.removeEventListener('scroll', scrollHandler)
        }
      }
      
      if (sidebarNavItems) {
        sidebarNavItems.style.position = ''
        sidebarNavItems.style.top = ''
        sidebarNavItems.style.left = ''
        sidebarNavItems.style.width = ''
        sidebarNavItems.style.height = ''
        sidebarNavItems.style.transform = ''
        sidebarNavItems.style.transition = ''
        sidebarNavItems.style.margin = ''
        sidebarNavItems.style.padding = ''
      }
      
      // Restore sidebar header
      const sidebarHeader = document.querySelector('.sidebar-header')
      if (sidebarHeader && sidebarHeader instanceof HTMLElement) {
        sidebarHeader.style.position = ''
        sidebarHeader.style.top = ''
        sidebarHeader.style.left = ''
        sidebarHeader.style.width = ''
        sidebarHeader.style.height = ''
        sidebarHeader.style.zIndex = ''
        sidebarHeader.style.backgroundColor = ''
        sidebarHeader.style.borderRight = ''
        sidebarHeader.style.transform = ''
        sidebarHeader.style.transition = ''
      }
      
      originalElements.current = {}
    }

    // Handle navigation with layout preservation
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
      
      // Store scroll position before navigation
      storeScrollPosition()
      
      // Navigate immediately (skip complex layout preservation for now)
      window.location.href = link.href
    }

    // Handle page load
    const handleLoad = () => {
      setIsNavigating(false)
      // Restore scroll position
      restoreScrollPosition()
    }

    // Add event listeners
    document.addEventListener('click', handleNavigationClick)
    window.addEventListener('load', handleLoad)
    document.addEventListener('DOMContentLoaded', restoreScrollPosition)
    
    // Also try to restore on window focus (in case of back/forward navigation)
    window.addEventListener('focus', restoreScrollPosition)
    
    // Try restoration on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        restoreScrollPosition()
      }
    })

    return () => {
      document.removeEventListener('click', handleNavigationClick)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('DOMContentLoaded', restoreScrollPosition)
      window.removeEventListener('focus', restoreScrollPosition)
      document.removeEventListener('visibilitychange', restoreScrollPosition)
    }
  }, [isTraditionalNewMode])

  // Show loading indicator during navigation
  if (isNavigating && isTraditionalNewMode) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(to right, #7928ca, #ff0080, #04e09a, #e0d504)',
          zIndex: 10001,
          animation: 'loading-bar 0.5s ease-in-out'
        }}
      />
    )
  }

  return null
}

// Add the loading animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes loading-bar {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }
  `
  document.head.appendChild(style)
} 
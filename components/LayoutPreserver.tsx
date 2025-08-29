import { useEffect, useState, useRef } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

export default function LayoutPreserver() {
  const { isTraditionalMode } = useNavigationMode()
  const [isPreserving, setIsPreserving] = useState(false)
  const preservedElements = useRef<{
    header?: HTMLElement
    sidebar?: HTMLElement
    wrapper?: HTMLElement
  }>({})

  useEffect(() => {
    if (!isTraditionalMode) return

    // Function to preserve layout elements
    const preserveLayout = () => {
      const header = document.querySelector('.top-header') as HTMLElement
      const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement
      const wrapper = document.querySelector('.wrapper') as HTMLElement

      if (header && sidebar && wrapper) {
        // Clone and preserve the elements
        const headerClone = header.cloneNode(true) as HTMLElement
        const sidebarClone = sidebar.cloneNode(true) as HTMLElement
        const wrapperClone = wrapper.cloneNode(true) as HTMLElement

        // Store references
        preservedElements.current = {
          header: headerClone,
          sidebar: sidebarClone,
          wrapper: wrapperClone
        }

        // Add preserved elements to body
        document.body.appendChild(headerClone)
        document.body.appendChild(sidebarClone)
        document.body.appendChild(wrapperClone)

        // Hide original elements
        header.style.display = 'none'
        sidebar.style.display = 'none'
        wrapper.style.display = 'none'

        setIsPreserving(true)
      }
    }

    // Function to restore layout
    const restoreLayout = () => {
      if (preservedElements.current.header) {
        preservedElements.current.header.remove()
      }
      if (preservedElements.current.sidebar) {
        preservedElements.current.sidebar.remove()
      }
      if (preservedElements.current.wrapper) {
        preservedElements.current.wrapper.remove()
      }

      // Show original elements
      const header = document.querySelector('.top-header') as HTMLElement
      const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement
      const wrapper = document.querySelector('.wrapper') as HTMLElement

      if (header) header.style.display = ''
      if (sidebar) sidebar.style.display = ''
      if (wrapper) wrapper.style.display = ''

      setIsPreserving(false)
    }

    // Handle beforeunload to preserve layout
    const handleBeforeUnload = () => {
      preserveLayout()
    }

    // Handle page load to restore layout
    const handleLoad = () => {
      if (isPreserving) {
        restoreLayout()
      }
    }

    // Handle navigation clicks
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
      
      // Preserve layout before navigation
      preserveLayout()
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('load', handleLoad)
    document.addEventListener('click', handleNavigationClick)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('click', handleNavigationClick)
      
      // Clean up preserved elements
      if (isPreserving) {
        restoreLayout()
      }
    }
  }, [isTraditionalMode, isPreserving])

  // Add styles for preserved layout
  useEffect(() => {
    if (!isTraditionalMode) return

    const style = document.createElement('style')
    style.textContent = `
      .layout-preserved {
        position: fixed !important;
        z-index: 9999 !important;
        background: var(--bs-body-bg) !important;
      }
      
      .layout-preserved.top-header {
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 70px !important;
      }
      
      .layout-preserved.sidebar-wrapper {
        top: 70px !important;
        left: 0 !important;
        width: 260px !important;
        height: calc(100vh - 70px) !important;
      }
      
      .layout-preserved.wrapper {
        margin-top: 70px !important;
        margin-left: 260px !important;
        width: calc(100% - 260px) !important;
        height: calc(100vh - 70px) !important;
        overflow: hidden !important;
      }
      
      @media (max-width: 1199px) {
        .layout-preserved.sidebar-wrapper {
          transform: translateX(-100%) !important;
        }
        
        .layout-preserved.wrapper {
          margin-left: 0 !important;
          width: 100% !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isTraditionalMode])

  return null
} 
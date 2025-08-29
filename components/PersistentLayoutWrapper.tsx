import { ReactNode, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useNavigationMode } from '../hooks/useNavigationMode'

interface PersistentLayoutWrapperProps {
  children: ReactNode
  sidebar: ReactNode
  header: ReactNode
}

export default function PersistentLayoutWrapper({ 
  children, 
  sidebar, 
  header 
}: PersistentLayoutWrapperProps) {
  const router = useRouter()
  const { isTraditionalMode } = useNavigationMode()
  const [currentContent, setCurrentContent] = useState(children)
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    if (!isTraditionalMode) {
      // In SPA mode, just update content normally
      setCurrentContent(children)
      return
    }

    // In traditional mode, handle smart content loading
    const handleRouteChange = (url: string) => {
      if (url === currentPath) return
      
      setIsLoading(true)
      setCurrentPath(url)
      
      // Use fetch to get only the main content area
      fetch(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'text/html'
        }
      })
      .then(response => response.text())
      .then(html => {
        // Parse the HTML and extract only the main content
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        
        // Find the main content area in the new page
        const newMainContent = doc.querySelector('.main-content')
        
        if (newMainContent && contentRef.current) {
          // Smoothly transition the content
          contentRef.current.style.opacity = '0'
          
          setTimeout(() => {
            if (contentRef.current) {
              contentRef.current.innerHTML = newMainContent.innerHTML
              contentRef.current.style.opacity = '1'
              setIsLoading(false)
              
              // Update browser history without full page reload
              window.history.pushState({}, '', url)
              
              // Trigger any necessary re-initialization
              if (typeof window !== 'undefined' && window.initializePage) {
                window.initializePage()
              }
            }
          }, 150)
        } else {
          // Fallback to full page reload if content extraction fails
          window.location.href = url
        }
      })
      .catch(() => {
        // Fallback to full page reload on error
        window.location.href = url
      })
    }

    // Listen for navigation events
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        e.preventDefault()
        handleRouteChange(link.href)
      }
    }

    // Handle browser back/forward
    const handlePopState = () => {
      handleRouteChange(window.location.href)
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isTraditionalMode, currentPath])

  if (!isTraditionalMode) {
    // In SPA mode, render normally
    return (
      <>
        {header}
        <div className="wrapper">
          <aside className="sidebar-wrapper">
            {sidebar}
          </aside>
          <main className="main-wrapper">
            <div className="main-content">
              {children}
            </div>
          </main>
        </div>
      </>
    )
  }

  // In traditional mode, use persistent layout
  return (
    <>
      {/* Persistent Header */}
      <header className="top-header persistent-header">
        {header}
      </header>
      
      {/* Persistent Layout */}
      <div className="wrapper persistent-wrapper">
        {/* Persistent Sidebar */}
        <aside className="sidebar-wrapper persistent-sidebar">
          {sidebar}
        </aside>
        
        {/* Main Content Area */}
        <main className="main-wrapper">
          <div 
            ref={contentRef}
            className={`main-content ${isLoading ? 'loading' : ''}`}
            style={{ transition: 'opacity 0.15s ease-in-out' }}
          >
            {currentContent}
          </div>
        </main>
      </div>

      <style jsx>{`
        .persistent-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        
        .persistent-wrapper {
          margin-top: 70px; /* Header height */
        }
        
        .persistent-sidebar {
          position: fixed;
          top: 70px;
          left: 0;
          width: 260px;
          height: calc(100vh - 70px);
          z-index: 999;
        }
        
        .main-content.loading {
          opacity: 0.6;
        }
        
        @media (max-width: 1199px) {
          .persistent-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .persistent-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
} 
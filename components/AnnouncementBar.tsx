import React, { useState, useEffect } from 'react'
import { BiX } from 'react-icons/bi'

interface AnnouncementConfig {
  enabled: boolean
  content: string
  type: 'info' | 'warning' | 'success' | 'error'
  dismissible: boolean
  closable: boolean
  autoHide?: boolean
  autoHideDelay?: number
  showOnPages?: string[]
  hideOnPages?: string[]
}

interface AnnouncementBarProps {
  config: AnnouncementConfig
  onDismiss?: () => void
}

export default function AnnouncementBar({ config, onDismiss }: AnnouncementBarProps) {
  // Check dismissal status immediately to prevent flash
  const getInitialDismissedState = () => {
    if (typeof window !== 'undefined') {
      const dismissedKey = `dsebest_announcement_dismissed_${config.content.slice(0, 50)}`
      return localStorage.getItem(dismissedKey) === 'true'
    }
    return false
  }

  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(getInitialDismissedState)

  // Update dismissed state when content changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissedKey = `dsebest_announcement_dismissed_${config.content.slice(0, 50)}`
      const wasDismissed = localStorage.getItem(dismissedKey) === 'true'
      setIsDismissed(wasDismissed)
    }
  }, [config.content])

  useEffect(() => {
    if (!config.enabled || isDismissed) {
      setIsVisible(false)
      return
    }

    // Check if announcement should show on current page
    const currentPath = window.location.pathname
    const shouldShow = checkPageVisibility(currentPath)
    
    if (shouldShow) {
      setIsVisible(true)
      
      // Auto-hide functionality
      if (config.autoHide && config.autoHideDelay) {
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, config.autoHideDelay)
        
        return () => clearTimeout(timer)
      }
    }
  }, [config, isDismissed])

  // Update CSS custom property for announcement bar height
  useEffect(() => {
    if (isVisible) {
      const updateHeight = () => {
        const announcementBar = document.querySelector('.announcement-bar') as HTMLElement
        if (announcementBar) {
          const height = announcementBar.offsetHeight
          document.documentElement.style.setProperty('--announcement-bar-height', `${height}px`)
        }
      }
      
      // Update height after component mounts and on resize
      updateHeight()
      window.addEventListener('resize', updateHeight)
      
      return () => {
        window.removeEventListener('resize', updateHeight)
        document.documentElement.style.setProperty('--announcement-bar-height', '0px')
      }
    } else {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px')
    }
  }, [isVisible])

  const checkPageVisibility = (currentPath: string): boolean => {
    // First check if we should hide on this page
    if (config.hideOnPages && config.hideOnPages.length > 0) {
      const shouldHide = config.hideOnPages.some(page => 
        page === '*' || currentPath === page || currentPath.startsWith(page)
      )
      if (shouldHide) {
        return false
      }
    }
    
    // Then check if we should show on this page
    if (config.showOnPages && config.showOnPages.length > 0) {
      return config.showOnPages.some(page => 
        page === '*' || currentPath === page || currentPath.startsWith(page)
      )
    }
    
    // Default: show on all pages
    return true
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    
    // Save dismissal to localStorage
    if (typeof window !== 'undefined') {
      const dismissedKey = `dsebest_announcement_dismissed_${config.content.slice(0, 50)}`
      localStorage.setItem(dismissedKey, 'true')
    }
    
    onDismiss?.()
  }


  if (!isVisible || !config.enabled) {
    return null
  }

  const getTypeStyles = () => {
    switch (config.type) {
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #ff9800, #f57c00)',
          color: '#fff',
          borderColor: '#e65100'
        }
      case 'success':
        return {
          background: 'linear-gradient(135deg, #4caf50, #388e3c)',
          color: '#fff',
          borderColor: '#2e7d32'
        }
      case 'error':
        return {
          background: 'linear-gradient(135deg, #f44336, #d32f2f)',
          color: '#fff',
          borderColor: '#c62828'
        }
      default: // info
        return {
          background: 'linear-gradient(135deg, #2196f3, #1976d2)',
          color: '#fff',
          borderColor: '#1565c0'
        }
    }
  }

  const typeStyles = getTypeStyles()

  return (
    <div 
      className="announcement-bar"
      style={{
        background: typeStyles.background,
        color: typeStyles.color,
        borderBottom: `2px solid ${typeStyles.borderColor}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="container-fluid px-3">
        <div className="d-flex align-items-center justify-content-between py-2">
          <div className="d-flex align-items-center flex-grow-1">
            <div 
              className="announcement-content"
              style={{
                flex: 1
              }}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: config.content }}
                style={{
                  fontSize: '14px',
                  lineHeight: '1.4',
                  fontWeight: '500'
                }}
              />
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-2 ms-3">
            {/* Close button */}
            {config.closable && (
              <button
                onClick={handleDismiss}
                className="btn btn-sm p-1 border-0 bg-transparent text-white"
                style={{
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                aria-label="Close announcement"
              >
                <BiX size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .announcement-bar {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .announcement-content a {
          color: inherit !important;
          text-decoration: underline;
          font-weight: 600;
        }
        
        .announcement-content a:hover {
          opacity: 0.8;
        }
        
        .announcement-content strong {
          font-weight: 700;
        }
        
        .announcement-content em {
          font-style: italic;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .announcement-content {
            font-size: 13px !important;
          }
          
          .announcement-bar .container-fluid {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .announcement-content {
            font-size: 12px !important;
          }
          
          .announcement-bar .container-fluid {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
        }
        
        /* Theme support */
        [data-bs-theme="dark"] .announcement-bar {
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        [data-bs-theme="light"] .announcement-bar {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        [data-bs-theme="blue-theme"] .announcement-bar {
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        /* Mobile sidebar adjustments */
        @media (max-width: 1199px) {
          .announcement-bar {
            left: 0 !important;
            right: 0 !important;
          }
        }
        
        /* Ensure announcement bar is always on top */
        .announcement-bar {
          z-index: 10001 !important;
        }
      `}</style>
    </div>
  )
}

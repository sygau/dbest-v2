import { useState, useEffect } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

export default function NavigationTestMode() {
  const { isTraditionalNewMode } = useNavigationMode()
  const [isTestMode, setIsTestMode] = useState(false)
  const [testStep, setTestStep] = useState(0)

  useEffect(() => {
    // Enable test mode if traditional_new is active
    if (isTraditionalNewMode) {
      setIsTestMode(true)
    }
  }, [isTraditionalNewMode])

  const simulateNavigation = () => {
    setTestStep(prev => prev + 1)
    
    // Simulate the layout preservation effect
    const header = document.querySelector('.top-header')
    const sidebar = document.querySelector('.sidebar-wrapper')
    
    if (header && sidebar) {
      // Create test overlay
      const testOverlay = document.createElement('div')
      testOverlay.id = 'test-navigation-overlay'
      testOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.1);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      `
      
      // Clone layout elements
      const headerClone = header.cloneNode(true) as HTMLElement
      const sidebarClone = sidebar.cloneNode(true) as HTMLElement
      
      // Style clones
      headerClone.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        z-index: 10000;
        background: var(--bs-body-bg);
        border-bottom: 1px solid var(--bs-border-color);
        pointer-events: none;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        transform: none;
        transition: none;
        opacity: 1;
      `
      
      sidebarClone.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 260px;
        height: calc(100vh - 70px);
        z-index: 9999;
        background: var(--bs-body-bg);
        border-right: 1px solid var(--bs-border-color);
        pointer-events: none;
        overflow-y: auto;
        transform: none;
        transition: none;
        opacity: 1;
      `
      
      // Ensure sidebar header maintains its appearance
      const sidebarHeader = sidebarClone.querySelector('.sidebar-header')
      if (sidebarHeader && sidebarHeader instanceof HTMLElement) {
        sidebarHeader.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 260px;
          height: 70px;
          padding: 0 1rem;
          gap: 0.5rem;
          z-index: 1;
          position: fixed;
          top: 0;
          background-color: var(--bs-body-bg);
          transition: ease-out 0.3s;
          border-right: 1px solid var(--bs-border-color);
          opacity: 1;
          transform: none;
        `
        
        // Ensure logo and text maintain their appearance
        const logoIcon = sidebarHeader.querySelector('.logo-icon')
        const logoName = sidebarHeader.querySelector('.logo-name')
        
        if (logoIcon && logoIcon instanceof HTMLElement) {
          logoIcon.style.cssText = `
            opacity: 1;
            transform: none;
            transition: none;
          `
        }
        
        if (logoName && logoName instanceof HTMLElement) {
          logoName.style.cssText = `
            flex-grow: 1;
            opacity: 1;
            transform: none;
            transition: none;
          `
          
          // Ensure the h5 text maintains its appearance
          const logoText = logoName.querySelector('h5')
          if (logoText && logoText instanceof HTMLElement) {
            logoText.style.cssText = `
              font-size: 24px;
              text-transform: capitalize;
              font-weight: 600;
              margin: 0;
              opacity: 1;
              transform: none;
              transition: none;
              color: inherit;
            `
          }
        }
      }
      
      // Add to overlay
      testOverlay.appendChild(headerClone)
      testOverlay.appendChild(sidebarClone)
      document.body.appendChild(testOverlay)
      
      // Show overlay
      requestAnimationFrame(() => {
        testOverlay.style.opacity = '1'
      })
      
      // Remove after 2 seconds
      setTimeout(() => {
        testOverlay.style.opacity = '0'
        setTimeout(() => {
          if (testOverlay.parentNode) {
            testOverlay.parentNode.removeChild(testOverlay)
          }
        }, 300)
      }, 2000)
    }
  }

  if (!isTestMode) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 10000,
        fontFamily: 'monospace'
      }}
    >
      <div>🧪 Test Mode Active</div>
      <div>Mode: traditional_new</div>
      <div>Step: {testStep}</div>
      <button 
        onClick={simulateNavigation}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer',
          marginTop: '5px',
          fontSize: '11px'
        }}
      >
        Simulate Navigation
      </button>
      <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.8 }}>
        Click to see layout preservation
      </div>
    </div>
  )
} 
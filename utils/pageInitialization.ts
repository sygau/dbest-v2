// Global JavaScript functions that were previously loaded via script tags
// This file consolidates the page-specific initialization logic

declare global {
  interface Window {
    initPaperLinks?: () => void
    updateCountdown?: () => void
    countdownInterval?: NodeJS.Timeout
    blogPagination?: any
    lightbox?: any
  }
}

// Initialize paper links functionality
export const initPaperLinks = () => {
  if (typeof window === 'undefined') return

  // This function was originally defined in the HTML templates
  // You may need to implement the actual paper links logic here
  // or import it from the appropriate JavaScript file
  
  // For now, we'll assign it to window so other scripts can use it
  window.initPaperLinks = () => {
    console.log('Paper links initialized')
    // Add your paper links initialization logic here
  }
  
  // Call the function
  window.initPaperLinks()
}

// Initialize page-specific functionality based on pathname
export const initializePageFunctionality = (pathname: string) => {
  // Remove any existing event listeners to prevent duplicates
  cleanupPageListeners()

  // Initialize common functionality
  initPaperLinks()

  // Page-specific initialization
  switch (pathname) {
    case '/countdown':
      initializeCountdown()
      break
    case '/blog':
    case '/blog/':
      initializeBlog()
      break
    case '/chat':
      initializeChat()
      break
    default:
      // Default page initialization
      break
  }
}

// Countdown page specific initialization
const initializeCountdown = () => {
  // This will be handled by the countdown.js script loaded via usePageInitialization
  console.log('Countdown page initialized')
}

// Blog page specific initialization  
const initializeBlog = () => {
  // This will be handled by the blogIndex.js script loaded via usePageInitialization
  console.log('Blog page initialized')
}

// Chat page specific initialization
const initializeChat = () => {
  console.log('Chat page initialized')
  // Add chat-specific initialization here
}

// Cleanup function to remove event listeners
const cleanupPageListeners = () => {
  // Clear any existing intervals
  if (window.countdownInterval) {
    clearInterval(window.countdownInterval)
  }

  // Clean up blog pagination listeners
  if (window.blogPagination) {
    document.querySelectorAll('.pagination a').forEach(link => {
      const newLink = link.cloneNode(true)
      link.parentNode?.replaceChild(newLink, link)
    })
  }

  // Add other cleanup logic as needed
}

export { cleanupPageListeners }

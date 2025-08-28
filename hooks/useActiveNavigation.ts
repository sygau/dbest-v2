import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * React hook to handle active navigation state
 * Replaces jQuery navigation highlighting functionality from main.js
 */
export const useActiveNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to update active navigation items
    const updateActiveNavigation = () => {
      try {
        const currentPath = window.location.pathname;
        
        // Remove active class from all navigation items
        const navItems = document.querySelectorAll('.sidebar-nav li');
        navItems.forEach(item => {
          item.classList.remove('mm-active');
        });
        
        // Add active class to current navigation item
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
          if (link instanceof HTMLAnchorElement) {
            if (link.pathname === currentPath || link.getAttribute('href') === currentPath) {
              const parentLi = link.closest('li');
              if (parentLi) {
                parentLi.classList.add('mm-active');
              }
            }
          }
        });
      } catch (error) {
        console.error('Error updating navigation:', error);
      }
    };

    // Initialize navigation
    const initializeNavigation = () => {
      // Update active state on initial load
      updateActiveNavigation();
      
      // Listen for route changes with Next.js router
      router.events.on('routeChangeComplete', updateActiveNavigation);
      
      // Fallback for non-Next.js navigation
      let lastUrl = window.location.href;
      
      // Create a MutationObserver to detect DOM changes that might indicate navigation
      const urlChangeObserver = new MutationObserver(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== lastUrl) {
          lastUrl = currentUrl;
          setTimeout(updateActiveNavigation, 50);
        }
      });
      
      // Start observing the body for changes
      setTimeout(() => {
        if (document.body) {
          urlChangeObserver.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }, 100);
      
      // Listen for popstate events (browser back/forward)
      window.addEventListener('popstate', () => {
        setTimeout(updateActiveNavigation, 50);
      });
      
      // Periodically check for URL changes
      const intervalId = setInterval(() => {
        if (window.location.href !== lastUrl) {
          lastUrl = window.location.href;
          updateActiveNavigation();
        }
      }, 1000);
      
      // Cleanup function
      return () => {
        router.events.off('routeChangeComplete', updateActiveNavigation);
        urlChangeObserver.disconnect();
        window.removeEventListener('popstate', updateActiveNavigation);
        clearInterval(intervalId);
      };
    };
    
    // Start navigation initialization
    return initializeNavigation();
  }, [router]);

  return {
    // No methods needed to be exposed as everything is handled internally
  };
};

export default useActiveNavigation; 
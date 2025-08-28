import { useEffect } from 'react';

/**
 * React hook to handle scrollbar behavior
 * Replaces jQuery scrollbar functionality from main.js
 */
export const useScrollBehavior = () => {
  /**
   * Function to hide sidebar scrollbars
   */
  const hideSidebarScrollbars = () => {
    const sidebarRails = document.querySelectorAll('.sidebar-wrapper .ps__rail-y, .sidebar-wrapper .ps__rail-x');
    sidebarRails.forEach(rail => {
      if (rail instanceof HTMLElement) {
        rail.style.display = 'none';
        rail.style.opacity = '0';
        rail.style.width = '0';
      }
    });
  };

  /**
   * Function to hide all scrollbars throughout the app
   */
  const hideAllScrollbars = () => {
    // Hide Perfect Scrollbar rails
    const allRails = document.querySelectorAll('.ps__rail-x, .ps__rail-y, .ps__thumb-x, .ps__thumb-y');
    allRails.forEach(rail => {
      if (rail instanceof HTMLElement) {
        rail.style.display = 'none';
        rail.style.opacity = '0';
        rail.style.width = '0';
        rail.style.height = '0';
      }
    });
    
    // Apply no-scrollbar style to important elements
    if (document.documentElement) {
      document.documentElement.style.scrollbarWidth = 'none';
      // Use type assertion for non-standard property
      (document.documentElement.style as any).msOverflowStyle = 'none';
    }
    
    if (document.body) {
      document.body.style.scrollbarWidth = 'none';
      // Use type assertion for non-standard property
      (document.body.style as any).msOverflowStyle = 'none';
    }
    
    // Apply style to main content elements
    const mainElements = document.querySelectorAll('.main-wrapper, .main-content');
    mainElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.scrollbarWidth = 'none';
        // Use type assertion for non-standard property
        (el.style as any).msOverflowStyle = 'none';
      }
    });
  };

  // Initialize scrollbar behavior when component mounts
  useEffect(() => {
    // Ensure sidebar is scrollable but without visible scrollbars
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');
    if (sidebarWrapper instanceof HTMLElement) {
      sidebarWrapper.style.overflowY = 'auto';
      sidebarWrapper.style.scrollbarWidth = 'none';
      // Use type assertion for non-standard property
      (sidebarWrapper.style as any).msOverflowStyle = 'none';
    }
    
    // Hide scrollbars
    hideSidebarScrollbars();
    hideAllScrollbars();
    
    // Additional event listeners
    const handleResize = () => {
      hideAllScrollbars();
      // Re-check sidebar scrollability
      if (sidebarWrapper instanceof HTMLElement) {
        sidebarWrapper.style.overflowY = 'auto';
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Hide Pace spinner after loading
    setTimeout(() => {
      if (typeof window !== 'undefined' && 'Pace' in window) {
        // @ts-ignore - Pace is added via script tag and not typed
        window.Pace?.stop();
      }
      hideAllScrollbars();
      // Ensure sidebar remains scrollable
      if (sidebarWrapper instanceof HTMLElement) {
        sidebarWrapper.style.overflowY = 'auto';
      }
    }, 180);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    hideSidebarScrollbars,
    hideAllScrollbars
  };
};

export default useScrollBehavior; 
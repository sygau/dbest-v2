import { useEffect, useState } from 'react';

/**
 * React hook to handle sticky header functionality
 * Replaces jQuery sticky header functionality from main.js
 */
export const useStickyHeader = (scrollThreshold = 60) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop > scrollThreshold) {
        setIsSticky(true);
        
        // Apply sticky class directly to header for immediate effect
        const header = document.querySelector('.top-header .navbar');
        if (header) {
          header.classList.add('sticky-header');
        }
      } else {
        setIsSticky(false);
        
        // Remove sticky class directly from header for immediate effect
        const header = document.querySelector('.top-header .navbar');
        if (header) {
          header.classList.remove('sticky-header');
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  return {
    isSticky
  };
};

export default useStickyHeader; 
import { useEffect, useState } from 'react';

/**
 * React hook to handle sidebar navigation toggle functionality
 * Replaces jQuery toggle functionality from main.js
 */
export const useNavigationToggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsToggled(prev => !prev);
  };

  // Close sidebar
  const closeSidebar = () => {
    setIsToggled(false);
  };

  // Handle sidebar hover
  const handleSidebarMouseEnter = () => {
    if (isToggled) {
      setIsSidebarHovered(true);
    }
  };

  // Handle sidebar mouse leave
  const handleSidebarMouseLeave = () => {
    if (isToggled) {
      setIsSidebarHovered(false);
    }
  };

  // Create and manage overlay element
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof document === 'undefined') return;
    
    // Create or find overlay element
    let overlay = document.querySelector('.sidebar-overlay') as HTMLElement;
    
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'overlay sidebar-overlay';
      document.body.appendChild(overlay);
    }
    
    // Handle overlay click to close sidebar
    const handleOverlayClick = () => {
      closeSidebar();
    };
    
    overlay.addEventListener('click', handleOverlayClick);
    
    // Cleanup function
    return () => {
      overlay.removeEventListener('click', handleOverlayClick);
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    };
  }, []);

  // Apply classes to body based on state
  useEffect(() => {
    const body = document.body;
    
    if (isToggled) {
      body.classList.add('toggled');
    } else {
      body.classList.remove('toggled');
      setIsSidebarHovered(false);
    }
    
    if (isSidebarHovered) {
      body.classList.add('sidebar-hovered');
    } else {
      body.classList.remove('sidebar-hovered');
    }
    
    // Cleanup function
    return () => {
      body.classList.remove('toggled', 'sidebar-hovered');
    };
  }, [isToggled, isSidebarHovered]);

  return {
    isToggled,
    isSidebarHovered,
    toggleSidebar,
    closeSidebar,
    handleSidebarMouseEnter,
    handleSidebarMouseLeave
  };
};

export default useNavigationToggle; 
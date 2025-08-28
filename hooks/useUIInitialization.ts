import { useEffect } from 'react';
import useThemeSwitcher from './useThemeSwitcher';
import useNavigationToggle from './useNavigationToggle';
import useSearchControl from './useSearchControl';
import useScrollBehavior from './useScrollBehavior';
import useBackToTop from './useBackToTop';
import useActiveNavigation from './useActiveNavigation';
import useStickyHeader from './useStickyHeader';

/**
 * Combined React hook to initialize all UI functionality
 * Replaces jQuery-based functionality from main.js
 */
export const useUIInitialization = () => {
  // Initialize all individual hooks
  const themeSwitcher = useThemeSwitcher();
  const navigationToggle = useNavigationToggle();
  const searchControl = useSearchControl();
  const scrollBehavior = useScrollBehavior();
  const backToTop = useBackToTop();
  useActiveNavigation(); // This hook doesn't expose any methods
  const stickyHeader = useStickyHeader();

  // Run any additional initialization that doesn't fit into the individual hooks
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Any additional initialization can go here

    // Cleanup function
    return () => {
      // Any cleanup code that doesn't fit into the individual hooks
    };
  }, []);

  // Return all the hooks' exposed methods for use in components
  return {
    // Theme switching
    currentTheme: themeSwitcher.currentTheme,
    handleBlueTheme: themeSwitcher.handleBlueTheme,
    handleLightTheme: themeSwitcher.handleLightTheme,
    handleDarkTheme: themeSwitcher.handleDarkTheme,
    handleSemiDarkTheme: themeSwitcher.handleSemiDarkTheme,
    toggleDarkMode: themeSwitcher.toggleDarkMode,
    switchTheme: themeSwitcher.switchTheme,
    
    // Navigation toggle
    isToggled: navigationToggle.isToggled,
    isSidebarHovered: navigationToggle.isSidebarHovered,
    toggleSidebar: navigationToggle.toggleSidebar,
    closeSidebar: navigationToggle.closeSidebar,
    handleSidebarMouseEnter: navigationToggle.handleSidebarMouseEnter,
    handleSidebarMouseLeave: navigationToggle.handleSidebarMouseLeave,
    
    // Search control
    isSearchVisible: searchControl.isSearchVisible,
    openSearch: searchControl.openSearch,
    closeSearch: searchControl.closeSearch,
    handleMobileSearchClick: searchControl.handleMobileSearchClick,
    handleMobileSearchClose: searchControl.handleMobileSearchClose,
    
    // Scroll behavior
    hideSidebarScrollbars: scrollBehavior.hideSidebarScrollbars,
    hideAllScrollbars: scrollBehavior.hideAllScrollbars,
    
    // Back to top
    isBackToTopVisible: backToTop.isVisible,
    scrollToTop: backToTop.scrollToTop,
    handleBackToTopKeyDown: backToTop.handleKeyDown,
    
    // Sticky header
    isHeaderSticky: stickyHeader.isSticky
  };
};

export default useUIInitialization; 
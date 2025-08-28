import { useState } from 'react';

/**
 * React hook to handle search control functionality
 * Replaces jQuery search functionality from main.js
 */
export const useSearchControl = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Open search popup
  const openSearch = () => {
    setIsSearchVisible(true);
  };

  // Close search popup
  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  // Handle mobile search button click
  const handleMobileSearchClick = () => {
    openSearch();
  };

  // Handle mobile search close button click
  const handleMobileSearchClose = () => {
    closeSearch();
  };

  return {
    isSearchVisible,
    openSearch,
    closeSearch,
    handleMobileSearchClick,
    handleMobileSearchClose
  };
};

export default useSearchControl; 
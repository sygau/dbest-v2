import { useEffect, useState } from 'react';

/**
 * React hook to handle theme switching functionality
 * Replaces jQuery theme switching from main.js
 */
export const useThemeSwitcher = () => {
  // Initialize with the current theme from the document or default to 'blue-theme'
  const [theme, setTheme] = useState<string>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-bs-theme') || 'blue-theme';
    }
    return 'blue-theme';
  });

  useEffect(() => {
    // Load saved theme from localStorage on initial render
    try {
      const savedTheme = localStorage.getItem('selectedTheme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        setTheme(savedTheme);
      } else {
        // Set default theme if none is saved
        document.documentElement.setAttribute('data-bs-theme', 'blue-theme');
        setTheme('blue-theme');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Function to switch theme
  const switchTheme = (newTheme: string) => {
    try {
      console.log(`Switching theme to: ${newTheme}`);
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('selectedTheme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error switching theme:', error);
    }
  };

  // Theme switching handlers
  const handleBlueTheme = () => {
    console.log('Blue theme clicked');
    switchTheme('blue-theme');
  };
  const handleLightTheme = () => {
    console.log('Light theme clicked');
    switchTheme('light');
  };
  const handleDarkTheme = () => {
    console.log('Dark theme clicked');
    switchTheme('dark');
  };
  const handleSemiDarkTheme = () => {
    console.log('Semi-dark theme clicked');
    switchTheme('semi-dark');
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    console.log('Toggle dark mode clicked');
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    switchTheme(newTheme);
  };

  return {
    currentTheme: theme,
    handleBlueTheme,
    handleLightTheme,
    handleDarkTheme,
    handleSemiDarkTheme,
    toggleDarkMode,
    switchTheme
  };
};

export default useThemeSwitcher; 
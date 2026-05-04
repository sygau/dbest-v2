import { useEffect, useState } from 'react';

import {
  applyThemeToDocument,
  getInitialThemePreference,
  normalizeThemePreference,
  persistTheme,
} from '@/utils/theme';

export const useThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>(() => {
    return getInitialThemePreference();
  });

  useEffect(() => {
    try {
      const initialTheme = getInitialThemePreference();
      applyThemeToDocument(initialTheme);
      setTheme(initialTheme);
    } catch {
      setTheme('light');
    }
  }, []);

  const switchTheme = (newTheme: string) => {
    try {
      const normalizedTheme = normalizeThemePreference(newTheme);
      applyThemeToDocument(normalizedTheme);
      persistTheme(normalizedTheme);
      setTheme(normalizedTheme);
    } catch {}
  };

  const handleBlueTheme = () => switchTheme('blue-theme');
  const handleLightTheme = () => switchTheme('light');
  const handleDarkTheme = () => switchTheme('dark');

  const toggleDarkMode = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    switchTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    currentTheme: theme,
    handleBlueTheme,
    handleLightTheme,
    handleDarkTheme,
    toggleDarkMode,
    switchTheme
  };
};

export default useThemeSwitcher; 

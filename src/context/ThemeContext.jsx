import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = 'portfolio-theme-preference';

const readStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === null ? true : JSON.parse(storedTheme);
  } catch {
    return true;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(readStoredTheme);

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((currentTheme) => !currentTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  theme: 'system',
  setTheme: () => null
};

const ThemeProviderContext = createContext(initialState);

export default function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'petrox-ui-theme',
  ...props
}) {
  const [theme, setThemeState] = useState(() => {
    // Try to read from localStorage first, fallback to defaultTheme
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) return stored;
    }
    return defaultTheme;
  });

  // Apply theme on mount and whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Always remove both classes first
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // Get the system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      
      root.classList.add(systemTheme);

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e) => {
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };

      // Use addEventListener for better browser compatibility
      mediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    } else {
      // Apply explicit light or dark theme
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      // Update localStorage immediately
      localStorage.setItem(storageKey, newTheme);
      // Update state to trigger useEffect
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

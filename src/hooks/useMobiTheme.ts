import { useState, useEffect, useCallback } from 'react';

/** Available theme modes. `system` follows the OS preference. */
export type MobiTheme = 'light' | 'dark' | 'system';

/**
 * Manages theme state with localStorage persistence and system preference detection.
 * Applies the `.dark` class to `<html>` automatically. Listens for OS preference changes
 * when mode is `system`. Syncs state across all hook instances via a custom event.
 *
 * @returns `{ theme, setTheme }` — current theme and setter function.
 *
 * @example
 * ```tsx
 * const { theme, setTheme } = useMobiTheme();
 * setTheme('dark');
 * ```
 */
export const useMobiTheme = () => {
  const [theme, setThemeState] = useState<MobiTheme>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem('mobi-theme') as MobiTheme;
    return stored || 'system';
  });

  // Stable setter — wrapped in useCallback so it's safe to pass as a prop/dep
  const updateTheme = useCallback((newTheme: MobiTheme) => {
    setThemeState(newTheme);
    window.dispatchEvent(new CustomEvent<MobiTheme>('mobi-theme-change', { detail: newTheme }));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (t: MobiTheme) => {
      if (t === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', isDark);
      } else {
        root.classList.toggle('dark', t === 'dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('mobi-theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Sync state across all hook instances via custom event
  useEffect(() => {
    const handleGlobalChange = (e: Event) => {
      const newTheme = (e as CustomEvent<MobiTheme>).detail;
      if (newTheme !== theme) setThemeState(newTheme);
    };
    window.addEventListener('mobi-theme-change', handleGlobalChange);
    return () => window.removeEventListener('mobi-theme-change', handleGlobalChange);
  }, [theme]);

  return { theme, setTheme: updateTheme };
};

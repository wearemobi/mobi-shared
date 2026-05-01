import React from 'react';
import { useMobiTheme } from '../hooks/useMobiTheme';

interface MobiLogoHeroProps {
  /** Size in pixels or tailwind units. Default is 128 (h-32). */
  size?: number | string;
  /** Extra classes for the img tag. */
  className?: string;
}

/**
 * A theme-aware logo component that automatically switches between 
 * light and dark variants, resolving 'system' preferences in real-time.
 * 
 * @example
 * ```tsx
 * <MobiLogoHero size={160} className="mt-4" />
 * ```
 */
export const MobiLogoHero: React.FC<MobiLogoHeroProps> = ({ size = 128, className = '' }) => {
  const { theme } = useMobiTheme();
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const resolve = () => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(isDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme as 'light' | 'dark');
      }
    };
    
    resolve();
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', resolve);
      return () => mediaQuery.removeEventListener('change', resolve);
    }
  }, [theme]);

  const logoUrl = resolvedTheme === 'dark' 
    ? 'https://wearemobi.com/logo-dark.svg' 
    : 'https://wearemobi.com/logo-light.svg';

  return (
    <img 
      src={logoUrl} 
      alt="MOBI Logo" 
      style={{ height: typeof size === 'number' ? `${size}px` : size }}
      className={`w-auto mx-auto mb-8 animate-in fade-in zoom-in duration-700 ${className}`} 
    />
  );
};

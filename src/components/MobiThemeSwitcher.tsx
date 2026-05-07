import React from 'react';
import { useMobiTheme } from '../hooks/useMobiTheme';
import { MobiSwitcher } from './MobiSwitcher';

/** Props for the MobiThemeSwitcher component. */
export interface MobiThemeSwitcherProps {
  /** 
   * Selected theme. 
   * If omitted, the component binds automatically to the global useMobiTheme hook.
   */
  theme?: 'light' | 'dark' | 'system';
  /** Callback triggered when the theme is changed. */
  onChange?: (theme: 'light' | 'dark' | 'system') => void;
  /** Custom CSS classes. */
  className?: string;
}

/**
 * Reusable, theme-aware switcher component to toggle between
 * Light, System (Auto), and Dark appearance modes.
 */
export const MobiThemeSwitcher: React.FC<MobiThemeSwitcherProps> = ({
  theme: externalTheme,
  onChange,
  className = ''
}) => {
  const { theme: internalTheme, setTheme: setInternalTheme } = useMobiTheme();

  const activeTheme = externalTheme ?? internalTheme;

  const handleChange = (id: string) => {
    const nextTheme = id as 'light' | 'dark' | 'system';
    if (!externalTheme) {
      setInternalTheme(nextTheme);
    }
    onChange?.(nextTheme);
  };

  return (
    <MobiSwitcher
      hideLabel
      className={className}
      options={[
        {
          id: 'light',
          label: 'Light',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="5" strokeWidth={2} />
              <path strokeWidth={2} strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )
        },
        {
          id: 'system',
          label: 'Auto',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )
        },
        {
          id: 'dark',
          label: 'Dark',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )
        }
      ]}
      activeId={activeTheme}
      onChange={handleChange}
    />
  );
};

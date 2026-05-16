import { useMobiTheme } from '../hooks/useMobiTheme';
import { MobiSwitcher } from './MobiSwitcher';
import { MobiIcon } from './MobiIcon';

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
          icon: <MobiIcon name="sun" size={16} />
        },
        {
          id: 'system',
          label: 'Auto',
          icon: <MobiIcon name="monitor" size={16} />
        },
        {
          id: 'dark',
          label: 'Dark',
          icon: <MobiIcon name="moon" size={16} />
        }
      ]}
      activeId={activeTheme}
      onChange={handleChange}
    />
  );
};

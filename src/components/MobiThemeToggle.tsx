import React from 'react';
import { cn } from '@wearemobi/ui';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useMobiTheme } from '../providers/MobiThemeProvider';

export interface MobiThemeToggleProps {
  variant?: 'icon' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ICON_SIZES = { sm: 12, md: 15, lg: 18 };
const BUTTON_SIZES = { sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-10 w-10' };
const SEG_TEXT = { sm: 'text-[10px] px-2 py-1', md: 'text-[11px] px-2.5 py-1.5', lg: 'text-xs px-3 py-2' };
const SEG_ICON = { sm: 11, md: 13, lg: 15 };

export const MobiThemeToggle: React.FC<MobiThemeToggleProps> = ({
  variant = 'icon',
  size = 'md',
  className,
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useMobiTheme();

  if (variant === 'segmented') {
    const options: { value: 'light' | 'system' | 'dark'; icon: React.ReactNode; label: string }[] = [
      { value: 'light', icon: <Sun size={SEG_ICON[size]} strokeWidth={2} />, label: 'Light' },
      { value: 'system', icon: <Monitor size={SEG_ICON[size]} strokeWidth={2} />, label: 'System' },
      { value: 'dark', icon: <Moon size={SEG_ICON[size]} strokeWidth={2} />, label: 'Dark' },
    ];

    return (
      <div
        className={cn(
          'flex items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5',
          className
        )}
        role="radiogroup"
        aria-label="Color theme"
      >
        {options.map((opt) => {
          const active = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={opt.label}
              onClick={() => setTheme(opt.value)}
              className={cn(
                'flex items-center gap-1 rounded-md font-semibold transition-all duration-150 cursor-pointer',
                SEG_TEXT[size],
                active
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative flex items-center justify-center rounded-md',
        'border border-border bg-background text-foreground',
        'hover:bg-muted transition-colors duration-150 cursor-pointer',
        BUTTON_SIZES[size],
        className
      )}
    >
      <Sun
        size={ICON_SIZES[size]}
        strokeWidth={2}
        className={cn(
          'absolute transition-all duration-300',
          resolvedTheme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        )}
      />
      <Moon
        size={ICON_SIZES[size]}
        strokeWidth={2}
        className={cn(
          'absolute transition-all duration-300',
          resolvedTheme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        )}
      />
    </button>
  );
};

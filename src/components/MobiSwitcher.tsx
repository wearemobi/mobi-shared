import React from 'react';

/** A single option in a MobiSwitcher group. */
export interface MobiSwitcherOption {
  /** Unique identifier for this option. */
  id: string;
  /** Text label — hidden when `hideLabel` is true on the parent. */
  label: string;
  /** Optional icon (React node) rendered before the label. */
  icon?: React.ReactNode;
  /** Custom CSS classes to apply to the option when active. */
  activeClassName?: string;
}

/** Props for the MobiSwitcher component. */
export interface MobiSwitcherProps {
  /** Array of selectable options. */
  options: MobiSwitcherOption[];
  /** `id` of the currently active option. */
  activeId: string;
  /** Called with the `id` of the newly selected option. */
  onChange: (id: string) => void;
  /** When true, only icons are rendered (labels hidden). Adjusts padding automatically. @default false */
  hideLabel?: boolean;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Compact segmented selector. Used for theme, language, and other configuration toggles.
 * Supports icon-only mode via `hideLabel` for minimal footprint.
 * Accessible via `role="group"` and `aria-pressed` on each button.
 *
 * @example
 * ```tsx
 * <MobiSwitcher
 *   options={[
 *     { id: 'ES', label: 'ES', icon: '🇸🇻' },
 *     { id: 'EN', label: 'EN', icon: '🇺🇸' }
 *   ]}
 *   activeId="ES"
 *   onChange={setLang}
 * />
 * ```
 */
export const MobiSwitcher: React.FC<MobiSwitcherProps> = ({
  options,
  activeId,
  onChange,
  hideLabel = false,
  className = ''
}) => {
  return (
    <div
      role="group"
      className={`flex items-center gap-1 rounded-lg border border-mobi-border bg-mobi-bg/50 p-1 ${className}`}
    >
      {options.map((option) => {
        const isActive = option.id === activeId;

        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            aria-label={option.label}
            className={`flex items-center gap-1.5 rounded-md transition-all text-[9px] font-black uppercase tracking-widest font-sans active:scale-95 ${
              hideLabel ? 'p-2' : 'px-2.5 py-1.5'
            } ${
              isActive
                ? (option.activeClassName || 'bg-mobi-surface shadow-sm text-mobi-text')
                : 'text-mobi-text-muted/50 hover:text-mobi-text-muted hover:bg-mobi-surface/20'
            }`}
          >
            {option.icon && <span className="flex-shrink-0 opacity-80" aria-hidden="true">{option.icon}</span>}
            {!hideLabel && <span>{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

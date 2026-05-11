import React from 'react';

export interface MobiTab {
  /** Unique tab identifier. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** If true, the tab is not selectable. @default false */
  disabled?: boolean;
  /** Optional badge count or label rendered after the tab label. */
  badge?: string | number;
}

export type MobiTabsVariant = 'default' | 'pills' | 'underline';

export interface MobiTabsProps {
  /** Array of tab definitions. */
  tabs: MobiTab[];
  /** ID of the currently active tab. */
  activeId: string;
  /** Called with the ID of the newly selected tab. */
  onChange: (id: string) => void;
  /**
   * Visual style variant.
   * - `default` — bordered segmented control.
   * - `pills` — rounded pill buttons.
   * - `underline` — bottom-border indicator, minimal style.
   * @default 'default'
   */
  variant?: MobiTabsVariant;
  /** Additional class names for the tab bar container. */
  className?: string;
  /** `aria-label` for the `<nav>` element. @default 'Tabs' */
  'aria-label'?: string;
}

/**
 * M.O.B.I.™ Tab Bar.
 * Data-driven tab navigation. Manage panel content yourself by rendering
 * conditionally on `activeId` — this keeps the component stateless and flexible.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('overview');
 *
 * <MobiTabs
 *   tabs={[
 *     { id: 'overview', label: 'Overview' },
 *     { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
 *     { id: 'logs', label: 'Logs', badge: 12 },
 *   ]}
 *   activeId={activeTab}
 *   onChange={setActiveTab}
 *   variant="underline"
 * />
 *
 * {activeTab === 'overview' && <OverviewPanel />}
 * {activeTab === 'settings' && <SettingsPanel />}
 * {activeTab === 'logs' && <LogsPanel />}
 * ```
 */
export const MobiTabs: React.FC<MobiTabsProps> = ({
  tabs,
  activeId,
  onChange,
  variant = 'default',
  className = '',
  'aria-label': ariaLabel = 'Tabs',
}) => {
  const containerClass = {
    default: 'flex gap-1 p-1 bg-mobi-bg/50 border border-mobi-border rounded-xl overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    pills: 'flex gap-2 overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    underline: 'flex gap-0 border-b border-mobi-border overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  }[variant];

  const getTabClass = (tab: MobiTab): string => {
    const isActive = tab.id === activeId;
    const isDisabled = tab.disabled;

    const base = 'relative flex items-center gap-2 transition-all font-sans font-bold text-xs uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-mobi-primary/50 shrink-0';

    if (isDisabled) return `${base} opacity-40 cursor-not-allowed`;

    if (variant === 'default') {
      return `${base} px-4 py-1.5 rounded-lg ${
        isActive
          ? 'bg-mobi-surface shadow-sm text-mobi-text'
          : 'text-mobi-text-muted/60 hover:text-mobi-text-muted hover:bg-mobi-surface/30'
      }`;
    }

    if (variant === 'pills') {
      return `${base} px-4 py-2 rounded-full ${
        isActive
          ? 'bg-mobi-primary text-mobi-bg shadow'
          : 'text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface/50'
      }`;
    }

    // underline
    return `${base} px-4 py-3 -mb-px border-b-2 rounded-none ${
      isActive
        ? 'border-mobi-primary text-mobi-text'
        : 'border-transparent text-mobi-text-muted hover:text-mobi-text hover:border-mobi-border'
    }`;
  };

  return (
    <nav
      role="tablist"
      aria-label={ariaLabel}
      className={`${containerClass} ${className}`}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={tab.id === activeId}
          aria-controls={`panel-${tab.id}`}
          aria-disabled={tab.disabled}
          tabIndex={tab.disabled ? -1 : tab.id === activeId ? 0 : -1}
          onClick={() => !tab.disabled && onChange(tab.id)}
          onKeyDown={(e) => {
            const tabIds = tabs.filter(t => !t.disabled).map(t => t.id);
            const currentIdx = tabIds.indexOf(activeId);
            if (e.key === 'ArrowRight') {
              const next = tabIds[(currentIdx + 1) % tabIds.length];
              onChange(next);
            } else if (e.key === 'ArrowLeft') {
              const prev = tabIds[(currentIdx - 1 + tabIds.length) % tabIds.length];
              onChange(prev);
            }
          }}
          className={getTabClass(tab)}
        >
          {tab.icon && (
            <span className="shrink-0" aria-hidden="true">{tab.icon}</span>
          )}
          <span>{tab.label}</span>
          {tab.badge !== undefined && (
            <span
              className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-mobi-primary/15 text-mobi-primary text-[9px] font-black"
              aria-label={`${tab.badge} items`}
            >
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

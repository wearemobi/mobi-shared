import React from 'react';

export interface MobiListViewItemData {
  id: string | number;
  headline: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface MobiListViewProps {
  /**
   * List item objects following standard layout specifications
   */
  items: MobiListViewItemData[];
  /**
   * Layout display mode
   * - 'cards': separate rounded card containers with subtle borders
   * - 'list': a single unified list separated with divider lines
   * - 'flat': clean list with only separators, no container borders or background
   * @default 'list'
   */
  variant?: 'list' | 'cards' | 'flat';
  /**
   * Set custom list height limits and enable scroll container
   */
  maxHeight?: string | number;
  /**
   * Custom CSS classes for the container
   */
  className?: string;
}

export const MobiListView: React.FC<MobiListViewProps> = ({
  items,
  variant = 'list',
  maxHeight,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = maxHeight
    ? { maxHeight, overflowY: 'auto' }
    : {};

  let baseContainerClasses = 'space-y-3';
  if (variant === 'list') {
    baseContainerClasses = 'divide-y divide-mobi-border/30 rounded-2xl border border-mobi-border bg-mobi-surface/40 overflow-hidden';
  } else if (variant === 'flat') {
    baseContainerClasses = 'divide-y divide-mobi-border/30';
  }

  return (
    <div 
      className={`${baseContainerClasses} ${className}`} 
      style={containerStyle}
    >
      {items.map((item) => {
        const itemClasses = [
          'flex items-center gap-4 p-4 text-mobi-text transition-all duration-200 outline-none select-none font-sans',
          // Interactive states
          item.onClick && !item.disabled ? 'cursor-pointer hover:bg-mobi-surface-hover/80 active:scale-[0.99]' : '',
          // Disabled states
          item.disabled ? 'opacity-40 cursor-not-allowed' : '',
          // Selection highlights
          item.selected ? 'bg-mobi-primary/5 border-l-2 border-l-mobi-primary' : '',
          // Card borders in card mode
          variant === 'cards' 
            ? `rounded-2xl border bg-mobi-surface/50 shadow-sm ${
                item.selected 
                  ? 'border-mobi-primary' 
                  : 'border-mobi-border hover:border-mobi-border/80'
              }` 
            : '',
          item.className || '',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={item.id}
            className={itemClasses}
            role={item.onClick ? 'button' : undefined}
            tabIndex={item.onClick && !item.disabled ? 0 : undefined}
            onClick={() => {
              if (item.onClick && !item.disabled) {
                item.onClick();
              }
            }}
            onKeyDown={(e) => {
              if (item.onClick && !item.disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {/* Leading slot (Avatar, Icon, or Dot) */}
            {item.leading && (
              <div className="flex-shrink-0 flex items-center justify-center">
                {item.leading}
              </div>
            )}

            {/* Central content slot (Headline & Description) */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-black text-mobi-text truncate">
                {item.headline}
              </div>
              {item.description && (
                <div className="text-xs text-mobi-text-muted mt-0.5 truncate leading-relaxed">
                  {item.description}
                </div>
              )}
            </div>

            {/* Trailing slot (Telemetry readouts, dates, action tags) */}
            {item.trailing && (
              <div className="flex-shrink-0 flex items-center justify-end text-right">
                {item.trailing}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

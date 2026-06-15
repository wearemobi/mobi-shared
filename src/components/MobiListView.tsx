import React from 'react';
import { cn } from '@wearemobi/ui';

export interface MobiListViewItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export type MobiListViewVariant = 'classic' | 'stacked' | 'flat';
export type MobiListViewDensity = 'compact' | 'default' | 'comfortable';

export interface MobiListViewProps {
  items: MobiListViewItem[];
  /** Visual style */
  variant?: MobiListViewVariant;
  /** Spacing density */
  density?: MobiListViewDensity;
  /** Currently selected item id — shows accent border */
  selectedId?: string;
  /** Callback when an item is clicked */
  onSelect?: (id: string) => void;
  /** Empty state message */
  emptyMessage?: string;
  /** Footer content below the list (e.g. "Currently Selected: X") */
  footer?: React.ReactNode;
  className?: string;
}

const DENSITY_PADDING: Record<MobiListViewDensity, string> = {
  compact: 'px-4 py-2',
  default: 'px-5 py-4',
  comfortable: 'px-6 py-5',
};

const DENSITY_GAP: Record<MobiListViewDensity, string> = {
  compact: 'space-y-2',
  default: 'space-y-3',
  comfortable: 'space-y-4',
};

export const MobiListView: React.FC<MobiListViewProps> = ({
  items,
  variant = 'classic',
  density = 'default',
  selectedId,
  onSelect,
  emptyMessage = 'No items to display.',
  footer,
  className,
}) => {
  if (items.length === 0) {
    return (
      <div className={cn('py-12 text-center text-sm text-muted-foreground font-medium', className)}>
        {emptyMessage}
      </div>
    );
  }

  const handleItemClick = (item: MobiListViewItem) => {
    if (item.disabled) return;
    onSelect?.(item.id);
    item.onClick?.();
  };

  const renderItem = (item: MobiListViewItem, index: number) => {
    const isSelected = selectedId === item.id;
    const isClickable = (!!onSelect || !!item.onClick) && !item.disabled;

    const itemContent = (
      <>
        {/* Active accent border */}
        {variant !== 'stacked' && (
          <div
            className={cn(
              'absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all duration-200',
              isSelected ? 'bg-primary' : 'bg-transparent'
            )}
          />
        )}

        {item.leading && (
          <div className="flex-shrink-0 flex items-center justify-center">
            {item.leading}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div
            className={cn(
              'text-sm font-bold tracking-tight truncate',
              item.disabled && 'text-muted-foreground'
            )}
          >
            {item.title}
          </div>
          {item.description && (
            <div
              className={cn(
                'text-xs text-muted-foreground font-medium mt-0.5 truncate',
                item.disabled && 'text-muted-foreground/60'
              )}
            >
              {item.description}
            </div>
          )}
        </div>

        {item.trailing && (
          <div className="flex-shrink-0 flex items-center">
            {item.trailing}
          </div>
        )}
      </>
    );

    // --- Stacked Cards ---
    if (variant === 'stacked') {
      return (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={cn(
            'relative flex items-center gap-3 rounded-xl border transition-all duration-200',
          DENSITY_PADDING[density],
            isSelected
              ? 'border-primary/40 bg-primary/[0.03] shadow-md shadow-primary/5 ring-1 ring-primary/20'
              : 'border-border bg-card shadow-sm',
            isClickable && 'cursor-pointer hover:shadow-md hover:border-border/80',
            item.disabled && 'opacity-40 pointer-events-none'
          )}
          role={isClickable ? 'button' : undefined}
          tabIndex={isClickable ? 0 : undefined}
          onKeyDown={isClickable ? (e) => { if (e.key === 'Enter') handleItemClick(item); } : undefined}
        >
          {/* Left accent for selected stacked card */}
          <div
            className={cn(
              'absolute left-0 top-2 bottom-2 w-1 rounded-full transition-all duration-200',
              isSelected ? 'bg-primary' : 'bg-transparent'
            )}
          />
          {itemContent}
        </div>
      );
    }

    // --- Classic & Flat ---
    return (
      <div
        key={item.id}
        onClick={() => handleItemClick(item)}
        className={cn(
          'relative flex items-center gap-3 transition-all duration-200',
          DENSITY_PADDING[density],
          isClickable && 'cursor-pointer hover:bg-accent/50',
          item.disabled && 'opacity-40 pointer-events-none',
          // Divider for classic
          variant === 'classic' && index < items.length - 1 && 'border-b border-border/40'
        )}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => { if (e.key === 'Enter') handleItemClick(item); } : undefined}
      >
        {itemContent}
      </div>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Container wrapper for classic variant */}
      {variant === 'classic' ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {items.map((item, i) => renderItem(item, i))}
        </div>
      ) : variant === 'stacked' ? (
        <div className={DENSITY_GAP[density]}>
          {items.map((item, i) => renderItem(item, i))}
        </div>
      ) : (
        /* flat */
        <div>
          {items.map((item, i) => renderItem(item, i))}
        </div>
      )}

      {footer && (
        <div className="mt-3 px-1 text-xs font-mono text-muted-foreground tracking-wide">
          {footer}
        </div>
      )}
    </div>
  );
};

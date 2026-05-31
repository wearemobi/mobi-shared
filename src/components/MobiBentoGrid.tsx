import React from 'react';

export interface MobiBentoGridProps {
  children: React.ReactNode;
  /**
   * Number of columns for layout orchestration.
   * @default 4
   */
  columns?: 1 | 2 | 3 | 4 | 5;
  /**
   * Additional styling classes.
   */
  className?: string;
}

export interface MobiBentoItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode;
  /**
   * Column footprint span of this item card.
   * @default 1
   */
  colSpan?: 1 | 2 | 3 | 4 | 'full';
  /**
   * Row footprint span of this item card.
   * @default 1
   */
  rowSpan?: 1 | 2 | 3 | 'full';
  /**
   * Optional title rendered at the top of the bento item.
   */
  title?: React.ReactNode;
  /**
   * Optional footer rendered at the bottom (e.g. for action buttons).
   */
  footer?: React.ReactNode;
  /**
   * Additional styling classes.
   */
  className?: string;
}

const columnsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
};

const colSpanMap = {
  1: 'col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  full: 'col-span-full',
};

const rowSpanMap = {
  1: 'row-span-1',
  2: 'md:row-span-2',
  3: 'md:row-span-3',
  full: 'row-span-full',
};

/**
 * MobiBentoGrid
 * Premium multi-dimensional grid system for sovereign M.O.B.I.™ dashboards.
 */
export const MobiBentoGrid: React.FC<MobiBentoGridProps> = ({
  children,
  columns = 4,
  className = '',
}) => {
  const gridClass = columnsMap[columns] || columnsMap[4];

  return (
    <div className={`grid ${gridClass} gap-6 ${className}`}>
      {children}
    </div>
  );
};

/**
 * MobiBentoItem
 * Modular dashboard asset container for the Bento Grid.
 * Features smooth micro-animations and micro-glow highlights on hover.
 */
export const MobiBentoItem: React.FC<MobiBentoItemProps> = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  title,
  footer,
  className = '',
  ...props
}) => {
  const colClass = colSpanMap[colSpan] || 'col-span-1';
  const rowClass = rowSpanMap[rowSpan] || 'row-span-1';

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-mobi-border bg-mobi-surface p-6 flex flex-col
        transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-mobi-primary/30
        group ${colClass} ${rowClass} ${className}
      `}
      {...props}
    >
      {/* Decorative hover radial glow */}
      <div 
        className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-mobi-primary/5 blur-2xl 
                   transition-all duration-500 group-hover:scale-150 group-hover:bg-mobi-primary/10" 
      />
      
      <div className="relative z-10 flex flex-col h-full w-full">
        {title && (
          <div className="mb-4 text-lg font-bold text-mobi-text tracking-tight font-sans">
            {title}
          </div>
        )}
        
        <div className="flex-1">
          {children}
        </div>

        {footer && (
          <div className="mt-6 pt-4 border-t border-mobi-border/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

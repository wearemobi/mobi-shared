import React from 'react';

export interface MobiSkeletonProps {
  /**
   * Skeleton shape.
   * - `text` — thin line (for body copy).
   * - `title` — slightly taller line (for headings).
   * - `avatar` — circle (for user avatars, icons).
   * - `rect` — custom rectangle (any aspect ratio).
   * @default 'text'
   */
  variant?: 'text' | 'title' | 'avatar' | 'rect';
  /** Width. Accepts any valid CSS value. @default '100%' */
  width?: string | number;
  /** Height. Accepts any valid CSS value. Defaults vary by variant. */
  height?: string | number;
  /** Border radius. Overrides variant default. */
  borderRadius?: string;
  /** Additional class names. */
  className?: string;
}

export interface MobiSkeletonGroupProps {
  /** Number of text-line skeletons to render in a group. @default 3 */
  lines?: number;
  /** Show an avatar circle before the text lines. @default false */
  avatar?: boolean;
  /** Show a title skeleton above the text lines. @default true */
  title?: boolean;
  /** Additional class names for the group wrapper. */
  className?: string;
}

/**
 * M.O.B.I.™ Skeleton Loader.
 * Individual placeholder element with pulse animation.
 * Use `MobiSkeletonGroup` for common card/content loading patterns.
 *
 * @example
 * ```tsx
 * // Individual elements
 * <MobiSkeleton variant="title" width="60%" />
 * <MobiSkeleton variant="text" />
 * <MobiSkeleton variant="avatar" width={40} height={40} />
 * <MobiSkeleton variant="rect" height={200} />
 *
 * // Quick group pattern
 * <MobiSkeletonGroup avatar title lines={3} />
 * ```
 */
export const MobiSkeleton: React.FC<MobiSkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height,
  borderRadius,
  className = '',
}) => {
  const defaultHeight: Record<string, string | number> = {
    text: 12,
    title: 18,
    avatar: 40,
    rect: 120,
  };

  const defaultRadius: Record<string, string> = {
    text: '9999px',
    title: '9999px',
    avatar: '9999px',
    rect: '0.75rem',
  };

  const resolvedHeight = height ?? defaultHeight[variant];
  const resolvedRadius = borderRadius ?? defaultRadius[variant];

  return (
    <span
      role="status"
      aria-label="Loading..."
      className={`block bg-mobi-border/40 animate-pulse ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
        borderRadius: resolvedRadius,
        display: 'block',
      }}
    />
  );
};

/**
 * Convenience component that renders a common card/list-item loading state.
 */
export const MobiSkeletonGroup: React.FC<MobiSkeletonGroupProps> = ({
  lines = 3,
  avatar = false,
  title = true,
  className = '',
}) => {
  return (
    <div className={`flex gap-3 ${className}`} role="status" aria-label="Loading content...">
      {avatar && (
        <MobiSkeleton variant="avatar" width={40} height={40} className="shrink-0 mt-1" />
      )}
      <div className="flex-1 flex flex-col gap-2.5">
        {title && <MobiSkeleton variant="title" width="55%" />}
        {Array.from({ length: lines }).map((_, i) => (
          <MobiSkeleton
            key={i}
            variant="text"
            width={i === lines - 1 ? '70%' : '100%'}
          />
        ))}
      </div>
    </div>
  );
};

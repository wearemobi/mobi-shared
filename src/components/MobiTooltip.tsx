import React, { useState, useRef, useEffect, useCallback, useId } from 'react';

export type MobiTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface MobiTooltipProps {
  /** The content to display inside the tooltip. */
  content: React.ReactNode;
  /** The trigger element that the tooltip appears on hover/focus. */
  children: React.ReactElement;
  /**
   * Preferred tooltip placement relative to the trigger.
   * @default 'top'
   */
  position?: MobiTooltipPosition;
  /**
   * Delay in ms before the tooltip appears on hover.
   * @default 400
   */
  delay?: number;
  /** Additional class names for the tooltip bubble. */
  className?: string;
  /**
   * If true, the tooltip is never shown (useful for conditional suppression).
   * @default false
   */
  disabled?: boolean;
}

const POSITION_CLASS: Record<MobiTooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const ARROW_CLASS: Record<MobiTooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-mobi-surface',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-mobi-surface',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-mobi-surface',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-mobi-surface',
};

/**
 * M.O.B.I.™ Tooltip.
 * Wraps any trigger element and shows a floating tooltip on hover or focus.
 * Accessible via `role="tooltip"` and `aria-describedby` on the trigger.
 *
 * @example
 * ```tsx
 * <MobiTooltip content="Delete this fleet record" position="top">
 *   <MobiButton variant="danger" icon={<TrashIcon />} />
 * </MobiTooltip>
 *
 * <MobiTooltip content="Requires PRO plan" position="right">
 *   <span>Upgrade</span>
 * </MobiTooltip>
 * ```
 */
export const MobiTooltip: React.FC<MobiTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 400,
  className = '',
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useId();

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Clone the child element to inject aria-describedby and event handlers
  const trigger = React.cloneElement(children, {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      children.props.onBlur?.(e);
    },
  });

  return (
    <span className="relative inline-flex items-center">
      {trigger}
      {visible && !disabled && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`
            pointer-events-none absolute z-50 whitespace-nowrap
            ${POSITION_CLASS[position]}
            px-2.5 py-1.5 rounded-lg
            bg-mobi-surface border border-mobi-border
            text-[10px] font-bold font-sans text-mobi-text uppercase tracking-widest
            shadow-xl backdrop-blur-sm
            animate-in fade-in zoom-in-95 duration-150
            ${className}
          `}
        >
          {content}
          {/* Arrow */}
          <span
            aria-hidden="true"
            className={`absolute w-0 h-0 border-4 ${ARROW_CLASS[position]}`}
          />
        </span>
      )}
    </span>
  );
};

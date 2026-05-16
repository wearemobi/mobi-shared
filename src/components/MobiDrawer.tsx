import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MobiIcon } from './MobiIcon';
import './MobiDrawer.css';

export type MobiDrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface MobiDrawerProps {
  /** Controls visibility. */
  isOpen: boolean;
  /** Called when the drawer should close. */
  onClose: () => void;
  /** 
   * Position from which the drawer slides in.
   * @default 'right'
   */
  position?: MobiDrawerPosition;
  /** Optional header title. */
  title?: string;
  /** Drawer content. */
  children?: React.ReactNode;
  /** Optional footer content. */
  footer?: React.ReactNode;
  /** 
   * Width/Height of the drawer. 
   * For left/right: width. For top/bottom: height.
   * @default '320px'
   */
  size?: string;
  /** Additional CSS classes for the drawer panel. */
  className?: string;
}

/**
 * M.O.B.I.™ Drawer
 * A sliding panel that overlays content. Useful for navigation, filters, or modular views.
 */
export const MobiDrawer: React.FC<MobiDrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  footer,
  size = '320px',
  className = ''
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const style: React.CSSProperties = {};
  if (position === 'left' || position === 'right') style.width = size;
  else style.height = size;

  return createPortal(
    <div className={`mobi-drawer-container position-${position}`} role="presentation">
      {/* Backdrop */}
      <div 
        className="mobi-drawer-backdrop animate-in fade-in duration-300" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        style={style}
        className={`mobi-drawer-panel position-${position} ${className} animate-in slide-in-from-${position} duration-300`}
      >
        {/* Header */}
        {(title || !!onClose) && (
          <div className="mobi-drawer-header">
            <h2 className="mobi-drawer-title">{title}</h2>
            <button
              onClick={onClose}
              className="mobi-drawer-close"
              aria-label="Close"
            >
              <MobiIcon name="close" size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="mobi-drawer-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mobi-drawer-footer">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default MobiDrawer;

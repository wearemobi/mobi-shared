import React from 'react';
import { MobiLogo } from './MobiLogo';

export interface MobiLoaderProps {
  /**
   * The animation and layout pattern
   * @default 'spinner'
   */
  variant?: 'spinner' | 'pulse' | 'bars' | 'screen';
  /**
   * Layout size modifier
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Optional loading label message
   */
  label?: string;
  /**
   * Optional custom CSS class overrides
   */
  className?: string;
}

export const MobiLoader: React.FC<MobiLoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  label,
  className = '',
}) => {
  // Map sizes to pixel widths for the MobiLogo element
  const logoSizes = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  const logoSize = logoSizes[size];

  const renderLoaderContent = () => {
    switch (variant) {
      case 'pulse':
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative flex items-center justify-center">
              {/* Pulsing ring behind the logo */}
              <div className="absolute inset-0 rounded-full bg-mobi-primary/20 animate-ping" />
              <MobiLogo size={logoSize} className="relative z-10 animate-pulse" />
            </div>
            {label && (
              <span className="text-xs font-mono text-mobi-text-muted uppercase tracking-widest animate-pulse">
                {label}
              </span>
            )}
          </div>
        );

      case 'bars':
        return (
          <div className="flex flex-col items-center justify-center gap-4">
            <MobiLogo size={logoSize} />
            <div className="flex items-end justify-center gap-1.5 h-6">
              <div className="w-1 bg-mobi-primary rounded-full animate-[bounce_1s_infinite_100ms]" style={{ height: '40%' }} />
              <div className="w-1 bg-mobi-primary rounded-full animate-[bounce_1s_infinite_300ms]" style={{ height: '100%' }} />
              <div className="w-1 bg-mobi-primary rounded-full animate-[bounce_1s_infinite_200ms]" style={{ height: '70%' }} />
              <div className="w-1 bg-mobi-primary rounded-full animate-[bounce_1s_infinite_400ms]" style={{ height: '50%' }} />
            </div>
            {label && (
              <span className="text-xs font-mono text-mobi-text-muted uppercase tracking-widest">
                {label}
              </span>
            )}
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative flex items-center justify-center" style={{ width: logoSize + 24, height: logoSize + 24 }}>
              {/* Outer spin circle */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-mobi-border/30 border-t-mobi-primary animate-spin" 
                style={{ animationDuration: '0.8s' }}
              />
              <MobiLogo size={logoSize} />
            </div>
            {label && (
              <span className="text-[10px] font-black font-mono text-mobi-text-muted uppercase tracking-[0.2em]">
                {label}
              </span>
            )}
          </div>
        );
    }
  };

  if (variant === 'screen') {
    return (
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-mobi-bg/75 backdrop-blur-md transition-opacity duration-300 ${className}`}>
        <div className="rounded-2xl border border-mobi-border bg-mobi-surface/50 p-8 shadow-2xl max-w-sm w-full text-center">
          <MobiLoader variant="spinner" size="lg" label={label || 'SYNCHRONIZING QUANTUM ARRAYS...'} />
        </div>
      </div>
    );
  }

  return <div className={`inline-flex flex-col items-center justify-center ${className}`}>{renderLoaderContent()}</div>;
};

import React from 'react';
import { MobiLogo } from './MobiLogo';
import { cn } from '@wearemobi/ui';

export interface MobiLoaderProps {
  variant?: 'spinner' | 'pulse' | 'bars' | 'screen';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const MobiLoader: React.FC<MobiLoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  label,
  className,
}) => {
  const logoSizes = { sm: 24, md: 40, lg: 64 };
  const barHeights = { sm: 16, md: 24, lg: 36 };
  const logoSize = logoSizes[size];
  const barHeight = barHeights[size];

  const renderLoaderContent = () => {
    switch (variant) {
      case 'pulse':
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <MobiLogo size={logoSize} className="relative z-10 animate-pulse" />
            </div>
            {label && (
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
                {label}
              </span>
            )}
          </div>
        );

      case 'bars':
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className="flex items-end justify-center gap-1"
              style={{ height: barHeight }}
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  style={{
                    height: '100%',
                    animation: 'mobi-bar-bounce 1s ease-in-out infinite',
                    animationDelay: `${i * 0.12}s`,
                  }}
                />
              ))}
            </div>
            {label && (
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {label}
              </span>
            )}
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className="relative flex items-center justify-center"
              style={{ width: logoSize + 24, height: logoSize + 24 }}
            >
              <div
                className="absolute inset-0 rounded-full border-2 border-border/30 border-t-primary"
                style={{ animation: 'spin 0.75s linear infinite' }}
              />
              <MobiLogo size={logoSize} />
            </div>
            {label && (
              <span className="text-[10px] font-black font-mono text-muted-foreground uppercase tracking-[0.2em]">
                {label}
              </span>
            )}
          </div>
        );
    }
  };

  if (variant === 'screen') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed inset-0 z-[9999] flex items-center justify-center bg-background/75 backdrop-blur-md transition-opacity duration-300',
          className
        )}
      >
        <div className="rounded-2xl border border-border bg-card/50 p-8 shadow-2xl max-w-sm w-full text-center">
          <MobiLoader variant="spinner" size="lg" label={label || 'SYNCHRONIZING...'} />
        </div>
        <span className="sr-only">{label || 'Loading...'}</span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes mobi-bar-bounce {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
      <div
        role="status"
        aria-live="polite"
        className={cn('inline-flex flex-col items-center justify-center', className)}
      >
        {renderLoaderContent()}
        <span className="sr-only">{label || 'Loading...'}</span>
      </div>
    </>
  );
};

import React from 'react';

/**
 * Official M.O.B.I.™ brand mark. Renders the app icon at a configurable size.
 * Uses the official SVG asset from `wearemobi.com`.
 *
 * @example
 * ```tsx
 * <MobiLogo size={64} />
 * <MobiLogo size={24} className="opacity-50" />
 * ```
 */
export const MobiLogo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 32,
  className = ""
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        width: size, 
        height: size,
        minWidth: size,
        minHeight: size
      }}
    >
      <img 
        src="https://wearemobi.com/icon-light.svg" 
        alt="M.O.B.I.™" 
        className="h-full w-full object-contain"
        style={{ display: 'block' }}
      />
    </div>
  );
};

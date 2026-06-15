import React from 'react';
import { cn } from '@wearemobi/ui';

export const MobiLogo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 32,
  className,
}) => {
  return (
    <div 
      className={cn("relative inline-flex items-center justify-center overflow-hidden", className)}
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
        className="h-full w-full object-contain block"
      />
    </div>
  );
};

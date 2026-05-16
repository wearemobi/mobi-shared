import React from 'react';

export interface MobiAppLogoProps {
  /** Text to extract the first letter from (e.g. "MobiVault") */
  label: string;
  /** Size of the square in pixels. @default 40 */
  size?: number;
  /** Custom CSS classes */
  className?: string;
}

/**
 * M.O.B.I.™ App Identity Logo.
 * Generates a premium app icon with a white initial on a black background,
 * following the flagship branding guidelines.
 */
export const MobiAppLogo: React.FC<MobiAppLogoProps> = ({ 
  label, 
  size = 40, 
  className = '' 
}) => {
  const initial = label.charAt(0).toUpperCase();
  
  return (
    <div 
      className={`
        flex items-center justify-center bg-mobi-text rounded-sm select-none
        ${className}
      `}
      style={{ 
        width: size, 
        height: size,
        backgroundColor: '#000000' // True black for flagship identity
      }}
    >
      <span 
        className="text-white font-black leading-none"
        style={{ 
          fontSize: size * 0.65, 
          fontFamily: 'var(--font-sans, "Inter", sans-serif)' 
        }}
      >
        {initial}
      </span>
    </div>
  );
};

export default MobiAppLogo;

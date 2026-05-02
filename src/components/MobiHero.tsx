import React from 'react';

export interface MobiHeroProps {
  /**
   * Primary heading text.
   */
  title: string;
  /**
   * Muted subtitle text shown after the title.
   */
  subtitle?: string;
  /**
   * Optional logo or image to render above the title.
   * Can be the official <MobiLogoHero /> or any React element.
   */
  logo?: React.ReactNode;
  /**
   * Descriptive paragraph text. Can be a string or React nodes.
   */
  description?: React.ReactNode;
  /**
   * Optional content to render below the description (e.g., buttons, cards).
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
}

/**
 * M.O.B.I.™ Hero Component.
 * A high-impact header section for landing pages.
 * Implements the official typography and spacing from the Core Blueprint.
 *
 * @example
 * ```tsx
 * <MobiHero 
 *   logo={<MobiLogoHero size={160} />}
 *   title="M.O.B.I.™ Shared" 
 *   subtitle="Common UI"
 *   description="Universal UI & Logic Shield for the M.O.B.I.™ Grand Fleet."
 * >
 *   <button>Explore Docs</button>
 * </MobiHero>
 * ```
 */
export const MobiHero: React.FC<MobiHeroProps> = ({
  title,
  subtitle,
  logo,
  description,
  children,
  className = ""
}) => {
  return (
    <section className={`flex flex-col items-center justify-center text-center py-12 md:py-20 ${className}`}>
      <div className="max-w-2xl">
        {logo && (
          <div className="mb-8 flex justify-center">
            {logo}
          </div>
        )}
        
        <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-4 text-mobi-text">
          {title} {subtitle && <span className="text-mobi-text-muted">{subtitle}</span>}
        </h1>
        
        {description && (
          <p className="text-lg md:text-xl text-mobi-text-muted font-sans font-medium mb-8 max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className="flex flex-col items-center">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

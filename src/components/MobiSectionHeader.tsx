import React from 'react';

export interface MobiSectionHeaderProps {
  /** Small badge text above the title. */
  headline?: string;
  /** Main heading text. */
  title?: string;
  /** Subtext or description below the title. */
  description?: string;
  /** 
   * Visual variant for the headline badge. 
   * @default 'component'
   */
  variant?: 'component' | 'hook' | 'neutral';
  /** Additional container classes. */
  className?: string;
}

/**
 * M.O.B.I.™ Standard Section Header.
 * Used to introduce components, hooks, or major sections with a consistent 
 * hierarchy (Headline Badge -> Title -> Description).
 */
export const MobiSectionHeader: React.FC<MobiSectionHeaderProps> = ({
  headline,
  title,
  description,
  variant = 'neutral',
  className = ''
}) => {
  const getBadgeStyles = () => {
    switch (variant) {
      case 'component':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'hook':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-mobi-border/30 text-mobi-text-muted';
    }
  };

  return (
    <div className={`mb-10 ${className}`}>
      {headline && (
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono ${getBadgeStyles()}`}>
            {headline}
          </span>
        </div>
      )}
      
      {title && (
        <h2 className="text-4xl font-black tracking-tight font-sans text-mobi-text">
          {title}
        </h2>
      )}
      
      {description && (
        <p className="text-base text-mobi-text-muted font-sans mt-2 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default MobiSectionHeader;

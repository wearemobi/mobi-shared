import React from 'react';

export interface MobiSectionHeaderProps {
  /** Small badge text above the title. */
  headline?: React.ReactNode;
  /** Main heading text. */
  title?: React.ReactNode;
  /** Subtext or description below the title. */
  description?: React.ReactNode;
  /** 
   * Visual variant for the headline badge. 
   * @default 'neutral'
   */
  variant?: 'component' | 'hook' | 'neutral';
  /** Additional container classes. */
  className?: string;
  /** Leading icon shown next to the title. */
  icon?: React.ReactNode;
  /** Trailing actions, such as a toolbar or More Menu. */
  actions?: React.ReactNode;
  /** Size of the section header. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
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
  className = '',
  icon,
  actions,
  size = 'md'
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

  const sizeClasses = {
    sm: {
      title: 'text-2xl',
      desc: 'text-sm mt-1',
      spacing: 'mb-6',
      icon: 'h-6 w-6'
    },
    md: {
      title: 'text-4xl',
      desc: 'text-base mt-2',
      spacing: 'mb-10',
      icon: 'h-8 w-8'
    },
    lg: {
      title: 'text-5xl',
      desc: 'text-lg mt-3',
      spacing: 'mb-14',
      icon: 'h-10 w-10'
    }
  };

  return (
    <div className={`${sizeClasses[size].spacing} ${className}`}>
      {headline && (
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono ${getBadgeStyles()}`}>
            {headline}
          </span>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {title && (
            <h2 className={`font-black tracking-tight font-sans text-mobi-text flex items-center gap-3 ${sizeClasses[size].title}`}>
              {icon && (
                <div className={`flex items-center justify-center text-mobi-primary ${sizeClasses[size].icon}`}>
                  {icon}
                </div>
              )}
              {title}
            </h2>
          )}
          
          {description && (
            <div className={`text-mobi-text-muted font-sans max-w-2xl leading-relaxed ${sizeClasses[size].desc}`}>
              {description}
            </div>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobiSectionHeader;

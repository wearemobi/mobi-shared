import React from 'react';
import { cn } from '@wearemobi/ui';
import { MobiButton } from './MobiButton';

export interface MobiHeroAction {
  label: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  href?: string;
}

export interface MobiHeroProps {
  /** Main title — supports ReactNode for mixed typography */
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  /** Logo or visual element above the title */
  logo?: React.ReactNode;
  actions?: MobiHeroAction[];
  /** Alignment */
  align?: 'left' | 'center';
  /** Visual size */
  size?: 'sm' | 'default' | 'lg';
  /** Extra content below actions (badges, stats, logos) */
  children?: React.ReactNode;
  className?: string;
}

const SIZE_CONFIG = {
  sm: {
    title: 'text-2xl sm:text-3xl',
    subtitle: 'text-sm',
    description: 'text-sm max-w-lg',
    padding: 'py-12 sm:py-16',
  },
  default: {
    title: 'text-3xl sm:text-4xl md:text-5xl',
    subtitle: 'text-sm',
    description: 'text-base max-w-2xl',
    padding: 'py-16 sm:py-24',
  },
  lg: {
    title: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    subtitle: 'text-base',
    description: 'text-lg max-w-3xl',
    padding: 'py-24 sm:py-32',
  },
};

export const MobiHero: React.FC<MobiHeroProps> = ({
  title,
  subtitle,
  description,
  logo,
  actions,
  align = 'center',
  size = 'default',
  children,
  className,
}) => {
  const config = SIZE_CONFIG[size];
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className={cn('w-full px-6', config.padding, className)}>
      <div className={cn('flex flex-col gap-6', alignClass)}>
        {logo && (
          <div className="mb-2">
            {logo}
          </div>
        )}

        <h1
          className={cn(
            'font-black tracking-tighter text-foreground leading-[0.95]',
            config.title
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              'font-medium text-muted-foreground tracking-wide',
              config.subtitle
            )}
          >
            {subtitle}
          </p>
        )}

        {description && (
          <p
            className={cn(
              'text-muted-foreground font-medium leading-relaxed',
              config.description,
              align === 'center' && 'mx-auto'
            )}
          >
            {description}
          </p>
        )}

        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {actions.map((action) => (
              <MobiButton
                key={action.label}
                type="button"
                variant={action.variant || 'solid'}
                size="lg"
                onClick={action.onClick}
                className="min-w-[140px]"
              >
                {action.label}
              </MobiButton>
            ))}
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </section>
  );
};

import React from 'react';

/** Subscription tier identifiers used across the M.O.B.I.™ fleet. */
export type MobiPlan = 'FREE' | 'BASIC' | 'PRO' | 'ULTRA' | 'CUSTOM' | 'NOT_AVAILABLE';

interface MobiPlanBadgeProps {
  /** The active subscription plan. Controls color and label. */
  plan: MobiPlan;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Color-coded pill badge indicating a subscription tier.
 * Each plan has a unique color from the MOBI palette.
 *
 * @example
 * ```tsx
 * <MobiPlanBadge plan="PRO" />
 * <MobiPlanBadge plan="ULTRA" className="ml-2" />
 * ```
 */
export const MobiPlanBadge: React.FC<MobiPlanBadgeProps> = ({
  plan,
  className = ''
}) => {
  const planStyles: Record<MobiPlan, { label: string; color: string; bg: string }> = {
    FREE: {
      label: 'Free',
      color: 'text-mobi-text-muted',
      bg: 'bg-mobi-bg/50'
    },
    BASIC: {
      label: 'Basic',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    PRO: {
      label: 'Pro',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    ULTRA: {
      label: 'Ultra',
      color: 'text-mobi-primary',
      bg: 'bg-mobi-primary/10'
    },
    CUSTOM: {
      label: 'Custom',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    NOT_AVAILABLE: {
      label: 'N/A',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    }
  };

  const isUltra = plan === 'ULTRA';
  const style = planStyles[plan];

  return (
    <div className={`
      inline-flex items-center border px-2 py-0.5 rounded-sm shadow-sm font-sans transition-all
      ${isUltra ? 'mobi-plan-ultra' : `${style.bg} border-mobi-border/30`}
      ${className}
    `}>
      <span className={`
        text-[9px] font-black uppercase tracking-[0.15em]
        ${isUltra ? 'text-white' : style.color}
      `}>
        {style.label}
      </span>
    </div>
  );
};

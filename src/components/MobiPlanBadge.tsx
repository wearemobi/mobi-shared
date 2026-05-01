import React from 'react';

export type MobiPlan = 'FREE' | 'BASIC' | 'PRO' | 'ULTRA' | 'CUSTOM' | 'NOT_AVAILABLE';

interface MobiPlanBadgeProps {
  plan: MobiPlan;
  className?: string;
}

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

  const style = planStyles[plan];

  return (
    <div className={`inline-flex items-center ${style.bg} border border-mobi-border/30 px-2 py-0.5 rounded-md shadow-sm ${className}`}>
      <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${style.color} font-sans`}>
        {style.label}
      </span>
    </div>
  );
};

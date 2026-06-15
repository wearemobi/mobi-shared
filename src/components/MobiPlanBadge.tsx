import React from 'react';
import { cn } from '@wearemobi/ui';

export type MobiPlanTier = 'FREE' | 'BASIC' | 'PRO' | 'ULTRA' | 'BUSINESS' | 'ENTERPRISE' | 'CUSTOM' | 'N/A';

export interface MobiPlanBadgeProps {
  plan: MobiPlanTier;
  size?: 'sm' | 'md';
  className?: string;
}

const PLAN_STYLES: Record<string, React.CSSProperties> = {
  FREE: {
    background: 'transparent',
    color: '#71717a',
    border: '1px solid #e4e4e7',
  },
  BASIC: {
    background: 'rgba(16, 185, 129, 0.12)',
    color: '#059669',
    border: '1px solid rgba(16, 185, 129, 0.25)',
  },
  PRO: {
    background: 'rgba(59, 130, 246, 0.12)',
    color: '#2563eb',
    border: '1px solid rgba(59, 130, 246, 0.25)',
  },
  ULTRA: {
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
  },
  BUSINESS: {
    background: 'rgba(245, 158, 11, 0.12)',
    color: '#d97706',
    border: '1px solid rgba(245, 158, 11, 0.25)',
  },
  ENTERPRISE: {
    background: 'rgba(139, 92, 246, 0.12)',
    color: '#7c3aed',
    border: '1px solid rgba(139, 92, 246, 0.25)',
  },
  CUSTOM: {
    background: 'rgba(249, 115, 22, 0.12)',
    color: '#ea580c',
    border: '1px solid rgba(249, 115, 22, 0.25)',
  },
  'N/A': {
    background: 'rgba(244, 63, 94, 0.12)',
    color: '#e11d48',
    border: '1px solid rgba(244, 63, 94, 0.25)',
  },
};

export const MobiPlanBadge: React.FC<MobiPlanBadgeProps> = ({
  plan,
  size = 'md',
  className,
}) => {
  const styles = PLAN_STYLES[plan] ?? PLAN_STYLES['N/A'];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wide whitespace-nowrap leading-none',
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]',
        className
      )}
      style={styles}
    >
      {plan}
    </span>
  );
};

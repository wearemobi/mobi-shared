import React from 'react';
import { MobiPlan, MobiPlanBadge } from './MobiPlanBadge';
import { useMobiTheme } from '../hooks/useMobiTheme';

export type MobiUserBadgeVariant = 'condensed' | 'expanded';

interface MobiUserBadgeProps {
  email: string;
  initials: string;
  plan: MobiPlan;
  org?: string;
  variant?: MobiUserBadgeVariant;
  onClick?: () => void;
  className?: string;
}

export const MobiUserBadge: React.FC<MobiUserBadgeProps> = ({
  email,
  initials,
  plan,
  org = 'M.O.B.I. HQ',
  variant = 'condensed',
  onClick,
  className = ''
}) => {
  const { theme } = useMobiTheme();

  const avatarStyles = theme === 'dark' 
    ? 'bg-white text-slate-950' 
    : 'bg-slate-950 text-white';

  if (variant === 'condensed') {
    return (
      <button
        onClick={onClick}
        className={`flex h-12 items-center gap-3 rounded-full border border-mobi-border bg-mobi-surface pl-1.5 pr-5 shadow-sm transition-all hover:bg-mobi-surface-hover active:scale-95 ${className}`}
      >
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black font-sans tracking-tight shrink-0 ${avatarStyles}`}>
          {initials}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-mobi-text font-sans">
          {plan}
        </span>
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-4 p-5 ${className}`}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-black shadow-sm font-sans shrink-0 ${avatarStyles}`}>
        {initials.charAt(0)}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-black text-mobi-text leading-none font-sans tracking-tight truncate">
            {email}
          </span>
          <MobiPlanBadge plan={plan} />
        </div>
        <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest mt-1.5 font-sans">
          {org}
        </span>
      </div>
    </div>
  );
};

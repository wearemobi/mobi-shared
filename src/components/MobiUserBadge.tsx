import React from 'react';
import { MobiPlan, MobiPlanBadge } from './MobiPlanBadge';
import { useMobiTheme } from '../hooks/useMobiTheme';

/** Layout variant for the user badge. */
export type MobiUserBadgeVariant = 'condensed' | 'expanded' | 'micro';

interface MobiUserBadgeProps {
  /** User email address — displayed in expanded mode if name is missing. */
  email: string;
  /** Full name of the user — prioritized over email in expanded mode. */
  name?: string;
  /** 1-2 character initials for the avatar circle. */
  initials: string;
  /** Current subscription plan — rendered as label (condensed) or badge (expanded). */
  plan: MobiPlan;
  /** Organization name. @default 'M.O.B.I. HQ' */
  org?: string;
  /** `micro` = super mini avatar only. `condensed` = compact trigger button. `expanded` = full header. @default 'condensed' */
  variant?: MobiUserBadgeVariant;
  /** Click handler. */
  onClick?: () => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Theme-aware user identity badge with multiple layout variants.
 * Avatar colors automatically invert based on the active theme.
 */
export const MobiUserBadge: React.FC<MobiUserBadgeProps> = ({
  email,
  name,
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

  if (variant === 'micro') {
    return (
      <button
        onClick={onClick}
        title={name || email}
        className={`flex h-8 w-8 items-center justify-center rounded-full border border-mobi-border bg-mobi-surface shadow-sm transition-all hover:bg-mobi-surface-hover active:scale-95 ${className}`}
      >
        <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-black font-sans tracking-tight shrink-0 ${avatarStyles}`}>
          {initials.charAt(0)}
        </div>
      </button>
    );
  }

  if (variant === 'condensed') {
    return (
      <button
        onClick={onClick}
        className={`flex h-12 items-center gap-3 rounded-full border border-mobi-border bg-mobi-surface pl-1.5 pr-5 shadow-sm transition-all hover:bg-mobi-surface-hover active:scale-95 ${className}`}
      >
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black font-sans tracking-tight shrink-0 ${avatarStyles}`}>
          {initials.charAt(0)}
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
            {name || email}
          </span>
          <MobiPlanBadge plan={plan} />
        </div>
        <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest mt-1.5 font-sans">
          {name ? email : org}
        </span>
      </div>
    </div>
  );
};

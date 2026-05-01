import React from 'react';
import { MobiPlan, MobiPlanBadge } from './MobiPlanBadge';
import { useMobiTheme } from '../hooks/useMobiTheme';

/** Layout variant for the user badge. */
export type MobiUserBadgeVariant = 'condensed' | 'expanded';

interface MobiUserBadgeProps {
  /** User email address — displayed in expanded mode. */
  email: string;
  /** 1-2 character initials for the avatar circle. */
  initials: string;
  /** Current subscription plan — rendered as label (condensed) or badge (expanded). */
  plan: MobiPlan;
  /** Organization name. @default 'M.O.B.I. HQ' */
  org?: string;
  /** `condensed` = compact trigger button. `expanded` = full header with email and plan badge. @default 'condensed' */
  variant?: MobiUserBadgeVariant;
  /** Click handler — typically used to toggle a menu in condensed mode. */
  onClick?: () => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Theme-aware user identity badge with two layout variants.
 * Avatar colors automatically invert based on the active theme (black-on-light, white-on-dark).
 *
 * @example
 * ```tsx
 * // Compact trigger button
 * <MobiUserBadge variant="condensed" initials="CA" plan="PRO" email="dev@mobi.com" />
 *
 * // Full header with plan badge
 * <MobiUserBadge variant="expanded" initials="CA" plan="PRO" email="dev@mobi.com" org="Fleet HQ" />
 * ```
 */
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

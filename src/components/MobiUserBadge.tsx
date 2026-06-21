import React from 'react';
import { Avatar, AvatarFallback, cn } from '@wearemobi/ui';
import { MobiPlanBadge } from './MobiPlanBadge';

export type MobiPlan = 'FREE' | 'PRO' | 'ENTERPRISE' | 'FLEET' | 'BETA';

export type MobiUserBadgeVariant = 'condensed' | 'expanded' | 'micro' | 'stacked';

export interface MobiUserBadgeProps {
  email: string;
  name?: string;
  initials: string;
  plan: string;
  org?: string;
  variant?: MobiUserBadgeVariant;
  onClick?: () => void;
  className?: string;
  tenantBadge?: React.ReactNode;
}

export const MobiUserBadge: React.FC<MobiUserBadgeProps> = ({
  email,
  name,
  initials,
  plan,
  org = 'M.O.B.I. HQ',
  variant = 'condensed',
  onClick,
  className,
  tenantBadge,
}) => {
  const isExpanded = variant === 'expanded';
  const isStacked = variant === 'stacked';
  const showText = isExpanded || isStacked;

  const avatar = (
    <Avatar 
      className={cn(
        variant === 'micro' ? 'h-8 w-8' : isStacked ? 'h-16 w-16' : isExpanded ? 'h-12 w-12' : 'h-10 w-10',
        "border shadow-sm bg-background"
      )}
    >
      <AvatarFallback className={cn("font-black font-sans tracking-tight bg-foreground text-background", isStacked && "text-2xl")}>
        {initials.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );

  const inner = (
    <>
      {avatar}
      {showText && (
        <div className={cn("flex flex-col min-w-0 flex-1", isStacked ? "items-center text-center mt-4" : "text-left")}>
          <div className={cn("flex items-center gap-2", isStacked ? "justify-center mb-1" : "justify-between")}>
            <span className={cn("font-black text-foreground tracking-tight truncate", isStacked ? "text-2xl" : "text-sm leading-none")}>
              {name || email}
            </span>
            {!isStacked && (
              <div className="flex items-center gap-2">
                {tenantBadge}
                <MobiPlanBadge plan={plan as any} size="sm" />
              </div>
            )}
          </div>
          <span className={cn("font-medium text-muted-foreground truncate", isStacked ? "text-sm" : "text-[10px] uppercase tracking-widest mt-1.5 font-bold")}>
            {name ? email : org}
          </span>
          {isStacked && (
            <div className="flex items-center gap-2 mt-3">
              {tenantBadge}
              <MobiPlanBadge plan={plan as any} size="md" />
            </div>
          )}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center transition-all hover:bg-accent active:scale-[0.98] focus:outline-none",
          isExpanded ? 'p-3 w-full rounded-2xl border bg-card gap-3' : 
          isStacked ? 'flex-col gap-0 bg-transparent rounded-3xl p-6 hover:bg-accent/50' : 'p-0.5 border bg-background gap-3 rounded-full',
          className
        )}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={cn(
      "flex items-center",
      isExpanded ? 'p-3 rounded-2xl border bg-card gap-3' : 
      isStacked ? 'flex-col gap-0' : 'gap-3',
      className
    )}>
      {inner}
    </div>
  );
};

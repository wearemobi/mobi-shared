import React from 'react';
import { Avatar, AvatarFallback, Badge, cn } from '@wearemobi/ui';

export type MobiPlan = 'FREE' | 'PRO' | 'ENTERPRISE' | 'FLEET' | 'BETA';

export type MobiUserBadgeVariant = 'condensed' | 'expanded' | 'micro';

export interface MobiUserBadgeProps {
  email: string;
  name?: string;
  initials: string;
  plan: MobiPlan;
  org?: string;
  variant?: MobiUserBadgeVariant;
  onClick?: () => void;
  className?: string;
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
}) => {
  const isExpanded = variant === 'expanded';

  const avatar = (
    <Avatar 
      className={cn(
        variant === 'micro' ? 'h-8 w-8' : isExpanded ? 'h-12 w-12' : 'h-10 w-10',
        "border shadow-sm bg-background"
      )}
    >
      <AvatarFallback className="font-black font-sans tracking-tight bg-foreground text-background">
        {initials.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );

  const inner = (
    <>
      {avatar}
      {isExpanded && (
        <div className="flex flex-col min-w-0 flex-1 text-left">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-black text-foreground leading-none tracking-tight truncate">
              {name || email}
            </span>
            <Badge variant="default" className="text-[10px] h-4 leading-none px-1.5 py-0 tracking-widest font-black uppercase">{plan}</Badge>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5 truncate">
            {name ? email : org}
          </span>
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-full transition-all hover:bg-accent active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          isExpanded ? 'p-3 w-full rounded-2xl border bg-card' : 'p-0.5 border bg-background',
          className
        )}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-3",
      isExpanded ? 'p-3 rounded-2xl border bg-card' : '',
      className
    )}>
      {inner}
    </div>
  );
};

import React from 'react';
import { cn } from '@wearemobi/ui';
import { MobiIcon, MobiIconName } from './MobiIcon';

export interface MobiTenantBadgeProps {
  name: string;
  icon?: MobiIconName;
  variant?: 'outline' | 'solid' | 'glass' | 'ghost';
  className?: string;
  onClick?: () => void;
}

export const MobiTenantBadge: React.FC<MobiTenantBadgeProps> = ({
  name,
  icon = 'box',
  variant = 'outline',
  className,
  onClick,
}) => {
  const baseClasses = "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors";
  
  const variants = {
    outline: "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    glass: "bg-background/50 backdrop-blur-md border border-border/50 text-foreground hover:bg-accent",
    ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={cn(baseClasses, variants[variant], onClick && "cursor-pointer", className)}
    >
      <MobiIcon name={icon} size={14} className="opacity-70" />
      <span className="truncate max-w-[200px]">{name}</span>
    </Component>
  );
};

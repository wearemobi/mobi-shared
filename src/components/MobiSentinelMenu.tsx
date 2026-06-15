import React from 'react';
import { partitionMenuItems } from '../utils/menu';
import { MobiUserBadge, type MobiPlan } from './MobiUserBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn
} from '@wearemobi/ui';

export interface MobiSentinelMenuUser {
  initials: string;
  email: string;
  name?: string;
  plan: MobiPlan;
  org?: string;
}

export interface MobiSentinelMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface MobiSentinelMenuProps {
  user: MobiSentinelMenuUser;
  items?: MobiSentinelMenuItem[];
  variant?: 'condensed' | 'micro';
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const MobiSentinelMenu: React.FC<MobiSentinelMenuProps> = ({
  user,
  items = [],
  variant = 'condensed',
  className,
  side = 'bottom',
  align = 'end'
}) => {
  const { regularItems, dangerItems } = partitionMenuItems(items);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("cursor-pointer inline-block w-fit", className)}>
          <MobiUserBadge
            variant={variant}
            initials={user.initials}
            plan={user.plan}
            email={user.email}
            name={user.name}
          />
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent side={side} align={align} sideOffset={8} className="w-80 rounded-2xl p-0 overflow-hidden">
        <MobiUserBadge
          variant="expanded"
          initials={user.initials}
          plan={user.plan}
          email={user.email}
          name={user.name}
          org={user.org}
          className="border-0 border-b border-border/50 rounded-none bg-background shadow-none"
        />

        {regularItems.length > 0 && (
          <div className="p-2 space-y-1">
            {regularItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => item.onClick?.()}
                className="gap-3 rounded-xl px-3 py-2.5 text-sm font-bold cursor-pointer"
              >
                {item.icon && (
                  <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                    {item.icon}
                  </div>
                )}
                {item.label}
              </DropdownMenuItem>
            ))}
          </div>
        )}

        {dangerItems.length > 0 && (
          <div className="p-2 border-t border-border/50 bg-muted/30">
            {dangerItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => item.onClick?.()}
                className="gap-3 rounded-xl px-3 py-2 text-sm font-bold text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              >
                {item.icon && (
                  <div className="flex h-5 w-5 items-center justify-center">
                    {item.icon}
                  </div>
                )}
                {item.label}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

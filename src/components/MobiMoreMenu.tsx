import React from 'react';
import { partitionMenuItems } from '../utils/menu';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn
} from '@wearemobi/ui';
import { MobiButton } from './MobiButton';

export interface MobiMoreMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface MobiMoreMenuProps {
  items: MobiMoreMenuItem[];
  title?: string;
  vertical?: boolean;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const MobiMoreMenu: React.FC<MobiMoreMenuProps> = ({
  items = [],
  title,
  vertical = false,
  className,
  side = 'bottom',
  align = 'end'
}) => {
  const { regularItems, dangerItems } = partitionMenuItems(items);

  const Icon = vertical ? MoreVertical : MoreHorizontal;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MobiButton variant="ghost" size="icon" className={cn("h-8 w-8 text-muted-foreground", className)}>
          <Icon size={18} />
          <span className="sr-only">Open actions menu</span>
        </MobiButton>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent side={side} align={align} sideOffset={4} className="w-48 rounded-xl p-0 overflow-hidden shadow-lg border-border/50">
        {title && (
          <div className="px-3 py-2.5 border-b border-border/50 bg-muted/10">
            <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">
              {title}
            </span>
          </div>
        )}

        {regularItems.length > 0 && (
          <div className="p-1 space-y-0.5">
            {regularItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => item.onClick?.()}
                className="gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium cursor-pointer"
              >
                {item.icon && (
                  <div className="flex h-4 w-4 items-center justify-center text-muted-foreground">
                    {item.icon}
                  </div>
                )}
                {item.label}
              </DropdownMenuItem>
            ))}
          </div>
        )}

        {dangerItems.length > 0 && (
          <div className="p-1 border-t border-border/50 bg-muted/30">
            {dangerItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => item.onClick?.()}
                className="gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-error focus:text-error focus:bg-error/10 cursor-pointer"
              >
                {item.icon && (
                  <div className="flex h-4 w-4 items-center justify-center">
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

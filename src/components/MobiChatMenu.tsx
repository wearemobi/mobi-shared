import React, { ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@wearemobi/ui';

export interface MobiChatMenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export interface MobiChatMenuProps {
  items: MobiChatMenuItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const MobiChatMenu: React.FC<MobiChatMenuProps> = ({
  items,
  open,
  onOpenChange,
  children,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 shadow-lg border-border/50">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={item.onClick}
            className="flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg focus:bg-muted/50"
          >
            {item.icon}
            <span className="font-sans font-medium text-sm">{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

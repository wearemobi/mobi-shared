import React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@wearemobi/ui';

export interface MobiSearchCommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

export interface MobiSearchCommandGroup {
  heading: string;
  items: MobiSearchCommandItem[];
}

export interface MobiSearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: MobiSearchCommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
}

export const MobiSearchCommand: React.FC<MobiSearchCommandProps> = ({
  open,
  onOpenChange,
  groups,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found."
}) => {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {groups.map((group, index) => (
          <React.Fragment key={group.heading}>
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    item.onSelect?.();
                    onOpenChange(false);
                  }}
                  className="gap-2"
                >
                  {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {index < groups.length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

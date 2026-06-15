import React from 'react';
import { MobiDrawer } from './MobiDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  cn
} from '@wearemobi/ui';
import { Menu, X } from 'lucide-react';

export interface MobiMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface MobiHamburgerMenuProps {
  items: MobiMenuItem[];
  title?: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'primary';
  mode?: 'dropdown' | 'drawer';
  triggerIcon?: React.ReactNode;
  activeTriggerIcon?: React.ReactNode;
}

export const MobiHamburgerMenu: React.FC<MobiHamburgerMenuProps> = ({
  items,
  title,
  className,
  variant = 'default',
  mode = 'dropdown',
  triggerIcon = <Menu className="w-5 h-5" />,
  activeTriggerIcon = <X className="w-5 h-5" />
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const regularItems = items.filter(i => !i.danger);
  const dangerItems = items.filter(i => i.danger);

  const triggerClass = cn(
    "p-2 rounded-xl transition-all active:scale-95 flex items-center justify-center outline-none",
    variant === 'ghost' ? 'text-muted-foreground hover:text-foreground hover:bg-accent' : 
    variant === 'primary' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 
    'bg-background border border-border text-foreground hover:bg-accent',
    className
  );

  if (mode === 'drawer') {
    return (
      <div className={cn("relative inline-block text-left", className)}>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className={triggerClass}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="Toggle actions"
        >
          {isOpen ? activeTriggerIcon : triggerIcon}
        </button>

        <MobiDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={title}
          position="right"
        >
          <div className="space-y-1">
            {regularItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { item.onClick?.(); setIsOpen(false); }}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all hover:bg-accent active:scale-[0.98]"
              >
                {item.icon && (
                  <div className="flex h-5 w-5 items-center justify-center text-muted-foreground group-hover:text-foreground">
                    {item.icon}
                  </div>
                )}
                <span>{item.label}</span>
              </button>
            ))}

            {dangerItems.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50">
                {dangerItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { item.onClick?.(); setIsOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-destructive transition-all hover:bg-destructive/5 active:scale-[0.98]"
                  >
                    {item.icon && (
                      <div className="flex h-5 w-5 items-center justify-center">
                        {item.icon}
                      </div>
                    )}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </MobiDrawer>
      </div>
    );
  }

  // Dropdown Mode
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={triggerClass}>
        {isOpen ? activeTriggerIcon : triggerIcon}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 rounded-2xl">
        {title && (
          <DropdownMenuLabel className="px-4 py-3 border-b text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </DropdownMenuLabel>
        )}
        
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
              <span className="truncate">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </div>

        {dangerItems.length > 0 && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <div className="p-2">
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
                  <span className="truncate">{item.label}</span>
                </DropdownMenuItem>
              ))}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

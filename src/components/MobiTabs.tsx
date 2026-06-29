import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, cn } from '@wearemobi/ui';

export interface MobiTabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type MobiTabsVariant = 'default' | 'underline' | 'pill';

export interface MobiTabsProps {
  items: MobiTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: MobiTabsVariant;
  /** Make tabs span full width equally */
  fullWidth?: boolean;
  className?: string;
}

const LIST_VARIANTS: Record<MobiTabsVariant, string> = {
  default: 'bg-muted/50 rounded-lg p-1 border border-border',
  underline: 'bg-transparent rounded-none p-0 border-b border-border gap-0',
  pill: 'bg-transparent rounded-none p-1.5 gap-1 h-auto',
};

const TRIGGER_VARIANTS: Record<MobiTabsVariant, string> = {
  default:
    'font-bold tracking-tight rounded-md data-[state=active]:shadow-sm transition-all',
  underline:
    'font-bold tracking-tight rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 transition-all',
  pill:
    'font-bold tracking-tight rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm px-5 py-2.5 transition-all',
};

export const MobiTabs: React.FC<MobiTabsProps> = ({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
  fullWidth = false,
  className
}) => {
  const initialValue = defaultValue || (items.length > 0 ? items[0].id : undefined);

  return (
    <Tabs
      defaultValue={initialValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full max-w-full", className)}
    >
      <TabsList
        className={cn(
          'w-full justify-start overflow-x-auto flex-nowrap scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          LIST_VARIANTS[variant],
          fullWidth ? 'w-full grid auto-cols-fr grid-flow-col' : 'inline-flex'
        )}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className={cn(
              'whitespace-nowrap shrink-0',
              fullWidth ? 'flex-1' : 'sm:flex-none',
              TRIGGER_VARIANTS[variant]
            )}
          >
            {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent
          key={item.id}
          value={item.id}
          className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};


import React from 'react';
import { Switch, Label, cn } from '@wearemobi/ui';

export interface MobiSwitcherProps extends Omit<React.ComponentProps<typeof Switch>, 'onChange'> {
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const MobiSwitcher = React.forwardRef<
  React.ElementRef<typeof Switch>,
  MobiSwitcherProps
>(({
  id,
  label,
  description,
  className,
  ...props
}, ref) => {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  return (
    <div className={cn("flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm", className)}>
      <div className="space-y-0.5">
        {label && <Label htmlFor={switchId} className="text-sm font-bold tracking-tight">{label}</Label>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <Switch id={switchId} ref={ref} {...props} />
    </div>
  );
});
MobiSwitcher.displayName = 'MobiSwitcher';

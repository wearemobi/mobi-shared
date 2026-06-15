import React from 'react';
import { Checkbox, Switch, Label, cn } from '@wearemobi/ui';

export type MobiCheckboxVariant = 'default' | 'toggle' | 'radio';

export interface MobiCheckboxProps extends Omit<React.ComponentProps<typeof Checkbox>, 'checked'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: MobiCheckboxVariant;
  checked?: boolean; // Radix Checkbox supports 'indeterminate', but Switch/Radio do not. Forcing boolean for unified API.
  error?: React.ReactNode | boolean;
}

export const MobiCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  MobiCheckboxProps
>(({
  id,
  label,
  description,
  variant = 'default',
  className,
  checked,
  onCheckedChange,
  error,
  ...props
}, ref) => {
  const generatedId = React.useId();
  const controlId = id || generatedId;

  const renderControl = () => {
    switch (variant) {
      case 'toggle':
        return (
          <Switch 
            id={controlId} 
            ref={ref as any}
            checked={checked} 
            onCheckedChange={onCheckedChange} 
            className={cn(error && "border-destructive data-[state=checked]:bg-destructive")}
            {...(props as any)} 
          />
        );
      case 'radio':
        return (
          <button
            type="button"
            role="radio"
            ref={ref as any}
            id={controlId}
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            onClick={() => onCheckedChange?.(true)} // Radios only activate
            className={cn(
              "peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center data-[state=checked]:border-primary",
              error && "border-destructive text-destructive data-[state=checked]:border-destructive"
            )}
            {...(props as any)}
          >
            {checked && <div className={cn("h-2 w-2 rounded-full bg-primary", error && "bg-destructive")} />}
          </button>
        );
      case 'default':
      default:
        return (
          <Checkbox 
            id={controlId} 
            ref={ref} 
            checked={checked} 
            onCheckedChange={onCheckedChange} 
            className={cn(error && "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive")}
            {...(props as any)} 
          />
        );
    }
  };

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="pt-0.5">
        {renderControl()}
      </div>
      {(label || description || error) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <Label
              htmlFor={controlId}
              className={cn(
                "text-sm font-bold tracking-tight cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                error && "text-destructive"
              )}
            >
              {label}
            </Label>
          )}
          {description && !error && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {error && typeof error === 'string' && (
            <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-0.5">
              <span className="w-1 h-1 rounded-full bg-destructive" /> {error}
            </p>
          )}
          {error && typeof error !== 'string' && typeof error !== 'boolean' && (
            <div className="text-xs font-medium text-destructive mt-0.5">{error}</div>
          )}
        </div>
      )}
    </div>
  );
});
MobiCheckbox.displayName = 'MobiCheckbox';

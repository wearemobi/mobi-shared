import React from 'react';
import { Input, Button, Label, cn } from '@wearemobi/ui';
import { Minus, Plus } from 'lucide-react';

export interface MobiQuantityControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const MobiQuantityControl = React.forwardRef<
  HTMLInputElement,
  MobiQuantityControlProps
>(({
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  label,
  className,
  disabled
}, ref) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(Math.max(min, value - step));
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(Math.min(max, value + step));
    }
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          type="button"
        >
          <Minus size={16} />
        </Button>
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          className="h-9 w-20 text-center font-mono font-bold"
          value={value}
          readOnly
          disabled={disabled}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          type="button"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
});
MobiQuantityControl.displayName = 'MobiQuantityControl';

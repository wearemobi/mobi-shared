import React from 'react';
import { Progress, cn } from '@wearemobi/ui';

export interface MobiProgressProps extends React.ComponentProps<typeof Progress> {
  value: number;
  label?: string;
  showValue?: boolean;
}

export const MobiProgress: React.FC<MobiProgressProps> = ({
  value,
  label,
  showValue = false,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-bold tracking-tight">
          {label && <span>{label}</span>}
          {showValue && <span className="text-muted-foreground">{Math.round(value)}%</span>}
        </div>
      )}
      <Progress value={value} className="h-2" {...props} />
    </div>
  );
};

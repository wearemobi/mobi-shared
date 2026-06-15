import React from 'react';
import { Skeleton, cn } from '@wearemobi/ui';

export interface MobiSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: number | string;
  height?: number | string;
}

export const MobiSkeleton: React.FC<MobiSkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  ...props
}) => {
  return (
    <Skeleton
      className={cn(
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'h-4 w-full rounded-md',
        variant === 'rectangular' && 'rounded-xl',
        className
      )}
      style={{
        width: width,
        height: height,
        ...props.style,
      }}
      {...props}
    />
  );
};

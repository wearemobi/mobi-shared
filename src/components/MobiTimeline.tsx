import React from 'react';
import { cn } from '@wearemobi/ui';
import { Check, AlertCircle } from 'lucide-react';

export interface MobiTimelineEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'default' | 'active' | 'completed' | 'error';
}

export interface MobiTimelineProps {
  events: MobiTimelineEvent[];
  className?: string;
}

export const MobiTimeline: React.FC<MobiTimelineProps> = ({ events, className }) => {
  return (
    <div className={cn('relative flex gap-6', className)}>
      {/* Left rail: dots + connecting line */}
      <div className="flex flex-col items-center">
        {events.map((event, index) => {
          const isCompleted = event.status === 'completed';
          const isActive = event.status === 'active';
          const isError = event.status === 'error';
          const isLast = index === events.length - 1;

          const dotClass = cn(
            'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-background',
            isCompleted && 'border-primary bg-primary text-primary-foreground',
            isActive && 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]',
            isError && 'border-destructive bg-destructive/10 text-destructive',
            !isCompleted && !isActive && !isError && 'border-border text-muted-foreground'
          );

          return (
            <React.Fragment key={event.id}>
              <div className={dotClass}>
                {event.icon ? event.icon
                  : isCompleted ? <Check size={11} strokeWidth={3} />
                  : isError ? <AlertCircle size={11} strokeWidth={2} />
                  : <div className={cn('h-1.5 w-1.5 rounded-full', isActive ? 'bg-blue-500' : 'bg-muted-foreground/40')} />}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'w-px flex-1 min-h-[28px] my-1',
                    isCompleted ? 'bg-primary/30' : 'bg-border/60'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Center: content rows */}
      <div className="flex flex-col flex-1 min-w-0">
        {events.map((event, index) => {
          const isCompleted = event.status === 'completed';
          const isActive = event.status === 'active';
          const isError = event.status === 'error';
          const isLast = index === events.length - 1;

          return (
            <div
              key={event.id}
              className={cn('flex flex-col pt-0.5', isLast ? 'pb-0' : 'pb-8')}
            >
              <div className="flex items-center gap-2">
                <h4 className={cn(
                  'text-sm font-semibold tracking-tight leading-none',
                  isActive && 'text-blue-500',
                  isCompleted && 'text-foreground',
                  isError && 'text-destructive',
                  !isActive && !isCompleted && !isError && 'text-muted-foreground'
                )}>
                  {event.title}
                </h4>
                {event.date && (
                  <span className="text-[10px] font-mono text-muted-foreground/70 shrink-0">
                    {event.date}
                  </span>
                )}
              </div>
              {event.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {event.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Right ghosted rail connector */}
      <div className="flex flex-col items-center">
        <div className="w-px h-full bg-border/25 rounded-full" />
      </div>
    </div>
  );
};

import React from 'react';
import { Textarea, Field, cn } from '@wearemobi/ui';

export interface MobiTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  technical?: boolean;
}

export const MobiTextarea = React.forwardRef<HTMLTextAreaElement, MobiTextareaProps>(({
  label,
  description,
  error,
  technical = false,
  className,
  id,
  ...props
}, ref) => {
  const fontStyles = technical ? 'font-mono' : 'font-sans';
  const hasError = !!error;
  const inputId = id || React.useId();

  return (
    <Field label={label} description={description} error={error} htmlFor={inputId} className={className}>
      <Textarea
        ref={ref}
        id={inputId}
        aria-invalid={hasError || undefined}
        className={cn(
          fontStyles,
          hasError && "border-destructive focus-visible:ring-destructive",
          "bg-background resize-y"
        )}
        {...(props as any)}
      />
    </Field>
  );
});
MobiTextarea.displayName = 'MobiTextarea';

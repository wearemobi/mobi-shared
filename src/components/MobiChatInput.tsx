import React, { useRef, useEffect } from 'react';
import { cn } from '@wearemobi/ui';
import { Paperclip, ArrowUp } from 'lucide-react';
import { MobiButton } from './MobiButton';

export interface MobiChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onAttach?: () => void;
  disabled?: boolean;
  placeholder?: string;
  modelSelector?: React.ReactNode;
  maxRows?: number;
}

export const MobiChatInput: React.FC<MobiChatInputProps> = ({
  value,
  onChange,
  onSend,
  onAttach,
  disabled = false,
  placeholder = "Type a message...",
  modelSelector,
  maxRows = 5,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate scrollHeight correctly
    textarea.style.height = 'auto';
    
    // Calculate new height, capped by maxRows roughly (assuming ~24px line height + padding)
    const lineHeight = 24;
    const padding = 16; // 8px top + 8px bottom
    const maxHeight = (maxRows * lineHeight) + padding;
    
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [value, maxRows]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const hasValue = value.trim().length > 0;

  return (
    <div className="flex items-end gap-2 p-2 rounded-[32px] bg-muted/40 border border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
      {onAttach && (
        <div className="shrink-0 mb-1 ml-1">
          <MobiButton
            variant="ghost"
            size="icon"
            onClick={onAttach}
            disabled={disabled}
            className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </MobiButton>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        className={cn(
          "flex-1 bg-transparent border-0 resize-none outline-none py-2.5 px-2 font-sans text-sm text-foreground placeholder:text-muted-foreground overflow-y-auto disabled:opacity-50"
        )}
        style={{ 
          lineHeight: '24px',
          minHeight: '44px',
          maxHeight: `${(maxRows * 24) + 16}px`
        }}
      />

      <div className="shrink-0 flex items-center gap-2 mb-1 mr-1">
        {modelSelector}
        
        <MobiButton
          variant={hasValue ? "solid" : "secondary"}
          size="icon"
          onClick={onSend}
          disabled={disabled || !hasValue}
          className={cn(
            "rounded-full w-9 h-9 transition-all duration-200",
            hasValue ? "bg-primary text-primary-foreground hover:bg-primary/90" : "opacity-50"
          )}
          aria-label="Send message"
        >
          <ArrowUp className="w-4 h-4" />
        </MobiButton>
      </div>
    </div>
  );
};

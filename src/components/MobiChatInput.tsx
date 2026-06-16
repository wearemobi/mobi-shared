import React, { useRef, useEffect } from 'react';
import { cn } from '@wearemobi/ui';
import { Paperclip } from 'lucide-react';
import { MobiButton } from './MobiButton';
import { MobiSendButton } from './MobiSendButton';

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
    <div className="flex flex-col gap-2 p-3 rounded-2xl bg-muted/40 border border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-sm">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={2}
        className={cn(
          "w-full bg-transparent border-0 resize-none outline-none px-1 font-sans text-sm text-foreground placeholder:text-muted-foreground overflow-y-auto disabled:opacity-50"
        )}
        style={{ 
          lineHeight: '24px',
          minHeight: '48px',
          maxHeight: `${(maxRows * 24) + 16}px`
        }}
      />

      <div className="flex items-center justify-between w-full mt-1">
        <div className="shrink-0">
          {onAttach && (
            <MobiButton
              variant="ghost"
              size="icon"
              onClick={onAttach}
              disabled={disabled}
              className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </MobiButton>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {modelSelector}
          
          <MobiSendButton 
            isActive={hasValue}
            disabled={disabled || !hasValue}
            onClick={onSend}
            aria-label="Send message"
          />
        </div>
      </div>
    </div>
  );
};

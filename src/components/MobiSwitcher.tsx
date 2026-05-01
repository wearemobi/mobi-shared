import React from 'react';

export interface MobiSwitcherOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface MobiSwitcherProps {
  options: MobiSwitcherOption[];
  activeId: string;
  onChange: (id: string) => void;
  hideLabel?: boolean;
  className?: string;
}

export const MobiSwitcher: React.FC<MobiSwitcherProps> = ({
  options,
  activeId,
  onChange,
  hideLabel = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-1 rounded-lg border border-mobi-border bg-mobi-bg/50 p-1 ${className}`}>
      {options.map((option) => {
        const isActive = option.id === activeId;
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`flex items-center gap-1.5 rounded-md transition-all text-[9px] font-black uppercase tracking-widest font-sans active:scale-95 ${
              hideLabel ? 'p-2' : 'px-2.5 py-1.5'
            } ${
              isActive 
                ? 'bg-mobi-surface shadow-sm text-mobi-text' 
                : 'text-mobi-text-muted/50 hover:text-mobi-text-muted hover:bg-mobi-surface/20'
            }`}
          >
            {option.icon && <span className="flex-shrink-0 opacity-80">{option.icon}</span>}
            {!hideLabel && option.label}
          </button>
        );
      })}
    </div>
  );
};

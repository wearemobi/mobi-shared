import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@wearemobi/ui';

export interface MobiLanguageToggleProps {
  language: string;
  onChange: (language: string) => void;
  className?: string;
}

export const MobiLanguageToggle: React.FC<MobiLanguageToggleProps> = ({
  language,
  onChange,
  className
}) => {
  return (
    <ToggleGroup 
      type="single" 
      value={language?.startsWith('es') ? 'es' : 'en'} 
      onValueChange={(val) => {
        if (val) onChange(val);
      }}
      className={`bg-transparent border border-mobi-border rounded-full p-0.5 gap-0 ${className || ''}`}
    >
      <ToggleGroupItem 
        value="es" 
        className="rounded-full text-xs font-bold h-7 px-3 data-[state=on]:bg-mobi-text data-[state=on]:text-mobi-bg text-mobi-text-muted hover:text-mobi-text"
      >
        ES
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="en" 
        className="rounded-full text-xs font-bold h-7 px-3 data-[state=on]:bg-mobi-text data-[state=on]:text-mobi-bg text-mobi-text-muted hover:text-mobi-text"
      >
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

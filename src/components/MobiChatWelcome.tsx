import React from 'react';
import { MobiBadge } from './MobiBadge';

export interface MobiChatWelcomeProps {
  greeting?: string;
  userName?: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  logo?: React.ReactNode;
}

export const MobiChatWelcome: React.FC<MobiChatWelcomeProps> = ({
  greeting = "What's the vibe",
  userName,
  suggestions = [],
  onSuggestionClick,
  logo
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center animate-in fade-in zoom-in duration-500">
      {logo && <div className="mb-6">{logo}</div>}
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent mb-2">
        {greeting}, <span className="text-primary">{userName}</span>
      </h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        How can I assist you today?
      </p>
      
      {suggestions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          {suggestions.map((s, i) => (
            <MobiBadge 
              key={i} 
              variant="outline" 
              className="cursor-pointer hover:bg-muted/50 transition-colors py-1.5 px-3 text-sm rounded-full"
              onClick={() => onSuggestionClick?.(s)}
            >
              {s}
            </MobiBadge>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn
} from '@wearemobi/ui';
import { ChevronDown } from 'lucide-react';

export interface MobiChatModel {
  slug: string;
  name?: string;
  engine_name?: string;
}

export interface MobiChatModelSelectorProps {
  models: MobiChatModel[];
  activeModelId?: string;
  onSelect: (id: string) => void;
}

export const MobiChatModelSelector: React.FC<MobiChatModelSelectorProps> = ({
  models,
  activeModelId,
  onSelect,
}) => {
  const activeModel = models.find(m => m.slug === activeModelId) || models[0];
  const displayName = activeModel?.name || activeModel?.engine_name || activeModel?.slug || "Select Model";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <span className="text-xs font-bold font-sans tracking-wide text-foreground">{displayName}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-lg border-border/50">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.slug}
            onClick={() => onSelect(model.slug)}
            className={cn(
              "cursor-pointer py-2 px-3 rounded-lg focus:bg-muted/50",
              model.slug === activeModelId && "bg-muted/30"
            )}
          >
            <span className="font-sans font-medium text-sm">
              {model.name || model.engine_name || model.slug}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

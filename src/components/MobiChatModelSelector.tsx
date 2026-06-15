import React from 'react';
import { MobiCombobox } from './MobiCombobox';

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
  const options = models.map(m => ({
    value: m.slug,
    label: m.name || m.engine_name || m.slug
  }));

  return (
    <MobiCombobox 
      options={options}
      value={activeModelId}
      onValueChange={onSelect}
      placeholder="Select Model"
    />
  );
};

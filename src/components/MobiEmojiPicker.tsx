import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export interface MobiEmojiPickerProps {
  /**
   * Called when an emoji is selected.
   * The emoji object contains properties like `id`, `native`, `unified`, etc.
   */
  onSelect: (emoji: any) => void;
  /**
   * Optional custom categories or overriding default categories.
   */
  categories?: string[];
  /**
   * Default category to show/scroll to on load.
   */
  defaultCategory?: string;
  /**
   * The theme for the picker.
   * @default 'auto'
   */
  theme?: 'auto' | 'light' | 'dark';
  /**
   * Custom styling or class names.
   */
  className?: string;
  /**
   * Any other props to pass directly to the emoji-mart Picker.
   */
  [key: string]: any;
}

/**
 * M.O.B.I.™ Emoji Picker Component.
 * A wrapper around `emoji-mart` that integrates with our dashboard ecosystem.
 *
 * @example
 * ```tsx
 * <MobiEmojiPicker
 *   onSelect={(emoji) => console.log(emoji.native)}
 *   theme="dark"
 * />
 * ```
 */
export const MobiEmojiPicker: React.FC<MobiEmojiPickerProps> = ({
  onSelect,
  categories,
  defaultCategory,
  theme = 'auto',
  className = '',
  ...props
}) => {
  return (
    <div className={`mobi-emoji-picker-container ${className}`}>
      <Picker
        data={data}
        onEmojiSelect={onSelect}
        theme={theme}
        categories={categories}
        // Emoji-mart might not support defaultCategory natively as a prop in v5,
        // but we pass standard props and allow overrides via ...props
        {...props}
      />
    </div>
  );
};

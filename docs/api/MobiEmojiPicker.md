# MobiEmojiPicker

A lightweight, centralized wrapper around `emoji-mart` for standardized emoji selection within the M.O.B.I.™ ecosystem. It seamlessly integrates with our design tokens and allows for custom category filtering.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `(emoji: any) => void` | `undefined` | **Required.** Called when an emoji is selected. The emoji object contains properties like `id`, `native`, and `unified`. |
| `categories` | `string[]` | `undefined` | Optional custom categories or overriding default categories. |
| `defaultCategory` | `string` | `undefined` | Default category to show/scroll to on load. |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | The theme for the picker. |
| `className` | `string` | `''` | Custom styling or class names. |
| `...props` | `any` | `{}` | Any other props to pass directly to the underlying `emoji-mart` Picker. |

## Example Usage

```tsx
import { useState } from 'react';
import { MobiEmojiPicker } from '@wearemobi/shared';

export function Example() {
  const [selectedEmoji, setSelectedEmoji] = useState('🍔');

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="text-4xl">{selectedEmoji}</div>
      <MobiEmojiPicker
        onSelect={(emoji) => setSelectedEmoji(emoji.native)}
        theme="dark"
        categories={['people', 'nature', 'foods']}
      />
    </div>
  );
}
```

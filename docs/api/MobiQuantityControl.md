# MobiQuantityControl

A highly customizable `+ / -` counter control for numerical inputs. It's ideal for shopping carts, asset allocation, or any interface requiring incremental numerical adjustments.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `undefined` | **Required.** The current quantity value. |
| `onChange` | `(value: number) => void` | `undefined` | **Required.** Called when the value changes (either by +/- buttons). |
| `min` | `number` | `0` | The minimum allowed value. |
| `max` | `number` | `undefined` | The maximum allowed value. |
| `step` | `number` | `1` | The step amount to increment or decrement by. |
| `hideMinusAtMin` | `boolean` | `false` | If true, the minus ("-") button will not be rendered when the value is less than or equal to `min`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Visual size of the control. |
| `className` | `string` | `''` | Additional CSS classes for the container. |

## Example Usage

```tsx
import { useState } from 'react';
import { MobiQuantityControl } from '@wearemobi/shared';

export function Example() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <span className="text-mobi-text">Item Quantity:</span>
      <MobiQuantityControl
        value={quantity}
        onChange={setQuantity}
        min={0}
        max={10}
        hideMinusAtMin={true}
        size="md"
      />
    </div>
  );
}
```

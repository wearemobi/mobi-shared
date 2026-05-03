# MobiProgress

High-precision progress indicator for M.O.B.I.™ technical workflows. Designed for monitoring long-running ingestion, processing, and synchronization tasks.

## Usage

```tsx
import { MobiProgress } from '@wearemobi/shared';

const MyComponent = () => {
  return (
    <MobiProgress 
      value={75} 
      label="Syncing Database" 
      status="750 / 1000 items" 
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `undefined` | Current progress percentage (0-100). |
| `label` | `string` | `undefined` | Optional label shown above the bar. |
| `status` | `string` | `undefined` | Optional sub-label shown above the bar (right-aligned). |
| `technical` | `boolean` | `false` | If true, uses a thinner (h-1.5) variant. |
| `className` | `string` | `""` | Additional CSS classes. |

## Aesthetic

The `MobiProgress` bar follows the MOBI Engineering DNA:
- **Movement**: Includes an animated technical texture (stripes) during progress to provide visual momentum.
- **Precision**: Transitions are set to 500ms with an `ease-out` curve for smooth updates.
- **Typography**: Labels use `font-black` uppercase, while status values use `font-mono`.

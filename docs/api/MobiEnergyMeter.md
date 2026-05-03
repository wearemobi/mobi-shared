# MobiEnergyMeter

A high-visibility technical battery indicator for M.O.B.I.™ interfaces. Perfect for monitoring hardware status, resource limits, or energy consumption in agentic environments.

## Usage

```tsx
import { MobiEnergyMeter } from '@wearemobi/shared';

const MyComponent = () => {
  return (
    <div className="flex gap-4">
      <MobiEnergyMeter value={80} size="md" />
      <MobiEnergyMeter value={15} size="sm" />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `undefined` | Current energy level (0-100). |
| `showPercentage` | `boolean` | `true` | If true, renders the numerical value next to the icon. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Scale of the meter icon and typography. |
| `className` | `string` | `""` | Additional CSS classes. |

## Features

- **Smart Coloring**: Transition colors automatically from emerald (high) to amber (medium) to rose (low).
- **Critical Alert**: Levels below 20% trigger a high-visibility pulse animation.
- **Precision Pin**: Includes a technical "battery pin" detail for a realistic hardware aesthetic.
- **Monospace Type**: Percentage labels use a heavy monospaced font for maximum legibility.

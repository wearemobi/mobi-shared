# MobiBentoIndicator

A specialized Bento component for dashboard indicators and metrics. It makes it incredibly easy to replicate premium metrics cards with large values, titles, and icons.

## Props

Extends `MobiBentoItemProps` (omitting `children`).

- **`title`** (`ReactNode`, optional): The title shown at the top left.
- **`value`** (`ReactNode`, required): The main large value to display.
- **`icon`** (`ReactNode`, optional): An icon displayed at the top right.
- **`footer`** (`ReactNode`, optional): Small sub-text or elements displayed at the bottom.
- **`valueColorClass`** (`string`, optional): Tailwind text color class for the value. Defaults to `text-mobi-text`.

## Usage

```tsx
import { MobiBentoGrid, MobiBentoIndicator, MobiIcon } from '@wearemobi/shared';

function DashboardMetrics() {
  return (
    <MobiBentoGrid columns={3}>
      <MobiBentoIndicator 
        colSpan={1}
        title="Revenue"
        value="$14,250.00"
        icon={<MobiIcon name="billing" className="text-emerald-500" />}
        footer="Monthly Run Rate"
      />
      <MobiBentoIndicator 
        colSpan={1}
        value="99.98%"
        valueColorClass="text-emerald-500"
        footer="Response SLA"
      />
    </MobiBentoGrid>
  );
}
```

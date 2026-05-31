# MobiDateTime

A standardized component for displaying dates and times with built-in formatting capabilities, sizing, and interaction support.

## Props

- **`value`** (`Date | string | number`, required): The date to display. Can be a Date object, timestamp, or ISO string.
- **`mode`** (`'date' | 'time' | 'datetime'`, optional): Display mode. Defaults to `'datetime'`.
- **`format`** (`string`, optional): Optional custom format string. Supports tokens: `YYYY, YY, MM, DD, HH, mm, ss, A`. Overrides standard formatting.
- **`size`** (`'sm' | 'md' | 'lg'`, optional): Size of the display. Defaults to `'md'`.
- **`onClick`** (`(e: MouseEvent) => void`, optional): Click handler. When provided, the component becomes interactable (hover/active states).
- **`className`** (`string`, optional): Additional container classes.
- **`showIcon`** (`boolean`, optional): Whether to show the leading icon (`calendar` for dates, `time` for time). Defaults to `true`.

## Usage

```tsx
import { MobiDateTime } from '@wearemobi/shared';

function ScheduleView() {
  return (
    <div className="flex gap-4">
      {/* Standard Locale Format */}
      <MobiDateTime 
        value={new Date()} 
        mode="date" 
        size="md" 
      />

      {/* Custom Formatting */}
      <MobiDateTime 
        value={new Date()} 
        format="DD/MM/YYYY HH:mm A"
        size="lg"
      />

      {/* Interactable */}
      <MobiDateTime 
        value={new Date()} 
        mode="time"
        onClick={() => alert("Time clicked!")} 
      />
    </div>
  );
}
```

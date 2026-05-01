# MobiLogo

> Official M.O.B.I.™ brand mark. Renders the app icon at a configurable size.

## Import
```tsx
import { MobiLogo } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `32` | Width and height in pixels |
| `className` | `string` | `""` | Additional CSS classes |

## Usage
```tsx
<MobiLogo size={64} />
<MobiLogo size={24} className="opacity-50" />
```

## Notes
- Uses the official SVG from `wearemobi.com/icon-light.svg`.
- The container enforces `minWidth` and `minHeight` to prevent collapse.

# MobiFooter

> Standard "Powered by M.O.B.I.™" branding footer. Theme-aware, zero config.

## Import
```tsx
import { MobiFooter } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `appName` | `string` | — | Name of the application to display |
| `version` | `string` | — | Version string (e.g. 'v1.0.0') |

## Usage
```tsx
// Simple usage
<MobiFooter />

// With app details
<MobiFooter appName="Sentinel Dashboard" version="v2.4.0" />
```

## Notes
- Logo automatically inverts in dark mode via the `light-invert` utility class.
- Includes copyright notice with the current year.

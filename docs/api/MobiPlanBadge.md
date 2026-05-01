# MobiPlanBadge

> Color-coded pill badge indicating a subscription tier.

## Import
```tsx
import { MobiPlanBadge } from '@wearemobi/shared';
import type { MobiPlan } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `plan` | `MobiPlan` | **required** | Tier identifier |
| `className` | `string` | `""` | Additional CSS classes |

## Plan Colors
| Plan | Color | Background |
|---|---|---|
| `FREE` | muted gray | `mobi-bg/50` |
| `BASIC` | blue-500 | `blue-500/10` |
| `PRO` | emerald-500 | `emerald-500/10` |
| `ULTRA` | mobi-primary | `mobi-primary/10` |
| `CUSTOM` | amber-500 | `amber-500/10` |
| `NOT_AVAILABLE` | rose-500 | `rose-500/10` |

## Usage
```tsx
<MobiPlanBadge plan="PRO" />
<MobiPlanBadge plan="ULTRA" />
```

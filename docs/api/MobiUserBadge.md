# MobiUserBadge

> Theme-aware user identity badge with two layout variants.

## Import
```tsx
import { MobiUserBadge } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `initials` | `string` | **required** | 1-2 characters for the avatar circle |
| `email` | `string` | **required** | User email |
| `name` | `string` | — | User full name |
| `plan` | `MobiPlan` | **required** | Subscription tier |
| `org` | `string` | `'M.O.B.I. HQ'` | Organization name |
| `variant` | `'condensed' \| 'expanded'` | `'condensed'` | Layout mode |
| `onClick` | `() => void` | — | Click handler (condensed mode) |
| `className` | `string` | `""` | Additional CSS classes |

## Variants

### Condensed (trigger button)
Compact pill with avatar + plan label. Use as a dropdown trigger.
```tsx
<MobiUserBadge variant="condensed" initials="CA" plan="PRO" email="dev@mobi.com" onClick={toggle} />
```

### Expanded (header)
Full-width card with avatar, name (or email), plan badge, and org name.
```tsx
<MobiUserBadge 
  variant="expanded" 
  initials="CA" 
  name="Carlos Quijano"
  email="dev@mobi.com" 
  plan="PRO" 
  org="Fleet HQ" 
/>
```

## Theme Behavior
Avatar colors invert automatically: **black circle on light**, **white circle on dark**.

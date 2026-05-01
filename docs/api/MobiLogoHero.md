# MobiLogoHero

> A theme-aware hero logo component that automatically switches between light and dark variants based on the current theme or system preference.

## Import
```tsx
import { MobiLogoHero } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `128` | Height in pixels (`number`) or Tailwind units (`string`) |
| `className` | `string` | `""` | Additional CSS classes for the `img` tag |

## Usage
```tsx
// Default size (128px)
<MobiLogoHero />

// Custom numeric size
<MobiLogoHero size={200} />

// Tailwind height class
<MobiLogoHero size="h-48" />

// With extra styling
<MobiLogoHero className="mt-8 scale-110" />
```

## Notes
- Automatically listens for `prefers-color-scheme` changes when theme is set to `system`.
- Fetches official assets from `wearemobi.com/logo-light.svg` and `wearemobi.com/logo-dark.svg`.
- Includes a built-in entrance animation (`fade-in zoom-in`).

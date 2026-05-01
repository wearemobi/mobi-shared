# useMobiTheme

> Theme state management with localStorage persistence and OS preference detection.

## Import
```tsx
import { useMobiTheme } from '@wearemobi/shared';
import type { MobiTheme } from '@wearemobi/shared';
```

## Returns
| Field | Type | Description |
|---|---|---|
| `theme` | `MobiTheme` | Current theme: `'light'` · `'dark'` · `'system'` |
| `setTheme` | `(theme: MobiTheme) => void` | Updates theme and persists to localStorage |

## Usage
```tsx
const { theme, setTheme } = useMobiTheme();

// Toggle
setTheme(theme === 'dark' ? 'light' : 'dark');

// Follow OS
setTheme('system');
```

## Behavior
- Persists to `localStorage` under key `mobi-theme`.
- Applies `.dark` class to `<html>` element automatically.
- In `system` mode, listens to `prefers-color-scheme` media query changes.
- SSR-safe: defaults to `'system'` when `window` is undefined.

# MobiSwitcher

> Compact segmented selector for configuration toggles.

## Import
```tsx
import { MobiSwitcher } from '@wearemobi/shared';
import type { MobiSwitcherOption } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `MobiSwitcherOption[]` | **required** | Selectable options |
| `activeId` | `string` | **required** | ID of the active option |
| `onChange` | `(id: string) => void` | **required** | Selection callback |
| `hideLabel` | `boolean` | `false` | Icon-only mode |
| `className` | `string` | `""` | Additional CSS classes |

### MobiSwitcherOption
| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Text label (hidden when `hideLabel`) |
| `icon` | `ReactNode` | Optional icon |

## Usage

### With labels (language selector)
```tsx
<MobiSwitcher
  options={[
    { id: 'ES', label: 'ES', icon: '🇸🇻' },
    { id: 'EN', label: 'EN', icon: '🇺🇸' }
  ]}
  activeId="ES"
  onChange={setLang}
/>
```

### Icon-only (theme selector)
```tsx
<MobiSwitcher
  hideLabel
  options={[
    { id: 'light', label: 'Light', icon: <SunIcon /> },
    { id: 'dark', label: 'Dark', icon: <MoonIcon /> }
  ]}
  activeId={theme}
  onChange={setTheme}
/>
```

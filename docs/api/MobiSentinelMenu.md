# MobiSentinelMenu

> Data-driven user dropdown with identity header, action items, language selector, and theme switcher.

## Import
```tsx
import { MobiSentinelMenu } from '@wearemobi/shared';
import type { MobiSentinelMenuUser, MobiSentinelMenuItem } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `user` | `MobiSentinelMenuUser` | **required** | User identity data |
| `items` | `MobiSentinelMenuItem[]` | `[]` | Menu actions |
| `showThemeSwitcher` | `boolean` | `true` | Show theme toggle |
| `showLangSwitcher` | `boolean` | `true` | Show language toggle |
| `showFontSizeSwitcher` | `boolean` | `false` | Show font size switcher toggle |
| `fontSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Active font size selection code |
| `onFontSizeChange` | `(size: 'sm' \| 'md' \| 'lg') => void` | — | Font size change callback |
| `lang` | `string` | — | Controlled language code |
| `onLangChange` | `(lang: string) => void` | — | Language change callback |
| `langOptions` | `{ id, label, icon }[]` | ES/EN | Language options |
| `className` | `string` | `""` | Additional CSS classes |

### MobiSentinelMenuUser
| Field | Type | Description |
|---|---|---|
| `initials` | `string` | Avatar initials |
| `email` | `string` | User email |
| `name` | `string?` | User full name (displayed in header) |
| `plan` | `MobiPlan` | Subscription tier |
| `org` | `string?` | Organization name |

### MobiSentinelMenuItem
| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display text |
| `icon` | `ReactNode?` | Icon element |
| `danger` | `boolean?` | Renders in red danger zone |
| `onClick` | `() => void?` | Click handler |

## Usage
```tsx
<MobiSentinelMenu
  user={{
    initials: 'CA',
    name: 'Carlos Quijano',
    email: 'carlos@wearemobi.com',
    plan: 'ULTRA',
    org: 'M.O.B.I. HQ'
  }}
  items={[
    { id: 'profile', label: 'Profile', icon: <UserIcon />, onClick: goProfile },
    { id: 'settings', label: 'Settings', icon: <GearIcon />, onClick: goSettings },
    { id: 'logout', label: 'Logout', icon: <LogoutIcon />, danger: true, onClick: handleLogout }
  ]}
  onLangChange={(lang) => console.log('Language:', lang)}
/>
```

## Behavior
- **Danger items** are automatically separated to a red-tinted footer.
- **Language state** supports controlled (`lang` + `onLangChange`) or uncontrolled (internal) modes.
- **Theme switcher** includes Light, System, and Dark options.
- Menu closes automatically when an item is clicked or when clicking outside.

# MobiNavbar

Standard M.O.B.I.™ Top Navigation Bar. Implements the official design system with a sticky, blurred background.

## Usage

```tsx
import { MobiNavbar, MobiSentinelMenu } from '@wearemobi/shared';

const App = () => {
  return (
    <MobiNavbar 
      title="M.O.B.I.™ Shared"
      onLogoClick={() => console.log('Home clicked')}
      rightContent={
        <MobiSentinelMenu 
          user={{ initials: 'CA', name: 'Carlos Quijano' }}
          items={[{ id: 'logout', label: 'Logout' }]}
        />
      }
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"M.O.B.I.™"` | Title text shown next to logo on tablet/desktop. |
| `onLogoClick` | `() => void` | `undefined` | Callback for logo/title click. |
| `rightContent` | `React.ReactNode` | `undefined` | Content rendered on the right side. |
| `className` | `string` | `""` | Additional CSS classes. |

## Responsive Behavior

- **Mobile (< 768px)**: Only the `MobiLogo` is visible. The `title` is hidden to save space.
- **Tablet/Desktop (>= 768px)**: Both the `MobiLogo` and the `title` are visible.

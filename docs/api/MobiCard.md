# MobiCard

Premium asset container component for M.O.B.I.™ applications. Provides a consistent structure for content blocks with an optional header and a technical metadata footer.

## Usage

```tsx
import { MobiCard } from '@wearemobi/shared';

const MyComponent = () => {
  return (
    <MobiCard title="System Overview">
      <p>All core reactors are stable and operating within optimal parameters.</p>
    </MobiCard>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Optional title rendered in the card header. |
| `children` | `React.ReactNode` | `undefined` | The content to render inside the card. |
| `className` | `string` | `""` | Additional CSS classes. |
| `footer` | `React.ReactNode` | `undefined` | Optional content for the technical footer area. |

## Aesthetic

The `MobiCard` represents the premium "Asset Container" of the M.O.B.I. fleet. It features:
- **Header**: Separated by a subtle border with a light background (`mobi-bg/30`).
- **Footer**: A clean metadata area at the bottom. It allows injecting custom text or components via the `footer` prop.
- **Rounding**: Uses `rounded-2xl` for a high-impact, premium feel while maintaining professional boundaries.
- **Shadow**: Deep shadow with a ring-1 highlight for depth.

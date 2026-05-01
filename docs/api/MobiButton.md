# MobiButton

Standard M.O.B.I.™ button component with a "technical" aesthetic (reduced rounding). Supports multiple variants, sizes, and icons.

## Usage

```tsx
import { MobiButton } from '@wearemobi/shared';

const MyComponent = () => {
  return (
    <div className="flex gap-4">
      <MobiButton variant="solid">Submit</MobiButton>
      <MobiButton variant="outline">Settings</MobiButton>
      <MobiButton variant="ghost">Cancel</MobiButton>
    </div>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'danger'` | `'solid'` | The visual style of the button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size/padding of the button. |
| `technical` | `boolean` | `false` | If true, uses `font-mono` and tighter padding. |
| `icon` | `React.ReactNode` | `undefined` | Optional icon to render before the text. |
| `disabled` | `boolean` | `false` | Standard HTML disabled state. |
| `className` | `string` | `""` | Additional CSS classes. |

## Variants

- **Solid**: Filled background using `mobi-primary` color.
- **Outline**: Bordered button. Switches to solid on hover.
- **Ghost**: No background/border, useful for "Cancel" or "Dismiss" actions.
- **Danger**: Red-tinted outlined button for destructive actions.

## Aesthetic

MOBI buttons follow a "technical" design language. Instead of high-radius rounded corners and sans fonts, they use:
- **Font**: `font-mono` (JetBrains Mono) for an engineering feel.
- **Rounding**:
  - `sm`: `rounded-md` (4px)
  - `md`: `rounded-lg` (8px)
  - `lg`: `rounded-xl` (12px)

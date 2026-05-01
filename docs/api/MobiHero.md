# MobiHero

High-impact header section for landing pages. Implements the official typography and spacing from the Core Blueprint.

## Usage

```tsx
import { MobiHero } from '@wearemobi/shared';

const Home = () => {
  return (
    <MobiHero 
      title="M.O.B.I.™ Shared" 
      subtitle="Common UI"
      description="Universal UI & Logic Shield for the M.O.B.I.™ Grand Fleet."
    >
      <button className="...">Get Started</button>
    </MobiHero>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **Required** | Primary heading text. |
| `subtitle` | `string` | `undefined` | Muted subtitle text shown after the title. |
| `logo` | `React.ReactNode` | `undefined` | Optional logo or image to render above the title. |
| `description` | `React.ReactNode` | `undefined` | Descriptive paragraph text. |
| `children` | `React.ReactNode` | `undefined` | Content rendered below the description. |
| `className` | `string` | `""` | Additional CSS classes for the container. |

## Layout

The component is centered by default and uses responsive padding (`py-12` on mobile, `py-20` on desktop). The title scales from `text-4xl` to `text-6xl`.

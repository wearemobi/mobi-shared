# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> MobiThemeSwitcher Component

The `MobiThemeSwitcher` component is a premium, compact standalone theme selector that toggles between Light, Auto, and Dark modes. It provides a visual segment control utilizing animated HSL bubbles and refined SVG icons.

## Import

```tsx
import { MobiThemeSwitcher } from '@wearemobi/shared';
```

## Basic Usage

### Controlled Mode

By default, the switcher can be bound to the global `useMobiTheme()` hooks:

```tsx
import { MobiThemeSwitcher, useMobiTheme } from '@wearemobi/shared';

const MyComponent = () => {
  const { theme, setTheme } = useMobiTheme();
  
  return (
    <MobiThemeSwitcher 
      theme={theme}
      onChange={setTheme}
    />
  );
};
```

### Uncontrolled Mode

If no properties are passed, the switcher falls back to internal state automatically:

```tsx
<MobiThemeSwitcher />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark' \| 'auto'` | `undefined` | Active theme selection. If omitted, uses internal state. |
| `onChange` | `(theme: 'light' \| 'dark' \| 'auto') => void` | `undefined` | Callback triggered when the theme is toggled. |
| `className` | `string` | `""` | Additional CSS classes. |

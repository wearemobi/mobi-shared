# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> MobiLangSwitcher Component

The `MobiLangSwitcher` component is a premium, compact standalone language selector to toggle between English (`en`) and Spanish (`es`). It showcases bold, crisp uppercase texts `EN` and `ES` instead of heavy flags or icons, ensuring streamlined elegance.

## Import

```tsx
import { MobiLangSwitcher } from '@wearemobi/shared';
```

## Basic Usage

### Controlled Mode

The switcher can be controlled dynamically by parent states:

```tsx
import { useState } from 'react';
import { MobiLangSwitcher } from '@wearemobi/shared';

const MyComponent = () => {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  
  return (
    <MobiLangSwitcher 
      lang={lang}
      onChange={setLang}
    />
  );
};
```

### Uncontrolled Mode

If no properties are passed, the switcher falls back to internal state automatically:

```tsx
<MobiLangSwitcher />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `lang` | `'en' \| 'es'` | `undefined` | Active language selection. If omitted, uses internal state. |
| `onChange` | `(lang: 'en' \| 'es') => void` | `undefined` | Callback triggered when the selection is changed. |
| `className` | `string` | `""` | Additional CSS classes. |

# MobiMoreMenu

A streamlined dropdown menu triggered by a 3-dots "more" icon, ideal for action toolbars, table rows, and contextual menus. It wraps `MobiHamburgerMenu` under the hood.

## Props

- **`items`** (`MobiMenuItem[]`): Array of items for the dropdown. Same signature as `MobiHamburgerMenu`.
- **`horizontal`** (`boolean`, optional): If true, uses the horizontal dots icon (`more-horizontal`) instead of the vertical one (`more-vertical`).
- **`variant`** (`'default' | 'ghost' | 'primary'`, optional): Button style. Defaults to `ghost`.
- **`mode`** (`'dropdown' | 'drawer'`, optional): Presentation style. Defaults to `dropdown`.

## Usage

```tsx
import { MobiMoreMenu } from '@wearemobi/shared';

function MyToolbar() {
  return (
    <MobiMoreMenu 
      items={[
        { id: 'edit', label: 'Edit Item' },
        { id: 'delete', label: 'Delete Item', danger: true, onClick: () => alert('Deleted!') }
      ]}
    />
  );
}
```

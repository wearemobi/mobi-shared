# MobiConfirm

A streamlined wrapper around `MobiModal` specifically tailored for simple Yes/No confirmation dialogs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `undefined` | **Required.** Controls visibility of the confirmation dialog. |
| `onClose` | `() => void` | `undefined` | **Required.** Called when the dialog is closed without confirming. |
| `onConfirm` | `() => void` | `undefined` | **Required.** Called when the confirmation button is clicked. |
| `title` | `React.ReactNode` | `undefined` | The title of the dialog. |
| `message` | `React.ReactNode` | `undefined` | The message/body of the dialog. |
| `confirmText` | `string` | `"Yes"` | Text for the confirmation button. |
| `cancelText` | `string` | `"No"` | Text for the cancellation button. |
| `intent` | `'danger' \| 'warning' \| 'info'` | `"info"` | Intent of the confirmation action, affects the confirm button color (e.g., `'danger'` makes it red). |
| `isLoading` | `boolean` | `false` | If true, shows a loading spinner on the confirm button and disables interaction. |

## Example Usage

```tsx
import { useState } from 'react';
import { MobiButton, MobiConfirm } from '@wearemobi/shared';

export function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Perform delete action...
    setIsOpen(false);
  };

  return (
    <>
      <MobiButton variant="danger" onClick={() => setIsOpen(true)}>
        Delete Account
      </MobiButton>
      
      <MobiConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        intent="danger"
      />
    </>
  );
}
```

# MobiChatInput

The M.O.B.I.™ Command Center. A high-impact, technical chat input component designed for agentic workflows. Features an auto-expanding text area, integrated toolbar with action slots, and status monitoring.

## Usage

```tsx
import { MobiChatInput } from '@wearemobi/shared';

const MyComponent = () => {
  const handleSend = (msg: string) => {
    console.log('Sending command:', msg);
  };

  return (
    <MobiChatInput 
      onSend={handleSend} 
      placeholder="Deploy to OCI..." 
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onSend` | `(message: string) => void` | `undefined` | Callback triggered on Send or Enter key. |
| `placeholder` | `string` | `'Ask M.O.B.I...'` | Placeholder text. |
| `isProcessing` | `boolean` | `false` | Disables input and shows a thinking state. |
| `statusMessage` | `string` | `...` | Technical status text in the footer. |
| `onAttachClick` | `() => void` | `undefined` | Handler for the attachment button. |
| `onToolsClick` | `() => void` | `undefined` | Handler for the tools/config button. |
| `className` | `string` | `""` | Additional CSS classes. |

## Features

- **Auto-Expanding**: Textarea grows dynamically with content (up to a max-height).
- **Integrated Actions**: Built-in support for attachments and tool configurations using standard `MobiButton` elements.
- **Visual Feedback**: Real-time status dot and animated "Thinking" state during processing.
- **MOBI Keyboard Support**: `Enter` to send, `Shift+Enter` for new lines.

## Aesthetic

Designed to look like a hardware console or an engineering terminal:
- **Geometry**: Precision rounded corners with a subtle internal ring highlight.
- **Typography**: Uses `font-sans` for input readability and `font-mono` for metadata and buttons.
- **Elevated Context**: Features a dedicated footer for system status information.

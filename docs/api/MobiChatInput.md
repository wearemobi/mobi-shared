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
| `statusMessage` | `string` | `'Powered by MobiAI'` | Technical status text in the footer. |
| `energy` | `number` | `100` | Energy/Battery level (0-100) shown in the footer. |
| `activeModelId` | `string` | `'fast'` | Currently selected model ID for the switcher. |
| `onModelChange` | `(id: string) => void` | `undefined` | Callback triggered when a new model is selected. |
| `onAttachClick` | `() => void` | `undefined` | Handler for the attachment button. |
| `className` | `string` | `""` | Additional CSS classes. |

## Features

- **Condensed Command Action**: The send button has been optimized to a minimalist 32x32px action frame.
- **Model In-Situ Switching**: Integrated `MobiSwitcher` for seamless transitioning between `Fast`, `Pro`, and `Expert` models.
- **Status Context**: Dynamic footer that reflects processing states and AI signature.

## Aesthetic

Designed to look like a hardware console or an engineering terminal:
- **Geometry**: Precision rounded corners with a subtle internal ring highlight.
- **Typography**: Uses `font-sans` for input readability and `font-mono` for metadata and buttons.
- **Elevated Context**: Features a dedicated footer for system status information.

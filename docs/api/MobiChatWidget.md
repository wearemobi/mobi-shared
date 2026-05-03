# MobiChatWidget

A sovereign, floating agentic interface for the M.O.B.I.™ ecosystem. It provides an autonomous pop-up window that encapsulates chat history, model selection, and energy monitoring.

## Usage

```tsx
import { MobiChatWidget } from '@wearemobi/shared';

const App = () => {
  return (
    <div>
      {/* Rest of your app */}
      <MobiChatWidget title="Agentic Link" initialEnergy={100} />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialEnergy` | `number` | `100` | Starting energy level for the session. |

## Features

- **Floating Trigger**: A circular, high-visibility button with a technical pulse animation.
- **Autonomous State**: Internally manages chat history and energy using `useMobiChat`.
- **Responsive Popup**: A fixed-width, animated window optimized for desktop and mobile viewports.
- **Header Status**: Integrated connection status and branding.
- **Glassmorphism**: Premium frosted-glass aesthetics with 50px soft shadows.

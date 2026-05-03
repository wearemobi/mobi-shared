# MobiChatWidget

A sovereign, floating agentic interface for the M.O.B.I.™ ecosystem. It provides an autonomous pop-up window that encapsulates chat history, model selection, and energy monitoring.

## Usage

```tsx
import { MobiChatWidget } from '@wearemobi/shared';

const App = () => {
  return (
    <MobiChatWidget 
      title="MobiAi Chat"
      userInitials="CQ"
      userPlan="PRO"
      placeholder="Ask me anything..."
      initialEnergy={100} 
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialEnergy` | `number` | `100` | Starting energy level for the session. |
| `title` | `string` | `'MobiAi Chat'` | Title displayed in the chat header. |
| `userInitials` | `string` | `-` | Initials for the header user badge (renders mini version). |
| `userPlan` | `MobiPlan` | `'FREE'` | Subscription plan for the user badge. |
| `placeholder` | `string` | `'Ask M.O.B.I...'` | Input text placeholder. |
| `userLabel` | `string` | `'COMMAND • SYNC'` | Technical label for user messages. |
| `assistantLabel` | `string` | `'AGENT • PROCESSED'` | Technical label for assistant messages. |
| `isOpen` | `boolean` | `undefined` | Controlled mode: force open/closed state. |
| `onToggle` | `(isOpen: boolean) => void` | `undefined` | Callback for state changes. |

## Features

- **Controlled Orchestration**: Can be opened externally from dashboard menus or sidebar links using the `isOpen` prop.
- **Floating Trigger**: A circular, high-visibility button with a technical pulse animation.
- **Autonomous State**: Internally manages chat history and energy using `useMobiChat`.
- **Responsive Popup**: A fixed-width, animated window optimized for desktop and mobile viewports.
- **Header Status**: Integrated connection status and branding.
- **Glassmorphism**: Premium frosted-glass aesthetics with 50px soft shadows.

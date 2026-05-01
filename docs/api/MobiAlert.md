# MobiAlert

> Animated toast notification with auto-dismiss, type-based icons, and a progress bar.

## Import
```tsx
import { MobiAlert } from '@wearemobi/shared';
import type { AlertType } from '@wearemobi/shared';
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | **required** | Main notification text |
| `title` | `string` | — | Optional micro-label above the message |
| `type` | `AlertType` | `'info'` | `'info'` · `'success'` · `'warning'` · `'error'` |
| `onClose` | `() => void` | — | Dismiss callback (renders close button) |
| `onCopy` | `() => void` | — | Copy callback (renders copy button) |
| `className` | `string` | `""` | Additional CSS classes |
| `duration` | `number` | `5000` | Auto-close in ms. Set `0` to disable |

## Usage
```tsx
<MobiAlert
  title="Sentinel Notice"
  message="Operation completed successfully."
  type="success"
  duration={3000}
  onClose={() => setAlert(null)}
  onCopy={() => copy(message)}
/>
```

## Notes
- Entry animation: fade + slide up + scale.
- Progress bar uses the `mobi-progress` keyframe defined in `styles.css`.
- The `onClose` callback fires after the 300ms exit transition completes.

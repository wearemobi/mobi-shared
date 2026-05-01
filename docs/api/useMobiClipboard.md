# useMobiClipboard

> Copy-to-clipboard with transient feedback state.

## Import
```tsx
import { useMobiClipboard } from '@wearemobi/shared';
```

## Returns
| Field | Type | Description |
|---|---|---|
| `copy` | `(text: string) => Promise` | Copies text to clipboard |
| `isCopied` | `boolean` | `true` for 2 seconds after a successful copy |

## Usage
```tsx
const { copy, isCopied } = useMobiClipboard();

<button onClick={() => copy('Hello, Fleet!')}>
  {isCopied ? '✓ Copied' : 'Copy'}
</button>
```

## Behavior
- Uses the Navigator Clipboard API.
- `isCopied` resets to `false` after 2 seconds automatically.
- Logs errors to console with `M.O.B.I. Clipboard Error:` prefix.

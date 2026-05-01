# useMobiAuth

> Authentication hook for the M.O.B.I.™ JS Bridge. Currently a stub.

## Import
```tsx
import { useMobiAuth } from '@wearemobi/shared';
```

## Parameters
| Param | Type | Description |
|---|---|---|
| `appId` | `string?` | Application identifier for multi-app auth scoping |

## Returns
| Field | Type | Description |
|---|---|---|
| `isAuthenticated` | `boolean` | Whether the user is authenticated |
| `user` | `any \| null` | User object (null when not authenticated) |
| `loading` | `boolean` | Whether an auth operation is in progress |
| `login` | `() => void` | Initiates login flow |
| `logout` | `() => void` | Clears authentication state |

## Usage
```tsx
const { isAuthenticated, user, login, logout } = useMobiAuth('my-app');

if (!isAuthenticated) {
  return <button onClick={login}>Login</button>;
}
```

## Status
> ⚠️ **Stub** — This hook currently logs to console. Will integrate with JS Bridge v1.19.

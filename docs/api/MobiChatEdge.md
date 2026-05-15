# MobiChatEdge

The M.O.B.I.™ Agent Interface. A full-featured chat widget that connects to the MobiEdge Reactor API. Supports session persistence, agent targeting, and dynamic intelligence switching.

## Usage

```tsx
import { MobiChatEdge } from '@wearemobi/shared';

const MyChat = () => {
  return (
    <MobiChatEdge 
      token="YOUR_BEARER_TOKEN"
      tenantId="YOUR_TENANT_ID"
      agentId="mobi-core"
      persistSession={true}
      title="MobiAI Assistant"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `token` | `string` | **Required** | Bearer token for Edge Reactor authorization. |
| `tenantId` | `string` | `'MOBI'` | The sovereign tenant ID. |
| `baseUrl` | `string` | `undefined` | Custom Edge Reactor URL. Defaults to production sandbox. |
| `agentId` | `string` | `'mobi-core'` | The specific Sentinel agent ID to target. |
| `persistSession`| `boolean` | `true` | If true, saves the conversation state in local storage. |
| `title` | `string` | `'MobiEdge Agent'`| Title shown in the chat header. |
| `placeholder` | `string` | `'Ask MobiAI...'`| Input placeholder. |
| `isInitiallyOpen`| `boolean` | `false` | Whether the widget starts open. |
| `suggestions` | `string[]` | `[]` | Static quick-reply pills (overridden by API suggestions). |

## Integration Details

- **Protocol**: Strictly follows the **v1.4.0** specification using the `/api/v1/` formalized endpoints.
- **Persistence**: Automatically tracks `conversationId` via LocalStorage using a unique key derived from `tenantId` and `agentId`.
- **Haki Logic**: Dynamically calculates and displays the energy meter based on the `haki_limit` and `haki_used` returned by the Reactor.
- **Connectivity**: Real-time health monitoring of the Edge infrastructure with visual "OFFLINE" indicators.

## Branding & Multi-Tenancy

The widget is designed for sovereign white-labeling. You can easily customize the agent persona and visual cues per tenant.

### Example: ACME Integration

```tsx
<MobiChatEdge 
  title="ACME Sentinel"
  token="ACME_SECURE_TOKEN"
  tenantId="ACME"
  agentId="acme-helper"
  placeholder="How can ACME help you today?"
  customWelcome="Welcome to ACME Logistics. Agentic Link established."
  containerClassName="fixed bottom-10 right-10"
/>
```

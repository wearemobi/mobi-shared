# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · `@wearemobi/shared` v1.3.2

> Universal UI & Logic Shield for the M.O.B.I.™ Grand Fleet

## Quick Start

```bash
npm install @wearemobi/shared
```

```tsx
import { MobiNavbar, MobiSentinelMenu, MobiFooter, MobiAlert, useMobiTheme } from '@wearemobi/shared';
```

## Components

| Component | Description |
|---|---|
| `MobiNavbar` | Sticky top navigation bar with responsive logo/text |
| `MobiHero` | High-impact header section for landing pages |
| `MobiSidebar` | Responsive navigation drawer for app layouts |
| `MobiButton` | Standard button with variants and icon support |
| `MobiLogo` | Official brand mark at configurable size |
| `MobiFooter` | "Powered by M.O.B.I.™" branding footer |
| `MobiAlert` | Toast notification with auto-dismiss and progress bar |
| `MobiPlanBadge` | Color-coded subscription tier pill |
| `MobiUserBadge` | Theme-aware identity badge (condensed/expanded) |
| `MobiSwitcher` | Compact segmented selector (theme, language, etc.) |
| `MobiSentinelMenu` | Data-driven user dropdown with identity + config |
| `MobiDropbox` | **(Updated)** High-performance drag-and-drop with Automated Vault Ingestion support |

## Hooks

| Hook | Description |
|---|---|
| `useMobiTheme` | Theme persistence + system preference detection |
| `useMobiAuth` | Authentication stub for JS Bridge v1.19 |
| `useMobiClipboard` | Copy-to-clipboard with feedback state |
| `useMobiVault` | **(Updated)** Sovereign client for the M.O.B.I.™ Vault microservice |
| `useMobiReactor` | **(Updated)** Sovereign client for the M.O.B.I.™ Energy Reactor |
| `useMobiAgentic` | **(New)** Sovereign client for the M.O.B.I.™ Agentic AI |

## Fleet Integration (v1.3.2)

Standardized clients for the local M.O.B.I.™ k8s sandbox microservice ecosystem.

### Mobi-Agentic
Interact with the sovereign AI engine.

```tsx
const { chat } = useMobiAgentic();
const response = await chat("Analyze this structure.");
```

### Mobi-Vault
Automate file ingestion via `MobiDropbox`.

```tsx
<MobiDropbox 
  vaultUrl="http://vault.engine.sandbox.grandfleet.local"
  onVaultSuccess={(metadata) => console.log(metadata)}
/>
```

### Mobi-Reactor
Track energy consumption and query history.

```tsx
const { consume } = useMobiReactor();
consume({ entityId: 'A1', entityType: 'AGENT', hakiAmount: 50 });
```

## Documentation

- **[API Reference](./docs/api/README.md)** — Full prop tables and usage examples for every component.
- **Interactive Catalog** — Run `npm run example` and click **Docs** in the header.
- **[Specs](./docs/specs/)** — Version-based architecture decisions (SDD).

## Development

```bash
# Run the interactive example + docs catalog
npm run example

# Build the distributable library
npm run build
```

## Agentic Architecture
This repository utilizes a hidden `.agent/` directory as the Single Source of Truth for AI assistants.

- **Knowledge Base:** `.agent/knowledge/` (SDD, Git, Governance).
- **Master Rules:** `.agent/knowledge/agent/mobi-master-agent-rules.md`.
- **Branding DNA:** `.agent/identity/` (Headers, Footers, Fragments).

### 🛰️ MOBI DNA Injection
As a project derived from the **M.O.B.I.™ Grand Fleet**, you must stay aligned with the Imperial SSoT. To update governance, identity DNA, and agentic rules, simply instruct your AI assistant:

> "Inyecta el DNA de MOBI"

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<!-- M.O.B.I. Core: SDD-Compliant-V2.0 | Sentinel-Status: ACTIVE -->

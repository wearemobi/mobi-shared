# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · `@wearemobi/shared` v1.2.5

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
| `MobiButton` | Standard button with variants and icon support |
| `MobiLogo` | Official brand mark at configurable size |
| `MobiFooter` | "Powered by M.O.B.I.™" branding footer |
| `MobiAlert` | Toast notification with auto-dismiss and progress bar |
| `MobiPlanBadge` | Color-coded subscription tier pill |
| `MobiUserBadge` | Theme-aware identity badge (condensed/expanded) |
| `MobiSwitcher` | Compact segmented selector (theme, language, etc.) |
| `MobiSentinelMenu` | Data-driven user dropdown with identity + config |

## Hooks

| Hook | Description |
|---|---|
| `useMobiTheme` | Theme persistence + system preference detection |
| `useMobiAuth` | Authentication stub for JS Bridge v1.19 |
| `useMobiClipboard` | Copy-to-clipboard with feedback state |

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
<!-- M.O.B.I. Core: SDD-Compliant-V1.7 | Sentinel-Status: ACTIVE -->

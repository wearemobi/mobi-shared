# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · `@wearemobi/shared` API Reference

> Universal UI & Logic Shield for the M.O.B.I.™ Grand Fleet

## Quick Start

```bash
npm install @wearemobi/shared
```

```tsx
import { MobiSentinelMenu, MobiFooter, MobiAlert, useMobiTheme } from '@wearemobi/shared';
```

The library ships with its own CSS (Tailwind v4 + MOBI design tokens). Styles are injected automatically on import.

## Components

| Component | Description | Docs |
|---|---|---|
| [`MobiNavbar`](./MobiNavbar.md) | Sticky top navigation bar with responsive logo/text |
| [`MobiHero`](./MobiHero.md) | High-impact header section for landing pages |
| [`MobiButton`](./MobiButton.md) | Standard button with variants and icon support |
| [`MobiLogo`](./MobiLogo.md) | Official brand mark at configurable size |
| [`MobiLogoHero`](./MobiLogoHero.md) | Theme-aware hero logo for landing pages |
| [`MobiFooter`](./MobiFooter.md) | Parametric branding footer with app metadata support |
| [`MobiAlert`](./MobiAlert.md) | Toast notification with auto-dismiss and progress bar |
| [`MobiPlanBadge`](./MobiPlanBadge.md) | Color-coded subscription tier pill |
| [`MobiUserBadge`](./MobiUserBadge.md) | Theme-aware user identity badge (condensed/expanded) |
| [`MobiSwitcher`](./MobiSwitcher.md) | Compact segmented selector (theme, language, etc.) |
| [`MobiSentinelMenu`](./MobiSentinelMenu.md) | Data-driven user dropdown with identity + config |

## Hooks

| Hook | Description | Docs |
|---|---|---|
| [`useMobiTheme`](./useMobiTheme.md) | Theme state with localStorage persistence |
| [`useMobiAuth`](./useMobiAuth.md) | Authentication stub for JS Bridge v1.19 |
| [`useMobiClipboard`](./useMobiClipboard.md) | Copy-to-clipboard with transient feedback state |

## Design Tokens

All components use semantic CSS variables from the MOBI token system:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `mobi-bg` | `#F8FAFC` | `#000000` | Page background |
| `mobi-surface` | `#ffffff` | `#111111` | Card / panel background |
| `mobi-surface-hover` | `#F1F5F9` | `#1f1f1f` | Interactive hover state |
| `mobi-border` | `#E2E8F0` | `#222222` | Borders and dividers |
| `mobi-text` | `#0F172A` | `#F8FAFC` | Primary text |
| `mobi-text-muted` | `#64748B` | `#94A3B8` | Secondary / label text |
| `mobi-primary` | `#0F172A` | `#F8FAFC` | Brand accent |

**Typography:** Inter (sans), JetBrains Mono (mono)

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<!-- M.O.B.I. Core: SDD-Compliant-V1.7 | Sentinel-Status: ACTIVE -->

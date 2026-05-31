# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · `@wearemobi/shared` API Reference

> Universal UI & Logic Shield for the M.O.B.I.™ Grand Fleet

## Quick Start

```bash
npm install @wearemobi/shared
```

```tsx
import { MobiChatEdge, MobiButton, useMobiEdge } from '@wearemobi/shared';
```

## Components (Alphabetical)

| Component | Description | Docs |
|---|---|---|
| [`MobiAlert`](./MobiAlert.md) | Toast notification with auto-dismiss and progress bar | [Link](./MobiAlert.md) |
| [`MobiButton`](./MobiButton.md) | Standard button with variants and icon support | [Link](./MobiButton.md) |
| [`MobiCard`](./MobiCard.md) | Premium content container with elevation | [Link](./MobiCard.md) |
| [`MobiChatEdge`](./MobiChatEdge.md) | **Full Agent Interface** for Edge Reactor v1 | [Link](./MobiChatEdge.md) |
| [`MobiChatInput`](./MobiChatInput.md) | Advanced command input for agentic logic | [Link](./MobiChatInput.md) |
| [`MobiConfirm`](./MobiConfirm.md) | Streamlined Yes/No confirmation dialog wrapper | [Link](./MobiConfirm.md) |
| [`MobiEmojiPicker`](./MobiEmojiPicker.md) | Categorized emoji selection via emoji-mart | [Link](./MobiEmojiPicker.md) |
| [`MobiEnergyMeter`](./MobiEnergyMeter.md) | Haki/Battery level visualizer | [Link](./MobiEnergyMeter.md) |
| [`MobiFooter`](./MobiFooter.md) | Parametric branding footer with app metadata | [Link](./MobiFooter.md) |
| [`MobiHero`](./MobiHero.md) | High-impact header section for landing pages | [Link](./MobiHero.md) |
| [`MobiLangSwitcher`](./MobiLangSwitcher.md) | Premium language selector (EN/ES) | [Link](./MobiLangSwitcher.md) |
| [`MobiLogo`](./MobiLogo.md) | Official brand mark | [Link](./MobiLogo.md) |
| [`MobiLogoHero`](./MobiLogoHero.md) | Theme-aware hero logo | [Link](./MobiLogoHero.md) |
| [`MobiNavbar`](./MobiNavbar.md) | Sticky top navigation bar | [Link](./MobiNavbar.md) |
| [`MobiPlanBadge`](./MobiPlanBadge.md) | Subscription tier pill indicator | [Link](./MobiPlanBadge.md) |
| [`MobiQuantityControl`](./MobiQuantityControl.md) | Customizable +/- counter for numerical inputs | [Link](./MobiQuantityControl.md) |
| [`MobiSentinelMenu`](./MobiSentinelMenu.md) | Data-driven identity dropdown | [Link](./MobiSentinelMenu.md) |
| [`MobiSwitcher`](./MobiSwitcher.md) | Compact segmented selector | [Link](./MobiSwitcher.md) |
| [`MobiThemeSwitcher`](./MobiThemeSwitcher.md) | Premium theme selector | [Link](./MobiThemeSwitcher.md) |
| [`MobiUserBadge`](./MobiUserBadge.md) | Theme-aware user identity badge | [Link](./MobiUserBadge.md) |

## Hooks

| Hook | Description | Docs |
|---|---|---|
| [`useMobiAuth`](./useMobiAuth.md) | Authentication stub for JS Bridge v1.19 | [Link](./useMobiAuth.md) |
| [`useMobiClipboard`](./useMobiClipboard.md) | Copy-to-clipboard with feedback | [Link](./useMobiClipboard.md) |
| [`useMobiEdge`](./useMobiEdge.md) | **Core logic** for MobiEdge v1 integration | [Link](./useMobiEdge.md) |
| [`useMobiTheme`](./useMobiTheme.md) | Theme state with persistence | [Link](./useMobiTheme.md) |

## Design Tokens

All components use semantic CSS variables from the MOBI token system:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `mobi-bg` | `#F8FAFC` | `#000000` | Page background |
| `mobi-surface` | `#ffffff` | `#111111` | Card / panel background |
| `mobi-border` | `#E2E8F0` | `#222222` | Borders and dividers |
| `mobi-text` | `#0F172A` | `#F8FAFC` | Primary text |
| `mobi-primary` | `#0F172A` | `#F8FAFC` | Brand accent |

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
[wearemobi.com](https://wearemobi.com)

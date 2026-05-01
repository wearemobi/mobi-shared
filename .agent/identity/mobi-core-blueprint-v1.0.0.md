# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · Core Blueprint v1.0.0

This document serves as the Single Source of Truth (SSoT) for the design and development of applications under the M.O.B.I.™ standard using **Vite** and **Tailwind CSS v4**.

## 1. Token System (CSS Variables)

Integrate this block into your root style file (e.g., `index.css`).

```css
@import "tailwindcss";

@theme {
  /* Typography */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  /* Color Semantics */
  --color-mobi-bg: var(--mobi-bg);
  --color-mobi-surface: var(--mobi-surface);
  --color-mobi-surface-hover: var(--mobi-surface-hover);
  --color-mobi-border: var(--mobi-border);
  --color-mobi-text: var(--mobi-text);
  --color-mobi-text-muted: var(--mobi-text-muted);
  --color-mobi-primary: var(--mobi-primary);
}

@layer base {
  :root {
    --mobi-bg: #F8FAFC;
    --mobi-surface: #ffffff;
    --mobi-surface-hover: #F1F5F9;
    --mobi-border: #E2E8F0;
    --mobi-text: #0F172A;
    --mobi-text-muted: #64748B;
    --mobi-primary: #0F172A;
  }
  
  .dark {
    --mobi-bg: #000000;
    --mobi-surface: #111111;
    --mobi-surface-hover: #1f1f1f;
    --mobi-border: #222222;
    --mobi-text: #F8FAFC;
    --mobi-text-muted: #94A3B8;
    --mobi-primary: #F8FAFC;
  }

  /* Utility to invert logos in dark mode */
  .dark .dark-invert {
    filter: invert(1) brightness(2);
  }

  body {
    @apply bg-mobi-bg text-mobi-text antialiased font-sans transition-colors duration-200;
  }
}
```

## 2. Technical Configuration (Vite)

Ensure `@tailwindcss/vite` is installed and update your `vite.config.ts` accordingly:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## 3. Official Component: Powered By M.O.B.I.™

The official branding component for footers or modals. Clean, pure, and optimized.

```tsx
const MobiFooter = () => (
  <div className="pt-4 pb-2 flex items-center justify-center gap-1.5 opacity-50">
    <span className="text-[11px] font-medium text-mobi-text-muted uppercase tracking-wider">
      Powered by
    </span>
    <img 
      src="https://wearemobi.com/logo-light.svg" 
      alt="M.O.B.I.™" 
      className="h-3 w-auto object-contain dark-invert"
      referrerPolicy="no-referrer"
    />
  </div>
);
```

## 4. Documentation Standards (Markdown)

To maintain consistent identity across KB and SSoT documentation:

### Document Header
```markdown
# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · [Title]
```

### Document Footer
```markdown
---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<!-- M.O.B.I. Core: SDD-Compliant-V1.7 | Sentinel-Status: ACTIVE -->
```

## 5. Style Checklist
- [ ] **Borders:** Always use subtle `border-mobi-border`.
- [ ] **Hovers:** Use `hover:bg-mobi-surface-hover`.
- [ ] **Dark Mode:** Pure black `#000000` background with `#111111` surfaces.
- [ ] **Typography:** Inter for body text, JetBrains Mono for data/code.

---
**Status:** CONSOLIDATED & VERIFIED  
**Origin:** Mobi-Chat Design System v1.7 ⚓

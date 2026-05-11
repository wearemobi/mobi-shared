import { useEffect } from 'react';

export interface MobiAnalyticsProps {
  /**
   * Your GA4 Measurement ID (e.g. 'G-XXXXXXXXXX').
   * Found in Google Analytics → Admin → Data Streams → your stream.
   */
  measurementId: string;
  /**
   * If true, the component renders nothing and performs no script injection.
   * Useful for disabling analytics in development or test environments.
   * @default false
   *
   * @example
   * ```tsx
   * <MobiAnalytics
   *   measurementId="G-XXXXXXXXXX"
   *   disabled={import.meta.env.DEV}
   * />
   * ```
   */
  disabled?: boolean;
  /**
   * If true, GA4 will NOT send an automatic `page_view` on initialization.
   * Set this to `false` and call `trackPageView()` manually in SPAs where
   * you control routing.
   * @default true
   */
  autoPageView?: boolean;
  /**
   * Nonce attribute injected into the `<script>` tags for Content Security Policy (CSP) compliance.
   * Required if your CSP uses `nonce-*` for `script-src`.
   *
   * @example
   * ```tsx
   * <MobiAnalytics measurementId="G-XXXXXXXXXX" nonce={serverNonce} />
   * ```
   */
  nonce?: string;
}

/**
 * M.O.B.I.™ Analytics Injector — Google Analytics 4 (GA4).
 *
 * Renders `null` (no visible UI). Dynamically injects the two GA4 `<script>`
 * tags into `<head>` once on mount:
 * 1. The async gtag.js loader from `googletagmanager.com`.
 * 2. The initialization script (`window.dataLayer`, `gtag()`, `gtag('config',...)`).
 *
 * ## Placement
 *
 * Place **once** in your root layout or `App.tsx`, as high as possible in the tree:
 *
 * ```tsx
 * // App.tsx
 * import { MobiAnalytics } from '@wearemobi/shared';
 *
 * export default function App() {
 *   return (
 *     <>
 *       <MobiAnalytics
 *         measurementId="G-XXXXXXXXXX"
 *         disabled={import.meta.env.DEV}
 *       />
 *       <Router>...</Router>
 *     </>
 *   );
 * }
 * ```
 *
 * ## Tracking events
 *
 * After placing `<MobiAnalytics>`, use `useMobiAnalytics` anywhere in the app:
 *
 * ```tsx
 * import { useMobiAnalytics } from '@wearemobi/shared';
 *
 * const { trackEvent, trackPageView, identify } = useMobiAnalytics({
 *   measurementId: 'G-XXXXXXXXXX',
 * });
 *
 * // Track a button click:
 * trackEvent('click', { event_category: 'CTA', event_label: 'Hero Button' });
 *
 * // Track a virtual page view (SPA navigation):
 * trackPageView('/dashboard', 'Dashboard');
 *
 * // Associate an authenticated user:
 * identify('usr_7f3a9c', { plan: 'PRO' });
 * ```
 *
 * ## Server-Side Rendering (SSR) / Next.js
 *
 * In Next.js App Router, use this in a Client Component at the root layout level.
 * The component guards all DOM operations with `typeof window !== 'undefined'`.
 *
 * ```tsx
 * // app/layout.tsx
 * import { MobiAnalytics } from '@wearemobi/shared';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <MobiAnalytics measurementId="G-XXXXXXXXXX" />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * ## Alternative: Static `<script>` tags in `index.html`
 *
 * If you prefer to load gtag.js directly in your HTML file (avoids a
 * React lifecycle dependency), add this to your `<head>`:
 *
 * ```html
 * <!-- Google Analytics 4 -->
 * <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'G-XXXXXXXXXX');
 * </script>
 * ```
 *
 * In that case, you do NOT need `<MobiAnalytics>` — just use `useMobiAnalytics`
 * and it will pick up the already-initialized `window.gtag`.
 */
export const MobiAnalytics: React.FC<MobiAnalyticsProps> = ({
  measurementId,
  disabled = false,
  autoPageView = true,
  nonce
}) => {
  useEffect(() => {
    if (disabled || !measurementId || typeof window === 'undefined') return;

    // Avoid duplicate injection if scripts are already present
    const existingLoader = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
    );

    if (!existingLoader) {
      // 1. Async gtag.js loader
      const loaderScript = document.createElement('script');
      loaderScript.async = true;
      loaderScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      if (nonce) loaderScript.nonce = nonce;
      document.head.appendChild(loaderScript);
    }

    // 2. Initialization script (always re-run to support measurementId changes)
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function (...args: unknown[]) {
        window.dataLayer.push(args);
      };
    }
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: autoPageView
    });

  }, [measurementId, disabled, autoPageView, nonce]);

  // This component has no visible output — it's a "side-effect only" component
  return null;
};

// Re-export React for JSX — required since this file uses JSX without a React import
import React from 'react';
export default MobiAnalytics;

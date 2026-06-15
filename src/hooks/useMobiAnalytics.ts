import { useEffect, useCallback, useState } from 'react';

// ─── GA4 Type Declarations ────────────────────────────────────────────────────

/** Standard GA4 measurement event names. Extend with your own via the generic. */
export type GA4EventName =
  | 'page_view'
  | 'click'
  | 'scroll'
  | 'search'
  | 'sign_up'
  | 'login'
  | 'purchase'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'generate_lead'
  | 'form_submit'
  | 'file_download'
  | 'video_start'
  | 'video_complete'
  | 'share'
  | 'exception'
  | (string & {}); // allow arbitrary custom event names with autocomplete

/** Payload shape for a GA4 event. All fields are optional per GA4 spec. */
export interface GA4EventParams {
  /** Category grouping (e.g. 'User', 'Navigation', 'Ecommerce'). */
  event_category?: string;
  /** Human-readable label for the event. */
  event_label?: string;
  /** Numeric value associated with the event. */
  value?: number;
  /** Currency code (ISO 4217) for monetary values. */
  currency?: string;
  /** Whether this is a non-interaction event (won't affect bounce rate). */
  non_interaction?: boolean;
  /** Current page URL or virtual path. */
  page_location?: string;
  /** Page title. */
  page_title?: string;
  /** Any additional custom dimensions / metrics. */
  [key: string]: unknown;
}

/** Options passed to `useMobiAnalytics`. */
export interface UseMobiAnalyticsOptions {
  /**
   * Your GA4 Measurement ID (e.g. 'G-XXXXXXXXXX').
   * Required — analytics will be disabled if not provided.
   */
  measurementId: string;
  /**
   * If true, suppresses all tracking calls (useful in development/test environments).
   * @default false
   */
  disabled?: boolean;
  /**
   * Send a `page_view` event automatically when the hook initializes.
   * @default true
   */
  autoPageView?: boolean;
  /**
   * Default params merged into every event call (e.g. app version, environment).
   */
  defaultParams?: Record<string, unknown>;
  /**
   * Called after each successful event dispatch (useful for logging or testing).
   */
  onEvent?: (name: GA4EventName, params: GA4EventParams) => void;
}

// ─── Global gtag declaration ──────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * M.O.B.I.™ Analytics Hook — Google Analytics 4 (GA4) integration.
 *
 * Initializes the GA4 `gtag` function and provides typed helpers for
 * event tracking, page views, conversions, and user identification.
 *
 * **This hook does NOT inject `<script>` tags.**  
 * Use the `<MobiAnalytics>` component (or manually add the scripts to your
 * `index.html`) to load the gtag library. The hook will queue calls safely
 * if gtag hasn't loaded yet.
 *
 * @example
 * ```tsx
 * // In your root layout or App.tsx:
 * <MobiAnalytics measurementId="G-XXXXXXXXXX" />
 *
 * // Anywhere in your app:
 * const { trackEvent, trackPageView } = useMobiAnalytics({ measurementId: 'G-XXXXXXXXXX' });
 *
 * trackEvent('form_submit', { event_category: 'Lead', event_label: 'Contact Form' });
 * trackPageView('/dashboard', 'Dashboard — M.O.B.I.™');
 * ```
 */
export const useMobiAnalytics = ({
  measurementId,
  disabled = false,
  autoPageView = true,
  defaultParams = {},
  onEvent
}: UseMobiAnalyticsOptions) => {
  const [isReady, setIsReady] = useState(false);

  // Bootstrap gtag dataLayer and initialize measurement ID
  useEffect(() => {
    if (disabled || !measurementId) return;

    // Initialize dataLayer if not already set by the script tag
    window.dataLayer = window.dataLayer || [];

    // Define gtag only if not already defined (the <script> tag may have done it)
    if (typeof window.gtag !== 'function') {
      window.gtag = function (...args: unknown[]) {
        window.dataLayer.push(args);
      };
    }

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: autoPageView,
      ...defaultParams
    });

    setIsReady(true);
  }, [measurementId, disabled, autoPageView]); // defaultParams intentionally excluded (object ref)

  /** Internal gtag caller — queues safely even if gtag isn't loaded yet. */
  const callGtag = useCallback((...args: unknown[]) => {
    if (disabled || !measurementId) return;
    if (typeof window.gtag === 'function') {
      window.gtag(...args);
    } else {
      // Queue until gtag is ready
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    }
  }, [disabled, measurementId]);

  /**
   * Track a custom GA4 event.
   *
   * @param name - GA4 event name (use standard names where possible).
   * @param params - Optional event parameters / dimensions.
   *
   * @example
   * ```ts
   * trackEvent('login', { method: 'Google' });
   * trackEvent('form_submit', { event_category: 'Lead', event_label: 'Hero CTA' });
   * trackEvent('purchase', { currency: 'USD', value: 29.99 });
   * ```
   */
  const trackEvent = useCallback((name: GA4EventName, params: GA4EventParams = {}) => {
    const merged = { ...defaultParams, ...params };
    callGtag('event', name, merged);
    onEvent?.(name, merged);
  }, [callGtag, defaultParams, onEvent]);

  /**
   * Track a virtual page view — ideal for SPAs where the URL changes
   * without a full page reload.
   *
   * @param path - The virtual page path (e.g. '/dashboard'). Defaults to `window.location.pathname`.
   * @param title - The page title. Defaults to `document.title`.
   *
   * @example
   * ```ts
   * // In a router's onNavigate callback:
   * trackPageView(location.pathname, document.title);
   * ```
   */
  const trackPageView = useCallback((path?: string, title?: string) => {
    const params: GA4EventParams = {
      page_location: path ?? (typeof window !== 'undefined' ? window.location.href : ''),
      page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
      ...defaultParams
    };
    callGtag('event', 'page_view', params);
    onEvent?.('page_view', params);
  }, [callGtag, defaultParams, onEvent]);

  /**
   * Track a GA4 conversion event (sends to the configured conversion action).
   *
   * @param conversionLabel - Optional conversion label (for Google Ads conversion tracking).
   * @param value - Optional monetary value of the conversion.
   * @param currency - Currency code (ISO 4217). @default 'USD'
   *
   * @example
   * ```ts
   * trackConversion('AW-XXXXXXXXX/XXXXXX', 99.0, 'USD');
   * ```
   */
  const trackConversion = useCallback((
    conversionLabel?: string,
    value?: number,
    currency = 'USD'
  ) => {
    const params: GA4EventParams = {
      send_to: conversionLabel ?? measurementId,
      value,
      currency,
      ...defaultParams
    };
    callGtag('event', 'conversion', params);
    onEvent?.('conversion', params);
  }, [callGtag, measurementId, defaultParams, onEvent]);

  /**
   * Associate a user identity with subsequent events.
   * **Do NOT send PII (email, names) as the user ID — use an opaque internal ID.**
   *
   * @param userId - Opaque user identifier (internal DB ID, UUID, etc.).
   * @param userProps - Optional user property dimensions.
   *
   * @example
   * ```ts
   * identify('usr_7f3a9c', { plan: 'PRO', org: 'MOBI Fleet HQ' });
   * ```
   */
  const identify = useCallback((userId: string, userProps?: Record<string, unknown>) => {
    callGtag('config', measurementId, {
      user_id: userId,
      ...defaultParams
    });
    if (userProps) {
      callGtag('set', 'user_properties', userProps);
    }
  }, [callGtag, measurementId, defaultParams]);

  /**
   * Track an exception / error event.
   *
   * @param description - Human-readable error description.
   * @param fatal - Whether the error was fatal. @default false
   *
   * @example
   * ```ts
   * trackException('Failed to load fleet data', false);
   * ```
   */
  const trackException = useCallback((description: string, fatal = false) => {
    const params: GA4EventParams = { description, fatal, ...defaultParams };
    callGtag('event', 'exception', params);
    onEvent?.('exception', params);
  }, [callGtag, defaultParams, onEvent]);

  /**
   * Send a raw `gtag()` call for advanced use cases not covered by the helpers.
   *
   * @example
   * ```ts
   * gtag('set', { currency: 'USD', country: 'US' });
   * gtag('event', 'custom_event', { custom_param: 'value' });
   * ```
   */
  const gtag = useCallback((...args: unknown[]) => {
    callGtag(...args);
  }, [callGtag]);

  return {
    /** Whether the gtag function is initialized and ready. */
    isReady,
    trackEvent,
    trackPageView,
    trackConversion,
    identify,
    trackException,
    /** Raw gtag passthrough for advanced use. */
    gtag
  };
};

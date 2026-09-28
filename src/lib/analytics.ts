declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

/**
 * Initialize Google Analytics 4
 * Automatically injects gtag.js if a valid Measurement ID (e.g. G-XXXXXXXXXX) is provided.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || isInitialized) return;

  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith('G-')) {
    // Inject gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true,
      page_title: document.title,
      page_location: window.location.href,
    });

    isInitialized = true;
    console.log(`[Analytics] Google Analytics 4 (${GA_MEASUREMENT_ID}) initialized successfully.`);
  } else {
    // Fallback safe gtag stub for local dev or when ID is pending
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer?.push(arguments);
      if (import.meta.env.DEV) {
        console.log('[Analytics DEV Event]', ...args);
      }
    };
  }

  // Also record lightweight local visit session for immediate counting
  recordLocalAccess();
}

/**
 * Track a page view event
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    });
  }
}

/**
 * Track custom conversion / interaction events
 * Examples:
 * - 'click_line_reservation'
 * - 'click_phone_call'
 * - 'click_instagram'
 * - 'submit_contact_form'
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean> = {}
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Simple local analytics helper to count visits & clicks
 */
interface LocalAccessStats {
  pageViews: number;
  lastVisit: string;
  firstVisit: string;
}

const LOCAL_STORAGE_KEY = 'on_gym_access_stats';

function recordLocalAccess() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const now = new Date().toISOString();
    let stats: LocalAccessStats = raw
      ? JSON.parse(raw)
      : { pageViews: 0, lastVisit: now, firstVisit: now };

    stats.pageViews += 1;
    stats.lastVisit = now;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function getLocalAccessStats(): LocalAccessStats | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* Noyes PI — first-party UTM attribution (no pixels, cookies or network calls).
 * Only an allowlist of campaign parameters is read and passed to internal links.
 * This file does not read or transmit legal-case answers or contact details.
 */
(() => {
  'use strict';
  const limits = Object.freeze({
    utm_source: 120,
    utm_medium: 120,
    utm_campaign: 160,
    utm_content: 160,
  });
  const keys = Object.keys(limits);

  function sanitize(value, max) {
    if (typeof value !== 'string' || /[\u0000-\u001f\u007f]/.test(value)) return null;
    const clean = value.trim().replace(/\s+/g, ' ');
    return clean && clean.length <= max ? clean : null;
  }

  // Explicit parameters on the current page always take precedence. Use a
  // same-origin referrer only for older internal links that did not carry UTMs.
  const here = new URL(window.location.href);
  const current = here.searchParams;
  let original = current;
  if (!keys.some(key => current.has(key)) && document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin === here.origin) original = referrer.searchParams;
    } catch { /* No usable referrer. */ }
  }

  const attribution = {};
  for (const key of keys) {
    const value = sanitize(original.get(key), limits[key]);
    if (value) attribution[key] = value;
  }
  window.NOYES_PI_ATTRIBUTION = Object.freeze(attribution);

  function propagateLinks() {
    if (!Object.keys(attribution).length) return;
    document.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('#') || link.hasAttribute('download')) return;
      try {
        const url = new URL(raw, here.href);
        if (url.origin !== here.origin) return;
        // Navigation to other pages (including ES/EN and the evaluation form).
        // Do not append tracking to anchors on this page or static assets.
        if (url.pathname === here.pathname && url.hash) return;
        if (!url.pathname.endsWith('/') && !/\/index\.html$/i.test(url.pathname)) return;
        for (const [key, value] of Object.entries(attribution)) {
          if (!url.searchParams.has(key)) url.searchParams.set(key, value);
        }
        link.href = url.pathname + url.search + url.hash;
      } catch { /* Keep original link if malformed. */ }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', propagateLinks, { once: true });
  } else {
    propagateLinks();
  }
})();

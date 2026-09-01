# Content specification visual QA

Captured from the local production build on 2026-09-01 after `npm run validate`.

- `home-desktop.png`: Thai Home, 1440 × 1100 px.
- `platform-desktop.png`: Thai Platform, 1440 × 1100 px.
- `contact-mobile.png`: Thai Contact, 390 × 844 px, including the honest email-fallback state used when the Turnstile sitekey is not configured.

The Playwright smoke suite separately checks the materially changed Thai and English routes at 320, 390, 768, and 1440 px, including horizontal overflow, keyboard behavior, reduced motion, and automated accessibility scans.

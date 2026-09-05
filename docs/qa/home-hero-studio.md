# Home hero: studio composition and single-renderer lifecycle

## Scope

Base: `cbe1e0b66efb28772bc1547ec5fc2d979e6d0df4`.
Only the home hero, its implementation boundary, and related tests change. Existing non-hero copy, routes, fonts, logos, evidence, product screenshots, package versions and production deployment are preserved. No patient data is used.

## Decisions

- Keep Clinical Systems Editorial and the existing petrol/mint/teal/amber palette.
- Give the wallet the strongest silhouette; use rounded ceramic source models, room reflections, soft contact shadows and three small audit receipts instead of glowing blockchain scenery.
- Use an opaque frosted insert rather than combining opacity with physical transmission. No HDR download or post-processing dependency.
- Put artwork beside the text on desktop and below it on narrow layouts. Fit a stable authored volume with an orthographic camera; do not translate the canvas or hide models behind an opaque gradient.
- Use six illustrative source models on larger scenes and three on compact scenes. These are not deployment counts or named institutions.
- Preserve the existing bilingual explanation. Solid teal paths represent permitted information; dashed amber paths represent consent/access events, not clinical records on blockchain.
- SSR includes an inline SVG conceptual illustration. It is an authored fallback, not a product screenshot or a claimed pixel-identical render of the 3D scene.
- `Home.astro` contains page content, `HomeHero.astro` contains hero markup/style, `home-hero-controller.ts` owns all controls/timing, and `home-network-flagship.ts` owns only WebGL resources.
- Load Three.js on visibility. Create one renderer. Play one 9.2-second sequence and stop until explicit replay. Stop for keyboard focus, pause, hidden documents, offscreen views and reduced motion.
- Recompute compact source positions and paths across breakpoints. Resize a paused scene without restarting its loop. Dispose failed initialization, context loss, pagehide and Astro navigation safely. Restore after pageshow.

## Verification

The local editing runtime cannot resolve GitHub or npm hostnames. Local `npm ci`, a full Astro build and device benchmarking are therefore not claimed. TypeScript transpilation is only a syntax check, not dependency-aware type checking.

The PR CI runs the existing asset checks, `npm ci`, `npm run validate` and complete Playwright suite. New browser cases cover one real WebGL context, keyboard and focus pause, autoplay completion/replay, no-JavaScript and WebGL failure fallbacks, context loss, offscreen/pause GPU draw cessation, resize round trips, and page lifecycle remounts.

Responsive evidence is captured for both languages at 320, 390, 768, 1440 and 3840 pixels, with all four phases at 1440. Review PNGs in `website-browser-evidence-<PR number>` and the compiled site in `website-preview-<PR number>`. Screenshots are review evidence, not pixel-diff regression baselines.

Before production approval, inspect the browser evidence and test an actual iPhone/Safari and a representative lower-power Android device. Desktop/mobile Chromium emulation does not establish device FPS, battery usage, Safari compatibility or field Core Web Vitals. No 60-FPS claim is made.

## References

- Repository `DESIGN.md`, `CONTENT_OWNERSHIP.md` and `AGENTS.md`.
- https://threejs.org/docs/pages/RoomEnvironment.html
- https://threejs.org/manual/en/color-management.html
- https://threejs.org/manual/en/cleanup.html

# HealthTAG Website Theme and Internal Documentation Design

**Date:** 2026-09-10

**Status:** Approved for implementation

## Goal

Add an accessible Auto/Light/Dark appearance control to the public HealthTAG website, align its compact language control with the internal documentation site, and add a clearly separated link from Support to the private Data Source Node documentation. This change keeps both repositories independent while making their copied UI primitives follow the same contract.

## Scope

This repository owns the public website half of the change:

- add an explicit three-state appearance preference;
- preserve the current translucent public-site header and fit the new utility control at every supported width;
- standardize the language control as a compact `EN` or `TH` control;
- add a bilingual Data Source Node internal-documentation resource to Support;
- update durable documentation that currently says the internal-document link is undecided; and
- record the copied-component boundary for a later shared-package extraction.

The companion `health-tag-document` repository will implement the same appearance-control contract and will visually align its header. No package, Git submodule, runtime fetch, or cross-repository build dependency is introduced now.

## Repository and delivery boundary

Work is applied directly to the local `main` branch as requested. It must not be pushed, deployed, or merged by this task. Existing unrelated work remains untouched.

## Shared copied-component contract

Both repositories use repo-local implementations with the following stable contract:

- preference values are exactly `auto`, `light`, and `dark`;
- the browser storage key is `healthtag-theme`;
- storage remains origin-scoped, so each site remembers its own preference;
- the root element exposes `data-theme="auto|light|dark"` and `data-resolved-theme="light|dark"`;
- the control exposes one compact trigger and a menu containing text labels plus non-color icons;
- the selected option uses `aria-pressed="true"`;
- the trigger label and accessible name reflect the current preference;
- choosing an option applies it immediately, persists it, updates `color-scheme` and `theme-color`, and closes the menu;
- `auto` follows `prefers-color-scheme` changes without a reload;
- invalid or unavailable stored values fall back to `auto`; and
- without JavaScript, CSS media-query fallback still renders the browser-preferred scheme while the non-functional manual control stays hidden.

The two implementations may use repository-specific Astro imports and CSS placement, but their behavior, values, accessible names, and visual dimensions remain equivalent. The source comment and project design documentation identify the matching implementation so later extraction can compare them directly.

## Theme initialization

A small inline bootstrap runs in `<head>` before page content is painted. It reads `healthtag-theme`, resolves `auto` against `matchMedia('(prefers-color-scheme: dark)')`, and sets both root data attributes. Storage access is wrapped so privacy settings or storage failures do not prevent rendering.

The deferred page script owns interaction after parsing. It updates option state, the trigger label, `meta[name="theme-color"]`, and the stored preference. It listens for operating-system scheme changes only to recompute an active `auto` preference.

No server state, cookies, user identity, analytics event, or cross-domain synchronization is added.

## Color system

The existing light palette remains the light-mode reference. Theme-dependent roles are expressed through semantic surface, text, border, action, focus, warning, shadow, and header tokens. Fixed brand values and intentionally dark editorial surfaces use separate invariant tokens, preventing a text token from also acting as a dark background.

Dark mode uses deep navy surfaces rather than pure black, light blue-gray text, stronger visible borders, and the existing cyan/blue/amber brand family. Primary buttons receive an explicit foreground token so link-colored cyan is not assumed to work behind white text. Dark editorial sections remain dark and keep their established hierarchy.

The verified light and dark logo assets are both rendered and CSS selects the correct one from `data-resolved-theme`. Images, partner marks, portraits, screenshots, and illustrations are never inverted or recolored. Technical diagrams and screenshots may retain a bounded light surface when that gives the most reliable contrast.

## Header and controls

The public header keeps its existing sticky, translucent, blurred surface and current height. On desktop, Support, language, appearance, and contact remain in the utility region. The language link and appearance trigger share the same compact outlined-control treatment, focus ring, hit target, and hover state.

At widths where the existing mobile navigation replaces the desktop navigation, language and appearance move into the mobile panel so the logo and hamburger do not become crowded. All options remain keyboard reachable, and the menu uses native disclosure behavior where practical.

## Support content

Support gains a fifth resource path and a dedicated bilingual section for:

**Data Source Node — Internal documentation**

The section states directly that the documentation is for authorized HealthTAG users and is separate from the Community Edition manual. Its action links to `https://internal.documents.healthtag.io/`, opens as an external destination with safe link attributes, and does not describe the private site's authentication as verified by this static public page.

The hero description and resource index may mention both manuals only when the distinction remains clear. Existing reader downloads, Community Edition instructions, and sensitive-data warnings remain unchanged.

`README.md`, `DESIGN.md`, and `CONTENT_OWNERSHIP.md` are updated to replace the obsolete “access policy will be decided later” boundary with the approved, access-qualified Support link. Public copy remains concrete, bilingual, and free of editorial-process language.

## Accessibility and failure behavior

- The control has a minimum 44 by 44 CSS-pixel target wherever space permits.
- Focus remains visible in both resolved schemes.
- Theme state is communicated by text, icon, and `aria-pressed`, never by color alone.
- Escape and native disclosure behavior close the menu without trapping focus.
- A storage exception leaves the page usable in `auto`.
- The header, mobile menu, and all public navigation remain usable when the theme script fails.
- Contrast is evaluated under WCAG 2.2 AA for both themes.
- Reduced-motion preferences continue to disable nonessential transitions.

## Verification

Implementation follows test-first development. Browser tests are added before production changes and must first fail for the missing behavior. They cover:

- default `auto` resolution under emulated light and dark operating-system preferences;
- explicit Light and Dark selection;
- persistence after reload on the same origin;
- live operating-system changes while `auto` is selected;
- invalid stored-value fallback;
- keyboard access and accurate `aria-pressed` state;
- the compact language link in Thai and English;
- appearance controls inside the mobile navigation;
- the bilingual internal-document link, destination, external-link safety, and separation from Community Edition; and
- no horizontal overflow in representative header layouts.

Required project checks are:

```text
node scripts/verify-legacy-assets.mjs
npm ci
npm run validate
npm run test:smoke
```

Actual pages are inspected at 320, 390, 768, and 1440 pixels in light and dark modes, with Thai and English represented. Visual inspection distinguishes source review from rendered UI review.

## Out of scope

- a published shared component or design-token package;
- cross-origin preference synchronization;
- changes to internal-document authentication or deployment;
- redesigning the main navigation, Support downloads, or Community Edition manual;
- recoloring original brand assets; and
- pushing, deploying, or merging either repository.

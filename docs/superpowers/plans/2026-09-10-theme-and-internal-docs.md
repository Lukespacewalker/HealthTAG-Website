# HealthTAG Website Theme and Internal Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, persistent Auto/Light/Dark theme system to the public website, standardize compact header utilities, and link Support to the private Data Source Node documentation.

**Architecture:** Keep a repo-local Astro `ThemeMenu` and critical head bootstrap whose observable contract matches the internal-documentation repository. Existing light colors become theme tokens; intentionally dark editorial surfaces move to invariant contrast tokens so dark mode does not accidentally invert their hierarchy. Support receives a separate bilingual Data Source Node resource and the durable content-boundary documents are updated.

**Tech Stack:** Astro 7, TypeScript, native CSS, Playwright, axe-core, Bun as script runner, npm lockfile installation contract

**Spec:** `docs/superpowers/specs/2026-09-10-theme-and-internal-docs-design.md`

## Global Constraints

- Work directly on local `main`; do not push or deploy.
- Preserve `package-lock.json`; do not create `bun.lock` or change the package manager as part of this task.
- Use `npm ci` for the repository lockfile gate and `bun run ...` for package scripts where practical.
- Keep Astro static-first with native CSS and no client framework.
- Preference values are exactly `auto`, `light`, and `dark`; storage key is exactly `healthtag-theme`.
- Keep preference storage origin-scoped and do not add cookies or cross-domain synchronization.
- Keep Thai and English materially equivalent and retain the existing sensitive-data warning.
- Use only verified logo assets; never recolor or invert brand images.
- A static public link must not claim that private-site authentication has been verified.

---

### Task 1: Lock the public theme contract with failing browser tests

**Files:**
- Create: `tests/theme.spec.ts`
- Modify: `tests/navigation-ia.spec.ts`

**Interfaces:**
- Consumes: existing `<html>`, desktop navigation, and mobile navigation rendered by `src/layouts/Base.astro`
- Produces: required selectors `data-theme`, `data-resolved-theme`, `[data-theme-control]`, `[data-theme-trigger]`, and `[data-theme-option]`

- [ ] **Step 1: Write the failing appearance tests**

Create `tests/theme.spec.ts` with literal expectations and no production helper imports:

```ts
import { expect, test, type Page } from '@playwright/test';

const storageKey = 'healthtag-theme';

async function openThemeMenu(page: Page) {
  await page.locator('.desktop-nav [data-theme-trigger]').click();
  return page.locator('.desktop-nav [data-theme-control]');
}

test('auto resolves before paint and follows operating-system changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'auto');
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'light');
});

test('explicit selection persists and ignores later operating-system changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/en/');
  const control = await openThemeMenu(page);
  await control.locator('[data-theme-option="dark"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBe('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
});

test('invalid storage falls back to auto and exposes accurate accessible state', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, 'sepia'), storageKey);
  await page.goto('/');
  const control = await openThemeMenu(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'auto');
  await expect(control.locator('[data-theme-option="auto"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(control.locator('[data-theme-option="light"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(control.locator('[data-theme-option="dark"]')).toHaveAttribute('aria-pressed', 'false');
});

test('mobile navigation contains working language and appearance controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/support/');
  await page.locator('.mobile-nav > summary').click();
  await expect(page.locator('.mobile-utilities .language-switch')).toHaveText('EN');
  await page.locator('.mobile-utilities [data-theme-trigger]').click();
  await page.locator('.mobile-utilities [data-theme-option="dark"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
});
```

- [ ] **Step 2: Extend navigation expectations for compact language controls**

In `tests/navigation-ia.spec.ts`, require `.language-switch` to show `EN` on Thai routes and `TH` on English routes while preserving the current destination URLs. Keep the existing exact route assertions.

- [ ] **Step 3: Build the current site and run the targeted tests to verify RED**

Run:

```powershell
bun run build
bunx playwright test tests/theme.spec.ts tests/navigation-ia.spec.ts
```

Expected: the new theme tests fail because the root attributes and theme controls do not exist; existing navigation tests remain green except for the new class/text expectations.

- [ ] **Step 4: Commit the failing contract tests**

```powershell
git add tests/theme.spec.ts tests/navigation-ia.spec.ts
git commit -m "test: define website appearance contract"
```

---

### Task 2: Implement bootstrap, menu, logo switching, and header placement

**Files:**
- Create: `src/components/ThemeMenu.astro`
- Modify: `src/components/BrandLogo.astro`
- Modify: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`
- Modify: `src/styles/brand-refresh.css`

**Interfaces:**
- Consumes: `locale: 'th' | 'en'`, `localStorage['healthtag-theme']`, and `matchMedia('(prefers-color-scheme: dark)')`
- Produces: the selectors and root attributes fixed by Task 1; emits no network request or cross-origin state

- [ ] **Step 1: Add the defensive head bootstrap**

Place this inline script in `Base.astro` before body content and keep the literals identical in the documentation repo:

```html
<script is:inline>
  (() => {
    const allowed = new Set(['auto', 'light', 'dark']);
    let preference = 'auto';
    try {
      const stored = localStorage.getItem('healthtag-theme');
      if (stored && allowed.has(stored)) preference = stored;
    } catch {}
    const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = preference === 'auto' ? (systemDark ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = preference;
    document.documentElement.dataset.resolvedTheme = resolved;
    document.documentElement.style.colorScheme = resolved;
    document.documentElement.classList.add('theme-ready');
  })();
</script>
```

Change the single fixed theme-color declaration to `<meta name="theme-color" content="#f6f8fc" />`; the controller updates it after selection and system changes.

- [ ] **Step 2: Add the localized ThemeMenu component**

Implement one native `<details data-theme-control>` with a compact `<summary data-theme-trigger>` and three buttons carrying `data-theme-option="auto|light|dark"`. Use visible labels `Auto`, `Light`, `Dark` for English and `อัตโนมัติ`, `สว่าง`, `มืด` for Thai; use `◐`, `☼`, and `☾` as `aria-hidden` symbols. Initialize Auto with `aria-pressed="true"` and the other options false.

Its bundled script must:

```ts
type ThemePreference = 'auto' | 'light' | 'dark';
const storageKey = 'healthtag-theme';
const media = matchMedia('(prefers-color-scheme: dark)');
const isTheme = (value: string | undefined | null): value is ThemePreference =>
  value === 'auto' || value === 'light' || value === 'dark';
const resolve = (value: ThemePreference) => value === 'auto' ? (media.matches ? 'dark' : 'light') : value;
```

For every rendered control, update trigger text/accessible name and all `aria-pressed` states. On selection, set both root attributes, set `document.documentElement.style.colorScheme`, update `meta[name="theme-color"]` to `#0b1423` or `#f6f8fc`, persist inside `try/catch`, and remove `open` from the containing details. The media listener reapplies only when `data-theme` is `auto`.

- [ ] **Step 3: Render controls in both navigation modes**

In `Base.astro`:

- render `<ThemeMenu locale={locale} />` between language and contact in `.desktop-nav-utilities`;
- give both language links the class `language-switch` and visible text `EN` or `TH`;
- render a second `<ThemeMenu locale={locale} />` in `.mobile-utilities` next to the compact language link; and
- keep the current `lang`, alternate-path, and accessible-label behavior.

- [ ] **Step 4: Make the wordmark theme-aware**

In `BrandLogo.astro`, render both verified image assets in one wrapper. Preserve `background="light"` and `background="dark"` as explicit fixed-surface variants and add/default `background="theme"`. For the theme variant, show the dark-letter `logo-light.png` in resolved light mode and the white-letter `logo-dark.png` in resolved dark mode. Add the no-JavaScript `prefers-color-scheme: dark` fallback; never use CSS filters.

- [ ] **Step 5: Add compact utility and menu styling**

In `global.css` and `brand-refresh.css`, use a 44-pixel minimum target, moderate 10-12 pixel radius, existing border/focus tokens, and an absolutely positioned menu surface. Keep the desktop header height at 76 pixels and mobile at 66 pixels. Hide manual theme controls until `.theme-ready` is present. Put mobile language/theme controls in a two-column `.mobile-utility-controls` row and keep the contact action full-width below.

- [ ] **Step 6: Run Task 1 tests to verify GREEN**

```powershell
bun run build
bunx playwright test tests/theme.spec.ts tests/navigation-ia.spec.ts
```

Expected: all targeted tests pass with no horizontal overflow.

- [ ] **Step 7: Commit the functional controls**

```powershell
git add src/components/ThemeMenu.astro src/components/BrandLogo.astro src/layouts/Base.astro src/styles/global.css src/styles/brand-refresh.css
git commit -m "feat: add persistent website appearance controls"
```

---

### Task 3: Convert website surfaces to a complete light/dark token system

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/brand-refresh.css`
- Modify: `src/styles/publications.css`
- Modify: `src/styles/publications-nav.css`
- Modify: `src/components/CommunityEditionManualPage.astro`
- Modify: `src/components/deep-pages/CompanyPage.astro`
- Modify: `src/components/deep-pages/DeploymentsPage.astro`
- Modify: `src/components/deep-pages/HowItWorksPage.astro`
- Modify: `src/components/deep-pages/InteroperabilityPage.astro`
- Modify: `src/components/deep-pages/PhrPage.astro`
- Modify: `src/components/deep-pages/TrustPage.astro`
- Modify: `src/components/Home.astro`
- Modify: `src/components/HomeHero.astro`
- Modify: `src/components/InvestorsPage.astro`
- Modify: `src/components/PartnerNetwork.astro`
- Modify: `src/components/PlatformPage.astro`
- Modify: `src/components/PublicationsPage.astro`
- Modify: `src/components/SupportPage.astro`
- Modify: `tests/link-contrast.spec.ts`

**Interfaces:**
- Consumes: `html[data-resolved-theme="light|dark"]`
- Produces: WCAG-aware semantic tokens and invariant editorial-dark tokens across every maintained route

- [ ] **Step 1: Expand the existing all-route contrast test to force dark mode**

In `tests/link-contrast.spec.ts`, add a `theme` loop around the all-route and open-menu audits. Before each navigation, install the literal preference:

```ts
await page.addInitScript(theme => localStorage.setItem('healthtag-theme', theme), theme);
```

Run the existing light cases plus explicit `dark` at widths 390 and 1440. Include the theme in each test title and in the de-duplication key. In the focus-indicator test, assert only visible 3-pixel outline plus a non-`none` separation band instead of hard-coding light-mode RGB values.

- [ ] **Step 2: Run the dark contrast cases to verify RED**

```powershell
bun run build
bunx playwright test tests/link-contrast.spec.ts --grep "dark"
```

Expected: failures identify unchanged light-only surfaces, links, and focus indicators.

- [ ] **Step 3: Define semantic theme roles and fixed contrast roles**

In `global.css`, retain the approved light hex values and add these roles:

```css
:root {
  --surface-page: #f6f8fc;
  --surface-raised: #ffffff;
  --surface-soft: #e4f1fa;
  --surface-neutral: #eef1f3;
  --surface-legacy: #f4f0ea;
  --surface-media: #e7ebef;
  --text-primary: #12243e;
  --text-secondary: #53657c;
  --border-strong: #9cb5ca;
  --action: #126b95;
  --action-hover: #105e83;
  --on-action: #ffffff;
  --header-surface: rgb(246 248 252 / 94%);
  --fixed-dark: #12243e;
  --fixed-dark-text: #f6f8fc;
  --fixed-dark-muted: #bdc7d0;
  --fixed-dark-line: rgb(228 241 250 / 18%);
}
html[data-resolved-theme='dark'] {
  --surface-page: #0b1423;
  --surface-raised: #111f32;
  --surface-soft: #162d43;
  --surface-neutral: #142337;
  --surface-legacy: #28231f;
  --surface-media: #1a293b;
  --text-primary: #edf4fb;
  --text-secondary: #afbed0;
  --border-strong: #60758e;
  --action: #78c7ee;
  --action-hover: #9bd8f5;
  --on-action: #071522;
  --header-surface: rgb(11 20 35 / 88%);
}
```

Map compatibility tokens `--paper`, `--white`, `--ink`, `--muted`, `--mint`, `--line`, and warning tokens to the semantic roles. Add a no-JavaScript `@media (prefers-color-scheme: dark)` block for `html:not([data-resolved-theme])` with the same values.

- [ ] **Step 4: Separate fixed dark sections from theme-dependent text tokens**

Replace `background: var(--ink)` with `background: var(--fixed-dark)` and paired `color: var(--paper|white)` with `var(--fixed-dark-text)` only for intentionally dark sections: `.dark-section`, `.skip-link`, `.program-spread`, `.community-copy`, `.support-contact`, `.manual-hero`, `.vision-panel`, `.talk-embed`, `.home-hero`, `.governance-section`, `.authorization`, `.intelligence-section`, `.flow-section`, `.why-now-section`, `.business-section`, `.publication-featured`, `.publication-featured-card`, `.organization-mark.dark-logo`, `.operating-section`, and `.platform-cta`. Replace their `#bdc7d0`/`#b8c2cb` copy colors with `var(--fixed-dark-muted)`.

Theme-dependent cards, tables, inputs, page backgrounds, publication surfaces, Support legacy/media surfaces, and section backgrounds use `--surface-*`, `--text-*`, and `--border-*`. Keep architecture canvases and screenshots on explicitly bounded technical surfaces instead of inverting them.

- [ ] **Step 5: Correct action and focus foregrounds**

Use `background: var(--action)` and `color: var(--on-action)` for primary buttons and selected pagination. Use theme-aware inner/outer focus tokens so every surface retains a visible separation band. Do not rely on `--action` simultaneously as a text link and as a white-text button without the explicit foreground token.

- [ ] **Step 6: Verify all dark contrast cases are GREEN**

```powershell
bun run build
bunx playwright test tests/link-contrast.spec.ts --grep "dark"
```

Expected: every built route passes color-contrast, link-in-text-block, hover, and focus checks at both widths.

- [ ] **Step 7: Commit the complete color system**

```powershell
git add src/styles src/components tests/link-contrast.spec.ts
git commit -m "style: support dark website surfaces"
```

---

### Task 4: Add the internal-document resource and update durable copy boundaries

**Files:**
- Modify: `tests/launch-smoke.spec.ts`
- Modify: `src/components/SupportPage.astro`
- Modify: `README.md`
- Modify: `DESIGN.md`
- Modify: `CONTENT_OWNERSHIP.md`

**Interfaces:**
- Consumes: approved destination `https://internal.documents.healthtag.io/`
- Produces: bilingual Support resource `#data-source-node-docs` distinct from `#community-edition`

- [ ] **Step 1: Write failing bilingual Support assertions**

Add these expectations to the existing Support test before changing the page:

```ts
const internalDocs = page.locator('#data-source-node-docs');
await expect(internalDocs).toContainText('เอกสารภายใน');
await expect(internalDocs).toContainText('ต้องได้รับสิทธิ์');
await expect(internalDocs.locator('a')).toHaveAttribute('href', 'https://internal.documents.healthtag.io/');
await expect(internalDocs.locator('a')).toHaveAttribute('target', '_blank');
await expect(internalDocs.locator('a')).toHaveAttribute('rel', /noopener/);
await expect(page.locator('#community-edition')).not.toContainText('Data Source Node — Internal documentation');
```

After navigating to `/en/support/`, repeat with the literal English phrases `Internal documentation` and `authorized access`.

- [ ] **Step 2: Run the Support test to verify RED**

```powershell
bun run build
bunx playwright test tests/launch-smoke.spec.ts --grep "support separates"
```

Expected: failure because `#data-source-node-docs` is absent.

- [ ] **Step 3: Add the fifth path and dedicated bilingual section**

Add a resource-index link to `#data-source-node-docs`. Insert a separate section after Community Edition with the exact product title `Data Source Node`, an `INTERNAL` label, a concise description of authorized internal technical documentation, and a primary external action. State that it is separate from Community Edition and requires authorized access. Do not claim authentication success.

Use an auto-fitting resource grid with a 160-pixel minimum column so five paths do not overflow. Style the new section with existing editorial borders and theme tokens rather than a new visual system.

- [ ] **Step 4: Update repository boundaries**

In `README.md`, replace “does not link to the document for now” with the approved Support-only access-qualified link. In `DESIGN.md`, replace the undecided access-policy sentence with a rule that public architecture pages remain generic while Support may link authorized staff to private technical documentation. In `CONTENT_OWNERSHIP.md`, make Support own the access-qualified internal-document route while keeping technical details in the private site.

- [ ] **Step 5: Run the Humanizer review**

Read and apply the `humanizer:humanizer` skill to only the newly written Thai and English public copy. Preserve `Data Source Node`, `Community Edition`, the access qualification, destination, and sensitive-data warning exactly in meaning.

- [ ] **Step 6: Verify Support is GREEN**

```powershell
bun run build
bunx playwright test tests/launch-smoke.spec.ts --grep "support separates"
```

Expected: bilingual assertions pass and the existing reader/Community Edition assertions remain green.

- [ ] **Step 7: Commit content and tests**

```powershell
git add tests/launch-smoke.spec.ts src/components/SupportPage.astro README.md DESIGN.md CONTENT_OWNERSHIP.md
git commit -m "feat: link support to internal documentation"
```

---

### Task 5: Final verification and rendered review

**Files:**
- Modify only if a failing check identifies a defect in files already owned by Tasks 1-4

**Interfaces:**
- Consumes: complete local `main` implementation
- Produces: fresh test logs and inspected renders; no deployment artifact is published

- [ ] **Step 1: Verify original assets**

```powershell
node scripts/verify-legacy-assets.mjs
```

Expected: every allowlisted legacy asset passes.

- [ ] **Step 2: Reinstall from the repository lockfile**

```powershell
npm ci
```

Expected: clean install with no lockfile mutation. Do not run `bun install` in this repository because there is no committed Bun lockfile.

- [ ] **Step 3: Run complete validation and browser tests using Bun as runner**

```powershell
bun run validate
bun run test:smoke
```

Expected: Astro checks, build, built-site checks, redirects, and all Playwright tests pass.

- [ ] **Step 4: Inspect actual pages**

Start the built preview on loopback and inspect `/`, `/support/`, `/en/support/`, `/platform/`, `/posts/`, and `/support/community-edition/user-manual/` at widths 320, 390, 768, and 1440. Cover Auto/light/dark, both languages, an open desktop theme menu, an open mobile navigation, focus rings, both wordmarks, sticky-header translucency, and zero horizontal overflow. Save screenshots under Playwright output or another ignored QA directory, not under committed public assets.

- [ ] **Step 5: Review the complete diff and repository state**

```powershell
git diff --check
git status --short --branch
git log --oneline -6
```

Confirm unrelated files are untouched, `package-lock.json` is unchanged unless `npm ci` proves the committed lock itself required a legitimate correction, and no `bun.lock` was created.

- [ ] **Step 6: Commit only a verified correction if Step 3 or 4 required one**

Use a narrow message such as `fix: preserve theme contrast at compact widths`; do not make an empty final commit.

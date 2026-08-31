# Repository publications migration

## Goal

Move HealthTAG news, articles, and verified awards into schema-validated repository content. The production build and detail pages must not depend on a CMS or Facebook.

## Checklist

- [x] Audit current publication routes, assets, redirects, metadata, and tests
- [x] Inventory all published HealthTAG articles and verified awards with source boundaries
- [x] Define Astro content collections and complete bilingual schema
- [x] Migrate full Thai and English article bodies, including Blockchain, NCDs, and Smart Contract
- [x] Migrate published news with 1-3 local images, provenance, checksums, and distinct dates
- [x] Add verified awards with local images and explicit confirmation boundaries
- [x] Build bilingual listing, static search, URL pagination, detail, and award routes
- [x] Add keyboard-accessible TOC, anchors, scroll margins, and mobile treatment
- [x] Add canonical, hreflang, structured data, navigation, sitemap, and one-to-one redirects
- [x] Humanizer review all new or materially revised public copy
- [x] Add content, routing, search, pagination, metadata, accessibility, and responsive tests
- [x] Verify legacy and publication assets
- [x] Run `npm ci`, `npm run validate`, Playwright, and axe checks
- [x] Inspect Thai and English pages at 320, 390, 768, and 1440 px
- [x] Commit coherent changes and open an unmerged PR with sources, dates, tests, preview evidence, limitations, and owner confirmations

## Decision log

- Work from a dedicated `codex/` branch in this isolated worktree.
- Preserve the existing Clinical Systems Editorial design and native CSS approach.
- Treat CMS and Facebook only as one-time migration sources; store all published content and media required at build time in Git.
- Do not publish a date, award boundary, deployment implication, or image identity that lacks owner confirmation or primary-source evidence.
- Publish 18 bilingual entries: 10 news items, 6 full articles, and 2 verified award or laureate records.
- The APICTA result confirms a category winner. The ODESS source confirms laureate selection. Neither record is presented as certification, regulatory approval, deployment, or contract evidence.
- Search and pagination query states use the canonical index URL and are intentionally excluded from the sitemap to avoid duplicate crawl URLs.

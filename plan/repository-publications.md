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

## Follow-up: complete awards and owner-confirmed news

- [x] Inventory all 10 CMS Awards records, full bodies, images, and original date evidence
- [x] Publish all 10 Awards records with their exact winner, runner-up, finalist, pitching, or programme-selection status
- [x] Replace negative award-boundary copy with precise positive statements of the result confirmed by each source
- [x] Write a purpose-built Thai and English summary for every Award while preserving the complete migrated body
- [x] Recover award dates from Facebook or organizer sources; preserve year/month precision without inventing a day
- [x] Download 1-3 local images for every Award and record provenance, credit, dimensions, checksum, and localized alt text
- [x] Add the Siriraj registration-site visit with event date 25 Nov 2024 and publication date 26 Nov 2024
- [x] Add the Centre for Health Innovation fellowship visit dated 14 Dec 2022
- [x] Add the Tan Tock Seng Hospital visit dated 5 Sep 2022
- [x] Add the Siriraj youth PHR presentation with event date 25 Aug 2022 and publication date 27 Aug 2022
- [x] Preserve the complete original body of all four owner-confirmed news records in natural Thai and English
- [x] Download 1-3 first-party Facebook images for each added news record with provenance and checksums
- [x] Re-audit every Article for complete body, purpose-written summary, author, translation, category, and image metadata
- [x] Verify search and pagination use only title, summary, category, and author
- [x] Update sitemap, structured data, exact legacy redirects, automated checks, and Playwright/axe coverage
- [x] Run Humanizer review across all revised Award, Article, and News copy
- [x] Run asset verification, `npm ci`, `npm run validate`, full Playwright/axe, and responsive visual review
- [ ] Commit coherent changes and open a new unmerged PR with sources, dates, tests, preview evidence, and unresolved source precision

## Decision log

- Work from a dedicated `codex/` branch in this isolated worktree.
- Preserve the existing Clinical Systems Editorial design and native CSS approach.
- Treat CMS and Facebook only as one-time migration sources; store all published content and media required at build time in Git.
- Do not publish a date, award boundary, deployment implication, or image identity that lacks owner confirmation or primary-source evidence.
- Publish 18 bilingual entries: 10 news items, 6 full articles, and 2 verified award or laureate records.
- The APICTA result confirms a category winner. The ODESS source confirms laureate selection. Neither record is presented as certification, regulatory approval, deployment, or contract evidence.
- Search and pagination query states use the canonical index URL and are intentionally excluded from the sitemap to avoid duplicate crawl URLs.
- Follow-up owner direction keeps all 10 original Awards-category records in the Awards section while naming their actual result status precisely.
- Follow-up owner direction adds four first-party HealthTAG visit and presentation records to the file-based newsroom.

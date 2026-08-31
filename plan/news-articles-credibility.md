# News and articles credibility plan

## Goal

Add a bilingual, static-first publication area to the new HealthTAG website without copying the credibility problems from the restored legacy newsroom. The new pages must separate company news from educational articles, use defensible dates, link to primary evidence where available, and state the language boundary of archived material honestly.

## Roast of the current state

### New website repository

- There is no news or article route, data model, navigation link, sitemap entry, feed, article metadata, or test coverage.
- `CONTENT_OWNERSHIP.md` does not assign ownership for dated company updates or long-form explainers.
- `Base.astro` supports bilingual canonical URLs but assumes the same localized path and sends every `x-default` hreflang to the homepage.

### Restored legacy newsroom and CMS

- The page looks polished at first glance, but the oversized hero and repeated card grid make a corporate archive feel like a template gallery. Important proof is visually equal to weak one-line posts.
- The English routes reuse Thai titles and body copy. This is a language switch in the navigation, not a genuinely bilingual publication experience.
- 30 of 38 published CMS records carry `2026-05-26` as `publishedAt`, matching the migration/import window rather than the historical event. News about 2022 to 2024 therefore appears to have been published on the same day in 2026.
- All 38 records have no populated author. Twenty-nine hero images have empty alt text.
- The UI prints reading time as `1อ่าน` and `1read`, which looks broken in both languages.
- Several cards repeat the title as the description, for example `ODESS Visit` and `MOU กับวว.`. Readers get no reason to trust or open them.
- Two clear article candidates are uncategorized, while awards and jobs share the same post collection. Category quality is not strong enough to publish automatically.
- The old article copy often uses broad blockchain, decentralization, ownership, security, and transparency language without visible sources or careful system boundaries.
- News cards do not identify the source organization, distinguish event date from publication date, or offer a correction path.
- The legacy navigation presents route changes as ARIA tabs. These are ordinary page links and should use normal navigation semantics.

## Product and content decisions

1. Preserve the established route families: `/posts/` for the combined publication page, `/news/` for company news, and `/articles/` for articles, with matching `/en/` routes.
2. Keep the experience text-first and editorial. Do not hotlink the legacy image wall or revive unverified assets.
3. Publish news only when it has a defensible event date or source publication date. Use a primary official source where one exists.
4. Reuse the existing Evidence data for source-backed milestones instead of duplicating the detailed evidence analysis.
5. Show the three currently categorized HealthTAG articles with defensible original dates as an archive selection. Provide natural Thai and English titles/summaries, state that the full originals are in Thai, and link to the public HealthTAG CMS archive. Hold the fourth item because its displayed date matches the migration batch.
6. Do not treat CMS `createdAt` or the 26 May 2026 migration timestamps as historical publication dates.
7. Do not auto-publish all CMS records. Items without a verified date, useful summary, source boundary, or content category remain unpublished on the new pages.
8. Add publication and correction notes that explain date usage, source links, language availability, and how to report a factual error.
9. Keep Evidence canonical for externally verified claims and Deployments canonical for implementation facts. News cards may link to those pages.
10. Use the official HealthTAG Facebook page as a first-party source for current company activity. Pair important external-event claims with an organizer or institution source when available.
11. Download selected original Facebook images into the repository so the new site does not depend on expiring Facebook CDN URLs. Preserve the images without generative alteration and write localized alt text from visible, verified details only.
12. Every published news item must have 1 to 3 locally stored images. Record the source, dimensions, SHA-256 hash, credit, and bilingual alt text for each image.

## Date and source rules

Each published news item must record:

- stable ID and type,
- event date and date precision,
- source publication date when known,
- source organization and URL,
- last verification date,
- bilingual title and summary,
- a clear statement of what the source confirms.

If an exact date cannot be confirmed, use year or month precision and display that precision honestly. Never fill the gap with the CMS migration date.

## Source research decisions

Published in the new index:

- Digital Health Forum 2026, event 25 and 26 August 2026, from the HealthTAG Facebook post and Ministry of Public Health event record.
- ODESS visit, event 16 and 17 May 2024, from the HealthTAG Facebook post and ODESS 2024 laureate list.
- BITKUB Summit session, event 19 October 2024, from Bitkub event sources.
- Thailand Insurance Symposium session, event 21 November 2024, from the Thai Life Assurance Association.
- ETDA DGT session, event 25 February 2023, from HealthTAG and ETDA sources.
- Siriraj 5G Smart Hospital, event 16 December 2021, from the existing verified Evidence record.
- NFC access evolution from the early concept posted 14 April 2020 through the Self-Isolation Tracking Wristband post dated 10 May 2021. The later move to an NFC sticker is owner-confirmed and does not yet have a recovered public transition date.

Held from publication:

- TISTR MoU: the TISTR source confirms the event on 3 July 2024 but does not name HealthTAG. Keep the HealthTAG role unpublished until owner evidence is attached.
- Mobile App for vulnerable groups: official sources confirm the event on 18 November 2024 but do not identify HealthTAG among the certificate recipients.
- Other visits and presentations supported only by HealthTAG posts remain candidates, not institutional endorsements or deployments.

Owner-confirmed on 31 August 2026:

- HealthTAG explored an NFC wristband in 2021 before using an NFC sticker that can attach to different surfaces or devices.
- The NFC sticker is one entry point to the user’s PHR. It does not store the user’s clinical record.
- The 10 May 2021 wristband post is recovered. No surviving public post has yet established the date of the later sticker transition, so the archive states that boundary directly.

## Checklist

### Audit and research

- [x] Inspect repository state and read project content/design guardrails.
- [x] Inspect `/posts`, `/news`, `/articles`, English routes, representative cards, and CMS metadata.
- [x] Quantify migration-date, author, alt-text, and categorization problems.
- [x] Fetch and review the current Web Interface Guidelines.
- [x] Find primary sources and defensible dates for selected high-value legacy news.
- [x] Record unresolved dates separately instead of inferring them.
- [x] Review the official HealthTAG Facebook page for current news.
- [x] Identify the 25–26 August 2026 Digital Health Forum post and Ministry of Public Health event source.
- [x] Download and visually verify a first-party event photo for local use.

### Content architecture

- [x] Add News & Articles ownership to `CONTENT_OWNERSHIP.md`.
- [x] Create a typed bilingual publication data model with source and date fields.
- [x] Add only source-backed news and the clearly labeled Thai article archive selection.
- [x] Add the latest verified Facebook news with an original local image and bilingual alt text.
- [x] Add 1 to 3 relevant local images to every published news item and record their provenance.
- [x] Run a Humanizer pass on all new Thai and English public copy.

### Interface and routes

- [x] Build a shared publication index component with combined, news-only, and article-only modes.
- [x] Add Thai routes for `/posts/`, `/news/`, and `/articles/`.
- [x] Add equivalent English routes.
- [x] Use normal links with `aria-current`, visible focus, useful link text, semantic dates, and long-title handling.
- [x] Add publication links to desktop, mobile, and footer navigation without causing header overflow.
- [x] Add collection structured data and correct route-level metadata.
- [x] Fix `x-default` to point to the default-language equivalent instead of the homepage.

### Preservation and discovery

- [x] Add the six index routes to the sitemap.
- [x] Preserve no-trailing-slash legacy index URLs with explicit redirects.
- [x] Keep historical detail URLs out of blanket redirects until each one has a reviewed destination.

### Verification

- [x] Add responsive, navigation, language, source, date, and accessibility tests.
- [x] Run `node scripts/verify-legacy-assets.mjs`.
- [x] Run `npm ci`.
- [x] Run `npm run validate`.
- [x] Run targeted Playwright smoke and axe checks.
- [x] Inspect Thai and English pages at 320, 390, 768, and 1440 px.
- [x] Review the complete diff and update this checklist with final status.

## Deferred until owner confirmation

- Rewriting or translating all 38 CMS records.
- Migrating full legacy article bodies and images into this repository.
- Publishing legacy posts whose only available date is the CMS migration timestamp.
- Editing records in the external CMS.
- Merging or deploying the branch.

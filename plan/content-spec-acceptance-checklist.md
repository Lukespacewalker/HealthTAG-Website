# HealthTAG content specification acceptance checklist

Use this checklist with `content-spec-implementation-plan.md`.

## Owner decisions

- [x] `/platform` is a landing page and does not replace the canonical deep pages.
- [x] Public identity-linkage naming is `Identity Connect` in English and `ระบบเชื่อมตัวตนผู้ป่วย` in Thai.
- [x] Public copy uses generic cloud-database wording and does not expose the specific vendor.
- [x] Siriraj stays within the confirmed Siriraj 5G Smart Hospital boundary.
- [x] Khian Sa is described as using HealthTAG FHIR Transformer without a start date.
- [x] The investor page and business-model categories are owner-confirmed.
- [x] Contact commits to a reply by email within seven days.
- [x] The confirmed public team role is `General Administration` / `ฝ่ายบริหารงานทั่วไป`.
- [x] Public-use permission for the confirmed organization, founder, and team information is recorded.

## Public naming and repository hygiene

- [x] Replace the retired identity-system name in public pages, articles, durable docs, and historical plan files.
- [x] Remove the specific cloud database vendor from public pages, articles, durable docs, and historical plan files.
- [x] Replace the previous assistant title with the confirmed public title.
- [x] Confirm the retired terms are absent from tracked and untracked source files:

```powershell
rg -n -i "Prompt[C]are|Dynamo[D]B" . --glob '!node_modules/**' --glob '!dist/**' --glob '!.git/**'
```

- [x] Rebuild, then confirm the same terms are absent from generated output:

```powershell
rg -n -i "Prompt[C]are|Dynamo[D]B" .astro dist
```

- [ ] Decide separately whether old Git history, releases, mirrors, and search caches need remediation. Do not rewrite history without explicit approval and coordination.

## Content ownership and data model

- [x] Add Platform and Investors to `CONTENT_OWNERSHIP.md`.
- [x] Give each recurring fact one maintained data source.
- [x] Remove or consolidate stale copy in `src/data/site-content.ts` where dedicated components render the current page.
- [x] Drive Home proof from the canonical evidence data.
- [x] Drive Home latest news from publication data rather than a fixed slug and date.
- [x] Keep deployment source statements separate from HealthTAG-provided implementation context.

## Routes and navigation

- [x] Add `/platform/` and `/en/platform/`.
- [x] Add `/investors/` and `/en/investors/`.
- [x] Add both routes to sitemap, canonical metadata, and hreflang output.
- [x] Add Platform and Investors to desktop, mobile, and footer navigation.
- [x] Keep Interoperability, How It Works, Trust and Access, PHR, Deployments, Network, Evidence, Awards, News, Articles, Support, Contact, and Privacy discoverable.
- [x] Correct `All publications` or include Awards in that view.
- [x] Verify active states for grouped parents and child routes.
- [x] Confirm Contact is one click on desktop and no more than two taps on mobile.

## Home

- [x] State the infrastructure proposition in the hero without claiming nationwide deployment coverage.
- [x] Use no more than two hero CTAs.
- [x] Show typed proof near the top with direct sources.
- [x] Keep Deployment, Award, Sandbox, Programme, Network, and Collaboration labels distinct.
- [x] Explain patient ownership, hospital stewardship, and HealthTAG's role together.
- [x] Present Data Connect, Identity Connect, Consent and Authorization, and Audit and Provenance.
- [x] Link each capability to its canonical page.
- [x] Add an audience router for hospital leaders, IT teams, public-sector and university partners, and investors.
- [x] Retain a real redacted PHR screenshot.
- [x] Keep Siriraj and Khian Sa summaries within their confirmed boundaries.

## Platform

- [x] Add local links for Overview, Capabilities, Operating model, For hospital leaders, For IT teams, and Evidence.
- [x] Explain outcomes before component detail.
- [x] Use one responsibility-first diagram with a complete text alternative.
- [x] Keep technical details readable without JavaScript.
- [x] Link to Interoperability, How It Works, Trust and Access, PHR, Deployments, Evidence, and official technical documentation.
- [x] Do not add unconfirmed identity, consent, security, certification, clinic, laboratory, or AI capabilities.

## Investors

- [x] State the infrastructure category and positioning without financial figures.
- [x] Keep policy or market claims out until a current official primary source is selected; use only maintained standards, deployment, and evidence records in this release.
- [ ] Review all PDPA wording with legal counsel or a designated reviewer.
- [x] Avoid saying that consent is the only lawful basis.
- [x] Use existing deployment and evidence records without changing their meaning.
- [x] Publish only owner-confirmed business-model categories.
- [x] Add the Investor Relations topic to Contact.
- [x] Keep internal recipient identities and routing rules out of public source files.

## Deployments and Evidence

- [x] Keep the Siriraj external-source statement separate from HealthTAG's implementation statement.
- [x] State that Khian Sa uses HealthTAG FHIR Transformer.
- [x] Show the four confirmed Khian Sa FHIR resources.
- [x] Omit the Khian Sa start date until supplied.
- [x] Do not publish a future-case placeholder.
- [x] Do not turn Network, Award, Sandbox, Programme, or Collaboration records into deployments.
- [x] Make external-source destinations clear before the user clicks.
- [x] Keep all evidence accessible if filters or disclosure controls fail.

## Company and team

- [x] Preserve Mission, Vision, the responsibility model, and all six values.
- [x] Add only the founder education and public roles confirmed by the site owner.
- [x] Use `General Administration` / `ฝ่ายบริหารงานทั่วไป` for the confirmed role.
- [x] Keep Thai names consistent on the Thai page and English names consistent on the English page.
- [x] Preserve verified original portraits and alt text.

## Contact

- [x] Contact posts to a same-origin endpoint and keeps the corporate email fallback visible.
- [x] Current copy states that the team replies to the supplied email address within seven days.
- [x] Sensitive-data warnings remain visible before the fields.
- [x] Add a same-origin POST endpoint that sends email.
- [x] Keep `contact@healthtag.io` as the visible fallback.
- [x] Use only name, reply email, organization optional, topic, and message.
- [x] Route provider, government and university, partnership, Investor Relations, press, and other topics.
- [x] Do not store message content unless a later retention requirement is approved.
- [x] Exclude field values and message text from analytics and routine logs.
- [x] Preserve field values after server or network failure.
- [x] Show success only after the email service accepts the request.
- [x] Fail closed without a Turnstile token and show the email fallback when JavaScript is unavailable.
- [x] Add rate limiting and spam controls.
- [x] Update Privacy with purpose, fields, recipients, retention, deletion, and fallback handling.
- [ ] Validate the production Turnstile widget, Email Service domain, Pages secrets, recipient delivery, replay rejection, and rate-limit namespace in the Cloudflare account.

## UX and accessibility

- [x] Global and local navigation work with keyboard and touch.
- [x] Focus is visible on every interactive control.
- [x] Heading levels and landmarks are logical.
- [x] Important state is not communicated by color alone.
- [x] Reduced-motion preferences are respected.
- [x] Static content does not use loading skeletons.
- [x] Disclosure controls use native semantics and remain readable in print.
- [x] Language switching stays on the equivalent route and preserves a meaningful section anchor where available.
- [x] No horizontal overflow occurs at 320, 390, 768, or 1440 px.
- [x] Thai tone marks and long labels remain readable.
- [x] External links use meaningful labels and identify the destination.
- [x] WCAG 2.2 AA remains the working target.

## Analytics

- [x] Do not add analytics until a privacy-first provider, purpose, and retention policy are approved.
- [x] Keep the current release independent of analytics and tracking scripts.
- [x] Reserve the approved future event boundary to route, CTA position, evidence item ID, language switch, deployment case ID, and contact topic.
- [x] Do not collect form values, message text, patient information, credentials, or cross-site identifiers.
- [x] Confirm the site remains useful without analytics.

## SEO and bilingual quality

- [x] Treat the supplied SEO table as guidance for core routes, not the whole site.
- [x] Retain metadata for every existing publication and utility route.
- [x] Write Thai and English naturally from the same facts.
- [x] Run Humanizer in embedded mode on every new or materially revised public paragraph.
- [x] Confirm the Humanizer pass did not remove technical accuracy or add claims.
- [x] Check canonical, hreflang, Open Graph, sitemap, and trailing-slash behavior.
- [x] Preserve deliberate legacy redirects.

## Automated verification

- [x] `node scripts/verify-legacy-assets.mjs`
- [x] `npm ci`
- [x] `npm run validate`
- [x] `npm run test:smoke`
- [x] Targeted tests for Platform, Investors, navigation, Contact, language switching, and evidence links
- [x] Targeted keyboard and no-JavaScript checks
- [x] Targeted accessibility checks on every materially changed route

## Visual verification

- [x] Home at 320, 390, 768, and 1440 px
- [x] Platform at 320, 390, 768, and 1440 px
- [x] Investors at 320, 390, 768, and 1440 px
- [x] Deployments and Evidence at narrow and desktop widths
- [x] Company and Contact at narrow and desktop widths
- [x] Thai and English versions of every changed page
- [x] Real content, long Thai labels, error messages, open navigation, and expanded disclosures

## Delivery

- [x] Review the complete diff and every delegated contribution.
- [x] Record the benchmark sources and the date reviewed.
- [x] Record owner-confirmed claims separately from externally sourced claims.
- [x] Prepare test results and representative screenshots under `docs/qa/` for the PR.
- [x] List remaining factual, legal, operational, and source limitations in this checklist and the implementation plan.
- [x] Open [PR #19](https://github.com/Lukespacewalker/HealthTAG-Website/pull/19) with the decisions, sources, tests, screenshots, and limitations.
- [x] Do not merge or deploy without explicit approval.

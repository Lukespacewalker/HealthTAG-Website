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

- [ ] Add Platform and Investors to `CONTENT_OWNERSHIP.md`.
- [ ] Give each recurring fact one maintained data source.
- [ ] Remove or consolidate stale copy in `src/data/site-content.ts` where dedicated components render the current page.
- [ ] Drive Home proof from the canonical evidence data.
- [ ] Drive Home latest news from publication data rather than a fixed slug and date.
- [ ] Keep deployment source statements separate from HealthTAG-provided implementation context.

## Routes and navigation

- [ ] Add `/platform/` and `/en/platform/`.
- [ ] Add `/investors/` and `/en/investors/`.
- [ ] Add both routes to sitemap, canonical metadata, and hreflang output.
- [ ] Add Platform and Investors to desktop, mobile, and footer navigation.
- [ ] Keep Interoperability, How It Works, Trust and Access, PHR, Deployments, Network, Evidence, Awards, News, Articles, Support, Contact, and Privacy discoverable.
- [ ] Correct `All publications` or include Awards in that view.
- [ ] Verify active states for grouped parents and child routes.
- [ ] Confirm Contact is one click on desktop and no more than two taps on mobile.

## Home

- [ ] State the infrastructure proposition in the hero without claiming nationwide deployment coverage.
- [ ] Use no more than two hero CTAs.
- [ ] Show typed proof near the top with direct sources.
- [ ] Keep Deployment, Award, Sandbox, Programme, Network, and Collaboration labels distinct.
- [ ] Explain patient ownership, hospital stewardship, and HealthTAG's role together.
- [ ] Present Data Connect, Identity Connect, Consent and Authorization, and Audit and Provenance.
- [ ] Link each capability to its canonical page.
- [ ] Add an audience router for hospital leaders, IT teams, public-sector and university partners, and investors.
- [ ] Retain a real redacted PHR screenshot.
- [ ] Keep Siriraj and Khian Sa summaries within their confirmed boundaries.

## Platform

- [ ] Add local links for Overview, Capabilities, Operating model, For hospital leaders, For IT teams, and Evidence.
- [ ] Explain outcomes before component detail.
- [ ] Use one responsibility-first diagram with a complete text alternative.
- [ ] Keep technical details readable without JavaScript.
- [ ] Link to Interoperability, How It Works, Trust and Access, PHR, Deployments, Evidence, and official technical documentation.
- [ ] Do not add unconfirmed identity, consent, security, certification, clinic, laboratory, or AI capabilities.

## Investors

- [ ] State the infrastructure category and positioning without financial figures.
- [ ] Support policy and market context with current official primary sources.
- [ ] Review all PDPA wording with legal counsel or a designated reviewer.
- [ ] Avoid saying that consent is the only lawful basis.
- [ ] Use existing deployment and evidence records without changing their meaning.
- [ ] Publish only owner-confirmed business-model categories.
- [ ] Add the Investor Relations topic to Contact.
- [ ] Keep internal recipient identities and routing rules out of public source files.

## Deployments and Evidence

- [ ] Keep the Siriraj external-source statement separate from HealthTAG's implementation statement.
- [ ] State that Khian Sa uses HealthTAG FHIR Transformer.
- [ ] Show the four confirmed Khian Sa FHIR resources.
- [ ] Omit the Khian Sa start date until supplied.
- [ ] Do not publish a future-case placeholder.
- [ ] Do not turn Network, Award, Sandbox, Programme, or Collaboration records into deployments.
- [ ] Make external-source destinations clear before the user clicks.
- [ ] Keep all evidence accessible if filters or disclosure controls fail.

## Company and team

- [ ] Preserve Mission, Vision, the responsibility model, and all six values.
- [ ] Verify founder education and public roles before adding them.
- [x] Use `General Administration` / `ฝ่ายบริหารงานทั่วไป` for the confirmed role.
- [ ] Keep Thai names consistent on the Thai page and English names consistent on the English page.
- [ ] Preserve verified original portraits and alt text.

## Contact

- [x] Current mail-draft copy explains that the user must review and send the draft.
- [x] Current copy states that the team replies to the supplied email address within seven days.
- [x] Sensitive-data warnings remain visible before the fields.
- [ ] Add a same-origin POST endpoint that sends email.
- [ ] Keep `contact@healthtag.io` as the visible fallback.
- [ ] Use only name, reply email, organization optional, topic, and message.
- [ ] Route provider, government and university, partnership, Investor Relations, press, and other topics.
- [ ] Do not store message content unless a later retention requirement is approved.
- [ ] Exclude field values and message text from analytics and routine logs.
- [ ] Preserve field values after server or network failure.
- [ ] Show success only after the email service accepts the request.
- [ ] Support a normal POST path without JavaScript.
- [ ] Add rate limiting and spam controls.
- [ ] Update Privacy with purpose, fields, recipients, retention, deletion, and fallback handling.

## UX and accessibility

- [ ] Global and local navigation work with keyboard and touch.
- [ ] Focus is visible on every interactive control.
- [ ] Heading levels and landmarks are logical.
- [ ] Important state is not communicated by color alone.
- [ ] Reduced-motion preferences are respected.
- [ ] Static content does not use loading skeletons.
- [ ] Disclosure controls use native semantics and remain readable in print.
- [ ] Language switching stays on the equivalent route and preserves a meaningful section anchor where available.
- [ ] No horizontal overflow occurs at 320, 390, 768, or 1440 px.
- [ ] Thai tone marks and long labels remain readable.
- [ ] External links use meaningful labels and identify the destination.
- [ ] WCAG 2.2 AA remains the working target.

## Analytics

- [ ] Select a privacy-first analytics approach before adding events.
- [ ] Document purpose, provider, retention, and privacy-notice changes.
- [ ] Limit events to route, CTA position, evidence item ID, language switch, deployment case ID, and contact topic.
- [ ] Do not collect form values, message text, patient information, credentials, or cross-site identifiers.
- [ ] Confirm the site remains useful when analytics is blocked.

## SEO and bilingual quality

- [ ] Treat the supplied SEO table as guidance for core routes, not the whole site.
- [ ] Retain metadata for every existing publication and utility route.
- [ ] Write Thai and English naturally from the same facts.
- [ ] Run Humanizer in embedded mode on every new or materially revised public paragraph.
- [ ] Confirm the Humanizer pass did not remove technical accuracy or add claims.
- [ ] Check canonical, hreflang, Open Graph, sitemap, and trailing-slash behavior.
- [ ] Preserve deliberate legacy redirects.

## Automated verification

- [x] `node scripts/verify-legacy-assets.mjs`
- [x] `npm ci`
- [x] `npm run validate`
- [x] `npm run test:smoke`
- [ ] Targeted tests for Platform, Investors, navigation, Contact, language switching, and evidence links
- [ ] Targeted keyboard and no-JavaScript checks
- [ ] Targeted accessibility checks on every materially changed route

## Visual verification

- [ ] Home at 320, 390, 768, and 1440 px
- [ ] Platform at 320, 390, 768, and 1440 px
- [ ] Investors at 320, 390, 768, and 1440 px
- [ ] Deployments and Evidence at narrow and desktop widths
- [ ] Company and Contact at narrow and desktop widths
- [ ] Thai and English versions of every changed page
- [ ] Real content, long Thai labels, error messages, open navigation, and expanded disclosures

## Delivery

- [ ] Review the complete diff and every delegated contribution.
- [ ] Record the benchmark sources and the date reviewed.
- [ ] Record owner-confirmed claims separately from externally sourced claims.
- [ ] Include test results and representative screenshots in the PR.
- [ ] List any remaining factual, legal, operational, or source limitation.
- [ ] Do not merge or deploy without explicit approval.

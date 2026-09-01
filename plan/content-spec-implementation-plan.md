# HealthTAG content specification implementation plan

Status: repository implementation complete; Cloudflare production activation and legal review pending

Reviewed: 2026-09-01

## Objective

Align the website with the approved Content Specifications and UX Notes while preserving verified facts, canonical page ownership, bilingual quality, sensitive-data safeguards, and the current Clinical Systems Editorial visual system.

The work adds a platform overview and an investor route without replacing the existing technical pages. It also changes the public identity-linkage name, keeps cloud-vendor details private, and prepares a short contact form that sends email.

## Owner decisions

The site owner confirmed the following decisions for this plan:

- `/platform` will be a landing page. Interoperability, How It Works, Trust and Access, and PHR remain canonical deep pages.
- The public English name is `Identity Connect`.
- The public Thai name is `ระบบเชื่อมตัวตนผู้ป่วย`.
- Public copy may say that identity-linkage data is stored in a cloud database. It must not name the database vendor or the retired internal identity-system name.
- Siriraj copy remains within the confirmed Siriraj 5G Smart Hospital boundary.
- Khian Sa Hospital uses HealthTAG FHIR Transformer. Do not publish a start date until the owner supplies one.
- The investor page and the owner-confirmed business-model description may be published without financial figures.
- Contact copy will state that the team replies to the supplied email address within seven days.
- The current public team title is `General Administration` in English and `ฝ่ายบริหารงานทั่วไป` in Thai.
- Rights and public-use permission for the confirmed organization names, founder information, and team information are approved for this work.

## Durable boundaries

- Patients own their health data and control consent and use.
- Hospitals store and steward clinical records in their source systems.
- HealthTAG provides identity, authorization, trusted exchange, audit, and patient-facing access infrastructure.
- Clinical records do not move through or reside on blockchain.
- Deployment, Network, Award, Sandbox, Programme, and Collaboration remain separate evidence types.
- Public copy must not imply nationwide deployment coverage.
- Public copy must not add SMART on FHIR, decentralized identity, verifiable credentials, revocation controls, per-item provenance, clinic or laboratory availability, certification, or security guarantees unless maintained evidence confirms them.
- Every page must retain Thai and English versions with natural wording in each language.

## Reference-site review

The review covered current official pages on 2026-09-01. These sites are references for information architecture and presentation only. Their claims, metrics, logos, copy, and visual assets must not be reused.

### Health data infrastructure

- [Redox](https://redoxengine.com/) separates Platform, Connection Network, Solutions, and Resources. The hero names one integration problem, then the site routes providers, vendors, and payers to different use cases.
- [Health Gorilla](https://www.healthgorilla.com/) combines a patient-centered outcome with a precise network and API role. A seven-step pipeline explains the operated service before audience-specific routes.
- [Particle Health](https://www.particlehealth.com/) introduces data-quality principles, then explains a short Locate, Verify, Enrich flow before showing delivery paths.
- [Zus Health](https://zushealth.com/platform/) keeps the platform page short. One architecture visual, direct technical-documentation access, and a small set of platform responsibilities carry most of the explanation.
- [InterSystems HealthShare](https://www.intersystems.com/products/healthshare/) uses the platform page as an index to deeper products. Its Who and How section maps each audience to value, customers, and further information.
- [Epic Interoperability](https://www.epic.com/software/interoperability/) organizes content around use cases and follows them with quantified proof and named implementation stories.

### Data and network infrastructure

- [Cloudflare](https://www.cloudflare.com/) uses one platform-level promise, one primary CTA, a network visual, and proof within the first two sections.
- [Equinix](https://www.equinix.com/) pairs an exploration CTA with a sales CTA, then moves from solution categories to ecosystem proof and a customer story.
- [Snowflake Platform](https://www.snowflake.com/en/product/platform/) puts executive benefits before technical diagrams and gives the platform page its own local navigation.
- [Datadog Product](https://www.datadoghq.com/product/) combines a real product screenshot with customer proof and alternating explanation-and-product sections.
- [Confluent Data Streaming](https://www.confluent.io/data-streaming/) uses one central data-flow illustration and attaches capability claims to customer examples.

## Design decisions from the review

### Adopt

- State one clear infrastructure proposition above the fold.
- Use no more than two hero actions. The primary action opens `/platform`; the secondary action opens `/contact`.
- Place typed proof near the top. Every item must identify whether it is a Deployment, Award, Sandbox, Programme, Network, or Collaboration.
- Use `/platform` as an index to the existing deep pages.
- Add a compact local navigation on long platform and investor pages.
- Explain the operating model with one clear diagram and an accessible text alternative.
- Route hospital executives, IT teams, public-sector and university partners, and investors to distinct next steps.
- Keep a real redacted PHR screenshot as product evidence after the platform explanation.
- Link each capability to a relevant deployment or evidence record where one exists.
- Keep one main idea in each section and vary the section composition.

### Avoid

- Do not use a mixed logo wall under a general `Trusted by` label.
- Do not use unsupported scale metrics, compliance badges, customer counts, or coverage claims.
- Do not copy the current sector trend of adding AI language to every infrastructure statement.
- Do not use large carousels, dense product catalogues, cinematic hero art, chat widgets, or decorative network animation.
- Do not hide essential proof behind tabs or accordions.
- Do not place a long enterprise CRM form on Contact.
- Do not add non-essential tracking that would require an intrusive cookie overlay.

## Target information architecture

```text
Home

Platform
  Platform overview
  Interoperability
  How It Works
  Trust and Access
  PHR

Deployments and Evidence
  Deployments
  Network
  Evidence
  Awards

Publications
  News
  Articles
  Awards

Company
  Company overview
  Mission and Vision
  Values
  Founder
  Team
  Investors

Utilities
  Support
  Contact
  Privacy
  Thai / English
```

Existing routes remain available. Any new route must have Thai and English versions, sitemap entries, canonical metadata, hreflang links, and deliberate redirects where needed.

## Page strategy

### Home

Use this sequence:

1. Infrastructure-led hero with `/platform` and `/contact` actions.
2. Typed proof strip with direct sources.
3. The patient, hospital, and HealthTAG responsibility model.
4. Four capability summaries: Data Connect, Identity Connect, Consent and Authorization, Audit and Provenance.
5. Audience router.
6. Selected Siriraj and Khian Sa deployment summaries.
7. Real redacted PHR product evidence.
8. Founder context and final contact action.

Keep Home concise. Detailed component names, the six-step flow, consent boundaries, and PHR behavior belong on their canonical pages.

### Platform overview

Create `/platform/` and `/en/platform/` with local links to:

- Overview
- Capabilities
- Operating model
- For hospital leaders
- For IT teams
- Evidence

The first half explains outcomes and responsibilities. The second half links to technical pages and official documentation. Use native disclosure controls only when the content remains readable without JavaScript and in print.

### Investors

Create `/investors/` and `/en/investors/` after the public copy receives an owner and legal review. The page may include:

- Infrastructure category and positioning
- Publicly sourced policy and standards context
- Existing deployment and evidence records
- Owner-confirmed business-model categories without revenue, pricing, forecasts, valuation, or contract details
- Founder and team context
- Investor Relations contact route

Do not state that consent is the only lawful basis under PDPA. Do not compare unrelated national infrastructure systems as if they used the same health-data architecture.

### Deployments and Evidence

- Keep the current separation between external-source statements and HealthTAG-provided implementation context.
- Describe Siriraj within the Siriraj 5G Smart Hospital programme boundary.
- State that Khian Sa uses HealthTAG FHIR Transformer and the four confirmed FHIR resources.
- Omit the Khian Sa start date until it is supplied.
- Do not show a placeholder for a future case study.
- Keep Network relationships separate from deployments.

### Company and team

- Preserve the current Company structure and anchors.
- Add only the confirmed founder education and public roles.
- Use `General Administration` and `ฝ่ายบริหารงานทั่วไป` for the confirmed team role.
- Keep Thai and English naming consistent within each page.

### Contact

The preferred target is a short form that posts to a same-origin endpoint and sends email. Keep `contact@healthtag.io` as the fallback.

Required behavior:

- Fields: name, reply email, organization optional, topic, and message.
- Topics: provider integration, government and universities, business partnership, Investor Relations, press, and other.
- Show the sensitive-data warning before the fields.
- Do not store the message in a database unless a later requirement defines retention and access controls.
- Do not send message content to analytics.
- On success, state that the team will reply to the supplied email address within seven days.
- On failure, preserve the entered fields and show the email fallback.
- Keep the POST endpoint fail-closed when Turnstile cannot provide a token. If JavaScript is unavailable, show `contact@healthtag.io` as the usable fallback.
- Use anti-abuse controls that do not claim a successful send before the email service accepts the request.

The public form must remain disabled when its Turnstile sitekey is not configured. The email fallback remains available in every state.

## Implementation phases

### Phase 0: decision-alignment cleanup

- Replace the retired public identity-system name with the approved bilingual capability name.
- Replace the specific cloud database vendor with generic cloud-database wording.
- Update the archived bilingual article.
- Update the team role.
- Add the seven-day response statement to Contact.
- Rebuild generated output and confirm the retired terms are absent.

### Phase 1: content model and ownership

- Update `CONTENT_OWNERSHIP.md` for Platform and Investors.
- Create shared bilingual data for capabilities and typed proof.
- Remove stale duplicate page copy from `src/data/site-content.ts` where dedicated components already own the rendered content.
- Make Home proof and latest news data-driven.
- Define source-boundary fields for deployment and evidence records.

### Phase 2: routes and navigation

- Add Platform and Investors routes in both languages.
- Add Platform and Investors to desktop, mobile, and footer navigation from the shared navigation model.
- Keep Network, Support, Privacy, Awards, News, Articles, and the existing deep pages discoverable.
- Correct the `All publications` label or include Awards in that view.

### Phase 3: Home and Platform

- Rebuild Home around the approved sequence.
- Build the Platform landing page and local navigation.
- Add the four capability summaries.
- Create an accessible operating-model diagram.
- Retain real redacted PHR product proof.

### Phase 4: Investors and proof pages

- Draft and verify the Investor page.
- Refine the reusable deployment-case template without weakening source boundaries.
- Add optional Evidence filters only if all content remains reachable without JavaScript.
- Keep every evidence type visible in text, not color alone.

### Phase 5: Contact delivery

- Select the same-origin email-delivery endpoint.
- Define recipients and routing outside public source files.
- Implement truthful success and error states.
- Add rate limiting, spam controls, logs that exclude message content, and operational monitoring.
- Update Privacy with purpose, fields, recipients, retention, and deletion behavior.

### Phase 6: UX, analytics, and accessibility

- Add local navigation to long pages where it reduces scanning effort.
- Use native disclosure controls for IT detail.
- Keep the sticky global header. Do not add shrink-on-scroll behavior unless testing shows a clear benefit.
- Preserve the same localized route when changing language. Preserve section anchors where they exist instead of copying pixel scroll position.
- Treat Contact as one click on desktop and no more than two taps on mobile.
- If analytics is added, collect only route, CTA position, evidence item ID, language switch, deployment case ID, and contact topic. Exclude field values and message text.

### Phase 7: SEO and migration

- Treat the supplied SEO table as core-route guidance, not as the complete sitemap.
- Write English metadata intentionally rather than translating Thai sentence structure.
- Preserve metadata for publications, Support, Privacy, PHR, Network, Awards, and technical pages.
- Recheck legacy redirects and all trailing-slash routes.

### Phase 8: validation and delivery

- Run all commands in the companion checklist.
- Inspect Thai and English at 320, 390, 768, and 1440 px.
- Review the complete diff and every public claim.
- Open a PR with decisions, sources, test results, screenshots, limitations, and any remaining owner confirmation.
- Do not merge or deploy without explicit approval.

## Completion criteria

The work is complete when the approved IA, public naming policy, deployment boundaries, seven-day contact commitment, bilingual quality, responsive behavior, evidence discipline, and all automated checks in the companion checklist pass.

## Remaining activation and review

- Turnstile widget creation, Email Service domain activation, Pages secrets, live recipient delivery, replay rejection, and the rate-limit namespace still require access to the HealthTAG Cloudflare account and explicit approval for the external widget.
- The public contact form therefore stays disabled when `PUBLIC_TURNSTILE_SITEKEY` is absent; `contact@healthtag.io` remains available in every state.
- The Investors page deliberately omits PDPA-specific and market-size claims. A legal or designated review is still required before adding PDPA interpretation.
- Khian Sa's start date remains unpublished until the owner supplies it.
- Git history, release archives, mirrors, and search-engine caches have not been rewritten or purged; that is a separate coordinated task.
- No analytics provider or tracking script has been added. The site remains fully usable without analytics.

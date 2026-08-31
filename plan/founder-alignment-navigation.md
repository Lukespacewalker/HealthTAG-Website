# Founder alignment and site navigation plan

## Objective

Bring the HealthTAG website into line with the founder-confirmed Mission, Vision, Core Values, and selected tagline while preserving the site's evidence discipline, bilingual parity, static-first Astro architecture, and verified product boundaries.

This plan also fixes the navigation and reading-journey problems identified in the full-site review. The work should make the founder's intent visible without turning a national vision into a claim of current nationwide deployment.

## Owner-confirmed foundation

### Selected tagline

- Thai: `ข้อมูลของคุณ ความยินยอมของคุณ เชื่อมถึงกันทั้งประเทศ`
- English: `Your data. Your consent. One connected Thailand.`

The tagline expresses the direction HealthTAG is building toward. It must not imply that HealthTAG already connects every provider or every person's records across Thailand.

### Ownership, custody, and infrastructure

- Health data belongs to the patient.
- Patients have authority over consent and the use of their health data.
- Hospitals store, safeguard, and steward clinical records in source systems.
- HealthTAG provides interoperability, identity, authorization, trusted exchange, and auditable access infrastructure.
- Blockchain records consent and access events. It does not store clinical records.

Use `patient ownership`, `patient consent authority`, `hospital stewardship`, and `source-system custody` as distinct ideas. Do not collapse them into a vague statement that hospitals own or control the patient's data.

### Founder framework

The canonical Company content must include:

1. Patient Sovereignty
2. Trust Before Intelligence
3. Data Stays at Source
4. Open Standards, Real Interoperability
5. Clinically Grounded
6. Ecosystem, Not Ego

## Claim boundaries

- Present `One connected Thailand` as Vision, not current network coverage.
- Present scope-bound, time-bound, auditable, and revocable consent as a founder principle unless a specific deployed product behavior is separately confirmed.
- Keep the confirmed 15-minute access window as an implementation fact. Do not equate that window with the complete consent lifecycle.
- Do not describe the current PHR connection controls as consent grant or revocation controls without separate product confirmation.
- Do not claim a deployed medical-AI training pipeline. `Trust Before Intelligence` describes the governance order HealthTAG believes medical AI requires.
- Do not call PromptCare ID decentralized identity unless the current implementation and documentation support that term.
- Preserve the distinction between deployment, network, sandbox, programme, award, and public collaboration.

## Scope

### Public content and design

- Home positioning, tagline, information hierarchy, metadata, and calls to action
- Company Mission, Vision, six Core Values, founder story, and team hierarchy
- Trust & Access consent and stewardship explanation
- How It Works consent, authorization, permitted response, and audit language
- Interoperability rationale for source-held data and open standards
- PHR patient ownership and product-boundary language where it can be changed safely
- Network collaboration and long-term accountability context
- News and Articles links back to current principles where relevant
- Shared header, mobile navigation, footer, active states, and related-reading journeys
- Thai and English copy written naturally in each language

### Documentation and tests

- `DESIGN.md`
- `CONTENT_OWNERSHIP.md`
- `README.md` if the public positioning summary changes materially
- Route, navigation, content, accessibility, and responsive tests
- Sitemap or redirects only if route ownership changes

## Non-goals

- Do not redesign the entire visual system.
- Do not introduce Tailwind or a client framework.
- Do not create a new nationwide deployment claim.
- Do not rewrite deployment, evidence, or historical-news facts without a source-driven reason.
- Do not change the support/download workflow beyond shared navigation and footer integration.
- Do not merge or deploy without explicit approval.

## Information architecture

Retain the current routes. Change how they are grouped and surfaced.

```text
Home

Platform
  Interoperability
  How It Works
  Trust, Consent & Access
  PHR

Deployments & Evidence
  Deployments
  Network
  Evidence & Sources

News & Articles
  All
  Company News
  Articles

About HealthTAG
  Founder, Mission & Vision
  Core Values
  Team

Utilities
  Support
  Contact
  Thai / English
```

Desktop, mobile, and footer navigation must come from one shared data model so routes, labels, and active states do not drift.

## Intended reading journey

1. Home states the selected tagline as Vision.
2. A short governance bridge explains patient ownership and hospital stewardship.
3. Three linked pillars introduce consent, source-held data, and connected care.
4. How It Works explains the conceptual exchange flow.
5. Interoperability and Trust provide implementation detail and boundaries.
6. PHR shows the patient-facing outcome.
7. Deployments and Evidence show what is currently confirmed.
8. Company provides the complete founder framework and team context.
9. Contact routes hospitals, public-sector organizations, universities, industry partners, and media without accepting sensitive data.

## Implementation plan

### Phase 0: readiness and worktree safety

- [x] Confirm how to handle the current `codex/news-articles-credibility` branch and uncommitted News/PHR/test changes.
- [x] Work on a dedicated `codex/` branch or receive explicit approval to continue on the current branch.
- [x] Recheck `git status` immediately before editing.
- [x] Record overlapping files and preserve every unrelated user change.
- [x] Read the latest relevant diffs before modifying an overlapping file.

### Phase 1: durable product language

- [x] Update `DESIGN.md` with the selected official tagline.
- [x] Reclassify `Connect health information. Keep hospitals in control.` as a hospital-facing product promise, not the official tagline.
- [x] Replace ambiguous `hospital control of data` language with precise hospital stewardship and source-system custody language.
- [x] Add the owner-confirmed ownership/custody/HealthTAG-role model to the durable content guidance.
- [x] Update `CONTENT_OWNERSHIP.md` so Company is the canonical source for Mission, Vision, Values, and founder context.
- [x] Define Trust & Access as the canonical page for consent, authorization, audit, and the patient/hospital responsibility boundary.

### Phase 2: shared navigation and orientation

- [x] Create one bilingual navigation data structure for desktop, mobile, and footer.
- [x] Add grouped Platform navigation.
- [x] Add grouped Deployments & Evidence navigation.
- [x] Group Posts, News, and Articles under one parent state.
- [x] Make Company discoverable as Founder, Mission, Vision & Values.
- [x] Keep Support, Contact, and language selection as utilities.
- [x] Add an explicit Home link in the mobile menu.
- [x] Apply correct `aria-current` state to grouped parents and child routes.
- [x] Preserve keyboard operation and visible focus.
- [x] Verify the menu at 320, 390, 768, 900, 1100, and 1440 px.

### Phase 3: Home

- [x] Introduce the selected tagline as a Vision statement.
- [x] Add a concise patient-ownership and hospital-stewardship bridge near the top of the page.
- [x] Reframe the current hero so the patient outcome appears before implementation terminology.
- [x] Keep the architecture diagram, but move or frame it as the operating model after the outcome.
- [x] Add three linked pillars: patient consent, data at source, and connected Thailand.
- [x] Keep current deployment and evidence claims scoped exactly as confirmed.
- [x] Keep PHR illustrations explicitly synthetic or illustrative.
- [x] Update titles, descriptions, Open Graph text, and image alt text to match the new hierarchy.

### Phase 4: Company

- [x] Add the full bilingual Vision from the founder source.
- [x] Add the full bilingual Mission from the founder source.
- [x] Add all six Core Values with concise, natural supporting copy.
- [x] Add the selected tagline in a Vision context.
- [x] Explain patient ownership, hospital stewardship, and HealthTAG's infrastructure role together.
- [x] Preserve the founder's clinical origin and named founder facts.
- [x] Rebalance the page so the team roster no longer dominates the founder framework.
- [x] Add in-page anchors or section navigation for Vision, Mission, Values, Founder, and Team.

### Phase 5: Trust, How It Works, Interoperability, and PHR

- [x] Rename or reframe Trust & Access to make consent visible without changing the route unnecessarily.
- [x] Distinguish consent from authorization in both languages.
- [x] Explain scope, time, audit, and revocation as principles, with implementation facts labeled separately.
- [x] Add `Trust Before Intelligence` without claiming a current AI training or clinical-AI deployment.
- [x] Replace `HealthTAG reads data` with a more precise authorized-request and permitted-response description.
- [x] Add the sequence `consent -> authorization -> permitted response -> audit` where technically defensible.
- [x] Explain why open standards matter: cross-vendor communication, reduced lock-in, and long-term extensibility.
- [x] Keep FHIR, HAPI, Kong, PostgreSQL, DynamoDB, and blockchain implementation facts unchanged unless verified sources support a correction.
- [x] Add patient-ownership language to PHR without claiming unverified grant/revoke UI behavior.
- [x] Preserve current NFC and synthetic-demo boundaries.

### Phase 6: Network, Evidence, News, Contact, and Privacy

- [x] Add a short `Ecosystem, Not Ego` bridge to Network without turning relationships into deployments.
- [x] Keep Evidence source boundaries and relationship definitions unchanged.
- [x] Link AI and blockchain archive items to the current Trust principles where useful.
- [x] Add contact routing for public-sector, university/research, and industry discussions if it can be done without implying an existing contract.
- [x] Preserve sensitive-data warnings and honest email-draft behavior.
- [x] Keep corporate website privacy separate from clinical systems and PHR processes.

### Phase 7: bilingual and Humanizer review

- [x] Draft Thai and English from the same facts, not by mirroring sentence structure.
- [x] Run the Humanizer review in embedded mode on every new or materially revised public paragraph.
- [x] Remove promotional filler, slogans beyond the selected tagline, repetitive negative framing, and editorial meta-language.
- [x] Check that no new fact, capability, deployment, legal status, certification, or security guarantee was invented.
- [x] Confirm technical names and role boundaries survived the Humanizer pass.
- [x] Scan revised public copy for em and en dashes and replace them unless they are part of an unchanged source title.

### Phase 8: verification

- [x] Review the complete diff, including delegated work.
- [x] Run `node scripts/verify-legacy-assets.mjs`.
- [x] Confirm that `npm ci` is not required because dependency and lock files are unchanged.
- [x] Run `npm run validate`.
- [x] Run `npm run test:smoke`.
- [x] Add or update tests for navigation grouping, active states, selected tagline, Mission, Vision, all six Values, and bilingual parity.
- [x] Confirm all important routes are reachable from desktop and mobile navigation.
- [x] Inspect Home, Company, Trust, PHR, Network, Evidence, Posts, Contact, Support, and Privacy at narrow and desktop widths.
- [x] Inspect Thai tone marks, wrapping, focus order, menu behavior, and footer grouping.
- [x] Confirm no horizontal overflow at 320, 390, 768, and 1440 px.
- [x] Run targeted WCAG 2.2 AA checks on all materially changed routes.
- [x] Confirm the sitemap, canonical links, hreflang links, and redirects remain valid.

### Phase 9: delivery

- [x] Summarize decisions, factual boundaries, and the selected tagline in the commit or PR description.
- [x] Include test results and representative desktop/mobile preview evidence.
- [x] List any principle that remains aspirational or any capability that still needs owner confirmation.
- [x] Keep commits coherent and separate from unrelated News/Articles work where possible.
- [x] Do not merge or deploy without explicit approval.

## Completion criteria

The work is complete when:

- The selected tagline is visible and clearly framed as Vision.
- Home explains patient ownership and hospital stewardship before technical detail.
- Company contains the complete bilingual Mission, Vision, and six Core Values.
- Trust distinguishes consent, authorization, implementation facts, and founder principles.
- Platform, proof, news, company, and utility routes have a clear shared navigation hierarchy.
- Thai and English remain materially equivalent and natural.
- No national coverage, consent-control, AI, deployment, or security capability is overstated.
- Validation, smoke, accessibility, route, and responsive checks pass.
- The final diff preserves all unrelated work already present in the repository.

## Readiness record

The News and Articles work was merged into `main`, local `main` was fast-forwarded to the merge, and the owner explicitly approved continuing on `main`. Implementation preserved the merged Publications, PHR, News, and test work.


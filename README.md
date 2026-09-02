# HealthTAG Website

Corporate website for HealthTAG, built with Astro and native CSS.

The site explains HealthTAG as healthcare interoperability infrastructure. Patients own their health data and control consent and use. Hospitals store and steward clinical records in their source systems. HealthTAG connects FHIR data, patient identity, authorization, trusted exchange, audit, and Personal Health Record experiences.

## Start here

| Document | Purpose |
| --- | --- |
| [`AGENTS.md`](./AGENTS.md) | Project-specific instructions and factual guardrails for coding agents |
| [`DESIGN.md`](./DESIGN.md) | Durable brand, UX, content, and visual direction |
| [`CONTENT_OWNERSHIP.md`](./CONTENT_OWNERSHIP.md) | Canonical page for each recurring concept, used to prevent copy duplication |
| [`docs/LEGACY_ASSETS.md`](./docs/LEGACY_ASSETS.md) | Provenance and identity mapping for migrated logos and team photography |
| [`docs/COMMUNITY_EDITION_SUPPORT.md`](./docs/COMMUNITY_EDITION_SUPPORT.md) | Product boundary, source provenance, design, and checks for the Community Edition manual |
| [`docs/NEWS_ASSETS.md`](./docs/NEWS_ASSETS.md) | Provenance and usage boundaries for first-party news photography |
| [`docs/PUBLICATION_ASSETS.md`](./docs/PUBLICATION_ASSETS.md) | Provenance and checksums for migrated article and award images |

The Data Source Node architecture documentation is the primary technical reference when changing architecture diagrams or implementation copy. Its future public-access policy will be decided separately. Public website copy uses generic component names and does not link to the document for now:

`https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/`

## Product architecture at a glance

- Patients own their health data and control consent and use.
- Hospitals store and steward clinical records in their source systems.
- HealthTAG provides the trust and interoperability infrastructure around authorized exchange.
- Hospital data enters the FHIR layer through either a hospital-managed IT script or HealthTAG FHIR Transformer.
- The public website describes the source-node stack as a FHIR Server using HL7 FHIR R4, a relational database, and an API Gateway.
- An identity and authorization service runs inside the hospital network.
- Identity Connect links hospital-local patient identities across providers. The linkage is stored in a cloud database.
- The current 15-minute access window is defined from blockchain state and checked by the authorization service.
- Blockchain records consent and access events as an immutable or tamper-resistant audit history. Clinical records are not stored on blockchain.

### Confirmed deployment examples

- **Siriraj Hospital:** HealthTAG participated in the Permission-based Blockchain for Personal Health Record workstream under Siriraj 5G Smart Hospital. Siriraj IT uses its own HIS-to-FHIR script and does not use HealthTAG FHIR Transformer.
- **Khian Sa Hospital:** has used HealthTAG FHIR Transformer since 1 June 2025 for selected HIS-to-FHIR R4 transformation. The currently confirmed Transformer scope includes `Patient`, `AllergyIntolerance`, `Encounter`, and `MedicationDispense`.

Network relationships, awards, sandbox participation, and collaborations are not automatically production deployments or current customer contracts. See the Network, Deployments, and Evidence pages for their separate roles.

## Technology

- Astro 7
- TypeScript
- Native CSS
- Static output
- Astro image optimization
- Cloudflare Pages deployment through GitHub Actions

No Tailwind or client framework is required for the current site architecture.

## Local development

Use the Node version declared in `package.json` and keep local, CI, and package engine requirements aligned.
The tested baseline is Node `22.12.0`, recorded in both `.nvmrc` and `.node-version`.

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run check      # Astro diagnostics
npm run build      # production static build
npm run validate   # check + build
npm run preview    # preview the production build
```

Verify migrated original assets with:

```bash
node scripts/verify-legacy-assets.mjs
```

## Repository structure

```text
.github/workflows/       CI and Cloudflare Pages deployment
public/                  static files, sitemap, robots, and social assets
scripts/                 asset integrity and maintenance scripts
src/assets/legacy/       verified original HealthTAG assets
src/components/          page and reusable UI components
src/content/             schema-validated bilingual news, articles, and awards
src/data/                bilingual content, evidence, network, and team mappings
src/layouts/             shared document shell and metadata
src/pages/               Thai and English routes
src/styles/              shared tokens and CSS
CONTENT_OWNERSHIP.md     canonical content responsibilities
DESIGN.md                design and content direction
docs/                    provenance and supporting documentation
```

## Content and evidence policy

- Prefer current owner-confirmed facts and official HealthTAG documentation.
- Use the legacy site or `healthtag.io-nx` only for historical assets, routes, company history, and copy that remains technically correct.
- Prefer official primary sources for external evidence.
- Describe exactly what a source confirms. Do not turn an award into regulatory approval, sandbox completion into certification, or collaboration into a live production capability.
- Never place real patient data, secrets, credentials, or private employee contact information in the website or repository.
- Do not fabricate product screenshots, customer relationships, security guarantees, or form submissions.

## Bilingual routes

Thai is served from root routes and English from `/en/`.

When changing public content:

- update both languages,
- preserve canonical and `hreflang` behavior,
- check Thai typography and label length,
- and update sitemap or redirects when routes change.

## CI and deployment

Pull requests run asset integrity verification, `npm ci`, Astro diagnostics, and the production build. PR builds may publish a review artifact.

A successful push to `main` deploys `dist/` to the configured Cloudflare Pages project. Required Cloudflare credentials are stored as GitHub Actions secrets and must never be committed.

## Contribution workflow

1. Inspect `git status` and relevant project documentation.
2. Work on a dedicated branch.
3. Keep commits coherent and claims source-backed.
4. Run the relevant verification commands and inspect rendered pages.
5. Open a PR with decisions, sources, test results, screenshots or preview artifacts, and known limitations.
6. Do not merge until explicitly approved.

# AGENTS.md

Project-specific instructions for coding agents working in `HealthTAG-Website`.
Generic Sol/Terra/Luna behavior may also be configured locally in `.codex`; this file keeps only the rules that must travel with this repository.

## Read first

Before making substantive changes, read:

1. `README.md`
2. `DESIGN.md`
3. `CONTENT_OWNERSHIP.md`
4. `docs/LEGACY_ASSETS.md` when touching migrated assets, partner marks, or team photography
5. The official Data Source Node documentation when changing architecture or technical copy:
   `https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/`

Inspect `git status` first. Preserve uncommitted user work and never use destructive Git commands to make the tree look clean.

## Agent ownership

- **Sol** owns scope, architecture, integration, final review, testing, and user communication. Communicate with the user in Thai unless asked otherwise.
- **Terra** handles substantial, bounded implementation or analysis that can proceed independently.
- **Luna** handles narrow reconnaissance, audits, exact comparisons, and targeted verification.
- Delegate only when it reduces context load or enables useful parallel work. Workers must return bounded results; Sol must review them before integration.
- Keep internal agent communication concise and in English. Only Sol reports routine progress to the user.

## Source-of-truth order

When sources disagree, use this order:

1. Explicit facts confirmed by the site owner for the current task
2. Official HealthTAG technical documentation
3. Current code and maintained documentation in this repository
4. `healthtag.io-nx` and the legacy public site for historical assets, routes, company history, and still-valid copy
5. Official external sources for awards, programmes, deployments, and collaborations

Do not infer product facts from filenames, logo order, page layout, or legacy marketing language. Record unresolved facts instead of guessing.

## Product facts that must not regress

- Hospitals remain custodians and controllers of patient clinical data.
- Data enters the hospital FHIR layer through either a hospital-owned IT script or HealthTAG FHIR Transformer.
- The current source-node stack uses HAPI FHIR Server, HL7 FHIR R4, PostgreSQL, and Kong API Gateway.
- HealthTAG Module, also called Hospital API, runs inside the hospital network and handles identity linkage and authorization.
- PromptCare ID supports linking hospital-local patient identities across providers.
- The current authorization window is 15 minutes.
- Blockchain records consent and access events as an immutable or tamper-resistant audit history. Clinical records are not stored on blockchain.
- Siriraj uses its own HIS-to-FHIR script and does not use HealthTAG FHIR Transformer.
- Khian Sa Hospital uses HealthTAG FHIR Transformer for selected FHIR R4 resources.
- A network relationship, logo, award, sandbox, or collaboration is not automatically a deployment, customer contract, certification, or live production capability.

## Engineering and content guardrails

- Keep Astro static-first and use native CSS. Do not introduce Tailwind or a client framework without a concrete repository requirement.
- Preserve the approved design direction in `DESIGN.md`; do not redesign the site from scratch for a bounded task.
- Follow `CONTENT_OWNERSHIP.md`. Link to the canonical page instead of repeating the same technical explanation everywhere.
- Keep Thai and English routes materially equivalent. Translate deliberately rather than producing half-translated technical prose.
- Use verified original logos and portraits. Do not replace real people with stock, generated, or placeholder avatars.
- Never expose real patient data, credentials, tokens, API keys, private employee contact data, or production secrets.
- Never fabricate a product screenshot, deployment, customer relationship, security property, certification, or form submission.
- Corporate contact flows must warn users not to send patient, medical, credential, or other sensitive data.
- Prefer official primary evidence. Describe exactly what a source confirms and separate it from HealthTAG-confirmed implementation context.
- Preserve important legacy URLs with deliberate redirects; do not redirect unrelated content to Home merely to avoid a 404.
- Keep dependency versions, `package-lock.json`, Node requirements, and CI configuration aligned.

## Workflow

1. Inspect the repository, relevant documentation, and rendered output.
2. State important ambiguities and factual risks before changing public claims.
3. Work on a dedicated branch with coherent commits.
4. Review worker output and the complete diff before testing.
5. Run checks appropriate to the change, including at minimum:
   - `node scripts/verify-legacy-assets.mjs` when legacy assets are present or touched
   - `npm ci`
   - `npm run validate`
   - targeted link, redirect, accessibility, and responsive checks when relevant
6. Inspect actual rendered pages at narrow and desktop widths; source review alone is insufficient for UI work.
7. Open a PR with decisions, sources, tests, screenshots or preview artifacts, limitations, and any owner confirmations still needed.
8. Do not merge unless the user explicitly asks.

## Definition of done

A change is done only when it is factually defensible, bilingual where applicable, visually checked, accessible for its scope, free of known sensitive-data risks, and supported by passing repository checks.
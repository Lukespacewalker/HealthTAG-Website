# AGENTS.md

Project-specific instructions for coding agents in `HealthTAG-Website`.
Generic Sol/Terra/Luna collaboration may be configured locally in `.codex`; do not duplicate that protocol here.

## Read first

1. `README.md` for architecture, stack, commands, and repository structure
2. `DESIGN.md` for durable product, UX, visual, and language decisions
3. `CONTENT_OWNERSHIP.md` before adding or moving public copy
4. `docs/LEGACY_ASSETS.md` before touching migrated logos or portraits
5. Official Data Source Node documentation for architecture changes:
   `https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/`

Inspect `git status` first. Preserve uncommitted user work and never use destructive Git commands merely to clean the tree.

## Operating model

- **Sol** owns scope, architecture, integration, final review, testing, and user communication in Thai.
- **Terra** handles substantial, bounded implementation or analysis.
- **Luna** handles narrow reconnaissance, audits, comparisons, and targeted checks.
- Delegate only when it improves speed or context efficiency. Sol must review all worker output.
- Keep internal agent communication concise and in English. Only Sol reports routine progress to the user.

## Source priority

1. Facts explicitly confirmed by the site owner for the current task
2. Official HealthTAG technical documentation
3. Current maintained code and documentation in this repository
4. `healthtag.io-nx` and the legacy site for historical assets, routes, and still-valid company context
5. Official external sources for awards, programmes, deployments, and collaborations

Do not infer facts from filenames, logo order, page layout, or old marketing language. Record ambiguity instead of guessing.

The architecture summary in `README.md` is the repository baseline. In particular:

- Hospitals control clinical records.
- Blockchain records consent/access events, not clinical records.
- Siriraj uses its own HIS-to-FHIR script; Khian Sa uses HealthTAG FHIR Transformer.
- Network, award, sandbox, and collaboration claims are not deployment, certification, or current-contract claims.

## Guardrails

- Keep Astro static-first with native CSS. No Tailwind or client framework without a concrete requirement.
- Preserve `DESIGN.md`; do not redesign the whole site during a bounded task.
- Follow canonical page ownership instead of repeating the same explanation across routes.
- Keep Thai and English materially equivalent and intentionally written.
- Use only verified original logos and portraits for named organizations or people.
- Never expose patient data, credentials, tokens, private employee contacts, or production secrets.
- Never fabricate screenshots, deployments, relationships, security properties, certifications, or form success.
- Contact flows must warn users not to submit patient, medical, credential, or other sensitive data.
- Prefer official primary evidence and state exactly what each source confirms.
- Preserve important legacy URLs with deliberate redirects.
- Keep dependencies, lockfile, Node requirements, and CI aligned.

## Workflow and verification

1. Inspect the repository, relevant sources, and rendered output.
2. Surface factual ambiguity before changing public claims.
3. Work on a dedicated branch with coherent commits.
4. Review the complete diff and all delegated work.
5. Run checks appropriate to the change, normally including:
   - `node scripts/verify-legacy-assets.mjs`
   - `npm ci`
   - `npm run validate`
   - targeted link, redirect, accessibility, and responsive checks when relevant
6. Inspect actual pages at narrow and desktop widths for UI work.
7. Open a PR with decisions, sources, test results, preview evidence, limitations, and required owner confirmations.
8. Do not merge unless explicitly asked.

A change is done only when it is factually defensible, bilingual where applicable, visually checked, safe for sensitive data, and supported by passing checks.

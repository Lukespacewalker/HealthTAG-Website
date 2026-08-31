# DESIGN.md

Durable product, content, and visual direction for the HealthTAG corporate website.
This document defines the rails. A task prompt defines the next destination.

## Brand thesis

The selected tagline is the company vision, not a claim of current nationwide coverage:

**Your data. Your consent. One connected Thailand.**<br>
**ข้อมูลของคุณ ความยินยอมของคุณ เชื่อมถึงกันทั้งประเทศ**

HealthTAG should be presented as trust and interoperability infrastructure for health data. The durable ownership model is:

- Patients own their health data and control consent and use.
- Hospitals store and steward clinical records in their source systems.
- HealthTAG provides infrastructure for identity linkage, authorization, trusted exchange, audit, and patient-facing access.

The website must make four ideas easy to understand:

1. Health data belongs to the patient, not to a system or vendor.
2. Patient control of consent and use is distinct from hospital custody and stewardship of the clinical record.
3. Existing hospital systems can participate without being replaced.
4. Identity, authorization, exchange, and audit are separate responsibilities.

Do not use "Keep hospitals in control" as a standalone promise. Without the ownership model above, it can imply that hospitals own patient health data. Product copy may state that hospitals keep custody of records or control their source systems when that distinction is clear.

## Mission, vision, and values

The Company page is the canonical source for the founder framework.

- **Vision:** a Thailand where each person can control consent and use of their health data, records can connect across the country, and data can support better care safely, transparently, and accountably. Nationwide connection is a direction, not a statement of current deployment coverage.
- **Mission:** build trusted health data infrastructure for Thailand. Clinical records stay in hospital source systems, use follows the data owner's consent, and open standards connect healthcare and ecosystem participants. The mission may describe a trusted foundation for future medical AI, but must not imply that HealthTAG currently trains AI on health records.
- **Patient Sovereignty:** patients own their health data and control consent and use. Hospitals store and steward the clinical record.
- **Trust Before Intelligence:** provenance, access rights, timing, and accountability must be clear before health data supports AI.
- **Data Stays at Source:** do not centralize the country's clinical records under HealthTAG.
- **Open Standards, Real Interoperability:** use open standards such as HL7 FHIR so systems from different vendors can connect without replacing the core HIS.
- **Clinically Grounded:** start product decisions with their effect on patient care, not with what technology can demonstrate.
- **Ecosystem, Not Ego:** national infrastructure requires accountable work with hospitals, universities, the public sector, and technology partners.

These are company principles. Describe a value as a deployed product behavior only when maintained code, official technical documentation, or deployment evidence confirms it. Do not infer decentralized identity implementation, consent-interface behavior, AI training, or nationwide deployment from the founder framework.

Blockchain is a trust and audit layer, not the visual or verbal identity of the entire company.

## Primary audiences

Design and copy should work for:

- Hospital executives and clinical leadership
- CIOs, hospital IT, integration, and security teams
- Public-sector and healthcare ecosystem partners
- Patients and general visitors trying to understand the PHR outcome

Use progressive disclosure: explain the outcome first, then the operating model, then the implementation detail.

## Design direction

The approved direction is **Clinical Systems Editorial**:

- Editorial hierarchy and generous whitespace
- Clear system boundaries and precise diagrams
- Healthcare cleanliness without generic hospital-blue styling
- Enterprise credibility without cybersecurity theatrics
- Human evidence through real deployments, real products, real people, and traceable sources

The site is light-first. Dark sections may be used sparingly to explain architecture or create emphasis, not as a default crypto aesthetic.

## Visual system

The current palette is intentional and should remain recognizable:

| Token | Hex | Purpose |
| --- | --- | --- |
| Paper | `#F6F8F7` | Primary page background |
| White | `#FFFFFF` | Product surfaces and raised content |
| Deep Petrol | `#102F36` | Primary text and dark technical sections |
| Clinical Teal | `#00766F` | Primary actions, links, and data paths |
| Pale Mint | `#DDF3EB` | Patient-facing and hospital source-system surfaces |
| Muted Slate | `#53676C` | Supporting text |
| Soft Border | `#D5E0DC` | Dividers and component boundaries |
| Signal Amber | `#B66A16` | Permission, time limits, consent, and audit accents |

Amber is an accent, not a second brand color. Do not rely on color alone to distinguish relationship or system states.

### Typography

- IBM Plex Sans for English
- IBM Plex Sans Thai Looped for Thai
- IBM Plex Mono only for identifiers, resources, technical labels, and small system metadata

Self-host approved fonts where practical and licensed. Maintain system fallbacks and avoid layout shift.

Thai copy must be designed, not merely substituted into an English layout. Allow for longer labels, tone marks, and comfortable line height.

### Layout and components

- Use an editorial grid with a content width around the existing `--max` token.
- Prefer visible structure, alignment, and borders over decorative shadows.
- Use moderate radii. Not every control, label, and container should become a pill.
- Vary section composition. Avoid building every page from identical heading-plus-three-card patterns.
- Cards should communicate a real grouping or action, not exist only because a grid is available.
- Preserve useful whitespace while keeping important proof and calls to action within a reasonable reading journey.

## Information design

### Architecture diagrams

Diagrams must communicate responsibility and boundaries before decoration.

Show, where relevant:

- The hospital-stewarded source environment
- Existing HIS
- Hospital-owned IT script and HealthTAG FHIR Transformer as two ingestion options
- HAPI FHIR Server using HL7 FHIR R4
- PostgreSQL persistence
- Kong API Gateway around or protecting the HAPI FHIR API
- HealthTAG Module or Hospital API inside the hospital network
- PromptCare ID identity linkage stored in Amazon DynamoDB
- Authorization, with the 15-minute access window defined from blockchain state and checked by the Hospital API
- Authorized PHR or application access
- Consent and access events flowing to the audit ledger

Do not draw clinical data as flowing through blockchain. If the physical request sequence is not established, label the diagram as conceptual and show responsibilities rather than inventing topology.

Use teal for clinical-data paths and amber for permission or audit paths, supported by labels, line patterns, or icons.

### Product proof

Prefer this evidence order:

1. Real product screenshots using authorized dummy or synthetic data
2. Clearly labeled illustrative UI when a real screenshot is unavailable
3. Text explanation only as a last resort

Never fabricate a screenshot or expose real patient information. Illustrative multi-provider scenarios must not imply unconfirmed production exchange between named institutions.

### Network and evidence

Network is broader than deployment.

Relationship types must be visibly distinct, for example:

- Deployment
- Network
- Sandbox
- Public Collaboration
- Award
- Programme
- International Network

Use real organization names and original marks. Do not inflate counts by making related entities appear to be independent deployments. Link to Deployments or Evidence when a relationship has supporting detail.

Evidence should use direct source links and precise wording. An award is not regulatory approval; sandbox completion is not certification; collaboration is not a live capability.

## Content architecture

`CONTENT_OWNERSHIP.md` defines the canonical page for recurring concepts. Keep it authoritative and update it when page responsibilities change.

General rule:

- Home creates interest and establishes proof.
- Internal pages earn the click by adding a distinct visual explanation, specification, case study, or decision-relevant detail.
- Do not make every internal page a different wrapper around the same prose template.

## Voice and terminology

The voice is calm, precise, technically literate, and human.

Use:

- Clear claims with defined scope
- Concrete system behavior
- Real deployment differences
- Source-backed evidence
- Plain language before implementation detail

Avoid:

- “Future of healthcare” filler
- Web3 and blockchain hype
- Absolute security claims
- Claims that FHIR or blockchain alone makes a system secure
- “Most secure,” “fully anonymous,” or similar unverified superlatives
- Inflated network, customer, or deployment language

For Thai, use Thai sentence structure and retain technical names only where they improve precision. Introduce an English term in parentheses on first use when helpful, then stay consistent.

## Accessibility and interaction

- Meet WCAG 2.2 AA as the working target.
- Preserve keyboard access, visible focus, logical headings, landmarks, and meaningful link text.
- Mobile navigation must expose every important route.
- Minimum layouts to inspect: 320, 390, 768, and 1440 px.
- Do not use color as the sole indicator.
- Respect reduced motion.
- Avoid animation that exists only to make data appear active or live.
- External links should be understandable without relying only on a small arrow icon.

## Brand assets

Use the original HealthTAG wordmark and verified migrated assets. Follow `docs/LEGACY_ASSETS.md` for provenance and identity mappings.

Do not redraw, recolor, stretch, or silently replace the logo. Do not use generated or stock portraits for named employees.

## Anti-patterns

Do not:

- Redesign the whole visual system during a bounded feature task
- Introduce Tailwind to reproduce existing native CSS
- Turn the site into an API-documentation portal
- Turn the site into a crypto landing page
- Fill pages with indistinguishable cards or logo walls
- Repeat the same architecture explanation on every page
- Hide evidence or relationship type in tiny low-contrast footnotes
- Simulate a successful form submission without a real endpoint
- Present a static timer as though it is live

When a proposed change conflicts with these principles, document the reason in the PR rather than quietly bending the design system.

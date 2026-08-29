# HealthTAG Website

Clinical Systems Editorial website for HealthTAG, built with Astro and native CSS.

## Stack

- Astro 7.2.x
- Native CSS only, no Tailwind
- Static-first rendering
- Thai primary content with English routes

## Development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## Positioning

The site presents HealthTAG as healthcare interoperability infrastructure rather than a generic blockchain PHR company. The core story is:

**HIS → FHIR → Identity → Authorization → PHR**, with blockchain used as an immutable consent/access audit ledger.

The current deployment copy is deliberately scoped to the FHIR Transformer deployments at Siriraj Hospital and Khian Sa Hospital. Review all production claims before launch.

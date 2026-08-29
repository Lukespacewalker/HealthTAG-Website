# HealthTAG Website

Astro corporate website for HealthTAG.

## Architecture principles

- Hospitals remain custodians of patient clinical data.
- Hospital data enters the FHIR layer through either a hospital-managed IT script or HealthTAG FHIR Transformer.
- The current source-node stack uses HAPI FHIR Server with HL7 FHIR R4 and PostgreSQL.
- Kong API Gateway protects the HAPI FHIR API.
- HealthTAG Module (Hospital API) runs inside the hospital network for PromptCare ID, identity linkage, and authorization.
- The current authorized access window is 15 minutes.
- Blockchain records consent and access events; clinical records are not stored on blockchain.

## Deployment examples

- Siriraj Hospital: HealthTAG participated in the Permission-based Blockchain for Personal Health Record workstream under Siriraj 5G Smart Hospital. Siriraj IT uses its own HIS-to-FHIR script.
- Khian Sa Hospital: uses HealthTAG FHIR Transformer for selected HIS-to-FHIR R4 transformation.

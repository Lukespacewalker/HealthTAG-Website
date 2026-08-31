---
kind: article
title: "Why NCDs require continuous attention"
summary: "NCD prevention and treatment continue over time. Connected records can support that continuity without replacing clinical judgement or patient choice."
author: HealthTAG
locale: en
translationKey: why-ncds-are-thailands-hidden-crisis
slug: why-ncds-are-thailands-hidden-crisis
category: Digital health
status: published
publishedAt: "2026-05-16"
migratedAt: "2026-08-31"
sources:
  - label: "Original article in the HealthTAG CMS archive"
    url: "https://cms.healthtag.io/posts/why-ncds-are-thailands-hidden-crisis"
    organization: HealthTAG
    type: archive
  - label: "Data Source Node architecture"
    url: "https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/"
    organization: HealthTAG
    type: first-party
images:
  - src: "../../../assets/publications/articles/why-ncds-are-thailands-hidden-crisis.jpg"
    alt: "A clinician and members of the public hold a glucose meter, a heart model, and a blood-pressure monitor beside the words Diabetes, Heart Disease, NCDs, and Blood Pressure"
    credit: "Image from the HealthTAG article archive"
    sourceUrl: "https://cms.healthtag.io/api/media/file/2026-why-ncds-are-thailands-hidden-crisis.jpg"
    checksum: "sha256:1739c831978807906f70eb8df60735bcafc77ea6ea4d2aee1e3dd76d4d9f82b5"
---

Noncommunicable diseases, or NCDs, include several groups of conditions such as diabetes, hypertension, heart disease, and cancer. Their causes and treatments differ, but they have something important in common: prevention, monitoring, and treatment often continue for years.

Continuity matters as much as any single appointment. When test results, medication lists, and visit histories sit in separate systems, clinicians may spend time reconstructing a record and patients may not remember every detail. Connected information can give an authorized care team better context and make changes over time easier to follow.

This article describes how data and health technology can support NCD care. It is not guidance for diagnosis or treatment changes. Patients should discuss their symptoms and care plans with a qualified healthcare professional.

## Chronic care extends beyond one appointment

Managing a chronic condition can involve results collected at different times, medicines supplied by more than one provider, and observations made outside a clinic. A trend can be more informative than a single reading. Clinicians interpret that trend alongside the person's history, symptoms, and circumstances.

Missing or delayed information can lead to repeated history taking or tests. This is partly a data problem and partly a workflow problem. A useful system must deliver information in a form the recipient can use, with its source, time, and scope intact.

## Data standards connect records at their source

HL7 FHIR R4 gives different health systems a shared structure for exchanging data. In HealthTAG's architecture, hospital information enters the hospital's FHIR Server through either a hospital-managed IT script or HealthTAG FHIR Transformer. The hospital remains in control of the clinical record.

Where an implementation supports it, authorized information such as encounters, medicines, or test results can appear in a PHR and help a patient follow their own history. The available data depends on the installation. Showing information in a PHR does not mean that the application diagnoses a condition or gives medical advice in place of a clinician.

## Connected information still needs access controls

A combined view does not mean every system should have permanent access. HealthTAG separates record storage from authorization. Clinical records stay in hospital-controlled FHIR systems, while the Hospital API checks a request against an access period defined from blockchain state.

Blockchain records consent and access events. It does not store test results or other clinical records. This keeps responsibility for the source record with the hospital while providing a history of how access rights were used.

## How information can support prevention

NCD prevention involves appropriate screening, monitoring of risk factors, and follow-up based on professional advice. Technology can arrange observations along a timeline, help a person return to their results, or give a care team an authorized view of information from more than one source.

An analytical model or AI system should not be treated as a certain answer. Its output depends on complete, accurate, and appropriate data, as well as testing with the people it is intended to serve. Clinical decisions still belong to qualified professionals working with the patient.

## Different participants have different responsibilities

Patients should be able to understand what information they have authorized, who may use it, and for how long. Hospitals are responsible for the quality, security, and appropriate use of records under their control. System developers must describe their scope precisely and should not claim that connecting data alone prevents disease.

Continuous NCD care needs accessible services, clinicians with the right context, and patients who can take part in their care plans. Health technology can reduce information gaps when it supports real clinical work and preserves the patient's rights at the same time.

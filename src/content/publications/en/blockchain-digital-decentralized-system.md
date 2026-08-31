---
kind: article
title: "Behind blockchain technology in digital healthcare"
summary: "A practical account of the separate roles played by hospital FHIR systems, access checks, and blockchain in HealthTAG's health-data exchange architecture."
author: HealthTAG
locale: en
translationKey: blockchain-digital-decentralized-system
slug: blockchain-digital-decentralized-system
category: Health technology
status: published
publishedAt: "2025-11-18"
migratedAt: "2026-08-31"
sources:
  - label: "Original post dated 18 November 2025"
    url: "https://www.facebook.com/mihealthtag/posts/1307896071139124/"
    organization: HealthTAG
    type: first-party
  - label: "HealthTAG CMS archive article"
    url: "https://cms.healthtag.io/posts/blockchain-digital-decentralized-system"
    organization: HealthTAG
    type: archive
  - label: "Data Source Node architecture"
    url: "https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/"
    organization: HealthTAG
    type: first-party
images:
  - src: "../../../assets/publications/articles/blockchain-digital-decentralized-system.jpg"
    alt: "Illustration of a phone, digital health records, a shield, and a padlock"
    credit: "Image from the HealthTAG article archive"
    sourceUrl: "https://cms.healthtag.io/api/media/file/strapi-110-blockchain-Digital-Decentralized-System.jpg"
    checksum: "sha256:8d411773cb784560c1d3e5be8fd03b792ca21ae0e3ced150a01959232c47c815"
---

Digital health information has to move between several systems. Hospitals need to keep clinical records in systems they control, while clinicians and patients need timely access to the information they are allowed to see. No single technology solves that problem. Storage, interoperability, authorization, and audit each need a defined role.

In HealthTAG's architecture, blockchain supports authorization state and access history. It does not store clinical records. That boundary matters more than the label "decentralized" because it shows who controls the data and which system is responsible for each operation.

## Clinical records remain with the hospital

Hospitals control their clinical records. Data from a hospital information system is mapped to HL7 FHIR R4 and stored in a FHIR Server within the hospital's boundary. A hospital can send data to FHIR with its own IT script or use HealthTAG FHIR Transformer for the resources agreed for that installation.

FHIR gives different systems a common data structure. It does not decide who may read a record, and it does not replace identity checks, network controls, or hospital operating procedures.

## Identity linkage and authorization are separate jobs

The same person may have a different patient identifier at each hospital. HealthTAG uses PromptCare ID to link those local identifiers to one person, with the linkage stored in Amazon DynamoDB. This helps match identity across providers without moving the person's clinical records out of hospital systems.

When a PHR application requests data, the Hospital API checks whether the request falls within an authorized period. The current system uses a 15-minute window defined from blockchain state. If the authorization is valid, the Hospital API requests FHIR data from the hospital system and returns it to the authorized application.

## Blockchain records events, not medical records

Blockchain is useful for information that needs a history that is difficult to alter later. In HealthTAG, that information consists of consent and access events. The history can show when permission was granted and when an authorized access took place.

Test results, medicines, allergies, and other clinical records are not written to blockchain. They stay in the hospital's FHIR Server and travel through an API only after an access check. A broad statement that blockchain "stores health data securely" does not describe the implemented architecture.

## Cryptography is one part of security

A hash-linked history can make later alteration easier to detect, but a healthcare system needs controls beyond a ledger. Kong API Gateway provides the TLS and authentication boundary in the current hospital-side stack. Credential management, firewall configuration, encryption, and hospital operations provide other safeguards.

Immutable should not be read as "incapable of error." Blockchain does not automatically correct inaccurate input, a compromised account, or permission that was defined too broadly. The design still has to control its inputs, user privileges, and incident response.

## Smart contracts and access rules

A smart contract is code that evaluates agreed conditions on a blockchain network. It can express rules that need consistent verification, such as authorization state and the period for which permission remains valid. It cannot interpret a patient's clinical context, and it should not be used as a reason to put clinical records on the network.

The Hospital API checks a 15-minute window defined from blockchain state, and blockchain records consent and access events. Smart-contract execution details depend on the deployed system version.

## What decentralization means here

Decentralization in this architecture does not mean copying every medical record to every node. It means that one database does not perform every job. Hospitals manage records, identity linkage connects local patient identifiers, the Hospital API checks access, and blockchain keeps the authorization and access history.

Clear boundaries make it possible to answer basic questions: where the data sits, who controls it, and what each technology does. That is a more useful foundation for accountable health-data exchange than applying blockchain to every kind of information.

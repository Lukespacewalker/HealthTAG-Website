---
kind: article
title: "Data is the New Medicine: using health information to understand care"
summary: "Health data can help patients and care teams see trends, plan treatment, and address risks earlier when it is accurate, interoperable, and used responsibly."
publishedAt: "2025-11-30"
migratedAt: "2026-08-31"
author: HealthTAG
locale: en
translationKey: data-is-the-new-medicine
slug: data-is-the-new-medicine
category: health-data
sources:
  - label: "Original article in the HealthTAG CMS"
    url: "https://cms.healthtag.io/posts/data-is-the-new-medicine-"
    organization: "HealthTAG"
    type: first-party
  - label: "Data Source Node architecture"
    url: "https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/"
    organization: "HealthTAG"
    type: primary
  - label: "Digital-in-Health: Unlocking the Value for Everyone"
    url: "https://www.worldbank.org/en/topic/health/publication/digital-in-health-unlocking-the-value-for-everyone"
    organization: "World Bank"
    type: primary
  - label: "Digital Health"
    url: "https://www.efpia.eu/about-medicines/development-of-medicines/digital-health/"
    organization: "European Federation of Pharmaceutical Industries and Associations"
    type: primary
images:
  - src: ../../../assets/publications/articles/data-is-the-new-medicine.png
    alt: "Illustration of the Data is the New Medicine concept connecting health information with patient care"
    credit: "HealthTAG"
    sourceUrl: "https://cms.healthtag.io/api/media/file/data-is-the-new-medicine.png"
    checksum: "sha256:2ff60cfecde27d85f08658b3df72a2d050f209de08bc6ccc1903d4d836ea7af9"
status: published
---

Health data is not medicine in a literal sense, but accurate information with the right context can help patients and care teams make better decisions. Hospital test results, medication history, readings from wearable devices, and daily activity logs each describe a different part of a person's health. Their value grows when the information is reliable, interoperable, and used with appropriate authorization.

The phrase "Data is the New Medicine" does not mean that technology can replace clinicians or treatment. It recognizes that information has become an important part of prevention, follow-up care, and individual treatment planning.

## Why health data matters

Health data can reveal changes over time that a single measurement cannot. A clinician might review several test results to assess a trend. A patient might use activity or sleep data to reconsider a daily habit. A healthcare provider might use appropriately governed information to plan services.

Well-managed information can support several practical tasks:

- giving care teams relevant history without repeatedly asking the patient for the same details
- tracking results after treatment or a medication change
- helping patients understand changes in their own health
- supporting screening and prevention before a problem becomes more serious

These benefits are not automatic. Data that lacks context, contains errors, or is out of date can produce a misleading conclusion. A useful system needs data quality controls, shared clinical meaning, and professional judgment.

## Turning information into decisions

Data analysis and artificial intelligence can help find patterns across large datasets, including changes in physiological readings or risk factors that accumulate over time. Depending on the use case, a tool might help prioritize cases, flag an unusual result, or support a personalized care plan.

An output from a model is not a diagnosis on its own. Reliability depends on the development data, the population where the model is used, the validation process, and clinical oversight. Any health data system that supports decisions should explain its limits and provide a clear path for human review.

### Information from different sources needs a common meaning

Hospitals can use different software and data formats. HL7 FHIR provides structures and meanings for exchanging health information, but adopting a standard still requires mapping, quality checks, and agreements between participating organizations.

In the HealthTAG architecture, each hospital continues to control its clinical records. Information enters the FHIR layer through a hospital-managed script or the HealthTAG FHIR Transformer, depending on the implementation. This makes exchange possible without transferring custody of the source medical record away from the hospital.

## Patient rights and provider responsibilities

Patients should be able to access information about themselves and understand who is asking to use it. This does not mean removing the medical record from hospital control. Hospitals retain legal and professional responsibilities for the accuracy, availability, and confidentiality of their records.

A Personal Health Record, or PHR, can give a patient a view of authorized information from more than one provider. Consent and access controls give patients a more active role in deciding how information is used. The surrounding system must also handle consent withdrawal, legal exceptions, and corrections to inaccurate data.

## The role of blockchain

HealthTAG uses blockchain as a layer for recording consent and access events. Test results, diagnoses, and clinical records are never stored on the blockchain. The event history can support an audit of when an authorization or access occurred within the system's defined scope.

This separation gives each part of the architecture a clear responsibility. Hospitals control clinical records. The FHIR layer supports authorized exchange. Blockchain supports the history of permissions and access. Blockchain alone does not make a system secure. Security also depends on identity verification, key management, access controls, infrastructure protection, and day-to-day operations across every participant.

## The challenges alongside the opportunity

Health information is highly sensitive. Bringing together data from multiple sources requires careful decisions about privacy, purpose, retention, and the rights of the people involved. Better connectivity can reduce duplication, but it also creates more interfaces that teams must protect and monitor.

People also need to understand which information is suitable for a particular decision. A wearable reading may be useful for tracking a trend, but it does not always have the accuracy or clinical meaning of a medical test. Law, ethics, and honest communication belong in the design of the system rather than being added after deployment.

Data supports better care when people interpret and use it responsibly. The goal is not to collect as much information as possible. It is to make necessary information accurate, available under the right authorization, and useful to the care of each patient.

## Further reading

- [Digital-in-Health: Unlocking the Value for Everyone](https://www.worldbank.org/en/topic/health/publication/digital-in-health-unlocking-the-value-for-everyone), World Bank
- Data for Health, MedTech Europe, 2023
- [Digital Health](https://www.efpia.eu/about-medicines/development-of-medicines/digital-health/), European Federation of Pharmaceutical Industries and Associations
- The Growing Role of Digital Health Data in Shaping Healthcare Outcomes, Logex, 2024
- How Digital Health Data Can Transform Care, NIH, 2024
- Health Data, Wikipedia, 2025
- AI and Health Data Analytics, arXiv, 2024
- [HL7 FHIR overview](https://www.hl7.org/fhir/overview.html), HL7 International
- [Data Source Node architecture](https://health-tag-document.suttisak-lukesp.workers.dev/guides/data-source-node/architecture/), HealthTAG

---
kind: news
title: "From an early NFC concept to a wristband and NFC sticker"
summary: "Posts from 2020 and 2021 record an NFC concept and wristband exploration. HealthTAG later moved to an NFC sticker, an entry point to the PHR that does not store clinical records."
author: HealthTAG
locale: en
translationKey: "nfc-access-evolution-2020-2021"
slug: "nfc-access-evolution-2020-2021"
category: "Product history"
status: published
publishedAt: "2020-04-14"
migratedAt: "2026-08-31"
eventDate: "2020-04-14"
eventEndDate: "2021-05-10"
sources:
  - label: "Open the 2020 NFC post"
    url: "https://www.facebook.com/mihealthtag/posts/pfbid0sX4quNrb1n2ZzbFrYJqUx6qBRAk7hFceVpL2iAF226VrniaEDQkSdsSfVZzpQR3l"
    organization: "HealthTAG Facebook page"
    type: "first-party"
  - label: "Open the 2021 wristband post"
    url: "https://www.facebook.com/mihealthtag/posts/pfbid02xSY4SCTAEh8rrbLP1XpDESJKrohqRuD6DLJT2GeJmZQ9TnXmm2uyubLatcyTqf2Al"
    organization: "HealthTAG Facebook page"
    type: "first-party"
  - label: "Confirmed by HealthTAG on 31 August 2026"
    organization: "HealthTAG"
    type: "owner-confirmed"
images:
  - src: "../../../assets/news/early-nfc-access-2020.jpg"
    alt: "HealthTAG illustration for an electronic health identifier during the 2020 outbreak period"
    credit: "Image: HealthTAG"
    sourceUrl: "https://www.facebook.com/mihealthtag/posts/pfbid0sX4quNrb1n2ZzbFrYJqUx6qBRAk7hFceVpL2iAF226VrniaEDQkSdsSfVZzpQR3l"
    checksum: "sha256:786065dd3347a452946014af046bf5fd26a4faa4f1b834534df24867a7440858"
---

## Starting with the question of access

HealthTAG's post from 14 April 2020 began with a question: how could digital health services reach older people, bedridden patients, children, and people in remote communities when many services depended on apps, internet access, and smartphones? The electronic health identifier concept proposed at the time would let a person tap an NFC device to open a web page without installing an app.

The post presented HealthTAG as one tool for accessing health information and related services during an outbreak and in everyday life. The team later developed the concept further and changed the device's role as the system architecture evolved.

## The seven questions in the 2020 post

The original post explained the concept through seven frequently asked questions.

### 1. How does NFC differ from a QR code?

The post compared tapping NFC with using a camera to scan a QR code. It emphasized the convenience of opening a web page on an NFC-compatible device and noted that a QR code can easily be photographed or copied. In the current system, either NFC or a QR code should act only as an entry point. Access to information still goes through the system's identity and authorization checks.

### 2. How is it different from the chip in a national ID card?

The HealthTAG concept was designed to work with an NFC-compatible phone without a dedicated card reader and its accompanying software. The aim was to let people open a web service with a device they already had.

### 3. How can it reduce the steps required by an app?

The post proposed a tap that opened a web page as an alternative to downloading an app. It would not require Bluetooth or Location to remain enabled. The wider system could still connect with other applications where a use case required it.

### 4. Who is responsible for the data?

The original post described information managed by a healthcare provider or government body, together with an encrypted mechanism linked to the device. HealthTAG's later approach assigns these responsibilities more precisely. Hospitals control clinical records in their own systems, the NFC sticker opens the PHR, and the system verifies identity and authorization before presenting information. Blockchain records consent and access events.

### 5. What happens if the device is lost?

The post proposed that the healthcare provider or relevant organization could issue a replacement and described encryption as protection against unauthorized reading. With the current NFC sticker, no clinical record resides on the sticker. Handling a lost sticker can therefore combine replacement with revoking or changing its identifier and applying the system's authorization checks.

### 6. How does NFC work?

NFC stands for Near Field Communication, a short-range communication technology. The passive chip in a sticker draws power from the phone during a tap, so it needs no battery or charging. The user needs an NFC-compatible phone or device to open the configured destination.

### 7. What role does a DID play?

The 2020 post proposed a Decentralized Identifier, or DID, to link identity with services on the platform. Its central idea was to give people an active role in controlling the use of their identity and information. HealthTAG's current architecture clearly separates identity linkage, authorization, and clinical record custody, with hospitals retaining control of clinical records.

## The Self-Isolation Tracking Wristband in 2021

On 10 May 2021, HealthTAG published the Self-Isolation Tracking Wristband concept for use during an outbreak. The wristband was presented as part of a tracking and processing system intended to support patients isolating at home. Patients would receive initial guidance and ongoing assistance from staff through the system. The post also linked to a demonstration video.

The wristband extended the idea beyond tapping to reach a web page. It explored how a wearable device could support the care process during home isolation and became another stage in HealthTAG's device work before the product developed further.

## The NFC sticker's role in the PHR

HealthTAG confirmed on 31 August 2026 that the later format is an NFC sticker and one way to open the PHR. Tapping the sticker opens the service on a compatible device, after which the system carries out its normal identity and authorization checks.

The NFC sticker does not store clinical records. Clinical information remains in systems controlled by hospitals. Separating the sticker from the record store lets HealthTAG combine the convenience of an NFC tap with identity, permission, and data management in the systems responsible for each function.

# Original HealthTAG image migration

Reviewed: 2026-08-30. Source: `Lukespacewalker/healthtag.io-nx`.

The allowlist in `scripts/legacy-assets.json` records each source path, target path, and Git blob SHA. All 24 binaries are copied unchanged. Astro generates display renditions from these local originals; a normal build has no dependency on the old website, a signed download URL, or private repository credentials.

## Partner marks

The source `frontend/src/components/pages/NetworkPage.astro` imports 5 healthcare marks, 7 Thai marks, and 4 international marks. The site owner confirmed on 2026-08-30 that these organizations remain in the HealthTAG network. Network status does not by itself establish 16 deployments or current contracts. The new page publishes all 16 marks and labels other relationship types separately.

| Original file | Identified organization |
| --- | --- |
| hospital-partner1.png | Siriraj Hospital |
| hospital-partner2.png | Faculty of Medicine Siriraj Hospital, Mahidol University |
| hospital-partner3.png | Siriraj Piyamaharajkarun Hospital, not Piyavate Hospital |
| jospital-partner4.png | Thammasat University Hospital; target filename fixes the source typo |
| hospital-partner5.png | Faculty of Medicine, Khon Kaen University; identity confirmed by the site owner on 2026-08-30 |
| thaipartner1.png | depa |
| thaipartner2.png | ETDA |
| thaipartner3.png | Thailand ICT Awards (TICTA) |
| thaipartner4.png | National Innovation Agency (NIA) |
| thaipartner5.png | SiData |
| thaipartner6.png | Standards and Interoperability Lab–Thailand (SIL-TH) |
| thaipartner7.png | Kin Yoo Dee Platform |
| interPartner1.png | UK Department for International Trade, historical branding |
| interPartner2.png | APICTA Awards |
| interPartner3.png | Asia eHealth Information Network (AeHIN) |
| interPartner4.png | Asia Open Data Partnership |

Names are read from the marks or explicitly confirmed by the site owner, not inferred from numbered filenames. Do not restore the earlier guessed Piyavate label. The confirmed Khon Kaen mark represents the Faculty of Medicine, not a separately confirmed hospital deployment. The Siriraj hospital mark and faculty mark are distinct brand assets but not asserted to be separate deployment sites. Award and sandbox marks receive their actual relationship category, not a generic customer endorsement. Existing deployment facts and Evidence source links remain the source of scope information.

### Khon Kaen identity confirmation

The site owner identified `hospital-partner5.png` as **คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น** on 2026-08-30. Its English label is **Faculty of Medicine, Khon Kaen University**. The site owner also confirmed that it remains in the HealthTAG network. This confirmation establishes its identity and network status only; it does not establish a production deployment or current contract. The original binary and its manifest checksum remain unchanged.

## Team photographs

- `dechowat.png`: source `frontend/src/data/site.ts` associates this image with Dechowat Promda.
- `ton.png`, renamed `suttisak.png`: the same source associates it with Suttisak Denduangchai.
- `bank.jpg`, renamed `tanawat.jpg`: source `frontend/src/data/card.ts` associates it with Tanawat Udom.

Identity mappings are taken from source records, not face recognition. Preserve target spelling and role text during this asset-only migration. Team roles are shown as a historical contributor record, not current employment. People without a verified image remain in a text list. No private phone numbers, personal social profiles, placeholder contact details, or pravatar images are migrated.

## Support images

The legacy Support component maps these original files directly to the named downloads. They are retained unchanged and used only where the image helps identify an interface or device.

| Original file | Current use |
| --- | --- |
| `nfc-new-scanner.png` | Screenshot of HealthTAG Card Reader, used with the recommended Windows reader. |
| `nfc-scanner.jpg` | Screenshot of the older HealthTAG NFC Reader, shown only inside the Legacy section. |
| `20220909_130154822_iOS.jpg` | Photograph whose visible product label identifies the Silicon Craft ADR12 reader. |

The generic Samsung tablet image and stock meeting image from the old Support page are not migrated because they do not show the supported connection or Community Edition interface. The old Community Edition manual route has no corresponding source document in the legacy repository and is not published as a working manual.

## Brand

`logo-light.png` has dark lettering for a light background; `logo-dark.png` has white lettering for a dark background. Keep the original colors and aspect ratio. Do not redraw the logo or apply CSS recoloring.

## Excluded

Unverified team images, stock avatars, sample news, unconfirmed network maps, old product promises, and old architecture drawings are not published by this migration.

## Check

Run `node scripts/verify-legacy-assets.mjs` for an offline verification of all originals. The export and import workflows used for the one-time transfer are removed from the final change set.

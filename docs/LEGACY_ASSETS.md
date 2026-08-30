# Original HealthTAG image migration

Reviewed: 2026-08-30. Source: `Lukespacewalker/healthtag.io-nx`.

The allowlist in `scripts/legacy-assets.json` records each source path, target path, and Git blob SHA. All 21 binaries are copied unchanged. Astro generates display renditions from these local originals; a normal build has no dependency on the old website, a signed download URL, or private repository credentials.

## Partner marks

The source `frontend/src/components/pages/NetworkPage.astro` imports 5 healthcare marks, 7 Thai marks, and 4 international marks. These are historical groupings, not proof of 16 deployments or current contracts. The new page publishes all 16 marks after the site owner confirmed the final healthcare logo's identity on 2026-08-30.

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

The site owner identified `hospital-partner5.png` as **คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น** on 2026-08-30. Its English label is **Faculty of Medicine, Khon Kaen University**. It is now displayed in Hospitals & medical institutions with the historical network listing relationship. This confirmation resolves image identity only; it does not establish a new production deployment or current contract. The original binary and its manifest checksum remain unchanged.

## Team photographs

- `dechowat.png`: source `frontend/src/data/site.ts` associates this image with Dechowat Promda.
- `ton.png`, renamed `suttisak.png`: the same source associates it with Suttisak Denduangchai.
- `bank.jpg`, renamed `tanawat.jpg`: source `frontend/src/data/card.ts` associates it with Tanawat Udom.

Identity mappings are taken from source records, not face recognition. Preserve target spelling and role text during this asset-only migration. Team roles are shown as a historical contributor record, not current employment. People without a verified image remain in a text list. No private phone numbers, personal social profiles, placeholder contact details, or pravatar images are migrated.

## Brand

`logo-light.png` has dark lettering for a light background; `logo-dark.png` has white lettering for a dark background. Keep the original colors and aspect ratio. Do not redraw the logo or apply CSS recoloring.

## Excluded

Unverified team images, stock avatars, sample news, unconfirmed network maps, old product promises, and old architecture drawings are not published by this migration.

## Check

Run `node scripts/verify-legacy-assets.mjs` for an offline verification of all originals. The export and import workflows used for the one-time transfer are removed from the final change set.

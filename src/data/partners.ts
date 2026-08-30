import type { ImageMetadata } from 'astro';
import type { Locale } from './site-content';
import siriraj from '../assets/legacy/partners/hospital-partner1.png';
import sirirajFaculty from '../assets/legacy/partners/hospital-partner2.png';
import siph from '../assets/legacy/partners/hospital-partner3.png';
import thammasat from '../assets/legacy/partners/hospital-partner4.png';
import depa from '../assets/legacy/partners/thaipartner1.png';
import etda from '../assets/legacy/partners/thaipartner2.png';
import ticta from '../assets/legacy/partners/thaipartner3.png';
import nia from '../assets/legacy/partners/thaipartner4.png';
import sidata from '../assets/legacy/partners/thaipartner5.png';
import silth from '../assets/legacy/partners/thaipartner6.png';
import kinYooDee from '../assets/legacy/partners/thaipartner7.png';
import dit from '../assets/legacy/partners/interPartner1.png';
import apicta from '../assets/legacy/partners/interPartner2.png';
import aehin from '../assets/legacy/partners/interPartner3.png';
import aodp from '../assets/legacy/partners/interPartner4.png';

type Localized = Record<Locale, string>;
export interface NetworkOrganization {
  id: string;
  name: Localized;
  logo: ImageMetadata;
  relationship: Localized;
  detailPage?: 'deployments' | 'evidence';
}
export interface NetworkGroup {
  id: string;
  title: Localized;
  introduction: Localized;
  organizations: NetworkOrganization[];
}
const listing: Localized = { th: 'รายชื่อในเครือข่ายเดิม', en: 'Historical network listing' };
export const networkGroups: NetworkGroup[] = [
  {
    id: 'healthcare',
    title: { th: 'โรงพยาบาลและสถาบันการแพทย์', en: 'Hospitals & medical institutions' },
    introduction: { th: 'องค์กรด้านการดูแลสุขภาพที่ปรากฏในเครือข่ายเดิมของ HealthTAG', en: 'Healthcare organizations represented in HealthTAG’s earlier network.' },
    organizations: [
      { id: 'siriraj', name: { th: 'โรงพยาบาลศิริราช', en: 'Siriraj Hospital' }, logo: siriraj, relationship: { th: 'โครงการ Siriraj 5G · รายละเอียดการติดตั้ง', en: 'Siriraj 5G · deployment details' }, detailPage: 'deployments' },
      { id: 'siriraj-faculty', name: { th: 'คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล', en: 'Faculty of Medicine Siriraj Hospital, Mahidol University' }, logo: sirirajFaculty, relationship: listing },
      { id: 'siph', name: { th: 'โรงพยาบาลศิริราช ปิยมหาราชการุณย์', en: 'Siriraj Piyamaharajkarun Hospital' }, logo: siph, relationship: listing },
      { id: 'thammasat', name: { th: 'โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ', en: 'Thammasat University Hospital' }, logo: thammasat, relationship: listing },
    ],
  },
  {
    id: 'thailand',
    title: { th: 'องค์กรและโครงการในประเทศไทย', en: 'Thai organizations & programmes' },
    introduction: { th: 'ความร่วมมือ โครงการทดสอบ และเครือข่ายนวัตกรรม โดยแยกประเภทความสัมพันธ์ไว้กับแต่ละองค์กร', en: 'Collaboration, testing programmes, and innovation networks, labeled by relationship.' },
    organizations: [
      { id: 'depa', name: { th: 'depa', en: 'depa' }, logo: depa, relationship: { th: 'ความร่วมมือภาครัฐ', en: 'Public-sector collaboration' }, detailPage: 'evidence' },
      { id: 'etda', name: { th: 'ETDA', en: 'ETDA' }, logo: etda, relationship: { th: 'Digital Service Sandbox', en: 'Digital Service Sandbox' }, detailPage: 'evidence' },
      { id: 'ticta', name: { th: 'Thailand ICT Awards (TICTA)', en: 'Thailand ICT Awards (TICTA)' }, logo: ticta, relationship: { th: 'เวทีรางวัลในข้อมูลเครือข่ายเดิม', en: 'Awards programme in legacy material' } },
      { id: 'nia', name: { th: 'สำนักงานนวัตกรรมแห่งชาติ (NIA)', en: 'National Innovation Agency (NIA)' }, logo: nia, relationship: { th: 'โครงการสนับสนุนนวัตกรรม', en: 'Innovation programme' }, detailPage: 'evidence' },
      { id: 'sidata', name: { th: 'SiData', en: 'SiData' }, logo: sidata, relationship: listing },
      { id: 'sil-th', name: { th: 'Standards and Interoperability Lab–Thailand', en: 'Standards and Interoperability Lab–Thailand' }, logo: silth, relationship: listing },
      { id: 'kin-yoo-dee', name: { th: 'Kin Yoo Dee Platform', en: 'Kin Yoo Dee Platform' }, logo: kinYooDee, relationship: listing },
    ],
  },
  {
    id: 'international',
    title: { th: 'เครือข่ายและโครงการต่างประเทศ', en: 'International networks & programmes' },
    introduction: { th: 'เวทีรางวัลและเครือข่ายสากลที่ปรากฏในข้อมูลเดิมของบริษัท', en: 'Awards and international networks documented in the earlier company material.' },
    organizations: [
      { id: 'dit', name: { th: 'Department for International Trade (UK)', en: 'Department for International Trade (UK)' }, logo: dit, relationship: { th: 'ชื่อและตราสัญลักษณ์ตามข้อมูลเดิม', en: 'Historical name and branding' } },
      { id: 'apicta', name: { th: 'APICTA Awards', en: 'APICTA Awards' }, logo: apicta, relationship: { th: 'รางวัลปี 2022 · หมวด Start-Up', en: '2022 award · Start-Up category' }, detailPage: 'evidence' },
      { id: 'aehin', name: { th: 'Asia eHealth Information Network (AeHIN)', en: 'Asia eHealth Information Network (AeHIN)' }, logo: aehin, relationship: listing },
      { id: 'aodp', name: { th: 'Asia Open Data Partnership', en: 'Asia Open Data Partnership' }, logo: aodp, relationship: listing },
    ],
  },
];

// hospital-partner5.png is preserved in the asset manifest but intentionally not
// imported into a page: the legacy code does not establish its organization name.
// Do not infer identity from list position or reuse the previously guessed label.

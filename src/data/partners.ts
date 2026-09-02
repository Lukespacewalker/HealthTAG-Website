import type { ImageMetadata } from 'astro';
import type { Locale } from './site-content';
import siriraj from '../assets/legacy/partners/hospital-partner1.png';
import sirirajFaculty from '../assets/legacy/partners/hospital-partner2.png';
import siph from '../assets/legacy/partners/hospital-partner3.png';
import thammasat from '../assets/legacy/partners/hospital-partner4.png';
import khonKaenMedicine from '../assets/legacy/partners/hospital-partner5.png';
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
  logo?: ImageMetadata;
  relationship: Localized;
  badge: Localized;
  detailPage?: 'deployments' | 'evidence';
  detailPath?: string;
  featured?: boolean;
}
export interface NetworkGroup {
  id: string;
  title: Localized;
  introduction: Localized;
  organizations: NetworkOrganization[];
}
const listing: Localized = { th: 'อยู่ในเครือข่าย HealthTAG', en: 'Listed in the HealthTAG network' };
export const networkGroups: NetworkGroup[] = [
  {
    id: 'healthcare',
    title: { th: 'โรงพยาบาลและสถาบันการแพทย์', en: 'Hospitals & medical institutions' },
    introduction: { th: 'โรงพยาบาลและสถาบันการแพทย์ในเครือข่าย HealthTAG', en: 'Hospitals and medical institutions in the HealthTAG network.' },
    organizations: [
      { id: 'siriraj', name: { th: 'โรงพยาบาลศิริราช', en: 'Siriraj Hospital' }, logo: siriraj, relationship: { th: 'กรณีศึกษาการติดตั้งภายใต้โครงการ Siriraj 5G Smart Hospital', en: 'Deployment case study within the Siriraj 5G Smart Hospital programme' }, badge: { th: 'การติดตั้งใช้งาน', en: 'Deployment' }, detailPage: 'deployments', featured: true },
      { id: 'siriraj-faculty', name: { th: 'คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล', en: 'Faculty of Medicine Siriraj Hospital, Mahidol University' }, logo: sirirajFaculty, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
      { id: 'siph', name: { th: 'โรงพยาบาลศิริราช ปิยมหาราชการุณย์', en: 'Siriraj Piyamaharajkarun Hospital' }, logo: siph, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
      { id: 'thammasat', name: { th: 'โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ', en: 'Thammasat University Hospital' }, logo: thammasat, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
      // The site owner confirmed this original logo's identity on 2026-08-30.
      { id: 'khon-kaen-medicine', name: { th: 'คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น', en: 'Faculty of Medicine, Khon Kaen University' }, logo: khonKaenMedicine, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
    ],
  },
  {
    id: 'thailand',
    title: { th: 'องค์กรในประเทศไทย', en: 'Organizations in Thailand' },
    introduction: { th: 'เครือข่าย HealthTAG ในประเทศไทยประกอบด้วย depa, ETDA, TICTA, NIA, SiData, Standards and Interoperability Lab–Thailand และ Kin Yoo Dee Platform', en: 'The HealthTAG network in Thailand includes depa, ETDA, TICTA, NIA, SiData, Standards and Interoperability Lab–Thailand, and Kin Yoo Dee Platform.' },
    organizations: [
      { id: 'depa', name: { th: 'depa', en: 'depa' }, logo: depa, relationship: { th: 'บันทึกความเข้าใจด้านโครงสร้างพื้นฐาน blockchain สำหรับบริการประชาชน', en: 'Public MoU on blockchain infrastructure for public services' }, badge: { th: 'ความร่วมมือสาธารณะ', en: 'Public Collaboration' }, detailPage: 'evidence' },
      { id: 'etda', name: { th: 'ETDA', en: 'ETDA' }, logo: etda, relationship: { th: 'ผลการทดสอบใน Digital Service Sandbox เป็นไปตามเป้าหมายที่ ETDA กำหนด', en: 'Testing in the Digital Service Sandbox met the goals set by ETDA' }, badge: { th: 'Sandbox', en: 'Sandbox' }, detailPage: 'evidence' },
      { id: 'ticta', name: { th: 'Thailand ICT Awards (TICTA)', en: 'Thailand ICT Awards (TICTA)' }, logo: ticta, relationship: { th: 'รางวัลรองชนะเลิศปี 2565 ในหมวด Technology Award: Blockchain และ Cross Category: Startup พร้อมได้รับเสนอชื่อเป็นตัวแทนประเทศไทยไป APICTA 2022', en: 'Two runner-up results in 2022, in Technology Award: Blockchain and Cross Category: Startup, followed by nomination to represent Thailand at APICTA 2022' }, badge: { th: 'รางวัล', en: 'Award' }, detailPath: '/awards/thailand-ict-award-2022/' },
      { id: 'nia', name: { th: 'สำนักงานนวัตกรรมแห่งชาติ (NIA)', en: 'National Innovation Agency (NIA)' }, logo: nia, relationship: { th: 'โครงการสนับสนุนการขยายตลาดและการจับคู่ธุรกิจ', en: 'Market-expansion and business-matching programme' }, badge: { th: 'โครงการ', en: 'Programme' }, detailPage: 'evidence' },
      { id: 'sidata', name: { th: 'SiData', en: 'SiData' }, logo: sidata, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
      { id: 'sil-th', name: { th: 'Standards and Interoperability Lab–Thailand', en: 'Standards and Interoperability Lab–Thailand' }, logo: silth, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
      { id: 'kin-yoo-dee', name: { th: 'Kin Yoo Dee Platform', en: 'Kin Yoo Dee Platform' }, logo: kinYooDee, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
    ],
  },
  {
    id: 'international',
    title: { th: 'องค์กรต่างประเทศ', en: 'International organizations' },
    introduction: { th: 'ความสัมพันธ์ระหว่างประเทศของ HealthTAG ครอบคลุมผู้จัดรางวัลและเครือข่ายด้านสุขภาพดิจิทัล', en: 'HealthTAG\'s international relationships include award organizers and digital-health networks.' },
    organizations: [
      { id: 'dit', name: { th: 'Department for International Trade (UK)', en: 'Department for International Trade (UK)' }, logo: dit, relationship: listing, badge: { th: 'เครือข่าย', en: 'Network' } },
      { id: 'apicta', name: { th: 'APICTA Awards', en: 'APICTA Awards' }, logo: apicta, relationship: { th: 'ผู้ชนะปี 2022 · หมวด Cross Category: Start-Up', en: '2022 winner · Cross Category: Start-Up' }, badge: { th: 'รางวัล', en: 'Award' }, detailPage: 'evidence' },
      { id: 'odess', name: { th: 'ODESS / Fondation Pierre Fabre', en: 'ODESS / Fondation Pierre Fabre' }, relationship: { th: 'ผู้จัดรางวัล ODESS Laureate 2024 พร้อมการสนับสนุนด้านเทคนิคและการเงินเป็นเวลา 12 เดือน', en: 'Organizer of the ODESS Laureate 2024 programme, which provides 12 months of technical and financial support' }, badge: { th: 'ผู้จัดรางวัลและผู้สนับสนุน', en: 'Award Organizer and Funder' }, detailPath: '/awards/odess-laureate-2024/' },
      { id: 'aehin', name: { th: 'Asia eHealth Information Network (AeHIN)', en: 'Asia eHealth Information Network (AeHIN)' }, logo: aehin, relationship: listing, badge: { th: 'เครือข่ายนานาชาติ', en: 'International Network' } },
      { id: 'aodp', name: { th: 'Asia Open Data Partnership', en: 'Asia Open Data Partnership' }, logo: aodp, relationship: listing, badge: { th: 'เครือข่ายนานาชาติ', en: 'International Network' } },
    ],
  },
];

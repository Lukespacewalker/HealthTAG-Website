import type { ImageMetadata } from 'astro';
import type { Locale } from './site-content';
import siriraj from '../assets/legacy/partners/hospital-partner1.png';
import sirirajFaculty from '../assets/legacy/partners/hospital-partner2.png';
import siph from '../assets/legacy/partners/hospital-partner3.png';
import depa from '../assets/legacy/partners/thaipartner1.png';
import etda from '../assets/legacy/partners/thaipartner2.png';
import nia from '../assets/legacy/partners/thaipartner4.png';
import silth from '../assets/legacy/partners/thaipartner6.png';

type Localized = Record<Locale, string>;

export interface NetworkOrganization {
  id: string;
  name: Localized;
  logo?: ImageMetadata;
  mark?: Localized;
  relationship: Localized;
  badge: Localized;
  detailPage?: 'deployments' | 'evidence';
  detailPath?: string;
}

export interface NetworkGroup {
  id: 'funders' | 'deployments' | 'government' | 'ecosystem';
  title: Localized;
  introduction: Localized;
  organizations: NetworkOrganization[];
}

const mark = (value: string): Localized => ({ th: value, en: value });

export const networkGroups: NetworkGroup[] = [
  {
    id: 'funders',
    title: { th: 'ผู้สนับสนุนและทุนโครงการ', en: 'Funders & grants' },
    introduction: { th: 'ทุนและโครงการสนับสนุนที่เกี่ยวข้องกับการพัฒนาและการขยายผลของ HealthTAG และ MU Health Data Network', en: 'Funding and support programmes connected with HealthTAG and the development of MU Health Data Network.' },
    organizations: [
      { id: 'btfp', name: { th: 'กองทุนวิจัยและพัฒนากิจการกระจายเสียง กิจการโทรทัศน์ และกิจการโทรคมนาคม เพื่อประโยชน์สาธารณะ (กทปส.)', en: 'Broadcasting and Telecommunications Research and Development Fund for Public Interest (BTFP)' }, mark: mark('กทปส. / BTFP'), relationship: { th: 'ทุน 30 ล้านบาทแก่โครงการ MU Health Data Network ผ่านมหาวิทยาลัยมหิดล ระยะปี 2568-2569 และส่งมอบครุภัณฑ์แล้วในเดือนสิงหาคม 2569', en: 'THB 30 million grant to the MU Health Data Network project through Mahidol University, 2025-2026. Equipment was delivered in August 2026' }, badge: { th: 'ทุนโครงการ', en: 'Project grant' } },
      { id: 'nia', name: { th: 'สำนักงานนวัตกรรมแห่งชาติ (NIA)', en: 'National Innovation Agency (NIA)' }, logo: nia, relationship: { th: 'ทุน Thematic Innovation Grant ปี 2568 โดยลงนามสัญญาและรับทุนแล้ว', en: 'Thematic Innovation Grant, contracted and funded in 2025' }, badge: { th: 'ทุนโครงการ', en: 'Project grant' }, detailPage: 'evidence' },
      { id: 'odess', name: { th: 'ODESS / Fondation Pierre Fabre', en: 'ODESS / Fondation Pierre Fabre' }, mark: mark('ODESS'), relationship: { th: 'HealthTAG เป็นโครงการแรกจากประเทศไทยที่ได้รับเลือกเป็น ODESS Laureate ปี 2024 พร้อมการสนับสนุนด้านเทคนิคและการเงิน 12 เดือน', en: 'HealthTAG was the first project from Thailand selected as an ODESS Laureate in 2024, with 12 months of technical and financial support' }, badge: { th: 'ผู้สนับสนุนโครงการ', en: 'Programme funder' }, detailPath: '/awards/odess-laureate-2024/' },
    ],
  },
  {
    id: 'deployments',
    title: { th: 'การติดตั้งใช้งานและหน่วยงานที่เข้าร่วม', en: 'Deployments & participating institutions' },
    introduction: { th: 'MU Health Data Network เปิดใช้งานจริงใน 5 หน่วยงานในปี 2569 ส่วนโรงพยาบาลเคียนซาใช้ HealthTAG FHIR Transformer สำหรับขอบเขตที่ยืนยันแล้วตั้งแต่ปี 2568', en: 'MU Health Data Network is live at five institutions in 2026. Khian Sa Hospital has used HealthTAG FHIR Transformer for its confirmed scope since 2025.' },
    organizations: [
      { id: 'siriraj-5g', name: { th: 'โรงพยาบาลศิริราช', en: 'Siriraj Hospital' }, logo: siriraj, relationship: { th: 'กรณีติดตั้งภายใต้โครงการ Siriraj 5G Smart Hospital ซึ่งเปิดใช้งานในปี 2565', en: 'Deployment under the Siriraj 5G Smart Hospital programme, live in 2022' }, badge: { th: 'กรณีการติดตั้ง', en: 'Deployment case' }, detailPage: 'deployments' },
      { id: 'siriraj-faculty', name: { th: 'คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล', en: 'Faculty of Medicine Siriraj Hospital, Mahidol University' }, logo: sirirajFaculty, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' }, detailPage: 'deployments' },
      { id: 'siph', name: { th: 'โรงพยาบาลศิริราช ปิยมหาราชการุณย์', en: 'Siriraj Piyamaharajkarun Hospital' }, logo: siph, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'golden-jubilee-medical-center', name: { th: 'ศูนย์การแพทย์กาญจนาภิเษก', en: 'Golden Jubilee Medical Center' }, mark: { th: 'ศูนย์การแพทย์ กาญจนาภิเษก', en: 'Golden Jubilee Medical Center' }, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'ramathibodi', name: { th: 'คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล', en: 'Faculty of Medicine Ramathibodi Hospital, Mahidol University' }, mark: mark('RAMATHIBODI'), relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'tropical-medicine', name: { th: 'คณะเวชศาสตร์เขตร้อน มหาวิทยาลัยมหิดล', en: 'Faculty of Tropical Medicine, Mahidol University' }, mark: { th: 'คณะเวชศาสตร์เขตร้อน', en: 'Tropical Medicine' }, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'khian-sa', name: { th: 'โรงพยาบาลเคียนซา', en: 'Khian Sa Hospital' }, mark: { th: 'โรงพยาบาลเคียนซา', en: 'Khian Sa Hospital' }, relationship: { th: 'ใช้ HealthTAG FHIR Transformer สำหรับขอบเขตข้อมูลที่ยืนยันแล้ว ตั้งแต่ 1 มิถุนายน 2568', en: 'Uses HealthTAG FHIR Transformer for its confirmed data scope since 1 June 2025' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' }, detailPage: 'deployments' },
    ],
  },
  {
    id: 'government',
    title: { th: 'ภาครัฐและบันทึกความเข้าใจ', en: 'Government & MoU' },
    introduction: { th: 'ความร่วมมือภาครัฐและสถาบันการศึกษามีขอบเขตต่างกัน HealthTAG ระบุบทบาทเฉพาะเมื่อได้รับการยืนยันแล้ว', en: 'Public-sector and university relationships have distinct scopes. HealthTAG states a specific role only where it is confirmed.' },
    organizations: [
      { id: 'mahidol', name: { th: 'มหาวิทยาลัยมหิดล', en: 'Mahidol University' }, mark: mark('MAHIDOL'), relationship: { th: 'HealthTAG เป็น Technology Partner สำหรับ MU Health Data Network และ MU Health Wallet ซึ่งมีผู้ใช้งานจริง 60,000 คน', en: 'HealthTAG is the Technology Partner for MU Health Data Network and MU Health Wallet, with 60,000 active users' }, badge: { th: 'พันธมิตรเทคโนโลยี', en: 'Technology partner' }, detailPage: 'deployments' },
      { id: 'moph-mahidol-mou', name: { th: 'กระทรวงสาธารณสุข และมหาวิทยาลัยมหิดล', en: 'Ministry of Public Health and Mahidol University' }, mark: mark('MOPH × MAHIDOL'), relationship: { th: 'MOU นี้เกี่ยวกับแพลตฟอร์มสุขภาพดิจิทัล โดย HealthTAG สนับสนุนเทคโนโลยีให้ MU Health Wallet และเชื่อมต่อกับหมอพร้อมสำเร็จ รวมทั้งร่วมจัดแสดงในงาน Digital Health Forum ทั้งนี้ HealthTAG ไม่ใช่ผู้ลงนาม MOU', en: 'For the Digital Health Platform MoU, HealthTAG provided technology support for MU Health Wallet and completed its Mor Prom connection. HealthTAG also exhibited at Digital Health Forum; it is not an MoU signatory' }, badge: { th: 'สนับสนุนด้านเทคโนโลยี', en: 'Technology support' }, detailPage: 'evidence' },
      { id: 'depa', name: { th: 'depa', en: 'depa' }, logo: depa, relationship: { th: 'บันทึกความเข้าใจด้านโครงสร้างพื้นฐาน blockchain สำหรับบริการประชาชน ปี 2566', en: 'Public MoU on blockchain infrastructure for public services, 2023' }, badge: { th: 'บันทึกความเข้าใจ', en: 'MoU' }, detailPage: 'evidence' },
      { id: 'etda', name: { th: 'สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA)', en: 'Electronic Transactions Development Agency (ETDA)' }, logo: etda, relationship: { th: 'สถานะ Certified ใน Digital Service Sandbox ปี 2567 สำหรับโรงพยาบาลเครือศิริราช 3 แห่ง หลังผลการทดสอบเป็นไปตามเป้าหมายและตัวชี้วัดความสำเร็จที่กำหนด', en: 'Sandbox Certified outcome in 2024 across three hospitals in the Siriraj network, after testing met the defined goals and success indicators' }, badge: { th: 'Sandbox Certified', en: 'Sandbox certified' }, detailPage: 'evidence' },
    ],
  },
  {
    id: 'ecosystem',
    title: { th: 'ระบบนิเวศ มาตรฐาน และอุตสาหกรรม', en: 'Ecosystem, standards & industry' },
    introduction: { th: 'องค์กรเหล่านี้มีบทบาทด้านโครงสร้างพื้นฐาน มาตรฐาน เวทีแลกเปลี่ยน หรือความร่วมมือเฉพาะโครงการ ไม่ได้หมายความว่าเป็นการติดตั้งใช้งานทุกกรณี', en: 'These organizations contribute infrastructure, standards, convening, or project-specific collaboration. These relationships do not by themselves indicate a deployment.' },
    organizations: [
      { id: 'true', name: { th: 'ทรู คอร์ปอเรชั่น', en: 'True Corporation' }, mark: mark('TRUE'), relationship: { th: 'ผู้สนับสนุนโครงสร้างพื้นฐานของโครงการ MU Health Data Network', en: 'Infrastructure supporter for the MU Health Data Network project' }, badge: { th: 'สนับสนุนโครงสร้างพื้นฐาน', en: 'Infrastructure support' } },
      { id: 'huawei', name: { th: 'หัวเว่ย', en: 'Huawei' }, mark: mark('HUAWEI'), relationship: { th: 'ผู้สนับสนุนโครงสร้างพื้นฐานของโครงการ MU Health Data Network', en: 'Infrastructure supporter for the MU Health Data Network project' }, badge: { th: 'สนับสนุนโครงสร้างพื้นฐาน', en: 'Infrastructure support' } },
      { id: 'who-thailand', name: { th: 'องค์การอนามัยโลก ประเทศไทย', en: 'World Health Organization Thailand' }, mark: mark('WHO'), relationship: { th: 'เข้าร่วม Regional Digital Health Wallets Thailand Inception Workshop ปี 2569', en: 'Participated in the Regional Digital Health Wallets Thailand Inception Workshop, 2026' }, badge: { th: 'การมีส่วนร่วมในเวที', en: 'Event participation' }, detailPage: 'evidence' },
      { id: 'kub-chain', name: { th: 'KUB Chain', en: 'KUB Chain' }, mark: mark('KUB'), relationship: { th: 'ความร่วมมือและบันทึกความเข้าใจด้าน Layer 2 สำหรับสุขภาพ ปี 2568', en: 'Layer 2 for healthcare collaboration and MoU, 2025' }, badge: { th: 'ความร่วมมือ', en: 'Collaboration' } },
      { id: 'sil-th', name: { th: 'Standards and Interoperability Lab–Thailand', en: 'Standards and Interoperability Lab–Thailand' }, logo: silth, relationship: { th: 'ความร่วมมือด้านมาตรฐานและการเชื่อมโยงข้อมูล ตั้งแต่ปี 2563', en: 'Collaboration on standards and interoperability since 2020' }, badge: { th: 'ความร่วมมือด้านมาตรฐาน', en: 'Standards collaboration' } },
      { id: 'thai-medical-informatics-association', name: { th: 'สมาคมเวชสารสนเทศไทย', en: 'Thai Medical Informatics Association' }, mark: { th: 'สมาคมเวชสารสนเทศไทย', en: 'Thai Medical Informatics Association' }, relationship: { th: 'ความร่วมมือด้าน Terminology Server ปี 2568', en: 'Terminology Server collaboration, 2025' }, badge: { th: 'ความร่วมมือด้านมาตรฐาน', en: 'Standards collaboration' } },
    ],
  },
];

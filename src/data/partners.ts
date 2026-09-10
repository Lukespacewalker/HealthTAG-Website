import type { ImageMetadata } from 'astro';
import type { Locale } from './site-content';
import siriraj from '../assets/legacy/partners/hospital-partner1.png';
import sirirajFaculty from '../assets/legacy/partners/hospital-partner2.png';
import siph from '../assets/legacy/partners/hospital-partner3.png';
import depa from '../assets/legacy/partners/thaipartner1.png';
import etda from '../assets/legacy/partners/thaipartner2.png';
import nia from '../assets/legacy/partners/thaipartner4.png';
import silth from '../assets/legacy/partners/thaipartner6.png';
import btfp from '../assets/network/btfp.png';
import goldenJubileeMedicalCenter from '../assets/network/golden-jubilee-medical-center.png';
import huawei from '../assets/network/huawei.png';
import khianSaHospital from '../assets/network/khian-sa-hospital.png';
import kubChain from '../assets/network/kub-chain.png';
import mahidolUniversity from '../assets/network/mahidol-university.png';
import ministryOfPublicHealth from '../assets/network/ministry-of-public-health.png';
import odess from '../assets/network/odess.png';
import ramathibodi from '../assets/network/ramathibodi.png';
import thaiHealthInformationStandardsDevelopmentCenter from '../assets/network/this.svg';
import tropicalMedicine from '../assets/network/tropical-medicine.jpg';
import trueCorporation from '../assets/network/true.svg';
import who from '../assets/network/who.svg';

type Localized = Record<Locale, string>;

export interface NetworkOrganization {
  id: string;
  name: Localized;
  logo?: ImageMetadata;
  mark?: Localized;
  darkLogo?: boolean;
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

export const networkGroups: NetworkGroup[] = [
  {
    id: 'funders',
    title: { th: 'ผู้สนับสนุนและทุนโครงการ', en: 'Funders & grants' },
    introduction: { th: 'ทุนและโครงการสนับสนุนที่เกี่ยวข้องกับการพัฒนาและการขยายผลของ HealthTAG และ MU Health Data Network', en: 'Funding and support programmes connected with HealthTAG and the development of MU Health Data Network.' },
    organizations: [
      { id: 'btfp', name: { th: 'กองทุนวิจัยและพัฒนากิจการกระจายเสียง กิจการโทรทัศน์ และกิจการโทรคมนาคม เพื่อประโยชน์สาธารณะ (กทปส.)', en: 'Broadcasting and Telecommunications Research and Development Fund for Public Interest (BTFP)' }, logo: btfp, relationship: { th: 'ทุน 30 ล้านบาทแก่โครงการ MU Health Data Network ผ่านมหาวิทยาลัยมหิดล ระยะปี 2568-2569 โดยงบประมาณได้รับอนุมัติในเดือนสิงหาคม 2569 ลงนามสัญญาในเดือนกันยายน 2569 และมีกำหนดส่งมอบครุภัณฑ์ในเดือนตุลาคม 2569', en: 'THB 30 million grant to the MU Health Data Network project through Mahidol University for 2025-2026. The budget was approved in August 2026, the agreement was signed in September, and equipment delivery is scheduled for October' }, badge: { th: 'ทุนโครงการ', en: 'Project grant' } },
      { id: 'nia', name: { th: 'สำนักงานนวัตกรรมแห่งชาติ (NIA)', en: 'National Innovation Agency (NIA)' }, logo: nia, relationship: { th: 'ทุน Thematic Innovation Grant ปี 2568 โดยลงนามสัญญาและรับทุนแล้ว', en: 'Thematic Innovation Grant, contracted and funded in 2025' }, badge: { th: 'ทุนโครงการ', en: 'Project grant' }, detailPage: 'evidence' },
      { id: 'odess', name: { th: 'ODESS / Fondation Pierre Fabre', en: 'ODESS / Fondation Pierre Fabre' }, logo: odess, relationship: { th: 'HealthTAG เป็นโครงการแรกจากประเทศไทยที่ได้รับเลือกเป็น ODESS Laureate ปี 2024 พร้อมการสนับสนุนด้านเทคนิคและการเงิน 12 เดือน', en: 'HealthTAG was the first project from Thailand selected as an ODESS Laureate in 2024, with 12 months of technical and financial support' }, badge: { th: 'ผู้สนับสนุนโครงการ', en: 'Programme funder' }, detailPath: '/awards/odess-laureate-2024/' },
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
      { id: 'golden-jubilee-medical-center', name: { th: 'ศูนย์การแพทย์กาญจนาภิเษก', en: 'Golden Jubilee Medical Center' }, logo: goldenJubileeMedicalCenter, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'ramathibodi', name: { th: 'คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล', en: 'Faculty of Medicine Ramathibodi Hospital, Mahidol University' }, logo: ramathibodi, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'tropical-medicine', name: { th: 'คณะเวชศาสตร์เขตร้อน มหาวิทยาลัยมหิดล', en: 'Faculty of Tropical Medicine, Mahidol University' }, logo: tropicalMedicine, relationship: { th: 'หน่วยงานที่เปิดใช้งานจริงใน MU Health Data Network ปี 2569', en: 'Live participating institution in MU Health Data Network, 2026' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' } },
      { id: 'khian-sa', name: { th: 'โรงพยาบาลเคียนซา', en: 'Khian Sa Hospital' }, logo: khianSaHospital, relationship: { th: 'ใช้ HealthTAG FHIR Transformer สำหรับขอบเขตข้อมูลที่ยืนยันแล้ว ตั้งแต่ 1 มิถุนายน 2568', en: 'Uses HealthTAG FHIR Transformer for its confirmed data scope since 1 June 2025' }, badge: { th: 'การติดตั้งใช้งานจริง', en: 'Live deployment' }, detailPage: 'deployments' },
    ],
  },
  {
    id: 'government',
    title: { th: 'ภาครัฐและบันทึกความเข้าใจ', en: 'Government & MoU' },
    introduction: { th: 'ความร่วมมือภาครัฐและสถาบันการศึกษามีขอบเขตต่างกัน', en: 'Public-sector and university relationships have distinct scopes.' },
    organizations: [
      { id: 'mahidol', name: { th: 'มหาวิทยาลัยมหิดล', en: 'Mahidol University' }, logo: mahidolUniversity, relationship: { th: 'HealthTAG เป็น Technology Partner สำหรับ MU Health Data Network และ MU Health Wallet ซึ่งมีผู้ใช้งานจริง 60,000 คน', en: 'HealthTAG is the Technology Partner for MU Health Data Network and MU Health Wallet, with 60,000 active users' }, badge: { th: 'พันธมิตรเทคโนโลยี', en: 'Technology partner' }, detailPage: 'deployments' },
      { id: 'moph-mahidol-mou', name: { th: 'กระทรวงสาธารณสุข และมหาวิทยาลัยมหิดล', en: 'Ministry of Public Health and Mahidol University' }, logo: ministryOfPublicHealth, darkLogo: true, relationship: { th: 'มหาวิทยาลัยมหิดลและกระทรวงสาธารณสุขเป็นผู้ลงนาม MOU ด้าน Digital Health Platform ส่วน HealthTAG ระบุว่าสนับสนุนเทคโนโลยีให้ MU Health Wallet เชื่อมต่อกับหมอพร้อมสำเร็จ และร่วมจัดแสดงในงาน Digital Health Forum', en: 'Mahidol University and the Ministry of Public Health signed the Digital Health Platform MOU. HealthTAG reports providing technology support for MU Health Wallet, completing its Mor Prom connection, and exhibiting at Digital Health Forum' }, badge: { th: 'สนับสนุนด้านเทคโนโลยี', en: 'Technology support' }, detailPage: 'evidence' },
      { id: 'depa', name: { th: 'depa', en: 'depa' }, logo: depa, relationship: { th: 'บันทึกความเข้าใจด้านโครงสร้างพื้นฐาน blockchain สำหรับบริการประชาชน ปี 2566', en: 'Public MoU on blockchain infrastructure for public services, 2023' }, badge: { th: 'บันทึกความเข้าใจ', en: 'MoU' }, detailPage: 'evidence' },
      { id: 'etda', name: { th: 'สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA)', en: 'Electronic Transactions Development Agency (ETDA)' }, logo: etda, relationship: { th: 'ออกจาก Digital Service Sandbox ปี 2567 หลังการทดสอบในโรงพยาบาลเครือศิริราช 3 แห่งเป็นไปตามเป้าหมายและตัวชี้วัดที่กำหนด', en: 'Exited the Digital Service Sandbox in 2024 after testing across three hospitals in the Siriraj network met the defined goals and indicators' }, badge: { th: 'ผลการทดสอบ Sandbox', en: 'Sandbox outcome' }, detailPage: 'evidence' },
    ],
  },
  {
    id: 'ecosystem',
    title: { th: 'ระบบนิเวศ มาตรฐาน และอุตสาหกรรม', en: 'Ecosystem, standards & industry' },
    introduction: { th: 'องค์กรเหล่านี้มีบทบาทด้านโครงสร้างพื้นฐาน มาตรฐาน เวทีแลกเปลี่ยน หรือความร่วมมือเฉพาะโครงการ', en: 'These organizations contribute infrastructure, standards, convening, or project-specific collaboration.' },
    organizations: [
      { id: 'true', name: { th: 'ทรู คอร์ปอเรชั่น', en: 'True Corporation' }, logo: trueCorporation, relationship: { th: 'ผู้สนับสนุนโครงสร้างพื้นฐานของโครงการ MU Health Data Network', en: 'Infrastructure supporter for the MU Health Data Network project' }, badge: { th: 'สนับสนุนโครงสร้างพื้นฐาน', en: 'Infrastructure support' } },
      { id: 'huawei', name: { th: 'หัวเว่ย', en: 'Huawei' }, logo: huawei, relationship: { th: 'ผู้สนับสนุนโครงสร้างพื้นฐานของโครงการ MU Health Data Network', en: 'Infrastructure supporter for the MU Health Data Network project' }, badge: { th: 'สนับสนุนโครงสร้างพื้นฐาน', en: 'Infrastructure support' } },
      { id: 'who-thailand', name: { th: 'องค์การอนามัยโลก ประเทศไทย', en: 'World Health Organization Thailand' }, logo: who, relationship: { th: 'เข้าร่วม Regional Digital Health Wallets Thailand Inception Workshop ปี 2569', en: 'Participated in the Regional Digital Health Wallets Thailand Inception Workshop, 2026' }, badge: { th: 'การมีส่วนร่วมในเวที', en: 'Event participation' }, detailPage: 'evidence' },
      { id: 'kub-chain', name: { th: 'KUB Chain', en: 'KUB Chain' }, logo: kubChain, darkLogo: true, relationship: { th: 'ความร่วมมือและบันทึกความเข้าใจด้าน Layer 2 สำหรับสุขภาพ ปี 2568', en: 'Layer 2 for healthcare collaboration and MoU, 2025' }, badge: { th: 'ความร่วมมือ', en: 'Collaboration' } },
      { id: 'sil-th', name: { th: 'Standards and Interoperability Lab–Thailand', en: 'Standards and Interoperability Lab–Thailand' }, logo: silth, relationship: { th: 'ความร่วมมือด้านมาตรฐานและการเชื่อมโยงข้อมูล ตั้งแต่ปี 2563', en: 'Collaboration on standards and interoperability since 2020' }, badge: { th: 'ความร่วมมือด้านมาตรฐาน', en: 'Standards collaboration' } },
      { id: 'thai-health-information-standards-development-center', name: { th: 'สำนักพัฒนามาตรฐานระบบข้อมูลสุขภาพไทย (สมสท.)', en: 'Thai Health Information Standards Development Center (THIS)' }, logo: thaiHealthInformationStandardsDevelopmentCenter, relationship: { th: 'ความร่วมมือด้าน Terminology Server ปี 2568', en: 'Terminology Server collaboration, 2025' }, badge: { th: 'ความร่วมมือด้านมาตรฐาน', en: 'Standards collaboration' } },
    ],
  },
];

import type { Locale } from './site-content';

type Localized = Record<Locale, string>;

export interface EvidenceEntry {
  id: string;
  eventDate: string;
  displayDate: Localized;
  sourceOrganization: Localized;
  sourcePublicationDate: Localized;
  lastVerifiedDate: string;
  tag: Localized;
  title: string;
  externallyConfirmed: Localized;
  healthTagContext: Localized;
  href: Localized;
}

export const evidence: EvidenceEntry[] = [
  {
    id: 'siriraj-5g-smart-hospital',
    eventDate: '2021-12-16',
    displayDate: { th: '16 ธ.ค. 2564', en: '16 Dec 2021' },
    sourceOrganization: { th: 'คณะแพทยศาสตร์ศิริราชพยาบาล', en: 'Faculty of Medicine Siriraj Hospital' },
    sourcePublicationDate: { th: '16 ธ.ค. 2564', en: '16 Dec 2021' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'โครงการ', en: 'Programme' },
    title: 'Siriraj 5G Smart Hospital',
    externallyConfirmed: {
      th: 'ศิริราชประกาศเปิดตัว Siriraj World Class 5G Smart Hospital พร้อมโครงการย่อย 9 โครงการ โดยมี Permission based blockchain for personal health record เป็นหนึ่งในโครงการ',
      en: 'Siriraj announced the Siriraj World Class 5G Smart Hospital with nine subprojects, including Permission based blockchain for personal health record.',
    },
    healthTagContext: {
      th: 'HealthTAG ระบุว่าเข้าร่วมโครงการย่อยด้าน PHR และทีม IT ศิริราชใช้ HIS-to-FHIR script ของตนเอง ประกาศของศิริราชไม่ได้เอ่ยชื่อ HealthTAG หรือรายละเอียดการติดตั้งดังกล่าว',
      en: 'HealthTAG says it participated in the PHR subproject and that Siriraj IT uses its own HIS-to-FHIR script. The Siriraj announcement does not mention HealthTAG or those implementation details.',
    },
    href: {
      th: 'https://si.mahidol.ac.th/th/hotnewsdetail.asp?hn_id=2728',
      en: 'https://www2.si.mahidol.ac.th/en/news-events/siriraj-jointly-launched-siriraj-world-class-5g-smart-hospital-with-nbtc-huawei/',
    },
  },
  {
    id: 'apicta-2022',
    eventDate: '2022',
    displayDate: { th: '2565', en: '2022' },
    sourceOrganization: { th: 'APICTA', en: 'APICTA' },
    sourcePublicationDate: { th: 'ผลรางวัลปี 2565', en: '2022 winner list' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'รางวัล', en: 'Award' },
    title: 'APICTA · Cross Category: Start-Up',
    externallyConfirmed: {
      th: 'รายชื่อผู้ชนะอย่างเป็นทางการของ APICTA ระบุ Healthtag จากประเทศไทย พร้อมผลิตภัณฑ์ BLOCKCHAIN-BASED PHR & HEALTH DATA MANAGEMENT PLATFORM เป็นผู้ชนะหมวด Cross Category: Start-Up',
      en: 'APICTA’s official winner list names Healthtag of Thailand and BLOCKCHAIN-BASED PHR & HEALTH DATA MANAGEMENT PLATFORM as the Cross Category: Start-Up winner.',
    },
    healthTagContext: {
      th: 'ผลการประกวดนี้ยืนยันรางวัลเท่านั้น และไม่ได้ครอบคลุมการอนุมัติด้านกฎระเบียบ การรับรองความปลอดภัย หรือการติดตั้งใช้งาน',
      en: 'The result confirms the award only. It does not cover regulatory approval, security certification, or a deployment.',
    },
    href: { th: 'https://apicta.org/files/apicta_wl_2022.html', en: 'https://apicta.org/files/apicta_wl_2022.html' },
  },
  {
    id: 'etda-digital-service-sandbox',
    eventDate: '2024-06-30',
    displayDate: { th: '1 ก.ค. 2566 ถึง 30 มิ.ย. 2567', en: '1 Jul 2023 to 30 Jun 2024' },
    sourceOrganization: { th: 'ETDA', en: 'ETDA' },
    sourcePublicationDate: { th: 'หน้าประกาศสถานะโครงการ', en: 'Programme status page' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'Sandbox', en: 'Sandbox' },
    title: 'ETDA Digital Service Sandbox',
    externallyConfirmed: {
      th: 'ETDA แสดงรายการบริการ HealthTAG ใน Digital Service Sandbox พร้อมช่วงทดสอบและสถานะออกจาก Sandbox โดยผลเป็นไปตามเป้าหมายและตัวชี้วัดความสำเร็จที่กำหนด',
      en: 'ETDA lists the HealthTAG service in its Digital Service Sandbox, including the testing period and an exit status after meeting the defined goals and success indicators.',
    },
    healthTagContext: {
      th: 'สถานะออกจาก Sandbox ยืนยันผลการทดสอบตามเป้าหมายของโครงการ ส่วนการรับรอง การอนุมัติด้านกฎระเบียบ และการใช้งานจริงต้องพิจารณาแยกกัน',
      en: 'Sandbox exit records testing against the programme goals. Certification, regulatory approval, and deployment status must be assessed separately.',
    },
    href: { th: 'https://www.etda.or.th/th/Our-Service/Digital-Service-Sandbox/announce.aspx', en: 'https://www.etda.or.th/th/Our-Service/Digital-Service-Sandbox/announce.aspx' },
  },
  {
    id: 'depa-healthtag',
    eventDate: '2023-01-12',
    displayDate: { th: '12 ม.ค. 2566', en: '12 Jan 2023' },
    sourceOrganization: { th: 'depa', en: 'depa' },
    sourcePublicationDate: { th: '12 ม.ค. 2566', en: '12 Jan 2023' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'ความร่วมมือสาธารณะ', en: 'Public Collaboration' },
    title: 'depa × HealthTAG',
    externallyConfirmed: {
      th: 'depa ประกาศบันทึกความเข้าใจกับ HealthTAG เพื่อพัฒนาโครงสร้างพื้นฐาน blockchain สำหรับบริการประชาชน',
      en: 'depa announced an MoU with HealthTAG to develop blockchain infrastructure for public services.',
    },
    healthTagContext: {
      th: 'ประกาศนี้บันทึกความร่วมมือสาธารณะ ส่วนการติดตั้งด้านสุขภาพและบริการที่เปิดใช้งานจริงต้องมีหลักฐานแยกต่างหาก',
      en: 'The announcement records a public collaboration. A healthcare deployment or live service would require separate evidence.',
    },
    href: { th: 'https://www.depa.or.th/th/article-view/20230112_03', en: 'https://www.depa.or.th/th/article-view/20230112_03' },
  },
  {
    id: 'nia-corporate-spark-china',
    eventDate: '2025-08-13',
    displayDate: { th: '13 ส.ค. 2568', en: '13 Aug 2025' },
    sourceOrganization: { th: 'สำนักงานนวัตกรรมแห่งชาติ', en: 'National Innovation Agency' },
    sourcePublicationDate: { th: '13 ส.ค. 2568', en: '13 Aug 2025' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'โครงการ', en: 'Programme' },
    title: 'NIA Corporate SPARK Outbound · China',
    externallyConfirmed: {
      th: 'NIA ระบุ HealthTAG เป็นหนึ่งในสามผู้ประกอบการไทยที่ได้รับคัดเลือกเข้าร่วม China Program 2025 พร้อมกิจกรรม business matching และการสนับสนุนด้านการขยายตลาด',
      en: 'NIA names HealthTAG as one of three Thai companies selected for the 2025 China Program, including business matching and market-expansion support.',
    },
    healthTagContext: {
      th: 'แหล่งข้อมูลยืนยันการเข้าร่วมโครงการ โดยไม่ได้ระบุการติดตั้งใช้งานหรือสัญญาในประเทศจีน',
      en: 'The source confirms programme participation and does not describe a deployment or contract in China.',
    },
    href: { th: 'https://www.nia.or.th/Shanghai-CorporateSPARK2025', en: 'https://www.nia.or.th/Shanghai-CorporateSPARK2025' },
  },
  {
    id: 'odess-field-profile',
    eventDate: '2021-09-01',
    displayDate: { th: 'เริ่มโครงการ 1 ก.ย. 2564', en: 'Project start · 1 Sep 2021' },
    sourceOrganization: { th: 'ODESS / Fondation Pierre Fabre', en: 'ODESS / Fondation Pierre Fabre' },
    sourcePublicationDate: { th: 'ปรับปรุง 19 พ.ค. 2569', en: 'Updated 19 May 2026' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'บทความแนะนำระดับนานาชาติ', en: 'International Profile' },
    title: 'ODESS field profile',
    externallyConfirmed: {
      th: 'ODESS นำเสนอ HealthTAG เป็นโครงการ digital health จากไทยที่มุ่งแก้ปัญหาข้อมูลสุขภาพกระจัดกระจาย การเชื่อมโยงข้อมูลระหว่างระบบ การเข้าถึงของผู้ป่วย และการใช้ HL7 FHIR',
      en: 'ODESS profiles HealthTAG as a Thai digital-health initiative addressing fragmented health data, interoperability, patient access, and the use of HL7 FHIR.',
    },
    healthTagContext: {
      th: 'บทความนี้เป็นข้อมูลแนะนำโครงการจากแหล่งภายนอก และไม่ได้ระบุรางวัล การรับรอง หรือการติดตั้งในสถานพยาบาลแห่งใด',
      en: 'This external profile describes the project. It does not record an award, certification, or a specific hospital deployment.',
    },
    href: { th: 'https://www.odess.io/en/initiative/decentralized-health-care-empowering-well-being-countrywide/', en: 'https://www.odess.io/en/initiative/decentralized-health-care-empowering-well-being-countrywide/' },
  },
  {
    id: 'orbix-healthtag',
    eventDate: '2026-03-13',
    displayDate: { th: '13 มี.ค. 2569', en: '13 Mar 2026' },
    sourceOrganization: { th: 'ธนาคารกสิกรไทย', en: 'KASIKORNBANK' },
    sourcePublicationDate: { th: '13 มี.ค. 2569', en: '13 Mar 2026' },
    lastVerifiedDate: '2026-08-30',
    tag: { th: 'ความร่วมมือเชิงยุทธศาสตร์', en: 'Strategic Collaboration' },
    title: 'Orbix Technology × HealthTAG',
    externallyConfirmed: {
      th: 'ธนาคารกสิกรไทยประกาศความร่วมมือ Orbix Technology และ HealthTAG โดยกล่าวถึง HealthTAG Wallet, HL7 FHIR, Quarix และการทดสอบระบบ',
      en: 'KASIKORNBANK announced a collaboration between Orbix Technology and HealthTAG, referring to HealthTAG Wallet, HL7 FHIR, Quarix, and system testing.',
    },
    healthTagContext: {
      th: 'ประกาศระบุว่านวัตกรรมทางการเงินบางส่วนยังอยู่ระหว่างการหารือ และต้องได้รับอนุมัติจากหน่วยงานกำกับก่อนให้บริการเชิงพาณิชย์',
      en: 'The announcement says some financial services remained under discussion and would require regulatory approval before commercial launch.',
    },
    href: { th: 'https://www.kasikornbank.com/th/news/pages/healthtag.aspx', en: 'https://www.kasikornbank.com/en/news/pages/healthtag.aspx' },
  },
];

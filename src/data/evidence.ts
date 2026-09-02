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
  supportingLinks?: Array<{
    label: Localized;
    href: Localized;
  }>;
}

export const evidence: EvidenceEntry[] = [
  {
    id: 'who-thailand-dhw-workshop-2026',
    eventDate: '2026-06-17',
    displayDate: { th: '17 มิ.ย. 2569', en: '17 Jun 2026' },
    sourceOrganization: { th: 'WHO Thailand และกระทรวงสาธารณสุข', en: 'WHO Thailand and the Ministry of Public Health' },
    sourcePublicationDate: { th: '18 มิ.ย. 2569', en: '18 Jun 2026' },
    lastVerifiedDate: '2026-09-02',
    tag: { th: 'เวทีสาธารณะ', en: 'Public Forum' },
    title: 'Regional Digital Health Wallets (DHW) Thailand Inception Workshop',
    externallyConfirmed: {
      th: 'The Nation รายงานว่า WHO และประเทศไทยจัด Regional Digital Health Wallets (DHW) Thailand Inception Workshop เมื่อวันที่ 17 มิถุนายน 2569 เพื่อเริ่มความร่วมมือด้านกระเป๋าข้อมูลสุขภาพดิจิทัลระดับภูมิภาค',
      en: 'The Nation reports that WHO and Thailand held the Regional Digital Health Wallets (DHW) Thailand Inception Workshop on 17 June 2026 to begin regional cooperation on digital health wallets.',
    },
    healthTagContext: {
      th: 'HealthTAG ยืนยันการเข้าร่วมงานและเผยแพร่ภาพจากงานบนเว็บไซต์ของบริษัท แหล่งข่าวภายนอกยืนยันตัวงาน แต่ไม่ได้ระบุชื่อ HealthTAG',
      en: 'HealthTAG confirms its participation and has published photographs from the workshop. The external report confirms the event but does not name HealthTAG.',
    },
    href: { th: 'https://www.nationthailand.com/health-wellness/40067590', en: 'https://www.nationthailand.com/health-wellness/40067590' },
    supportingLinks: [{
      label: { th: 'ข่าวการเข้าร่วมงานจาก HealthTAG', en: 'HealthTAG workshop report' },
      href: { th: '/news/who-thailand-trusted-phr-workshop-2026/', en: '/en/news/who-thailand-trusted-phr-workshop-2026/' },
    }],
  },
  {
    id: 'mahidol-moph-digital-health-mou-2026',
    eventDate: '2026-06-05',
    displayDate: { th: '5 มิ.ย. 2569', en: '5 Jun 2026' },
    sourceOrganization: { th: 'กระทรวงสาธารณสุขและมหาวิทยาลัยมหิดล', en: 'Ministry of Public Health and Mahidol University' },
    sourcePublicationDate: { th: '5 มิ.ย. 2569', en: '5 Jun 2026' },
    lastVerifiedDate: '2026-09-02',
    tag: { th: 'ความร่วมมือที่ประกาศ', en: 'Announced Collaboration' },
    title: 'Mahidol University and Ministry of Public Health MOU',
    externallyConfirmed: {
      th: 'กระทรวงสาธารณสุขและมหาวิทยาลัยมหิดลลงนามบันทึกความเข้าใจเพื่อเชื่อมโยงข้อมูลด้านการแพทย์และสาธารณสุขบน Digital Health Platform ของกระทรวง เมื่อวันที่ 5 มิถุนายน 2569',
      en: 'The Ministry of Public Health and Mahidol University signed an MOU on 5 June 2026 to connect medical and public-health data through the Ministry\'s Digital Health Platform.',
    },
    healthTagContext: {
      th: 'HealthTAG สนับสนุนเทคโนโลยีให้ MU Health Wallet ภายใต้ความร่วมมือนี้ โดยคู่ลงนามใน MOU คือมหาวิทยาลัยมหิดลและกระทรวงสาธารณสุข',
      en: 'HealthTAG provides technology support for MU Health Wallet under this collaboration. The MOU was signed by Mahidol University and the Ministry of Public Health.',
    },
    href: { th: 'https://www.thecoverage.info/news/content/11474', en: 'https://www.thecoverage.info/news/content/11474' },
  },
  {
    id: 'asean-digital-awards-2024',
    eventDate: '2024-02-01',
    displayDate: { th: '1 ก.พ. 2567', en: '1 Feb 2024' },
    sourceOrganization: { th: 'สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)', en: 'Digital Economy Promotion Agency (depa)' },
    sourcePublicationDate: { th: 'ผลรางวัลปี 2567', en: '2024 award result' },
    lastVerifiedDate: '2026-09-02',
    tag: { th: 'รางวัล', en: 'Award' },
    title: 'ASEAN Digital Awards 2024 · Silver',
    externallyConfirmed: {
      th: 'depa ระบุผลงาน Decentralized Health Care ของบริษัท เฮลธ์แท็ก จำกัด เป็นรางวัล Silver หมวด Public Sector ใน ASEAN Digital Awards 2024',
      en: 'depa lists Decentralized Health Care by HealthTAG Co., Ltd. as the Silver winner in the Public Sector category at the ASEAN Digital Awards 2024.',
    },
    healthTagContext: {
      th: 'ผลนี้ยืนยันรางวัล Silver เท่านั้น ไม่ใช่การรับรองด้านกฎระเบียบ ความมั่นคงปลอดภัย หรือการติดตั้งใช้งาน',
      en: 'The result confirms the Silver award only. It is not a regulatory approval, security certification, or deployment record.',
    },
    href: { th: 'https://www.depa.or.th/th/asean-digital-awards', en: 'https://www.depa.or.th/th/asean-digital-awards' },
    supportingLinks: [{
      label: { th: 'อ่านหน้ารางวัล', en: 'Read the award record' },
      href: { th: '/awards/asean-digital-awards-2024/', en: '/en/awards/asean-digital-awards-2024/' },
    }],
  },
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
      th: 'ETDA ระบุว่าผลการทดสอบเป็นไปตามเป้าหมายและตัวชี้วัดของโครงการ สถานะนี้ไม่ได้ยืนยันการรับรอง การอนุมัติด้านกฎระเบียบ หรือการติดตั้งใช้งานจริง',
      en: 'ETDA states that the testing met the programme\'s goals and success indicators. This status does not confirm certification, regulatory approval, or a production deployment.',
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
      th: 'ประกาศระบุว่า depa และ HealthTAG ทำบันทึกความเข้าใจร่วมกัน แต่ไม่ได้ระบุว่ามีการติดตั้งระบบสุขภาพหรือเปิดให้บริการแล้ว',
      en: 'The announcement confirms an MoU between depa and HealthTAG, but does not state that a healthcare system has been deployed or that a service is live.',
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
    id: 'odess-laureate-2024',
    eventDate: '2024-10-10',
    displayDate: { th: '2567', en: '2024' },
    sourceOrganization: { th: 'ODESS / Fondation Pierre Fabre', en: 'ODESS / Fondation Pierre Fabre' },
    sourcePublicationDate: { th: 'รายชื่อ laureates ปี 2567', en: '2024 laureate list' },
    lastVerifiedDate: '2026-09-02',
    tag: { th: 'รางวัลและทุนสนับสนุน', en: 'Award and Funding' },
    title: 'ODESS Laureate 2024',
    externallyConfirmed: {
      th: 'ODESS ระบุ HealthTAG ในรายชื่อ digital health laureates ปี 2024 และแสดงข้อมูลโครงการ Decentralized Health Care, empowering Well-being Countrywide จากประเทศไทย',
      en: 'ODESS includes HealthTAG among its 2024 digital health laureates and profiles the Thai initiative Decentralized Health Care, empowering Well-being Countrywide.',
    },
    healthTagContext: {
      th: 'สถานะ laureate ยืนยันการได้รับคัดเลือกในโครงการ ODESS ไม่ใช่การรับรองด้านกฎระเบียบหรือหลักฐานการติดตั้งในโรงพยาบาลแห่งใดแห่งหนึ่ง',
      en: 'Laureate status confirms selection by ODESS. It is not a regulatory certification or evidence of deployment at a specific hospital.',
    },
    href: { th: 'https://www.odess.io/en/the-conference/laureates/', en: 'https://www.odess.io/en/the-conference/laureates/' },
    supportingLinks: [
      {
        label: { th: 'ข้อมูลโครงการ HealthTAG บน ODESS', en: 'HealthTAG initiative profile on ODESS' },
        href: { th: 'https://www.odess.io/en/initiative/decentralized-health-care-empowering-well-being-countrywide/', en: 'https://www.odess.io/en/initiative/decentralized-health-care-empowering-well-being-countrywide/' },
      },
      {
        label: { th: 'รูปแบบการสนับสนุนผู้ได้รับรางวัล', en: 'Support provided to laureates' },
        href: { th: 'https://www.odess.io/en/about-us/the-observatory/', en: 'https://www.odess.io/en/about-us/the-observatory/' },
      },
      {
        label: { th: 'อ่านหน้ารางวัล', en: 'Read the award record' },
        href: { th: '/awards/odess-laureate-2024/', en: '/en/awards/odess-laureate-2024/' },
      },
    ],
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
  {
    id: 'tedx-dont-trust-just-verify',
    eventDate: '2022-02',
    displayDate: { th: 'ก.พ. 2565', en: 'Feb 2022' },
    sourceOrganization: { th: 'TEDxSirirajFacultyOfMedicine', en: 'TEDxSirirajFacultyOfMedicine' },
    sourcePublicationDate: { th: 'เผยแพร่บน TED.com', en: 'Published on TED.com' },
    lastVerifiedDate: '2026-09-02',
    tag: { th: 'งานวิชาการและเวทีสาธารณะ', en: 'Academic and Public Forum' },
    title: "DON'T TRUST JUST VERIFY!",
    externallyConfirmed: {
      th: 'TED.com ระบุ Dechowat Promda เป็นผู้พูดในงาน TEDxSirirajFacultyOfMedicine เมื่อเดือนกุมภาพันธ์ 2565 ในหัวข้อ "DON\'T TRUST JUST VERIFY!"',
      en: 'TED.com identifies Dechowat Promda as the speaker of "DON\'T TRUST JUST VERIFY!" at TEDxSirirajFacultyOfMedicine in February 2022.',
    },
    healthTagContext: {
      th: 'การบรรยายกล่าวถึงข้อมูลสุขภาพที่ตรวจสอบได้และการดูแลที่เชื่อมถึงกันระหว่างสถานพยาบาล รายการนี้เป็นเวทีสาธารณะ ไม่ใช่รางวัล',
      en: 'The talk discusses verifiable health data and connected care across healthcare institutions. This is a public-speaking record, not an award.',
    },
    href: { th: 'https://www.ted.com/talks/dechowat_promda_don_t_trust_just_verify', en: 'https://www.ted.com/talks/dechowat_promda_don_t_trust_just_verify' },
    supportingLinks: [
      {
        label: { th: 'หน้างานบน TED.com', en: 'Event page on TED.com' },
        href: { th: 'https://www.ted.com/tedx/events/44335', en: 'https://www.ted.com/tedx/events/44335' },
      },
      {
        label: { th: 'วิดีโอบน YouTube', en: 'Video on YouTube' },
        href: { th: 'https://youtu.be/94WBbooeqhc', en: 'https://youtu.be/94WBbooeqhc' },
      },
    ],
  },
];

import type { ImageMetadata } from 'astro';
import apictaImage from '../assets/news/apicta-2022.jpg';
import bitkubImage from '../assets/news/bitkub-summit-2024.jpg';
import depaImage from '../assets/news/depa-healthtag-2023.jpg';
import digitalHealthForumImage from '../assets/news/digital-health-forum-2026.jpg';
import earlyNfcImage from '../assets/news/early-nfc-access-2020.jpg';
import etdaImage from '../assets/news/etda-dgt-2023.jpg';
import niaImage from '../assets/news/nia-corporate-spark-2025.jpg';
import odessImage from '../assets/news/odess-visit-2024.jpg';
import orbixImage from '../assets/news/orbix-healthtag-2026.jpg';
import sirirajImage from '../assets/news/siriraj-5g-smart-hospital-2021.jpg';
import symposiumImage from '../assets/news/thailand-insurance-symposium-2024.jpg';
import { evidence } from './evidence';
import type { Locale } from './site-content';

type Localized = Record<Locale, string>;

export type PublicationKind = 'news' | 'article';
export type DatePrecision = 'day' | 'year';

export interface PublicationSource {
  kind: 'first-party' | 'primary' | 'context' | 'owner-confirmed';
  organization: Localized;
  label: Localized;
  href?: Localized;
}

export interface PublicationImage {
  src: ImageMetadata;
  alt: Localized;
  credit: Localized;
}

export interface Publication {
  id: string;
  kind: PublicationKind;
  eventStart: string;
  eventEnd?: string;
  publishedAt?: string;
  datePrecision: DatePrecision;
  verifiedAt: string;
  title: Localized;
  summary: Localized;
  sources: PublicationSource[];
  images?: PublicationImage[];
  originalLanguage?: Locale;
  companionPath?: string;
}

const latestNews: Publication = {
  id: 'digital-health-forum-2026',
  kind: 'news',
  eventStart: '2026-08-25',
  eventEnd: '2026-08-26',
  publishedAt: '2026-08-26',
  datePrecision: 'day',
  verifiedAt: '2026-08-31',
  title: {
    th: 'MU Health Wallet ร่วมจัดแสดงในงาน Digital Health Forum 2026',
    en: 'MU Health Wallet exhibited at Digital Health Forum 2026',
  },
  summary: {
    th: 'มหาวิทยาลัยมหิดลและ HealthTAG นำ MU Health Wallet จัดแสดงที่บูธสำนักสุขภาพดิจิทัล กระทรวงสาธารณสุข ภายในงาน Digital Health Forum 2026 ซึ่งจัดขึ้นวันที่ 25 และ 26 สิงหาคม 2569',
    en: 'Mahidol University and HealthTAG presented MU Health Wallet at the Ministry of Public Health Bureau of Digital Health booth during Digital Health Forum 2026 on 25 and 26 August 2026.',
  },
  sources: [
    {
      kind: 'first-party',
      organization: { th: 'เพจ Facebook ของ HealthTAG', en: 'HealthTAG Facebook page' },
      label: { th: 'เปิดโพสต์จาก HealthTAG', en: 'Open the HealthTAG post' },
      href: {
        th: 'https://www.facebook.com/mihealthtag/posts/pfbid02KciMVPTgGmTAxhG7epWRqgVsZNrS55KyTQtRKZyBuoTjdcXFrmLSSS1abTwLtXEtl',
        en: 'https://www.facebook.com/mihealthtag/posts/pfbid02KciMVPTgGmTAxhG7epWRqgVsZNrS55KyTQtRKZyBuoTjdcXFrmLSSS1abTwLtXEtl',
      },
    },
    {
      kind: 'primary',
      organization: { th: 'สำนักสารนิเทศ กระทรวงสาธารณสุข', en: 'Ministry of Public Health Information Office' },
      label: { th: 'เปิดข่าวจากกระทรวงสาธารณสุข', en: 'Open the Ministry event record' },
      href: {
        th: 'https://pr.moph.go.th/online/index/news/346999',
        en: 'https://pr.moph.go.th/online/index/news/346999',
      },
    },
  ],
  images: [{
    src: digitalHealthForumImage,
    alt: {
      th: 'ผู้ร่วมจัดแสดงสองคนยืนหน้าป้าย Digital Health Forum 2026 ที่บูธกระทรวงสาธารณสุข',
      en: 'Two exhibitors stand in front of the Digital Health Forum 2026 sign at the Ministry of Public Health booth',
    },
    credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
  }],
};

const researchedLegacyNews: Publication[] = [
  {
    id: 'odess-visit-2024',
    kind: 'news',
    eventStart: '2024-05-16',
    eventEnd: '2024-05-17',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'ผู้แทน ODESS เยี่ยมชมการดำเนินงานของ HealthTAG',
      en: 'ODESS representative visits HealthTAG implementation',
    },
    summary: {
      th: 'HealthTAG บันทึกการเยี่ยมชมของผู้แทน Fondation Pierre Fabre วันที่ 16 และ 17 พฤษภาคม 2567 ส่วน ODESS ระบุ HealthTAG ไว้ในรายชื่อโครงการที่ได้รับคัดเลือกประจำปี 2024',
      en: 'HealthTAG recorded a visit by a Fondation Pierre Fabre representative on 16 and 17 May 2024. ODESS separately lists HealthTAG among its selected 2024 initiatives.',
    },
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'เพจ Facebook ของ HealthTAG', en: 'HealthTAG Facebook page' },
        label: { th: 'เปิดโพสต์การเยี่ยมชม', en: 'Open the visit post' },
        href: {
          th: 'https://www.facebook.com/mihealthtag/posts/912692627326139/',
          en: 'https://www.facebook.com/mihealthtag/posts/912692627326139/',
        },
      },
      {
        kind: 'primary',
        organization: { th: 'ODESS', en: 'ODESS' },
        label: { th: 'ดูรายชื่อโครงการปี 2024 จาก ODESS', en: 'See the ODESS 2024 laureates' },
        href: {
          th: 'https://www.odess.io/en/the-conference/laureates/',
          en: 'https://www.odess.io/en/the-conference/laureates/',
        },
      },
    ],
    images: [{
      src: odessImage,
      alt: {
        th: 'ผู้แทน HealthTAG และผู้มาเยี่ยมชมยืนถือป้าย HealthTAG ภายในพื้นที่โรงพยาบาล',
        en: 'HealthTAG representatives and a visitor stand with a HealthTAG sign inside a hospital area',
      },
      credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
    }],
  },
  {
    id: 'bitkub-summit-2024',
    kind: 'news',
    eventStart: '2024-10-19',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'HealthTAG นำเสนอกรณีใช้งาน blockchain ด้านสุขภาพที่ BITKUB Summit 2024',
      en: 'HealthTAG presents a healthcare blockchain use case at BITKUB Summit 2024',
    },
    summary: {
      th: 'นพ.เดโชวัต พรมดา นำเสนอหัวข้อ Thailand Real-World Use Case Blockchain in Healthcare เมื่อวันที่ 19 ตุลาคม 2567 โดย Bitkub ระบุภายหลังถึงโครงการ Layer 2 ด้านสุขภาพร่วมกับ HealthTAG',
      en: 'Dr Dechowat Promda presented “Thailand Real-World Use Case Blockchain in Healthcare” on 19 October 2024. Bitkub later described a healthcare Layer 2 project with HealthTAG.',
    },
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'คลังข่าว HealthTAG', en: 'HealthTAG news archive' },
        label: { th: 'เปิดข่าวเดิมจาก HealthTAG', en: 'Open the archived HealthTAG item' },
        href: {
          th: 'https://cms.healthtag.io/posts/article-3',
          en: 'https://cms.healthtag.io/posts/article-3',
        },
      },
      {
        kind: 'primary',
        organization: { th: 'Bitkub Blockchain Technology', en: 'Bitkub Blockchain Technology' },
        label: { th: 'เปิดประกาศจาก Bitkub', en: 'Open the Bitkub event source' },
        href: {
          th: 'https://bitkubblockchaintechnology.medium.com/bitkub-chain-announces-new-blockchain-solutions-at-bitkub-summit-2024-8594d6372f24',
          en: 'https://bitkubblockchaintechnology.medium.com/bitkub-chain-announces-new-blockchain-solutions-at-bitkub-summit-2024-8594d6372f24',
        },
      },
    ],
    images: [{
      src: bitkubImage,
      alt: {
        th: 'ผู้ร่วมงานสี่คนยืนหน้าซุ้มสีเขียวในงาน BITKUB Summit 2024',
        en: 'Four attendees stand in front of a green installation at BITKUB Summit 2024',
      },
      credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
    }],
  },
  {
    id: 'thailand-insurance-symposium-2024',
    kind: 'news',
    eventStart: '2024-11-21',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'HealthTAG ร่วมบรรยายใน Thailand Insurance Symposium 2024',
      en: 'HealthTAG speaks at Thailand Insurance Symposium 2024',
    },
    summary: {
      th: 'นพ.เดโชวัต พรมดา ร่วมบรรยายหัวข้อ Transforming Healthcare and Insurance with AI ในงาน Thailand Insurance Symposium 2024 วันที่ 21 พฤศจิกายน 2567',
      en: 'Dr Dechowat Promda spoke on “Transforming Healthcare and Insurance with AI” at Thailand Insurance Symposium 2024 on 21 November 2024.',
    },
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'คลังข่าว HealthTAG', en: 'HealthTAG news archive' },
        label: { th: 'เปิดข่าวเดิมจาก HealthTAG', en: 'Open the archived HealthTAG item' },
        href: {
          th: 'https://cms.healthtag.io/posts/article-1',
          en: 'https://cms.healthtag.io/posts/article-1',
        },
      },
      {
        kind: 'primary',
        organization: { th: 'สมาคมประกันชีวิตไทย', en: 'Thai Life Assurance Association' },
        label: { th: 'เปิดข่าวจากสมาคมประกันชีวิตไทย', en: 'Open the association event record' },
        href: {
          th: 'https://www.tlaa.org/page_bx.php?cid=23&cno=1877&cno2=&show=27&lang=eng',
          en: 'https://www.tlaa.org/page_bx.php?cid=23&cno=1877&cno2=&show=27&lang=eng',
        },
      },
    ],
    images: [{
      src: symposiumImage,
      alt: {
        th: 'วิทยากรยืนบนเวทีหน้า Presentation เรื่อง Transforming Healthcare and Insurance with AI',
        en: 'A speaker presents “Transforming Healthcare and Insurance with AI” on stage',
      },
      credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
    }],
  },
  {
    id: 'etda-dgt-2023',
    kind: 'news',
    eventStart: '2023-02-25',
    publishedAt: '2023-02-25',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'HealthTAG ร่วมเสวนาเรื่อง AI for Better Health and Well-being ในงาน DGT 2023',
      en: 'HealthTAG joins the AI for Better Health and Well-being session at DGT 2023',
    },
    summary: {
      th: 'นพ.เดโชวัต พรมดา ร่วมเสวนาในหัวข้อ AI for Better Health and Well-being วันที่ 25 กุมภาพันธ์ 2566 โดย ETDA ระบุชื่อผู้ร่วมเสวนาและยืนยันว่างาน DGT 2023 จัดขึ้นวันที่ 24 และ 25 กุมภาพันธ์',
      en: 'Dr Dechowat Promda joined the AI for Better Health and Well-being session on 25 February 2023. ETDA names the speakers and confirms that DGT 2023 ran on 24 and 25 February.',
    },
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'เพจ Facebook ของ HealthTAG', en: 'HealthTAG Facebook page' },
        label: { th: 'เปิดโพสต์จาก HealthTAG', en: 'Open the HealthTAG post' },
        href: {
          th: 'https://www.facebook.com/mihealthtag/posts/pfbid02ELpKgx63kTZ8tSCVmfRAyDgD6aHH2qvonT656hNsJkNc4ANzYtqE1JRdam3fTDjSl',
          en: 'https://www.facebook.com/mihealthtag/posts/pfbid02ELpKgx63kTZ8tSCVmfRAyDgD6aHH2qvonT656hNsJkNc4ANzYtqE1JRdam3fTDjSl',
        },
      },
      {
        kind: 'primary',
        organization: { th: 'ETDA', en: 'ETDA' },
        label: { th: 'เปิดวิดีโอและข้อมูลผู้ร่วมเสวนาจาก ETDA', en: 'Open the ETDA session record' },
        href: {
          th: 'https://www.youtube.com/watch?v=gUK0qwgjo68',
          en: 'https://www.youtube.com/watch?v=gUK0qwgjo68',
        },
      },
    ],
    images: [{
      src: etdaImage,
      alt: {
        th: 'ผู้ร่วมเสวนาห้าคนนั่งบนเวทีงาน DGT 2023 ระหว่างหัวข้อสุขภาพและความเป็นอยู่ที่ดี',
        en: 'Five panelists sit on stage during a DGT 2023 health and well-being session',
      },
      credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
    }],
  },
  {
    id: 'nfc-access-evolution-2020-2021',
    kind: 'news',
    eventStart: '2020-04-14',
    eventEnd: '2021-05-10',
    publishedAt: '2020-04-14',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'จากแนวคิด NFC ระยะแรก สู่ wristband และ NFC sticker',
      en: 'From an early NFC concept to a wristband and NFC sticker',
    },
    summary: {
      th: 'โพสต์วันที่ 14 เมษายน 2563 บันทึกแนวคิดใช้ NFC เปิดหน้าเว็บสุขภาพโดยไม่ต้องติดตั้งแอป ต่อมาโพสต์วันที่ 10 พฤษภาคม 2564 บันทึกการทดลอง Self-Isolation Tracking Wristband โดยไม่ได้ยืนยันว่ามีการวางจำหน่ายหรือติดตั้งใช้งาน HealthTAG ยืนยันว่าภายหลังเปลี่ยนมาใช้ NFC sticker ซึ่งเป็นหนึ่งในทางเข้า PHR และไม่ได้เก็บเวชระเบียนของผู้ใช้',
      en: 'A post from 14 April 2020 records an early NFC concept for opening a health web page without installing an app. A post from 10 May 2021 then records an explored Self-Isolation Tracking Wristband, without establishing a release or deployment. HealthTAG confirms that the team later moved to an NFC sticker, which is one entry point to the PHR and does not store the user’s clinical record.',
    },
    companionPath: 'phr',
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'เพจ Facebook ของ HealthTAG', en: 'HealthTAG Facebook page' },
        label: { th: 'เปิดโพสต์แนวคิด NFC ปี 2563', en: 'Open the 2020 NFC post' },
        href: {
          th: 'https://www.facebook.com/mihealthtag/posts/pfbid0sX4quNrb1n2ZzbFrYJqUx6qBRAk7hFceVpL2iAF226VrniaEDQkSdsSfVZzpQR3l',
          en: 'https://www.facebook.com/mihealthtag/posts/pfbid0sX4quNrb1n2ZzbFrYJqUx6qBRAk7hFceVpL2iAF226VrniaEDQkSdsSfVZzpQR3l',
        },
      },
      {
        kind: 'first-party',
        organization: { th: 'เพจ Facebook ของ HealthTAG', en: 'HealthTAG Facebook page' },
        label: { th: 'เปิดโพสต์ wristband ปี 2564', en: 'Open the 2021 wristband post' },
        href: {
          th: 'https://www.facebook.com/mihealthtag/posts/pfbid02xSY4SCTAEh8rrbLP1XpDESJKrohqRuD6DLJT2GeJmZQ9TnXmm2uyubLatcyTqf2Al',
          en: 'https://www.facebook.com/mihealthtag/posts/pfbid02xSY4SCTAEh8rrbLP1XpDESJKrohqRuD6DLJT2GeJmZQ9TnXmm2uyubLatcyTqf2Al',
        },
      },
      {
        kind: 'owner-confirmed',
        organization: { th: 'HealthTAG', en: 'HealthTAG' },
        label: {
          th: 'HealthTAG ยืนยันข้อมูลเมื่อ 31 สิงหาคม 2569',
          en: 'Confirmed by HealthTAG on 31 August 2026',
        },
      },
    ],
    images: [{
      src: earlyNfcImage,
      alt: {
        th: 'ภาพประกอบ HealthTAG เรื่องบัตรประจำตัวสุขภาพอิเล็กทรอนิกส์ในช่วงการระบาดปี 2563',
        en: 'HealthTAG illustration for an electronic health identifier during the 2020 outbreak period',
      },
      credit: { th: 'ภาพ: HealthTAG', en: 'Image: HealthTAG' },
    }],
  },
];

const evidenceNewsIds = [
  'orbix-healthtag',
  'nia-corporate-spark-china',
  'depa-healthtag',
  'apicta-2022',
  'siriraj-5g-smart-hospital',
] as const;

const evidenceImages: Record<(typeof evidenceNewsIds)[number], PublicationImage> = {
  'orbix-healthtag': {
    src: orbixImage,
    alt: {
      th: 'กราฟิกข่าวแสดงผู้แทน Orbix Technology และ HealthTAG พร้อมโลโก้ของทั้งสององค์กร',
      en: 'News graphic showing representatives of Orbix Technology and HealthTAG with both organization logos',
    },
    credit: { th: 'ภาพเผยแพร่โดยสำนักข่าวไทยไทม์นิวส์', en: 'Image published by Thai Time News' },
  },
  'nia-corporate-spark-china': {
    src: niaImage,
    alt: {
      th: 'ผู้เข้าร่วมโครงการ Corporate SPARK Outbound ถ่ายภาพร่วมกันที่พื้นที่นวัตกรรมในเซี่ยงไฮ้',
      en: 'Corporate SPARK Outbound participants gather at an innovation venue in Shanghai',
    },
    credit: { th: 'ภาพ: สำนักงานนวัตกรรมแห่งชาติ', en: 'Photo: National Innovation Agency' },
  },
  'depa-healthtag': {
    src: depaImage,
    alt: {
      th: 'ผู้แทน HealthTAG และ depa ถือแฟ้มบันทึกข้อตกลงหน้าป้ายพิธีลงนาม',
      en: 'HealthTAG and depa representatives hold agreement folders in front of the signing display',
    },
    credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
  },
  'apicta-2022': {
    src: apictaImage,
    alt: {
      th: 'ผู้แทน HealthTAG ถือถ้วยและประกาศนียบัตรหน้าเวที APICTA Awards 2022',
      en: 'HealthTAG representatives hold a trophy and certificate in front of the APICTA Awards 2022 display',
    },
    credit: { th: 'ภาพ: HealthTAG', en: 'Photo: HealthTAG' },
  },
  'siriraj-5g-smart-hospital': {
    src: sirirajImage,
    alt: {
      th: 'ผู้ร่วมพิธีเปิด Siriraj World Class 5G Smart Hospital ยืนบนเวทีวันที่ 16 ธันวาคม 2564',
      en: 'Participants stand on stage at the Siriraj World Class 5G Smart Hospital launch on 16 December 2021',
    },
    credit: { th: 'ภาพ: คณะแพทยศาสตร์ศิริราชพยาบาล', en: 'Photo: Faculty of Medicine Siriraj Hospital' },
  },
};

const evidenceNews: Publication[] = evidenceNewsIds.map((id) => {
  const item = evidence.find((entry) => entry.id === id);
  if (!item) throw new Error(`Missing evidence entry: ${id}`);
  const precision: DatePrecision = /^\d{4}$/.test(item.eventDate) ? 'year' : 'day';

  return {
    id: item.id,
    kind: 'news',
    eventStart: item.eventDate,
    publishedAt: precision === 'day' ? item.eventDate : undefined,
    datePrecision: precision,
    verifiedAt: item.lastVerifiedDate,
    title: { th: item.title, en: item.title },
    summary: item.externallyConfirmed,
    images: [evidenceImages[id]],
    sources: [
      {
        kind: 'primary',
        organization: item.sourceOrganization,
        label: { th: 'ดูประกาศจากหน่วยงานที่เกี่ยวข้อง', en: 'Open the primary source' },
        href: item.href,
      },
      {
        kind: 'context',
        organization: { th: 'หลักฐานของ HealthTAG', en: 'HealthTAG evidence notes' },
        label: { th: 'ดูขอบเขตที่หลักฐานยืนยัน', en: 'See the confirmed scope' },
        href: { th: `/evidence/#${item.id}`, en: `/en/evidence/#${item.id}` },
      },
    ],
  };
});

const archivedArticles: Publication[] = [
  {
    id: 'data-is-the-new-medicine',
    kind: 'article',
    eventStart: '2025-11-30',
    publishedAt: '2025-11-30',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'Data is the New Medicine: ข้อมูลสุขภาพคือทรัพย์สินของคุณ',
      en: 'Data Is the New Medicine: Understanding your health data',
    },
    summary: {
      th: 'บทความจากคลังเดิมอธิบายว่าการนำข้อมูลสุขภาพที่กระจัดกระจายมาใช้ภายใต้สิทธิ์ของผู้ป่วยช่วยสนับสนุนการดูแลที่ต่อเนื่องได้อย่างไร',
      en: 'An archived introduction to how patient-authorized access to fragmented health records can support continuity of care.',
    },
    originalLanguage: 'th',
    companionPath: 'phr',
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'คลังบทความ HealthTAG', en: 'HealthTAG article archive' },
        label: { th: 'อ่านบทความต้นฉบับภาษาไทย', en: 'Read the original Thai article' },
        href: {
          th: 'https://cms.healthtag.io/posts/data-is-the-new-medicine-',
          en: 'https://cms.healthtag.io/posts/data-is-the-new-medicine-',
        },
      },
    ],
  },
  {
    id: 'decentralized-healthcare',
    kind: 'article',
    eventStart: '2025-11-24',
    publishedAt: '2025-11-24',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'Decentralized Healthcare คืออะไร และผู้ป่วยควบคุมสิทธิ์เข้าถึงข้อมูลได้อย่างไร',
      en: 'Decentralized healthcare and patient control of data access',
    },
    summary: {
      th: 'บทความจากคลังเดิมอธิบายความต่างระหว่างการเก็บข้อมูลแบบรวมศูนย์กับการเชื่อมข้อมูลจากสถานพยาบาลต้นทาง รวมถึงบทบาทของการให้สิทธิ์โดยผู้ป่วย',
      en: 'An archived explainer on centralized storage, data exchange from source hospitals, and patient-granted access.',
    },
    originalLanguage: 'th',
    companionPath: 'interoperability',
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'คลังบทความ HealthTAG', en: 'HealthTAG article archive' },
        label: { th: 'อ่านบทความต้นฉบับภาษาไทย', en: 'Read the original Thai article' },
        href: {
          th: 'https://cms.healthtag.io/posts/decentralized-healthcare',
          en: 'https://cms.healthtag.io/posts/decentralized-healthcare',
        },
      },
    ],
  },
  {
    id: 'blockchain-healthcare-decentralized',
    kind: 'article',
    eventStart: '2025-11-16',
    publishedAt: '2025-11-16',
    datePrecision: 'day',
    verifiedAt: '2026-08-31',
    title: {
      th: 'Blockchain กับการตรวจสอบการเข้าถึงข้อมูลสุขภาพ',
      en: 'Blockchain and auditable access to health data',
    },
    summary: {
      th: 'บทความจากคลังเดิมกล่าวถึง blockchain ในระบบสุขภาพ สำหรับขอบเขตปัจจุบันของ HealthTAG ให้ดูหน้า “ความไว้วางใจและสิทธิ์เข้าถึง” ซึ่งระบุว่าเวชระเบียนไม่ได้เก็บบน blockchain',
      en: 'An archived article about blockchain in healthcare. The current Trust & Access page defines HealthTAG’s scope and states that clinical records are not stored on blockchain.',
    },
    originalLanguage: 'th',
    companionPath: 'trust',
    sources: [
      {
        kind: 'first-party',
        organization: { th: 'คลังบทความ HealthTAG', en: 'HealthTAG article archive' },
        label: { th: 'อ่านบทความต้นฉบับภาษาไทย', en: 'Read the original Thai article' },
        href: {
          th: 'https://cms.healthtag.io/posts/blockchain-healthcare-decentralized',
          en: 'https://cms.healthtag.io/posts/blockchain-healthcare-decentralized',
        },
      },
    ],
  },
];

export const publications = [latestNews, ...researchedLegacyNews, ...evidenceNews, ...archivedArticles]
  .sort((a, b) => b.eventStart.localeCompare(a.eventStart));

for (const item of publications) {
  if (item.kind === 'news' && (!item.images || item.images.length < 1 || item.images.length > 3)) {
    throw new Error(`News item ${item.id} must have between 1 and 3 images`);
  }
}

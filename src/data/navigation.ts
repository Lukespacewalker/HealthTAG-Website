import type { Locale } from './site-content';

export interface NavigationItem {
  id: string;
  path: string;
  label: Record<Locale, string>;
  /** Fragment links provide section shortcuts, but never compete for aria-current="page". */
  fragment?: string;
}

export interface NavigationGroup {
  id: string;
  label: Record<Locale, string>;
  items: NavigationItem[];
}

const item = (
  id: string,
  path: string,
  th: string,
  en: string,
  fragment?: string,
): NavigationItem => ({ id, path, label: { th, en }, fragment });

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'platform',
    label: { th: 'แพลตฟอร์ม', en: 'Platform' },
    items: [
      item('interoperability', 'interoperability', 'การเชื่อมโยงข้อมูล', 'Interoperability'),
      item('how-it-works', 'how-it-works', 'ระบบทำงานอย่างไร', 'How it works'),
      item('trust', 'trust', 'ความยินยอม ความไว้วางใจ และสิทธิ์เข้าถึง', 'Consent, trust & access'),
      item('phr', 'phr', 'สมุดสุขภาพส่วนบุคคล (PHR)', 'Personal Health Record (PHR)'),
    ],
  },
  {
    id: 'proof',
    label: { th: 'ผลงานและหลักฐาน', en: 'Deployments & evidence' },
    items: [
      item('deployments', 'deployments', 'การใช้งานจริง', 'Deployments'),
      item('network', 'network', 'เครือข่าย', 'Network'),
      item('evidence', 'evidence', 'หลักฐานและแหล่งข้อมูล', 'Evidence & sources'),
    ],
  },
  {
    id: 'publications',
    label: { th: 'ข่าวและบทความ', en: 'News & articles' },
    items: [
      item('posts', 'posts', 'ข่าวและบทความทั้งหมด', 'All news & articles'),
      item('news', 'news', 'ข่าว', 'News'),
      item('articles', 'articles', 'บทความ', 'Articles'),
      item('awards', 'awards', 'รางวัล', 'Awards'),
    ],
  },
  {
    id: 'about',
    label: { th: 'เกี่ยวกับ HealthTAG', en: 'About HealthTAG' },
    items: [
      item('company', 'company', 'ภาพรวมบริษัท', 'Company overview'),
      item('mission-vision', 'company', 'พันธกิจและวิสัยทัศน์', 'Mission & vision', 'mission-vision'),
      item('values', 'company', 'ค่านิยม', 'Values', 'values'),
      item('founder', 'company', 'ผู้ก่อตั้ง', 'Founder', 'founder'),
      item('team', 'company', 'ทีมงาน', 'Team', 'team'),
    ],
  },
];

export const navigationUtilities = {
  home: item('home', '', 'หน้าแรก', 'Home'),
  support: item('support', 'support', 'ศูนย์ช่วยเหลือ', 'Support'),
  contact: item('contact', 'contact', 'ติดต่อ HealthTAG', 'Contact HealthTAG'),
  privacy: item('privacy', 'privacy', 'ความเป็นส่วนตัวของเว็บไซต์', 'Website privacy'),
} as const;

export function navigationHref(entry: NavigationItem, locale: Locale): string {
  const prefix = locale === 'en' ? '/en' : '';
  const pathname = entry.path ? `${prefix}/${entry.path}/` : `${prefix}/`;
  return entry.fragment ? `${pathname}#${entry.fragment}` : pathname;
}

export function isNavigationItemCurrent(entry: NavigationItem, currentPath: string): boolean {
  return !entry.fragment && entry.path === currentPath;
}

export function isNavigationGroupCurrent(group: NavigationGroup, currentPath: string): boolean {
  return group.items.some((entry) => entry.path === currentPath);
}

import type { ImageMetadata } from 'astro';
import { portraits, type PortraitId } from './team-portraits';

export interface EmployeeCard {
  slug: string;
  nameTh: string;
  nameEn: string;
  roleTh: string;
  roleEn: string;
  email: string;
  portrait: ImageMetadata;
}

type CardSource = Omit<EmployeeCard, 'portrait'> & { portraitId: PortraitId };

// These slugs are printed in existing QR codes. Preserve their spelling and case.
// The list is limited to people who appear in both the legacy card system and the
// current team roster. Personal phone numbers and social handles are not migrated.
const cardSources: CardSource[] = [
  {
    slug: 'tanawat',
    nameTh: 'ธนวัฒน์ อุดม',
    nameEn: 'Tanawat Udom',
    roleTh: 'นักพัฒนา',
    roleEn: 'Developer',
    email: 'tanawat@healthtag.io',
    portraitId: 'tanawat',
  },
  {
    slug: 'dechowat',
    nameTh: 'นพ.เดโชวัต พรมดา',
    nameEn: 'Dechowat Promda, M.D.',
    roleTh: 'ประธานเจ้าหน้าที่บริหาร',
    roleEn: 'Chief Executive Officer',
    email: 'dechowat@healthtag.io',
    portraitId: 'dechowat',
  },
  {
    slug: 'tanapon',
    nameTh: 'ธนาพล อินทร์ประสิทธิ์',
    nameEn: 'Tanapon Inprasit',
    roleTh: 'นักพัฒนา',
    roleEn: 'Developer',
    email: 'tanapon@healthtag.io',
    portraitId: 'tanapon',
  },
  {
    slug: 'Kornnaphat',
    nameTh: 'กรณ์นภัส คุ้มพวก',
    nameEn: 'Kornnaphat Khumphuak',
    roleTh: 'นักออกแบบกราฟิก',
    roleEn: 'Graphic Designer',
    email: 'Kornnaphat.kh@healthtag.io',
    portraitId: 'kornnaphat',
  },
  {
    slug: 'Pensirinapang',
    nameTh: 'เพ็ญศิรินภางค์ ใจตาบุตร',
    nameEn: 'Pensirinapang Jaitaboot',
    roleTh: 'นักทดสอบซอฟต์แวร์',
    roleEn: 'Software Tester',
    email: 'Pensirinapang@healthtag.io',
    portraitId: 'pensirinapang',
  },
  {
    slug: 'purin',
    nameTh: 'ภูรินทร์ จันทร์ใบ',
    nameEn: 'Purin Janbai',
    roleTh: 'นักพัฒนา',
    roleEn: 'Developer',
    email: 'purin.janbai@healthtag.io',
    portraitId: 'purin',
  },
];

export const employeeCards: EmployeeCard[] = cardSources.map(({ portraitId, ...card }) => ({
  ...card,
  portrait: portraits[portraitId],
}));


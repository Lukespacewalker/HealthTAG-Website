export type Locale = 'th' | 'en';
export type PageSection = { heading: string; body: string };
export type PageCopy = { label: string; title: string; intro: string; sections: PageSection[] };

export const pageContent: Record<string, Record<Locale, PageCopy>> = {
  network: {
    th: {
      label: 'เครือข่าย',
      title: 'HealthTAG กับองค์กรในประเทศและต่างประเทศ',
      intro: 'โรงพยาบาล สถาบันการแพทย์ หน่วยงานไทย และองค์กรต่างประเทศที่เกี่ยวข้องกับงานของ HealthTAG',
      sections: [],
    },
    en: {
      label: 'Network',
      title: 'HealthTAG and organizations in Thailand and abroad',
      intro: 'Hospitals, medical institutions, Thai agencies, and international organizations connected to HealthTAG\'s work.',
      sections: [],
    },
  },
};

export const team = [
  ['Dechowat Promda', 'Chief Executive Officer'],
  ['Suttisak Denduangchai', 'Tech Lead Developer'],
  ['Tanasit Klubtavee', 'Project Manager'],
  ['Tanapon Inprasit', 'Developer'],
  ['Tanawat Udom', 'Developer'],
  ['Purin Janbai', 'Developer'],
  ['Pensirinapang Jaitaboot', 'Software Tester'],
  ['Kornnaphat Khumphuak', 'Graphic Designer'],
  ['Aumphon Kaewatsadorn', 'General Administration'],
  ['Akkarachai Kaewsakul', 'Account Executive'],
  ['Chatchawan Sudsoom', 'Account Executive'],
];

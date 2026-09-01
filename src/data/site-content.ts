export type Locale = 'th' | 'en';
export type PageSection = { heading: string; body: string };
export type PageCopy = { label: string; title: string; intro: string; sections: PageSection[] };

export const pageContent: Record<string, Record<Locale, PageCopy>> = {
  network: {
    th: {
      label: 'เครือข่าย',
      title: 'เครือข่าย HealthTAG ในประเทศไทยและต่างประเทศ',
      intro: 'เครือข่ายของ HealthTAG ประกอบด้วยโรงพยาบาล สถาบันการแพทย์ หน่วยงานไทย และองค์กรต่างประเทศ',
      sections: [],
    },
    en: {
      label: 'Network',
      title: 'The HealthTAG network in Thailand and abroad',
      intro: 'The HealthTAG network includes hospitals, medical institutions, Thai agencies, and international organizations.',
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

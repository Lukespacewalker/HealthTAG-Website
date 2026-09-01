export type Locale = 'th' | 'en';
export type PageSection = { heading: string; body: string };
export type PageCopy = { label: string; title: string; intro: string; sections: PageSection[] };

export const pageContent: Record<string, Record<Locale, PageCopy>> = {
  network: {
    th: {
      label: 'เครือข่าย',
      title: 'การติดตั้ง โครงการ รางวัล และเครือข่ายของ HealthTAG',
      intro: 'HealthTAG มีความสัมพันธ์กับโรงพยาบาล สถาบันการแพทย์ หน่วยงานไทย และเครือข่ายต่างประเทศในหลายรูปแบบ',
      sections: [],
    },
    en: {
      label: 'Network',
      title: 'HealthTAG deployments, programmes, awards, and network relationships.',
      intro: 'HealthTAG has several types of relationship with hospitals, medical institutions, Thai organizations, and international networks.',
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

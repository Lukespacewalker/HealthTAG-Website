export type Locale = 'th' | 'en';
export type PageSection = { heading: string; body: string };
export type PageCopy = { label: string; title: string; intro: string; sections: PageSection[] };

export const pageContent: Record<string, Record<Locale, PageCopy>> = {
  interoperability: {
    th:{label:'การเชื่อมโยงข้อมูล',title:'เชื่อม HIS เดิมกับ FHIR ที่โรงพยาบาลควบคุม',intro:'โรงพยาบาลเลือกใช้สคริปต์ของทีม IT หรือ HealthTAG FHIR Transformer เพื่อนำข้อมูลเข้าสู่ FHIR',sections:[{heading:'ระบบ FHIR',body:'HAPI FHIR Server ใช้มาตรฐาน HL7 FHIR R4 และจัดเก็บข้อมูลด้วย PostgreSQL'},{heading:'การปกป้อง API',body:'Kong API Gateway ปกป้อง HAPI FHIR API ส่วน HealthTAG Module หรือ Hospital API ทำงานภายในเครือข่ายโรงพยาบาล'},{heading:'FHIR resources ที่ใช้งาน',body:'การติดตั้งที่เคียนซาใช้ Patient, AllergyIntolerance, Encounter และ MedicationDispense'}]},
    en:{label:'Interoperability',title:'Connect an existing HIS to hospital-controlled FHIR.',intro:'Hospitals can use an IT-managed script or HealthTAG FHIR Transformer to send data to FHIR.',sections:[{heading:'FHIR system',body:'HAPI FHIR Server implements HL7 FHIR R4 and stores data in PostgreSQL.'},{heading:'API protection',body:'Kong API Gateway protects the HAPI FHIR API. HealthTAG Module, or Hospital API, runs inside the hospital network.'},{heading:'FHIR resources in use',body:'The Khian Sa implementation uses Patient, AllergyIntolerance, Encounter, and MedicationDispense.'}]}
  },
  phr:{
    th:{label:'สมุดสุขภาพส่วนบุคคล (PHR)',title:'ข้อมูลที่ได้รับอนุญาตในมุมมองเดียว',intro:'PHR แสดงข้อมูลที่ผู้ป่วยได้รับสิทธิ์เข้าถึงจากระบบของโรงพยาบาล',sections:[{heading:'PromptCare ID',body:'HealthTAG Module เชื่อมตัวตนผู้ป่วยของแต่ละโรงพยาบาลกับ PromptCare ID เพื่อจับคู่ข้อมูลของคนเดียวกัน'},{heading:'การเข้าถึงสำหรับผู้ป่วย',body:'PHR อ่านข้อมูล FHIR ที่ได้รับอนุญาตและนำมาแสดง โดยไม่สร้างฐานข้อมูลเวชระเบียนอีกชุด'}]},
    en:{label:'Personal Health Record (PHR)',title:'Authorized health records in one view.',intro:'The PHR presents records that a patient is authorized to access from hospital systems.',sections:[{heading:'PromptCare ID',body:'HealthTAG Module links each hospital patient identity to PromptCare ID so records can be matched to the same person.'},{heading:'Patient access',body:'The PHR reads authorized FHIR records from hospital systems and presents them to the patient.'}]}
  },
  'how-it-works':{
    th:{label:'ระบบทำงานอย่างไร',title:'จาก HIS ถึงการตรวจสอบย้อนหลังใน 6 ขั้น',intro:'ข้อมูลผ่านการนำเข้าสู่ FHIR การจับคู่ตัวตน การตรวจสิทธิ์ และการบันทึกเหตุการณ์เข้าถึง',sections:[{heading:'1. เชื่อมข้อมูล',body:'ข้อมูลจาก HIS เข้าสู่ FHIR ผ่านสคริปต์ของโรงพยาบาลหรือ HealthTAG FHIR Transformer'},{heading:'2. ทำให้เป็นมาตรฐาน',body:'ข้อมูลอยู่ในรูปแบบ HL7 FHIR R4 เพื่อให้ระบบที่เชื่อมต่อกันใช้โครงสร้างเดียวกัน'},{heading:'3. เชื่อมตัวตน',body:'HealthTAG Module เชื่อมตัวตนผู้ป่วยของแต่ละโรงพยาบาลกับ PromptCare ID'},{heading:'4. ตรวจสอบสิทธิ์',body:'Hospital API ตรวจสิทธิ์และช่วงเวลาการเข้าถึงก่อนส่งข้อมูล'},{heading:'5. แลกเปลี่ยน',body:'ระบบส่งข้อมูล FHIR ตามสิทธิ์ไปยัง PHR หรือแอปที่ได้รับอนุญาต'},{heading:'6. บันทึกเหตุการณ์',body:'Blockchain บันทึกเหตุการณ์การให้ความยินยอมและการเข้าถึงเพื่อตรวจสอบภายหลัง'}]},
    en:{label:'How It Works',title:'Six stages from HIS ingestion to audit.',intro:'Data moves through FHIR ingestion, identity matching, access checks, and the recording of access events.',sections:[{heading:'1. Connect',body:'HIS data enters FHIR through a hospital IT script or HealthTAG FHIR Transformer.'},{heading:'2. Standardize',body:'HL7 FHIR R4 gives connected systems a shared data structure.'},{heading:'3. Identify',body:'HealthTAG Module links each hospital patient identity to PromptCare ID.'},{heading:'4. Authorize',body:'Hospital API checks permission and the access window before returning data.'},{heading:'5. Exchange',body:'The system sends authorized FHIR data to the PHR or another approved application.'},{heading:'6. Record',body:'Blockchain records consent and access events for later review.'}]}
  },
  trust:{
    th:{label:'ความยินยอม ความไว้วางใจ และสิทธิ์เข้าถึง',title:'ใครดูแลข้อมูล และระบบตรวจสิทธิ์อย่างไร',intro:'โรงพยาบาลเก็บเวชระเบียนไว้ในระบบของตน ส่วน HealthTAG เชื่อมตัวตน ตรวจสิทธิ์ ปกป้อง API และบันทึกเหตุการณ์เข้าถึง',sections:[{heading:'เวชระเบียนอยู่ที่โรงพยาบาล',body:'เวชระเบียนอยู่ในโครงสร้างพื้นฐาน FHIR ของโรงพยาบาล ส่วน blockchain เก็บเฉพาะเหตุการณ์การให้ความยินยอมและการเข้าถึง'},{heading:'การตรวจสิทธิ์',body:'Hospital API ตรวจช่วงเวลาการเข้าถึง 15 นาทีที่กำหนดจากสถานะบน blockchain'},{heading:'การปกป้อง API',body:'Kong ปกป้อง HAPI FHIR API ขณะที่ authentication, encryption และการปฏิบัติการยังต้องทำงานร่วมกัน'}]},
    en:{label:'Consent, trust & access',title:'Who holds the records and how access is checked.',intro:'Hospitals keep clinical records in their own systems. HealthTAG links identity, checks permission, protects the API, and records access events.',sections:[{heading:'Hospitals hold clinical records',body:'Clinical records stay in hospital FHIR infrastructure. Blockchain stores consent and access events.'},{heading:'Hospital API checks access',body:'Hospital API checks the 15-minute access window defined from blockchain state.'},{heading:'Kong protects the FHIR API',body:'Kong protects the HAPI FHIR API while authentication, encryption, and hospital operations provide other safeguards.'}]}
  },
  deployments:{
    th:{label:'การใช้งานจริง',title:'ศิริราชและเคียนซาใช้วิธีนำข้อมูลเข้าแตกต่างกัน',intro:'ศิริราชใช้สคริปต์ที่ทีม IT ของโรงพยาบาลพัฒนาเอง ส่วนเคียนซาใช้ HealthTAG FHIR Transformer',sections:[{heading:'Siriraj 5G Smart Hospital',body:'HealthTAG ระบุว่าเข้าร่วมโครงการย่อย Permission-based Blockchain for Personal Health Record ทีม IT ศิริราชใช้สคริปต์ของตนเองนำข้อมูลจาก HIS เข้า FHIR Server'},{heading:'โรงพยาบาลเคียนซา',body:'โรงพยาบาลเคียนซาใช้ HealthTAG FHIR Transformer แปลงข้อมูล HIS ที่เลือกเป็น HL7 FHIR R4'}]},
    en:{label:'Deployments',title:'Siriraj and Khian Sa use different ingestion paths.',intro:'Siriraj uses a script developed by its hospital IT team. Khian Sa uses HealthTAG FHIR Transformer.',sections:[{heading:'Siriraj 5G Smart Hospital',body:'HealthTAG says it participated in the Permission-based Blockchain for Personal Health Record subproject. Siriraj IT uses its own script to send HIS data to the FHIR Server.'},{heading:'Khian Sa Hospital',body:'Khian Sa Hospital uses HealthTAG FHIR Transformer to map selected HIS data to HL7 FHIR R4.'}]}
  },
  network:{
    th:{label:'เครือข่าย',title:'การติดตั้ง โครงการ รางวัล และเครือข่ายของ HealthTAG',intro:'HealthTAG มีความสัมพันธ์กับโรงพยาบาล สถาบันการแพทย์ หน่วยงานไทย และเครือข่ายต่างประเทศในหลายรูปแบบ',sections:[]},
    en:{label:'Network',title:'HealthTAG deployments, programmes, awards, and network relationships.',intro:'HealthTAG has several types of relationship with hospitals, medical institutions, Thai organizations, and international networks.',sections:[]}
  },
  company:{
    th:{label:'ภาพรวมบริษัท',title:'HealthTAG เริ่มจากปัญหาที่แพทย์พบในการดูแลผู้ป่วย',intro:'ข้อมูลสุขภาพมีอยู่ในหลายระบบ แต่ยังตามผู้ป่วยไปถึงจุดที่ต้องใช้งานได้ยาก',sections:[{heading:'เป้าหมาย',body:'ช่วยให้ข้อมูลสุขภาพที่ได้รับอนุญาตพร้อมใช้ โดยโรงพยาบาลยังควบคุมเวชระเบียนของตน'},{heading:'แนวทาง',body:'เชื่อมระบบเดิม ทำงานกับมาตรฐาน FHIR และแยกหน้าที่ด้านตัวตน สิทธิ์ และการตรวจสอบให้ชัดเจน'},{heading:'ผู้ก่อตั้ง',body:'นพ. เดโชวัต พรมดา ก่อตั้ง HealthTAG จากประสบการณ์ทำงานเป็นแพทย์และปัญหาการไหลของข้อมูลสุขภาพที่พบในการดูแลผู้ป่วย'}]},
    en:{label:'Company overview',title:'HealthTAG began with a problem its founder saw in patient care.',intro:'Health information may exist in several systems but still be difficult to use when a patient needs care.',sections:[{heading:'Goal',body:'Make authorized health information available while hospitals retain control of their records.'},{heading:'Approach',body:'Connect existing systems through FHIR and keep identity, access, and audit responsibilities clear.'},{heading:'Founder',body:'Dechowat Promda, M.D. founded HealthTAG after seeing how difficult it was to use health information across separate clinical systems.'}]}
  }
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
  ['Aumphon Kaewatsadorn', 'Personal Assistant'],
  ['Akkarachai Kaewsakul', 'Account Executive'],
  ['Chatchawan Sudsoom', 'Account Executive'],
];

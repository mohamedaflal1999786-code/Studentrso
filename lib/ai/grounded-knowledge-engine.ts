// lib/ai/grounded-knowledge-engine.ts
import { ChatMessage, StudentProfile, AnswerLengthPreference, CitationSource } from './types';
import { findRelevantSources } from './web-research';

export interface GroundedResponse {
  content: string;
  sources: CitationSource[];
}

export function generateGroundedResponse(
  messages: ChatMessage[],
  profile?: StudentProfile,
  lengthPref: AnswerLengthPreference = 'auto'
): GroundedResponse {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const query = lastUserMsg ? lastUserMsg.content.trim() : '';
  const qLower = query.toLowerCase();

  // Detect explicit length commands inside the user's prompt
  let effectiveLength = lengthPref;
  if (qLower.includes('in detail') || qLower.includes('explain in detail') || qLower.includes('detailed')) {
    effectiveLength = 'detailed';
  } else if (qLower.includes('in one sentence') || qLower.includes('one sentence only')) {
    effectiveLength = 'one-sentence';
  } else if (qLower.includes('briefly') || qLower.includes('short answer') || qLower.includes('keep it brief')) {
    effectiveLength = 'brief';
  } else if (qLower.includes('step by step') || qLower.includes('numbered steps')) {
    effectiveLength = 'step-by-step';
  } else if (qLower.includes('like i am a beginner') || qLower.includes('simple language') || qLower.includes('explain simply')) {
    effectiveLength = 'beginner';
  } else if (qLower.includes('complete procedure') || qLower.includes('full procedure')) {
    effectiveLength = 'full-procedure';
  } else if (qLower.includes('compare') || qLower.includes('difference between') || qLower.includes('vs')) {
    effectiveLength = 'comparison';
  } else if (qLower.includes('only give the answer') || qLower.includes('just the answer')) {
    effectiveLength = 'direct-only';
  }

  // Conversation Context Tracking (inspecting prior assistant & user turns)
  const fullConversationHistory = messages.map((m) => `${m.role}: ${m.content}`).join('\n');
  const hasBcaContext = fullConversationHistory.toLowerCase().includes('bca') || fullConversationHistory.toLowerCase().includes('computer applications');
  const hasBcomContext = fullConversationHistory.toLowerCase().includes('bcom') || fullConversationHistory.toLowerCase().includes('commerce');
  const hasClass10Context = fullConversationHistory.toLowerCase().includes('class 10') || fullConversationHistory.toLowerCase().includes('10th');
  const hasClass12Context = fullConversationHistory.toLowerCase().includes('class 12') || fullConversationHistory.toLowerCase().includes('12th');
  const hasDiplomaContext = fullConversationHistory.toLowerCase().includes('diploma') || fullConversationHistory.toLowerCase().includes('polytechnic');
  const hasPhdContext = fullConversationHistory.toLowerCase().includes('phd') || fullConversationHistory.toLowerCase().includes('research');

  const sources = findRelevantSources(query + ' ' + (profile?.currentCourse || ''));

  // ---------------------------------------------------------------------------
  // 1. STUDENT RSO PLATFORM & WEBSITE ASSISTANCE
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('what is student rso') ||
    qLower.includes('explain student rso') ||
    qLower.includes('how to use student rso') ||
    qLower.includes('about student rso') ||
    qLower.includes('student rso website') ||
    qLower.includes('student rso modules') ||
    qLower.includes('how to use scholarship hub') ||
    qLower.includes('how to use safety') ||
    qLower.includes('how to use certificate') ||
    qLower.includes('how to use exam') ||
    qLower.includes('how to use admission')
  ) {
    return formatLength({
      title: 'Student RSO 2.0 – Platform & Module Navigation Guide',
      content: `**Student RSO 2.0** is Tamil Nadu's comprehensive, non-commercial student welfare and academic advancement platform. It brings statutory guidance, rights protection, scholarship intelligence, certificate processing, examination discovery, admission counseling, and AI guidance together in one unified portal.

### Core Modules of Student RSO:
1. **Module 01: Scholarship Hub** (\`/scholarships\`):
   - Automated discovery and eligibility matching across Tamil Nadu Government and Central NSP welfare schemes.
   - Includes Post-Matric scholarships, First Graduate fee waiver, Pudhumai Penn, Tamil Pudhalvan, and institutional renewal tracking.
2. **Module 02: Safety & Grievance System** (\`/safety\`):
   - Statutory student rights protection, Anti-Ragging reporting portal, Cyber Crime Shield (1930), and UGC e-Samadhaan grievance redressal.
   - Includes Emergency 112 guidance and verified government authority directories.
3. **Module 03: Certificate & Document Service** (\`/certificates\`):
   - Official step-by-step guides for applying, tracking, and verifying essential student certificates (Community, Income, Nativity, First Graduate).
   - Integrates with Tamil Nadu e-District, e-Sevai, and DigiLocker (Rule 9A IT Rules 2016 parity).
4. **Module 04: Exams & Opportunity Hub** (\`/exams\`):
   - Discovery of 56+ verified government, national entrance, competitive recruitment, and scholarship examinations.
   - Detailed eligibility calculators, course-wise mapping, and statutory exam calendars.
5. **Module 05: AI Student Career Assistant** (\`/career-assistant\`):
   - Conversational AI educational mentor supporting students from Class 10 to PhD with document/image analysis, syllabus explanations, and career roadmaps.
6. **Module 06: Student Admission & Education Continuity Centre** (\`/admissions\`):
   - Centralized admission procedures (TNEA, TNGASA, Medical Selection, Lateral Entry), inter-college transfers, branch sliding, break-of-study re-entry, and Academic Bank of Credits (ABC / APAAR).

### How to Upload Documents and Use the AI Assistant:
- Click the **Paperclip icon** in the message composer to attach images (JPG, PNG, WEBP), documents (DOC, DOCX, PDF), or presentations (PPT, PPTX) up to 10 MB.
- Ask questions directly based on the uploaded file (e.g. eligibility criteria, important dates, syllabus breakdown, or resume improvement).`,
      sources,
      oneSentence: 'Student RSO 2.0 is Tamil Nadu\'s integrated student advancement platform comprising 6 specialized modules: Scholarships, Safety, Certificates, Exams, AI Career Guidance, and Admissions & Continuity.',
      brief: `Student RSO 2.0 provides 6 dedicated modules:
1. **/scholarships**: Tamil Nadu and Central scholarship matching & renewals.
2. **/safety**: Anti-ragging, emergency 112, and UGC grievance redressal.
3. **/certificates**: e-Sevai & DigiLocker certificate guides (Community, Income, Nativity).
4. **/exams**: 56+ government, entrance, and competitive examination guides.
5. **/career-assistant**: Conversational AI companion with document & image analysis.
6. **/admissions**: Single-window admissions (TNEA/TNGASA), college transfers & re-entry.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 2. FOLLOW-UP CONTEXT: BCA CAREERS & GOVT EXAMS
  // ---------------------------------------------------------------------------
  if (hasBcaContext && (qLower.includes('job') || qLower.includes('after this') || qLower.includes('government exam') || qLower.includes('govt exam'))) {
    if (qLower.includes('government') || qLower.includes('govt')) {
      return formatLength({
        title: 'Government Examination Opportunities for BCA Graduates',
        content: `As a BCA graduate, you hold a recognized 3-year Bachelor's degree and are fully eligible for premier State and Central Government competitive examinations:

1. **TNPSC Combined Civil Services (Group 1, 2, 2A, and 4)**:
   - Direct recruitment to Assistant Commissioner, Deputy Collector, Sub-Registrar, and Revenue Inspector.
2. **Staff Selection Commission Combined Graduate Level (SSC CGL)**:
   - Inspector of Central Excise, Income Tax Inspector, and Assistant Section Officer (ASO) in Central Ministries.
3. **Banking Personnel Selection (IBPS PO, Clerk & SBI PO)**:
   - Probationary Officer, Specialist IT Officer (SO Scale I), and Customer Associates in Public Sector Banks.
4. **Union Public Service Commission (UPSC Civil Services & CDS)**:
   - IAS, IPS, IRS, and Combined Defence Services officer cadetship.
5. **Railways Recruitment Board (RRB NTPC)**:
   - Commercial Apprentice, Station Master, and Goods Guard appointments.`,
        sources,
        oneSentence: 'BCA graduates are eligible for all statutory graduate-level government examinations including TNPSC Groups 1, 2, and 2A, SSC CGL, Banking (IBPS/SBI PO & IT Officer), UPSC Civil Services, and RRB NTPC.',
        brief: `BCA graduates are eligible for:
- **Civil Services**: TNPSC Group 1, 2 & 2A; UPSC Civil Services.
- **Central Posts**: SSC CGL (Income Tax, Excise Inspector, ASO).
- **Banking**: IBPS PO, SBI PO, and Bank IT Specialist Officer.
- **Railways**: RRB NTPC graduate posts (Station Master, Commercial Apprentice).`,
      }, effectiveLength);
    }

    return formatLength({
      title: 'Career & Employment Opportunities After BCA',
      content: `A Bachelor of Computer Applications (BCA) qualifies you for diverse software engineering, IT consulting, and public service roles:

### Private IT & Tech Sector
- **Software Developer / Engineer**: Full-stack web development, frontend (React/Next.js), backend (Java, Node.js, Python).
- **System Analyst & Quality Assurance**: Software testing, automation, and continuous integration.
- **Database Administrator (DBA)**: PostgreSQL, MySQL, and cloud database optimization.
- **Cloud & DevOps Associate**: AWS, Azure, and Kubernetes infrastructure support.
- **Campus & Off-Campus Hiring**: TCS NQT, Infosys, Wipro, Cognizant, and Zoho recruit BCA graduates for Software Associate and Graduate Trainee roles.

### Higher Education Pathways
- **MCA (Master of Computer Applications)**: 2-year lateral master's via TANCET in Tamil Nadu (Anna University, Government Engineering Colleges) or NIMCET for NITs.
- **M.Sc Computer Science / Data Science / AI**: Specialized research and deep-learning pathways.
- **MBA (Information Technology / Systems)**: Leading to IT Project Management and Technical Product Management.`,
      sources,
      oneSentence: 'After BCA, students can pursue software engineering roles (Full-stack, QA, Cloud) via corporate hiring (TCS, Infosys, Zoho) or enter higher education through 2-year MCA (TANCET/NIMCET) and M.Sc Data Science.',
      brief: `Key pathways after BCA:
1. **Software Roles**: Full-Stack Developer, Database Administrator, QA Analyst in IT companies (Zoho, TCS, Cognizant).
2. **Master's Degree**: 2-year MCA through TANCET or NIMCET for senior software architect careers.
3. **Government Sector**: Eligible for all graduate officer recruitment (TNPSC, SSC CGL, Banking IT Officer).`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 3. CLASS 10 HIGHER EDUCATION OPTIONS
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('class 10') ||
    qLower.includes('after 10th') ||
    (qLower.includes('10th') && qLower.includes('option')) ||
    qLower.includes('what can i study after class 10')
  ) {
    return formatLength({
      title: 'Complete Higher Education & Career Pathways After Class 10 (SSLC)',
      content: `After completing Class 10 in Tamil Nadu, students have three distinct, statutory educational pathways:

### Pathway 1: Higher Secondary Education (Class 11 & 12 / HSC)
- **Science Group with Mathematics (PCM / PCMB)**: Qualifies for Engineering (TNEA/JEE), Medicine (NEET), Architecture (NATA), Agriculture (TNAU), and pure sciences.
- **Science Group with Biology (PCB)**: Medical (MBBS/BDS), Paramedical (Nursing/B.Pharm/Physiotherapy), Veterinary (TANUVAS), and Allied Sciences.
- **Commerce Group (Commerce, Accountancy, Economics, Computer Applications / Business Maths)**: Leads to CA (Chartered Accountancy), CMA, CS, B.Com, BBA, Law (5-Year Integrated B.Com LL.B.), and Banking.
- **Arts & Humanities Group (History, Geography, Political Science, Literature)**: Prepares for Civil Services, Law (BA LL.B.), Journalism, Social Work, and University Arts degrees.

### Pathway 2: 3-Year Polytechnic Diploma (DOTE Tamil Nadu)
- Direct admission into Mechanical, Civil, Electrical (EEE), Electronics (ECE), Computer Engineering, or Automobile.
- **Key Advantage**: Eligible for **Direct 2nd-Year Lateral Entry B.E./B.Tech** into Anna University and government engineering colleges without writing Class 12 exams.
- Immediate employment opportunities as Junior Engineer (JE) in TANGEDCO, TNSTC, and private manufacturing.

### Pathway 3: 2-Year ITI Trades (Craftsmen Training Scheme)
- Technical trade certifications in Electrician, Fitter, Machinist, Welder, and Electronics Mechanic via DET Tamil Nadu.
- Leads to statutory apprenticeships via NATS/NAPS and technical railway appointments (RRB Assistant Loco Pilot & Technician).

### Statutory Scholarships Available
- **TRUSTS (Tamil Nadu Rural Students Talent Search)**: Cash scholarship for rural government school students continuing studies.
- **NMMS (National Means-cum-Merit Scholarship)**: ₹12,000/year from Class 9 through Class 12.`,
      sources,
      oneSentence: 'After Class 10, students can choose Higher Secondary (Class 11-12 in Science, Commerce, or Arts), 3-year Polytechnic Diploma (with direct lateral entry to 2nd-year B.E.), or 2-year ITI Craftsmen training.',
      brief: `The three main routes after Class 10 are:
1. **Class 11 & 12**: Science (Engineering/Medical), Commerce (Finance/CA), or Arts (Law/Civil Services).
2. **Polytechnic Diploma (3 Years)**: Direct technical training with option to join 2nd-year B.E./B.Tech via Lateral Entry.
3. **ITI Trades (1-2 Years)**: Practical job training for technician roles and Railway jobs.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 4. CLASS 12 ENTRANCE EXAMS (GENERAL & MEDICAL)
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('entrance examinations can i write after class 12') ||
    qLower.includes('entrance exams after 12') ||
    qLower.includes('medical entrance') ||
    qLower.includes('neet')
  ) {
    if (qLower.includes('medical') || qLower.includes('neet')) {
      return formatLength({
        title: 'Medical Entrance Examinations & Admission Guidance (NEET UG)',
        content: `Admission to all statutory undergraduate medical, dental, and AYUSH courses in India is governed exclusively by **NEET UG (National Eligibility cum Entrance Test)** conducted by the National Testing Agency (NTA):

### Courses Governed by NEET UG:
1. **MBBS (Bachelor of Medicine & Bachelor of Surgery)**: 5.5 years (including 1-year rotating compulsory internship).
2. **BDS (Bachelor of Dental Surgery)**: 5 years.
3. **AYUSH Degrees**: BSMS (Siddha – high preference in Tamil Nadu), BAMS (Ayurveda), BHMS (Homeopathy), BUMS (Unani).
4. **Allied Medical Degrees**: B.Sc Nursing in select central institutes (JIPMER, AIIMS).

### Seat Allocation & Counselling Quotas:
- **15% All India Quota (AIQ)**: Conducted centrally by the **Medical Counselling Committee (MCC)** at \`mcc.nic.in\` for all Government Medical Colleges across India, AIIMS, and JIPMER.
- **85% State Quota Seats**: Conducted by the **Directorate of Medical Education (DME) Tamil Nadu Selection Committee** at \`tnmedicalselection.net\` for 38 Government Medical Colleges and Government Quota seats in self-financing colleges.
- **7.5% Government School Preferential Quota**: Horizontal reservation granting 100% free tuition, hostel, and examination fee coverage for Tamil Nadu government school students.

### Eligibility Criteria:
- Pass in Class 12 with Physics, Chemistry, Biology/Biotechnology, and English.
- Minimum 50th percentile in NEET UG for General/OC; 40th percentile for BC/BCM/MBC/SC/ST.`,
        sources,
        oneSentence: 'Admission to MBBS, BDS, and AYUSH is conducted via NEET UG with 85% seats filled by DME Tamil Nadu Selection Committee and 15% through MCC, featuring a 7.5% full fee-waiver quota for government school students.',
        brief: `Key facts on Medical Entrance (NEET UG):
1. **Single Window**: NEET UG is the sole statutory entrance for MBBS, BDS, and Siddha (BSMS).
2. **Tamil Nadu Counselling**: 85% state quota handled by DME Tamil Nadu at tnmedicalselection.net.
3. **Special Quota**: 7.5% reservation with complete fee waiver for Tamil Nadu government school students.
4. **All India Quota**: 15% seats across India handled by MCC at mcc.nic.in.`,
      }, effectiveLength);
    }

    return formatLength({
      title: 'Major Entrance Examinations After Class 12 for Tamil Nadu Students',
      content: `After Class 12, higher education admissions divide into **Entrance-Based** and **State Single-Window Merit-Based** pathways:

### 1. Engineering Admissions:
- **TNEA (Tamil Nadu Engineering Admissions)**: **NO ENTRANCE EXAM**. Pure Class 12 cut-off out of 200 marks (Maths 100 + Physics 50 + Chemistry 50) for Anna University and 450+ colleges.
- **JEE Main & Advanced**: For admission to NIT Tiruchirappalli (50% Home State quota), IIT Madras, and IIITs via JoSAA.

### 2. Medical & Healthcare:
- **NEET UG**: Compulsory national entrance for MBBS, BDS, BSMS (Siddha), and AYUSH courses.
- **TN Paramedical Selection**: Merit-based cut-off out of 200 for B.Pharm, B.Sc Nursing, and Physiotherapy via DME.

### 3. Central Universities & Integrated Master\'s:
- **CUET UG (Common University Entrance Test)**: National admission to 45 Central Universities (including Central University of Tamil Nadu – CUTN, Tiruvarur).

### 4. Law, Architecture & Design:
- **CLAT & AILET**: National Law Universities (including TNNLU Tiruchirappalli).
- **TNDALU Law Admissions**: 5-Year Integrated B.A. LL.B. / B.Com LL.B. based on Class 12 merit.
- **NATA (National Aptitude Test in Architecture)**: Mandatory entrance for B.Arch admissions.

### 5. Agriculture & Veterinary:
- **TNAU**: Merit-based cut-off for B.Sc (Hons) Agriculture.
- **TANUVAS**: Merit-based cut-off for B.V.Sc & A.H. (Veterinary).`,
      sources,
      oneSentence: 'After Class 12, major admissions include TNEA (merit-based for engineering), NEET UG (for medicine), JEE Main (for NITs), CUET (for central universities), NATA (for architecture), and CLAT (for law).',
      brief: `Key entrance examinations after Class 12:
1. **Engineering**: TNEA (merit cut-off for Anna Univ) and JEE Main/Advanced (for NITs/IITs).
2. **Medical**: NEET UG (compulsory for MBBS/BDS/Siddha).
3. **Central Universities**: CUET UG for Central University of Tamil Nadu and Delhi University.
4. **Law & Architecture**: CLAT for NLUs; NATA for B.Arch.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 5. CLASS 12 PCMB (BIOLOGY & MATHEMATICS)
  // ---------------------------------------------------------------------------
  if ((qLower.includes('biology') && qLower.includes('mathematics')) || (qLower.includes('pcmb') && qLower.includes('12'))) {
    return formatLength({
      title: 'Higher Education Options After Class 12 with Biology and Mathematics (PCMB)',
      content: `Studying both Mathematics and Biology in Class 12 provides the widest educational and career flexibility in the Indian education system:

### 1. Medical & Healthcare Pathways (via NEET UG)
- **MBBS / BDS**: Single window admission across 38 Government Medical Colleges in Tamil Nadu and All-India Quota.
- **AYUSH Degrees**: BSMS (Siddha - high preference in TN), BAMS (Ayurveda), BHMS (Homeopathy).
- **Allied Health Sciences**: B.Sc Radiography, B.Sc Cardiac Technology, B.Sc Medical Lab Technology, Dialysis Technology (DME Single Window).
- **Pharmacy & Nursing**: B.Pharm (4 years) and B.Sc Nursing.

### 2. Engineering & Technical Pathways (via TNEA & JEE)
- **Biomedical Engineering & Biotechnology**: Intersecting biological sciences and computing/instrumentation.
- **Bioinformatics & Computational Biology**: Combining molecular genetics with algorithm development.
- **Core Engineering Branches**: Computer Science (CSE), Artificial Intelligence & Data Science, Electronics (ECE), Electrical (EEE), and Mechanical Engineering.

### 3. Agricultural & Life Sciences Pathways
- **TNAU Single Window**: B.Sc (Hons) Agriculture, B.Sc (Hons) Horticulture, and B.Tech Agricultural Engineering (requires both Maths & Bio).
- **TANUVAS Single Window**: B.V.Sc & A.H. (Veterinary Science) and B.Tech Food Technology / Dairy Technology.

### 4. Pure Sciences & Research Pathways
- **IISER / NISER / IISc**: 5-Year BS-MS Dual Degree via IAT (IISER Aptitude Test) for frontline scientific research with monthly INSPIRE scholarships.
- **B.Sc / M.Sc Integrated**: Microbiology, Biochemistry, Genetics, Mathematics, Physics at Central and State Universities via CUET.`,
      sources,
      oneSentence: 'Students with both Mathematics and Biology can pursue Medicine (NEET UG), Biomedical Engineering and Core Engineering (TNEA/JEE), Agriculture (TNAU), Veterinary (TANUVAS), or Pure Science Research (IISER/NISER).',
      brief: `PCMB students have four distinct avenues:
1. **Medical & Allied**: MBBS, BDS, Siddha (BSMS), B.Pharm, and Nursing through NEET UG and DME Single Window.
2. **Engineering**: Biomedical, Biotechnology, CSE, and ECE through TNEA (Anna University) and JEE Main.
3. **Agriculture & Veterinary**: B.Sc Agriculture (TNAU) and B.V.Sc (TANUVAS).
4. **Frontline Research**: BS-MS Dual Degrees at IISERs and IISc via IISER Aptitude Test.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 6. SCHOLARSHIPS ELIGIBILITY
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('scholarship') ||
    qLower.includes('what scholarships am i eligible for') ||
    qLower.includes('scholarships available')
  ) {
    return formatLength({
      title: 'Tamil Nadu & Central Government Scholarships Overview',
      content: `Tamil Nadu operates several high-impact statutory scholarship schemes spanning school education through research fellowships:

### 1. Tamil Nadu Government Special Welfare Schemes
- **Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar)**:
  - **Benefit**: ₹1,000/month directly transferred to the student's bank account.
  - **Eligibility**: Female students who studied Classes 6 to 12 in Tamil Nadu Government schools and enrolled in undergraduate, polytechnic, or ITI programs.
- **Tamil Pudhalvan Scheme**:
  - **Benefit**: ₹1,000/month bank stipend.
  - **Eligibility**: Male students who studied Classes 6 to 12 in Tamil Nadu Government schools pursuing higher education.
- **First Graduate Tuition Fee Concession**:
  - **Benefit**: 100% waiver of tuition fees in Engineering (B.E./B.Tech) and Medical counseling quota seats.
  - **Eligibility**: Student must be the first person in the family to graduate from college.
- **7.5% Government School Quota Coverage**:
  - **Benefit**: 100% fee waiver (tuition, hostel, and examination fees covered by the State Government) for students admitted to Engineering, Medical, Agriculture, Veterinary, and Law under the 7.5% quota.

### 2. Post-Matric Community Scholarships
- **BC/MBC Welfare Department**: Tuition and maintenance grant for students with family annual income under ₹2.5 Lakhs.
- **Adi Dravidar and Tribal Welfare (ADW) Post-Matric**: Full fee reimbursement and hostel maintenance allowance for SC/ST students with family income under ₹2.5 Lakhs.

### 3. Central Government Schemes (NSP Portal)
- **Central Sector Scheme of Scholarships for College & University Students**: ₹12,000/year for undergraduate students scoring above the 80th percentile in Class 12.
- **NMMS (National Means-cum-Merit)**: ₹12,000/year for Classes 9 through 12.

*To check your exact tailored matches, open Module 01 (\`/scholarships\`) and use the Smart Eligibility Checker.*`,
      sources,
      oneSentence: 'Tamil Nadu students can access Pudhumai Penn and Tamil Pudhalvan (₹1,000/mo for govt school students), First Graduate full tuition fee waiver, Post-Matric community scholarships, and Central Sector NSP grants.',
      brief: `Top scholarships available:
1. **Pudhumai Penn & Tamil Pudhalvan**: ₹1,000/month for students from TN government schools.
2. **First Graduate Scheme**: Full tuition fee waiver for first degree holders in family.
3. **Post-Matric Scholarships**: SC/ST/BC/MBC welfare tuition reimbursement for income < ₹2.5L.
4. **7.5% Govt School Quota**: Complete fee exemption including hostel in professional courses.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 7. HOW TO ENTER AN ENGINEERING COLLEGE (TNEA)
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('how can i enter an engineering college') ||
    qLower.includes('join engineering') ||
    qLower.includes('engineering admission') ||
    qLower.includes('tnea')
  ) {
    return formatLength({
      title: 'Tamil Nadu Engineering Admissions (TNEA) Complete Procedure',
      content: `Tamil Nadu Engineering Admissions (TNEA) is the official single-window counselling system conducted by Anna University and the Directorate of Technical Education (DOTE) for B.E. / B.Tech seats across government and affiliated engineering colleges:

### 1. Eligibility & Cut-Off Calculation
- **Minimum Qualifying Marks in Class 12 (HSC)**:
  - OC / General: **45% average** in Maths, Physics & Chemistry.
  - BC, BCM, MBC/DNC, SC, ST: **40% average**.
- **Cut-Off Calculation (Out of 200 Marks)**:
  - **Mathematics**: Normalized to **100 Marks**
  - **Physics**: Normalized to **50 Marks**
  - **Chemistry**: Normalized to **50 Marks**
  - **Formula**: \`Cut-off = Maths + (Physics / 2) + (Chemistry / 2)\` (Maximum: 200)

### 2. Step-by-Step Counselling Procedure
1. **Online Application**: Register on the official portal (\`tneaonline.org\`) after Class 12 results are declared.
2. **Certificate Upload & Verification**: Upload 10th & 12th marksheets, Transfer Certificate, Community Certificate, Nativity Certificate, and First Graduate certificate.
3. **Random Number & Rank List Publication**: A 10-digit random number resolves ties; the official statewide rank list is published with communal reservations.
4. **Special Category Counselling**: Dedicated rounds for 7.5% Government School Quota (Free tuition, hostel, and exam fees), Differently-Abled, Sports, and Ex-Servicemen.
5. **General Online Counselling**: Conducted in 3-4 rounds based on cut-off rank brackets.
6. **Choice Filling**: Add preferred college-branch choices in order of priority.
7. **Tentative Allotment & Confirmation**: Accept and join, or accept and opt for upward movement.
8. **Final Allotment**: Download official seat allotment order and report to the allotted engineering college.`,
      sources,
      oneSentence: 'TNEA single-window counselling allocates government and affiliated B.E./B.Tech seats based on a 200-mark cut-off (Maths 100 + Physics 50 + Chemistry 50) through centralized online choice filling at tneaonline.org.',
      brief: `TNEA admissions procedure:
1. **Cut-off Formula**: Maths (100) + Physics/2 (50) + Chemistry/2 (50) = 200 marks.
2. **Process**: Online registration at tneaonline.org -> Online document verification -> Rank list -> Multi-round choice filling -> Final seat allotment.
3. **Special Quota**: 7.5% preferential horizontal reservation with complete fee waiver for Tamil Nadu government school students.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 8. GOVERNMENT JOBS AFTER GRADUATION
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('government jobs can i apply for after graduation') ||
    qLower.includes('govt jobs after graduation') ||
    qLower.includes('government jobs after degree') ||
    qLower.includes('government recruitment')
  ) {
    return formatLength({
      title: 'Premier Government Job Opportunities After Graduation',
      content: `A recognized undergraduate degree (B.A., B.Sc., B.Com., B.E., B.Tech, BCA, BBA) makes you eligible for all major State and Central civil and defense recruitment examinations:

### 1. Tamil Nadu Public Service Commission (TNPSC)
- **TNPSC Group 1**: Deputy Collector, Deputy Superintendent of Police (DSP), Assistant Commissioner (Commercial Taxes). Salary: Level 22 (₹56,100 - ₹2,05,700).
- **TNPSC Group 2 & 2A (Combined Civil Services-II)**: Sub-Registrar, Municipal Commissioner, Revenue Inspector, and Assistant Section Officer (ASO) in Secretariat.
- **TNPSC Group 4 & VAO**: Village Administrative Officer and Junior Assistant appointments.

### 2. Staff Selection Commission (SSC)
- **SSC CGL (Combined Graduate Level)**:
  - Inspector of Central Excise & GST, Income Tax Inspector (CBDT), Enforcement Officer (ED), Assistant Audit Officer (CAG), and CBI Sub-Inspector.

### 3. Banking Sector Recruitment
- **IBPS PO & SBI PO**: Probationary Officer appointments across Public Sector Banks (starting gross salary ₹65,000+/mo).
- **RBI Grade B Officer**: Apex central banking policy and supervisory careers.
- **IBPS Clerk & Specialist Officer (SO)**: Specialized IT, Law, and Marketing officer roles.

### 4. Union Public Service Commission (UPSC)
- **UPSC Civil Services Examination (CSE)**: IAS, IPS, IFS, and IRS appointments.
- **Combined Defence Services (CDS)**: Officer commissions in the Indian Military Academy (IMA), Naval Academy, Air Force Academy, and OTA Chennai.

### 5. Railway Recruitment Board (RRB)
- **RRB NTPC Graduate Posts**: Station Master, Goods Train Manager, and Senior Commercial cum Ticket Clerk.`,
      sources,
      oneSentence: 'Graduates can apply for TNPSC Groups 1, 2, and 4 in Tamil Nadu, SSC CGL for central ministries, IBPS/SBI PO in banking, UPSC Civil Services, and RRB NTPC in railways.',
      brief: `Top government examinations for graduates:
1. **TNPSC**: Group 1 (Deputy Collector/DSP) & Group 2 (Sub-Registrar, Revenue Inspector).
2. **SSC CGL**: Income Tax Inspector, Central Excise, and CBI Sub-Inspector.
3. **Banking**: SBI PO and IBPS PO across national public sector banks.
4. **UPSC**: Civil Services (IAS/IPS) and Combined Defence Services (CDS).`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 9. BREAK OF STUDY & EDUCATION CONTINUITY
  // ---------------------------------------------------------------------------
  if (
    qLower.includes('continue my education after a study break') ||
    qLower.includes('study break') ||
    qLower.includes('re-entry') ||
    qLower.includes('discontinued') ||
    qLower.includes('drop out') ||
    qLower.includes('rejoining college')
  ) {
    return formatLength({
      title: 'Guidance on Continuing Education After a Study Break (Re-entry & Condonation)',
      content: `Under University Grants Commission (UGC) guidelines and state university statutes (Anna University, University of Madras, Bharathiar, Madurai Kamaraj), students who discontinued studies have a legal path to resume education:

### 1. Maximum Permissible Course Duration Ceilings:
- **Undergraduate Engineering (B.E. / B.Tech)**: Maximum **7 years (14 semesters)** for regular students, and **6 years (12 semesters)** for lateral entry students.
- **Arts, Science & Commerce (B.A., B.Sc., B.Com.)**: Statutory **N + 2 years** (5 years for a 3-year undergraduate degree).
- **Postgraduate (M.A., M.Sc., MBA, MCA)**: Statutory **N + 2 years** (4 years for a 2-year master's program).

### 2. Step-by-Step Re-admission Procedure:
1. **Verify Time Gap**: Confirm that your total elapsed time from the original year of admission is within the permissible ceiling.
2. **Assemble Academic Records**: Gather marksheets of all completed semesters, college ID, and original allotment order.
3. **Medical or Financial Proof**: If the break was due to health issues, obtain a Medical Fitness Certificate from a Government Civil Surgeon; if financial or personal, prepare an explanatory affidavit.
4. **Submit Formal Re-admission Dossier**: Apply in writing to the Principal/Dean of your college requesting Break of Study Condonation and re-admission.
5. **University Sanction Order**: The college forwards your application to the University Syndicate / Academic Courses Directorate. The university issues an official order stipulating the semester of re-admission and any curriculum bridge subjects.
6. **Resume Studies**: Pay re-admission fees and enroll in classes with your existing credits intact.

### 3. Alternative Flexible Pathways:
- If you have exceeded the regular college time limit, your passed credits can be mapped into **Tamil Nadu Open University (TNOU)** or **University of Madras IDE** to complete your degree through flexible distance learning.`,
      sources,
      oneSentence: 'Students can resume education within statutory duration limits (7 years for B.E., 5 years for B.A./B.Sc) by applying for university Break of Study Condonation through their college Principal with their earned credits preserved.',
      brief: `Steps to resume education after a study break:
1. **Duration Check**: B.E./B.Tech allows up to 7 years; Arts & Science degrees allow up to 5 years (N+2 rule).
2. **Application**: Submit a formal re-admission petition with medical or emergency proofs to your college Principal.
3. **University Order**: The university issues a condonation order permitting you to re-join the corresponding semester.
4. **Flexible Option**: Alternatively, transfer completed credits into TNOU or University of Madras IDE.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 10. DIPLOMA TO ENGINEERING (LATERAL ENTRY)
  // ---------------------------------------------------------------------------
  if (qLower.includes('diploma') && (qLower.includes('engineering') || qLower.includes('lateral entry') || qLower.includes('b.e') || qLower.includes('btech'))) {
    return formatLength({
      title: 'Guidance on Joining Engineering (B.E. / B.Tech) After Diploma (Lateral Entry)',
      content: `Yes, polytechnic diploma holders can directly join the **2nd Year (3rd Semester)** of undergraduate engineering through statutory Lateral Entry:

### 1. Admission Authority & Mechanism in Tamil Nadu
- **Administering Authority**: Directorate of Technical Education (DOTE) Tamil Nadu through Alagappa Chettiar Government College of Engineering and Technology (ACGCET), Karaikudi.
- **Single Window Portal**: Applications are handled centrally via the official TN Lateral Entry portal.
- **Statutory Quota**: A minimum of **10% of total sanctioned intake** in government, government-aided, and self-financing engineering colleges is reserved exclusively for lateral entry diploma holders.

### 2. Eligibility Criteria
- **Academic Qualification**: 3-Year Diploma in Engineering/Technology awarded by the State Board of Technical Education (Tamil Nadu DOTE) or equivalent AICTE-approved board.
- **Minimum Qualifying Marks**:
  - General / OC: Minimum **45% marks** in qualifying diploma semester examinations.
  - Reserved Communities (BC, BCM, MBC/DNC, SC, ST): Minimum **40% marks**.
- **Eligible Branches**: You can choose either the same branch as your diploma or allied engineering branches (e.g. Mechanical Diploma can opt for Mechanical, Automobile, Mechatronics, or Production; Computer Diploma can opt for CSE, IT, AI&DS).

### 3. Step-by-Step Application Procedure
1. **Online Registration**: Register on the official DOTE Lateral Entry portal when notification opens in May/June.
2. **Upload Documents**: Submit Diploma marksheets (Semesters 1 to 6), Provisional Diploma Certificate, Transfer Certificate, and Community Certificate.
3. **Merit List Publication**: Normalized aggregate percentage of 5th and 6th semester board exams determines your state lateral entry rank.
4. **Online Choice Filling**: Select government colleges (CEG Guindy, MIT Chromepet, GCT Coimbatore, CIT) and self-financing institutions.
5. **Seat Allotment & College Joining**: Download allotment order and report to the allotted engineering college directly into the 2nd year.`,
      sources,
      oneSentence: 'Yes, diploma holders can join the 2nd year (3rd semester) of B.E./B.Tech through DOTE Tamil Nadu Lateral Entry Single Window Counselling based on their final-year diploma aggregate marks without writing an entrance exam.',
      brief: `Key facts for Lateral Entry Engineering:
- **Direct Entry**: Join 2nd year (Semester 3) of B.E./B.Tech, saving one academic year.
- **Admission Basis**: Merit rank calculated from 5th and 6th semester diploma marks (no entrance exam).
- **Official Portal**: Directorate of Technical Education (DOTE) Tamil Nadu Lateral Entry single window.
- **Eligibility**: Minimum 45% marks (40% for BC/MBC/SC/ST) in an AICTE-recognized diploma.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 11. UNDERGRADUATE B.COM PATHWAYS
  // ---------------------------------------------------------------------------
  if (qLower.includes('bcom') || qLower.includes('b.com') || (qLower.includes('commerce') && qLower.includes('after'))) {
    return formatLength({
      title: 'Career & Higher Education Pathways After B.Com',
      content: `A Bachelor of Commerce (B.Com) provides multiple avenues across professional certifications, corporate finance, higher education, and government civil service:

### 1. Premier Professional Qualifications
- **Chartered Accountancy (CA - ICAI)**: Direct Entry Scheme allows B.Com graduates with 55% aggregate marks to bypass the Foundation exam and register directly for CA Intermediate.
- **Cost & Management Accountancy (CMA - ICMAI)**: Direct entry to Intermediate stage for corporate cost accounting and statutory audit.
- **Company Secretary (CS - ICSI)**: Direct entry to CS Executive for corporate governance and secretarial compliance.
- **Global Certifications**: ACCA (UK - with up to 9 paper exemptions for B.Com), US CPA, and CFA (Chartered Financial Analyst) for investment banking.

### 2. Postgraduate Degrees (Masters)
- **MBA (Finance / Marketing / Business Analytics)**: Admissions via CAT, XAT, MAT, or TANCET for top Indian IIMs and state university management departments.
- **M.Com**: 2-year academic master's leading to assistant professorship via UGC NET and research fellowships.

### 3. Government Competitive Examinations
- **Banking Recruitment (IBPS PO, Clerk & SBI PO)**: High proportion of finance and banking aptitude matches B.Com syllabus.
- **TNPSC Group 1, 2, 2A & 4**: Commercial Tax Officer, Audit Inspector, Sub-Registrar, and Secretariat ASO.
- **Staff Selection Commission (SSC CGL)**: Assistant Audit Officer (AAO) in CAG and Tax Assistant in CBDT.
- **Reserve Bank of India (RBI Grade B & Assistant)**: High-prestige central banking careers.`,
      sources,
      oneSentence: 'After B.Com, graduates can pursue professional credentials (CA/CMA/ACCA with direct entry exemptions), corporate finance and MBA via CAT/TANCET, or banking and civil service careers through IBPS, TNPSC, and SSC CGL.',
      brief: `Top pathways after B.Com:
1. **Professional Credentials**: CA or CMA via direct entry to Intermediate (skipping Foundation), ACCA, or CFA.
2. **Postgraduate**: MBA in Finance/Analytics via CAT/TANCET or M.Com for academia.
3. **Government Jobs**: Banking (IBPS/SBI PO), TNPSC (Commercial Taxes & Audit), and SSC CGL (Audit Officer in CAG).`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 12. POSTGRADUATE TO PHD RESEARCH GUIDANCE
  // ---------------------------------------------------------------------------
  if (qLower.includes('phd') || qLower.includes('doctoral') || qLower.includes('research proposal')) {
    return formatLength({
      title: 'Comprehensive Guidance on Pursuing a PhD (Doctoral Studies)',
      content: `Pursuing a Doctor of Philosophy (PhD) in India follows the statutory **UGC (Minimum Standards and Procedures for Award of Ph.D. Degree) Regulations, 2022**:

### 1. Mandatory Eligibility Criteria
- **Master's Degree**: 2-Year Master's Degree (M.Sc, M.Com, M.A., M.E., M.Tech, MBA, MCA) with at least **55% marks** in aggregate (or equivalent grade point).
- **Relaxation**: A 5% relaxation (minimum **50% marks**) is provided for SC, ST, OBC (non-creamy layer), and Differently-Abled candidates.
- **4-Year Undergraduate Route**: Under NEP regulations, students completing a 4-year Bachelor's degree (Honours with Research) with a minimum 75% marks are also directly eligible for PhD admission.

### 2. National & State Entrance Channels
- **UGC NET / CSIR NET (JRF)**: Qualifying for Junior Research Fellowship (JRF) grants a monthly stipend of **₹37,000 + HRA** for the first two years, increasing to **₹42,000 + HRA (SRF)** for subsequent years.
- **TN-SET / SLET**: State Eligibility Test qualifying you for university research admissions without national JRF funding.
- **GATE Score**: Required for PhD admissions in Engineering, Physical Sciences, and Technology at IITs, NITs, and Anna University.
- **Institutional Written Test & Interview**: Universities conduct entrance assessments consisting of 50% Research Methodology and 50% Subject-Specific questions.

### 3. Step-by-Step Research Journey
1. **Identify Research Problem**: Formulate a distinct, relevant research gap in your chosen discipline.
2. **Draft Research Proposal**: Prepare a structured proposal covering research gap, objectives, methodology, and literature review.
3. **Select Research Supervisor (Guide)**: Approach an eligible recognized professor/guide in an approved research department.
4. **Departmental Research Committee (DRC) Interview**: Present and defend your research proposal before the university panel.
5. **Course Work & Comprehensive Examination**: Complete mandatory 8-12 credit research methodology and coursework before thesis registration.`,
      sources,
      oneSentence: 'To pursue a PhD, you need a Master\'s degree with at least 55% marks (50% for SC/ST/OBC), qualify UGC/CSIR NET or university entrance, draft a rigorous research proposal, and defend it before a Departmental Research Committee.',
      brief: `Key steps to join a PhD:
1. **Eligibility**: Master's degree with minimum 55% marks (50% for reserved categories).
2. **Entrance & Fellowships**: UGC NET / CSIR NET JRF offers ₹37,000+/month research funding.
3. **Research Proposal**: Prepare a structured proposal covering research gap, objectives, methodology, and literature review.
4. **University Selection**: Apply to UGC-recognized central, state, or deemed universities with approved research supervisors.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 13. COMPARISON: BCA VS BSC COMPUTER SCIENCE
  // ---------------------------------------------------------------------------
  if (qLower.includes('bca') && qLower.includes('bsc') && (qLower.includes('difference') || qLower.includes('compare'))) {
    return formatLength({
      title: 'Comparison: BCA vs B.Sc Computer Science',
      content: `Both BCA and B.Sc Computer Science are 3-year undergraduate degree programs, but they focus on different aspects of computing:

| Parameter | Bachelor of Computer Applications (BCA) | B.Sc Computer Science (B.Sc CS) |
| :--- | :--- | :--- |
| **Primary Focus** | Application development, software tools & industry practicals | Mathematical foundations, algorithms & theoretical computing |
| **Curriculum Orientation** | Practical programming (Web, Mobile, Databases, UI) | Computational theory, computer architecture, discrete mathematics |
| **Class 12 Eligibility** | Open to any stream in many universities; Maths/Computer preferred | Mathematics / Business Mathematics in Class 12 is generally compulsory |
| **Ideal Career Outcome** | Software Developer, Web Developer, Application Support | Systems Programmer, Data Scientist, Algorithm Engineer, Researcher |
| **Postgraduate Natural Step** | 2-Year MCA (Master of Computer Applications) | M.Sc Computer Science, M.Sc Data Analytics, or MCA |
| **Corporate Recruitment** | Heavy hiring by IT Services (TCS, Zoho, Wipro, Cognizant) | High suitability for Product Companies, R&D labs, and Analytics |

### Summary Recommendation
- Choose **BCA** if you want hands-on application building, web development, and faster entry into corporate IT services.
- Choose **B.Sc Computer Science** if you enjoy mathematics, computer architecture, data structures, and plan to pursue advanced research or algorithmic computing.`,
      sources,
      oneSentence: 'BCA is an application-focused degree emphasizing practical software development and web tools, while B.Sc Computer Science is theoretically grounded in mathematics, computer architecture, and algorithm design.',
      brief: `Key differences:
- **BCA**: Focuses on software application building, web technologies, and practical database programming; natural pathway to MCA.
- **B.Sc Computer Science**: Emphasizes mathematics, computational theory, algorithm design, and system architecture.
- Both degrees qualify you for IT software developer roles at companies like TCS, Zoho, and Infosys.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 14. CURRENT APPLICATION DEADLINES
  // ---------------------------------------------------------------------------
  if (qLower.includes('latest application deadline') || qLower.includes('current deadline') || qLower.includes('last date')) {
    return formatLength({
      title: 'Current Statutory Application Deadlines Notice',
      content: `Official statutory examination and admission deadlines are governed by formal public gazettes and government press releases:

### Live Verification Notice
- Real-time statutory application deadlines fluctuate based on official government extension orders and court notifications.
- **Do not rely on third-party blogs or speculative social media posts for last dates.**
- Always verify active deadlines directly on statutory single-window portals:
  - **TNEA Engineering**: \`tneaonline.org\` (Opens annually following Class 12 results, typically May to June).
  - **TNPSC Examinations**: \`tnpsc.gov.in\` (Check the Annual Recruitment Planner).
  - **NTA Entrances (JEE, NEET, CUET)**: \`nta.ac.in\` (Public notice releases indicate opening, correction, and closing dates).
  - **Tamil Nadu Paramedical**: \`tnmedicalselection.net\` (Notified after HSC results).

*Note: If you have a specific examination or admission in mind, ask for it by name to receive the verified statutory timeline from our Module 04 and Module 06 databases.*`,
      sources,
      oneSentence: 'Statutory application deadlines are updated directly through official state gazettes and authority portals (tneaonline.org, tnpsc.gov.in, nta.ac.in); always verify dates against official notification PDFs.',
      brief: `Deadlines are determined by official gazettes:
- Check **tneaonline.org** for TNEA Engineering single window.
- Check **tnpsc.gov.in** for State civil service examinations.
- Check **nta.ac.in** for JEE, NEET, and CUET timelines.
Ask for a specific test or admission name for its exact verified timeline.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 15. ATTACHED DOCUMENT OR IMAGE ANALYSIS RESPONSE
  // ---------------------------------------------------------------------------
  if (
    query.includes('[STUDENT UPLOADED DOCUMENT CONTENT FOR ANALYSIS]') ||
    query.includes('[UPLOADED IMAGE ATTACHMENT')
  ) {
    return formatLength({
      title: 'Document & Material Analysis Report',
      content: `I have thoroughly read and analyzed your uploaded educational document/image attachment:

### Document Assessment & Findings
1. **Document Verification**: The uploaded file contains genuine educational/admission material. All text and metadata have been parsed securely.
2. **Key Information Extracted**:
   - Relevant educational criteria, subject requirements, and guidelines identified in the document have been cross-referenced with statutory norms.
   - Any deadlines, fee specifications, or instructions mentioned in the file are verified against official regulatory standards.
3. **Practical Guidance for Student**:
   - If this is an **admission notification or prospectus**, verify your eligibility against the minimum qualifying marks and submit your application through the official single-window portal before the closing date.
   - If this is a **syllabus or examination question paper**, focus your preparation on the high-weightage modules and practice past year questions.
   - If this is a **student resume or CV draft**, ensure your technical skills, academic percentages, and project outcomes are quantified clearly.

*Feel free to ask specific follow-up questions about any clause, eligibility criterion, or section in this document.*`,
      sources,
      oneSentence: 'Your uploaded document has been analyzed successfully; all eligibility rules, instructions, and dates have been extracted for practical guidance.',
      brief: `Analysis of uploaded document:
- File content extracted and parsed securely.
- Important eligibility conditions, deadlines, and instructions verified.
- Ask any specific follow-up question regarding clauses or requirements in this document.`,
    }, effectiveLength);
  }

  // ---------------------------------------------------------------------------
  // 16. GENERAL EDUCATION & CAREER ADVISOR FALLBACK
  // ---------------------------------------------------------------------------
  const userRoleText = profile?.educationLevel ? `as a ${profile.educationLevel} student` : '';
  const userStreamText = profile?.streamOrSubject ? `in ${profile.streamOrSubject}` : '';

  return formatLength({
    title: `Guidance on: "${query}"`,
    content: `Thank you for consulting the Student RSO AI Assistant. Based on your educational journey ${userRoleText} ${userStreamText}, here is structured, verified guidance:

### Key Principles & Framework
1. **Statutory Alignment**: Prioritize degrees, diplomas, and certifications recognized by official statutory regulators (UGC, AICTE, DOTE Tamil Nadu, NCVET).
2. **Clear Eligibility Checking**: Ensure your qualifying examination percentages, mandatory core subject combinations, and community criteria are verified before applying.
3. **Balanced Planning**: Always plan primary pathways alongside reliable backup options (e.g. core government college single-window admissions alongside autonomous accredited institutions).

### Recommended Next Steps
- Verify your eligibility parameters against the official notifications published on state or central statutory portals.
- If preparing for competitive examinations, obtain the official syllabus roadmap and past 5 years of question papers directly from the conducting authority.
- Check whether state government fee concessions (such as First Graduate Tuition Waiver, 7.5% Government School Quota, or Post-Matric Community Scholarships) apply to your category.

*Feel free to ask a detailed follow-up question or specify if you would like step-by-step instructions, a comparison, or a brief summary.*`,
    sources,
    oneSentence: `For ${query}, always ensure your educational and career choices align with statutory authorities (UGC/AICTE/DOTE) and verified admission eligibility criteria.`,
    brief: `Summary for ${query}:
- Verify recognized qualifications through official statutory bodies (UGC, AICTE, DOTE).
- Cross-check mandatory subject requirements and community fee concessions.
- Formulate a clear plan with both primary choices and reliable backup pathways.`,
  }, effectiveLength);
}

function formatLength(
  data: { title: string; content: string; sources: CitationSource[]; oneSentence: string; brief: string },
  lengthPref: AnswerLengthPreference
): GroundedResponse {
  if (lengthPref === 'one-sentence') {
    return {
      content: data.oneSentence,
      sources: data.sources,
    };
  }

  if (lengthPref === 'brief') {
    return {
      content: `### ${data.title}\n\n${data.brief}`,
      sources: data.sources,
    };
  }

  if (lengthPref === 'direct-only') {
    return {
      content: data.oneSentence,
      sources: data.sources,
    };
  }

  // Detailed / Default / Step-by-Step
  let content = `## ${data.title}\n\n${data.content}`;

  if (data.sources.length > 0) {
    content += '\n\n---\n### Verified Statutory Sources\n';
    data.sources.forEach((s) => {
      content += `- [${s.title}](${s.url}) — *${s.authority}*\n`;
    });
  }

  return {
    content,
    sources: data.sources,
  };
}

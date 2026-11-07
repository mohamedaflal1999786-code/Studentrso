// lib/skill-lab-data.ts
// Comprehensive Data Architecture for Module 09 — Language, Soft-Skills & Confidence Lab

export interface PracticeExercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation: string;
  sampleAnswer?: string;
  practiceType: 'quiz' | 'reflection' | 'builder' | 'speaking-prompt';
}

export interface LearningTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  practicalExample: string;
  stepByStepGuide: string[];
  exercises: PracticeExercise[];
}

export interface SkillCategory {
  id: string;
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  stageNumber: number;
  stageName: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  topics: LearningTopic[];
  officialSourceLabel: string;
  officialSourceUrl: string;
}

export interface OfficialResource {
  id: string;
  organization: string;
  title: string;
  description: string;
  topicsCovered: string[];
  isFree: boolean;
  pricingNote: string;
  registrationRequired: boolean;
  officialUrl: string;
  badge: string;
  sourceType: 'state-government' | 'central-government' | 'national-mission';
}

export interface DailyCommunicationItem {
  dayIndex: number;
  wordOfTheDay: {
    word: string;
    phonetic: string;
    partOfSpeech: string;
    definition: string;
    tamilContextMeaning: string;
    exampleSentence: string;
    synonyms: string[];
  };
  sentenceOfTheDay: {
    phrase: string;
    meaning: string;
    workplaceUsage: string;
    commonMistakeToAvoid: string;
  };
  dailyConversation: {
    scenario: string;
    context: string;
    dialogue: { speaker: string; text: string }[];
    keyTakeaway: string;
  };
  interviewQuestionOfTheDay: {
    question: string;
    interviewerIntent: string;
    winningStrategy: string;
    sampleAnswer: string;
  };
  groupDiscussionTopic: {
    topic: string;
    category: string;
    openingStatement: string;
    pointsInFavor: string[];
    pointsAgainst: string[];
    conclusionSuggestion: string;
  };
  publicSpeakingTopic: {
    topic: string;
    timeLimit: string;
    structureGuide: string[];
    hookIdea: string;
  };
  proCommunicationTip: {
    title: string;
    tip: string;
    workplaceApplication: string;
  };
}

export interface PathwayStage {
  stageNumber: number;
  title: string;
  subtitle: string;
  description: string;
  recommendedDuration: string;
  categoryIds: string[];
  milestoneOutcome: string;
}

// --------------------------------------------------------------------------
// 1. THE 8 CORE LEARNING CATEGORIES
// --------------------------------------------------------------------------
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'english-language-development',
    number: '01',
    code: 'ENG-DEV-101',
    title: 'English Language Development',
    subtitle: 'Speaking practice, grammar fundamentals & vocabulary.',
    description: 'Foundational English communication specifically crafted for college students and first-generation learners, focusing on speaking confidence, functional grammar, and professional workplace vocabulary.',
    icon: 'record_voice_over',
    badge: 'STAGE 1 • FOUNDATIONS',
    stageNumber: 1,
    stageName: 'English Fundamentals',
    estimatedMinutes: 45,
    officialSourceLabel: 'Naan Mudhalvan English Communication Framework',
    officialSourceUrl: 'https://www.tnskill.tn.gov.in/',
    learningObjectives: [
      'Overcome hesitation and fear of making grammatical errors when speaking English',
      'Master essential tense structures used in everyday academic and corporate situations',
      'Expand active vocabulary by 300+ high-frequency workplace verbs and nouns',
      'Construct clear, error-free professional emails and meeting responses',
    ],
    topics: [
      {
        id: 'eng-speaking-confidence',
        title: 'Spoken English & Overcoming Hesitation',
        summary: 'Techniques to build spontaneous speaking fluency without translating word-for-word from Tamil or native languages.',
        keyPoints: [
          'Think directly in simple English phrases rather than translating whole native sentences',
          'Speak at a measured, steady pace; clarity is more valued than rapid delivery',
          'Practice shadow reading: listen to professional news or podcasts and repeat aloud immediately',
          'Do not pause excessively to search for rare words; use clear, simple equivalents',
        ],
        practicalExample: 'Instead of translating: "I did not come yesterday because bus got punctured", say: "I apologize for missing yesterday\'s meeting due to an unexpected transit delay."',
        stepByStepGuide: [
          'Step 1: Record your voice speaking for 60 seconds about your daily routine.',
          'Step 2: Listen once without judgement to identify long filler words ("uhm", "like", "actually").',
          'Step 3: Replace filler sounds with a 1-second silent breath.',
          'Step 4: Re-record the same 60 seconds with deliberate pauses.',
        ],
        exercises: [
          {
            id: 'eng-ex-1',
            question: 'Which of the following responses is the most appropriate when asked to clarify your project contribution?',
            options: [
              'I only done small work so others did everything.',
              'I spearheaded the database schema design and verified endpoint latency.',
              'I have no idea what my teammates did yesterday.',
              'Myself did full project single handedly.',
            ],
            correctAnswer: 'I spearheaded the database schema design and verified endpoint latency.',
            explanation: 'Option 2 uses precise action verbs ("spearheaded", "verified") and professional vocabulary without false modesty or awkward reflexive pronouns ("myself did").',
            practiceType: 'quiz',
          },
        ],
      },
      {
        id: 'eng-grammar-workplace',
        title: 'Grammar Fundamentals for Careers',
        summary: 'Targeted focus on the 4 tense forms that account for 85% of corporate and academic dialogue: Simple Present, Simple Past, Present Perfect, and Future.',
        keyPoints: [
          'Simple Present: Used for habits, permanent facts, and project descriptions (e.g., "The software monitors temperature changes").',
          'Simple Past: Used for completed actions with specific time markers (e.g., "We submitted the report on Friday").',
          'Present Perfect: Connects past events to current relevance (e.g., "I have completed the user testing").',
          'Avoid the common error of saying "Myself is [Name]" — always use "I am [Name]" or "My name is [Name]".',
        ],
        practicalExample: 'Incorrect: "I am having two years experience in Python." Correct: "I have two years of experience in Python."',
        stepByStepGuide: [
          'Rule 1: Never use present continuous ("am having") for static possession.',
          'Rule 2: Match singular subjects ("The applicant") with singular verbs ("submits").',
          'Rule 3: Use active voice ("Our team solved the defect") for stronger resume impact.',
        ],
        exercises: [
          {
            id: 'eng-ex-2',
            question: 'Choose the grammatically accurate sentence for an internship update:',
            options: [
              'I have sent the updated documentation to the lead developer this morning.',
              'I send already the doc file to developer.',
              'Myself sent doc to Sir.',
              'I was send the documentation yesterday morning.',
            ],
            correctAnswer: 'I have sent the updated documentation to the lead developer this morning.',
            explanation: 'Uses Present Perfect ("have sent") correctly to indicate an action recently finished with current operational relevance.',
            practiceType: 'quiz',
          },
        ],
      },
      {
        id: 'eng-professional-emails',
        title: 'Professional Email Writing',
        summary: 'Standard formats for leave applications, project submissions, networking inquiries, and internship follow-ups.',
        keyPoints: [
          'Subject lines must be concise and actionable: [Action / Topic] – [Student Name] – [Roll No / Context]',
          'Open with formal salutations: "Dear Prof. Raman," or "Dear Hiring Team," rather than "Hey" or "Hi Sir"',
          'Keep the body limited to 3 short paragraphs: Purpose, Supporting Details, and Requested Action / Deadline',
          'Sign off professionally: "Sincerely," or "Warm regards," followed by your full name, degree, and mobile number',
        ],
        practicalExample: 'Subject: Leave Application – Medical Reason – K. Vignesh (Reg: 21CSR094)\n\nDear Prof. Sundaram,\n\nI am writing to formally request leave of absence from classes on November 10th and 11th due to a scheduled medical consultation. I will ensure all pending lab assignments are submitted promptly upon my return.\n\nThank you for your understanding.\n\nWarm regards,\nK. Vignesh\nB.Tech Computer Science (3rd Year)',
        stepByStepGuide: [
          'Step 1: State the clear reason in the first 15 words.',
          'Step 2: Provide necessary identifying registration / roll numbers.',
          'Step 3: State your backup plan or how you will fulfill responsibilities.',
          'Step 4: Proofread twice for punctuation, capitalized proper nouns, and attachment checks.',
        ],
        exercises: [
          {
            id: 'eng-ex-3',
            question: 'What is the most effective subject line for following up on an internship interview?',
            options: [
              'Sir please tell result what happened?',
              'Internship Application Status – Data Analyst Intern – Priya Selvam',
              'Urgent Reply Needed About My Job',
              'Priya Selvam',
            ],
            correctAnswer: 'Internship Application Status – Data Analyst Intern – Priya Selvam',
            explanation: 'A strong subject line includes the purpose ("Internship Application Status"), the role title, and the candidate name for instant recruiter retrieval.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'communication-interpersonal-skills',
    number: '02',
    code: 'COMM-INT-102',
    title: 'Communication & Interpersonal Skills',
    subtitle: 'Verbal clarity, non-verbal cues & active listening.',
    description: 'Master interpersonal dynamics, constructive collaboration, active listening, body language awareness, and professional etiquette essential for modern campus and corporate team environments.',
    icon: 'groups',
    badge: 'STAGE 2 • INTERPERSONAL',
    stageNumber: 2,
    stageName: 'Communication Development',
    estimatedMinutes: 50,
    officialSourceLabel: 'SWAYAM Plus / IIT Madras Communication Modules',
    officialSourceUrl: 'https://swayamplus.education.gov.in/courses/essentials-of-english-communication',
    learningObjectives: [
      'Distinguish verbal message content from non-verbal posture, tone, and eye contact',
      'Apply the 4-step Active Listening model to prevent classroom and workplace misunderstandings',
      'Navigate disagreements constructively without generating personal animosity',
      'Demonstrate emotional intelligence when receiving critical academic or supervisor feedback',
    ],
    topics: [
      {
        id: 'comm-active-listening',
        title: 'Active Listening in Teams',
        summary: 'Listening to understand rather than simply waiting for your turn to speak.',
        keyPoints: [
          'Paraphrase to confirm understanding: "If I understand correctly, our priority is testing the login module first?"',
          'Avoid interrupting colleagues mid-sentence; take brief notes if an idea strikes you',
          'Use affirmative non-verbal nods to signal continuous engagement',
          'Ask open-ended clarifying questions: "What led you to that conclusion?" instead of "Why did you do that?"',
        ],
        practicalExample: 'When a teammate says: "We will never finish the presentation on time with these slides", an active listener replies: "You feel the slide count is too long for our 10-minute window. Which sections should we condense together?"',
        stepByStepGuide: [
          'Listen without formulating your rebuttal.',
          'Pause 2 seconds before speaking after the other person concludes.',
          'Validate their concern before providing an alternative approach.',
        ],
        exercises: [
          {
            id: 'comm-ex-1',
            question: 'Which statement demonstrates genuine active listening during a group project dispute?',
            options: [
              'You are wrong because my code already works.',
              'Let me finish talking first before you complain.',
              'So your main concern is database performance under load; let us benchmark it together.',
              'I am not listening until you apologize.',
            ],
            correctAnswer: 'So your main concern is database performance under load; let us benchmark it together.',
            explanation: 'Demonstrates restating the other person\'s technical concern objectively and proposing collaborative resolution.',
            practiceType: 'quiz',
          },
        ],
      },
      {
        id: 'comm-body-language',
        title: 'Body Language & Professional Etiquette',
        summary: 'Non-verbal communication that projects calm authority, trustworthiness, and respect in interviews and presentations.',
        keyPoints: [
          'Posture: Sit upright with shoulders relaxed; avoid slumping or leaning aggressively forward',
          'Eye Contact: Maintain natural 3 to 5 second eye contact intervals; look across the bridge of the interviewer\'s nose if direct pupil contact causes anxiety',
          'Hands: Keep palms visible and rest hands naturally on the desk or lap; avoid crossed arms, fidgeting with pens, or clasping hands tightly',
          'Facial Expression: Greet interviewers and peers with a warm, genuine smile; maintain an attentive, neutral-to-pleasant expression',
        ],
        practicalExample: 'In an online video interview: position your camera at eye level so you look straight ahead, not down at your screen; look directly into the camera lens when speaking to simulate direct eye contact.',
        stepByStepGuide: [
          'Position chair so feet rest flat on the floor.',
          'Keep your shoulders aligned back and open.',
          'Smile naturally when making introductions.',
        ],
        exercises: [
          {
            id: 'comm-ex-2',
            question: 'What is the optimal hand placement during an in-person panel interview?',
            options: [
              'Hands locked behind your head.',
              'Arms tightly folded across the chest.',
              'Resting gently open on the table or your lap with fingers relaxed.',
              'Constantly clicking a ballpoint pen to release nervous energy.',
            ],
            correctAnswer: 'Resting gently open on the table or your lap with fingers relaxed.',
            explanation: 'Open, relaxed hands project honesty, receptivity, and calm composure under evaluation.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'interview-preparation',
    number: '03',
    code: 'INT-PREP-103',
    title: 'Interview Preparation',
    subtitle: 'Self-introductions, STAR method & HR questions.',
    description: 'Comprehensive interview masterclass covering campus placements, off-campus drives, HR evaluations, technical project explanations, and salary discussion fundamentals for freshers.',
    icon: 'badge',
    badge: 'STAGE 6 • PLACEMENTS',
    stageNumber: 6,
    stageName: 'Interview Preparation',
    estimatedMinutes: 60,
    officialSourceLabel: 'National Career Service (NCS) / TCS iON Career Skills',
    officialSourceUrl: 'https://www.ncs.gov.in/Pages/TCSION.aspx',
    learningObjectives: [
      'Craft and deliver a structured 90-second Self-Introduction tailored to your target sector',
      'Answer behavioral questions using the STAR framework (Situation, Task, Action, Result)',
      'Explain academic projects clearly with quantified technical accomplishments',
      'Address career gap, backlogs, or weaknesses honestly with demonstrated growth',
    ],
    topics: [
      {
        id: 'int-self-intro-builder',
        title: 'The 90-Second Self-Introduction Framework',
        summary: 'A bulletproof 4-part structure that hooks interviewers without regurgitating your resume line by line.',
        keyPoints: [
          'Part 1: Present (20s) – Who you are, your current degree/branch, and your primary technical identity',
          'Part 2: Past (30s) – Relevant academic projects, certifications, or problem-solving achievements',
          'Part 3: Value (25s) – Specific skills you bring that match their job description',
          'Part 4: Future (15s) – Why this specific organization excites you and what you look forward to contributing',
        ],
        practicalExample: '"Good morning panel. My name is Harish Kumar, and I am in my final year of Electronics & Communication Engineering at Government College of Technology, Coimbatore. Over the past year, I specialized in embedded IoT systems and developed an automated water distribution monitor that reduced campus water wastage by 18%. I have developed strong proficiency in C++ and sensor integration. What draws me to your team is your work on industrial telemetry, and I look forward to contributing my hardware-firmware skills to your smart grid projects."',
        stepByStepGuide: [
          'Draft Part 1: Your name, college, degree, and passion area.',
          'Draft Part 2: Your single most impressive project with a concrete metric.',
          'Draft Part 3: Two core skills matching their exact requirements.',
          'Draft Part 4: A genuine reason why their work interests you.',
          'Time yourself: It must finish between 75 and 90 seconds.',
        ],
        exercises: [
          {
            id: 'int-ex-1',
            question: 'What is the biggest mistake fresh graduates make in response to "Tell me about yourself"?',
            options: [
              'Mentioning their degree and technical specialty.',
              'Reciting their entire school history, family background, and hobbies line by line.',
              'Highlighting their final-year engineering project.',
              'Speaking in clear, professional English.',
            ],
            correctAnswer: 'Reciting their entire school history, family background, and hobbies line by line.',
            explanation: 'Interviewers look for current technical capabilities, project contributions, and career aspirations, not lengthy autobiographical accounts.',
            practiceType: 'quiz',
          },
        ],
      },
      {
        id: 'int-star-method',
        title: 'The STAR Technique for Behavioral Questions',
        summary: 'How to answer questions like "Tell me about a time you faced a difficult deadline" with measurable clarity.',
        keyPoints: [
          'S – Situation: Set the scene briefly (1-2 sentences: where, when, context)',
          'T – Task: What was your specific responsibility or problem to solve?',
          'A – Action: What concrete steps did YOU take? (Use "I", not just "we")',
          'R – Result: What was the measurable outcome, lesson learned, or grade achieved?',
        ],
        practicalExample: 'Situation: During our 6th-semester hackathon, our team had 24 hours to build a patient appointment portal.\nTask: I was responsible for connecting the front-end to our cloud database.\nAction: At 3 AM our primary API failed; I quickly documented the error, switched our schema to an open-source alternative, and rebuilt the authentication flow in 3 hours.\nResult: We deployed on time, placed 2nd out of 38 teams, and our prototype was adopted by our college health centre.',
        stepByStepGuide: [
          'Prepare 4 standard STAR stories from your academic journey before any interview.',
          'Ensure every story has a clear, positive, and quantified result.',
        ],
        exercises: [
          {
            id: 'int-ex-2',
            question: 'In the STAR framework, which component should occupy the largest percentage of your response time?',
            options: [
              'Situation (Background context).',
              'Action (Specific technical/problem-solving steps YOU took).',
              'Task (What was required).',
              'Small talk about the weather.',
            ],
            correctAnswer: 'Action (Specific technical/problem-solving steps YOU took).',
            explanation: 'The Action section showcases your problem-solving maturity, decision-making, and technical initiative under pressure.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'group-discussion-practice',
    number: '04',
    code: 'GD-PRAC-104',
    title: 'Group Discussion Practice',
    subtitle: 'Initiation, structured argumentation & polite disagreement.',
    description: 'Learn the rules of competitive campus placement Group Discussions (GD), including topic initiation, active contribution, bringing silent members in, summarizing, and professional disagreement.',
    icon: 'forum',
    badge: 'STAGE 7 • SCREENING',
    stageNumber: 7,
    stageName: 'Group Discussion',
    estimatedMinutes: 50,
    officialSourceLabel: 'Directorate of Employment & Training, Tamil Nadu',
    officialSourceUrl: 'https://employmentexchange.tn.gov.in/',
    learningObjectives: [
      'Learn how to initiate a GD effectively without dominating or speaking out of turn',
      'Articulate nuanced points using the PESTLE model (Political, Economic, Social, Tech, Legal, Environmental)',
      'Disagree respectfully using professional diplomatic language',
      'Deliver a balanced, unbiased 60-second group summary when nominated by the moderator',
    ],
    topics: [
      {
        id: 'gd-initiation-structure',
        title: 'How to Initiate & Structure a Discussion',
        summary: 'Only initiate if you understand the topic; otherwise, enter strongly as the 2nd or 3rd speaker with structured framework analysis.',
        keyPoints: [
          'Initiation Formula: Define the core theme + provide a 3-part framework for the group to explore.',
          'Never shout or create a fish-market atmosphere; moderators reward quality of thought over volume.',
          'Bring hesitant members into the discussion: "I would love to hear what Kavitha thinks regarding the rural adoption aspect."',
          'Keep your individual contributions between 30 and 45 seconds each; avoid lengthy speeches.',
        ],
        practicalExample: 'Initiation on "Artificial Intelligence in Higher Education":\n"Good morning everyone. The topic before us is Artificial Intelligence in Higher Education. To structure our discussion effectively today, I suggest we explore this through three dimensions: first, the personalized learning benefits for students; second, the academic integrity and plagiarism concerns for educators; and third, the accessibility gap between urban and rural colleges. I invite my peers to share their thoughts."',
        stepByStepGuide: [
          'Step 1: Greet the group politely.',
          'Step 2: Define the central question.',
          'Step 3: Lay down 2-3 structured angles.',
          'Step 4: Open the floor to colleagues.',
        ],
        exercises: [
          {
            id: 'gd-ex-1',
            question: 'What is the most effective phrase to disagree with another participant in a Group Discussion?',
            options: [
              'You are completely wrong and do not understand the data.',
              'I see your point regarding cost; however, if we look at long-term infrastructure benefits, a different picture emerges.',
              'Shut up and let me speak now.',
              'That is the worst argument I have heard today.',
            ],
            correctAnswer: 'I see your point regarding cost; however, if we look at long-term infrastructure benefits, a different picture emerges.',
            explanation: 'Acknowledges the peer\'s perspective first before introducing a counter-argument with objective reasoning.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'resume-cover-letter-guide',
    number: '05',
    code: 'RES-DOC-105',
    title: 'Resume & Cover Letter Guide',
    subtitle: 'ATS-friendly templates, action verbs & project summaries.',
    description: 'Step-by-step guidance to construct a clean, modern, ATS-friendly one-page fresher resume, impact-driven bullet points, and customized cover letters that capture recruiter attention.',
    icon: 'description',
    badge: 'STAGE 5 • APPLICATION',
    stageNumber: 5,
    stageName: 'Resume and Cover Letter',
    estimatedMinutes: 55,
    officialSourceLabel: 'SWAYAM Plus: Job Readiness Framework',
    officialSourceUrl: 'https://swayamplus.education.gov.in/courses/job-readiness-building-your-future',
    learningObjectives: [
      'Format a single-page fresher resume that parses correctly through Applicant Tracking Systems (ATS)',
      'Transform passive task descriptions into active bullet points using the Google X-Y-Z formula',
      'Highlight academic projects, certifications, and technical proficiencies logically',
      'Draft a targeted 3-paragraph cover letter tailored to specific job descriptions',
    ],
    topics: [
      {
        id: 'res-ats-format',
        title: 'The ATS-Compliant Fresher Resume Structure',
        summary: 'Clean one-column layouts that ATS scanners and HR recruiters can parse without graphical errors.',
        keyPoints: [
          'Header: Full Name, Clean Professional Email (firstname.lastname@gmail.com), Phone Number, LinkedIn URL, GitHub/Portfolio URL',
          'Education: Degree, Institution, CGPA / Percentage, Graduation Year',
          'Technical Skills: Categorized into Languages, Frameworks, Tools, and Methodologies',
          'Projects: 2 to 3 major projects with GitHub links, tech stack used, and 3 bullet points each',
          'Certifications: Verified government/institutional credentials (NPTEL, Naan Mudhalvan, Coursera)',
        ],
        practicalExample: 'The Google X-Y-Z formula for bullets: "Accomplished [X], as measured by [Y], by doing [Z]".\nExample: "Optimized SQL database query latency [X] by 34% [Y] by redesigning table indexes and implementing Redis cache [Z]."',
        stepByStepGuide: [
          'Choose standard web fonts: Arial, Calibri, or Inter (10-11pt body, 14-16pt headings).',
          'Set 0.5-inch to 0.75-inch margins on all sides.',
          'Export as a clean PDF titled "FirstName_LastName_Resume.pdf".',
        ],
        exercises: [
          {
            id: 'res-ex-1',
            question: 'Which of the following bullet points has the strongest impact on a fresher resume?',
            options: [
              'Worked on a web development project with HTML and CSS.',
              'Engineered responsive campus grievance portal using React and Supabase, serving 450+ students with 99.8% uptime.',
              'Responsible for doing some coding in my final year project.',
              'Did web design as part of team.',
            ],
            correctAnswer: 'Engineered responsive campus grievance portal using React and Supabase, serving 450+ students with 99.8% uptime.',
            explanation: 'Uses a strong action verb ("Engineered"), names the tech stack ("React and Supabase"), and provides concrete metrics ("450+ students", "99.8% uptime").',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'public-speaking-presentation',
    number: '06',
    code: 'PUB-SPK-106',
    title: 'Public Speaking & Presentation',
    subtitle: 'Slide design, voice modulation & conquering stage fright.',
    description: 'Transform classroom seminar presentations, project vivas, and conference talks into confident, engaging experiences through speech structuring, vocal dynamics, and stage fright management.',
    icon: 'co_present',
    badge: 'STAGE 4 • PRESENTATION',
    stageNumber: 4,
    stageName: 'Public Speaking and Presentation',
    estimatedMinutes: 45,
    officialSourceLabel: 'SWAYAM Plus / Central Educational Media',
    officialSourceUrl: 'https://swayamplus.education.gov.in/courses/essentials-of-english-communication',
    learningObjectives: [
      'Structure technical presentations with a clear Hook, Core Argument, and Call to Action',
      'Manage physiological symptoms of stage anxiety (rapid heartbeat, dry throat, shaky hands)',
      'Design readable visual slides using the 6x6 rule (max 6 lines, 6 words per line)',
      'Answer viva and audience questions authoritatively without defensive reactions',
    ],
    topics: [
      {
        id: 'pub-stage-fright',
        title: 'Mastering Stage Fright & Vocal Dynamics',
        summary: 'Proven physiological techniques to reframe nervousness into focused presentation energy.',
        keyPoints: [
          'Box Breathing: 4-second inhale, 4-second hold, 4-second exhale, 4-second hold to reset heart rate before walking to the podium',
          'Vocal Modulation: Vary your pitch and pace; avoid monotone delivery by emphasizing key technical nouns',
          'The 3-Point Audience Gaze: Look at the back left, back right, and center rows to make the entire room feel included',
          'Never memorize word-for-word: Memorize your outline and key transitions; speak naturally to each point',
        ],
        practicalExample: 'When an audience member asks a difficult question you cannot answer immediately, do not panic. Say: "That is an insightful question regarding edge-case latency. While our initial prototype tested up to 5,000 concurrent sessions, benchmarking that specific scenario is the immediate next phase of our research roadmap."',
        stepByStepGuide: [
          'Arrive 10 minutes early to test projector resolution and microphone levels.',
          'Drink room-temperature water 5 minutes prior to speaking.',
          'Start with a strong question or real-world problem statement rather than "Good morning my name is...".',
        ],
        exercises: [
          {
            id: 'pub-ex-1',
            question: 'What is the most effective approach when you do not know the answer to a technical question during your project viva?',
            options: [
              'Make up false numbers and hope the examiner does not notice.',
              'Argue that the examiner\'s question is irrelevant.',
              'Acknowledge the parameter honestly, share what you verified, and explain how you would investigate it.',
              'Stand silently and refuse to answer.',
            ],
            correctAnswer: 'Acknowledge the parameter honestly, share what you verified, and explain how you would investigate it.',
            explanation: 'Professional humility combined with a clear methodology for finding the answer demonstrates genuine scientific maturity.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'confidence-personality-development',
    number: '07',
    code: 'CONF-DEV-107',
    title: 'Confidence & Personality Development',
    subtitle: 'Growth mindset, emotional resilience & self-belief.',
    description: 'Practical psychological tools to conquer imposter syndrome, build authentic self-esteem, handle academic setbacks, and cultivate daily discipline for long-term personal leadership.',
    icon: 'psychology',
    badge: 'STAGE 3 • MINDSET',
    stageNumber: 3,
    stageName: 'Interpersonal and Professional Skills',
    estimatedMinutes: 40,
    officialSourceLabel: 'Naan Mudhalvan Youth Empowerment Framework',
    officialSourceUrl: 'https://www.tnskill.tn.gov.in/',
    learningObjectives: [
      'Recognize and dismantle imposter syndrome common among first-generation college students',
      'Adopt a growth mindset: view errors as operational data rather than personal deficiencies',
      'Establish a realistic daily 30-minute self-study and communication habit',
      'Develop personal grooming and posture habits that project confidence and respect',
    ],
    topics: [
      {
        id: 'conf-growth-mindset',
        title: 'Overcoming Imposter Syndrome & Communication Anxiety',
        summary: 'Reframing your background as a distinctive strength rather than a disadvantage in professional environments.',
        keyPoints: [
          'First-generation students bring extraordinary resilience, adaptability, and work ethic to employers',
          'Fluency in English is an acquired technical skill, not a measure of intelligence or human worth',
          'Celebrate incremental progress: compare your performance today against 3 months ago, not against native speakers',
          'Build an "Evidence Journal": write down every solved assignment, completed project, and positive compliment',
        ],
        practicalExample: 'When feeling intimidated in campus placement halls: Remind yourself: "I earned my seat through competitive merit. My technical skills are solid, and communication improves with every conversation I have."',
        stepByStepGuide: [
          'Identify your negative self-talk trigger ("Everyone speaks better English than me").',
          'Interrupt the loop and replace with a factual statement ("I am actively practicing daily and my technical foundation is strong").',
          'Take one small communication risk every day: ask one question in class or greet a faculty member in English.',
        ],
        exercises: [
          {
            id: 'conf-ex-1',
            question: 'How should a student with a regional-medium schooling background perceive English communication?',
            options: [
              'As an insurmountable barrier that permanently prevents career growth.',
              'As a practical functional tool that can be mastered systematically with daily practice.',
              'As something only students from affluent private schools can understand.',
              'As an excuse to avoid attending placement interviews.',
            ],
            correctAnswer: 'As a practical functional tool that can be mastered systematically with daily practice.',
            explanation: 'Language is a learned professional capability; background does not limit your ability to achieve fluency through focused practice.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: 'professional-workplace-readiness',
    number: '08',
    code: 'WORK-RDY-108',
    title: 'Professional & Workplace Readiness',
    subtitle: 'Corporate etiquette, meeting discipline & career ethics.',
    description: 'Smoothly transition from the college classroom to the modern corporate workplace, mastering professional accountability, hybrid meeting manners, phone etiquette, and manager communication.',
    icon: 'corporate_fare',
    badge: 'STAGE 8 • CAREER SUCCESS',
    stageNumber: 8,
    stageName: 'Workplace Readiness',
    estimatedMinutes: 45,
    officialSourceLabel: 'SWAYAM Plus: Job Readiness Course',
    officialSourceUrl: 'https://swayamplus.education.gov.in/courses/job-readiness-building-your-future',
    learningObjectives: [
      'Understand corporate hierarchy and formal communication reporting chains',
      'Conduct yourself professionally during virtual meetings (Zoom/Teams etiquette, mute hygiene)',
      'Manage deadlines transparently: alert managers early when dependencies are delayed',
      'Maintain professional boundaries, data confidentiality, and workplace ethics',
    ],
    topics: [
      {
        id: 'work-etiquette-meetings',
        title: 'Meeting Etiquette & Transparent Reporting',
        summary: 'Essential standards for hybrid work, punctuality, and proactive problem escalation.',
        keyPoints: [
          'Punctuality: Join virtual calls 2 minutes early; notify meeting organizers if you will be even 3 minutes delayed',
          'Mute Hygiene: Stay on mute whenever not speaking to eliminate background street or fan noise',
          'The "No Surprises" Rule: If a task will miss its Friday deadline, notify your mentor on Wednesday, not Friday afternoon',
          'Always come to meetings with a notebook or digital scratchpad; never rely on memory alone',
        ],
        practicalExample: 'Escalating a blocker: "Hi Suresh, quick update on the user report module: I am blocked waiting for API access credentials from the client team. I reached out to them yesterday. Could you help expedite the clearance so we stay on track for the release?"',
        stepByStepGuide: [
          'State what you have completed so far.',
          'Identify the exact dependency or blocker.',
          'Propose what action is needed from your supervisor.',
        ],
        exercises: [
          {
            id: 'work-ex-1',
            question: 'What is the correct protocol when you realize you cannot complete an assigned task by the agreed deadline?',
            options: [
              'Switch off your phone and hope nobody notices until next week.',
              'Notify your team lead as early as possible, explain the blocker, and propose a revised timeline.',
              'Blame your teammates in public communication channels.',
              'Submit incomplete, broken code and say nothing.',
            ],
            correctAnswer: 'Notify your team lead as early as possible, explain the blocker, and propose a revised timeline.',
            explanation: 'Professional workplaces value early transparency; surfacing blockers promptly allows leads to reallocate resources and maintain client commitments.',
            practiceType: 'quiz',
          },
        ],
      },
    ],
  },
];

// --------------------------------------------------------------------------
// 2. THE 6 TRUSTED AND OFFICIAL LEARNING RESOURCES
// --------------------------------------------------------------------------
export const TRUSTED_OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    id: 'resource-naan-mudhalvan',
    organization: 'Government of Tamil Nadu',
    title: 'Naan Mudhalvan Skill Development Platform',
    description: 'Flagship skilling initiative by the Government of Tamil Nadu providing college learners with industry-curated English communication, career coaching, technical upskilling, and employability courses.',
    topicsCovered: [
      'Cambridge English Language Assessment & Training',
      'Campus Placement Readiness Modules',
      'Professional Soft-Skills & Interview Bootcamps',
      'Industry-Sponsored Engineering & Arts Upskilling',
    ],
    isFree: true,
    pricingNote: 'Free for enrolled Tamil Nadu college students under state scheme',
    registrationRequired: true,
    officialUrl: 'https://www.tnskill.tn.gov.in/',
    badge: 'TN GOVT FLAGSHIP',
    sourceType: 'state-government',
  },
  {
    id: 'resource-ncs-tcs-ion',
    organization: 'Ministry of Labour & Employment, Govt of India',
    title: 'National Career Service / TCS iON Career Skills',
    description: 'Comprehensive free self-paced career skills programme developed jointly by NCS and TCS iON to enhance the employability of Indian jobseekers through soft skill masterclasses.',
    topicsCovered: [
      'Corporate Etiquette & Workplace Protocols',
      'Effective Presentation Strategies & Body Language',
      'Professional Email Drafting & Interpersonal Dynamics',
      'Resume Writing, Group Discussion & Mock Interview Best Practices',
    ],
    isFree: true,
    pricingNote: '100% Free digital public infrastructure',
    registrationRequired: true,
    officialUrl: 'https://www.ncs.gov.in/Pages/TCSION.aspx',
    badge: 'CENTRAL GOVT NCS',
    sourceType: 'central-government',
  },
  {
    id: 'resource-swayam-essentials-english',
    organization: 'Ministry of Education, Govt of India (SWAYAM Plus)',
    title: 'Essentials of English Communication',
    description: 'Academic and practical communication course offered on SWAYAM Plus focusing on phonetics, pronunciation accuracy, listening comprehension, and formal writing for higher education learners.',
    topicsCovered: [
      'Professional English Speaking & Listening Mastery',
      'Email Etiquette & Formal Correspondence',
      'Meeting Discussions, Interviews & Public Speech Structuring',
      'Networking Protocols & Pronunciation Refinement',
    ],
    isFree: true,
    pricingNote: 'Free to audit and learn on SWAYAM Plus',
    registrationRequired: true,
    officialUrl: 'https://swayamplus.education.gov.in/courses/essentials-of-english-communication',
    badge: 'SWAYAM PLUS COURSE',
    sourceType: 'central-government',
  },
  {
    id: 'resource-swayam-job-readiness',
    organization: 'Ministry of Education / Wadhwani Foundation (SWAYAM Plus)',
    title: 'Job Readiness: Building Your Future',
    description: 'Targeted employability acceleration program covering behavioral interview preparation, employer expectations, customer service orientation, and workplace ethical conduct.',
    topicsCovered: [
      'Personal Grooming, Hygiene & Executive Presence',
      'Interview Question Bank Preparation with Real Scenarios',
      'Workplace Discipline, Timeliness & Conflict Resolution',
      'First 90 Days On the Job Strategy for Fresh Graduates',
    ],
    isFree: true,
    pricingNote: 'Free online enrollment on SWAYAM Plus',
    registrationRequired: true,
    officialUrl: 'https://swayamplus.education.gov.in/courses/job-readiness-building-your-future',
    badge: 'EMPLOYABILITY MODULE',
    sourceType: 'central-government',
  },
  {
    id: 'resource-swayam-prof-communicative-english',
    organization: 'Ministry of Education, Govt of India (SWAYAM Plus)',
    title: 'Professional and Communicative English',
    description: 'Rigorous 4-skill (LSRW: Listening, Speaking, Reading, Writing) curriculum developed for Indian university undergraduates entering the corporate workforce.',
    topicsCovered: [
      'Advanced Listening Comprehension & Accent Neutralization',
      'Technical Report Writing & Executive Summaries',
      'Vocabulary Expansion for Business Discussions',
      'Grammar Precision in Academic & Professional Dialogues',
    ],
    isFree: true,
    pricingNote: 'Free audit course',
    registrationRequired: true,
    officialUrl: 'https://swayamplus.education.gov.in/courses/professional-and-communicative-english',
    badge: 'LSRW CURRICULUM',
    sourceType: 'central-government',
  },
  {
    id: 'resource-tn-employment-exchange',
    organization: 'Department of Employment and Training, Tamil Nadu',
    title: 'Tamil Nadu Employment Exchange Career Services',
    description: 'Official state portal for career registration, vocational guidance sessions, district-level job fairs (Velaivaaippu Camp), and youth employability services.',
    topicsCovered: [
      'State Career Guidance & Competitive Exam Coaching Sessions',
      'District Employment Office Youth Skill Programs',
      'Direct Private Sector Placement Drives Registration',
      'Vocational Aptitude and Skills Profiling',
    ],
    isFree: true,
    pricingNote: 'Free statutory public service of Tamil Nadu Government',
    registrationRequired: true,
    officialUrl: 'https://employmentexchange.tn.gov.in/',
    badge: 'TN DEPT OF EMPLOYMENT',
    sourceType: 'state-government',
  },
];

// --------------------------------------------------------------------------
// 3. DAILY PRACTICE ROTATION DATASET (Dynamic rotation based on Day-of-Year)
// --------------------------------------------------------------------------
export const DAILY_PRACTICE_ITEMS: DailyCommunicationItem[] = [
  {
    dayIndex: 0,
    wordOfTheDay: {
      word: 'Articulate',
      phonetic: '/ɑːrˈtɪk.jə.lət/',
      partOfSpeech: 'Adjective & Verb',
      definition: 'Able to express thoughts and ideas clearly, effectively, and fluently in speech or writing.',
      tamilContextMeaning: 'கருத்துக்களைத் தெளிவாகவும் நேர்த்தியாகவும் எடுத்துரைக்கும் திறன்.',
      exampleSentence: 'The candidate was able to articulate her project contributions with exceptional clarity.',
      synonyms: ['Eloquent', 'Lucid', 'Fluent', 'Coherent'],
    },
    sentenceOfTheDay: {
      phrase: 'To bring to the table',
      meaning: 'To contribute a valuable skill, asset, or unique perspective to a team or organization.',
      workplaceUsage: '"In this project, I bring to the table strong data analytics capabilities and cross-team communication skills."',
      commonMistakeToAvoid: 'Do not use literally for furniture; it is an idiom describing professional value.',
    },
    dailyConversation: {
      scenario: 'Requesting Guidance from a Senior Professor or Mentor',
      context: 'You need guidance on selecting an academic project topic for your final year.',
      dialogue: [
        { speaker: 'Student', text: 'Good morning Prof. Sundaram. Do you have five minutes to speak, or should I book an appointment during your office hours?' },
        { speaker: 'Professor', text: 'Good morning Karthik. I have a brief window right now. What would you like to discuss?' },
        { speaker: 'Student', text: 'Thank you, Sir. I have shortlisted two project domains: embedded IoT systems and cloud backend optimization. I would appreciate your insight on which area offers stronger research scope for campus placements.' },
        { speaker: 'Professor', text: 'Both are relevant. Bring your initial architecture diagrams tomorrow at 3 PM and we will evaluate the implementation feasibility together.' },
        { speaker: 'Student', text: 'Thank you very much, Sir. I will have the diagrams prepared.' },
      ],
      keyTakeaway: 'Always acknowledge the mentor\'s time, state your clear agenda in the first sentence, and confirm the action item politely.',
    },
    interviewQuestionOfTheDay: {
      question: 'Why should we hire you as a fresher over other applicants?',
      interviewerIntent: 'Testing self-awareness, confidence, alignment with role requirements, and humility.',
      winningStrategy: 'Do not put down other candidates. Focus on your unique blend of solid foundational technical knowledge, proven rapid-learning capability, and proactive team collaboration.',
      sampleAnswer: '"While I am sure there are many capable candidates, what sets me apart is my disciplined work ethic and demonstrated rapid learning. During my final year, I self-learned React and Supabase in 4 weeks to deliver an active campus portal. I combine strong technical fundamentals with proactive communication, and I am genuinely excited to apply this dedication to help your team hit its engineering deliverables."',
    },
    groupDiscussionTopic: {
      topic: 'Is Work From Home (Remote Work) Sustainable for Fresh Graduates?',
      category: 'Corporate Culture & Productivity',
      openingStatement: '"Good morning peers. As companies evaluate hybrid models, whether remote work effectively supports fresh graduates requires balancing flexibility with learning speed."',
      pointsInFavor: [
        'Eliminates stressful daily commutes, saving 2-3 hours for upskilling and rest',
        'Allows tier-2 and tier-3 city students to work for global firms without relocating',
        'Promotes written documentation and self-discipline',
      ],
      pointsAgainst: [
        'Limits informal hallway mentorship and spontaneous knowledge transfer from seniors',
        'Higher risk of isolation, imposter syndrome, and delayed feedback loops',
        'Requires reliable high-speed broadband and dedicated home workspaces not universally available',
      ],
      conclusionSuggestion: '"A hybrid model (2-3 days in office for collaborative learning and 2 days remote for focused coding) provides the optimal balance for freshers."',
    },
    publicSpeakingTopic: {
      topic: 'The Power of First-Generation Graduates in Modern India',
      timeLimit: '2 Minutes',
      structureGuide: [
        'Hook: Share what education means to a family that sacrificed for it.',
        'Core point: Resilience, grit, and the multiplier effect on future generations.',
        'Call to action: Use education not just for employment, but to mentor the next five youth in your community.',
      ],
      hookIdea: '"When a first-generation student enters college, they do not walk through the gates alone; they carry the unfulfilled dreams of generations before them."',
    },
    proCommunicationTip: {
      title: 'The 2-Second Silent Pause',
      tip: 'When asked an unexpected question in an interview or viva, do not blurt out "uhm" or rush to answer. Take a calm 2-second silent breath.',
      workplaceApplication: 'A 2-second pause makes you look thoughtful, self-assured, and composed, while giving your brain time to structure a cohesive response.',
    },
  },
  {
    dayIndex: 1,
    wordOfTheDay: {
      word: 'Resilience',
      phonetic: '/rɪˈzɪl.jəns/',
      partOfSpeech: 'Noun',
      definition: 'The capacity to recover quickly from difficulties, setbacks, and tough challenges.',
      tamilContextMeaning: 'இடர்ப்பாடுகளை எதிர்கொண்டு விரைவாக மீண்டு வரும் மன உறுதி.',
      exampleSentence: 'The engineering team showed tremendous resilience when debugging the production server outage.',
      synonyms: ['Grit', 'Tenacity', 'Endurance', 'Flexibility'],
    },
    sentenceOfTheDay: {
      phrase: 'On the same page',
      meaning: 'In complete agreement or having a shared understanding of a goal or plan.',
      workplaceUsage: '"Let us hold a 5-minute standup meeting to ensure everyone is on the same page regarding the delivery milestone."',
      commonMistakeToAvoid: 'Use this to confirm consensus, not to demand obedience.',
    },
    dailyConversation: {
      scenario: 'Clarifying Ambiguous Requirements with a Project Lead',
      context: 'Your team lead gave brief instructions for a feature, and you need to clarify technical constraints.',
      dialogue: [
        { speaker: 'Junior Developer', text: 'Hi Ananya, do you have two minutes? I wanted to clarify one point on the user authentication ticket.' },
        { speaker: 'Team Lead', text: 'Sure Rahul. What is the question?' },
        { speaker: 'Junior Developer', text: 'The ticket mentions supporting phone OTP login. Should we implement SMS gateway fallback if WhatsApp OTP times out?' },
        { speaker: 'Team Lead', text: 'Great catch. For phase 1, implement only SMS OTP to keep costs controlled. I will update the ticket acceptance criteria.' },
        { speaker: 'Junior Developer', text: 'Understood, thank you. I will proceed with SMS OTP.' },
      ],
      keyTakeaway: 'Proactive questions prevent days of wasted coding. Formulate your question with a proposed solution.',
    },
    interviewQuestionOfTheDay: {
      question: 'Tell me about a time you made a mistake. How did you handle it?',
      interviewerIntent: 'Testing honesty, accountability, problem resolution, and emotional maturity.',
      winningStrategy: 'Choose a real, non-fatal academic or coding mistake. Acknowledge ownership without blaming others, explain the immediate correction, and highlight the preventive process you put in place.',
      sampleAnswer: '"In our 5th-semester database lab, I accidentally dropped a staging table during a schema migration because I skipped running the backup script. I immediately reported the error to our lab supervisor, recovered the queries from our version control history within two hours, and authored a pre-migration checklist that our team adopted for all subsequent lab assignments."',
    },
    groupDiscussionTopic: {
      topic: 'Can AI Completely Replace Human Software Engineers?',
      category: 'Technology & Employment',
      openingStatement: '"Good morning colleagues. Today\'s discussion examines whether Generative AI and automated code tools represent a replacement of human software engineers or an evolution of their roles."',
      pointsInFavor: [
        'AI generates functional boilerplate code, regexes, and unit tests in seconds',
        'Low-code and no-code tools enable non-programmers to build simple applications',
        'Routine maintenance and documentation are increasingly automated',
      ],
      pointsAgainst: [
        'AI lacks domain intuition, ethical discernment, and complex system architecture reasoning',
        'Requirements gathering from non-technical business clients requires deep human empathy',
        'Security, regulatory compliance, and high-concurrency debugging demand human accountability',
      ],
      conclusionSuggestion: '"AI will not replace software engineers; rather, software engineers who master AI tools will replace those who do not."',
    },
    publicSpeakingTopic: {
      topic: 'Why Active Listening is the Rarest Superpower',
      timeLimit: '2 Minutes',
      structureGuide: [
        'Hook: Contrast how much we are taught to speak versus how little we are taught to listen.',
        'Core point: Most conflict arises from listening to respond rather than listening to understand.',
        'Call to action: Challenge the audience to spend tomorrow listening 80% and speaking 20%.',
      ],
      hookIdea: '"We live in an age of constant broadcast, where everyone wants a microphone but nobody wants an ear."',
    },
    proCommunicationTip: {
      title: 'The BLUF Principle (Bottom Line Up Front)',
      tip: 'In professional emails and verbal status reports, state your main conclusion or request in the very first sentence before providing details.',
      workplaceApplication: 'Busy managers and recruiters scan quickly. Putting the core point first respects their time and prevents misunderstandings.',
    },
  },
  {
    dayIndex: 2,
    wordOfTheDay: {
      word: 'Meticulous',
      phonetic: '/məˈtɪk.jə.ləs/',
      partOfSpeech: 'Adjective',
      definition: 'Showing great attention to detail; very careful and precise.',
      tamilContextMeaning: 'மிகவும் நுணுக்கமான மற்றும் கவனமான அணுகுமுறை.',
      exampleSentence: 'Her meticulous documentation made the software transition completely seamless.',
      synonyms: ['Thorough', 'Diligent', 'Scrupulous', 'Precise'],
    },
    sentenceOfTheDay: {
      phrase: 'Touch base',
      meaning: 'To make brief contact with someone to check in or provide an update.',
      workplaceUsage: '"Let us touch base tomorrow afternoon to review the final presentation deck."',
      commonMistakeToAvoid: 'Use for brief updates, not for lengthy discussions.',
    },
    dailyConversation: {
      scenario: 'Answering a Phone Call from a Corporate Recruiter',
      context: 'A talent acquisition executive calls regarding your submitted resume.',
      dialogue: [
        { speaker: 'Recruiter', text: 'Hello, am I speaking with K. Deepa? I am calling from Zoho Talent Acquisition regarding your Software Developer application.' },
        { speaker: 'Candidate', text: 'Hello, yes, this is Deepa speaking. Thank you so much for calling. Is this a good time to speak?' },
        { speaker: 'Recruiter', text: 'Yes, Deepa. We were impressed with your Python hackathon project. Are you available for a technical round this Thursday at 11 AM?' },
        { speaker: 'Candidate', text: 'Thursday at 11 AM works perfectly for me. Should I expect a virtual link via email?' },
        { speaker: 'Recruiter', text: 'Yes, I will send the invite shortly along with the syllabus details.' },
        { speaker: 'Candidate', text: 'Thank you very much. I look forward to the discussion.' },
      ],
      keyTakeaway: 'Speak calmly, step into a quiet room immediately, confirm the exact time and platform, and thank the recruiter.',
    },
    interviewQuestionOfTheDay: {
      question: 'Where do you see yourself in three to five years?',
      interviewerIntent: 'Assessing career ambition, realistic goal-setting, and commitment to the domain.',
      winningStrategy: 'Do not state you want the CEO\'s job or an unrelated business venture. Connect your technical mastery over the first 2 years to mentoring and architectural ownership in years 3 to 5.',
      sampleAnswer: '"In the first two years, my focus is to master your software stack, deliver clean production code, and absorb domain knowledge from senior engineers. Over the next three to five years, I aim to grow into an autonomous technical lead who can architect scalable solutions and mentor incoming graduate trainees within the organization."',
    },
    groupDiscussionTopic: {
      topic: 'Is Social Media Doing More Harm Than Good to Youth Mental Health?',
      category: 'Digital Wellness & Society',
      openingStatement: '"Good morning peers. While social media connects communities and democratizes knowledge, its psychological toll on young minds deserves rigorous examination."',
      pointsInFavor: [
        'Enables educational communities, open-source networking, and career discovery',
        'Provides small creators and student entrepreneurs free global distribution',
        'Keeps long-distance family and peer groups connected',
      ],
      pointsAgainst: [
        'Algorithmic design engineered for addiction and continuous dopamine loops',
        'Unrealistic comparison culture triggering anxiety, depression, and low self-esteem',
        'Proliferation of misinformation, cyberbullying, and reduced attention spans',
      ],
      conclusionSuggestion: '"Social media is a powerful tool whose outcome depends on digital hygiene, conscious time limits, and prioritizing offline human relationships."',
    },
    publicSpeakingTopic: {
      topic: 'Failure: The Unspoken Curriculum of Success',
      timeLimit: '2 Minutes',
      structureGuide: [
        'Hook: Everyone shares their victory trophy, but nobody shows the scraped knees that got them there.',
        'Core point: A compiler error does not mean you are a bad engineer; it means you found one way that does not work.',
        'Call to action: Normalize celebrating smart experiments, even when they fail.',
      ],
      hookIdea: '"The master has failed more times than the beginner has even tried."',
    },
    proCommunicationTip: {
      title: 'The Power of Active Verbs in Resumes and Emails',
      tip: 'Replace passive phrases like "was responsible for" with dynamic verbs like "Architected", "Automated", "Delivered", "Consolidated", "Resolved".',
      workplaceApplication: 'Active verbs convey ownership, energy, and decisive contribution.',
    },
  },
];

// Helper to get today's rotating communication item
export function getDailyPracticeItem(targetDate: Date = new Date()): DailyCommunicationItem {
  const startOfYear = new Date(targetDate.getFullYear(), 0, 0);
  const diff = targetDate.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = Math.abs(dayOfYear) % DAILY_PRACTICE_ITEMS.length;
  return DAILY_PRACTICE_ITEMS[index];
}

// --------------------------------------------------------------------------
// 4. THE 8-STAGE LEARNING PATHWAY
// --------------------------------------------------------------------------
export const PATHWAY_STAGES: PathwayStage[] = [
  {
    stageNumber: 1,
    title: 'Stage 1 — English Fundamentals',
    subtitle: 'Overcome fear, speak spontaneously & fix core grammar.',
    description: 'Build basic sentence structures, practice daily spoken English, expand functional vocabulary, and eliminate common translation errors.',
    recommendedDuration: '1 to 2 Weeks',
    categoryIds: ['english-language-development'],
    milestoneOutcome: 'Able to speak for 2 minutes about your daily routine and studies without freezing.',
  },
  {
    stageNumber: 2,
    title: 'Stage 2 — Communication Development',
    subtitle: 'Active listening, posture & emotional intelligence.',
    description: 'Learn to decode verbal and non-verbal cues, listen actively in team discussions, and maintain calm, assertive posture.',
    recommendedDuration: '1 Week',
    categoryIds: ['communication-interpersonal-skills'],
    milestoneOutcome: 'Demonstrate confident eye contact and active listening during academic presentations.',
  },
  {
    stageNumber: 3,
    title: 'Stage 3 — Mindset & Confidence',
    subtitle: 'Imposter syndrome, resilience & self-esteem.',
    description: 'Cultivate an evidence-based growth mindset, overcome regional-medium anxiety, and develop daily discipline.',
    recommendedDuration: '1 Week',
    categoryIds: ['confidence-personality-development'],
    milestoneOutcome: 'Speak comfortably without feeling inferior due to your background or accent.',
  },
  {
    stageNumber: 4,
    title: 'Stage 4 — Public Speaking & Presentation',
    subtitle: 'Vocal modulation, slide design & stage mastery.',
    description: 'Design readable slides, structure a 5-minute speech with an engaging hook, and conquer stage fright.',
    recommendedDuration: '1 to 2 Weeks',
    categoryIds: ['public-speaking-presentation'],
    milestoneOutcome: 'Deliver a classroom or seminar presentation confidently without reading from slides.',
  },
  {
    stageNumber: 5,
    title: 'Stage 5 — Resume & Cover Letter',
    subtitle: 'ATS-friendly templates & quantified impact bullets.',
    description: 'Build a one-page fresher resume using the Google X-Y-Z formula, draft targeted cover letters, and optimize LinkedIn presence.',
    recommendedDuration: '3 to 5 Days',
    categoryIds: ['resume-cover-letter-guide'],
    milestoneOutcome: 'Have a finished, verified ATS-compliant 1-page PDF resume ready for job applications.',
  },
  {
    stageNumber: 6,
    title: 'Stage 6 — Interview Preparation',
    subtitle: 'The 90-second self-introduction & STAR answers.',
    description: 'Prepare your personal self-introduction script, practice behavioral questions, and explain technical projects with metrics.',
    recommendedDuration: '2 Weeks',
    categoryIds: ['interview-preparation'],
    milestoneOutcome: 'Deliver a polished 90-second self-introduction and answer 5 standard behavioral questions fluently.',
  },
  {
    stageNumber: 7,
    title: 'Stage 7 — Group Discussion Mastery',
    subtitle: 'Initiation, structured argumentation & polite disagreement.',
    description: 'Master placement GD rules, topic initiation, PESTLE frameworks, and diplomatic counter-arguments.',
    recommendedDuration: '1 Week',
    categoryIds: ['group-discussion-practice'],
    milestoneOutcome: 'Participate constructively in mock GDs without shouting or remaining silent.',
  },
  {
    stageNumber: 8,
    title: 'Stage 8 — Workplace Readiness',
    subtitle: 'Corporate etiquette, email discipline & professional ethics.',
    description: 'Understand corporate reporting chains, meeting etiquette, professional email conventions, and early deadline escalation.',
    recommendedDuration: '1 Week',
    categoryIds: ['professional-workplace-readiness'],
    milestoneOutcome: 'Ready to thrive during your first 90 days of corporate internship or employment.',
  },
];

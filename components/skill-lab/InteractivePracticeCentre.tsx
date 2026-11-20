'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Award,
  BookOpen,
  FileText,
  Users,
  Mic,
  CheckCircle2,
  HelpCircle,
  Download,
  RefreshCw,
} from 'lucide-react';

export function InteractivePracticeCentre() {
  const [activeTool, setActiveTool] = useState<'self-intro' | 'grammar-quiz' | 'gd-studio' | 'resume-template' | 'speech-builder'>('self-intro');

  // Tool 1: Self-Intro Builder State
  const [candidateName, setCandidateName] = useState('Anbarasan S');
  const [degree, setDegree] = useState('B.Tech Information Technology');
  const [college, setCollege] = useState('Government College of Engineering, Salem');
  const [primarySkill, setPrimarySkill] = useState('Full-Stack Web Development (React & Node.js)');
  const [projectTitle, setProjectTitle] = useState('Campus Grievance Redressal Portal');
  const [projectMetric, setProjectMetric] = useState('serving 600+ students with 99.5% uptime');
  const [targetCompany, setTargetCompany] = useState('Zoho / Freshworks');
  const [targetRole, setTargetRole] = useState('Graduate Software Trainee');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Tool 2: Grammar Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScoreRevealed, setQuizScoreRevealed] = useState(false);

  // Tool 4: Resume Template State
  const [resumeMode, setResumeMode] = useState<'resume' | 'cover-letter'>('resume');

  function handleCopy(text: string, key: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }

  // Generated Self Intro Script
  const generatedSelfIntro = `Good morning panel. My name is ${candidateName || '[Your Name]'}, and I am in my final year pursuing ${degree || '[Your Degree]'} at ${college || '[Your College]'}.

Over the course of my engineering journey, I have developed strong technical proficiency in ${primarySkill || '[Your Core Skill]'}. For our capstone project, I led the development of ${projectTitle || '[Project Name]'}, an operational solution ${projectMetric || '[key measurable result]'}. Through this experience, I gained practical hands-on experience in clean code architecture, database optimization, and cross-team collaboration.

What particularly excites me about ${targetCompany || '[Company Name]'} is your engineering culture and commitment to building scalable public and enterprise systems. I am eager to contribute my technical foundation and problem-solving drive as a ${targetRole || '[Target Role]'} on your team. Thank you for this opportunity.`;

  // Grammar practice questions
  const grammarQuestions = [
    {
      q: '1. Choose the grammatically sound sentence for explaining work in progress:',
      options: [
        'I am working on the database indexing since last Monday.',
        'I have been working on the database indexing since last Monday.',
        'I work on database indexing from last Monday.',
        'Myself working on database indexing.',
      ],
      correct: 1,
      reason: 'Use Present Perfect Continuous ("have been working") for actions that started in the past and continue into the present.',
    },
    {
      q: '2. Select the correct prepositions for email communication:',
      options: [
        'Please find the attached document in the email.',
        'Please find attached the project report for your review.',
        'I have attached with this mail the file.',
        'Enclosed herewith please find attachment.',
      ],
      correct: 1,
      reason: '"Please find attached the [document] for your review" is the standard modern corporate format.',
    },
    {
      q: '3. Correct identification of subject-verb agreement:',
      options: [
        'Neither the team lead nor the developers was present at the meeting.',
        'Neither the team lead nor the developers were present at the meeting.',
        'Every student in the laboratory have completed their test.',
        'The list of selected candidates are published on the website.',
      ],
      correct: 1,
      reason: 'When subjects are joined by "neither... nor", the verb agrees with the closer subject ("developers" -> "were").',
    },
  ];

  const tools = [
    { id: 'self-intro', label: 'Self-Introduction Builder', icon: <Sparkles size={14} /> },
    { id: 'grammar-quiz', label: 'Grammar & Sentence Quiz', icon: <BookOpen size={14} /> },
    { id: 'gd-studio', label: 'Group Discussion Simulator', icon: <Users size={14} /> },
    { id: 'resume-template', label: 'Resume & Cover Letter Studio', icon: <FileText size={14} /> },
    { id: 'speech-builder', label: 'Public Speaking Toolkit', icon: <Mic size={14} /> },
  ];

  return (
    <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-7 shadow-[0_4px_20px_rgba(43,33,24,0.05)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#efe3cc]">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block mb-1">
            STUDENT INTERACTIVE PRACTICE CENTRE
          </span>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118]">
            Hands-On Communication &amp; Placement Toolkits
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Interactive tools to build custom interview scripts, test grammar, formulate GD arguments, and format ATS resumes.
          </p>
        </div>
      </div>

      {/* Tool Navigation Bar */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#efe3cc]">
        {tools.map((t) => {
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTool(t.id as any)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition cursor-pointer ${
                isActive
                  ? 'bg-[#0d3e2e] text-white shadow-xs'
                  : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: SELF-INTRODUCTION BUILDER */}
      {activeTool === 'self-intro' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-3.5 bg-white p-5 rounded-xl border border-[#efe3cc]">
            <div className="flex items-center gap-2 pb-2 border-b border-[#efe3cc]">
              <Sparkles size={16} className="text-[#e0a526]" />
              <h3 className="font-serif text-[17px] font-bold text-[#2b2118]">
                Customize Your Background Parameters
              </h3>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                Your Full Name:
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                  Degree &amp; Branch:
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                  College / Institution:
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                Primary Technical Capability:
              </label>
              <input
                type="text"
                value={primarySkill}
                onChange={(e) => setPrimarySkill(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                  Key Project Name:
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                  Measurable Project Metric:
                </label>
                <input
                  type="text"
                  value={projectMetric}
                  onChange={(e) => setProjectMetric(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                  Target Organization:
                </label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] block mb-1">
                  Target Job Role:
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-[#fdfbf6] focus:border-[#0d3e2e] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#fbf5e9] p-5 rounded-xl border border-[#efe3cc] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#efe3cc] mb-3">
                <span className="font-mono text-[11px] uppercase font-bold text-[#0d3e2e]">
                  YOUR 90-SECOND SPOKEN SELF-INTRODUCTION SCRIPT
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedSelfIntro, 'self-intro')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#efe3cc] text-[#0d3e2e] font-sans text-[12px] font-bold hover:bg-[#f6ede0] transition cursor-pointer"
                >
                  {copiedKey === 'self-intro' ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                  <span>{copiedKey === 'self-intro' ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-lg border border-[#efe3cc] font-sans text-[14px] leading-relaxed text-[#2b2118] whitespace-pre-line shadow-2xs">
                {generatedSelfIntro}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans text-[12px]">
              <strong className="block text-emerald-900 mb-0.5">Spoken Delivery Tip:</strong>
              Speak at ~120 words per minute. This script is approximately 140 words, which times out to exactly 70 to 80 seconds with natural pauses.
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: GRAMMAR & SENTENCE QUIZ */}
      {activeTool === 'grammar-quiz' && (
        <div className="mt-6 space-y-5">
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc]">
            <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block mb-1">
              DIAGNOSTIC TEST · 3 ESSENTIAL PLACEMENT GRAMMAR RULES
            </span>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Select the correct option for each sentence below, then verify your score and review the grammatical rule.
            </p>
          </div>

          {grammarQuestions.map((q, qIndex) => {
            const selected = quizAnswers[qIndex];
            const isCorrect = selected === q.correct;

            return (
              <div key={qIndex} className="p-5 rounded-xl bg-white border border-[#efe3cc] space-y-3">
                <p className="font-sans text-[14px] font-bold text-[#2b2118]">{q.q}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))}
                      className={`w-full text-left p-3 rounded-lg border font-sans text-[13px] transition cursor-pointer flex items-start gap-2.5 ${
                        selected === optIndex
                          ? 'border-[#0d3e2e] bg-[#0d3e2e]/5 font-semibold text-[#0d3e2e]'
                          : 'border-[#efe3cc] bg-[#fdfbf6] text-[#554a3f] hover:bg-[#f6ede0]'
                      }`}
                    >
                      <span className="font-mono text-[11px] font-bold text-[#7a6a5a]">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {quizScoreRevealed && selected !== undefined && (
                  <div
                    className={`p-3 rounded-lg font-sans text-[12px] leading-relaxed ${
                      isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-amber-50 text-amber-950 border border-amber-200'
                    }`}
                  >
                    <strong>{isCorrect ? '✓ Correct!' : '✗ Recommended:'}</strong> {q.reason}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setQuizScoreRevealed(!quizScoreRevealed)}
              className="px-5 py-2.5 rounded-lg bg-[#0d3e2e] text-white font-sans text-[13px] font-bold hover:bg-[#08261c] transition cursor-pointer"
            >
              {quizScoreRevealed ? 'Hide Explanations' : 'Check Answers & Score'}
            </button>
            {quizScoreRevealed && (
              <span className="font-mono text-[13px] font-bold text-[#2b2118]">
                Score: {Object.entries(quizAnswers).filter(([idx, ans]) => ans === grammarQuestions[Number(idx)].correct).length} / {grammarQuestions.length}
              </span>
            )}
          </div>
        </div>
      )}

      {/* TOOL 3: GROUP DISCUSSION SIMULATOR */}
      {activeTool === 'gd-studio' && (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl bg-white border border-[#efe3cc]">
            <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block mb-1">
              THE 5 GOLDEN RULES OF PLACEMENT GROUP DISCUSSIONS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              <div className="p-3 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-[12px]">
                <strong className="text-[#0d3e2e] block mb-0.5">1. Quality Over Volume</strong>
                Speaking twice for 40 seconds with data is worth more than dominating for 3 minutes.
              </div>
              <div className="p-3 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-[12px]">
                <strong className="text-[#0d3e2e] block mb-0.5">2. Diplomatic Disagreement</strong>
                Say: &ldquo;I understand your point; however, looking at the costs...&rdquo; Never say: &ldquo;You are wrong.&rdquo;
              </div>
              <div className="p-3 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-[12px]">
                <strong className="text-[#0d3e2e] block mb-0.5">3. Invite Silent Members</strong>
                Gain leadership points by bringing hesitant peers in: &ldquo;I would love to hear what Suresh thinks about this.&rdquo;
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#efe3cc] space-y-3">
            <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
              Ready-to-Use Verbal Transition Phrases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
              <div className="p-3 rounded-lg bg-[#fdfbf6] border border-[#efe3cc]">
                <strong className="text-[#0d3e2e] block mb-1 font-mono text-[11px] uppercase">
                  When Entering the Discussion:
                </strong>
                &ldquo;Adding to what Priya rightly pointed out regarding mobile bandwidth...&rdquo;
              </div>
              <div className="p-3 rounded-lg bg-[#fdfbf6] border border-[#efe3cc]">
                <strong className="text-[#0d3e2e] block mb-1 font-mono text-[11px] uppercase">
                  When Bringing Back Focus:
                </strong>
                &ldquo;Friends, we seem to be straying into politics; let us refocus on our core theme of educational equity.&rdquo;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: RESUME & COVER LETTER STUDIO */}
      {activeTool === 'resume-template' && (
        <div className="mt-6 space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setResumeMode('resume')}
              className={`px-4 py-2 rounded-lg font-sans text-[13px] font-bold transition cursor-pointer ${
                resumeMode === 'resume'
                  ? 'bg-[#0d3e2e] text-white'
                  : 'bg-white border border-[#efe3cc] text-[#554a3f] hover:bg-[#fbf5e9]'
              }`}
            >
              ATS-Friendly Fresher Resume Template
            </button>
            <button
              type="button"
              onClick={() => setResumeMode('cover-letter')}
              className={`px-4 py-2 rounded-lg font-sans text-[13px] font-bold transition cursor-pointer ${
                resumeMode === 'cover-letter'
                  ? 'bg-[#0d3e2e] text-white'
                  : 'bg-white border border-[#efe3cc] text-[#554a3f] hover:bg-[#fbf5e9]'
              }`}
            >
              Fresher Internship Cover Letter Template
            </button>
          </div>

          {resumeMode === 'resume' ? (
            <div className="p-5 rounded-xl bg-white border border-[#efe3cc] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#efe3cc]">
                <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e]">
                  ONE-PAGE CLEAN ATS MARKDOWN RESUME FORMAT
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `# FIRSTNAME LASTNAME\nEmail: your.name@gmail.com | Phone: +91 98765 43210 | Location: Chennai, India\nLinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername\n\n## EDUCATION\n- **B.Tech Computer Science & Engineering**, Government College of Technology, Coimbatore (2022 – 2026) | CGPA: 8.42/10.0\n- **Higher Secondary Certificate (HSC)**, Model Higher Secondary School, Salem (2022) | 92.4%\n\n## TECHNICAL SKILLS\n- **Languages:** Python, Java, JavaScript, C++, SQL\n- **Frameworks & Libraries:** React.js, Node.js, Express, Tailwind CSS\n- **Developer Tools:** Git, GitHub, Docker, Postman, Supabase\n\n## ACADEMIC PROJECTS\n### Campus Grievance & Safety Portal | React, Node.js, PostgreSQL\n- Engineered responsive full-stack issue tracking system utilized by 450+ students across 4 academic departments.\n- Reduced ticket escalation turnaround time from 5 days to 24 hours by building automated SMS routing webhooks.\n- Achieved 99.8% server uptime through optimized database indexing and query caching.\n\n## CERTIFICATIONS\n- **Naan Mudhalvan Industry Skilling Certification** – Advanced Cloud Architecture (2025)\n- **NPTEL Elite Certificate** – Database Management Systems (Top 5% candidate)\n\n## EXTRA-CURRICULAR & LEADERSHIP\n- Technical Lead, College Open Source Development Club (Organized 2 campus hackathons with 200+ attendees).`,
                      'resume-text'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fbf5e9] border border-[#d8c7ad] text-[#0d3e2e] font-sans text-[12px] font-bold hover:bg-[#f6ede0] transition cursor-pointer"
                >
                  {copiedKey === 'resume-text' ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                  <span>{copiedKey === 'resume-text' ? 'Copied!' : 'Copy Template Markdown'}</span>
                </button>
              </div>

              <div className="font-mono text-[12px] bg-[#fbf5e9] p-4 rounded-lg border border-[#efe3cc] text-[#2b2118] whitespace-pre-wrap leading-relaxed">
                {`# FIRSTNAME LASTNAME\nEmail: your.name@gmail.com | Phone: +91 98765 43210 | Location: Chennai, India\nLinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername\n\n## EDUCATION\n- B.Tech Computer Science & Engineering, College Name (2022 – 2026) | CGPA: 8.42/10.0\n- Higher Secondary Certificate (HSC), School Name (2022) | 92.4%\n\n## TECHNICAL SKILLS\n- Languages: Python, Java, JavaScript, SQL\n- Frameworks: React.js, Node.js, Express, Tailwind CSS\n- Tools: Git, GitHub, Postman, Supabase\n\n## ACADEMIC PROJECTS\n### Project Title | Tech Stack\n- Accomplished [X], as measured by [Y], by doing [Z] (use action verbs: Engineered, Optimized, Delivered).\n- Highlight concrete numbers: latency reduction, user count, test coverage.\n\n## CERTIFICATIONS\n- Naan Mudhalvan Skill Certification / NPTEL Elite`}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-white border border-[#efe3cc] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#efe3cc]">
                <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e]">
                  3-PARAGRAPH FRESHER COVER LETTER TEMPLATE
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `Dear Hiring Team at [Target Organization],\n\nI am writing to express my enthusiastic application for the [Role Title, e.g. Software Trainee Intern] position as advertised on your career portal. As a final-year [Degree Name] student at [College Name], I have followed [Target Organization]'s impactful work on [Product or Initiative] with great admiration.\n\nDuring my academic coursework and capstone project, I specialized in [Primary Technical Skill], recently delivering [Project Name] which [Measurable Result]. My technical foundation in [2 key skills from Job Description] directly aligns with your requirements for this role. I thrive in collaborative environments and pride myself on rigorous problem-solving and clean documentation.\n\nI welcome the opportunity to discuss how my technical dedication and rapid learning ability will add value to your engineering team. Thank you for your time and consideration.\n\nSincerely,\n[Your Full Name]\n[Your Mobile Number] | [Your Email]`,
                      'cover-letter-text'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fbf5e9] border border-[#d8c7ad] text-[#0d3e2e] font-sans text-[12px] font-bold hover:bg-[#f6ede0] transition cursor-pointer"
                >
                  {copiedKey === 'cover-letter-text' ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                  <span>{copiedKey === 'cover-letter-text' ? 'Copied!' : 'Copy Cover Letter'}</span>
                </button>
              </div>

              <div className="font-sans text-[13px] bg-[#fbf5e9] p-4 rounded-lg border border-[#efe3cc] text-[#2b2118] whitespace-pre-line leading-relaxed">
                {`Dear Hiring Team at [Target Organization],

I am writing to express my enthusiastic application for the [Role Title, e.g. Software Trainee Intern] position. As a final-year [Degree Name] student at [College Name], I have followed [Target Organization]'s impactful work with great admiration.

During my academic coursework and capstone project, I specialized in [Primary Technical Skill], recently delivering [Project Name] which [Measurable Result]. My technical foundation in [2 key skills from Job Description] directly aligns with your requirements for this role.

I welcome the opportunity to discuss how my dedication and rapid learning ability will add value to your team. Thank you for your time and consideration.

Sincerely,
[Your Full Name]
[Your Mobile Number] | [Your Email]`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 5: PUBLIC SPEAKING TOOLKIT */}
      {activeTool === 'speech-builder' && (
        <div className="mt-6 p-5 rounded-xl bg-white border border-[#efe3cc] space-y-4">
          <div className="flex items-center gap-2">
            <Mic size={18} className="text-[#0d3e2e]" />
            <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
              The 5-Minute Speech Architect
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
            <div className="p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block">
                PART 1: THE HOOK (60s)
              </span>
              <p className="text-[#554a3f] leading-relaxed">
                Open with an arresting statistic, a surprising contradiction, or a personal 20-second anecdote. Never open with an apology or microphone tap.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block">
                PART 2: THE 3 POINTS (180s)
              </span>
              <p className="text-[#554a3f] leading-relaxed">
                Human working memory holds 3 items easily. Frame your core argument as: Problem, Operational Solution, and Long-Term Impact.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase text-emerald-800 block">
                PART 3: CALL TO ACTION (60s)
              </span>
              <p className="text-[#554a3f] leading-relaxed">
                End with a memorable one-sentence takeaway and a concrete challenge to the room. Close cleanly: &ldquo;Thank you.&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

export function AboutSection() {
  const pillars = [
    {
      icon: 'verified',
      title: 'Direct Official Sources',
      description:
        'All circulars, procedures, and portals link directly to authorized government departments (TN e-District, UGC, AICTE, NTA, Directorate of Technical Education), eliminating misleading third-party agents.',
    },
    {
      icon: 'shield',
      title: 'Statutory Safety & Student Rights',
      description:
        'Clear awareness of anti-ragging regulations, internal complaints committees, statutory grievance procedures, cyber-wellness safeguards, and 24x7 emergency helplines.',
    },
    {
      icon: 'school',
      title: 'Complete Educational Continuum',
      description:
        'Equitable guidance tailored for every academic transition — from Class 10 board examinations, diploma courses, and undergraduate single-window admissions to postgraduate research.',
    },
    {
      icon: 'volunteer_activism',
      title: 'Non-Commercial & Free Public Access',
      description:
        'Zero commission-driven rankings, zero subscription paywalls, and zero monetized user leads. A transparent, student-first digital public infrastructure built for learner welfare.',
    },
  ];

  return (
    <section id="about" className="w-full bg-[#f6ede0] py-14 lg:py-24 border-t border-b border-[#efe3cc] scroll-mt-20">
      <div id="student-journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#92400e] font-bold tracking-wider uppercase">
              ABOUT STUDENT RSO
            </span>
            <div className="w-8 h-0.5 bg-[#92400e]" />
          </div>
          <h2 className="font-serif text-[30px] sm:text-[40px] leading-[36px] sm:leading-[48px] text-[#2b2118] mt-2 mb-4 font-bold">
            Built to empower students with <span className="italic text-[#8c2f39]">clarity and confidence.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#524336] leading-relaxed">
            Student RSO (Rights, Services &amp; Opportunities) is a student-first digital platform designed to help learners across Tamil Nadu and India navigate government schemes, academic continuity, statutory safety mechanisms, and verified opportunities without confusion or commercial barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-[#fdfbf6] p-6 sm:p-7 rounded-2xl border border-[#efe3cc] flex flex-col justify-between hover:border-[#d8c7ad] hover:shadow-[0_8px_24px_rgba(43,33,24,0.06)] transition-all"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#fbf5e9] border border-[#d8c7ad] text-[#8c2f39] flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[22px]">{p.icon}</span>
                </div>
                <h3 className="font-serif text-[19px] text-[#2b2118] font-bold mb-3">{p.title}</h3>
                <p className="font-sans text-[14px] text-[#524336] leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#efe3cc] flex items-center gap-2 font-mono text-[11px] text-[#8c2f39] font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[15px] text-[#92400e]">check_circle</span>
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

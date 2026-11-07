'use client';

import { journeyCohorts, trustSources, verificationRows } from '@/lib/data';

export function JourneySection() {
  return (
    <section id="student-journey" className="w-full bg-[#f6ede0] py-10 lg:py-24 border-t border-b border-[#efe3cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#e0a526] font-bold tracking-wider uppercase">STUDENT JOURNEY</span>
            <div className="w-8 h-0.5 bg-[#e0a526]" />
          </div>
          <h2 className="font-serif text-[26px] sm:text-[36px] leading-[32px] sm:leading-[44px] text-[#2b2118] mt-2 mb-4 font-bold">
            Built for every stage of the <span className="italic text-[#8c2f39]">student journey.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#7a6a5a] leading-relaxed">
            Relevant services, opportunities and guidance for every stage of education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {journeyCohorts.map((c) => (
            <div
              key={c.id}
              id={c.id}
              className="bg-[#fdfbf6] p-6 rounded-xl border border-[#efe3cc] flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#fbf5e9] border border-[#d8c7ad] text-[#8c2f39] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                </div>
                <span className="font-mono text-[12px] text-[#e0a526] uppercase font-bold">{c.level}</span>
                <h3 className="font-serif text-[21px] text-[#2b2118] font-bold mt-1 mb-3">{c.title}</h3>
                <p className="font-sans text-[13px] text-[#7a6a5a] leading-[20px]">{c.description}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#efe3cc] flex items-center gap-1 text-[#8c2f39] font-mono text-[12px] font-semibold">
                <span>{c.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfficialSourcesSection() {
  return (
    <section id="official-sources" className="w-full bg-[#fbf5e9] py-10 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#e0a526] font-bold tracking-wider uppercase">
              AUTHENTICITY &amp; OFFICIAL SOURCES
            </span>
            <div className="w-8 h-0.5 bg-[#e0a526]" />
          </div>
          <h2 className="font-serif text-[26px] sm:text-[36px] leading-[32px] sm:leading-[44px] text-[#2b2118] mt-2 mb-4 font-bold">
            Start with the <span className="italic text-[#8c2f39]">source that matters.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#7a6a5a] leading-relaxed">
            Student RSO helps students discover trusted information and navigate official services. Applications,
            registrations, certificates and institutional decisions remain with the relevant government authority or
            institution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {trustSources.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-[#fdfbf6] border border-[#efe3cc] rounded-xl flex flex-col justify-between hover:border-[#d8c7ad] transition-all"
            >
              <div>
                <span className="font-mono text-[12px] text-[#e0a526] font-bold block mb-2">{t.category}</span>
                <h3 className="font-serif text-[21px] text-[#2b2118] font-bold mb-2">{t.title}</h3>
                <p className="font-sans text-[13px] text-[#7a6a5a] mb-4">{t.description}</p>
              </div>
              <div className="pt-4 border-t border-[#efe3cc] flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#7a6a5a]">{t.source}</span>
                <span className="material-symbols-outlined text-[#5e8b7e] text-[18px]">verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VerifiedInfoSection() {
  return (
    <section id="verified-information" className="w-full bg-[#f6ede0] py-10 lg:py-24 border-t border-b border-[#efe3cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#e0a526] font-bold tracking-wider uppercase">
              VERIFIED INFORMATION
            </span>
            <div className="w-8 h-0.5 bg-[#e0a526]" />
          </div>
          <h2 className="font-serif text-[26px] sm:text-[36px] leading-[32px] sm:leading-[44px] text-[#2b2118] mt-2 mb-4 font-bold">
            Verified Information: <span className="italic text-[#8c2f39]">Know where the information came from.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#7a6a5a] leading-relaxed">
            Make important student information easier to evaluate by showing its source, verification status, last
            verification date and official link.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#5e8b7e]" />
            <div>
              <span className="font-sans text-[16px] text-[#2b2118] font-bold block">VERIFIED</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">Checked and current against gazette notice</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#e0a526]" />
            <div>
              <span className="font-sans text-[16px] text-[#2b2118] font-bold block">VERIFICATION DUE</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">Scheduled cycle needs a fresh gazette check</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#8c2f39]" />
            <div>
              <span className="font-sans text-[16px] text-[#2b2118] font-bold block">EXPIRED</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">No longer valid or officially superseded</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto bg-[#fdfbf6] border border-[#efe3cc] rounded-xl mb-6">
          <table className="w-full text-left font-sans text-[13px] min-w-[640px]">
            <thead className="bg-[#f6ede0] text-[#2b2118] font-mono text-[12px] uppercase border-b border-[#efe3cc]">
              <tr>
                <th className="p-4">Tracked Subject</th>
                <th className="p-4">Issuing Body / Authority</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4">Last Verified</th>
                <th className="p-4 text-right">Official Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efe3cc] text-[#2b2118]">
              {verificationRows.map((row) => (
                <tr key={row.subject}>
                  <td className="p-4 font-semibold">{row.subject}</td>
                  <td className="p-4 text-[#7a6a5a]">{row.authority}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dbe8e4] text-[#15362e] font-mono text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5e8b7e]" /> Verified
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[12px] text-[#7a6a5a]">{row.lastVerified}</td>
                  <td className="p-4 text-right">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8c2f39] hover:text-[#6d1824] underline font-mono text-[12px] inline-flex items-center gap-1 font-semibold"
                    >
                      {row.urlLabel}
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="w-full bg-[#8c2f39] text-[#fbf5e9] py-10 lg:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-0.5 bg-[#e0a526]" />
          <span className="font-mono text-[12px] uppercase tracking-widest text-[#e0a526] font-bold">
            STUDENT RSO CIVIC INFRASTRUCTURE
          </span>
          <span className="w-6 h-0.5 bg-[#e0a526]" />
        </div>
        <h2 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] leading-[36px] sm:leading-[56px] text-white font-bold tracking-tight mb-3">
          Your education journey has enough challenges.
        </h2>
        <p className="font-serif text-[20px] sm:text-[26px] text-[#e0a526] italic mb-6">
          Finding the right information shouldn't be one of them.
        </p>
        <p className="font-sans text-[16px] sm:text-[18px] text-[#f3dde0] max-w-2xl mb-8 sm:mb-12 leading-relaxed">
          Scholarships. Services. Safety. Examinations. Career guidance. Deadlines. One organised starting point.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#fbf5e9] hover:bg-white text-[#8c2f39] font-sans text-[14px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore the Platform</span>
            <span className="material-symbols-outlined text-[18px]">explore</span>
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#6d1824] hover:bg-[#57121b] border border-[#a94852] text-white font-sans text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Services</span>
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </a>
        </div>
        <div className="mt-12 sm:mt-16 flex items-center gap-2 text-[#f3dde0] font-mono text-[12px]">
          <span className="material-symbols-outlined text-[18px] text-[#e0a526]">verified_user</span>
          <span>Student-first · Source-linked · Transparent · Independent</span>
        </div>
      </div>
    </section>
  );
}

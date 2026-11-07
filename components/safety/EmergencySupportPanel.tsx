'use client';

import { AlertTriangle, PhoneCall, ShieldAlert, HeartHandshake, Phone } from 'lucide-react';
import { EMERGENCY_HELPLINES } from '@/lib/safety-data';

export function EmergencySupportPanel() {
  return (
    <div className="space-y-6">
      {/* Immediate Danger Red Alert Notice */}
      <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldAlert size={26} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-red-900 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
                CRITICAL SAFETY ADVISORY
              </span>
              <span className="font-mono text-[11px] font-bold text-red-700">DIAL 112</span>
            </div>
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-red-950">
              If you or another person is in immediate danger, contact emergency services at 112. Do not wait for an online complaint process.
            </h3>
            <p className="font-sans text-[13px] text-red-900/90 leading-relaxed">
              Online grievance portals are designed for statutory review and administrative enquiry, not real-time physical rescue.
              In situations involving active violence, severe injury, or immediate threats to life, call 112 immediately.
            </p>
          </div>
          <a
            href="tel:112"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-3 font-sans text-[14px] font-bold shadow-md transition shrink-0"
          >
            <PhoneCall size={18} />
            <span>Call 112 Now</span>
          </a>
        </div>
      </div>

      {/* Prominent Emergency Assistance Panel */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#efe3cc]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <Phone size={14} /> OFFICIAL STATUTORY & EMERGENCY HELPLINES
            </div>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118] mt-0.5">
              Verified Emergency & Student Support Helplines
            </h3>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#7a6a5a] bg-[#fbf5e9] border border-[#efe3cc] px-3 py-1 rounded-full">
            Direct One-Touch Calling Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_HELPLINES.map((hl) => (
            <div
              key={hl.number}
              className={`rounded-xl p-5 border flex flex-col justify-between transition ${
                hl.isIntegratedEmergency
                  ? 'bg-red-50/70 border-red-200'
                  : 'bg-white border-[#efe3cc] hover:border-[#8c2f39]/30'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[18px] sm:text-[20px] font-bold ${
                      hl.isIntegratedEmergency ? 'text-red-700' : 'text-[#8c2f39]'
                    }`}
                  >
                    {hl.number}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a]">
                    {hl.hours}
                  </span>
                </div>

                <h4 className="font-serif text-[15px] font-bold text-[#2b2118] leading-snug">
                  {hl.title}
                </h4>

                <p className="font-mono text-[11px] font-semibold text-[#8c2f39]">
                  {hl.authority}
                </p>

                <p className="font-sans text-[12px] text-[#7a6a5a] leading-relaxed">
                  {hl.purpose}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#efe3cc]">
                <a
                  href={hl.telUrl}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-2 font-sans text-[13px] font-bold transition shadow-2xs ${
                    hl.isIntegratedEmergency
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-[#8c2f39] text-white hover:bg-[#6d1824]'
                  }`}
                >
                  <PhoneCall size={14} />
                  <span>Call {hl.number}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Purpose Notice */}
        <div className="rounded-xl bg-[#f6ede0] border border-[#efe3cc] p-4 text-center">
          <p className="font-sans text-[13px] text-[#7a6a5a] leading-relaxed max-w-3xl mx-auto">
            <strong className="text-[#2b2118] font-semibold">Important Platform Advisory:</strong> Student RSO is an
            independent information and guidance platform. It is not an emergency response service. If there is immediate danger,
            contact the appropriate emergency authority directly via 112 or official helplines listed above.
          </p>
        </div>
      </div>
    </div>
  );
}

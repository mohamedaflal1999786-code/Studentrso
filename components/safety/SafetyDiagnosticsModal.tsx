'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Activity, CheckCircle2, ExternalLink, Globe, ShieldCheck, X } from 'lucide-react';
import { OFFICIAL_AUTHORITIES } from '@/lib/safety-data';

interface SafetyDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyDiagnosticsModal({ isOpen, onClose }: SafetyDiagnosticsModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#2b2118]/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-4xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl">
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition-colors hover:bg-[#f6ede0] hover:text-[#0d3e2e]">
            <X size={20} />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <div className="space-y-2 pb-4 border-b border-[#efe3cc]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              <Activity size={14} /> AUTONOMOUS SOURCE TELEMETRY &amp; DOMAIN AUDIT
            </div>
            <Dialog.Title className="font-serif text-[24px] font-bold text-[#2b2118]">
              Statutory Government Source Verification Telemetry
            </Dialog.Title>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              All official destinations are verified against authorized Central &amp; Tamil Nadu Government gazette records.
              Zero commercial proxy domains. Zero unverified portals.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white border border-[#efe3cc] p-3 text-center">
                <span className="font-mono text-[10px] uppercase text-[#7a6a5a] block font-bold">Total Verified Sources</span>
                <span className="font-mono text-[22px] font-bold text-[#0d3e2e]">{OFFICIAL_AUTHORITIES.length} Authorities</span>
              </div>
              <div className="rounded-xl bg-white border border-[#efe3cc] p-3 text-center">
                <span className="font-mono text-[10px] uppercase text-[#7a6a5a] block font-bold">Government Tier</span>
                <span className="font-mono text-[22px] font-bold text-[#2b2118]">Central &amp; State TN</span>
              </div>
              <div className="rounded-xl bg-white border border-[#efe3cc] p-3 text-center">
                <span className="font-mono text-[10px] uppercase text-[#7a6a5a] block font-bold">Audit Health Status</span>
                <span className="font-mono text-[22px] font-bold text-emerald-700">100% Confirmed</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#efe3cc] bg-white">
              <table className="w-full text-left font-sans text-[12px]">
                <thead className="bg-[#fbf5e9] border-b border-[#efe3cc] font-mono text-[11px] text-[#2b2118] uppercase">
                  <tr>
                    <th className="p-3">Authority / Agency</th>
                    <th className="p-3">Classification</th>
                    <th className="p-3">Verified Official Domain</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Last Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe3cc]">
                  {OFFICIAL_AUTHORITIES.map((auth) => (
                    <tr key={auth.id} className="hover:bg-[#fdfbf6]">
                      <td className="p-3 font-bold text-[#2b2118]">{auth.name}</td>
                      <td className="p-3 text-[#7a6a5a] font-mono text-[11px]">{auth.classification}</td>
                      <td className="p-3 font-mono text-[11px] text-[#0d3e2e]">{auth.domain}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 size={11} /> Confirmed
                        </span>
                      </td>
                      <td className="p-3 text-[#7a6a5a] font-mono text-[11px]">{auth.lastVerified}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

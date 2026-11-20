// components/career-assistant/ProviderSettingsModal.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Cpu,
  ShieldCheck,
  Key,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';
import { AIProviderId, AIProviderStatus } from '@/lib/ai/types';

interface ProviderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProvider: AIProviderId;
  onSelectProvider: (provider: AIProviderId) => void;
}

export function ProviderSettingsModal({
  isOpen,
  onClose,
  selectedProvider,
  onSelectProvider,
}: ProviderSettingsModalProps) {
  const [providers, setProviders] = useState<AIProviderStatus[]>([]);
  const [activeProvider, setActiveProvider] = useState<AIProviderId>('grounded-engine');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  async function loadStatus() {
    setLoading(true);
    try {
      const res = await fetch('/api/career-assistant/status');
      const data = await res.json();
      if (data.success) {
        setProviders(data.providers);
        setActiveProvider(data.activeProvider);
      }
    } catch (err) {
      console.error('Failed to load status:', err);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#fdfbf6] text-[#2b2118] border border-[#efe3cc] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#efe3cc] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0d3e2e]">
                AI Provider Architecture & Telemetry
              </h3>
              <p className="text-xs text-[#7a6a5a]">
                Multi-model orchestration and server-side provider status
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#efe3cc]/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-xs sm:text-sm">
          {/* Active Provider Banner */}
          <div className="p-4 rounded-2xl bg-[#0d3e2e]/5 border border-[#0d3e2e]/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0d3e2e] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0d3e2e]">
                Current Active Inference Engine
              </div>
              <div className="text-base font-serif font-bold text-[#2b2118] mt-0.5">
                {providers.find((p) => p.id === (selectedProvider === 'auto' ? activeProvider : selectedProvider))?.name || 'Student RSO Grounded Engine'}
              </div>
              <p className="text-xs text-[#7a6a5a] mt-1 leading-relaxed">
                Operating with zero fabrication safeguards. When external live API keys are provided in server environment variables, requests stream directly through official provider SDKs.
              </p>
            </div>
          </div>

          {/* Provider Selection List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a]">
                Select Preferred Model Provider
              </label>
              <button
                type="button"
                onClick={loadStatus}
                className="text-[11px] font-semibold text-[#0d3e2e] hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh Status
              </button>
            </div>

            <div className="space-y-2">
              {/* Auto Option */}
              <div
                onClick={() => onSelectProvider('auto')}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  selectedProvider === 'auto'
                    ? 'border-[#0d3e2e] bg-white shadow-xs ring-1 ring-[#0d3e2e]/20'
                    : 'border-[#efe3cc] bg-white hover:bg-[#fbf5e9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] flex items-center justify-center font-bold text-xs">
                    Auto
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#2b2118]">
                      Auto-Detect Highest Available Tier
                    </div>
                    <div className="text-[11px] text-[#7a6a5a]">
                      Prefers Gemini / OpenAI / Groq if keys exist, falls back to Grounded Engine
                    </div>
                  </div>
                </div>
                {selectedProvider === 'auto' && <CheckCircle className="w-4 h-4 text-[#0d3e2e]" />}
              </div>

              {providers.map((p) => {
                const isSelected = selectedProvider === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProvider(p.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#0d3e2e] bg-white shadow-xs ring-1 ring-[#0d3e2e]/20'
                        : 'border-[#efe3cc] bg-white hover:bg-[#fbf5e9]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        p.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {p.isAvailable ? '✓' : '—'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#2b2118]">{p.name}</span>
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#fbf5e9] text-[#7a6a5a] border border-[#efe3cc]">
                            {p.model}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7a6a5a] mt-0.5 line-clamp-1">
                          {p.description}
                        </p>
                        <span className="font-mono text-[10px] text-stone-500 block mt-1">
                          Key: <code className="text-[#0d3e2e]">{p.envKeyRequired}</code>
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {p.isAvailable ? 'Active / Ready' : 'Key Required'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Configuration Note */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] text-xs text-[#7a6a5a] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#2b2118]">
              <Info className="w-4 h-4 text-[#0d3e2e]" /> Server-Side Environment Instructions
            </div>
            <p className="text-[11px] leading-relaxed">
              To connect your live API key securely, add the desired key to <code className="bg-[#fbf5e9] px-1.5 py-0.5 rounded border border-[#efe3cc] text-[#0d3e2e]">.env.local</code> in the project directory:
            </p>
            <div className="bg-[#fbf5e9] p-2.5 rounded-xl border border-[#efe3cc] font-mono text-[11px] text-[#2b2118] space-y-1">
              <div>GEMINI_API_KEY=your_gemini_api_key</div>
              <div>OPENAI_API_KEY=your_openai_api_key</div>
              <div>GROQ_API_KEY=your_groq_api_key</div>
            </div>
            <p className="text-[10px] text-[#7a6a5a]">
              API keys are never sent to the browser or stored on client devices.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#efe3cc] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0d3e2e] text-white hover:bg-[#08261c] transition shadow-xs"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}

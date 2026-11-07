'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ServiceData, ServiceLink } from '@/lib/data';

interface ServiceModalProps {
  service: ServiceData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenAIChat?: () => void;
}

function linkClasses(variant: ServiceLink['variant']) {
  switch (variant) {
    case 'primary':
      return 'bg-[#8c2f39] hover:bg-[#6d1824] text-white shadow-xs';
    case 'secondary':
      return 'bg-[#e0a526] hover:bg-[#c9921e] text-[#2b2118] font-bold shadow-xs';
    case 'outline':
      return 'bg-[#fbf5e9] hover:bg-[#f6ede0] border border-[#d8c7ad] text-[#2b2118]';
  }
}

export function ServiceModal({ service, open, onOpenChange, onOpenAIChat }: ServiceModalProps) {
  if (!service) return null;
  const isAI = service.id === 'ai-career-assistant';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#2b2118]/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0">
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition-colors hover:bg-[#f6ede0] hover:text-[#8c2f39] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20">
            <span className="material-symbols-outlined text-[20px]">close</span>
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[12px] font-bold uppercase text-[#e0a526]">
              SERVICE {service.number}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[11px] text-[#8c2f39] font-semibold">
              {service.badge}
            </span>
          </div>

          <Dialog.Title className="font-serif text-[26px] leading-[34px] font-bold text-[#2b2118] mb-1">
            {service.title}
          </Dialog.Title>
          <p className="font-serif text-[20px] italic text-[#8c2f39] mb-4">{service.subtitle}</p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a] font-mono text-[12px] mb-5">
            <span className="material-symbols-outlined text-[16px] text-[#5e8b7e]">verified</span>
            <span className="text-[#2b2118] font-medium">{service.officialSource}</span>
          </div>

          <p className="font-sans text-[18px] leading-[28px] text-[#7a6a5a] mb-6">{service.description}</p>

          {service.features.length > 0 && (
            <div className="mb-6">
              <span className="font-mono text-[12px] font-bold text-[#2b2118] block mb-3">
                {service.extraContent ? 'KEY FEATURES:' : 'FEATURES:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-md bg-[#f6ede0] border border-[#efe3cc] font-mono text-[12px] text-[#2b2118]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {service.extraContent && service.extraContent.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {service.extraContent.map((item) => (
                <div key={item.label} className="p-4 bg-[#fbf5e9] border border-[#efe3cc] rounded-lg text-center">
                  <span className="font-mono text-[12px] font-bold text-[#e0a526] block mb-1">{item.label}</span>
                  <span className="font-sans text-[13px] text-[#7a6a5a]">{item.description}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4 border-t border-[#efe3cc]">
            {service.id === 'scholarship-hub' && (
              <a
                href="/scholarships"
                className="px-5 py-2.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[14px] font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Open Full Scholarship Hub</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            )}
            {service.id === 'safety-and-grievance' && (
              <a
                href="/safety"
                className="px-5 py-2.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[14px] font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Open Full Safety & Grievance Hub</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            )}
            {service.id === 'certificate-service' && (
              <>
                <a
                  href="/certificates"
                  className="px-5 py-2.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[14px] font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Open Document Service</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                <a
                  href="/certificates?tab=finder"
                  className="px-5 py-2.5 rounded-lg bg-[#fbf5e9] hover:bg-[#f6ede0] border border-[#d8c7ad] text-[#8c2f39] font-sans text-[14px] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Find My Certificate</span>
                  <span className="material-symbols-outlined text-[16px] text-[#e0a526]">search</span>
                </a>
              </>
            )}
            {service.route && service.route.startsWith('/') && !['scholarship-hub', 'safety-and-grievance', 'certificate-service', 'ai-career-assistant'].includes(service.id) && (
              <a
                href={service.route}
                className="px-5 py-2.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[14px] font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Open {service.title}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            )}
            {isAI ? (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <a
                  href="/career-assistant"
                  className="flex-1 px-5 py-2.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
                >
                  <span>Launch AI Assistant Hub</span>
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                </a>
                <button
                  onClick={() => {
                    onOpenChange(false);
                    if (onOpenAIChat) {
                      onOpenAIChat();
                    } else {
                      window.location.href = '/career-assistant';
                    }
                  }}
                  className="flex-1 px-5 py-2.5 rounded-lg bg-[#fbf5e9] hover:bg-[#f6ede0] border border-[#d8c7ad] text-[#8c2f39] font-sans text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>Quick Chat Modal</span>
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                </button>
              </div>
            ) : (
              service.links.map((link) => {
                const isExternal = link.url.startsWith('http');
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`px-5 py-2.5 rounded-lg font-sans text-[14px] font-semibold transition-colors flex items-center gap-2 cursor-pointer ${linkClasses(
                      link.variant
                    )}`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                  </a>
                );
              })
            )}
          </div>

          {isAI && (
            <div className="mt-4 p-3.5 bg-[#f6ede0] border border-[#efe3cc] rounded-lg font-sans text-[13px] text-[#7a6a5a]">
              <strong className="text-[#2b2118] font-semibold">Decision Disclaimer:</strong> AI guidance is for
              exploration and decision support. Official eligibility and admission requirements should always be
              confirmed with the relevant institution or official authority.
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

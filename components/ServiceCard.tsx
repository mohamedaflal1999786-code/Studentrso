'use client';

import { AppIcon } from '@/components/AppIcon';
import { ServiceData } from '@/lib/data';

interface ServiceCardProps {
  service: ServiceData;
  onClick: (service: ServiceData) => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const handleClick = () => {
    if (service.route && service.route.startsWith('/')) {
      window.location.href = service.route;
    } else {
      onClick(service);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group bg-[#faf6ed] hover:bg-[#f6ede0] border border-[#e5dcbe] p-4 sm:p-5 rounded-2xl transition-all flex flex-col justify-between text-left hover:shadow-sm w-full min-h-[12rem] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/20"
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center shadow-xs">
            <AppIcon name={service.icon} className="text-[19px]" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c6d23]">
            MODULE {service.number}
          </span>
        </div>
        <h3 className="font-serif text-[15px] sm:text-[16px] leading-[22px] font-semibold text-[#111814] group-hover:text-[#0d3e2e] transition-colors line-clamp-2">
          {service.title}
        </h3>
        <p className="font-sans text-[12px] leading-[18px] text-[#57534e] mt-1 line-clamp-3">
          {service.description}
        </p>
      </div>
      <div className="mt-3 pt-2.5 flex items-center text-[#0d3e2e] font-sans text-[12px] font-semibold border-t border-[#e5dcbe]">
        <span>Open Module</span>
        <AppIcon name="arrow_forward" className="text-[14px] ml-1 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

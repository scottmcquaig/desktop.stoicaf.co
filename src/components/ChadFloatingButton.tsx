'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChadGPTSvg } from '@/components/ChadGPTSvg';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ChadFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Don't show on the ChadGPT page
  if (pathname === '/chadgpt') {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/chadgpt"
          className={`
            fixed bottom-24 md:bottom-8 right-4 md:right-8
            w-14 h-14 rounded-full
            bg-gradient-to-br from-stoic-blue to-sky-600
            flex items-center justify-center
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            z-30
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-8 h-8 text-white">
            <ChadGPTSvg className="w-full h-full" />
          </div>

          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-stoic-blue animate-ping opacity-20" />

          {/* Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">AI</span>
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-slate-900 text-white">
        <p className="font-medium">Chat with CHAD</p>
        <p className="text-xs text-slate-400">Your Stoic AI coach</p>
      </TooltipContent>
    </Tooltip>
  );
}

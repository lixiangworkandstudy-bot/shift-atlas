'use client';

import LanguageToggle from './LanguageToggle';

export default function SystemStatusBar() {
  const statusText = '■ SYSTEM ONLINE ■ ECHO LI ■ PRODUCT × UX × AI ■ HUMAN-CENTERED SYSTEMS ■ STATUS: ACTIVE ■';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-terminal border-b-2 border-red-primary shadow-[0_2px_0_0_rgba(0,0,0,0.5)]">
      <div className="h-10 flex items-center justify-between overflow-hidden">
        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            <span
              className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary tracking-[2px] px-2"
            >
              {statusText}
            </span>
            {/* Duplicate for seamless loop */}
            <span
              className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary tracking-[2px] px-2"
              aria-hidden="true"
            >
              {statusText}
            </span>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex-shrink-0 px-4 border-l border-line-pixel">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

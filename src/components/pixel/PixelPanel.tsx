'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface PixelPanelProps {
  children: ReactNode;
  className?: string;
  moduleNumber?: string;
  moduleTitle?: string;
  moduleTitleZh?: string;
}

export default function PixelPanel({
  children,
  className,
  moduleNumber,
  moduleTitle,
  moduleTitleZh,
}: PixelPanelProps) {
  return (
    <div
      className={clsx(
        'bg-bg-secondary',
        'border-2 border-line-pixel',
        'p-4',
        'relative',
        'shadow-[8px_8px_0_0_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(218,119,86,0.1)]',
        'transition-all duration-[var(--duration-base)]',
        'hover:translate-x-1',
        'hover:border-red-bright',
        'hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3),0_0_20px_rgba(218,119,86,0.2)]',
        className
      )}
    >
      {/* Corner decorations */}
      <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-l-2 border-t-2 border-red-primary" />
      <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-r-2 border-b-2 border-red-primary" />

      {/* Module Header */}
      {(moduleNumber || moduleTitle) && (
        <div className="flex items-center gap-2 mb-3 font-[family-name:var(--font-mono)] text-sm">
          {moduleNumber && (
            <span className="text-red-bright font-semibold text-base">
              {moduleNumber}
            </span>
          )}
          {moduleNumber && moduleTitle && (
            <span className="text-text-tertiary">{'//'}</span>
          )}
          {moduleTitle && (
            <span
              className="text-text-system tracking-wider uppercase"
              data-en={moduleTitle}
              data-zh={moduleTitleZh}
            >
              {moduleTitle}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="font-[family-name:var(--font-body)] text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}

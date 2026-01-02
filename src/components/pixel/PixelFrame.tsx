'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface PixelFrameProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'heavy' | 'terminal';
  corners?: boolean;
  hover?: boolean;
}

export default function PixelFrame({
  children,
  className,
  variant = 'default',
  corners = true,
  hover = true,
}: PixelFrameProps) {
  const baseStyles = 'relative bg-bg-secondary';

  const variantStyles = {
    default: 'border-2 border-line-pixel',
    heavy: 'border-3 border-double border-red-primary',
    terminal: 'border border-green-calm bg-bg-terminal',
  };

  const shadowStyles = {
    default: 'shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]',
    heavy: 'shadow-[8px_8px_0_0_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(218,119,86,0.1)]',
    terminal: 'shadow-[4px_4px_0_0_rgba(0,0,0,0.4)]',
  };

  const hoverStyles = hover
    ? 'transition-all duration-[var(--duration-base)] hover:translate-x-1 hover:border-red-bright hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3),0_0_20px_rgba(218,119,86,0.2)]'
    : '';

  return (
    <div
      className={clsx(
        baseStyles,
        variantStyles[variant],
        shadowStyles[variant],
        hoverStyles,
        className
      )}
    >
      {/* Corner brackets */}
      {corners && (
        <>
          {/* Top-left corner */}
          <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-l-2 border-t-2 border-red-primary pointer-events-none" />
          {/* Top-right corner */}
          <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-r-2 border-t-2 border-red-primary pointer-events-none" />
          {/* Bottom-left corner */}
          <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-l-2 border-b-2 border-red-primary pointer-events-none" />
          {/* Bottom-right corner */}
          <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-r-2 border-b-2 border-red-primary pointer-events-none" />
        </>
      )}
      {children}
    </div>
  );
}

'use client';

import clsx from 'clsx';

interface PixelDividerProps {
  className?: string;
  count?: number;
}

export default function PixelDivider({ className, count = 12 }: PixelDividerProps) {
  return (
    <div
      className={clsx(
        'text-center',
        'my-6',
        'font-[family-name:var(--font-pixel)]',
        'text-[6px]',
        'text-line-pixel',
        'tracking-[4px]',
        'opacity-50',
        className
      )}
    >
      {Array(count).fill('■').join(' ')}
    </div>
  );
}

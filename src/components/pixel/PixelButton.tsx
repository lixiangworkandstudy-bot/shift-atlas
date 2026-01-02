'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'terminal' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...props
}: PixelButtonProps) {
  const baseStyles = `
    font-[family-name:var(--font-pixel)]
    cursor-pointer
    transition-all
    duration-[var(--duration-fast)]
    inline-flex
    items-center
    gap-2
  `;

  const variantStyles = {
    primary: `
      text-text-primary
      bg-bg-secondary
      border-2 border-red-primary
      shadow-[4px_4px_0_0_var(--red-dark),4px_4px_0_2px_var(--line-pixel)]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[2px_2px_0_0_var(--red-dark),2px_2px_0_2px_var(--line-pixel)]
      active:translate-x-1 active:translate-y-1
      active:shadow-none
    `,
    terminal: `
      text-green-calm
      bg-transparent
      border border-green-calm
      hover:bg-green-calm/10
      hover:shadow-[0_0_8px_var(--green-calm)]
    `,
    ghost: `
      text-text-secondary
      bg-transparent
      border border-transparent
      hover:text-red-primary
      hover:border-line-pixel
    `,
  };

  const sizeStyles = {
    sm: 'text-[8px] px-3 py-1.5',
    md: 'text-[10px] px-4 py-2',
    lg: 'text-[12px] px-6 py-3',
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {icon && <span className="text-red-primary">{icon}</span>}
      {children}
    </button>
  );
}

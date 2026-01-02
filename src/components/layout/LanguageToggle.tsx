'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    setMounted(true);
    // Load saved preference
    const saved = localStorage.getItem('preferred-language') as 'en' | 'zh';
    if (saved) {
      setLang(saved);
      document.documentElement.lang = saved;
      updateContent(saved);
    }
  }, []);

  const switchLanguage = (newLang: 'en' | 'zh') => {
    setLang(newLang);
    localStorage.setItem('preferred-language', newLang);
    document.documentElement.lang = newLang;
    updateContent(newLang);
  };

  const updateContent = (targetLang: 'en' | 'zh') => {
    // Update all bilingual elements
    document.querySelectorAll('[data-en][data-zh]').forEach((el) => {
      const element = el as HTMLElement;
      const text = targetLang === 'en' ? element.dataset.en : element.dataset.zh;
      if (text) {
        element.textContent = text;
      }
    });
  };

  // Render placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={clsx(
          'flex items-center gap-1',
          'font-[family-name:var(--font-pixel)]',
          'text-[8px]',
          className
        )}
      >
        <span className="px-2 py-1 border border-line-pixel bg-red-primary text-bg-primary">EN</span>
        <span className="text-text-tertiary">|</span>
        <span className="px-2 py-1 border border-line-pixel text-text-tertiary">中文</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-1',
        'font-[family-name:var(--font-pixel)]',
        'text-[8px]',
        className
      )}
    >
      <button
        onClick={() => switchLanguage('en')}
        className={clsx(
          'px-2 py-1',
          'border border-line-pixel',
          'transition-all duration-[var(--duration-fast)]',
          lang === 'en'
            ? 'bg-red-primary text-bg-primary border-red-primary'
            : 'bg-transparent text-text-tertiary hover:text-red-bright hover:border-red-bright'
        )}
        aria-label="Switch to English"
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="text-text-tertiary">|</span>
      <button
        onClick={() => switchLanguage('zh')}
        className={clsx(
          'px-2 py-1',
          'border border-line-pixel',
          'transition-all duration-[var(--duration-fast)]',
          lang === 'zh'
            ? 'bg-red-primary text-bg-primary border-red-primary'
            : 'bg-transparent text-text-tertiary hover:text-red-bright hover:border-red-bright'
        )}
        aria-label="切换到中文"
        aria-pressed={lang === 'zh'}
      >
        中文
      </button>
    </div>
  );
}

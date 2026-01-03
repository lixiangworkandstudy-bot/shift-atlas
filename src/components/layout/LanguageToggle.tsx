'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import clsx from 'clsx';

// Create language context
export const LanguageContext = createContext<{
  lang: 'en' | 'zh';
  setLang: (lang: 'en' | 'zh') => void;
}>({
  lang: 'en',
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

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
    }
  }, []);

  const switchLanguage = (newLang: 'en' | 'zh') => {
    setLang(newLang);
    localStorage.setItem('preferred-language', newLang);
    document.documentElement.lang = newLang;
    // Note: Removed direct DOM manipulation - will use React state in future
  };

  const currentLang = mounted ? lang : 'en';

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
        onClick={() => mounted && switchLanguage('en')}
        className={clsx(
          'px-2 py-1',
          'border border-line-pixel',
          'transition-all duration-[var(--duration-fast)]',
          currentLang === 'en'
            ? 'bg-red-primary text-bg-primary border-red-primary'
            : 'bg-transparent text-text-tertiary hover:text-red-bright hover:border-red-bright'
        )}
        aria-label="Switch to English"
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
      <span className="text-text-tertiary">|</span>
      <button
        onClick={() => mounted && switchLanguage('zh')}
        className={clsx(
          'px-2 py-1',
          'border border-line-pixel',
          'transition-all duration-[var(--duration-fast)]',
          currentLang === 'zh'
            ? 'bg-red-primary text-bg-primary border-red-primary'
            : 'bg-transparent text-text-tertiary hover:text-red-bright hover:border-red-bright'
        )}
        aria-label="切换到中文"
        aria-pressed={currentLang === 'zh'}
      >
        中文
      </button>
    </div>
  );
}

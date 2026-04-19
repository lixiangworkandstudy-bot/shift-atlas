'use client';

import { useEffect, createContext, useContext, useSyncExternalStore } from 'react';
import clsx from 'clsx';
import {
  LANGUAGE_STORAGE_KEY,
  getLanguageFromAcceptLanguage,
  normalizePreferredLanguage,
} from '@/lib/language';

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

function applyLanguageToDocument(lang: 'en' | 'zh') {
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  const elements = document.querySelectorAll<HTMLElement>('[data-en][data-zh]');
  elements.forEach((element) => {
    if (element.querySelector('[data-en][data-zh]')) {
      return;
    }

    const nextText = lang === 'zh' ? element.dataset.zh : element.dataset.en;
    if (typeof nextText === 'string' && element.textContent !== nextText) {
      element.textContent = nextText;
    }
  });
}

interface LanguageToggleProps {
  className?: string;
}

const LANGUAGE_EVENT = 'preferred-language-change';

function subscribeToLanguage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handleChange = () => callback();
  window.addEventListener('storage', handleChange);
  window.addEventListener(LANGUAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(LANGUAGE_EVENT, handleChange);
  };
}

function getClientLanguageSnapshot(): 'en' | 'zh' {
  if (typeof window === 'undefined') return 'en';

  const stored = normalizePreferredLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  if (stored) return stored;

  const cookieMatch = document.cookie.match(/(?:^|;\s*)preferred-language=([^;]+)/);
  const cookieLang = normalizePreferredLanguage(decodeURIComponent(cookieMatch?.[1] ?? ''));
  if (cookieLang) return cookieLang;

  return getLanguageFromAcceptLanguage(navigator.language);
}

function getServerLanguageSnapshot(): 'en' | 'zh' {
  return 'en';
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const lang = useSyncExternalStore(
    subscribeToLanguage,
    getClientLanguageSnapshot,
    getServerLanguageSnapshot
  );

  useEffect(() => {
    applyLanguageToDocument(lang);
  }, [lang]);

  const switchLanguage = (newLang: 'en' | 'zh') => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    document.cookie = `preferred-language=${encodeURIComponent(newLang)}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
    applyLanguageToDocument(newLang);
  };

  const currentLang = lang;

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
        onClick={() => switchLanguage('zh')}
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

export type PreferredLanguage = 'en' | 'zh';

export const LANGUAGE_STORAGE_KEY = 'preferred-language';
export const LANGUAGE_COOKIE_KEY = 'preferred-language';

export function normalizePreferredLanguage(value: string | null | undefined): PreferredLanguage | null {
  if (value === 'zh') return 'zh';
  if (value === 'en') return 'en';
  return null;
}

export function getLanguageFromCookieHeader(cookieHeader: string | null | undefined): PreferredLanguage | null {
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/(?:^|;\s*)preferred-language=([^;]+)/);
  return normalizePreferredLanguage(decodeURIComponent(match?.[1] ?? ''));
}

export function getLanguageFromAcceptLanguage(acceptLanguage: string | null | undefined): PreferredLanguage {
  const normalized = String(acceptLanguage ?? '').toLowerCase();
  return normalized.includes('zh') ? 'zh' : 'en';
}

export function getServerPreferredLanguage(options: {
  cookieHeader?: string | null;
  acceptLanguage?: string | null;
}): PreferredLanguage {
  return (
    getLanguageFromCookieHeader(options.cookieHeader) ??
    getLanguageFromAcceptLanguage(options.acceptLanguage)
  );
}

export function buildLanguageBootstrapScript() {
  return `
(function () {
  try {
    var storageKey = ${JSON.stringify(LANGUAGE_STORAGE_KEY)};
    var cookieKey = ${JSON.stringify(LANGUAGE_COOKIE_KEY)};
    var lang = localStorage.getItem(storageKey);
    var observerKey = '__preferredLanguageObserver';

    if (lang !== 'zh' && lang !== 'en') {
      var cookieMatch = document.cookie.match(new RegExp('(?:^|;\\\\s*)' + cookieKey + '=([^;]+)'));
      if (cookieMatch && cookieMatch[1]) {
        lang = decodeURIComponent(cookieMatch[1]);
      }
    }

    if (lang !== 'zh' && lang !== 'en') {
      lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }

    localStorage.setItem(storageKey, lang);
    document.cookie = cookieKey + '=' + encodeURIComponent(lang) + '; path=/; max-age=31536000; samesite=lax';
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    var applyLanguage = function () {
      var elements = document.querySelectorAll('[data-en][data-zh]');
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.querySelector('[data-en][data-zh]')) {
          continue;
        }

        var nextText = lang === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        if (typeof nextText === 'string' && element.textContent !== nextText) {
          element.textContent = nextText;
        }
      }
    };

    applyLanguage();

    if (window[observerKey] && typeof window[observerKey].disconnect === 'function') {
      window[observerKey].disconnect();
    }

    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        applyLanguage();
      });
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });

    window[observerKey] = observer;
  } catch (error) {}
})();
`;
}

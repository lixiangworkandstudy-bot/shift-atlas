'use client';

import Link from 'next/link';
import { PixelButton } from '@/components/pixel';

interface Signal {
  id: string;
  title_en: string;
  title_zh: string;
  date: string;
  category: string;
  readTime: string;
  isNew?: boolean;
}

const signals: Signal[] = [
  {
    id: '014',
    title_en: 'Designing Calm Interfaces in Intelligent Systems',
    title_zh: '设计智能系统中的平静界面',
    date: '2025.01.02',
    category: 'AI × UX',
    readTime: '6 min',
    isNew: true,
  },
  {
    id: '011',
    title_en: 'Trust Is a Design Decision, Not a Feature',
    title_zh: '信任是一种设计决策，而非功能',
    date: '2024.12.18',
    category: 'Human–AI',
    readTime: '5 min',
  },
  {
    id: '007',
    title_en: 'When Automation Fails, Interfaces Matter More',
    title_zh: '当自动化失败时，界面更加重要',
    date: '2024.11.20',
    category: 'Product Thinking',
    readTime: '4 min',
  },
];

const categories = ['All', 'AI × UX', 'Human–AI', 'Product Thinking'];

export default function SignalsArchive() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-terminal border-b-2 border-red-primary">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
          >
            ← HOME
          </Link>
          <span className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary">
            SIGNALS_ARCHIVE
          </span>
        </div>
      </nav>

      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-[family-name:var(--font-pixel)] text-[20px] text-red-primary">
                006
              </span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[20px]">
                {'//'}
              </span>
              <h1
                className="font-[family-name:var(--font-pixel)] text-[20px] text-text-primary tracking-wider"
                data-en="SIGNALS"
                data-zh="信号"
              >
                SIGNALS
              </h1>
            </div>
            <p
              className="text-text-secondary font-[family-name:var(--font-body)] text-[length:var(--text-lg)]"
              data-en="Independent writing and ongoing thinking about design, technology, and human experience."
              data-zh="关于设计、技术和人类体验的独立写作与持续思考。"
            >
              Independent writing and ongoing thinking about design, technology, and human experience.
            </p>
          </header>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] px-3 py-1.5 border transition-colors ${
                  category === 'All'
                    ? 'border-red-primary bg-red-primary/10 text-red-primary'
                    : 'border-line-subtle text-text-tertiary hover:border-red-primary hover:text-red-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Signals List */}
          <div className="space-y-4">
            {signals.map((signal) => (
              <article
                key={signal.id}
                className="bg-bg-secondary border-l-4 border-red-primary p-6 transition-all duration-[var(--duration-base)] hover:border-l-red-bright hover:shadow-[0_0_20px_rgba(218,119,86,0.2)] hover:translate-x-2"
              >
                {/* Meta Line */}
                <div className="flex items-center gap-3 mb-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-text-tertiary">
                  <span className="text-red-primary font-semibold">
                    SIGNAL_{signal.id}
                  </span>
                  {signal.isNew && (
                    <span className="bg-amber-warm text-bg-primary px-2 py-0.5 font-[family-name:var(--font-pixel)] text-[8px]">
                      NEW
                    </span>
                  )}
                  <span>{signal.date}</span>
                </div>

                {/* Title */}
                <h2
                  className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-text-primary mb-2"
                  data-en={signal.title_en}
                  data-zh={signal.title_zh}
                >
                  {signal.title_en}
                </h2>

                {/* Tags */}
                <div className="flex gap-2 mb-4 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                  <span className="text-text-secondary bg-red-overlay px-2 py-1 border border-line-subtle">
                    ◆ {signal.category}
                  </span>
                  <span className="text-text-secondary bg-red-overlay px-2 py-1 border border-line-subtle">
                    ■ {signal.readTime} read
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/signals/${signal.id}`}
                  className="inline-flex items-center gap-2 text-green-calm font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] border border-green-calm px-3 py-1.5 hover:bg-green-calm/10 hover:shadow-[0_0_8px_var(--green-calm)] transition-all"
                >
                  <span className="text-red-primary">▸</span> READ_SIGNAL
                </Link>
              </article>
            ))}
          </div>

          {/* Back to home */}
          <div className="mt-12">
            <Link href="/">
              <PixelButton variant="ghost">
                ← BACK TO HOME
              </PixelButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

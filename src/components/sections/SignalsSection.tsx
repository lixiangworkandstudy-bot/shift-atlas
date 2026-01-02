'use client';

import Link from 'next/link';

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

export default function SignalsSection() {
  return (
    <section id="signals" className="py-16 lg:py-24 bg-bg-secondary/50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">
            006
          </span>
          <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">
            //
          </span>
          <h2
            className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
            data-en="SIGNALS"
            data-zh="信号"
          >
            SIGNALS
          </h2>
        </div>

        <p
          className="text-text-secondary mb-8 font-[family-name:var(--font-body)]"
          data-en="Independent writing and ongoing thinking"
          data-zh="独立写作与持续思考"
        >
          Independent writing and ongoing thinking
        </p>

        {/* Signal Entries */}
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
              <h3
                className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-text-primary mb-2"
                data-en={signal.title_en}
                data-zh={signal.title_zh}
              >
                {signal.title_en}
              </h3>

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

        {/* View All Link */}
        <div className="mt-8">
          <Link
            href="/signals"
            className="text-red-primary hover:text-red-bright font-[family-name:var(--font-mono)] transition-colors"
          >
            → View All Signals
          </Link>
        </div>
      </div>
    </section>
  );
}

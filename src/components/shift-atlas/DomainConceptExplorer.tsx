'use client';

import Link from 'next/link';
import type { VisibleSection } from '@/lib/shift-atlas/domain';
import { itemTypeLabels, isExternalHref } from '@/lib/shift-atlas/domain';

type ExplorerItem = VisibleSection['items'][number];

function SectionCard({ item }: { item: ExplorerItem }) {
  const badge = itemTypeLabels[item.itemType ?? 'concept'];
  const isSource = Boolean(item.href && isExternalHref(item.href));

  const card = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p
            className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary mb-2"
            data-en={isSource ? 'SOURCE' : 'TERM'}
            data-zh={isSource ? '来源' : '词条'}
          >
            {isSource ? 'SOURCE' : 'TERM'}
          </p>
          <h3
            className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-text-primary leading-snug"
            data-en={item.label}
            data-zh={item.labelZh}
          >
            {item.label}
          </h3>
        </div>
        <span className="shrink-0 border border-line-pixel bg-bg-primary px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary">
          {badge.en}
        </span>
      </div>

      <p
        className="text-[13px] leading-relaxed text-text-secondary"
        data-en={item.summary}
        data-zh={item.summaryZh}
      >
        {item.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.readingHint ? (
          <span
            className="border border-line-pixel bg-[rgba(10,8,16,0.45)] px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-green-calm"
            data-en={item.readingHint}
            data-zh={item.readingHintZh ?? item.readingHint}
          >
            {item.readingHint}
          </span>
        ) : null}
        {item.caseStudyIds?.length ? (
          <span
            className="border border-line-pixel bg-[rgba(10,8,16,0.45)] px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary"
            data-en={`${item.caseStudyIds.length} CASE STUDY`}
            data-zh={`${item.caseStudyIds.length} 个案例`}
          >
            {item.caseStudyIds.length} CASE STUDY
          </span>
        ) : null}
        {!isSource && item.href ? (
          <span
            className="border border-line-pixel bg-[rgba(10,8,16,0.45)] px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-red-primary"
            data-en="READ ENTRY"
            data-zh="阅读全文"
          >
            READ ENTRY
          </span>
        ) : null}
      </div>
    </>
  );

  const baseClass =
    'block border border-line-pixel bg-bg-secondary p-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-1 hover:border-red-primary';

  if (isSource && item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={baseClass}>
        {card}
      </a>
    );
  }

  if (item.href) {
    return (
      <Link href={item.href} className={[baseClass, 'text-left w-full'].join(' ')}>
        {card}
      </Link>
    );
  }

  return <article className={baseClass}>{card}</article>;
}

export function DomainConceptExplorer({ sections }: { sections: VisibleSection[] }) {
  return (
    <section className="space-y-8">
      {sections.map((section) => (
        <div key={section.key}>
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-line-pixel pb-3">
            <h3
              className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-text-primary"
              data-en={section.label.en}
              data-zh={section.label.zh}
            >
              {section.label.en}
            </h3>
            <span className="font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary">
              {String(section.items.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {section.items.map((item) => (
              <SectionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

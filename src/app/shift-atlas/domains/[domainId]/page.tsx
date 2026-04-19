import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SystemStatusBar } from '@/components/layout';
import { Footer } from '@/components/sections';
import { PixelDivider } from '@/components/pixel';
import { DomainConceptExplorer } from '@/components/shift-atlas/DomainConceptExplorer';
import {
  countDomainItems,
  getVisibleSections,
  isExternalHref,
  itemTypeLabels,
} from '@/lib/shift-atlas/domain';
import { shiftAtlasKnowledgeDomains } from '@/lib/shift-atlas/data';

function getItemStatus(item: { href?: string; itemType?: string }) {
  if (!item.href) {
    return 'DRAFT';
  }

  return isExternalHref(item.href) ? 'SOURCE' : 'CONCEPT';
}

function ItemCard({
  item,
}: {
  item: {
    id: string;
    label: string;
    labelZh: string;
    summary: string;
    summaryZh: string;
    href?: string;
    itemType?: 'source' | 'concept' | 'pattern' | 'principle' | 'signal';
    readingHint?: string;
    readingHintZh?: string;
    caseStudyIds?: string[];
  };
}) {
  const badge = itemTypeLabels[item.itemType ?? 'concept'];
  const content = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary mb-2">
            {getItemStatus(item)}
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

      <p className="text-[13px] leading-relaxed text-text-secondary" data-en={item.summary} data-zh={item.summaryZh}>
        {item.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.readingHint ? (
          <span className="border border-line-pixel bg-[rgba(10,8,16,0.45)] px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-green-calm">
            {item.readingHint}
          </span>
        ) : null}
        {item.caseStudyIds?.length ? (
          <span className="border border-line-pixel bg-[rgba(10,8,16,0.45)] px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary">
            {item.caseStudyIds.length} CASE STUDY
          </span>
        ) : null}
      </div>
    </>
  );

  const cardClass =
    'block border border-line-pixel bg-bg-secondary p-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-1 hover:border-red-primary';

  if (item.href && isExternalHref(item.href)) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={cardClass}>
        {content}
      </a>
    );
  }

  return <article className={cardClass}>{content}</article>;
}

function TimelineCard({
  milestone,
}: {
  milestone: {
    year: string;
    yearZh: string;
    title: string;
    titleZh: string;
    description: string;
    descriptionZh: string;
    product?: string;
    href?: string;
    significance: 'turning_point' | 'evolution' | 'emerging';
  };
}) {
  const significanceLabel = {
    turning_point: { en: 'turning point', zh: '转折点' },
    evolution: { en: 'evolution', zh: '持续演变' },
    emerging: { en: 'emerging', zh: '新变化' },
  }[milestone.significance];

  const content = (
    <>
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary">
          {milestone.year}
        </p>
        <span
          className="font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary"
          data-en={significanceLabel.en}
          data-zh={significanceLabel.zh}
        >
          {significanceLabel.en}
        </span>
      </div>
      <h3
        className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-text-primary"
        data-en={milestone.title}
        data-zh={milestone.titleZh}
      >
        {milestone.title}
      </h3>
      <p
        className="mt-2 text-[13px] leading-relaxed text-text-secondary"
        data-en={milestone.description}
        data-zh={milestone.descriptionZh}
      >
        {milestone.description}
      </p>
      {milestone.product ? (
        <p
          className="mt-3 font-[family-name:var(--font-pixel)] text-[8px] text-green-calm"
          data-en={milestone.product}
          data-zh={milestone.product}
        >
          {milestone.product}
        </p>
      ) : null}
    </>
  );

  const cardClass =
    'block border border-line-pixel bg-bg-secondary p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-red-primary';

  if (milestone.href && isExternalHref(milestone.href)) {
    return (
      <a href={milestone.href} target="_blank" rel="noreferrer" className={cardClass}>
        {content}
      </a>
    );
  }

  if (milestone.href) {
    return <Link href={milestone.href} className={cardClass}>{content}</Link>;
  }

  return (
    <article className="border border-line-pixel bg-bg-secondary p-4">
      {content}
    </article>
  );
}

export function generateStaticParams() {
  return shiftAtlasKnowledgeDomains.map((domain) => ({
    domainId: domain.id,
  }));
}

export default async function ShiftAtlasDomainPage({
  params,
}: {
  params: Promise<{ domainId: string }>;
}) {
  const { domainId } = await params;
  const domain = shiftAtlasKnowledgeDomains.find((entry) => entry.id === domainId);

  if (!domain) {
    notFound();
  }

  const sections = getVisibleSections(domain);
  const totalItems = countDomainItems(domain);

  return (
    <>
      <SystemStatusBar />

      <main className="pt-10 pb-16 min-h-screen bg-bg-primary">
        <article className="max-w-7xl mx-auto px-6">
          <nav className="mb-10 flex flex-wrap items-center justify-between gap-4 border border-line-pixel bg-bg-secondary px-4 py-3">
            <Link
              href="/shift-atlas#map"
              className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
              data-en="← BACK TO MAP"
              data-zh="← 返回地图"
            >
              ← BACK TO MAP
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shift-atlas/wiki"
                className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
                data-en="WIKI HUB"
                data-zh="WIKI HUB"
              >
                WIKI HUB
              </Link>
              <span
                className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary"
                data-en="DOMAIN PAGE"
                data-zh="领域正文"
              >
                DOMAIN PAGE
              </span>
            </div>
          </nav>

          <header className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <p
                className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-4"
                data-en="SHIFT ATLAS // DOMAIN"
                data-zh="SHIFT ATLAS // 领域"
              >
                SHIFT ATLAS // DOMAIN
              </p>
              <h1
                className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] text-text-primary leading-tight mb-4"
                data-en={domain.title}
                data-zh={domain.titleZh}
              >
                {domain.title}
              </h1>
              {domain.tagline ? (
                <p className="mb-4 font-[family-name:var(--font-mono)] text-[14px] text-text-tertiary">
                  {domain.tagline}
                </p>
              ) : null}
              <p
                className="max-w-3xl text-text-secondary text-[length:var(--text-base)] leading-relaxed"
                data-en={domain.summary}
                data-zh={domain.summaryZh}
              >
                {domain.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span
                  className="border border-line-pixel bg-bg-secondary px-3 py-2 font-[family-name:var(--font-pixel)] text-[8px] text-green-calm"
                  data-en={`${totalItems} ENTRIES`}
                  data-zh={`${totalItems} 个条目`}
                >
                  {totalItems} ENTRIES
                </span>
                <span
                  className="border border-line-pixel bg-bg-secondary px-3 py-2 font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary"
                  data-en={`${sections.length} BLOCKS`}
                  data-zh={`${sections.length} 组内容`}
                >
                  {sections.length} BLOCKS
                </span>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="border-2 border-line-pixel bg-bg-secondary p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-3"
                  data-en="WHAT TO PAY ATTENTION TO"
                  data-zh="这层该重点看什么"
                >
                  WHAT TO PAY ATTENTION TO
                </p>
                <p
                  className="text-[13px] leading-relaxed text-text-secondary"
                  data-en={domain.productLens}
                  data-zh={domain.productLensZh}
                >
                  {domain.productLens}
                </p>
              </div>
              <div className="border-2 border-line-pixel bg-bg-secondary p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-3"
                  data-en="WHAT BELONGS HERE"
                  data-zh="什么该放在这里"
                >
                  WHAT BELONGS HERE
                </p>
                <p
                  className="text-[13px] leading-relaxed text-text-secondary"
                  data-en={domain.curationRule}
                  data-zh={domain.curationRuleZh}
                >
                  {domain.curationRule}
                </p>
              </div>
            </aside>
          </header>

          <div className="mt-8 border border-line-pixel bg-[rgba(10,8,16,0.4)] px-4 py-3">
            <p
              className="text-[13px] leading-relaxed text-text-secondary"
              data-en="Use this page to understand one field properly: what problem it handles, which terms matter inside it, and which cases are worth keeping in view."
              data-zh="这一页用来把一个领域读明白：它在处理什么问题，里面哪些词条重要，哪些案例值得一直放在眼前。"
            >
              Use this page to understand one field properly: what problem it handles, which terms
              matter inside it, and which cases are worth keeping in view.
            </p>
          </div>

          {domain.entryPrimer ? (
            <>
              <PixelDivider />
              <section className="py-16 lg:py-20">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">
                    000
                  </span>
                  <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">
                    {'//'}
                  </span>
                  <h2
                    className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                    data-en="START HERE"
                    data-zh="从这里开始"
                  >
                    START HERE
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <article className="border border-line-pixel bg-bg-secondary p-5">
                    <p
                      className="font-[family-name:var(--font-pixel)] text-[9px] text-red-primary mb-3"
                      data-en="CORE PROBLEM"
                      data-zh="核心问题"
                    >
                      CORE PROBLEM
                    </p>
                    <p
                      className="text-[13px] leading-relaxed text-text-secondary"
                      data-en={domain.entryPrimer.coreProblems}
                      data-zh={domain.entryPrimer.coreProblemsZh}
                    >
                      {domain.entryPrimer.coreProblems}
                    </p>
                  </article>
                  <article className="border border-line-pixel bg-bg-secondary p-5">
                    <p
                      className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-3"
                      data-en="WHY NOW"
                      data-zh="为什么是现在"
                    >
                      WHY NOW
                    </p>
                    <p
                      className="text-[13px] leading-relaxed text-text-secondary"
                      data-en={domain.entryPrimer.whyNow}
                      data-zh={domain.entryPrimer.whyNowZh}
                    >
                      {domain.entryPrimer.whyNow}
                    </p>
                  </article>
                  <article className="border border-line-pixel bg-bg-secondary p-5">
                    <p
                      className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-warm mb-3"
                      data-en="CONSENSUS"
                      data-zh="共识"
                    >
                      CONSENSUS
                    </p>
                    <p
                      className="text-[13px] leading-relaxed text-text-secondary"
                      data-en={domain.entryPrimer.consensus}
                      data-zh={domain.entryPrimer.consensusZh}
                    >
                      {domain.entryPrimer.consensus}
                    </p>
                  </article>
                </div>
              </section>
            </>
          ) : null}

          <PixelDivider />

          <section className="py-16 lg:py-20">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">
                001
              </span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">
                {'//'}
              </span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="KEY TERMS"
                data-zh="关键词条"
              >
                KEY TERMS
              </h2>
            </div>

            <DomainConceptExplorer sections={sections} />
          </section>

          {(domain.timeline?.length || domain.caseStudies?.length) ? (
            <>
              <PixelDivider />
              <section className="py-16 lg:py-20">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">
                    002
                  </span>
                  <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">
                    {'//'}
                  </span>
                  <h2
                    className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                    data-en="HOW THIS FIELD TOOK SHAPE"
                    data-zh="这个领域是怎么成形的"
                  >
                    HOW THIS FIELD TOOK SHAPE
                  </h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.9fr] gap-6">
                  {domain.timeline?.length ? (
                    <div>
                      <p
                        className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-warm mb-3"
                        data-en="TIMELINE"
                        data-zh="演变脉络"
                      >
                        TIMELINE
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {domain.timeline.map((milestone) => (
                          <TimelineCard key={milestone.id} milestone={milestone} />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {domain.caseStudies?.length ? (
                    <aside>
                      <p
                        className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-3"
                        data-en="CASE STUDIES"
                        data-zh="代表案例"
                      >
                        CASE STUDIES
                      </p>
                      <div className="space-y-4">
                        {domain.caseStudies.map((study) => (
                          <article
                            key={study.id}
                            className="border border-line-pixel bg-bg-secondary p-5"
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <h3
                                className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-text-primary"
                                data-en={study.product}
                                data-zh={study.productZh}
                              >
                                {study.product}
                              </h3>
                              {study.productUrl ? (
                                <a
                                  href={study.productUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary hover:text-red-bright transition-colors"
                                  data-en="OPEN"
                                  data-zh="查看"
                                >
                                  OPEN
                                </a>
                              ) : null}
                            </div>
                            <p
                              className="text-[13px] leading-relaxed text-text-secondary mb-3"
                              data-en={study.lesson}
                              data-zh={study.lessonZh}
                            >
                              {study.lesson}
                            </p>
                            <p
                              className="text-[13px] leading-relaxed text-text-secondary"
                              data-en={study.designChoice}
                              data-zh={study.designChoiceZh}
                            >
                              {study.designChoice}
                            </p>
                          </article>
                        ))}
                      </div>
                    </aside>
                  ) : null}
                </div>
              </section>
            </>
          ) : null}
        </article>
      </main>

      <Footer />
    </>
  );
}

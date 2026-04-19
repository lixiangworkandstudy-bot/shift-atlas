import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { SystemStatusBar } from '@/components/layout';
import { Footer } from '@/components/sections';
import { shiftAtlasConceptPages, shiftAtlasConceptPagesBySlug } from '@/lib/shift-atlas/data';

export function generateStaticParams() {
  return shiftAtlasConceptPages.map((concept) => ({
    slug: concept.slug,
  }));
}

function ArticleSection({
  title,
  titleZh,
  children,
}: {
  title: string;
  titleZh: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-10">
      <p
        className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-4"
        data-en={title}
        data-zh={titleZh}
      >
        {title}
      </p>
      <div className="space-y-4 text-[15px] leading-8 text-text-secondary">{children}</div>
    </section>
  );
}

function ListBlock({
  items,
  itemsZh,
}: {
  items: string[];
  itemsZh?: string[];
}) {
  return (
    <ul className="space-y-3 list-disc pl-5">
      {items.map((item, index) => (
        <li key={item} className="text-[14px] leading-7 text-text-secondary">
          <span data-en={item} data-zh={itemsZh?.[index] ?? item}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function ShiftAtlasConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = shiftAtlasConceptPagesBySlug[slug];

  if (!concept) {
    notFound();
  }

  const hasDetailedTemplate =
    concept.definition ||
    concept.scope ||
    concept.boundary ||
    concept.howToTell?.length ||
    concept.typicalPatterns?.length ||
    concept.failureModes?.length;

  return (
    <>
      <SystemStatusBar />

      <main className="pt-20 pb-20 min-h-screen bg-bg-primary">
        <article className="max-w-7xl mx-auto px-6">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 border border-line-pixel bg-bg-secondary px-4 py-3">
            <Link
              href={`/shift-atlas/domains/${concept.domainId}`}
              className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
              data-en="← BACK TO DOMAIN"
              data-zh="← 返回领域"
            >
              ← BACK TO DOMAIN
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/shift-atlas/wiki"
                className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
                data-en="WIKI HUB"
                data-zh="词条中心"
              >
                WIKI HUB
              </Link>
              <span
                className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary"
                data-en={concept.domainTitle}
                data-zh={concept.domainTitleZh}
              >
                {concept.domainTitle}
              </span>
            </div>
          </nav>

          <header className="max-w-4xl mb-12">
            <p
              className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-4"
              data-en="SHIFT ATLAS // CONCEPT"
              data-zh="SHIFT ATLAS // 概念页"
            >
              SHIFT ATLAS // CONCEPT
            </p>
            <h1
              className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] text-text-primary leading-tight mb-5"
              data-en={concept.title}
              data-zh={concept.titleZh}
            >
              {concept.title}
            </h1>
            <p
              className="max-w-3xl text-text-secondary text-[length:var(--text-base)] leading-8"
              data-en={concept.shortSummary}
              data-zh={concept.shortSummaryZh}
            >
              {concept.shortSummary}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
            <section>
              {hasDetailedTemplate ? (
                <div className="border-l-2 border-red-primary pl-5 py-1">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-warm mb-3"
                    data-en="ONE-LINE DEFINITION"
                    data-zh="一句话定义"
                  >
                    ONE-LINE DEFINITION
                  </p>
                  <p
                    className="text-[16px] leading-8 text-text-primary"
                    data-en={concept.definition ?? concept.shortSummary}
                    data-zh={concept.definitionZh ?? concept.shortSummaryZh}
                  >
                    {concept.definition ?? concept.shortSummary}
                  </p>
                </div>
              ) : null}

              {concept.scope ? (
                <ArticleSection title="WHAT THIS TERM MEANS" titleZh="这个词条在说什么">
                  <p className="leading-8" data-en={concept.scope} data-zh={concept.scopeZh}>
                    {concept.scope}
                  </p>
                </ArticleSection>
              ) : null}

              {concept.boundary ? (
                <ArticleSection title="BOUNDARY" titleZh="边界">
                  <p className="leading-8" data-en={concept.boundary} data-zh={concept.boundaryZh}>
                    {concept.boundary}
                  </p>
                </ArticleSection>
              ) : null}

              {(concept.howToTell?.length || concept.whyItMatters) ? (
                <ArticleSection title="HOW TO RECOGNIZE IT" titleZh="怎么判断">
                  <div className="space-y-4">
                    {concept.whyItMatters ? (
                      <p className="leading-8" data-en={concept.whyItMatters} data-zh={concept.whyItMattersZh}>
                        {concept.whyItMatters}
                      </p>
                    ) : null}
                    {concept.howToTell?.length ? <ListBlock items={concept.howToTell} itemsZh={concept.howToTellZh} /> : null}
                  </div>
                </ArticleSection>
              ) : null}

              {concept.typicalPatterns?.length ? (
                <ArticleSection title="TYPICAL PATTERNS" titleZh="典型模式">
                  <ListBlock items={concept.typicalPatterns} itemsZh={concept.typicalPatternsZh} />
                </ArticleSection>
              ) : null}

              {concept.failureModes?.length ? (
                <ArticleSection title="COMMON FAILURE MODES" titleZh="常见失效方式">
                  <ListBlock items={concept.failureModes} itemsZh={concept.failureModesZh} />
                </ArticleSection>
              ) : null}

              {concept.productQuestions?.length ? (
                <ArticleSection title="PRODUCT QUESTIONS" titleZh="产品问题">
                  <ol className="space-y-3 list-decimal list-inside">
                    {concept.productQuestions.map((question, index) => (
                      <li key={question} className="text-[14px] leading-7 text-text-secondary">
                        <span data-en={question} data-zh={concept.productQuestionsZh[index]}>
                          {question}
                        </span>
                      </li>
                    ))}
                  </ol>
                </ArticleSection>
              ) : null}

              {concept.relatedPatterns?.length ? (
                <ArticleSection title="RELATED TERMS" titleZh="相关词条">
                  <div className="space-y-4">
                    {concept.relatedPatterns.map((pattern) => (
                      <div key={pattern.title} className="border-l border-line-subtle pl-4">
                        <h3
                          className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-text-primary"
                          data-en={pattern.title}
                          data-zh={pattern.titleZh}
                        >
                          {pattern.title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-7 text-text-secondary" data-en={pattern.summary} data-zh={pattern.summaryZh}>
                          {pattern.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </ArticleSection>
              ) : null}
            </section>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <section className="border border-line-pixel bg-bg-secondary p-5">
                <p className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-3" data-en="WHERE THIS TERM SITS" data-zh="这个词条放在什么位置">
                  WHERE THIS TERM SITS
                </p>
                <div className="space-y-3 text-[13px] leading-relaxed text-text-secondary">
                  <div className="border border-line-subtle bg-[rgba(10,8,16,0.22)] px-4 py-3">
                    <p className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary mb-1" data-en="FIELD" data-zh="所属领域">
                      FIELD
                    </p>
                    <p data-en={concept.domainTitle} data-zh={concept.domainTitleZh}>
                      {concept.domainTitle}
                    </p>
                  </div>
                  <div className="border border-line-subtle bg-[rgba(10,8,16,0.22)] px-4 py-3">
                    <p className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary mb-1" data-en="PAGE TYPE" data-zh="页面类型">
                      PAGE TYPE
                    </p>
                    <p data-en="Encyclopedia Entry" data-zh="百科词条">
                      Encyclopedia Entry
                    </p>
                  </div>
                </div>
              </section>

              <section className="border border-line-pixel bg-bg-secondary p-5">
                <p className="font-[family-name:var(--font-pixel)] text-[9px] text-red-primary mb-3" data-en="READ THESE FIRST" data-zh="先读这些来源">
                  READ THESE FIRST
                </p>
                <div className="space-y-3">
                  {concept.bestSources.map((source) => {
                    const content = (
                      <>
                        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-text-primary" data-en={source.title} data-zh={source.titleZh}>
                          {source.title}
                        </h2>
                        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary" data-en={source.summary} data-zh={source.summaryZh}>
                          {source.summary}
                        </p>
                      </>
                    );

                    if (source.href) {
                      return (
                        <a
                          key={source.title}
                          href={source.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block border border-line-subtle bg-[rgba(10,8,16,0.22)] px-4 py-3 hover:border-red-primary transition-colors"
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <div key={source.title} className="border border-line-subtle bg-[rgba(10,8,16,0.22)] px-4 py-3">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </section>

              {concept.relatedPatterns?.length ? (
                <section className="border border-line-pixel bg-bg-secondary p-5">
                  <p className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-warm mb-3" data-en="KEEP READING" data-zh="继续往下读">
                    KEEP READING
                  </p>
                  <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
                    {concept.relatedPatterns.map((pattern) => (
                      <p key={pattern.title} data-en={pattern.title} data-zh={pattern.titleZh}>
                        {pattern.title}
                      </p>
                    ))}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

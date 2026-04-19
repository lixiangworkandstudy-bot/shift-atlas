import Link from 'next/link';
import { SystemStatusBar } from '@/components/layout';
import { KnowledgeMap } from '@/components/shift-atlas/KnowledgeMap';
import { Footer } from '@/components/sections';
import { PixelDivider } from '@/components/pixel';
import { shiftAtlasKnowledgeDomains } from '@/lib/shift-atlas/data';
import { getShiftAtlasRecentUpdatePanels } from '@/lib/shift-atlas/update-feed';

const structuralShifts = [
  {
    en: 'Use this atlas when one product question stops being only one kind of problem.',
    zh: '当一个产品问题不再只是单一类型的问题时，就用这张图。',
  },
  {
    en: 'Start by locating the layer. Then read the field. Then use the term precisely.',
    zh: '先定它属于哪一层，再读对应领域，最后把术语用准。',
  },
  {
    en: 'Do not expand forever. Widen the view enough to see the field, then narrow back to a decision.',
    zh: '不要无限展开。只把视野放大到足够看清局面，再收束回判断。',
  },
] as const;

const isExternalHref = (href: string) => href.startsWith('http://') || href.startsWith('https://');

export default async function ShiftAtlasPage() {
  const updatePanels = await getShiftAtlasRecentUpdatePanels(7);
  const weeklyDigest = updatePanels.weeklyDigest;
  const signalFlow = updatePanels.signalFlow;

  return (
    <>
      <SystemStatusBar />

      <main className="pt-10">
        <section className="min-h-[60vh] flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
              <div>
                <p
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-6"
                  data-en="PROJECT_05 // SHIFT ATLAS"
                  data-zh="PROJECT_05 // SHIFT ATLAS"
                >
                  PROJECT_05 // SHIFT ATLAS
                </p>
                <h1
                  className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] text-text-primary leading-tight mb-6"
                  data-en="AI Product Design Atlas"
                  data-zh="AI产品设计图谱"
                >
                  AI Product Design Atlas
                </h1>
                <p
                  className="font-[family-name:var(--font-body)] text-[length:var(--text-base)] text-text-secondary max-w-3xl mb-6"
                  data-en="A working map for seeing where an AI product question really belongs, how far it spreads, and where it should be narrowed back down."
                  data-zh="一张用来看清 AI 产品问题真正落在哪、会向哪里延展，以及最后该收束回哪里的工作地图。"
                >
                  A working map for seeing where an AI product question really belongs, how far it
                  spreads, and where it should be narrowed back down.
                </p>
                <div className="flex flex-wrap gap-3 font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-tertiary">
                  <span
                    className="border border-line-pixel px-3 py-2 bg-bg-secondary"
                    data-en="Trace how the question spreads"
                    data-zh="先看问题会往哪扩"
                  >
                    Trace how the question spreads
                  </span>
                  <span
                    className="border border-line-pixel px-3 py-2 bg-bg-secondary"
                    data-en="Anchor it in the right layer"
                    data-zh="再把它放回正确层级"
                  >
                    Anchor it in the right layer
                  </span>
                  <span
                    className="border border-line-pixel px-3 py-2 bg-bg-secondary"
                    data-en="Narrow before designing"
                    data-zh="最后再进入方案"
                  >
                    Narrow before designing
                  </span>
                </div>
              </div>

              <div className="bg-bg-secondary border-2 border-line-pixel p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-4"
                  data-en="WHAT THIS PAGE HELPS WITH"
                  data-zh="这个页面帮你什么"
                >
                  WHAT THIS PAGE HELPS WITH
                </p>
                <div className="space-y-4 text-[14px] leading-relaxed text-text-secondary">
                  {structuralShifts.map((item) => (
                    <p key={item.en} data-en={item.en} data-zh={item.zh}>
                      {item.en}
                    </p>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-line-pixel flex flex-wrap gap-4">
                  <Link
                    href="#map"
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary hover:text-red-bright transition-colors"
                    data-en="→ OPEN THE MAP"
                    data-zh="→ 进入图谱"
                  >
                    → OPEN THE MAP
                  </Link>
                  <Link
                    href="/shift-atlas/wiki"
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
                    data-en="WIKI HUB"
                    data-zh="WIKI HUB"
                  >
                    WIKI HUB
                  </Link>
                </div>
              </div>
            </div>

            <nav className="mt-12 border-2 border-line-pixel bg-bg-secondary/80 backdrop-blur-sm shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
              <div className="flex flex-wrap gap-3 px-4 py-4 font-[family-name:var(--font-pixel)] text-[10px]">
                <a href="#map" className="border border-line-pixel px-3 py-2 text-red-primary hover:text-red-bright transition-colors" data-en="MAP" data-zh="地图">
                  <span data-en="MAP" data-zh="地图">MAP</span>
                </a>
                <a href="#signals" className="border border-line-pixel px-3 py-2 text-red-primary hover:text-red-bright transition-colors" data-en="UPDATES" data-zh="更新">
                  <span data-en="UPDATES" data-zh="更新">UPDATES</span>
                </a>
                <Link href="/shift-atlas/wiki" className="border border-line-pixel px-3 py-2 text-red-primary hover:text-red-bright transition-colors" data-en="WIKI" data-zh="词条">
                  <span data-en="WIKI" data-zh="词条">WIKI</span>
                </Link>
              </div>
            </nav>
          </div>
        </section>

        <PixelDivider />

        <section id="map" className="py-16 lg:py-24 scroll-mt-24">
          <div className="max-w-[1500px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">000</span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">{'//'}</span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="KNOWLEDGE MAP"
                data-zh="信息地图"
              >
                KNOWLEDGE MAP
              </h2>
            </div>
            <p
              className="text-text-secondary mb-8 max-w-4xl"
              data-en="Treat the graph as a positioning surface. It helps you see which layers a product question spills into, and where it should finally land."
              data-zh="把图谱当成定位界面来用。它帮你看清同一个产品问题会跨过哪些层，最后又该落回哪里。"
            >
              Treat the graph as a positioning surface. It helps you see which layers a product
              question spills into, and where it should finally land.
            </p>
            <KnowledgeMap domains={shiftAtlasKnowledgeDomains} />
          </div>
        </section>

        <PixelDivider />

        <section id="signals" className="py-16 lg:py-24 scroll-mt-24">
          <div className="max-w-[1500px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">001</span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">{'//'}</span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="UPDATES"
                data-zh="更新面板"
              >
                UPDATES
              </h2>
            </div>
            <p
              className="text-text-secondary mb-8 max-w-4xl"
              data-en="The update panels keep the atlas alive. One summarizes what changed this week. The other lets you inspect raw new signals before they become stable terms, cases, or design rules."
              data-zh="更新面板用来让图谱保持活着。一块总结这周发生了什么，另一块让你先检查还没沉淀成词条、案例或设计规则的新信号。"
            >
              The update panels keep the atlas alive. One summarizes what changed this week. The
              other lets you inspect raw new signals before they become stable terms, cases, or
              design rules.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8">
              <div className="border-2 border-line-pixel bg-bg-secondary p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p
                      className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-2"
                      data-en="WEEKLY DIGEST"
                      data-zh="本周新信息汇总"
                    >
                      WEEKLY DIGEST
                    </p>
                    <p
                      className="text-text-secondary text-sm max-w-2xl"
                      data-en="A weekly readout of the changes that matter most, grouped by the part of the atlas they are most likely to change."
                      data-zh="把这周最值得看的变化按最可能被改写的那一层归拢起来，方便你先看清哪里真的动了。"
                    >
                      A weekly readout of the changes that matter most, grouped by the part of the
                      atlas they are most likely to change.
                    </p>
                  </div>
                  <span
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary border border-line-pixel px-3 py-2"
                    data-en={`${weeklyDigest.length} domains`}
                    data-zh={`${weeklyDigest.length} 个领域`}
                  >
                    {weeklyDigest.length} domains
                  </span>
                </div>

                <div className="space-y-4">
                  {weeklyDigest.length === 0 ? (
                    <div
                      className="border border-line-pixel bg-bg-primary/50 p-4 text-text-secondary"
                      data-en="No new updates were captured in the last 7 days."
                      data-zh="最近 7 天还没有抓到新的更新。"
                    >
                      No new updates were captured in the last 7 days.
                    </div>
                  ) : null}

                  {weeklyDigest.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block border border-line-pixel bg-bg-primary/50 p-4 hover:border-red-primary transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <span
                          className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary border border-line-pixel px-2 py-1"
                          data-en={item.domainTitle}
                          data-zh={item.domainTitleZh}
                        >
                          {item.domainTitle}
                        </span>
                        <span
                          className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary"
                          data-en={`${item.confirmedCount} confirmed / ${item.candidateCount} candidate`}
                          data-zh={`${item.confirmedCount} 条确认 / ${item.candidateCount} 条候选`}
                        >
                          {item.confirmedCount} confirmed / {item.candidateCount} candidate
                        </span>
                      </div>
                      <h3
                        className="text-text-primary text-xl mb-2"
                        data-en={item.title}
                        data-zh={item.titleZh}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-text-secondary leading-relaxed"
                        data-en={item.summary}
                        data-zh={item.summaryZh}
                      >
                        {item.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-2 border-line-pixel bg-bg-secondary p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p
                      className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-2"
                      data-en="SIGNAL FLOW"
                      data-zh="新信号流动"
                    >
                      SIGNAL FLOW
                    </p>
                    <p
                      className="text-text-secondary text-sm max-w-2xl"
                      data-en="Fresh items from live sources, placed in the domain they are most likely to affect. Use this stream to decide whether something deserves a case, a term rewrite, or only a note."
                      data-zh="把实时来源里的新条目先放到最可能受影响的领域里，方便你判断它该补案例、改词条，还是先只记成信号。"
                    >
                      Fresh items from live sources, placed in the domain they are most likely to
                      affect. Use this stream to decide whether something deserves a case, a term
                      rewrite, or only a note.
                    </p>
                  </div>
                  <span
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary border border-line-pixel px-3 py-2"
                    data-en={`${signalFlow.length} tracked signals`}
                    data-zh={`${signalFlow.length} 条信号`}
                  >
                    {signalFlow.length} tracked signals
                  </span>
                </div>

                <div className="space-y-3">
                  {signalFlow.length === 0 ? (
                    <div
                      className="border border-line-pixel bg-bg-primary/50 p-4 text-text-secondary"
                      data-en="No fresh signal items are available yet."
                      data-zh="现在还没有值得展示的新信号。"
                    >
                      No fresh signal items are available yet.
                    </div>
                  ) : null}

                  {signalFlow.map((signal) => {
                    const content = (
                      <div className="block border border-line-pixel bg-bg-primary/50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary"
                              data-en={signal.domainTitle}
                              data-zh={signal.domainTitleZh}
                            >
                              {signal.domainTitle}
                            </span>
                            <span
                              className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary border border-line-pixel px-2 py-1"
                              data-en={`${signal.relatedArticles.length} related articles`}
                              data-zh={`${signal.relatedArticles.length} 篇关联文章`}
                            >
                              {signal.relatedArticles.length} related articles
                            </span>
                            <span
                              className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm border border-line-pixel px-2 py-1"
                              data-en={signal.status}
                              data-zh={signal.statusZh}
                            >
                              {signal.status}
                            </span>
                          </div>
                          <span
                            className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary"
                            data-en={signal.publishedLabel}
                            data-zh={signal.publishedLabelZh}
                          >
                            {signal.publishedLabel}
                          </span>
                        </div>
                        <h3
                          className="text-text-primary text-lg mb-2"
                          data-en={signal.title}
                          data-zh={signal.titleZh}
                        >
                          {signal.title}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p
                              className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary mb-1"
                              data-en="MAIN POINT"
                              data-zh="主要观点"
                            >
                              MAIN POINT
                            </p>
                            <p
                              className="text-text-secondary leading-relaxed"
                              data-en={signal.mainPoint}
                              data-zh={signal.mainPointZh}
                            >
                              {signal.mainPoint}
                            </p>
                          </div>
                          <div>
                            <p
                              className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary mb-1"
                              data-en="CORE CONTENT"
                              data-zh="核心内容"
                            >
                              CORE CONTENT
                            </p>
                            <p
                              className="text-text-secondary leading-relaxed"
                              data-en={signal.coreContent}
                              data-zh={signal.coreContentZh}
                            >
                              {signal.coreContent}
                            </p>
                          </div>
                        </div>
                        <p
                          className="mt-3 text-text-tertiary text-sm leading-relaxed"
                          data-en={signal.whyItMatters}
                          data-zh={signal.whyItMattersZh}
                        >
                          {signal.whyItMatters}
                        </p>
                        <div className="mt-4 border-t border-line-pixel pt-4">
                          <p
                            className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary mb-2"
                            data-en="RELATED ARTICLES"
                            data-zh="关联文章"
                          >
                            RELATED ARTICLES
                          </p>
                          <div className="space-y-2">
                            {signal.relatedArticles.map((article) => {
                              const articleContent = (
                                <div className="border border-line-pixel px-3 py-2 hover:border-red-primary transition-colors">
                                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                    <span
                                      className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary"
                                      data-en={article.sourceName}
                                      data-zh={article.sourceNameZh}
                                    >
                                      {article.sourceName}
                                    </span>
                                    <span
                                      className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary"
                                      data-en={article.publishedLabel}
                                      data-zh={article.publishedLabelZh}
                                    >
                                      {article.publishedLabel}
                                    </span>
                                  </div>
                                  <p className="text-text-secondary text-sm leading-relaxed">
                                    {article.title}
                                  </p>
                                </div>
                              );

                              return isExternalHref(article.href) ? (
                                <a
                                  key={`${signal.id}-${article.href}`}
                                  href={article.href}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {articleContent}
                                </a>
                              ) : (
                                <Link key={`${signal.id}-${article.href}`} href={article.href}>
                                  {articleContent}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <p
                          className="mt-3 font-[family-name:var(--font-pixel)] text-[10px] text-green-calm"
                          data-en={signal.action}
                          data-zh={signal.actionZh}
                        >
                          {signal.action}
                        </p>
                      </div>
                    );

                    return <div key={signal.id}>{content}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

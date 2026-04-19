import Link from 'next/link';
import { SystemStatusBar } from '@/components/layout';
import { Footer } from '@/components/sections';
import { PixelDivider } from '@/components/pixel';
import { shiftAtlasConceptPagesBySlug } from '@/lib/shift-atlas/data';
import {
  shiftAtlasEncyclopediaBenchmark,
  shiftAtlasWikiDrafts,
  shiftAtlasWikiFlow,
  shiftAtlasReplacementPlan,
  shiftAtlasWikiTemplate,
} from '@/lib/shift-atlas/wiki';

export default function ShiftAtlasWikiPage() {
  const draft = shiftAtlasWikiDrafts[0];
  const relatedConcepts = draft.nextConceptSlugs
    .map((slug) => shiftAtlasConceptPagesBySlug[slug])
    .filter(Boolean);

  return (
    <>
      <SystemStatusBar />

      <main className="pt-10">
        <section className="min-h-[72vh] flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
              <div>
                <p
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-6"
                  data-en="SHIFT ATLAS // WIKI HUB"
                  data-zh="SHIFT ATLAS // WIKI HUB"
                >
                  SHIFT ATLAS // WIKI HUB
                </p>
                <h1
                  className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] text-text-primary leading-tight mb-6"
                  data-en="The writing desk behind the atlas."
                  data-zh="图谱背后的写作台。"
                >
                  The writing desk behind the atlas.
                </h1>
                <p
                  className="font-[family-name:var(--font-body)] text-[length:var(--text-base)] text-text-secondary max-w-3xl mb-6"
                  data-en="This page is where the atlas gets written. Finish the main entry first, split only the subterms that are stable enough to stand alone, then send the finished terms back into the graph."
                  data-zh="这一页是图谱真正开始写成内容的地方。先把主词条写完整，只拆那些已经稳定到可以独立成立的子词条，最后再把写完的内容回填回图谱。"
                >
                  This page is where the atlas gets written. Finish the main entry first, split
                  only the subterms that are stable enough to stand alone, then send the finished
                  terms back into the graph.
                </p>
                <div className="flex flex-wrap gap-3 font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-tertiary">
                  <span className="border border-line-pixel px-3 py-2 bg-bg-secondary" data-en="Write the main entry first" data-zh="先把主词条写完整">
                    Write the main entry first
                  </span>
                  <span className="border border-line-pixel px-3 py-2 bg-bg-secondary" data-en="Split only stable subterms" data-zh="只拆稳定的子词条">
                    Split only stable subterms
                  </span>
                  <span className="border border-line-pixel px-3 py-2 bg-bg-secondary" data-en="Send the finished terms back" data-zh="把写完的内容回填回去">
                    Send the finished terms back
                  </span>
                </div>
                <div className="mt-6">
                  <Link
                    href="#replacement-plan"
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary hover:text-red-bright transition-colors"
                  >
                    VIEW REPLACEMENT PLAN →
                  </Link>
                </div>
              </div>

              <div className="bg-bg-secondary border-2 border-line-pixel p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-4"
                  data-en="WRITING ORDER"
                  data-zh="写作顺序"
                >
                  WRITING ORDER
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-primary">
                      01
                    </p>
                    <p className="text-text-secondary" data-en="Choose the term that should carry the whole page" data-zh="先选那个值得承载整页内容的词">
                      Choose the term that should carry the whole page
                    </p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-primary">
                      02
                    </p>
                    <p className="text-text-secondary" data-en="List the related terms, but split only the ones that can stand on their own" data-zh="先列相关词，再只拆那些能独立成立的词">
                      List the related terms, but split only the ones that can stand on their own
                    </p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-primary">
                      03
                    </p>
                    <p className="text-text-secondary" data-en="Turn the durable ones into full entries" data-zh="把真正稳定的概念写成完整词条">
                      Turn the durable ones into full entries
                    </p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-primary">
                      04
                    </p>
                    <p className="text-text-secondary" data-en="Send the finished entry back into the atlas" data-zh="把写完的词条送回图谱">
                      Send the finished entry back into the atlas
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-line-pixel">
                  <Link
                    href="/shift-atlas"
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary hover:text-red-bright transition-colors"
                  >
                    ← BACK TO ATLAS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PixelDivider />

        <section className="py-16 lg:py-24" id="replacement-plan">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">001</span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">{'//'}</span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="REPLACEMENT PLAN"
                data-zh="替换计划"
              >
                REPLACEMENT PLAN
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {shiftAtlasReplacementPlan.map((phase) => (
                <article
                  key={phase.title}
                  className="border border-line-pixel bg-bg-secondary p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary">
                      {phase.statusZh}
                    </p>
                    <span className="border border-line-subtle px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary">
                      {phase.status.toUpperCase()}
                    </span>
                  </div>
                  <h3
                    className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-text-primary mb-2"
                    data-en={phase.title}
                    data-zh={phase.titleZh}
                  >
                    {phase.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed text-text-secondary"
                    data-en={phase.detail}
                    data-zh={phase.detailZh}
                  >
                    {phase.detail}
                  </p>
                  <div className="mt-4 border-t border-line-subtle pt-3">
                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="border border-line-subtle bg-[rgba(10,8,16,0.35)] px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-text-secondary"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PixelDivider />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">002</span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">{'//'}</span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="ENTRY TEMPLATE"
                data-zh="词条模板"
              >
                ENTRY TEMPLATE
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
              <article className="border-2 border-line-pixel bg-bg-secondary p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <p className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-warm mb-3">
                  PROMPT
                </p>
                <p className="text-[14px] leading-relaxed text-text-secondary" data-en={shiftAtlasWikiTemplate.prompt} data-zh={shiftAtlasWikiTemplate.promptZh}>
                  {shiftAtlasWikiTemplate.prompt}
                </p>
                <div className="mt-6 border-t border-line-pixel pt-5">
                  <p className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-3">
                    REQUIRED SECTIONS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {shiftAtlasWikiTemplate.requiredSections.map((section) => (
                      <span key={section} className="border border-line-pixel bg-[rgba(10,8,16,0.35)] px-3 py-2 font-[family-name:var(--font-pixel)] text-[8px] text-text-secondary">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              <aside className="space-y-4">
                <div className="border border-line-pixel bg-bg-secondary p-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-red-primary mb-3"
                    data-en="WRITING RULES"
                    data-zh="写作规则"
                  >
                    WRITING RULES
                  </p>
                  <div className="space-y-3">
                    {shiftAtlasWikiTemplate.rules.map((rule, index) => (
                      <div key={rule} className="border border-line-subtle px-4 py-3">
                        <p className="font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary mb-2">
                          0{index + 1}
                        </p>
                        <p className="text-[13px] leading-relaxed text-text-secondary">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <PixelDivider />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">003</span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">{'//'}</span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="REVIEW CHECKLIST"
                data-zh="验收清单"
              >
                REVIEW CHECKLIST
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
              <article className="border-2 border-line-pixel bg-bg-secondary p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <p className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-warm mb-3">
                  BENCHMARK
                </p>
                <p
                  className="text-[14px] leading-relaxed text-text-secondary"
                  data-en={shiftAtlasEncyclopediaBenchmark.intro}
                  data-zh={shiftAtlasEncyclopediaBenchmark.introZh}
                >
                  {shiftAtlasEncyclopediaBenchmark.intro}
                </p>
                <div className="mt-6 pt-5 border-t border-line-pixel">
                  <p className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-3">
                    CRITERIA
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {shiftAtlasEncyclopediaBenchmark.criteria.map((criterion) => (
                      <div key={criterion.id} className="border border-line-subtle px-4 py-3">
                        <p className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary mb-2">
                          {criterion.title}
                        </p>
                        <p className="text-[13px] leading-relaxed text-text-secondary" data-en={criterion.question} data-zh={criterion.questionZh}>
                          {criterion.question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <aside className="space-y-4">
                <div className="border border-line-pixel bg-bg-secondary p-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-red-primary mb-3"
                    data-en="HOW TO SCORE"
                    data-zh="怎么打分"
                  >
                    HOW TO SCORE
                  </p>
                  <p className="text-[13px] leading-relaxed text-text-secondary" data-en={shiftAtlasEncyclopediaBenchmark.scoring} data-zh={shiftAtlasEncyclopediaBenchmark.scoringZh}>
                    {shiftAtlasEncyclopediaBenchmark.scoring}
                  </p>
                  <div className="mt-4 pt-4 border-t border-line-subtle text-[13px] leading-relaxed text-text-secondary">
                    <p data-en={shiftAtlasEncyclopediaBenchmark.passThreshold} data-zh={shiftAtlasEncyclopediaBenchmark.passThresholdZh}>
                      {shiftAtlasEncyclopediaBenchmark.passThreshold}
                    </p>
                  </div>
                </div>

                <div className="border border-line-pixel bg-bg-secondary p-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-warm mb-3"
                    data-en="REVIEW QUESTIONS"
                    data-zh="检查问题"
                  >
                    REVIEW QUESTIONS
                  </p>
                  <div className="space-y-3">
                    {shiftAtlasEncyclopediaBenchmark.reviewQuestions.map((question, index) => (
                      <div key={question} className="border border-line-subtle px-4 py-3">
                        <p className="font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary mb-2">
                          0{index + 1}
                        </p>
                        <p className="text-[13px] leading-relaxed text-text-secondary" data-en={question} data-zh={shiftAtlasEncyclopediaBenchmark.reviewQuestionsZh[index]}>
                          {question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-line-pixel bg-bg-secondary p-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-3"
                    data-en="WHAT TO WATCH FOR"
                    data-zh="警惕这些问题"
                  >
                    WHAT TO WATCH FOR
                  </p>
                  <div className="space-y-3">
                    {shiftAtlasEncyclopediaBenchmark.redFlags.map((flag, index) => (
                      <div key={flag} className="border border-line-subtle px-4 py-3">
                        <p className="font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary mb-2">
                          0{index + 1}
                        </p>
                        <p className="text-[13px] leading-relaxed text-text-secondary" data-en={flag} data-zh={shiftAtlasEncyclopediaBenchmark.redFlagsZh[index]}>
                          {flag}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-line-pixel bg-bg-secondary p-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-red-primary mb-3"
                    data-en="QUICK LINK"
                    data-zh="快速入口"
                  >
                    QUICK LINK
                  </p>
                  <Link
                    href="#encyclopedia-template"
                    className="text-[13px] leading-relaxed text-text-secondary hover:text-red-primary transition-colors"
                    data-en="Jump to the template and prompt."
                    data-zh="跳到模板和 prompt。"
                  >
                    Jump to the template and prompt.
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <PixelDivider />

        <section className="py-16 lg:py-24" id="current-draft">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">004</span>
              <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">{'//'}</span>
              <h2
                className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
                data-en="CURRENT ENTRY"
                data-zh="当前词条"
              >
                CURRENT ENTRY
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
              <article className="border-2 border-line-pixel bg-bg-secondary p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p
                      className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-warm mb-2"
                      data-en={draft.status}
                      data-zh={draft.statusZh}
                    >
                      {draft.status}
                    </p>
                    <h3
                      className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-tight text-text-primary"
                      data-en={draft.title}
                      data-zh={draft.titleZh}
                    >
                      {draft.title}
                    </h3>
                  </div>
                  <Link
                    href={`/shift-atlas/concepts/${draft.nextConceptSlugs[0]}`}
                    className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary hover:text-red-bright transition-colors"
                    data-en="OPEN RELATED ENTRY"
                    data-zh="打开相关词条"
                  >
                    OPEN RELATED ENTRY
                  </Link>
                </div>

                <p
                  className="text-text-secondary leading-relaxed mb-5"
                  data-en={draft.summary}
                  data-zh={draft.summaryZh}
                >
                  {draft.summary}
                </p>

                <div className="border border-line-pixel bg-[rgba(10,8,16,0.35)] p-4 mb-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-green-calm mb-2"
                    data-en="CURRENT FOCUS"
                    data-zh="当前重点"
                  >
                    CURRENT FOCUS
                  </p>
                  <p
                    className="text-[13px] leading-relaxed text-text-secondary"
                    data-en={draft.focus}
                    data-zh={draft.focusZh}
                  >
                    {draft.focus}
                  </p>
                </div>

                <div>
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-red-primary mb-3"
                    data-en="NEXT TERMS TO WRITE"
                    data-zh="下一批继续写的词条"
                  >
                    NEXT TERMS TO WRITE
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {relatedConcepts.map((concept) => (
                      <Link
                        key={concept.slug}
                        href={`/shift-atlas/concepts/${concept.slug}`}
                        className="border border-line-pixel bg-[rgba(10,8,16,0.26)] px-4 py-3 hover:border-red-primary transition-colors"
                      >
                        <h4
                          className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-text-primary"
                          data-en={concept.title}
                          data-zh={concept.titleZh}
                        >
                          {concept.title}
                        </h4>
                        <p
                          className="mt-2 text-[13px] leading-relaxed text-text-secondary"
                          data-en={concept.shortSummary}
                          data-zh={concept.shortSummaryZh}
                        >
                          {concept.shortSummary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>

              <aside className="space-y-6">
                <section className="border border-line-pixel bg-bg-secondary p-5">
                  <p
                    className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-warm mb-3"
                    data-en="SOURCE MATERIAL"
                    data-zh="参考材料"
                  >
                    SOURCE MATERIAL
                  </p>
                  <div className="space-y-3">
                    {draft.sourceLinks.map((source) => (
                      <a
                        key={source.title}
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block border border-line-subtle px-4 py-3 hover:border-red-primary transition-colors"
                      >
                        <h4
                          className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-text-primary"
                          data-en={source.title}
                          data-zh={source.titleZh}
                        >
                          {source.title}
                        </h4>
                        <p
                          className="mt-2 text-[13px] leading-relaxed text-text-secondary"
                          data-en={source.summary}
                          data-zh={source.summaryZh}
                        >
                          {source.summary}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

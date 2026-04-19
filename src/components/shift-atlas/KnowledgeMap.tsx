'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  axisXLegend,
  axisXOrder,
  axisYLegend,
  axisYOrder,
  getVisibleSections,
} from '@/lib/shift-atlas/domain';
import type { ShiftAtlasKnowledgeDomain } from '@/lib/shift-atlas/types';

type GraphEdge = {
  source: string;
  target: string;
  score: number;
};

const axisXPositions = ['18%', '40%', '62%', '84%'] as const;
const axisYPositions = ['20%', '50%', '80%'] as const;

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function scoreDomainRelation(a: ShiftAtlasKnowledgeDomain, b: ShiftAtlasKnowledgeDomain) {
  const tagsA = a.focusTags ?? [];
  const tagsB = b.focusTags ?? [];
  const sharedTags = unique(tagsA.filter((tag) => tagsB.includes(tag)));

  let score = sharedTags.length;

  if (a.axisX && b.axisX && a.axisX === b.axisX) {
    score += 1;
  }

  if (a.axisY && b.axisY && a.axisY === b.axisY) {
    score += 1;
  }

  return score;
}

function buildEdges(domains: ShiftAtlasKnowledgeDomain[]) {
  const edges: GraphEdge[] = [];

  for (let i = 0; i < domains.length; i += 1) {
    for (let j = i + 1; j < domains.length; j += 1) {
      const score = scoreDomainRelation(domains[i], domains[j]);

      if (score >= 2) {
        edges.push({
          source: domains[i].id,
          target: domains[j].id,
          score,
        });
      }
    }
  }

  return edges.sort((a, b) => b.score - a.score).slice(0, 18);
}

function getDomainPreviewItems(domain: ShiftAtlasKnowledgeDomain) {
  return getVisibleSections(domain)
    .flatMap((section) => section.items)
    .filter((item) => item.itemType !== 'source')
    .slice(0, 4);
}

function NodeCard({
  domain,
  active,
  muted,
  onHover,
  onLeave,
}: {
  domain: ShiftAtlasKnowledgeDomain;
  active: boolean;
  muted: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const nodeSize = domain.size === 'xl' ? 152 : 132;

  return (
    <Link
      href={`/shift-atlas/domains/${domain.id}`}
      onMouseEnter={() => onHover(domain.id)}
      onFocus={() => onHover(domain.id)}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      className={[
        'group absolute z-10 -translate-x-1/2 -translate-y-1/2',
        muted ? 'opacity-20' : 'opacity-100',
      ].join(' ')}
      style={{
        left: `${domain.x}%`,
        top: `${domain.y}%`,
      }}
      aria-label={`${domain.title} - open full-page domain view`}
    >
      <div className="flex flex-col items-center">
        <div
          className={[
            'relative flex items-center justify-center rounded-full border-2 transition-all duration-200',
            active
              ? 'border-red-primary shadow-[0_0_0_3px_rgba(232,136,122,0.18)] scale-[1.06]'
              : 'border-line-pixel',
            !muted ? 'group-hover:scale-[1.06]' : '',
          ].join(' ')}
          style={{
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
            background: active
              ? 'radial-gradient(circle at 30% 30%, rgba(232,136,122,0.32), rgba(18,16,24,0.96) 72%)'
              : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), rgba(18,16,24,0.96) 72%)',
          }}
        >
          <span
            className="max-w-[85%] px-3 text-center font-[family-name:var(--font-display)] text-[16px] leading-[1.05] text-text-primary break-words whitespace-normal"
            data-en={domain.title}
            data-zh={domain.titleZh}
          >
            {domain.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

function EdgeLine({
  source,
  target,
  score,
  focused,
  muted,
}: {
  source: ShiftAtlasKnowledgeDomain;
  target: ShiftAtlasKnowledgeDomain;
  score: number;
  focused: boolean;
  muted: boolean;
}) {
  const x1 = source.x * 10;
  const y1 = source.y * 10;
  const x2 = target.x * 10;
  const y2 = target.y * 10;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(232,136,122,1)"
      strokeOpacity={muted ? 0.06 : focused ? 0.78 : 0.12 + score * 0.05}
      strokeWidth={focused ? 2.5 : score >= 3 ? 2 : 1.2}
      strokeDasharray={score === 2 ? '8 8' : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function GraphCanvas({
  domains,
  hoveredDomainId,
  onHover,
  onLeave,
}: {
  domains: ShiftAtlasKnowledgeDomain[];
  hoveredDomainId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const edges = buildEdges(domains);
  const focusedDomain = hoveredDomainId
    ? domains.find((domain) => domain.id === hoveredDomainId) ?? null
    : null;

  const relationIds = new Set<string>();
  if (focusedDomain) {
    relationIds.add(focusedDomain.id);
    for (const edge of edges) {
      if (edge.source === focusedDomain.id) {
        relationIds.add(edge.target);
      }
      if (edge.target === focusedDomain.id) {
        relationIds.add(edge.source);
      }
    }
  }

  return (
    <div className="relative min-h-[840px] overflow-hidden border-2 border-line-pixel bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_70%_25%,rgba(232,136,122,0.08),transparent_20%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,auto,48px_48px,48px_48px]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,8,16,0.12),rgba(10,8,16,0.74))]" />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute left-[12%] right-[6%] bottom-[8%] border-t border-line-pixel/50" />
        <div className="absolute left-[12%] top-[10%] bottom-[8%] border-l border-line-pixel/50" />

        <div className="absolute left-[12%] bottom-[8%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="inline-flex items-center border border-line-pixel bg-bg-primary/90 px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-red-primary"
            data-en="X AXIS"
            data-zh="横轴"
          >
            X
          </span>
        </div>

        <div className="absolute left-[12%] top-[10%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="inline-flex items-center border border-line-pixel bg-bg-primary/90 px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-red-primary"
            data-en="Y AXIS"
            data-zh="纵轴"
          >
            Y
          </span>
        </div>

        {axisXOrder.map((key, index) => {
          const axis = axisXLegend[key];

          return (
            <div
              key={key}
              className="absolute bottom-[3.25rem] -translate-x-1/2"
              style={{ left: axisXPositions[index] }}
            >
              <div className="mx-auto mb-1 h-3 w-px bg-line-pixel/70" />
              <span
                className="inline-flex max-w-[120px] items-center justify-center border border-line-pixel bg-bg-primary/90 px-2 py-1 text-center font-[family-name:var(--font-pixel)] text-[8px] leading-tight text-text-primary"
                data-en={axis.label.en}
                data-zh={axis.label.zh}
              >
                {axis.label.en}
              </span>
            </div>
          );
        })}

        {axisYOrder.map((key, index) => {
          const axis = axisYLegend[key];

          return (
            <div
              key={key}
              className="absolute left-[2.5%] -translate-y-1/2"
              style={{ top: axisYPositions[index] }}
            >
              <div className="mb-1 h-px w-3 bg-line-pixel/70" />
              <span
                className="inline-flex max-w-[96px] items-center justify-end border border-line-pixel bg-bg-primary/90 px-2 py-1 text-right font-[family-name:var(--font-pixel)] text-[8px] leading-tight text-text-primary"
                data-en={axis.label.en}
                data-zh={axis.label.zh}
              >
                {axis.label.en}
              </span>
            </div>
          );
        })}
      </div>

      <div className="absolute left-4 top-4 z-20 max-w-md border border-line-pixel bg-bg-primary/88 px-4 py-3 backdrop-blur-sm">
        <p
          className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-1"
          data-en="MAP GUIDE"
          data-zh="地图说明"
        >
          MAP GUIDE
        </p>
        <p
          className="text-[13px] leading-relaxed text-text-secondary"
          data-en="Each circle stands for one field. Hover to see what it is about. Click to enter the full page and keep reading."
          data-zh="每个圆点代表一个领域。悬停先看它在处理什么问题，点击再进全页继续读。"
        >
          Each circle stands for one field. Hover to see what it is about. Click to enter the full
          page and keep reading.
        </p>
      </div>

      <div className="absolute right-4 top-4 z-20 max-w-xs border border-line-pixel bg-bg-primary/88 px-4 py-3 backdrop-blur-sm">
        {focusedDomain ? (
          <>
            <p
              className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-1"
              data-en="CURRENT FIELD"
              data-zh="当前领域"
            >
              CURRENT FIELD
            </p>
            <h3
              className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-text-primary"
              data-en={focusedDomain.title}
              data-zh={focusedDomain.titleZh}
            >
              {focusedDomain.title}
            </h3>
            <p
              className="mt-2 text-[13px] leading-relaxed text-text-secondary"
              data-en={focusedDomain.summary}
              data-zh={focusedDomain.summaryZh}
            >
              {focusedDomain.summary}
            </p>
            {focusedDomain.entryPrimer?.coreProblems ? (
              <div className="mt-3 border-t border-line-pixel/50 pt-3">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[8px] text-amber-warm mb-2"
                  data-en="CORE PROBLEM"
                  data-zh="核心问题"
                >
                  CORE PROBLEM
                </p>
                <p
                  className="text-[12px] leading-relaxed text-text-secondary"
                  data-en={focusedDomain.entryPrimer.coreProblems}
                  data-zh={focusedDomain.entryPrimer.coreProblemsZh}
                >
                  {focusedDomain.entryPrimer.coreProblems}
                </p>
              </div>
            ) : null}
            {focusedDomain.entryPrimer?.whyNow ? (
              <div className="mt-3">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[8px] text-green-calm mb-2"
                  data-en="WHY NOW"
                  data-zh="为什么现在"
                >
                  WHY NOW
                </p>
                <p
                  className="text-[12px] leading-relaxed text-text-secondary"
                  data-en={focusedDomain.entryPrimer.whyNow}
                  data-zh={focusedDomain.entryPrimer.whyNowZh}
                >
                  {focusedDomain.entryPrimer.whyNow}
                </p>
              </div>
            ) : null}
            {focusedDomain.entryPrimer?.consensus ? (
              <div className="mt-3">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary mb-2"
                  data-en="CONSENSUS"
                  data-zh="共识"
                >
                  CONSENSUS
                </p>
                <p
                  className="text-[12px] leading-relaxed text-text-secondary"
                  data-en={focusedDomain.entryPrimer.consensus}
                  data-zh={focusedDomain.entryPrimer.consensusZh}
                >
                  {focusedDomain.entryPrimer.consensus}
                </p>
              </div>
            ) : null}
            {focusedDomain.tagline ? (
              <p
                className="mt-3 border-t border-line-pixel/50 pt-3 text-[12px] leading-relaxed text-text-primary"
                data-en={focusedDomain.tagline}
                data-zh={focusedDomain.taglineZh ?? focusedDomain.tagline}
              >
                {focusedDomain.tagline}
              </p>
            ) : null}
            <p
              className="mt-3 text-[12px] leading-relaxed text-text-secondary"
              data-en={focusedDomain.productLens}
              data-zh={focusedDomain.productLensZh}
            >
              {focusedDomain.productLens}
            </p>
            <p
              className="mt-3 text-[11px] leading-relaxed text-text-tertiary"
              data-en={focusedDomain.curationRule}
              data-zh={focusedDomain.curationRuleZh}
            >
              {focusedDomain.curationRule}
            </p>
            {getDomainPreviewItems(focusedDomain).length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {getDomainPreviewItems(focusedDomain).map((item) => (
                  <span
                    key={item.id}
                    className="border border-line-pixel bg-bg-secondary px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-text-secondary"
                    data-en={item.label}
                    data-zh={item.labelZh}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            ) : null}
            {focusedDomain.caseStudies?.length ? (
              <div className="mt-3 border-t border-line-pixel/50 pt-3">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[8px] text-amber-warm mb-2"
                  data-en="CASE STUDIES"
                  data-zh="案例"
                >
                  CASE STUDIES
                </p>
                <div className="space-y-2">
                  {focusedDomain.caseStudies.slice(0, 2).map((caseStudy) => (
                    <div key={caseStudy.id} className="border border-line-pixel/60 bg-bg-secondary/60 px-3 py-2">
                      <p
                        className="text-[11px] leading-tight text-text-primary mb-1"
                        data-en={caseStudy.product}
                        data-zh={caseStudy.productZh}
                      >
                        {caseStudy.product}
                      </p>
                      <p
                        className="text-[11px] leading-relaxed text-text-secondary"
                        data-en={caseStudy.lesson}
                        data-zh={caseStudy.lessonZh}
                      >
                        {caseStudy.lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {focusedDomain.timeline?.length ? (
              <div className="mt-3 border-t border-line-pixel/50 pt-3">
                <p
                  className="font-[family-name:var(--font-pixel)] text-[8px] text-text-tertiary mb-2"
                  data-en="TIMELINE"
                  data-zh="时间线"
                >
                  TIMELINE
                </p>
                <div className="space-y-2">
                  {focusedDomain.timeline.slice(0, 2).map((milestone) => (
                    <div key={milestone.id} className="text-[11px] leading-relaxed text-text-secondary">
                      <span className="text-red-primary font-[family-name:var(--font-pixel)] mr-2">
                        {milestone.year}
                      </span>
                      <span data-en={milestone.title} data-zh={milestone.titleZh}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <p
              className="font-[family-name:var(--font-pixel)] text-[10px] text-green-calm mb-1"
              data-en="HOW TO READ"
              data-zh="怎么读这张图"
            >
              HOW TO READ
            </p>
            <p
              className="text-[13px] leading-relaxed text-text-secondary"
              data-en="Use the map to place the question first. When you hover a field, the panel tells you what kind of problem it handles, why it matters now, and which cases or topics represent it."
              data-zh="先用图把问题放到合适的位置。悬停某个领域时，右侧会告诉你它在处理哪类问题、为什么现在值得看，以及有哪些代表案例和主题。"
            >
              Use the map to place the question first. When you hover a field, the panel tells you
              what kind of problem it handles, why it matters now, and which cases or topics
              represent it.
            </p>
          </>
        )}
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {edges.map((edge) => {
          const source = domains.find((domain) => domain.id === edge.source);
          const target = domains.find((domain) => domain.id === edge.target);

          if (!source || !target) {
            return null;
          }

          const isFocused = focusedDomain
            ? edge.source === focusedDomain.id || edge.target === focusedDomain.id
            : false;
          const isMuted = focusedDomain
            ? !(edge.source === focusedDomain.id || edge.target === focusedDomain.id)
            : false;

          return (
            <EdgeLine
              key={`${edge.source}-${edge.target}`}
              source={source}
              target={target}
              score={edge.score}
              focused={isFocused}
              muted={isMuted}
            />
          );
        })}
      </svg>

      {domains.map((domain) => {
        const active = hoveredDomainId === domain.id;
        const muted = hoveredDomainId ? !relationIds.has(domain.id) : false;

        return (
          <NodeCard
            key={domain.id}
            domain={domain}
            active={active}
            muted={muted}
            onHover={onHover}
            onLeave={onLeave}
          />
        );
      })}
    </div>
  );
}

function MobileList({
  domains,
  hoveredDomainId,
  onHover,
  onLeave,
}: {
  domains: ShiftAtlasKnowledgeDomain[];
  hoveredDomainId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:hidden">
      {domains.map((domain) => (
        <Link
          key={domain.id}
          href={`/shift-atlas/domains/${domain.id}`}
          onMouseEnter={() => onHover(domain.id)}
          onMouseLeave={onLeave}
          onFocus={() => onHover(domain.id)}
          onBlur={onLeave}
          className={[
            'block border-2 border-line-pixel bg-bg-secondary p-4 transition-all duration-200',
            hoveredDomainId === domain.id ? 'border-red-primary bg-bg-primary' : '',
          ].join(' ')}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-line-pixel bg-bg-primary px-2 text-center font-[family-name:var(--font-display)] text-[14px] leading-[1.05] text-text-primary break-words whitespace-normal"
          style={{
            backgroundColor: domain.color,
          }}
          data-en={domain.title}
          data-zh={domain.titleZh}
        >
              {domain.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function KnowledgeMap({ domains }: { domains: ShiftAtlasKnowledgeDomain[] }) {
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border border-line-pixel bg-bg-secondary px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p
            className="font-[family-name:var(--font-pixel)] text-[10px] text-red-primary mb-1"
            data-en="MAP VIEW"
            data-zh="地图视图"
          >
            MAP VIEW
          </p>
          <p
            className="text-[13px] leading-relaxed text-text-secondary"
            data-en="Use the map to locate the question first. Hover to compare neighboring fields. Click when you know where you need to read deeper."
            data-zh="先用地图给问题定位。悬停可以比较相邻领域，确定方向后再点进去深入读。"
          >
            Use the map to locate the question first. Hover to compare neighboring fields. Click
            when you know where you need to read deeper.
          </p>
        </div>
        <p
          className="font-[family-name:var(--font-pixel)] text-[10px] text-text-tertiary"
          data-en={`${domains.length} DOMAINS`}
          data-zh={`${domains.length} 个领域`}
        >
          {domains.length} DOMAINS
        </p>
      </div>

      <MobileList
        domains={domains}
        hoveredDomainId={hoveredDomainId}
        onHover={setHoveredDomainId}
        onLeave={() => setHoveredDomainId(null)}
      />

      <div className="hidden lg:block">
        <GraphCanvas
          domains={domains}
          hoveredDomainId={hoveredDomainId}
          onHover={setHoveredDomainId}
          onLeave={() => setHoveredDomainId(null)}
        />
      </div>
    </div>
  );
}

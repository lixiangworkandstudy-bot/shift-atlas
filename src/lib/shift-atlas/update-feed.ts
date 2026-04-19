import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { assignShiftAtlasItems, shiftAtlasConceptPagesBySlug, shiftAtlasKnowledgeDomains } from './data';
import type { ShiftAtlasFetchedItem } from './types';

export interface ShiftAtlasIngestedUpdate extends ShiftAtlasFetchedItem {
  ingestedAt: string;
}

interface ShiftAtlasUpdateSnapshot {
  generatedAt: string;
  items: ShiftAtlasIngestedUpdate[];
}

export interface ShiftAtlasWeeklyDigestItem {
  id: string;
  href: string;
  domainTitle: string;
  domainTitleZh: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  confirmedCount: number;
  candidateCount: number;
}

export interface ShiftAtlasSignalFlowItem {
  id: string;
  domainTitle: string;
  domainTitleZh: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  mainPoint: string;
  mainPointZh: string;
  coreContent: string;
  coreContentZh: string;
  publishedLabel: string;
  publishedLabelZh: string;
  whyItMatters: string;
  whyItMattersZh: string;
  action: string;
  actionZh: string;
  score: number;
  status: 'confirmed' | 'candidate';
  statusZh: '确认' | '候选';
  sourceTier: string;
  relatedArticles: {
    title: string;
    sourceName: string;
    sourceNameZh: string;
    href: string;
    publishedLabel: string;
    publishedLabelZh: string;
  }[];
}

const UPDATE_FEED_PATH = path.join(
  process.cwd(),
  'content',
  'shift-atlas',
  'fetched-updates.json',
);

function normalizeDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function getItemTimestamp(item: { publishedAt?: string | null; ingestedAt?: string | null }) {
  return normalizeDate(item.publishedAt ?? item.ingestedAt)?.getTime() ?? 0;
}

function withinLastDays(date: Date, days: number) {
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return date.getTime() >= threshold;
}

function compactList(values: string[], limit = 2) {
  return [...new Set(values.filter(Boolean))].slice(0, limit).join(', ');
}

function clipText(value: string | null | undefined, maxLength = 220) {
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

function quotedTitleList(values: string[], locale: 'en' | 'zh', limit = 2) {
  const unique = [...new Set(values.filter(Boolean))].slice(0, limit);
  if (!unique.length) return locale === 'zh' ? '这组文章' : 'these articles';
  return unique
    .map((value) => (locale === 'zh' ? `《${value}》` : `"${value}"`))
    .join(locale === 'zh' ? '、' : ', ');
}

type AssignedUpdate = {
  assignment: ReturnType<typeof assignShiftAtlasItems>[number];
  score: number;
  status: 'confirmed' | 'candidate' | null;
};

type DigestThemeDefinition = {
  id: string;
  label: string;
  labelZh: string;
  keywords: string[];
  en: {
    trend: string;
    implication: string;
  };
  zh: {
    trend: string;
    implication: string;
  };
};

function normalizeText(value: string | null | undefined) {
  return String(value ?? '').toLowerCase();
}

function scoreKeywordMatches(text: string, keywords: string[]) {
  return keywords.reduce((sum, keyword) => (text.includes(keyword) ? sum + 1 : sum), 0);
}

function scoreTheme(entries: AssignedUpdate[], theme: DigestThemeDefinition) {
  return entries.reduce((sum, entry) => {
    const title = normalizeText(entry.assignment.item.title);
    const summary = normalizeText(entry.assignment.item.summary);
    return (
      sum +
      scoreKeywordMatches(title, theme.keywords) * 2 +
      scoreKeywordMatches(summary, theme.keywords)
    );
  }, 0);
}

function scoreThemeForItem(
  item: ShiftAtlasFetchedItem,
  theme: DigestThemeDefinition,
) {
  const title = normalizeText(item.title);
  const summary = normalizeText(item.summary);
  const extracted = normalizeText(
    [item.extracted?.mainPoint, item.extracted?.coreContent].join(' '),
  );

  return (
    scoreKeywordMatches(title, theme.keywords) * 2 +
    scoreKeywordMatches(summary, theme.keywords) +
    scoreKeywordMatches(extracted, theme.keywords)
  );
}

const DOMAIN_DIGEST_THEMES: Record<string, DigestThemeDefinition[]> = {
  'market-signals': [
    {
      id: 'workflow-reset',
      label: 'Workflow Reset',
      labelZh: '工作流重写',
      keywords: [
        'software engineering',
        'agent-first',
        'future of work',
        'skills',
        'workflow',
        'process redesign',
        'vibe coding',
        'genui',
        'agent',
      ],
      en: {
        trend:
          'The strongest market movement is no longer generic AI optimism. It is a workflow reset: products, browsers, and work systems are being rebuilt around reusable AI actions and agent-based execution.',
        implication:
          'For product teams, the useful question is not whether AI remains hot. It is which new behaviors are becoming normal enough that your own product has to respond.',
      },
      zh: {
        trend:
          '现在最强的市场变化已经不是泛泛的 AI 热度，而是工作流正在被重写：产品、浏览器和工作系统都开始围绕可复用的 AI 动作与 agent 执行重新组织。',
        implication:
          '对产品团队来说，真正要判断的不是 AI 还热不热，而是哪些新行为已经开始变成常态，逼着你的产品必须跟进。',
      },
    },
    {
      id: 'power-and-backlash',
      label: 'Power And Backlash',
      labelZh: '权力与反作用',
      keywords: [
        'sam altman',
        'competition',
        'warning',
        'internal memo',
        'lock in users',
        'divided',
        'beating the competition',
        'memo',
      ],
      en: {
        trend:
          'AI market signals are becoming more political and reputational. Leadership conflict, platform rivalry, and public fear now shape product narratives alongside technical launches.',
        implication:
          'This matters because product positioning can no longer rely only on capability claims. Trust, governance, and category framing are becoming part of the competitive surface.',
      },
      zh: {
        trend:
          'AI 市场信号正在变得更政治化、更声誉化。领导层冲突、平台竞争和公众反应，已经和技术发布一起影响产品叙事。',
        implication:
          '这意味着产品定位不能只靠能力宣称。信任、治理和品类叙事，正在一起进入竞争面。',
      },
    },
  ],
  'agent-architecture': [
    {
      id: 'productionization',
      label: 'Operational Agent Systems',
      labelZh: 'Agent 系统走向可运行',
      keywords: [
        'skills',
        'workflow',
        'process redesign',
        'trusted access',
        'cyber',
        'agent',
        'guardrails',
        'tool',
      ],
      en: {
        trend:
          'Agent systems are being operationalized, not just demonstrated. More work is moving into reusable skills, controlled access, and longer-running execution loops.',
        implication:
          'For product teams, the architectural question is shifting from “can the model do it” to “can the system run it repeatedly without falling apart”.',
      },
      zh: {
        trend:
          'agent 系统正在从演示品变成可运行的系统。越来越多工作被压进可复用技能、受控访问和更长的执行闭环里。',
        implication:
          '对产品团队来说，真正的问题正在从“模型会不会”转向“系统能不能反复稳定地跑”。',
      },
    },
  ],
  'interaction-grammar': [
    {
      id: 'task-visibility',
      label: 'Task Structure Becomes Visible',
      labelZh: '任务结构开始可见',
      keywords: [
        'skills',
        'prompt',
        'workflow',
        'generate',
        'interactive',
        'agent as users',
        'watermark',
        'design',
      ],
      en: {
        trend:
          'AI interactions are being turned into visible, repeatable units rather than one-off prompt exchanges.',
        implication:
          'Interface design now needs to show task boundaries, system state, and user intervention points instead of hiding everything behind chat.',
      },
      zh: {
        trend:
          'AI 交互开始被做成可见、可重复的任务单元，而不再只是一次性的 prompt 往返。',
        implication:
          '这意味着界面设计要开始明确呈现任务边界、系统状态和用户介入点，而不是把一切都藏在聊天框后面。',
      },
    },
  ],
  'trust-control': [
    {
      id: 'inspectable-control',
      label: 'Trust Needs Visible Control',
      labelZh: '信任需要可见控制',
      keywords: [
        'trust',
        'warning',
        'security',
        'trusted access',
        'watermark',
        'handmade',
        'control',
        'safe',
      ],
      en: {
        trend:
          'Users are being asked to trust systems whose permissions, provenance, and risks need to be legible.',
        implication:
          'For product design, the priority is to show boundaries and evidence, not just confidence.',
      },
      zh: {
        trend:
          '用户面对的系统越来越需要把权限、来源和风险交代清楚，信任正在从安抚式语言转向可见控制。',
        implication:
          '对产品设计来说，重点不是说服，而是把边界和证据展示出来。',
      },
    },
  ],
  'evaluation-feedback': [
    {
      id: 'quality-as-product-loop',
      label: 'Quality Moves Into The User Loop',
      labelZh: '质量进入用户闭环',
      keywords: [
        'benchmark',
        'evaluation',
        'survey',
        'data quality',
        'performance',
        'explaining',
        'feedback',
        'report card',
      ],
      en: {
        trend:
          'Quality is showing up less as a hidden benchmark score and more as something teams need to inspect, explain, and correct in public workflows.',
        implication:
          'That pushes product teams to treat evaluation as part of the user loop, not just the model team’s internal report.',
      },
      zh: {
        trend:
          '质量不再只是藏在后台的 benchmark 分数，而是要在公开工作流里被检查、解释和修正。',
        implication:
          '这会逼着产品团队把评估当成用户闭环的一部分，而不只是模型团队内部的报告。',
      },
    },
  ],
  'product-runtime': [
    {
      id: 'runtime-becomes-experience',
      label: 'Runtime Becomes Product Experience',
      labelZh: '运行时变成产品体验',
      keywords: [
        'latency',
        'reliability',
        'priority',
        'flex',
        'cost',
        'tiers',
        'planning',
        'long-horizon',
      ],
      en: {
        trend:
          'Cost tiers, planning depth, and response reliability are becoming visible parts of the user experience.',
        implication:
          'Runtime behavior can no longer be delegated away as a pure infrastructure concern.',
      },
      zh: {
        trend:
          '成本档位、规划深度和响应可靠性，越来越成为用户体验的一部分。',
        implication:
          '这意味着运行时行为不能再被完全下放成基础设施问题，它已经是产品问题本身。',
      },
    },
  ],
  'memory-systems': [
    {
      id: 'selective-carry-forward',
      label: 'Selective Memory',
      labelZh: '筛选式记忆',
      keywords: [
        'remember',
        'memory',
        'continual learning',
        'prior work',
        'preferences',
        'carry forward',
        'history',
      ],
      en: {
        trend:
          'Systems are being judged less by how much they can store and more by whether they carry the right context forward.',
        implication:
          'This turns memory into an editorial judgment: what deserves to persist and what should be left behind.',
      },
      zh: {
        trend:
          '系统不再主要因为记得多而被评价，而是因为能不能把正确的上下文带到下一步。',
        implication:
          '这会把记忆问题变成一种编辑判断：什么该留下，什么该被忘掉。',
      },
    },
  ],
};

function pickTopTheme(
  domainId: string,
  entries: AssignedUpdate[],
): DigestThemeDefinition | null {
  const themes = DOMAIN_DIGEST_THEMES[domainId] ?? [];
  if (!themes.length) return null;

  const ranked = themes
    .map((theme) => ({
      theme,
      score: scoreTheme(entries, theme),
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > 0 ? ranked[0].theme : null;
}

function pickThemeForItem(
  domainId: string,
  item: ShiftAtlasFetchedItem,
): DigestThemeDefinition | null {
  const themes = DOMAIN_DIGEST_THEMES[domainId] ?? [];
  if (!themes.length) return null;

  const ranked = themes
    .map((theme) => ({
      theme,
      score: scoreThemeForItem(item, theme),
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > 0 ? ranked[0].theme : null;
}

function buildWeeklyDigestSummary(
  domainId: string,
  entries: AssignedUpdate[],
  confirmedCount: number,
  candidateCount: number,
) {
  const titles = entries.map((entry) => entry.assignment.item.title);
  const sourceNames = entries.map(
    (entry) => entry.assignment.item.sourceName ?? entry.assignment.item.sourceId,
  );
  const sourcePreview = compactList(sourceNames, 2);
  const titlePreview = compactList(titles, 2);
  const topTheme = pickTopTheme(domainId, entries);

  if (topTheme) {
    return {
      en: `${topTheme.en.trend} ${topTheme.en.implication} Evidence this week: ${confirmedCount} confirmed signals and ${candidateCount} candidate signals, mainly from ${sourcePreview}.`,
      zh: `${topTheme.zh.trend} ${topTheme.zh.implication} 本周证据：${confirmedCount} 条确认信号、${candidateCount} 条候选信号，主要来自 ${sourcePreview}。`,
    };
  }

  return {
    en: `The new items in this area are starting to line up into a single direction. The strongest movement right now is around ${titlePreview}. The practical question is whether these changes are strong enough to reshape the way this field should be read inside the atlas. Evidence this week: ${confirmedCount} confirmed signals and ${candidateCount} candidate signals, mainly from ${sourcePreview}.`,
    zh: `这个领域的新条目开始朝同一个方向汇拢。当前最强的变化集中在 ${titlePreview}。真正要判断的是，这些变化是否已经强到足以改写你在图谱里理解这个领域的方式。 本周证据：${confirmedCount} 条确认信号、${candidateCount} 条候选信号，主要来自 ${sourcePreview}。`,
  };
}

function getAuthorityScore(authority: string | null | undefined) {
  switch (authority) {
    case 'official':
      return 2.2;
    case 'academic':
      return 2;
    case 'media':
      return 1.5;
    case 'personal':
      return 1;
    default:
      return 0.8;
  }
}

function getSourceTierScore(item: ShiftAtlasFetchedItem) {
  return item.sourceQuality?.score ?? 0;
}

function getSourceTierLabel(item: ShiftAtlasFetchedItem) {
  return item.sourceQuality?.tier ?? 'watch';
}

function formatPublishedLabel(date: Date | null) {
  if (!date) {
    return {
      en: 'date unavailable',
      zh: '时间未知',
    };
  }

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  if (diffDays === 0) {
    return { en: 'today', zh: '今天' };
  }

  if (diffDays === 1) {
    return { en: '1 day ago', zh: '1 天前' };
  }

  return {
    en: `${diffDays} days ago`,
    zh: `${diffDays} 天前`,
  };
}

function toWeeklyDigestItems(items: ShiftAtlasIngestedUpdate[]) {
  const assignments = assignShiftAtlasItems(items)
    .map((assignment) => ({
      assignment,
      score: scoreAssignedItem(assignment),
      status: classifySignalStatus(assignment, scoreAssignedItem(assignment)),
    }))
    .filter(({ assignment, status }) => {
      const hasTitle = assignment.item.title && assignment.item.title !== '(untitled)';
      return hasTitle && status !== null && hasUsableExtraction(assignment.item);
    });
  const grouped = new Map<
    string,
    {
      domainTitle: string;
      domainTitleZh: string;
      items: typeof assignments;
    }
  >();

  assignments.forEach((entry) => {
    const bestDomain = entry.assignment.bestDomains[0];
    if (!bestDomain) return;

    const domain = shiftAtlasKnowledgeDomains.find((entry) => entry.id === bestDomain.domainId);
    if (!domain) return;

    const current = grouped.get(domain.id);
    if (current) {
      current.items.push(entry);
      return;
    }

    grouped.set(domain.id, {
      domainTitle: domain.title,
      domainTitleZh: domain.titleZh,
      items: [entry],
    });
  });

  return [...grouped.entries()]
    .map(([domainId, group]) => {
      const ordered = [...group.items].sort((a, b) => {
        return (
          getItemTimestamp(b.assignment.item as ShiftAtlasIngestedUpdate) -
          getItemTimestamp(a.assignment.item as ShiftAtlasIngestedUpdate)
        );
      });
      const confirmedCount = ordered.filter((entry) => entry.status === 'confirmed').length;
      const candidateCount = ordered.filter((entry) => entry.status === 'candidate').length;

      const digestSummary = buildWeeklyDigestSummary(
        domainId,
        ordered,
        confirmedCount,
        candidateCount,
      );

      return {
        id: domainId,
        href: `/shift-atlas/domains/${domainId}`,
        domainTitle: group.domainTitle,
        domainTitleZh: group.domainTitleZh,
        title: group.domainTitle,
        titleZh: group.domainTitleZh,
        summary: digestSummary.en,
        summaryZh: digestSummary.zh,
        confirmedCount,
        candidateCount,
        latestTimestamp: getItemTimestamp(ordered[0]?.assignment.item as ShiftAtlasIngestedUpdate),
      };
    })
    .sort((a, b) => b.latestTimestamp - a.latestTimestamp)
    .slice(0, 6)
    .map(({ latestTimestamp: _latestTimestamp, ...item }) => item);
}

function inferSuggestedAction(item: ShiftAtlasFetchedItem, conceptSlug?: string) {
  if (conceptSlug) {
    const concept = shiftAtlasConceptPagesBySlug[conceptSlug];
    if (concept) {
      return {
        en: `Review term: ${concept.title}`,
        zh: `检查词条：${concept.titleZh}`,
      };
    }
  }

  return {
    en: 'Review domain signal',
    zh: '回看领域信号',
  };
}

function scoreAssignedItem(assignment: ReturnType<typeof assignShiftAtlasItems>[number]) {
  const bestDomain = assignment.bestDomains[0]?.score ?? 0;
  const bestConcept = assignment.bestConcepts[0]?.score ?? 0;
  const authority = getAuthorityScore(assignment.item.authority);
  const sourceTier = getSourceTierScore(assignment.item);
  const titleQuality = assignment.item.title && assignment.item.title !== '(untitled)' ? 0.8 : 0;
  const summaryQuality = assignment.item.summary ? 0.6 : 0;
  const freshness = (() => {
    const published = normalizeDate(
      (assignment.item as ShiftAtlasIngestedUpdate).publishedAt ??
        (assignment.item as ShiftAtlasIngestedUpdate).ingestedAt,
    );
    if (!published) return 0;
    const diffDays = Math.max(0, Math.floor((Date.now() - published.getTime()) / (24 * 60 * 60 * 1000)));
    if (diffDays <= 1) return 1;
    if (diffDays <= 3) return 0.7;
    return 0.4;
  })();

  return Number(
    (authority + sourceTier + bestDomain + bestConcept + titleQuality + summaryQuality + freshness).toFixed(1),
  );
}

function classifySignalStatus(
  assignment: ReturnType<typeof assignShiftAtlasItems>[number],
  score: number,
): 'confirmed' | 'candidate' | null {
  const tier = getSourceTierLabel(assignment.item);
  const bestDomain = assignment.bestDomains[0]?.score ?? 0;
  const bestConcept = assignment.bestConcepts[0]?.score ?? 0;

  if (score >= 7.5 && tier !== 'watch' && bestDomain >= 2) {
    return 'confirmed';
  }

  if (score >= 5.5 && (bestDomain >= 1.5 || bestConcept >= 1.5)) {
    return 'candidate';
  }

  return null;
}

function hasUsableExtraction(item: ShiftAtlasFetchedItem) {
  const text = normalizeText(
    [
      item.title,
      item.summary,
      item.extracted?.mainPoint,
      item.extracted?.coreContent,
    ].join(' '),
  );

  if (
    [
      'hello and welcome to',
      'newsletter for',
      'subscriptions are currently',
      "that's $30 a year",
      'fan art',
      'stock jumped',
      'news preview',
      'yaml format',
      'paste that yaml into',
      'tool:',
    ].some((fragment) => text.includes(fragment))
  ) {
    return false;
  }

  return true;
}

function buildWhyItMatters(
  assignment: ReturnType<typeof assignShiftAtlasItems>[number],
  domainTitle: string,
  domainTitleZh: string,
  conceptSlug?: string,
) {
  const bestConcept = conceptSlug ? shiftAtlasConceptPagesBySlug[conceptSlug] : null;
  const overlap = assignment.bestDomains[0]?.overlapTags ?? [];
  const overlapPreview = compactList(overlap, 3);

  if (bestConcept) {
    return {
      en: `Most likely belongs in ${domainTitle}, and is especially close to the term ${bestConcept.title}${overlapPreview ? ` through ${overlapPreview}` : ''}.`,
      zh: `这条变化最可能属于 ${domainTitleZh}，并且和词条《${bestConcept.titleZh}》最接近${overlapPreview ? `，关联标签是 ${overlapPreview}` : ''}。`,
    };
  }

  return {
    en: `Most likely belongs in ${domainTitle}${overlapPreview ? ` through ${overlapPreview}` : ''}.`,
    zh: `这条变化最可能属于 ${domainTitleZh}${overlapPreview ? `，关联标签是 ${overlapPreview}` : ''}。`,
  };
}

function buildClusterNarrative(
  theme: DigestThemeDefinition | null,
  leadItem: ShiftAtlasFetchedItem,
  relatedTitles: string[],
  sourcePreview: string,
  clusterTitleZh: string,
) {
  const titlesZh = quotedTitleList(relatedTitles, 'zh');
  const titlesEn = quotedTitleList(relatedTitles, 'en');
  const leadCoreContent =
    leadItem.extracted?.coreContent ??
    leadItem.extracted?.digest ??
    leadItem.summary ??
    leadItem.title;
  const leadCoreContentZh =
    leadItem.extracted?.coreContentZh ??
    leadItem.extracted?.digestZh ??
    leadItem.summary ??
    leadItem.title;

  if (!theme) {
    return {
      mainPoint: leadItem.extracted?.mainPoint ?? leadItem.title,
      mainPointZh: `这组关联文章目前主要围绕《${clusterTitleZh}》相关问题展开。`,
      coreContent: clipText(
        `${leadCoreContent} ${relatedTitles.length > 1 ? `Around it, ${titlesEn} extend the same topic from adjacent angles.` : ''}`,
        260,
      ),
      coreContentZh: `${titlesZh} 这组文章目前都在补充《${clusterTitleZh}》的不同侧面。当前最直接的一篇文章主要在谈：${clipText(leadCoreContentZh, 120)}。`,
      whyItMatters: `This cluster still needs a clearer product judgment before it should influence the atlas.`,
      whyItMattersZh: `这组文章还需要先形成更清楚的产品判断，才值得继续影响图谱。`,
    };
  }

  const narratives: Record<
    string,
    {
      mainPoint: string;
      mainPointZh: string;
      coreContent: string;
      coreContentZh: string;
      whyItMatters: string;
      whyItMattersZh: string;
    }
  > = {
    'workflow-reset': {
      mainPoint:
        'The useful market judgment is that AI competition is shifting from model showcase to workflow redesign.',
      mainPointZh:
        '现在更值得下的市场判断是：AI 的竞争重点，正在从模型展示转向工作流重写。',
      coreContent: `${titlesEn} are mostly discussing how AI is entering real software work: execution structure, coding workflow, and reusable agent behavior. The articles are not centered on a single launch. They are tracing how day-to-day work itself is being reorganized.`,
      coreContentZh: `${titlesZh} 主要在谈 AI 如何进入真实的软件工作，包括执行结构、编码工作流和可复用的 agent 行为。这组文章的重点不是某个新功能，而是日常工作的组织方式正在被改写。`,
      whyItMatters:
        'This changes product strategy. You now need to judge which user behaviors are hardening into product conventions, and whether your own interface or workflow has already fallen behind.',
      whyItMattersZh:
        '这会改写产品判断。你现在要判断的是：哪些用户行为正在固化成新的产品惯例，以及你的界面和工作流是不是已经落后了。',
    },
    'power-and-backlash': {
      mainPoint:
        'AI market signals are no longer just about launches. Power struggle, category framing, and public backlash now shape how products are read.',
      mainPointZh:
        'AI 市场信号已经不只是发布会和新功能。权力博弈、品类叙事和公众反作用，正在一起决定产品会被怎样理解。',
      coreContent: `${titlesEn} are mainly about the political and public layer around AI products: leadership conflict, category framing, and the growing willingness to push back on dominant companies. The articles are describing how market meaning is being contested in public.`,
      coreContentZh: `${titlesZh} 主要在谈 AI 产品之外那一层正在升高的力量：领导层冲突、品类叙事，以及公众对头部公司的反作用。这组文章描述的不是能力本身，而是市场意义正在被公开争夺。`,
      whyItMatters:
        'This matters because product positioning can no longer be separated from trust, governance, and reputational risk.',
      whyItMattersZh:
        '这意味着产品定位不能再和信任、治理、声誉风险分开看。技术能力本身已经不是唯一变量。',
    },
    productionization: {
      mainPoint:
        'The architectural shift is that agent systems are being judged by repeatable operation, not by one-off demos.',
      mainPointZh:
        '现在更关键的架构变化是：agent 系统开始按“能否稳定重复运行”被评价，而不是按“演示时有多惊艳”被评价。',
      coreContent: `${titlesEn} are mostly about the operational side of agent systems: reusable skills, controlled access, execution loops, and the tooling needed to keep agents running. The shared topic is how to turn one-off capability into repeatable production behavior.`,
      coreContentZh: `${titlesZh} 主要在谈 agent 系统进入生产后的运行问题，包括可复用技能、受控访问、执行闭环，以及维持运行所需的工具层。这组文章共同关心的是：怎样把一次性的能力，变成可重复的生产行为。`,
      whyItMatters:
        'This changes the design brief. The question is no longer only what the model can do, but whether the whole system can keep doing it without collapsing.',
      whyItMattersZh:
        '这会改变产品设计任务书。现在的问题不只是模型会不会，而是整套系统能不能持续做、稳定做、可审计地做。',
    },
    'task-visibility': {
      mainPoint:
        'AI interaction is moving from hidden generation to visible task structure.',
      mainPointZh:
        'AI 交互正在从隐藏的生成过程，转向可见的任务结构。',
      coreContent: `${titlesEn} are discussing the interface layer directly: where task boundaries should appear, how execution state should be shown, and where users are expected to step in. The common content is about making work legible instead of hiding everything behind chat.`,
      coreContentZh: `${titlesZh} 主要在谈界面层本身：任务边界应该出现在哪里、执行状态怎样被看见、用户应该在哪些点介入。它们共同讨论的是怎样把工作过程做得可读，而不是继续把一切都藏在聊天框后面。`,
      whyItMatters:
        'This directly affects interface design. If the structure stays invisible, users cannot judge progress, responsibility, or when they need to step in.',
      whyItMattersZh:
        '这会直接影响界面设计。如果结构继续不可见，用户就无法判断进度、责任边界，以及什么时候应该介入。',
    },
    'inspectable-control': {
      mainPoint:
        'Trust is increasingly built through visible control, not through reassuring language.',
      mainPointZh:
        '信任越来越不是靠“请放心”，而是靠可见控制来建立。',
      coreContent: `${titlesEn} are mainly about what users need to inspect before they trust a system: permissions, provenance, and explicit risk boundaries. The articles are less about reassurance and more about what control has to look like in practice.`,
      coreContentZh: `${titlesZh} 主要在谈用户在信任系统之前到底需要看见什么，包括权限、来源和明确的风险边界。文章关注的不是安抚性话术，而是控制在产品里应该长成什么样。`,
      whyItMatters:
        'For product teams, this changes the implementation priority from messaging to evidence and controls.',
      whyItMattersZh:
        '对产品团队来说，这会把优先级从“怎么说服用户”改成“怎么给出证据和控制手段”。',
    },
    'quality-as-product-loop': {
      mainPoint:
        'Quality is moving out of the hidden benchmark layer and into the user-facing product loop.',
      mainPointZh:
        '质量正在从隐藏的 benchmark 层，进入用户可见的产品闭环。',
      coreContent: `${titlesEn} are mostly discussing how product quality is judged in practice: where failure shows up, what users are allowed to see, and how correction or recovery is supposed to happen. The common content is about bringing evaluation into the lived product loop.`,
      coreContentZh: `${titlesZh} 主要在谈产品里的质量到底如何被判断：失败会在哪些位置暴露、用户能看到什么、系统又会怎样修正或恢复。这组文章共同讨论的是，怎样把评估真正带进产品使用过程。`,
      whyItMatters:
        'This means evaluation is no longer just internal measurement. It becomes part of the experience and the trust surface.',
      whyItMattersZh:
        '这意味着评估不再只是内部测量，它已经变成体验本身，也是信任的一部分。',
    },
    'runtime-becomes-experience': {
      mainPoint:
        'Runtime behavior is becoming product experience, not just infrastructure configuration.',
      mainPointZh:
        '运行时行为正在变成产品体验，而不再只是基础设施配置。',
      coreContent: `${titlesEn} are focused on runtime conditions that users now feel directly: latency, reliability, and cost tradeoffs. The articles are describing how infrastructure choices surface as visible behavior in the product.`,
      coreContentZh: `${titlesZh} 主要在谈用户现在会直接感受到的运行时条件：延迟、可靠性和成本取舍。文章讨论的核心是，原本属于基础设施层的选择，正在怎样变成可见的产品行为。`,
      whyItMatters:
        'This changes product tradeoffs. Runtime choices now belong in the design conversation, not only in backend planning.',
      whyItMattersZh:
        '这会改变产品取舍。运行时选择现在必须进入设计讨论，而不是只留在后端规划里。',
    },
    'selective-carry-forward': {
      mainPoint:
        'The memory question is shifting from storing more to carrying the right context forward.',
      mainPointZh:
        '记忆问题正在从“存更多”转向“把正确的上下文带到下一步”。',
      coreContent: `${titlesEn} are mainly about what should move forward across turns and sessions: which context deserves to persist, which memories should be retrieved, and what should be dropped. The shared content is about selective carry-forward, not unlimited storage.`,
      coreContentZh: `${titlesZh} 主要在谈哪些内容应该跨轮次、跨会话被带到下一步：什么值得保留、什么应该被检索回来、什么又应该被丢掉。它们共同讨论的不是无限存储，而是有选择地延续上下文。`,
      whyItMatters:
        'This turns memory into a product judgment problem. Systems need editorial discipline, not just larger storage.',
      whyItMattersZh:
        '这会把记忆变成产品判断问题。系统需要的不是更大的存储，而是更强的编辑纪律。',
    },
  };

  const fallback = {
    mainPoint: theme.en.trend,
    mainPointZh: theme.zh.trend,
    coreContent: `${titlesEn} are the main articles currently supporting this reading. ${theme.en.implication}`,
    coreContentZh: `${titlesZh} 是当前支撑这个判断的主要文章。${theme.zh.implication}`,
    whyItMatters: `The point is not to read these articles separately, but to use them together as evidence for a single product judgment.`,
    whyItMattersZh: `关键不是把这些文章分开看，而是把它们一起当成同一个产品判断的证据。`,
  };

  return narratives[theme.id] ?? fallback;
}

function toSignalFlowItems(items: ShiftAtlasIngestedUpdate[]) {
  const assignments = assignShiftAtlasItems(items)
    .map((assignment) => ({
      assignment,
      score: scoreAssignedItem(assignment),
      status: classifySignalStatus(assignment, scoreAssignedItem(assignment)),
    }))
    .filter(({ score, assignment, status }) => {
      const hasTitle = assignment.item.title && assignment.item.title !== '(untitled)';
      return hasTitle && score >= 5.5 && status !== null && hasUsableExtraction(assignment.item);
    })
  const grouped = new Map<
    string,
    {
      domainId: string;
      domainTitle: string;
      domainTitleZh: string;
      theme: DigestThemeDefinition | null;
      conceptSlug?: string;
      entries: typeof assignments;
    }
  >();

  assignments.forEach((entry) => {
    const bestDomain = entry.assignment.bestDomains[0];
    if (!bestDomain) return;

    const domain = shiftAtlasKnowledgeDomains.find((item) => item.id === bestDomain.domainId);
    if (!domain) return;

    const theme = pickThemeForItem(domain.id, entry.assignment.item);
    const conceptSlug = entry.assignment.bestConcepts[0]?.slug;
    const key = `${domain.id}:${theme?.id ?? conceptSlug ?? 'mixed'}`;
    const current = grouped.get(key);

    if (current) {
      current.entries.push(entry);
      return;
    }

    grouped.set(key, {
      domainId: domain.id,
      domainTitle: domain.title,
      domainTitleZh: domain.titleZh,
      theme,
      conceptSlug,
      entries: [entry],
    });
  });

  return [...grouped.values()]
    .map((group) => {
      const ordered = [...group.entries].sort((a, b) => {
        const statusWeight = (value: 'confirmed' | 'candidate' | null) =>
          value === 'confirmed' ? 1 : value === 'candidate' ? 0 : -1;
        const statusDelta = statusWeight(b.status) - statusWeight(a.status);
        if (statusDelta !== 0) return statusDelta;
        const scoreDelta = b.score - a.score;
        if (scoreDelta !== 0) return scoreDelta;
        return (
          getItemTimestamp(b.assignment.item as ShiftAtlasIngestedUpdate) -
          getItemTimestamp(a.assignment.item as ShiftAtlasIngestedUpdate)
        );
      });

      const lead = ordered[0];
      const relatedArticles = ordered.slice(0, 3).map(({ assignment }) => {
        const published = normalizeDate(
          (assignment.item as ShiftAtlasIngestedUpdate).publishedAt ??
            (assignment.item as ShiftAtlasIngestedUpdate).ingestedAt,
        );
        const publishedLabel = formatPublishedLabel(published);
        return {
          title: assignment.item.title,
          sourceName: assignment.item.sourceName ?? assignment.item.sourceId,
          sourceNameZh: assignment.item.sourceName ?? assignment.item.sourceId,
          href:
            assignment.item.link ??
            `/shift-atlas/domains/${group.domainId}`,
          publishedLabel: publishedLabel.en,
          publishedLabelZh: publishedLabel.zh,
        };
      });

      const bestConcept = group.conceptSlug
        ? shiftAtlasConceptPagesBySlug[group.conceptSlug]
        : null;
      const action = inferSuggestedAction(
        lead.assignment.item,
        bestConcept ? group.conceptSlug : undefined,
      );
      const confirmedCount = ordered.filter((entry) => entry.status === 'confirmed').length;
      const candidateCount = ordered.filter((entry) => entry.status === 'candidate').length;
      const sourcePreview = compactList(
        ordered.map((entry) => entry.assignment.item.sourceName ?? entry.assignment.item.sourceId),
        2,
      );

      const title =
        group.theme?.label ??
        bestConcept?.title ??
        `${group.domainTitle} viewpoint`;
      const titleZh =
        group.theme?.labelZh ??
        bestConcept?.titleZh ??
        `${group.domainTitleZh} 相关观点`;
      const mainPoint =
        group.theme?.en.trend ??
        lead.assignment.item.extracted?.mainPoint ??
        lead.assignment.item.title;
      const mainPointZh =
        group.theme?.zh.trend ??
        lead.assignment.item.extracted?.mainPointZh ??
        lead.assignment.item.title;
      const coreContent =
        group.theme?.en.implication ??
        lead.assignment.item.extracted?.coreContent ??
        lead.assignment.item.summary ??
        '';
      const coreContentZh =
        group.theme?.zh.implication ??
        lead.assignment.item.extracted?.coreContentZh ??
        lead.assignment.item.summary ??
        '';
      const narrative = buildClusterNarrative(
        group.theme,
        lead.assignment.item,
        relatedArticles.map((article) => article.title),
        sourcePreview,
        titleZh,
      );
      const clusterStatus =
        confirmedCount >= candidateCount ? ('confirmed' as const) : ('candidate' as const);

      return {
        id: `${group.domainId}:${group.theme?.id ?? group.conceptSlug ?? 'mixed'}`,
        domainTitle: group.domainTitle,
        domainTitleZh: group.domainTitleZh,
        title,
        titleZh,
        summary: narrative.mainPoint,
        summaryZh: narrative.mainPointZh,
        mainPoint: narrative.mainPoint,
        mainPointZh: narrative.mainPointZh,
        coreContent: narrative.coreContent,
        coreContentZh: narrative.coreContentZh,
        publishedLabel: relatedArticles[0]?.publishedLabel ?? 'date unavailable',
        publishedLabelZh: relatedArticles[0]?.publishedLabelZh ?? '时间未知',
        whyItMatters: narrative.whyItMatters,
        whyItMattersZh: narrative.whyItMattersZh,
        action: action.en,
        actionZh: action.zh,
        score: Number(
          (
            ordered.reduce((sum, entry) => sum + entry.score, 0) /
            Math.max(ordered.length, 1)
          ).toFixed(1),
        ),
        status: clusterStatus,
        statusZh: clusterStatus === 'confirmed' ? '确认' : '候选',
        sourceTier: getSourceTierLabel(lead.assignment.item),
        relatedArticles,
      };
    })
    .sort((a, b) => {
      const statusWeight = (value: 'confirmed' | 'candidate') =>
        value === 'confirmed' ? 1 : 0;
      const statusDelta = statusWeight(b.status) - statusWeight(a.status);
      if (statusDelta !== 0) return statusDelta;
      return b.score - a.score;
    })
    .slice(0, 8);
}

export async function loadShiftAtlasUpdateSnapshot(): Promise<ShiftAtlasUpdateSnapshot> {
  try {
    const raw = await readFile(UPDATE_FEED_PATH, 'utf8');
    const parsed = JSON.parse(raw) as ShiftAtlasUpdateSnapshot;
    return {
      generatedAt: parsed.generatedAt,
      items: parsed.items ?? [],
    };
  } catch {
    return {
      generatedAt: '',
      items: [],
    };
  }
}

export async function getShiftAtlasRecentUpdatePanels(days = 7) {
  const snapshot = await loadShiftAtlasUpdateSnapshot();
  const recentItems = snapshot.items.filter((item) => {
    const date = normalizeDate(item.publishedAt ?? item.ingestedAt);
    return date ? withinLastDays(date, days) : false;
  });

  return {
    generatedAt: snapshot.generatedAt,
    recentItems,
    weeklyDigest: toWeeklyDigestItems(recentItems),
    signalFlow: toSignalFlowItems(recentItems),
  };
}

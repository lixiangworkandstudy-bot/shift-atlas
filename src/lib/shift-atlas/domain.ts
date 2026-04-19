import type { ShiftAtlasDomainItem, ShiftAtlasKnowledgeDomain } from './types';

export const sectionLabels = {
  coreLibraries: { en: 'Best Sources To Start', zh: '优先看的来源' },
  keyTopics: { en: 'Basic Concepts', zh: '基本概念' },
  candidatePatterns: { en: 'Common Design Moves', zh: '常见设计做法' },
  candidateFrameworks: { en: 'Design Principles', zh: '设计原则' },
  recentSignals: { en: 'Recent Worthwhile Signals', zh: '最近值得看的信号' },
} as const;

export const legacySectionLabels = {
  startHere: { en: 'Start Here', zh: '从这里开始' },
  deepDive: { en: 'Deep Dive', zh: '深入阅读' },
  watchList: { en: 'Watch List', zh: '关注列表' },
} as const;

export const itemTypeLabels = {
  source: { en: 'SOURCE', zh: '来源' },
  concept: { en: 'CONCEPT', zh: '概念' },
  pattern: { en: 'PATTERN', zh: '模式' },
  principle: { en: 'PRINCIPLE', zh: '原则' },
  signal: { en: 'SIGNAL', zh: '信号' },
} as const;

export const axisXLegend = {
  'interface-decisions': {
    label: { en: 'Interface Decisions', zh: '界面决策' },
    standard: {
      en: 'Measures how the user-facing surface changes: chat, controls, layouts, and interaction modes.',
      zh: '衡量用户可见界面如何变化：聊天、控件、布局与交互模式。',
    },
    useWhen: {
      en: 'Use for changes in visible UI structure and interaction form.',
      zh: '用于判断可见 UI 结构和交互形式的变化。',
    },
  },
  'product-mechanics': {
    label: { en: 'Product Mechanics', zh: '产品机制' },
    standard: {
      en: 'Measures how the product works as a system of flows, permissions, states, and actions.',
      zh: '衡量产品作为流程、权限、状态与动作系统的运作方式。',
    },
    useWhen: {
      en: 'Use for workflow logic, task handling, and stateful product behavior.',
      zh: '用于判断工作流逻辑、任务处理和有状态行为。',
    },
  },
  'system-logic': {
    label: { en: 'System Logic', zh: '系统逻辑' },
    standard: {
      en: 'Measures how model/runtime constraints, orchestration, and technical limits shape the product.',
      zh: '衡量模型/运行时约束、编排与技术限制如何塑造产品。',
    },
    useWhen: {
      en: 'Use for infrastructure, orchestration, latency, cost, and runtime boundaries.',
      zh: '用于判断基础设施、编排、延迟、成本与运行时边界。',
    },
  },
  'applications-and-market': {
    label: { en: 'Applications & Market', zh: '应用与市场' },
    standard: {
      en: 'Measures where the concept lands in real use cases, product categories, and market shifts.',
      zh: '衡量概念落在哪些真实场景、产品类别与市场变化中。',
    },
    useWhen: {
      en: 'Use for adoption, category change, business model, and ecosystem impact.',
      zh: '用于判断采用、类别变化、商业模式与生态影响。',
    },
  },
} as const;

export const axisXOrder = [
  'interface-decisions',
  'product-mechanics',
  'system-logic',
  'applications-and-market',
] as const;

export const axisYLegend = {
  'immediate-experience': {
    label: { en: 'Immediate Experience', zh: '即时体验' },
    standard: {
      en: 'Measures what the user feels in the moment: speed, clarity, friction, and visibility.',
      zh: '衡量用户当下感受到的体验：速度、清晰度、摩擦与可见性。',
    },
    useWhen: {
      en: 'Use for first impression, direct interaction, and screen-level behavior.',
      zh: '用于判断第一印象、直接交互和屏幕层行为。',
    },
  },
  'workflow-and-behavior': {
    label: { en: 'Workflow & Behavior', zh: '工作流与行为' },
    standard: {
      en: 'Measures how the product changes repeated behavior, task flow, and collaboration over time.',
      zh: '衡量产品如何改变重复行为、任务流程与长期协作。',
    },
    useWhen: {
      en: 'Use for habits, delegation, multi-step tasks, and recurring use.',
      zh: '用于判断习惯、委托、多步骤任务与重复使用。',
    },
  },
  'system-foundations': {
    label: { en: 'System Foundations', zh: '系统基础' },
    standard: {
      en: 'Measures how deep the concept reaches into memory, runtime, model behavior, and technical base layers.',
      zh: '衡量概念深入到记忆、运行时、模型行为与技术底层的程度。',
    },
    useWhen: {
      en: 'Use for core architecture, constraints, memory, evaluation, and infrastructure.',
      zh: '用于判断核心架构、约束、记忆、评估与基础设施。',
    },
  },
} as const;

export const axisYOrder = [
  'immediate-experience',
  'workflow-and-behavior',
  'system-foundations',
] as const;

export const sectionOrder = [
  'coreLibraries',
  'keyTopics',
  'candidatePatterns',
  'candidateFrameworks',
  'recentSignals',
] as const;

export const legacySectionOrder = [
  'startHere',
  'deepDive',
  'watchList',
] as const;

export type SectionKey =
  | (typeof sectionOrder)[number]
  | (typeof legacySectionOrder)[number];

export interface VisibleSection {
  key: SectionKey;
  label: { en: string; zh: string };
  items: ShiftAtlasDomainItem[];
}

export function getSectionItems(domain: ShiftAtlasKnowledgeDomain, key: SectionKey) {
  const sectionMap = domain as unknown as Partial<Record<SectionKey, ShiftAtlasDomainItem[]>>;
  return sectionMap[key] ?? [];
}

export function getVisibleSections(domain: ShiftAtlasKnowledgeDomain): VisibleSection[] {
  if ('startHere' in domain || 'deepDive' in domain || 'watchList' in domain) {
    return legacySectionOrder
      .map((key) => ({
        key,
        label: legacySectionLabels[key],
        items: getSectionItems(domain, key),
      }))
      .filter((section) => section.items.length > 0);
  }

  return sectionOrder
    .map((key) => ({
      key,
      label: sectionLabels[key],
      items: getSectionItems(domain, key),
    }))
    .filter((section) => section.items.length > 0);
}

export function countDomainItems(domain: ShiftAtlasKnowledgeDomain) {
  return getVisibleSections(domain).reduce((sum, section) => sum + section.items.length, 0);
}

export function getAxisXLegend(axis?: ShiftAtlasKnowledgeDomain['axisX']) {
  return axisXLegend[axis ?? 'product-mechanics'];
}

export function getAxisYLegend(axis?: ShiftAtlasKnowledgeDomain['axisY']) {
  return axisYLegend[axis ?? 'workflow-and-behavior'];
}

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

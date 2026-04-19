export type ShiftAtlasFocusTag =
  | 'interface'
  | 'interaction'
  | 'controls'
  | 'trust'
  | 'control'
  | 'safety'
  | 'agent-workflow'
  | 'delegation'
  | 'memory'
  | 'knowledge'
  | 'runtime'
  | 'constraints'
  | 'evaluation'
  | 'feedback'
  | 'market'
  | 'signals'
  | 'education'
  | 'companionship'
  | 'gamification'
  | 'motivation'
  | 'research';

export type ShiftAtlasAxisX =
  | 'interface-decisions'
  | 'product-mechanics'
  | 'system-logic'
  | 'applications-and-market';

export type ShiftAtlasAxisY =
  | 'immediate-experience'
  | 'workflow-and-behavior'
  | 'system-foundations';

export interface ShiftAtlasLibrary {
  id: string;
  name: string;
  nameZh: string;
  url: string;
  category: 'pattern_library' | 'framework_library' | 'research_archive';
  priority: 'core' | 'supporting';
  focus: string;
  focusZh: string;
  whyItMatters: string;
  whyItMattersZh: string;
  coverage: string[];
  coverageZh: string[];
  captureFields: string[];
  captureFieldsZh: string[];
  focusTags?: ShiftAtlasFocusTag[];
}

export interface ShiftAtlasUpdateSource {
  id: string;
  name: string;
  nameZh: string;
  authority: 'official' | 'academic' | 'media' | 'personal';
  type: 'rss' | 'official_page_fallback';
  focus: string;
  focusZh: string;
  cadence: string;
  cadenceZh: string;
  focusTags?: ShiftAtlasFocusTag[];
}

export interface ShiftAtlasRoadmapItem {
  id: string;
  title: string;
  titleZh: string;
  status: 'now' | 'next' | 'later';
  description: string;
  descriptionZh: string;
}

export interface ShiftAtlasArchitectureLayer {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  topics: string[];
  topicsZh: string[];
}

export interface ShiftAtlasDomainItem {
  id: string;
  label: string;
  labelZh: string;
  summary: string;
  summaryZh: string;
  href?: string;
  focusTags?: ShiftAtlasFocusTag[];
  readingHint?: string;
  readingHintZh?: string;
  itemType?: 'source' | 'concept' | 'pattern' | 'principle' | 'signal';
  caseStudyIds?: string[];
}

export interface ShiftAtlasEntryPrimer {
  coreProblems: string;
  coreProblemsZh: string;
  whyNow: string;
  whyNowZh: string;
  consensus: string;
  consensusZh: string;
}

export interface ShiftAtlasTimelineMilestone {
  id: string;
  year: string;
  yearZh: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  product?: string;
  href?: string;
  significance: 'turning_point' | 'evolution' | 'emerging';
}

export interface ShiftAtlasCaseStudy {
  id: string;
  product: string;
  productZh: string;
  productUrl?: string;
  domainId: string;
  whatItDoes: string;
  whatItDoesZh: string;
  designChoice: string;
  designChoiceZh: string;
  lesson: string;
  lessonZh: string;
}

export interface ShiftAtlasConceptPage {
  slug: string;
  title: string;
  titleZh: string;
  shortSummary: string;
  shortSummaryZh: string;
  definition?: string;
  definitionZh?: string;
  scope?: string;
  scopeZh?: string;
  boundary?: string;
  boundaryZh?: string;
  howToTell?: string[];
  howToTellZh?: string[];
  typicalPatterns?: string[];
  typicalPatternsZh?: string[];
  failureModes?: string[];
  failureModesZh?: string[];
  domainId: string;
  domainTitle: string;
  domainTitleZh: string;
  focusTags?: ShiftAtlasFocusTag[];
  whyItMatters: string;
  whyItMattersZh: string;
  productQuestions: string[];
  productQuestionsZh: string[];
  relatedPatterns: {
    title: string;
    titleZh: string;
    summary: string;
    summaryZh: string;
  }[];
  bestSources: {
    title: string;
    titleZh: string;
    href?: string;
    summary: string;
    summaryZh: string;
  }[];
}

export interface ShiftAtlasKnowledgeDomain {
  id: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  tagline?: string;
  taglineZh?: string;
  productLens: string;
  productLensZh: string;
  curationRule: string;
  curationRuleZh: string;
  entryPrimer?: ShiftAtlasEntryPrimer;
  timeline?: ShiftAtlasTimelineMilestone[];
  caseStudies?: ShiftAtlasCaseStudy[];
  focusTags?: ShiftAtlasFocusTag[];
  axisX?: ShiftAtlasAxisX;
  axisY?: ShiftAtlasAxisY;
  x: number;
  y: number;
  size: 'lg' | 'xl';
  color: string;
  coreLibraries?: ShiftAtlasDomainItem[];
  keyTopics?: ShiftAtlasDomainItem[];
  candidatePatterns?: ShiftAtlasDomainItem[];
  candidateFrameworks?: ShiftAtlasDomainItem[];
  recentSignals?: ShiftAtlasDomainItem[];
  startHere?: ShiftAtlasDomainItem[];
  deepDive?: ShiftAtlasDomainItem[];
  watchList?: ShiftAtlasDomainItem[];
}

export interface ShiftAtlasSourceDomainFit {
  sourceId: string;
  sourceType: 'library' | 'update';
  domainId: string;
  score: number;
  overlapTags: ShiftAtlasFocusTag[];
}

export interface ShiftAtlasFetchedItem {
  sourceId: string;
  sourceName?: string;
  title: string;
  summary?: string | null;
  extracted?: {
    digest: string;
    digestZh: string;
    mainPoint: string;
    mainPointZh: string;
    coreContent: string;
    coreContentZh: string;
  } | null;
  link?: string | null;
  publishedAt?: string | null;
  authority?: string | null;
  deliveryMode?: string | null;
  sourceQuality?: {
    score?: number | null;
    tier?: string | null;
    contentTrust?: number | null;
    researchValue?: number | null;
    designRelevance?: number | null;
    durability?: number | null;
  } | null;
  itemQuality?: {
    score?: number | null;
    passed?: boolean | null;
    reasons?: string[] | null;
  } | null;
}

export interface ShiftAtlasItemDomainFit {
  domainId: string;
  score: number;
  overlapTags: ShiftAtlasFocusTag[];
}

export interface ShiftAtlasItemConceptFit {
  slug: string;
  score: number;
  overlapTags: ShiftAtlasFocusTag[];
}

export interface ShiftAtlasItemAssignment {
  item: ShiftAtlasFetchedItem;
  inferredTags: ShiftAtlasFocusTag[];
  sourceTags: ShiftAtlasFocusTag[];
  bestDomains: ShiftAtlasItemDomainFit[];
  bestConcepts: ShiftAtlasItemConceptFit[];
}

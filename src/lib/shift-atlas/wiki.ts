export interface ShiftAtlasWikiFlowStep {
  title: string;
  titleZh: string;
  detail: string;
  detailZh: string;
}

export interface ShiftAtlasReplacementPhase {
  title: string;
  titleZh: string;
  status: 'done' | 'active' | 'next' | 'ongoing';
  statusZh: string;
  detail: string;
  detailZh: string;
  deliverables: string[];
  deliverablesZh: string[];
}

export interface ShiftAtlasWikiSource {
  title: string;
  titleZh: string;
  href: string;
  summary: string;
  summaryZh: string;
}

export interface ShiftAtlasWikiDraft {
  slug: string;
  title: string;
  titleZh: string;
  status: string;
  statusZh: string;
  summary: string;
  summaryZh: string;
  focus: string;
  focusZh: string;
  nextConceptSlugs: string[];
  sourceLinks: ShiftAtlasWikiSource[];
}

export interface ShiftAtlasWikiTemplate {
  title: string;
  titleZh: string;
  prompt: string;
  promptZh: string;
  requiredSections: string[];
  requiredSectionsZh: string[];
  rules: string[];
  rulesZh: string[];
}

export interface ShiftAtlasEncyclopediaBenchmarkCriterion {
  id: string;
  title: string;
  titleZh: string;
  question: string;
  questionZh: string;
}

export interface ShiftAtlasEncyclopediaBenchmark {
  title: string;
  titleZh: string;
  intro: string;
  introZh: string;
  scoring: string;
  scoringZh: string;
  maxScore: number;
  passThreshold: string;
  passThresholdZh: string;
  criteria: ShiftAtlasEncyclopediaBenchmarkCriterion[];
  reviewQuestions: string[];
  reviewQuestionsZh: string[];
  redFlags: string[];
  redFlagsZh: string[];
}

export const shiftAtlasWikiFlow: ShiftAtlasWikiFlowStep[] = [
  {
    title: 'Choose a main term',
    titleZh: '选择主词条',
    detail: 'Pick the one concept that deserves to carry the whole page.',
    detailZh: '先选那个值得承载整页内容的核心概念。',
  },
  {
    title: 'List related terms',
    titleZh: '列出相关词条',
    detail: 'List the nearby terms first. Do not split them into pages too early.',
    detailZh: '先把相邻词条列出来，不要一开始就急着拆页。',
  },
  {
    title: 'Deepen the strongest terms',
    titleZh: '深挖最重要的词条',
    detail: 'Only split the terms that are frequent, independent, and worth defining on their own.',
    detailZh: '只拆那些高频、独立、而且值得单独定义的词条。',
  },
  {
    title: 'Backlink everything',
    titleZh: '全部回链',
    detail: 'When an entry is finished, send it back into the main term, the domain page, and the graph.',
    detailZh: '词条写完后，要把它回填回主词条、领域页和图谱。',
  },
];

export const shiftAtlasReplacementPlan: ShiftAtlasReplacementPhase[] = [
  {
    title: 'Freeze the writing standard',
    titleZh: '冻结写作标准',
    status: 'done',
    statusZh: '已完成',
    detail:
      'Before adding more content, settle the writing template, the acceptance benchmark, the bilingual defaults, and the backlink rules.',
    detailZh: '在继续扩写之前，先把写作模板、验收基准、双语默认规则和回链规则定下来。',
    deliverables: [
      'Canonical encyclopedia template',
      'Benchmark visible in the wiki hub',
      'Bilingual defaults',
      'Backfill rules for graph and domain pages',
    ],
    deliverablesZh: ['百科模板定稿', '检查基准显示在 wiki hub', '中英双语默认规则', '图谱与领域页回填规则'],
  },
  {
    title: 'Replace the content layer',
    titleZh: '替换内容层',
    status: 'active',
    statusZh: '进行中',
    detail:
      'Rewrite the six core layers into real encyclopedia pages, then fill in the opening framing, case studies, timelines, and signal sources.',
    detailZh: '把六个核心知识层改写成真正的百科词条，再补齐入口文、案例、时间线和信号来源。',
    deliverables: [
      'Six core knowledge layers',
      'Main entries with article bodies',
      'Case studies and timelines',
      'Layer-specific signal sources',
    ],
    deliverablesZh: ['六大核心知识层', '完整主词条正文', '案例与时间线', '每层信号源'],
  },
  {
    title: 'Replace graph shorthand',
    titleZh: '替换图谱简写',
    status: 'next',
    statusZh: '下一步',
    detail:
      'Strip out temporary summaries and card shorthand so the graph only does one job: send people to the full article.',
    detailZh: '把临时摘要和卡片简写都拿掉，让图谱只做一件事：把人送到完整正文。',
    deliverables: [
      'Graph nodes stay name-first',
      'Domain cards point to article pages',
      'No right-rail summary walls',
      'Graph copy becomes navigational only',
    ],
    deliverablesZh: ['节点只显示名字', '领域卡直接进词条页', '不再有右侧摘要墙', '图谱文案只做导航'],
  },
  {
    title: 'Keep the loop active',
    titleZh: '保持循环运转',
    status: 'ongoing',
    statusZh: '持续进行',
    detail:
      'Every new source should be placed in the right layer first, then turned into a term, a case, or a signal note, and finally written back into the wiki and graph.',
    detailZh: '每个新来源都要先放进正确的层，再判断它该变成词条、案例还是信号记录，最后回填进 wiki 和图谱。',
    deliverables: [
      'Source-to-layer classification',
      'Term / case / signal decision rule',
      'Backfill into domain pages',
      'Graph and wiki stay synchronized',
    ],
    deliverablesZh: ['来源分层规则', '词条 / 案例 / 信号决策规则', '回填领域页', '图谱与 wiki 同步'],
  },
];

export const shiftAtlasWikiDrafts: ShiftAtlasWikiDraft[] = [
  {
    slug: 'ai-interface-patterns',
    title: 'AI Interface Patterns',
    titleZh: 'AI 界面模式',
    status: 'Main entry draft',
    statusZh: '主词条草稿',
    summary:
      'This draft is the canonical article source: the main page defines the term, child pages expand only stable subterms, and the graph mirrors the article after publication.',
    summaryZh: '这篇草稿是 canonical 词条源：主文定义概念，子页只扩展稳定子词条，图谱在发布后再回填。',
    focus:
      'The current job is to write the detailed main entry first, then deepen only the subterms that are reusable enough to deserve their own pages, and finally mirror the finished terms back into the graph.',
    focusZh: '当前任务是先写完整主词条，再把足够稳定、可复用的子概念继续深化成独立词条，最后把完成的词条回填到图谱里。',
    nextConceptSlugs: [
      'chat-becomes-interface',
      'responses-become-actions',
      'show-complexity-step-by-step',
      'interface-remembers-state',
      'controls-shift-with-task',
      'natural-interaction',
      'accessibility-and-inclusion',
    ],
    sourceLinks: [
      {
        title: 'AI UX Design Guide',
        titleZh: 'AI UX 设计指南',
        href: 'https://www.aiuxdesign.guide/',
        summary: 'Structured examples of AI UX patterns and interface references.',
        summaryZh: '结构化的 AI UX 模式与界面参考。',
      },
      {
        title: 'Cloudscape GenAI Patterns',
        titleZh: 'Cloudscape GenAI Patterns',
        href: 'https://cloudscape.design/patterns/genai/genai-patterns/',
        summary: 'Good structural reference for AI interaction primitives.',
        summaryZh: '适合作为 AI 交互原语的结构参考。',
      },
      {
        title: 'AIUX Patterns',
        titleZh: 'AIUX Patterns',
        href: 'https://www.aiuxpatterns.com/patterns.html',
        summary: 'Micro-pattern references for confirmation, history, and response structures.',
        summaryZh: '用于确认、历史与响应结构的微模式参考。',
      },
    ],
  },
];

export const shiftAtlasWikiTemplate: ShiftAtlasWikiTemplate = {
  title: 'Encyclopedia Entry Template',
  titleZh: '百科词条模板',
  prompt:
    'Write this as the canonical encyclopedia entry for Shift Atlas. Start with a precise one-sentence definition, then explain the term in full prose: what it means, where its boundary is, how to recognize it, and why it matters for product judgment. Finish the article first, then use it to update the graph node and domain page. Do not write card copy, marketing copy, or reading notes.',
  promptZh:
    '把这篇内容写成 Shift Atlas 的标准百科词条。先给出准确的一句话定义，再用完整正文说明这个词到底在说什么、边界在哪里、怎么判断、为什么会影响产品判断。先把文章写完整，再拿文章去更新图谱节点和领域页，不要写成卡片文案、宣传文案或资料摘记。',
  requiredSections: [
    'One-line definition',
    'What this term means',
    'Scope',
    'Boundary',
    'How to tell',
    'Why it matters',
    'Typical patterns',
    'Common failure modes',
    'Related terms',
    'Backlinks',
    'References',
  ],
  requiredSectionsZh: [
    '一句话定义',
    '这个词条在说什么',
    '范围',
    '边界',
    '怎么判断',
    '为什么重要',
    '典型模式',
    '常见失效方式',
    '相关词条',
    '回链',
    '参考来源',
  ],
  rules: [
    'Make the definition stable, specific, and easy to quote back.',
    'Write like an encyclopedia editor, not like a marketer, operator, or note taker.',
    'Only split a new subentry when it appears often, stands on its own, and changes how the main term is understood.',
    'Do not mix up concept, pattern, principle, source, and example.',
    'Use product news only when it helps define the term or shows that the boundary has shifted.',
    'Finish the article first. Then backfill the graph node and domain page from the article.',
  ],
  rulesZh: [
    '定义要稳定、具体，而且别人读完能准确复述。',
    '写作视角要像百科编辑，不像市场文案、运营总结或资料摘抄。',
    '只有当一个子概念高频、独立，而且会改变主词条的理解方式时，才拆成新词条。',
    '不要把概念、模式、原则、来源和例子混在一起。',
    '只有当产品新闻会改变定义或边界时，才让它进入正文；否则优先写持久的产品判断。',
    '先把文章写完整，再用它去更新图谱节点和领域页。',
  ],
};

export const shiftAtlasEncyclopediaBenchmark: ShiftAtlasEncyclopediaBenchmark = {
  title: 'Encyclopedia Benchmark',
  titleZh: '百科词条检查基准',
  intro:
    'Use this benchmark to decide whether a Shift Atlas entry reads like a real encyclopedia page or still feels like a summary card.',
  introZh:
    '用这个基准判断一篇 Shift Atlas 词条到底像不像真正的百科页面，还是仍然更像一张摘要卡。',
  scoring: 'Score each criterion from 0 to 2: 0 = missing, 1 = partial, 2 = complete.',
  scoringZh: '每项按 0 到 2 分打分：0 = 缺失，1 = 部分完成，2 = 完整。',
  maxScore: 20,
  passThreshold: '16-20: ready to publish | 12-15: needs one more drafting pass | 0-11: structural rewrite',
  passThresholdZh: '16-20：可发布；12-15：还需要一次补写；0-11：需要结构重写。',
  criteria: [
    {
      id: 'definition',
      title: 'Definition',
      titleZh: '定义',
      question: 'Is the concept defined in one precise sentence?',
      questionZh: '这个概念是否已经用一句准确的话定义清楚？',
    },
    {
      id: 'scope',
      title: 'Scope',
      titleZh: '范围',
      question: 'Does the entry explain what belongs inside the term?',
      questionZh: '词条是否解释了哪些内容属于这个概念？',
    },
    {
      id: 'boundary',
      title: 'Boundary',
      titleZh: '边界',
      question: 'Does the entry explain what does not belong inside the term?',
      questionZh: '词条是否说明了哪些内容不属于这个概念？',
    },
    {
      id: 'mechanism',
      title: 'Mechanism',
      titleZh: '机制',
      question: 'Does the page explain how the concept works in the product?',
      questionZh: '页面是否解释了这个概念在产品里是如何运作的？',
    },
    {
      id: 'distinction',
      title: 'How to tell',
      titleZh: '怎么判断',
      question: 'Can a reader distinguish this term from adjacent concepts?',
      questionZh: '读者能否把这个词条和相邻概念区分开来？',
    },
    {
      id: 'importance',
      title: 'Why it matters',
      titleZh: '为什么重要',
      question: 'Does the page explain the product relevance, not just the theory?',
      questionZh: '页面是否说明了它的产品意义，而不只是理论？',
    },
    {
      id: 'patterns',
      title: 'Typical patterns',
      titleZh: '典型模式',
      question: 'Are the common shapes or product manifestations clear?',
      questionZh: '常见形态或产品表现是否清楚？',
    },
    {
      id: 'failure',
      title: 'Failure modes',
      titleZh: '失效方式',
      question: 'Does the page explain how the concept breaks in practice?',
      questionZh: '页面是否解释了这个概念在实践中会怎样失效？',
    },
    {
      id: 'related',
      title: 'Related terms',
      titleZh: '相关词条',
      question: 'Are backlinks and subterms useful rather than decorative?',
      questionZh: '回链和子词条是否真正有用，而不是装饰？',
    },
    {
      id: 'references',
      title: 'References',
      titleZh: '参考来源',
      question: 'Are the sources concrete, relevant, and durable?',
      questionZh: '参考来源是否具体、相关、并且足够稳定？',
    },
  ],
  reviewQuestions: [
    'Can a reader explain the term back in their own words?',
    'Can a reader say when to use this term and when not to use it?',
    'Does the page move from definition to mechanism to judgment?',
    'Is the entry more than a source list or card deck?',
    'Would the page still make sense if the sources were removed?',
  ],
  reviewQuestionsZh: [
    '读者能否用自己的话解释这个词条？',
    '读者能否说出什么时候该用这个词条、什么时候不该用？',
    '页面是否从定义走到机制，再走到判断？',
    '这篇词条是否不只是来源列表或卡片堆？',
    '如果去掉来源，这个页面是否仍然说得通？',
  ],
  redFlags: [
    'The page reads like a summary card instead of a term definition.',
    'The boundary is vague or absent.',
    'The term is too broad to be useful.',
    'Sources are present but do not support the argument.',
    'Examples appear before the mechanism is defined.',
  ],
  redFlagsZh: [
    '页面读起来像摘要卡，而不是词条定义。',
    '边界模糊或缺失。',
    '概念过于宽泛，没法真正使用。',
    '有来源，但来源并不支撑正文论证。',
    '例子先于机制出现，导致解释顺序倒置。',
  ],
};

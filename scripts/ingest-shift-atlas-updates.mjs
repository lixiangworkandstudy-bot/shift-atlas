import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_PATH = path.join(process.cwd(), 'content', 'shift-atlas', 'fetched-updates.json');
const MAX_ITEMS_PER_SOURCE = 6;

const sources = [
  {
    id: 'google-ai',
    name: 'Google AI Blog',
    authority: 'official',
    type: 'rss',
    tier: 'core',
    url: 'https://blog.google/innovation-and-ai/technology/ai/rss/',
  },
  {
    id: 'microsoft-research',
    name: 'Microsoft Research Blog',
    authority: 'official',
    type: 'rss',
    tier: 'core',
    url: 'https://www.microsoft.com/en-us/research/feed/',
  },
  {
    id: 'openai-news',
    name: 'OpenAI Newsroom',
    authority: 'official',
    type: 'rss',
    tier: 'core',
    url: 'https://openai.com/news/rss.xml',
  },
  {
    id: 'nngroup',
    name: 'Nielsen Norman Group',
    authority: 'academic',
    type: 'rss',
    tier: 'core',
    url: 'https://www.nngroup.com/feed/rss/',
  },
  {
    id: 'mit-tech-review',
    name: 'MIT Technology Review',
    authority: 'media',
    type: 'rss',
    tier: 'secondary',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
  },
  {
    id: 'the-verge-ai',
    name: 'The Verge AI',
    authority: 'media',
    type: 'rss',
    tier: 'watch',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
  {
    id: 'simon-willison',
    name: 'Simon Willison',
    authority: 'personal',
    type: 'rss',
    tier: 'secondary',
    url: 'https://simonwillison.net/atom/everything/',
  },
];

function decodeHtmlEntities(value) {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…');
}

function stripTags(value) {
  return decodeHtmlEntities(String(value ?? ''))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(value) {
  return String(value ?? '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
    .replace(/#+\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function clipText(value, maxLength = 220) {
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

function removeLeadTitle(summary, title) {
  const normalizedSummary = String(summary ?? '').trim();
  const normalizedTitle = String(title ?? '').trim();
  if (!normalizedSummary || !normalizedTitle) return normalizedSummary;

  const lowerSummary = normalizedSummary.toLowerCase();
  const lowerTitle = normalizedTitle.toLowerCase();
  if (!lowerSummary.startsWith(lowerTitle)) return normalizedSummary;

  return normalizedSummary
    .slice(normalizedTitle.length)
    .replace(/^[:\-–—\s]+/, '')
    .trim();
}

function cleanSummaryText(summary, title) {
  return stripMarkdown(removeLeadTitle(summary, title))
    .replace(/^\s*(release|tool|announcement|news|update)\s*:\s*/i, '')
    .replace(/\bTags:\s.*$/i, '')
    .replace(/\bRead more\b.*$/i, '')
    .replace(/\[\.\.\.\]$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSentences(text) {
  return String(text ?? '')
    .split(/(?<=[.!?。！？])\s+/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function isBoilerplateSentence(sentence) {
  const lower = sentence.toLowerCase();
  if (
    [
    'sign up here',
    'appeared first on',
    'this story originally appeared',
    'tags:',
    'via hacker news',
    'coming soon:',
    'to get stories like this in your inbox',
    'hello and welcome to',
    'annual subscriptions',
    'newsletter for',
    'if you’ve found your way',
    "if you've found your way",
    'in your inbox',
    'the yaml format looks like this',
    'built from this',
    'news section built from',
    'here are the rest of the changes',
    'the rest of the changes',
    'this format is a little hard to edit',
    'paste that yaml into',
    'subscriptions are currently',
    'that’s $30 a year',
    "that's $30 a year",
  ].some((fragment) => lower.includes(fragment))
  ) {
    return true;
  }

  if (/^\s*[-*]\s+/.test(sentence)) return true;
  if (sentence.includes('|-')) return true;
  if ((sentence.match(/:/g) ?? []).length >= 3) return true;
  if ((sentence.match(/\b[a-z0-9_-]+\.(yaml|json|md)\b/gi) ?? []).length >= 1) return true;
  if ((sentence.match(/https?:\/\//g) ?? []).length >= 1) return true;
  return false;
}

function scoreSentence(sentence, title) {
  const lower = sentence.toLowerCase();
  let score = 0;
  const titleKeywords = String(title ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(
      (token) =>
        token &&
        token.length > 3 &&
        ![
          'with',
          'from',
          'that',
          'this',
          'have',
          'will',
          'into',
          'over',
          'more',
          'your',
          'even',
          'just',
          'than',
          'their',
          'future',
        ].includes(token),
    );

  if (sentence.length >= 50 && sentence.length <= 220) score += 2;
  if (
    [
      'launch',
      'launched',
      'introduces',
      'introduced',
      'announce',
      'announced',
      'changes',
      'changed',
      'improves',
      'improved',
      'joins',
      'using',
      'uses',
      'lets',
      'allows',
      'now',
      'no longer',
      'new ',
      'becoming',
    ].some((keyword) => lower.includes(keyword))
  ) {
    score += 3;
  }

  if (
    [
      'ai',
      'agent',
      'workflow',
      'tool',
      'security',
      'trust',
      'memory',
      'interface',
      'design',
      'evaluation',
      'benchmark',
      'runtime',
      'access',
      'browser',
      'code',
    ].some((keyword) => lower.includes(keyword))
  ) {
    score += 2;
  }

  if (title && lower.includes(String(title).toLowerCase())) score -= 1;
  const keywordOverlap = titleKeywords.reduce(
    (sum, keyword) => (lower.includes(keyword) ? sum + 1 : sum),
    0,
  );
  score += Math.min(keywordOverlap, 3) * 1.5;
  if (lower.startsWith('release:') || lower.startsWith('tool:')) score -= 1;
  if (sentence.length < 35) score -= 2;
  if ((sentence.match(/,/g) ?? []).length >= 4) score -= 1;
  if (
    [
      'stock jumped',
      'fan art',
      'newsletter',
      'subscription',
      'preview ui',
      'yaml',
      'wool runner',
    ].some((fragment) => lower.includes(fragment))
  ) {
    score -= 4;
  }

  return score;
}

function cleanTitle(title) {
  return String(title ?? '')
    .replace(/^\s*(release|tool|announcement|news|update)\s*:\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickInformativeSentences(title, summary) {
  const cleaned = cleanSummaryText(summary, title);
  const sentences = splitSentences(cleaned)
    .filter((sentence) => !isBoilerplateSentence(sentence))
    .map((sentence) => ({ sentence, score: scoreSentence(sentence, title) }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.sentence);

  if (!sentences.length && cleaned) {
    return [cleaned];
  }

  return sentences.slice(0, 3);
}

function detectTopicTheme(text) {
  const lower = text.toLowerCase();
  const themes = [
    {
      match: [
        'workflow',
        'skill',
        'process redesign',
        'software engineering',
        'agent-first',
        'automation',
      ],
      zh: '这条更新在说明 AI 正在从单点功能走向可复用的工作流单元。',
    },
    {
      match: ['trust', 'security', 'trusted access', 'watermark', 'safety', 'control'],
      zh: '这条更新在说明信任、权限和风险展示正在变成产品前台问题。',
    },
    {
      match: ['benchmark', 'evaluation', 'survey', 'performance', 'report', 'quality'],
      zh: '这条更新在强调评估、质量判断和反馈闭环的重要性。',
    },
    {
      match: ['memory', 'history', 'continual learning', 'context', 'preferences'],
      zh: '这条更新在提醒产品团队重新判断什么该被记住、什么该被延续。',
    },
    {
      match: ['design', 'interface', 'user', 'interactive', 'genui', 'chrome'],
      zh: '这条更新在说明 AI 交互正在从一次性操作走向更明确的界面和任务结构。',
    },
    {
      match: ['market', 'competition', 'memo', 'future of work', 'ai index', 'platform'],
      zh: '这条更新更像市场和产品信号，值得用来判断行业方向而不是只看新闻热度。',
    },
  ];

  const found = themes.find((theme) => theme.match.some((keyword) => lower.includes(keyword)));
  return found?.zh ?? '这条更新值得关注，因为它可能改写相关领域的产品判断。';
}

function buildExtractedSummary(title, summary) {
  const informative = pickInformativeSentences(title, summary);
  const cleanedTitle = cleanTitle(title);
  const mainPointSource =
    informative[0] && informative[0].length > 40 ? informative[0] : cleanedTitle || informative[0];
  const mainPoint = clipText(mainPointSource, 150);
  const coreContentSource =
    informative[1] ??
    informative[0] ??
    cleanSummaryText(summary, title) ??
    String(summary ?? '').replace(/\s+/g, ' ').trim();
  const coreContent = clipText(coreContentSource, 220);
  const digest = clipText(`${mainPoint} ${coreContent !== mainPoint ? coreContent : ''}`, 260);
  const digestZh = clipText(
    `主要观点：${detectTopicTheme(`${title} ${summary ?? ''}`)} 核心内容：${coreContent}`,
    260,
  );

  return {
    digest,
    digestZh,
    mainPoint,
    mainPointZh: mainPoint,
    coreContent,
    coreContentZh: coreContent,
  };
}

function getTagValue(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? stripTags(match[1]) : null;
}

function getAtomLink(block) {
  const hrefMatch = block.match(/<link[^>]+href="([^"]+)"[^>]*\/?>/i);
  if (hrefMatch?.[1]) return hrefMatch[1];
  return getTagValue(block, 'id');
}

function normalizeDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function parseRssItems(xml, source) {
  const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  return itemMatches.slice(0, MAX_ITEMS_PER_SOURCE).map((block) => {
    const title = getTagValue(block, 'title') ?? '(untitled)';
    const summary = getTagValue(block, 'description');

    return {
      sourceId: source.id,
      sourceName: source.name,
      title,
      summary,
      extracted: buildExtractedSummary(title, summary),
      link: getTagValue(block, 'link'),
      publishedAt: normalizeDate(getTagValue(block, 'pubDate')),
      authority: source.authority,
      deliveryMode: source.type,
      sourceQuality: {
        tier: source.tier,
        score: source.tier === 'core' ? 3 : source.tier === 'secondary' ? 2 : 1,
      },
    };
  });
}

function parseAtomItems(xml, source) {
  const entryMatches = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  return entryMatches.slice(0, MAX_ITEMS_PER_SOURCE).map((block) => {
    const title = getTagValue(block, 'title') ?? '(untitled)';
    const summary = getTagValue(block, 'summary') ?? getTagValue(block, 'content');

    return {
      sourceId: source.id,
      sourceName: source.name,
      title,
      summary,
      extracted: buildExtractedSummary(title, summary),
      link: getAtomLink(block),
      publishedAt: normalizeDate(getTagValue(block, 'updated') ?? getTagValue(block, 'published')),
      authority: source.authority,
      deliveryMode: source.type,
      sourceQuality: {
        tier: source.tier,
        score: source.tier === 'core' ? 3 : source.tier === 'secondary' ? 2 : 1,
      },
    };
  });
}

async function fetchFeed(source) {
  const response = await fetch(source.url, {
    headers: {
      'user-agent': 'ShiftAtlasBot/1.0',
      accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, text/html;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`${source.id} returned ${response.status}`);
  }

  const text = await response.text();
  if (text.includes('<entry')) {
    return parseAtomItems(text, source);
  }

  return parseRssItems(text, source);
}

function dedupeItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.link ?? ''}::${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function main() {
  const ingestedAt = new Date().toISOString();
  const collected = [];
  const errors = [];

  for (const source of sources) {
    try {
      const items = await fetchFeed(source);
      collected.push(
        ...items.map((item) => ({
          ...item,
          ingestedAt,
        })),
      );
    } catch (error) {
      errors.push({
        sourceId: source.id,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const items = dedupeItems(collected).sort((a, b) => {
    const left = new Date(a.publishedAt ?? a.ingestedAt).getTime();
    const right = new Date(b.publishedAt ?? b.ingestedAt).getTime();
    return right - left;
  });

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify(
      {
        generatedAt: ingestedAt,
        itemCount: items.length,
        sourceCount: sources.length,
        errors,
        items,
      },
      null,
      2,
    ),
  );

  console.log(`Wrote ${items.length} items to ${OUTPUT_PATH}`);
  if (errors.length > 0) {
    console.log(`Completed with ${errors.length} source errors.`);
    for (const error of errors) {
      console.log(`- ${error.sourceId}: ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

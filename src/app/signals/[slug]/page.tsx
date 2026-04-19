import Link from 'next/link';
import { PixelButton } from '@/components/pixel';

interface Signal {
  id: string;
  title_en: string;
  title_zh: string;
  date: string;
  category: string;
  readTime: string;
  content_en: string[];
  content_zh: string[];
  tags: string[];
}

const signals: Record<string, Signal> = {
  '014': {
    id: '014',
    title_en: 'Designing Calm Interfaces in Intelligent Systems',
    title_zh: '设计智能系统中的平静界面',
    date: '2025.01.02',
    category: 'AI × UX',
    readTime: '6 min',
    tags: ['AI', 'UX Design', 'Calm Technology'],
    content_en: [
      'The most powerful AI systems are often the ones that fade into the background. As we build increasingly capable intelligent systems, the temptation is to showcase their capabilities at every turn. But there\'s a deeper wisdom in restraint.',
      'Calm technology, a concept introduced by Mark Weiser and John Seely Brown at Xerox PARC in 1995, suggests that the most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it.',
      'In AI-powered interfaces, this principle takes on new urgency. Users don\'t need to see the complexity of what\'s happening behind the scenes. They need outcomes that feel natural, transitions that feel smooth, and interactions that respect their attention.',
      'The challenge lies in finding the right balance. How do we design interfaces that communicate capability without demanding attention? How do we build trust through transparency without overwhelming users with information?',
      'The answer often lies in progressive disclosure, contextual awareness, and careful choreography of information. Show what\'s needed when it\'s needed. Anticipate questions before they\'re asked. And always, always respect the user\'s cognitive load.',
      'Calm interfaces aren\'t about hiding complexity. They\'re about orchestrating it. The intelligence should feel like a helpful presence, not an intrusive one. It should augment human capability, not replace human agency.'
    ],
    content_zh: [
      '最强大的AI系统往往是那些能够融入背景的系统。随着我们构建越来越强大的智能系统，在每一个转折点展示其能力是一种诱惑。但克制中蕴含着更深的智慧。',
      '平静技术（Calm Technology）是Mark Weiser和John Seely Brown于1995年在施乐帕洛阿尔托研究中心提出的概念，它认为最深刻的技术是那些消失的技术。它们融入日常生活的织物中，直到无法区分。',
      '在AI驱动的界面中，这一原则变得更加紧迫。用户不需要看到幕后发生的复杂性。他们需要的是感觉自然的结果、感觉顺畅的过渡，以及尊重他们注意力的交互。',
      '挑战在于找到正确的平衡。我们如何设计既能传达能力又不要求注意力的界面？我们如何通过透明度建立信任而不让用户被信息淹没？',
      '答案往往在于渐进式披露、情境感知和信息的精心编排。在需要时展示需要的内容。在问题被提出之前预见问题。并且始终、始终尊重用户的认知负荷。',
      '平静的界面不是要隐藏复杂性。它们是要编排复杂性。智能应该感觉像一个有帮助的存在，而不是一个侵入性的存在。它应该增强人类的能力，而不是取代人类的代理权。'
    ],
  },
  '011': {
    id: '011',
    title_en: 'Trust Is a Design Decision, Not a Feature',
    title_zh: '信任是一种设计决策，而非功能',
    date: '2024.12.18',
    category: 'Human–AI',
    readTime: '5 min',
    tags: ['Trust', 'Human-AI Interaction', 'Design Philosophy'],
    content_en: [
      'Trust cannot be bolted on. It cannot be added as a feature after the fact, sprinkled like seasoning on an otherwise complete dish. Trust must be designed into the foundation of every interaction.',
      'When users interact with AI systems, they make split-second judgments about reliability. These judgments are informed by everything: the timing of responses, the tone of language, the handling of errors, and the acknowledgment of limitations.',
      'Many systems fail not because they lack capability, but because they fail to communicate their capability appropriately. Overpromising leads to disappointment. Underdelivering leads to abandonment. But honest communication about what a system can and cannot do? That builds lasting trust.',
      'Consider how we build trust with humans. It happens through consistency, through admission of mistakes, through follow-through on commitments. AI systems should aspire to the same standards.',
      'This means designing for graceful degradation. It means being upfront about uncertainty. It means giving users control over decisions that matter to them. Trust is not a toggle that can be switched on. It\'s a relationship that must be earned through every interaction.',
      'The systems that will endure are not the ones that promise everything. They are the ones that promise only what they can deliver, and then deliver it reliably, time after time.'
    ],
    content_zh: [
      '信任不能被后期附加。它不能作为一个功能在事后添加，不能像调味料一样撒在一道已经完成的菜上。信任必须被设计到每一次交互的基础中。',
      '当用户与AI系统交互时，他们会在瞬间做出关于可靠性的判断。这些判断受到一切因素的影响：响应的时机、语言的语调、错误的处理以及对局限性的承认。',
      '许多系统失败不是因为它们缺乏能力，而是因为它们未能恰当地传达自己的能力。过度承诺导致失望。交付不足导致放弃。但关于系统能做什么和不能做什么的诚实沟通？这能建立持久的信任。',
      '考虑一下我们如何与人建立信任。它通过一致性、通过承认错误、通过履行承诺来实现。AI系统应该追求同样的标准。',
      '这意味着为优雅降级而设计。这意味着对不确定性坦诚相告。这意味着让用户控制对他们重要的决策。信任不是一个可以打开的开关。它是一种必须通过每一次交互来赢得的关系。',
      '能够持久的系统不是那些承诺一切的系统。它们是那些只承诺自己能交付的东西，然后一次又一次可靠地交付的系统。'
    ],
  },
  '007': {
    id: '007',
    title_en: 'When Automation Fails, Interfaces Matter More',
    title_zh: '当自动化失败时，界面更加重要',
    date: '2024.11.20',
    category: 'Product Thinking',
    readTime: '4 min',
    tags: ['Automation', 'Error Handling', 'Resilience'],
    content_en: [
      'We design automated systems with an optimistic assumption: that they will work. But the true test of any system is not how it performs when everything goes right. It\'s how it fails when things go wrong.',
      'When automation fails, users are suddenly thrust into a situation they weren\'t prepared for. They must understand what happened, why it happened, and what they should do next. The interface becomes their lifeline.',
      'Good failure design requires anticipating the unexpected. It means providing clear, actionable information when things break down. It means designing escape hatches that don\'t require deep technical knowledge to use.',
      'Consider the difference between "Error: Process failed" and "We couldn\'t complete your request because the connection timed out. You can try again, or we can save your work and notify you when the system is back." The second respects the user\'s time, context, and emotional state.',
      'The best systems fail gracefully. They acknowledge the problem, provide context, offer options, and preserve user work. They turn moments of frustration into opportunities for building trust through transparency and care.'
    ],
    content_zh: [
      '我们设计自动化系统时带着一个乐观的假设：它们会工作。但任何系统的真正考验不是当一切顺利时它的表现如何。而是当事情出错时它如何失败。',
      '当自动化失败时，用户突然被推入一个他们没有准备好的情况。他们必须理解发生了什么、为什么发生以及接下来应该怎么做。界面成为他们的生命线。',
      '良好的失败设计需要预见意外。这意味着在事情崩溃时提供清晰、可操作的信息。这意味着设计不需要深厚技术知识就能使用的逃生出口。',
      '考虑一下"错误：处理失败"和"我们无法完成您的请求，因为连接超时。您可以重试，或者我们可以保存您的工作，并在系统恢复时通知您"之间的区别。后者尊重用户的时间、上下文和情感状态。',
      '最好的系统优雅地失败。它们承认问题、提供上下文、提供选项并保留用户的工作。它们将挫败的时刻转化为通过透明和关怀建立信任的机会。'
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(signals).map((slug) => ({ slug }));
}

export default async function SignalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const signal = signals[slug];

  if (!signal) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-pixel)] text-[20px] text-red-primary mb-4">
            404 // SIGNAL NOT FOUND
          </h1>
          <Link href="/" className="text-text-secondary hover:text-red-primary">
            ← Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-terminal border-b-2 border-red-primary">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/#signals"
            className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
          >
            ← BACK TO SIGNALS
          </Link>
          <span className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary">
            SIGNAL_{signal.id}
          </span>
        </div>
      </nav>

      <main className="pt-20 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-text-tertiary">
              <span className="text-red-primary font-semibold">
                SIGNAL_{signal.id}
              </span>
              <span>•</span>
              <span>{signal.date}</span>
              <span>•</span>
              <span>{signal.readTime} read</span>
            </div>

            {/* Title */}
            <h1
              className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] text-text-primary mb-4 leading-tight"
              data-en={signal.title_en}
              data-zh={signal.title_zh}
            >
              {signal.title_en}
            </h1>

            {/* Category */}
            <div className="inline-block bg-red-overlay px-3 py-1 border border-line-subtle">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-text-secondary">
                ◆ {signal.category}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6 mb-12">
            {signal.content_en.map((paragraph, index) => (
              <p
                key={index}
                className="font-[family-name:var(--font-body)] text-text-secondary leading-relaxed text-[length:var(--text-base)]"
                data-en={paragraph}
                data-zh={signal.content_zh[index]}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mb-12 pt-6 border-t border-line-pixel">
            <div className="flex flex-wrap gap-2">
              {signal.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-text-tertiary border border-line-subtle px-2 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <footer className="pt-8 border-t border-line-pixel">
            <div className="flex justify-between items-center">
              <Link href="/#signals">
                <PixelButton variant="ghost">
                  ← ALL SIGNALS
                </PixelButton>
              </Link>
              <Link href="/#projects">
                <PixelButton variant="terminal">
                  VIEW PROJECTS →
                </PixelButton>
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}

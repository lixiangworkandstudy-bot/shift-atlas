'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PixelButton } from '@/components/pixel';

const ProjectVisual = dynamic(
  () => import('@/components/canvas/ProjectVisual'),
  { ssr: false }
);

interface Project {
  id: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
  role: string;
  scope: string;
  impact: string;
  seed: number;
  challenge_en: string;
  challenge_zh: string;
  approach_en: string;
  approach_zh: string;
  solution_en: string;
  solution_zh: string;
  results_en: string[];
  results_zh: string[];
}

const projects: Record<string, Project> = {
  'ai-companion': {
    id: 'ai-companion',
    title_en: 'AI Companion Design System',
    title_zh: 'AI 伴侣设计系统',
    description_en: 'Designed attachment-aware UX for human-AI emotional bonds',
    description_zh: '为人机情感纽带设计了关注依恋的用户体验',
    role: 'Product Design Lead',
    scope: 'UX Research • System Design',
    impact: '40% retention increase',
    seed: 1,
    challenge_en: 'Users formed emotional attachments to AI companions but existing UX patterns didn\'t acknowledge or support these bonds, leading to user frustration and distrust when AI behavior felt inconsistent.',
    challenge_zh: '用户与AI伴侣建立了情感联系，但现有的用户体验模式未能承认或支持这些纽带，导致当AI行为感觉不一致时用户产生挫败感和不信任。',
    approach_en: 'Conducted extensive user research to understand attachment patterns. Developed a framework for consistent AI personality expression across all touchpoints. Created design guidelines for emotional transitions and memory acknowledgment.',
    approach_zh: '进行了广泛的用户研究以了解依恋模式。开发了在所有触点上一致表达AI个性的框架。为情感过渡和记忆确认创建了设计指南。',
    solution_en: 'A comprehensive design system that includes personality consistency guidelines, emotional state visualization, memory reference patterns, and graceful degradation for AI limitations. The system helps users build trust through predictable, emotionally intelligent interactions.',
    solution_zh: '一个全面的设计系统，包括个性一致性指南、情感状态可视化、记忆参考模式和AI限制的优雅降级。该系统通过可预测的、情感智能的交互帮助用户建立信任。',
    results_en: ['40% increase in user retention over 6 months', 'Reduced user-reported frustration by 65%', 'Established new industry patterns for AI companion UX'],
    results_zh: ['6个月内用户留存率提升40%', '用户报告的挫败感减少65%', '为AI伴侣用户体验建立了新的行业模式'],
  },
  'llm-evaluation': {
    id: 'llm-evaluation',
    title_en: 'LLM Evaluation Platform',
    title_zh: 'LLM 评估平台',
    description_en: 'Built evaluation framework for ByteDance AI products',
    description_zh: '为字节跳动 AI 产品构建评估框架',
    role: 'UX Researcher',
    scope: 'System Design • Data Viz',
    impact: '30% faster evaluation',
    seed: 2,
    challenge_en: 'Evaluating LLM performance required manual testing that was slow, inconsistent, and couldn\'t scale with rapid model iterations. Teams lacked visibility into quality metrics across different use cases.',
    challenge_zh: 'LLM性能评估需要手动测试，这种方式缓慢、不一致，且无法随着模型快速迭代而扩展。团队缺乏对不同用例质量指标的可见性。',
    approach_en: 'Mapped the entire evaluation workflow with stakeholders. Identified key metrics that mattered for product decisions. Designed a modular system that could adapt to different product contexts.',
    approach_zh: '与利益相关者一起绘制整个评估工作流程。确定对产品决策重要的关键指标。设计了一个可以适应不同产品上下文的模块化系统。',
    solution_en: 'An automated evaluation platform with customizable test suites, real-time dashboard visualization, and comparative analysis tools. The platform integrates with CI/CD pipelines for continuous quality monitoring.',
    solution_zh: '一个具有可定制测试套件、实时仪表板可视化和比较分析工具的自动化评估平台。该平台与CI/CD管道集成，实现持续质量监控。',
    results_en: ['30% reduction in evaluation time', 'Standardized quality metrics across 5+ products', 'Enabled weekly model iteration cycles'],
    results_zh: ['评估时间减少30%', '5个以上产品的质量指标标准化', '实现每周模型迭代周期'],
  },
  'educational-content': {
    id: 'educational-content',
    title_en: "Children's Educational Content",
    title_zh: '儿童教育内容',
    description_en: 'Story editing experience and character development',
    description_zh: '故事编辑体验与角色开发',
    role: 'Product Designer',
    scope: 'Content Design • UX',
    impact: '2M+ users engaged',
    seed: 3,
    challenge_en: 'Creating engaging educational content for children required complex authoring tools that content creators found difficult to use, slowing down content production and limiting creative possibilities.',
    challenge_zh: '为儿童创建引人入胜的教育内容需要复杂的创作工具，内容创作者发现这些工具难以使用，减慢了内容生产速度并限制了创意可能性。',
    approach_en: 'Observed content creators in their workflow. Simplified the mental model for story creation. Built prototypes with increasing fidelity to test with real creators.',
    approach_zh: '观察内容创作者的工作流程。简化故事创作的心智模型。构建越来越高保真度的原型与真实创作者进行测试。',
    solution_en: 'A streamlined story editor with visual character builder, drag-and-drop scene composition, and preview mode for testing on target devices. Includes template system for rapid content creation.',
    solution_zh: '一个简化的故事编辑器，具有可视化角色构建器、拖放式场景组合和用于在目标设备上测试的预览模式。包括用于快速内容创建的模板系统。',
    results_en: ['2M+ users engaged with created content', 'Content creation time reduced by 50%', 'Creator satisfaction score improved to 4.5/5'],
    results_zh: ['200万以上用户参与创建的内容', '内容创建时间减少50%', '创作者满意度得分提升至4.5/5'],
  },
  'product-strategy': {
    id: 'product-strategy',
    title_en: 'Product Strategy Framework',
    title_zh: '产品策略框架',
    description_en: 'Brand positioning and content framework design',
    description_zh: '品牌定位与内容框架设计',
    role: 'Strategy Lead',
    scope: 'Brand • Content',
    impact: 'New market entry',
    seed: 4,
    challenge_en: 'Entering a new market required clear differentiation and messaging strategy. The existing brand identity didn\'t resonate with the target audience, and content strategy was fragmented.',
    challenge_zh: '进入新市场需要清晰的差异化和信息传递策略。现有的品牌形象无法与目标受众产生共鸣，内容策略也是碎片化的。',
    approach_en: 'Conducted competitive analysis and user research in target market. Developed positioning framework through collaborative workshops. Created content pillars based on audience needs.',
    approach_zh: '在目标市场进行竞争分析和用户研究。通过协作研讨会开发定位框架。根据受众需求创建内容支柱。',
    solution_en: 'A comprehensive brand strategy document including positioning statement, messaging hierarchy, content pillars, and visual direction guidelines. Supported by a content calendar template and measurement framework.',
    solution_zh: '一份全面的品牌策略文档，包括定位声明、信息层级、内容支柱和视觉方向指南。配有内容日历模板和测量框架作为支持。',
    results_en: ['Successful launch in new market', 'Brand awareness increased by 200%', 'Consistent messaging across all channels'],
    results_zh: ['成功进入新市场', '品牌知名度提升200%', '所有渠道信息一致'],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-pixel)] text-[20px] text-red-primary mb-4">
            404 // PROJECT NOT FOUND
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
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/#projects"
            className="font-[family-name:var(--font-pixel)] text-[10px] text-text-secondary hover:text-red-primary transition-colors"
          >
            ← BACK TO PROJECTS
          </Link>
          <span className="font-[family-name:var(--font-pixel)] text-[8px] text-red-primary">
            PROJECT_{String(project.seed).padStart(2, '0')}
          </span>
        </div>
      </nav>

      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero */}
          <header className="mb-12">
            {/* Visual */}
            <div className="aspect-video bg-bg-terminal border-2 border-line-pixel relative overflow-hidden mb-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]">
              <ProjectVisual seed={project.seed} />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none" />
            </div>

            {/* Title & Meta */}
            <h1
              className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] text-text-primary mb-4"
              data-en={project.title_en}
              data-zh={project.title_zh}
            >
              {project.title_en}
            </h1>

            <div className="flex flex-wrap gap-6 font-[family-name:var(--font-mono)] text-[length:var(--text-sm)]">
              <div>
                <span className="text-red-primary">Role:</span>{' '}
                <span className="text-text-secondary">{project.role}</span>
              </div>
              <div>
                <span className="text-red-primary">Scope:</span>{' '}
                <span className="text-text-secondary">{project.scope}</span>
              </div>
              <div>
                <span className="text-red-primary">Impact:</span>{' '}
                <span className="text-green-calm">{project.impact}</span>
              </div>
            </div>
          </header>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Challenge */}
            <section className="border-l-2 border-red-primary pl-6">
              <h2 className="font-[family-name:var(--font-pixel)] text-[12px] text-red-primary mb-4">
                001 // CHALLENGE
              </h2>
              <p
                className="font-[family-name:var(--font-body)] text-text-secondary leading-relaxed"
                data-en={project.challenge_en}
                data-zh={project.challenge_zh}
              >
                {project.challenge_en}
              </p>
            </section>

            {/* Approach */}
            <section className="border-l-2 border-red-primary pl-6">
              <h2 className="font-[family-name:var(--font-pixel)] text-[12px] text-red-primary mb-4">
                002 // APPROACH
              </h2>
              <p
                className="font-[family-name:var(--font-body)] text-text-secondary leading-relaxed"
                data-en={project.approach_en}
                data-zh={project.approach_zh}
              >
                {project.approach_en}
              </p>
            </section>

            {/* Solution */}
            <section className="border-l-2 border-red-primary pl-6">
              <h2 className="font-[family-name:var(--font-pixel)] text-[12px] text-red-primary mb-4">
                003 // SOLUTION
              </h2>
              <p
                className="font-[family-name:var(--font-body)] text-text-secondary leading-relaxed"
                data-en={project.solution_en}
                data-zh={project.solution_zh}
              >
                {project.solution_en}
              </p>
            </section>

            {/* Results */}
            <section className="border-l-2 border-green-calm pl-6">
              <h2 className="font-[family-name:var(--font-pixel)] text-[12px] text-green-calm mb-4">
                004 // RESULTS
              </h2>
              <ul className="space-y-2">
                {project.results_en.map((result, index) => (
                  <li
                    key={index}
                    className="font-[family-name:var(--font-mono)] text-text-secondary"
                    data-en={result}
                    data-zh={project.results_zh[index]}
                  >
                    <span className="text-green-calm mr-2">▸</span>
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Navigation */}
          <footer className="mt-16 pt-8 border-t border-line-pixel">
            <div className="flex justify-between items-center">
              <Link href="/#projects">
                <PixelButton variant="ghost">
                  ← ALL PROJECTS
                </PixelButton>
              </Link>
              <Link href="/#signals">
                <PixelButton variant="terminal">
                  READ SIGNALS →
                </PixelButton>
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

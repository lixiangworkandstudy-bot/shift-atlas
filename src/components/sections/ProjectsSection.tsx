'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import canvas to avoid SSR
const ProjectVisual = dynamic(
  () => import('../canvas/ProjectVisual'),
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
}

const projects: Project[] = [
  {
    id: 'ai-companion',
    title_en: 'AI Companion Design System',
    title_zh: 'AI 伴侣设计系统',
    description_en: 'Designed attachment-aware UX for human-AI emotional bonds',
    description_zh: '为人机情感纽带设计了关注依恋的用户体验',
    role: 'Product Design Lead',
    scope: 'UX Research • System Design',
    impact: '40% retention increase',
    seed: 1,
  },
  {
    id: 'llm-evaluation',
    title_en: 'LLM Evaluation Platform',
    title_zh: 'LLM 评估平台',
    description_en: 'Built evaluation framework for ByteDance AI products',
    description_zh: '为字节跳动 AI 产品构建评估框架',
    role: 'UX Researcher',
    scope: 'System Design • Data Viz',
    impact: '30% faster evaluation',
    seed: 2,
  },
  {
    id: 'educational-content',
    title_en: "Children's Educational Content",
    title_zh: '儿童教育内容',
    description_en: 'Story editing experience and character development',
    description_zh: '故事编辑体验与角色开发',
    role: 'Product Designer',
    scope: 'Content Design • UX',
    impact: '2M+ users engaged',
    seed: 3,
  },
  {
    id: 'product-strategy',
    title_en: 'Product Strategy Framework',
    title_zh: '产品策略框架',
    description_en: 'Brand positioning and content framework design',
    description_zh: '品牌定位与内容框架设计',
    role: 'Strategy Lead',
    scope: 'Brand • Content',
    impact: 'New market entry',
    seed: 4,
  },
  {
    id: 'shift-atlas',
    title_en: 'Shift Atlas',
    title_zh: 'Shift Atlas 认知网站',
    description_en: 'A design intelligence archive for AI-era systems and human-AI relationships',
    description_zh: '一个面向 AI 时代系统设计与人机关系的设计情报档案',
    role: 'Independent Builder',
    scope: 'Knowledge System • Design Intelligence • Web',
    impact: 'New project in progress',
    seed: 5,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-[family-name:var(--font-pixel)] text-[16px] text-red-primary">
            007
          </span>
          <span className="text-text-tertiary font-[family-name:var(--font-pixel)] text-[16px]">
            {'//'}
          </span>
          <h2
            className="font-[family-name:var(--font-pixel)] text-[16px] text-text-primary tracking-wider"
            data-en="FEATURED WORK"
            data-zh="精选作品"
          >
            FEATURED WORK
          </h2>
        </div>

        <p
          className="text-text-secondary mb-8 font-[family-name:var(--font-body)]"
          data-en="Selected systems I've designed and built"
          data-zh="我设计和构建的精选系统"
        >
          Selected systems I&apos;ve designed and built
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-bg-secondary border-[3px] border-double border-red-primary relative group transition-transform duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '8px 8px 0 0 rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Project Preview - Animated Canvas */}
              <div className="aspect-video bg-bg-terminal border-b-2 border-line-pixel relative overflow-hidden">
                {/* Animated Visual */}
                <ProjectVisual seed={project.seed} />

                {/* Project ID Overlay */}
                <div className="absolute top-3 left-3 bg-bg-terminal/80 px-2 py-1 border border-line-pixel">
                  <span className="text-red-primary font-[family-name:var(--font-pixel)] text-[8px]">
                    PROJECT_{String(project.seed).padStart(2, '0')}
                  </span>
                </div>

                {/* Scanline effect overlay */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-red-primary/0 group-hover:bg-red-primary/10 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3
                  className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-text-primary mb-2"
                  data-en={project.title_en}
                  data-zh={project.title_zh}
                >
                  {project.title_en}
                </h3>

                {/* Description */}
                <p
                  className="text-text-secondary text-[length:var(--text-sm)] mb-4 font-[family-name:var(--font-body)]"
                  data-en={project.description_en}
                  data-zh={project.description_zh}
                >
                  {project.description_en}
                </p>

                {/* Details Grid */}
                <div className="space-y-1 mb-4 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-text-tertiary">
                  <div>
                    <span className="text-red-primary">Role:</span> {project.role}
                  </div>
                  <div>
                    <span className="text-red-primary">Scope:</span> {project.scope}
                  </div>
                  <div>
                    <span className="text-red-primary">Impact:</span>{' '}
                    <span className="text-green-calm">{project.impact}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-text-primary font-[family-name:var(--font-pixel)] text-[10px] border-2 border-red-primary px-4 py-2 shadow-[4px_4px_0_0_var(--red-dark)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--red-dark)] transition-all"
                >
                  → VIEW_CASE_STUDY
                </Link>
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-[3px] -left-[3px] w-4 h-4 border-l-2 border-t-2 border-red-bright opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-[3px] -right-[3px] w-4 h-4 border-r-2 border-b-2 border-red-bright opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

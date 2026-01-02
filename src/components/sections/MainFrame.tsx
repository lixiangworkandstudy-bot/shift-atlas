'use client';

import { PixelPanel } from '../pixel';

export default function MainFrame() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Visual Panel */}
          <div className="lg:col-span-5">
            <div className="bg-bg-secondary border-2 border-line-pixel relative">
              {/* Window Chrome */}
              <div className="flex items-center justify-between px-3 py-2 bg-bg-terminal border-b-2 border-line-pixel">
                <span className="font-[family-name:var(--font-pixel)] text-[8px] text-green-calm">
                  SYSTEM_VISUAL.EXE
                </span>
                <div className="flex gap-2 text-[10px]">
                  <span className="text-red-primary cursor-pointer hover:text-red-bright">□</span>
                  <span className="text-red-primary cursor-pointer hover:text-red-bright">×</span>
                </div>
              </div>

              {/* Canvas Content */}
              <div className="aspect-square bg-bg-primary flex items-center justify-center relative pixelated">
                {/* Hermetic Symbol Placeholder */}
                <div className="relative">
                  {/* Outer ring */}
                  <div className="w-48 h-48 rounded-full border-4 border-red-muted opacity-60" />
                  {/* Inner elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-red-primary rotate-45" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-red-dark" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-primary" />
                  </div>
                </div>

                {/* Corner pixel decorations */}
                <div className="absolute top-4 left-4 text-[6px] font-[family-name:var(--font-pixel)] text-red-dim">
                  ■ ■ ■
                </div>
                <div className="absolute bottom-4 right-4 text-[6px] font-[family-name:var(--font-pixel)] text-red-dim">
                  ■ ■ ■
                </div>
              </div>
            </div>
          </div>

          {/* Right: Control Modules */}
          <div className="lg:col-span-7 space-y-4">
            {/* Module 001 - IDENTITY */}
            <PixelPanel moduleNumber="001" moduleTitle="IDENTITY" moduleTitleZh="身份">
              <p
                data-en="Human-Centered AI & Product Designer"
                data-zh="以人为本的 AI 与产品设计师"
              >
                Human-Centered AI & Product Designer
              </p>
            </PixelPanel>

            {/* Module 002 - FOCUS */}
            <PixelPanel moduleNumber="002" moduleTitle="FOCUS" moduleTitleZh="专注领域">
              <ul className="space-y-1">
                <li data-en="• AI Product Design" data-zh="• AI 产品设计">• AI Product Design</li>
                <li data-en="• UX Systems" data-zh="• 用户体验系统">• UX Systems</li>
                <li data-en="• Research-Informed Decisions" data-zh="• 基于研究的决策">• Research-Informed Decisions</li>
              </ul>
            </PixelPanel>

            {/* Module 003 - APPROACH */}
            <PixelPanel moduleNumber="003" moduleTitle="APPROACH" moduleTitleZh="方法">
              <p
                data-en="Calm interfaces, clear reasoning, and design choices grounded in human needs."
                data-zh="平静的界面、清晰的推理，以及根植于人类需求的设计。"
              >
                Calm interfaces, clear reasoning, and design choices grounded in human needs.
              </p>
            </PixelPanel>

            {/* Module 004 - STATUS */}
            <PixelPanel moduleNumber="004" moduleTitle="STATUS" moduleTitleZh="状态">
              <p
                data-en="Open to product-driven roles and collaborations"
                data-zh="对产品导向的职位和合作持开放态度"
              >
                Open to product-driven roles and collaborations
              </p>
              <p
                className="text-text-tertiary mt-1"
                data-en="Based in China · Working globally"
                data-zh="位于中国 · 全球工作"
              >
                Based in China · Working globally
              </p>
            </PixelPanel>

            {/* Module 005 - LINKS */}
            <PixelPanel moduleNumber="005" moduleTitle="LINKS" moduleTitleZh="链接">
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="text-red-primary hover:text-red-bright transition-colors font-[family-name:var(--font-mono)]"
                >
                  LinkedIn →
                </a>
                <a
                  href="#"
                  className="text-red-primary hover:text-red-bright transition-colors font-[family-name:var(--font-mono)]"
                >
                  GitHub →
                </a>
                <a
                  href="#"
                  className="text-red-primary hover:text-red-bright transition-colors font-[family-name:var(--font-mono)]"
                >
                  Resume →
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="text-red-primary hover:text-red-bright transition-colors font-[family-name:var(--font-mono)]"
                >
                  Email →
                </a>
              </div>
            </PixelPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

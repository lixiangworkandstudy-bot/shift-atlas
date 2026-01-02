'use client';

import { useEffect, useRef, useState } from 'react';
import { PixelButton } from '../pixel';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = 'Designing systems people can trust.';
  const typingSpeed = 80;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-16 flex items-center pixel-grid-bg relative"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            {/* Title with Typewriter Effect */}
            <h1
              className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-medium text-text-primary leading-tight"
              data-en="Designing systems people can trust."
              data-zh="设计值得信赖的系统。"
            >
              {displayText}
              {!isTypingDone && (
                <span className="text-red-primary blink-cursor">█</span>
              )}
            </h1>

            {/* Subtitle */}
            <p
              className="font-[family-name:var(--font-mono)] text-[length:var(--text-base)] text-text-secondary"
              data-en="I design human-centered AI and digital products that prioritize clarity, usability, and long-term impact."
              data-zh="我设计以人为本的 AI 和数字产品，注重清晰性、可用性和长期影响。"
            >
              I design human-centered AI and digital products that prioritize clarity, usability, and long-term impact.
            </p>

            {/* Position Statement */}
            <p
              className="font-[family-name:var(--font-body)] text-[length:var(--text-sm)] text-text-tertiary"
              data-en="My work sits at the intersection of product design, user experience, and thoughtful system thinking."
              data-zh="我的工作位于产品设计、用户体验和深思熟虑的系统思维的交汇点。"
            >
              My work sits at the intersection of product design, user experience, and thoughtful system thinking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <PixelButton
                onClick={() => scrollToSection('projects')}
                icon="▸"
              >
                VIEW WORK
              </PixelButton>
              <PixelButton
                variant="terminal"
                onClick={() => scrollToSection('signals')}
              >
                <span className="text-red-primary">▸</span> READ SIGNALS
              </PixelButton>
            </div>
          </div>

          {/* Right: Visual Canvas */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Pixel Art Placeholder */}
              <div className="w-full h-full bg-bg-secondary border-2 border-line-pixel relative overflow-hidden">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-primary" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-primary" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-primary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-primary" />

                {/* Animated geometric pattern (placeholder) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Central symbol */}
                    <div className="w-24 h-24 border-4 border-red-primary rotate-45 animate-[spin_30s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-red-muted rotate-45 animate-[spin_20s_linear_infinite_reverse]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-primary rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Pixel dots decoration */}
                <div className="absolute top-4 left-4 text-red-dim text-[8px] font-[family-name:var(--font-pixel)]">
                  ◆ ◆ ◆
                </div>
                <div className="absolute bottom-4 right-4 text-red-dim text-[8px] font-[family-name:var(--font-pixel)]">
                  ◆ ◆ ◆
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

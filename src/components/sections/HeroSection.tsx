'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PixelButton } from '../pixel';

// Dynamic import canvas to avoid SSR
const PixelHeroCanvas = dynamic(
  () => import('../canvas/PixelHeroCanvas'),
  { ssr: false }
);

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [mounted, setMounted] = useState(false);
  const fullText = 'Designing systems people can trust.';
  const typingSpeed = 80;
  const deletingSpeed = 50;
  const pauseDuration = 3000;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Looping Typewriter Effect
  useEffect(() => {
    if (!mounted) return;

    let currentIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      // Typing phase
      if (!isDeleting && !isPaused) {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          // Finished typing, pause before deleting
          isPaused = true;
          setShowCursor(true);
          timeoutId = setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            type();
          }, pauseDuration);
        }
      }
      // Deleting phase
      else if (isDeleting && !isPaused) {
        if (currentIndex > 0) {
          currentIndex--;
          setDisplayText(fullText.slice(0, currentIndex));
          timeoutId = setTimeout(type, deletingSpeed);
        } else {
          // Finished deleting, start typing again
          isDeleting = false;
          timeoutId = setTimeout(type, 500);
        }
      }
    };

    type();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mounted]);

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
            {/* Title with Looping Typewriter Effect */}
            <h1
              className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-medium text-text-primary leading-tight min-h-[1.2em]"
              data-en="Designing systems people can trust."
              data-zh="设计值得信赖的系统。"
              suppressHydrationWarning
            >
              {mounted ? displayText : fullText}
              {mounted && showCursor && (
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

          {/* Right: Animated Visual Canvas */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px]">
              {/* Canvas Container with pixel border */}
              <div className="w-full h-full bg-bg-terminal border-2 border-line-pixel relative overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-primary z-10" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-primary z-10" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-primary z-10" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-primary z-10" />

                {/* Animated Canvas - client only */}
                <PixelHeroCanvas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

export default function Footer() {
  return (
    <footer className="py-12 bg-bg-terminal border-t-2 border-line-pixel">
      <div className="max-w-7xl mx-auto px-6">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Copyright */}
          <div>
            <p className="text-text-primary font-[family-name:var(--font-mono)] mb-2">
              © Echo Li 2025
            </p>
            <p
              className="text-text-secondary text-[length:var(--text-sm)]"
              data-en="Designing Human-Centered Systems"
              data-zh="设计以人为本的系统"
            >
              Designing Human-Centered Systems
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-2 font-[family-name:var(--font-mono)] text-[length:var(--text-sm)]">
            <a
              href="mailto:hello@example.com"
              className="block text-red-primary hover:text-red-bright transition-colors"
            >
              Email
            </a>
            <a
              href="#"
              className="block text-red-primary hover:text-red-bright transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="block text-red-primary hover:text-red-bright transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Column 3: Meta */}
          <div>
            <p
              className="text-text-tertiary text-[length:var(--text-sm)] font-[family-name:var(--font-body)]"
              data-en="Built as a living system. Updated over time."
              data-zh="作为活系统构建。随时间更新。"
            >
              Built as a living system. Updated over time.
            </p>
          </div>
        </div>

        {/* Terminal Prompt */}
        <div className="border border-line-pixel bg-bg-primary p-3 max-w-lg">
          <div className="flex items-center font-[family-name:var(--font-mono)] text-[length:var(--text-sm)]">
            <span className="text-green-calm">system@echo:~$</span>
            <span className="text-red-primary ml-2 blink-cursor">█</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

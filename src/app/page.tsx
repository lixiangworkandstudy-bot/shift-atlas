import { SystemStatusBar } from '@/components/layout';
import {
  HeroSection,
  MainFrame,
  SignalsSection,
  ProjectsSection,
  Footer,
} from '@/components/sections';
import { PixelDivider } from '@/components/pixel';

export default function Home() {
  return (
    <>
      {/* System Status Bar */}
      <SystemStatusBar />

      <main className="pt-10">
        {/* Hero Section */}
        <HeroSection />

        <PixelDivider />

        {/* Main Frame (About) */}
        <MainFrame />

        <PixelDivider />

        {/* Signals Section */}
        <SignalsSection />

        <PixelDivider />

        {/* Projects Section */}
        <ProjectsSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

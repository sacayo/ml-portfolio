'use client';

import { HeroSection } from '@/components/HeroSection';
import { MetricsBar } from '@/components/MetricsBar';
import { FeaturedProjectSection } from '@/components/FeaturedProjectSection';
import { ProjectsBentoSection } from '@/components/ProjectsBentoSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';
import { ChatWidget } from '@/components/ChatWidget';
import { projects } from '@/data/config';

export default function Home() {
  return (
    <main className="min-h-screen bg-surface dark:bg-black selection:bg-accent/20 selection:text-accent dark:selection:bg-accent/30 dark:selection:text-accent-light">
      <HeroSection />

      <MetricsBar />

      <FeaturedProjectSection projects={projects} />

      <ProjectsBentoSection projects={projects} />

      <AboutSection />

      <SkillsSection />

      <ContactSection />

      <ChatWidget />
    </main>
  );
}

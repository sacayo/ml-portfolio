'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturedProjectSection } from '@/components/FeaturedProjectSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { ChatWidget } from '@/components/ChatWidget';
import { projects } from '@/data/config';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <HeroSection />

      <FeaturedProjectSection projects={projects} />

      <AboutSection />

      <ContactSection />

      <ChatWidget />
    </main>
  );
}

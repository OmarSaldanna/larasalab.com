import { Suspense } from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { MosaicGrid } from '@/components/landing/MosaicGrid';
import { AboutSection } from '@/components/landing/AboutSection';
import { OngoingProjectsSection } from '@/components/landing/OngoingProjectsSection';
import { LinksSection } from '@/components/landing/LinksSection';
import { ProgressSidebar } from '@/components/landing/ProgressSidebar';
import { CircuitBackground } from '@/components/ui/CircuitBackground';
import { DiagonalSection } from '@/components/ui/DiagonalSection';
import { getActiveIdeas, getActiveProjects, getOngoingProjects } from '@/lib/db/posts';

// Mock data for development when database is not connected
const mockProjects = [
  { id: 1, created_at: new Date(), title: 'AI Content Generator', type: 'project' as const, status: 'active' as const, content: [] },
  { id: 2, created_at: new Date(), title: 'Cloud Deployment Pipeline', type: 'project' as const, status: 'active' as const, content: [] },
  { id: 3, created_at: new Date(), title: 'Workflow Automation Engine', type: 'project' as const, status: 'active' as const, content: [] },
];

const mockIdeas = [
  { id: 4, created_at: new Date(), title: 'Neural Architecture Search', type: 'idea' as const, status: 'active' as const, content: [] },
  { id: 5, created_at: new Date(), title: 'Self-Healing Infrastructure', type: 'idea' as const, status: 'active' as const, content: [] },
  { id: 6, created_at: new Date(), title: 'Emotion-Aware AI Assistant', type: 'idea' as const, status: 'active' as const, content: [] },
];

async function getPageData() {
  // Try to fetch from database, fall back to mock data
  try {
    if (!process.env.DATABASE_URL) {
      console.log('No DATABASE_URL found, using mock data');
      return {
        projects: mockProjects,
        ideas: mockIdeas,
        ongoingProjects: mockProjects,
      };
    }

    const [projects, ideas, ongoingProjects] = await Promise.all([
      getActiveProjects(3),
      getActiveIdeas(3),
      getOngoingProjects(),
    ]);

    return { projects, ideas, ongoingProjects };
  } catch (error) {
    console.error('Database error, using mock data:', error);
    return {
      projects: mockProjects,
      ideas: mockIdeas,
      ongoingProjects: mockProjects,
    };
  }
}

export default async function Home() {
  const { projects, ideas, ongoingProjects } = await getPageData();

  return (
    <div className="relative min-h-screen">
      {/* Background circuit animation */}
      <Suspense fallback={null}>
        <CircuitBackground />
      </Suspense>

      {/* Progress sidebar */}
      <ProgressSidebar />

      {/* Main content - offset for sidebar */}
      <main className="pl-4 md:pl-6">
        {/* Hero */}
        <HeroSection />

        {/* Mosaic Grid Section */}
        <DiagonalSection
          id="explore"
          background="default"
          diagonal="bottom"
        >
          <div className="max-w-4xl mx-auto px-8 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Explore <span className="text-amber">Ideas</span> & <span className="text-blue">Projects</span>
            </h2>
            <MosaicGrid projects={projects} ideas={ideas} />
          </div>
        </DiagonalSection>

        {/* About */}
        <AboutSection />

        {/* Ongoing Projects */}
        <OngoingProjectsSection projects={ongoingProjects} />

        {/* Links / Contact */}
        <LinksSection />
      </main>
    </div>
  );
}

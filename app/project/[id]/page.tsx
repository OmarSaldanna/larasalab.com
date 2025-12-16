import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/db/posts';
import { BackHomeButton } from '@/components/ui/BackHomeButton';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { CircuitBackground } from '@/components/ui/CircuitBackground';
import type { ContentBlock } from '@/lib/types';

// Mock data for development
const mockProject = {
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    tags: ['Kubernetes', 'AI', 'Cloud Native', 'LLM'],
    title: 'AI-Powered Content Generation Pipeline',
    type: 'project' as const,
    status: 'active' as const,
    content: [
        {
            type: 'text' as const,
            content: 'A production-ready pipeline for generating, validating, and publishing AI-generated content at scale. Built with modern cloud-native principles and designed for reliability.',
        },
        {
            type: 'subtitle' as const,
            content: 'Architecture Overview',
        },
        {
            type: 'text' as const,
            content: 'The system consists of three main components:\n\n- **Input Queue**: Receives content requests via API or scheduled jobs\n- **Generation Workers**: Kubernetes pods running LLM inference\n- **Validation Layer**: Quality checks and human-in-the-loop review',
        },
        {
            type: 'code' as const,
            details: 'yaml',
            content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: content-generator
spec:
  replicas: 3
  selector:
    matchLabels:
      app: generator
  template:
    spec:
      containers:
      - name: worker
        image: larasalab/generator:latest
        resources:
          requests:
            memory: "4Gi"
            nvidia.com/gpu: 1`,
        },
        {
            type: 'url' as const,
            content: 'https://github.com/larasalab/content-pipeline',
            details: 'View source code on GitHub',
        },
        {
            type: 'subtitle' as const,
            content: 'Current Status',
        },
        {
            type: 'text' as const,
            content: 'The pipeline is currently processing ~10,000 requests per day with 99.5% uptime. Next milestone: implementing streaming responses for real-time generation.',
        },
    ] as ContentBlock[],
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
        notFound();
    }

    // Try to fetch from database, fall back to mock
    let project;
    try {
        if (process.env.DATABASE_URL) {
            project = await getPostById(projectId);
        }
        if (!project) {
            project = mockProject;
        }
    } catch (error) {
        console.error('Database error:', error);
        project = mockProject;
    }

    if (!project) {
        notFound();
    }

    // Status badge styling
    const statusStyles = {
        active: 'bg-blue/20 text-blue',
        finished: 'bg-green-500/20 text-green-500',
        pending: 'bg-yellow-500/20 text-yellow-500',
        archived: 'bg-muted text-muted-foreground',
    };

    return (
        <div className="relative min-h-screen">
            {/* Blue-tinted circuit background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-transparent to-blue/5" />
            </div>
            <CircuitBackground />

            {/* Back button */}
            <BackHomeButton variant="blue" />

            {/* Content */}
            <main className="relative z-10 max-w-3xl mx-auto px-8 py-24">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue/20 text-blue">
                            🚀 PROJECT
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[project.status]}`}>
                            {project.status.toUpperCase()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        {project.title}
                    </h1>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <time>
                            Started {new Date(project.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {project.updated_at && new Date(project.updated_at).getTime() !== new Date(project.created_at).getTime() && (
                            <time>
                                • Updated {new Date(project.updated_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                    </div>
                </header>

                {/* Technical divider */}
                <div className="mb-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-blue/50 to-transparent" />
                </div>

                {/* Content blocks */}
                <article>
                    <ContentRenderer content={project.content} variant="blue" />
                </article>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-blue/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-muted-foreground text-sm">
                            Interested in collaborating on this project?
                        </p>
                        <a
                            href="mailto:hello@larasalab.com"
                            className="px-4 py-2 rounded-full bg-blue text-white hover:bg-blue/90 transition-colors text-sm font-medium"
                        >
                            Get in Touch
                        </a>
                    </div>
                </footer>
            </main>
        </div>
    );
}

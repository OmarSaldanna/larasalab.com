import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/db/posts';
import { BackHomeButton } from '@/components/ui/BackHomeButton';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { CircuitBackground } from '@/components/ui/CircuitBackground';
import type { ContentBlock } from '@/lib/types';

// Mock data for development
const mockIdea = {
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    tags: ['AI', 'Edge Computing', 'Neural Networks'],
    title: 'Neural Architecture Search for Edge Devices',
    type: 'idea' as const,
    status: 'active' as const,
    content: [
        {
            type: 'text' as const,
            content: 'What if we could automatically design neural networks that run efficiently on edge devices? This idea explores using evolutionary algorithms to discover compact yet powerful architectures.',
        },
        {
            type: 'subtitle' as const,
            content: 'The Evolution Approach',
        },
        {
            type: 'quote' as const,
            content: 'The best architecture is one that emerges from the constraints of its environment.',
            details: 'Inspired by biological evolution',
        },
        {
            type: 'text' as const,
            content: '## Key Concepts\n\n- **Search Space**: Define the building blocks (convolutions, attention, skip connections)\n- **Fitness Function**: Balance accuracy, latency, and memory usage\n- **Evolution**: Mutate and crossover top performers',
        },
        {
            type: 'code' as const,
            details: 'python',
            content: `def fitness(model, data):
    accuracy = evaluate(model, data)
    latency = measure_latency(model)
    memory = measure_memory(model)
    
    return accuracy * 0.5 + (1/latency) * 0.3 + (1/memory) * 0.2`,
        },
    ] as ContentBlock[],
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function IdeaPage({ params }: PageProps) {
    const { id } = await params;
    const ideaId = parseInt(id, 10);

    if (isNaN(ideaId)) {
        notFound();
    }

    // Try to fetch from database, fall back to mock
    let idea;
    try {
        if (process.env.DATABASE_URL) {
            idea = await getPostById(ideaId);
        }
        if (!idea) {
            // Use mock data for development
            idea = mockIdea;
        }
    } catch (error) {
        console.error('Database error:', error);
        idea = mockIdea;
    }

    if (!idea) {
        notFound();
    }

    return (
        <div className="relative min-h-screen">
            {/* Amber-tinted circuit background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-transparent to-amber/5" />
            </div>
            <CircuitBackground />

            {/* Back button */}
            <BackHomeButton variant="amber" />

            {/* Content */}
            <main className="relative z-10 max-w-3xl mx-auto px-8 py-24">
                {/* Header */}
                <header className="mb-12">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber/20 text-amber mb-4">
                        💡 IDEA
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        {idea.title}
                    </h1>

                    {/* Tags */}
                    {idea.tags && idea.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {idea.tags.map((tag, index) => (
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
                            Created {new Date(idea.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {idea.updated_at && new Date(idea.updated_at).getTime() !== new Date(idea.created_at).getTime() && (
                            <time>
                                • Updated {new Date(idea.updated_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                    </div>
                </header>

                {/* Decorative divider */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-amber/50 to-transparent" />
                    <span className="text-amber">✦</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-amber/50 to-transparent" />
                </div>

                {/* Content blocks */}
                <article>
                    <ContentRenderer content={idea.content} variant="amber" />
                </article>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-amber/20">
                    <p className="text-center text-muted-foreground text-sm">
                        This idea is still brewing. Want to discuss it?{' '}
                        <a href="mailto:hello@larasalab.com" className="text-amber hover:underline">
                            Reach out
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    );
}

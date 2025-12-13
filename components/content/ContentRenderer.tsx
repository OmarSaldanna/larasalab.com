'use client';

import { motion } from 'framer-motion';
import type { ContentBlock } from '@/lib/types';

interface ContentRendererProps {
    content: ContentBlock[];
    variant?: 'amber' | 'blue';
}

export function ContentRenderer({ content, variant = 'blue' }: ContentRendererProps) {
    const accentColor = variant === 'amber' ? 'text-amber' : 'text-blue';
    const accentBg = variant === 'amber' ? 'bg-amber/10 border-amber/20' : 'bg-blue/10 border-blue/20';

    return (
        <div className="space-y-8">
            {content.map((block, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    {block.type === 'text' && (
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatMarkdown(block.content) }}
                        />
                    )}

                    {block.type === 'code' && (
                        <div className={`rounded-xl overflow-hidden border ${accentBg}`}>
                            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                                <span className="text-xs text-muted-foreground font-mono">
                                    {block.details || 'code'}
                                </span>
                                <button
                                    className={`text-xs ${accentColor} hover:underline`}
                                    onClick={() => navigator.clipboard.writeText(block.content)}
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                                <code className="text-sm font-mono text-foreground">
                                    {block.content}
                                </code>
                            </pre>
                        </div>
                    )}

                    {block.type === 'image' && (
                        <figure className="my-8">
                            <div className={`rounded-xl overflow-hidden border ${accentBg}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={block.content}
                                    alt={block.details || 'Image'}
                                    className="w-full h-auto"
                                />
                            </div>
                            {block.details && (
                                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                                    {block.details}
                                </figcaption>
                            )}
                        </figure>
                    )}

                    {block.type === 'url' && (
                        <a
                            href={block.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-4 rounded-xl border ${accentBg} hover:scale-[1.01] transition-transform`}
                        >
                            <span className={`text-sm ${accentColor} mb-1 block`}>Link</span>
                            <span className="text-foreground underline">{block.details || block.content}</span>
                        </a>
                    )}

                    {block.type === 'quote' && (
                        <blockquote className={`pl-4 border-l-4 border-${variant} italic text-muted-foreground`}>
                            <p className="text-lg">&ldquo;{block.content}&rdquo;</p>
                            {block.details && (
                                <footer className="mt-2 text-sm not-italic">— {block.details}</footer>
                            )}
                        </blockquote>
                    )}

                    {block.type === 'list' && (
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatMarkdown(block.content) }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
}

// Simple markdown formatter for basic formatting
function formatMarkdown(text: string): string {
    return text
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-2">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-3">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
        // Bold and italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code inline
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">$1</code>')
        // Lists
        .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
        .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc space-y-1 my-4">$&</ul>')
        // Paragraphs
        .replace(/^(?!<[hul]|<li)(.+)$/gm, '<p class="my-4">$1</p>')
        // Line breaks
        .replace(/\n\n/g, '</p><p class="my-4">');
}

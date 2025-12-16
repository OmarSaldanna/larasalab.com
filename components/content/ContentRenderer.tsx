'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import type { ContentBlock } from '@/lib/types';

interface ContentRendererProps {
    content: ContentBlock[];
    variant?: 'amber' | 'blue';
}

// Code block component with syntax highlighting
function CodeBlock({ code, language, accentBg, accentColor }: {
    code: string;
    language?: string;
    accentBg: string;
    accentColor: string;
}) {
    const codeRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (codeRef.current) {
            // Reset any previous highlighting
            codeRef.current.removeAttribute('data-highlighted');
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className={`rounded-xl overflow-hidden border ${accentBg}`}>
            <div className="flex items-center justify-between px-4 py-2 bg-black/10 dark:bg-white/5 border-b border-border">
                <span className="text-xs text-muted-foreground font-mono">
                    {language || 'code'}
                </span>
                <button
                    className={`text-xs ${accentColor} hover:opacity-70 cursor-pointer transition-all duration-200 flex items-center gap-1`}
                    onClick={handleCopy}
                >
                    {copied ? (
                        <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied
                        </>
                    ) : (
                        'Copy'
                    )}
                </button>
            </div>
            {/* Theme-aware code background using CSS variable */}
            <pre className="p-4 overflow-x-auto" style={{ backgroundColor: 'var(--code-block-bg)' }}>
                <code
                    ref={codeRef}
                    className={`text-sm font-mono hljs ${language ? `language-${language}` : ''}`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );
}

export function ContentRenderer({ content, variant = 'blue' }: ContentRendererProps) {
    const accentColor = variant === 'amber' ? 'text-amber' : 'text-blue';
    const accentBg = variant === 'amber' ? 'bg-amber/10 border-amber/20' : 'bg-blue/10 border-blue/20';

    // Ensure content is an array
    const contentArray = Array.isArray(content) ? content : [];

    return (
        <div className="space-y-8">
            {contentArray.map((block, index) => (
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
                        <CodeBlock
                            code={block.content}
                            language={block.details}
                            accentBg={accentBg}
                            accentColor={accentColor}
                        />
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
                            className={`inline-flex items-center gap-2 ${accentColor} hover:opacity-80 transition-opacity group`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                            <span className="underline underline-offset-4 decoration-2 group-hover:decoration-4 transition-all">
                                {block.details || block.content}
                            </span>
                            <svg
                                className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
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

                    {block.type === 'subtitle' && (
                        <h2 className={`text-2xl md:text-3xl font-bold ${accentColor}`}>
                            {block.content}
                        </h2>
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

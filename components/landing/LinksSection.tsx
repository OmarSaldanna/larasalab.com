'use client';

import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { DiagonalSection } from '@/components/ui/DiagonalSection';

// Kaggle icon SVG
function KaggleIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
        >
            <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.339" />
        </svg>
    );
}

const links = [
    {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com',
        color: 'hover:text-foreground',
        description: 'Check out my code',
    },
    {
        icon: KaggleIcon,
        label: 'Kaggle',
        href: 'https://kaggle.com',
        color: 'hover:text-blue',
        description: 'View my notebooks',
    },
    {
        icon: Mail,
        label: 'Email',
        href: 'mailto:hello@larasalab.com',
        color: 'hover:text-amber',
        description: 'Get in touch',
    },
];

export function LinksSection() {
    return (
        <DiagonalSection
            id="links"
            background="muted"
            diagonal="top"
            className="mt-[-2rem]"
        >
            <div className="max-w-4xl mx-auto px-8 md:px-16">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Let&apos;s <span className="text-pink">Connect</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {links.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`group p-6 rounded-2xl bg-surface border border-border transition-all ${link.color}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, borderColor: 'var(--color-amber)' }}
                            >
                                <Icon className="w-8 h-8 mb-4 text-muted-foreground group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-semibold mb-2">{link.label}</h3>
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.div
                    className="mt-16 pt-8 border-t border-border text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} larasalab. Built with curiosity and coffee.
                    </p>
                </motion.div>
            </div>
        </DiagonalSection>
    );
}

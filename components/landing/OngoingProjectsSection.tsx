'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/types';

interface OngoingProjectsSectionProps {
    projects: Post[];
}

export function OngoingProjectsSection({ projects }: OngoingProjectsSectionProps) {
    if (projects.length === 0) {
        return null;
    }

    return (
        <section id="ongoing" className="py-16 md:py-24 px-8 md:px-16">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Ongoing <span className="text-blue">Projects</span>
                </motion.h2>

                <div className="overflow-x-auto pb-4 -mx-8 px-8">
                    <div className="flex gap-6 min-w-max">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="w-80 flex-shrink-0"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/project/${project.id}`}>
                                    <motion.div
                                        className="h-full p-6 rounded-2xl bg-surface border border-border hover:border-blue/50 transition-all group"
                                        whileHover={{ y: -5 }}
                                    >
                                        {/* Status indicator */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                                            <span className="text-xs text-blue font-medium uppercase">
                                                In Progress
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Date */}
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Started {new Date(project.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </p>

                                        {/* Link indicator */}
                                        <div className="flex items-center text-sm text-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>View project</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

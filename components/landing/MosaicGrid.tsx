'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Cog, Cloud } from 'lucide-react';
import type { Post } from '@/lib/types';

interface MosaicGridProps {
    projects: Post[];
    ideas: Post[];
}

const DIAGONAL_ITEMS = [
    { icon: Brain, label: 'Generative AI', color: 'amber' },
    { icon: Cog, label: 'Automatization', color: 'pink' },
    { icon: Cloud, label: 'Cloud Development', color: 'blue' },
];

const PROJECT_POSITIONS = [[0, 1], [0, 2], [1, 2]];
const IDEA_POSITIONS = [[1, 0], [2, 0], [2, 1]];

export function MosaicGrid({ projects, ideas }: MosaicGridProps) {
    const renderCell = (row: number, col: number) => {
        const isDiagonal = row === col;

        if (isDiagonal) {
            const diagonalItem = DIAGONAL_ITEMS[row];
            const Icon = diagonalItem.icon;
            const colorClasses = {
                amber: 'bg-amber text-black border-amber',
                pink: 'bg-pink text-white border-pink',
                blue: 'bg-blue text-white border-blue',
            };

            return (
                <motion.div
                    key={`${row}-${col}`}
                    className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-2 ${colorClasses[diagonalItem.color as keyof typeof colorClasses]} shadow-lg`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: row * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                >
                    <Icon className="w-10 h-10 md:w-14 md:h-14 mb-3" strokeWidth={1.5} />
                    <span className="text-xs md:text-sm font-bold text-center uppercase tracking-wider">
                        {diagonalItem.label}
                    </span>
                </motion.div>
            );
        }

        const projectIndex = PROJECT_POSITIONS.findIndex(([r, c]) => r === row && c === col);
        if (projectIndex !== -1 && projects[projectIndex]) {
            const project = projects[projectIndex];
            return (
                <Link key={`${row}-${col}`} href={`/project/${project.id}`} className="block h-full">
                    <motion.div
                        className="h-full flex flex-col items-start justify-end p-4 md:p-6 rounded-2xl bg-blue/10 border-2 border-blue/20 hover:bg-blue hover:text-white transition-all duration-300 group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-xl hover:border-blue"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (row + col) * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest mb-1 text-blue group-hover:text-white/80 transition-colors">
                            Project
                        </span>
                        <h3 className="text-sm md:text-lg font-bold leading-tight line-clamp-2">
                            {project.title}
                        </h3>
                    </motion.div>
                </Link>
            );
        }

        const ideaIndex = IDEA_POSITIONS.findIndex(([r, c]) => r === row && c === col);
        if (ideaIndex !== -1 && ideas[ideaIndex]) {
            const idea = ideas[ideaIndex];
            return (
                <Link key={`${row}-${col}`} href={`/idea/${idea.id}`} className="block h-full">
                    <motion.div
                        className="h-full flex flex-col items-start justify-end p-4 md:p-6 rounded-2xl bg-amber/10 border-2 border-amber/20 hover:bg-amber hover:text-black transition-all duration-300 group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-xl hover:border-amber"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (row + col) * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest mb-1 text-amber-600 group-hover:text-black/60 transition-colors">
                            Idea
                        </span>
                        <h3 className="text-sm md:text-lg font-bold leading-tight line-clamp-2">
                            {idea.title}
                        </h3>
                    </motion.div>
                </Link>
            );
        }

        return (
            <motion.div
                key={`${row}-${col}`}
                className="rounded-2xl bg-muted/20 border-2 border-dashed border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
            />
        );
    };

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-5 w-full" style={{ gridAutoRows: 'minmax(120px, 140px)' }}>
            {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => renderCell(row, col))
            )}
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Cog, Cloud } from 'lucide-react';
import type { Post } from '@/lib/types';

interface MosaicGridProps {
    projects: Post[];
    ideas: Post[];
}

// 3x3 grid positions
// [0,0] [0,1] [0,2]
// [1,0] [1,1] [1,2]
// [2,0] [2,1] [2,2]

// Diagonal: [0,0], [1,1], [2,2] - Icons
// Above diagonal: [0,1], [0,2], [1,2] - Projects
// Below diagonal: [1,0], [2,0], [2,1] - Ideas

const DIAGONAL_ITEMS = [
    { icon: Brain, label: 'Generative AI', color: 'amber' },
    { icon: Cog, label: 'Automatization', color: 'pink' },
    { icon: Cloud, label: 'Cloud Development', color: 'blue' },
];

const PROJECT_POSITIONS = [
    [0, 1],
    [0, 2],
    [1, 2],
];

const IDEA_POSITIONS = [
    [1, 0],
    [2, 0],
    [2, 1],
];

export function MosaicGrid({ projects, ideas }: MosaicGridProps) {
    const renderCell = (row: number, col: number) => {
        const isDiagonal = row === col;

        if (isDiagonal) {
            const diagonalItem = DIAGONAL_ITEMS[row];
            const Icon = diagonalItem.icon;
            const colorClasses = {
                amber: 'bg-amber/20 text-amber border-amber/30',
                pink: 'bg-pink/20 text-pink border-pink/30',
                blue: 'bg-blue/20 text-blue border-blue/30',
            };

            return (
                <motion.div
                    key={`${row}-${col}`}
                    className={`aspect-square flex flex-col items-center justify-center p-4 rounded-2xl border ${colorClasses[diagonalItem.color as keyof typeof colorClasses]}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: row * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <Icon className="w-8 h-8 md:w-12 md:h-12" />
                    <span className="mt-2 text-xs md:text-sm font-medium text-center">
                        {diagonalItem.label}
                    </span>
                </motion.div>
            );
        }

        // Check if it's a project position (above diagonal)
        const projectIndex = PROJECT_POSITIONS.findIndex(([r, c]) => r === row && c === col);
        if (projectIndex !== -1 && projects[projectIndex]) {
            const project = projects[projectIndex];
            return (
                <Link key={`${row}-${col}`} href={`/project/${project.id}`}>
                    <motion.div
                        className="aspect-square flex flex-col items-start justify-end p-4 rounded-2xl bg-blue/10 border border-blue/20 hover:bg-blue/20 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (row + col) * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-xs text-blue mb-1 font-medium">PROJECT</span>
                        <h3 className="text-sm md:text-base font-semibold line-clamp-2">
                            {project.title}
                        </h3>
                    </motion.div>
                </Link>
            );
        }

        // Check if it's an idea position (below diagonal)
        const ideaIndex = IDEA_POSITIONS.findIndex(([r, c]) => r === row && c === col);
        if (ideaIndex !== -1 && ideas[ideaIndex]) {
            const idea = ideas[ideaIndex];
            return (
                <Link key={`${row}-${col}`} href={`/idea/${idea.id}`}>
                    <motion.div
                        className="aspect-square flex flex-col items-start justify-end p-4 rounded-2xl bg-amber/10 border border-amber/20 hover:bg-amber/20 transition-colors cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (row + col) * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-xs text-amber mb-1 font-medium">IDEA</span>
                        <h3 className="text-sm md:text-base font-semibold line-clamp-2">
                            {idea.title}
                        </h3>
                    </motion.div>
                </Link>
            );
        }

        // Empty placeholder
        return (
            <motion.div
                key={`${row}-${col}`}
                className="aspect-square rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
            />
        );
    };

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
            {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => renderCell(row, col))
            )}
        </div>
    );
}

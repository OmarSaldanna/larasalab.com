'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { clsx } from 'clsx';

type DiagonalDirection = 'top' | 'bottom' | 'both' | 'none';

interface DiagonalSectionProps {
    children: ReactNode;
    className?: string;
    background?: 'default' | 'surface' | 'muted' | 'amber' | 'blue';
    diagonal?: DiagonalDirection;
    id?: string;
}

export function DiagonalSection({
    children,
    className = '',
    background = 'default',
    diagonal = 'none',
    id,
}: DiagonalSectionProps) {
    const bgClasses = {
        default: 'bg-background',
        surface: 'bg-surface',
        muted: 'bg-muted',
        amber: 'bg-amber/10',
        blue: 'bg-blue/10',
    };

    const clipClasses = {
        top: 'clip-diagonal-top',
        bottom: 'clip-diagonal-bottom',
        both: 'clip-diagonal-both',
        none: '',
    };

    return (
        <motion.section
            id={id}
            className={clsx(
                'relative py-16 md:py-24',
                bgClasses[background],
                clipClasses[diagonal],
                className
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.section>
    );
}

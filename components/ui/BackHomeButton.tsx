'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackHomeButtonProps {
    variant?: 'amber' | 'blue' | 'default';
}

export function BackHomeButton({ variant = 'default' }: BackHomeButtonProps) {
    const colorClasses = {
        default: 'text-foreground hover:text-amber',
        amber: 'text-amber hover:text-amber/80',
        blue: 'text-blue hover:text-blue/80',
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 left-6 z-50"
        >
            <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border transition-colors ${colorClasses[variant]}`}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
            </Link>
        </motion.div>
    );
}

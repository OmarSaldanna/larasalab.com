'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed top-6 right-6 z-50 w-14 h-14" />
        );
    }

    const isLight = theme === 'light';

    return (
        <motion.button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="fixed top-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-surface border border-border hover:bg-surface-elevated transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            <svg
                viewBox="0 0 48 48"
                className="w-8 h-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Lamp base */}
                <motion.rect
                    x="18"
                    y="40"
                    width="12"
                    height="4"
                    rx="1"
                    className="fill-foreground"
                />

                {/* Lamp stand */}
                <motion.rect
                    x="22"
                    y="28"
                    width="4"
                    height="12"
                    className="fill-foreground"
                />

                {/* Lamp arm (angled) */}
                <motion.path
                    d="M24 28 L24 20 L16 12"
                    className="stroke-foreground"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Lamp shade */}
                <motion.path
                    d="M8 12 L16 12 L20 4 L4 4 Z"
                    className="fill-foreground"
                />

                {/* Light beam (visible when light mode) */}
                <AnimatePresence>
                    {isLight && (
                        <motion.g
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Light cone */}
                            <motion.path
                                d="M4 8 L-4 24 L28 24 L20 8"
                                fill="url(#lightGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* Light rays */}
                            {[0, 1, 2].map((i) => (
                                <motion.line
                                    key={i}
                                    x1={8 + i * 4}
                                    y1="8"
                                    x2={4 + i * 6}
                                    y2="22"
                                    className="stroke-amber"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: [0.3, 0.7, 0.3],
                                    }}
                                    exit={{ pathLength: 0, opacity: 0 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </motion.g>
                    )}
                </AnimatePresence>

                {/* Light glow */}
                <AnimatePresence>
                    {isLight && (
                        <motion.circle
                            cx="12"
                            cy="6"
                            r="8"
                            fill="url(#glowGradient)"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </AnimatePresence>

                {/* Gradients */}
                <defs>
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FDA303" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FDA303" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="lightGradient" x1="12" y1="8" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FDA303" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FDA303" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.button>
    );
}

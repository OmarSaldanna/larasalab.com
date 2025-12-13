'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isLight = theme === 'light';

    return (
        <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="fixed top-6 right-6 z-50 p-3 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
        >
            <motion.svg
                viewBox="0 0 64 64"
                fill="none"
                className="w-10 h-10"
                initial={false}
            >
                {/* Lamp base */}
                <rect x="24" y="56" width="16" height="4" rx="2" className="fill-foreground" />

                {/* Lamp stand */}
                <rect x="30" y="40" width="4" height="16" className="fill-foreground" />

                {/* Lamp arm (diagonal) */}
                <motion.line
                    x1="32"
                    y1="40"
                    x2="20"
                    y2="24"
                    className="stroke-foreground"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Lamp head (shade) */}
                <motion.path
                    d="M 10 24 L 20 24 L 24 14 L 6 14 Z"
                    className="fill-foreground"
                />

                {/* Light glow - only visible when light mode */}
                <motion.circle
                    cx="15"
                    cy="19"
                    r="12"
                    fill="#FDA303"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: isLight ? 0.4 : 0,
                        scale: isLight ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'blur(8px)' }}
                />

                {/* Light cone - only visible when light mode */}
                <motion.path
                    d="M 6 18 L 0 40 L 30 40 L 24 18"
                    fill="#FDA303"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLight ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Small light indicator on the bulb */}
                <motion.circle
                    cx="15"
                    cy="18"
                    r="3"
                    initial={{ fill: '#666' }}
                    animate={{ fill: isLight ? '#FDA303' : '#666' }}
                    transition={{ duration: 0.2 }}
                />
            </motion.svg>
        </button>
    );
}

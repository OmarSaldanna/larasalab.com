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
            className="fixed top-6 right-6 z-50 p-2 rounded-xl hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
        >
            <motion.svg
                viewBox="0 0 48 64"
                fill="none"
                className="w-8 h-10"
                initial={false}
            >
                {/* Lamp shade (trapezoid) */}
                <motion.path
                    d="M 8 28 L 40 28 L 36 4 L 12 4 Z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    animate={{
                        fill: isLight ? '#FDA303' : 'transparent',
                        stroke: isLight ? '#FDA303' : 'currentColor',
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-foreground"
                />

                {/* Lamp stand (vertical) */}
                <motion.rect
                    x="22"
                    y="28"
                    width="4"
                    height="24"
                    animate={{
                        fill: isLight ? '#FDA303' : 'currentColor',
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-foreground"
                />

                {/* Lamp base */}
                <motion.rect
                    x="14"
                    y="52"
                    width="20"
                    height="6"
                    rx="2"
                    animate={{
                        fill: isLight ? '#FDA303' : 'currentColor',
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-foreground"
                />

                {/* Light glow effect when on */}
                {isLight && (
                    <motion.ellipse
                        cx="24"
                        cy="16"
                        rx="20"
                        ry="14"
                        fill="#FDA303"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        style={{ filter: 'blur(12px)' }}
                    />
                )}
            </motion.svg>
        </button>
    );
}

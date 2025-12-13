'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function ProgressSidebar() {
    const { scrollYProgress } = useScroll();

    // Transform scroll progress to height percentage
    const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Transform scroll progress to gradient colors
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.33, 0.66, 1],
        [
            'rgb(253, 163, 3)',    // Amber at start
            'rgb(23, 142, 197)',   // Blue at 33%
            'rgb(237, 45, 76)',    // Pink at 66%
            'rgb(253, 163, 3)',    // Back to Amber
        ]
    );

    return (
        <div className="fixed left-0 top-0 h-screen w-2 md:w-3 z-40 bg-muted/50">
            <motion.div
                className="w-full origin-top"
                style={{
                    height,
                    backgroundColor,
                }}
            />

            {/* Section markers */}
            <div className="absolute inset-0 flex flex-col justify-between py-8 pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="w-full h-1 bg-foreground/20"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                ))}
            </div>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { RotatingCube } from '@/components/ui/RotatingCube';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
            <div className="max-w-5xl w-full flex flex-col items-center md:items-start gap-8">
                {/* Text content */}
                <motion.div
                    className="flex-1 text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Title with cube as superscript */}
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight flex items-start justify-center md:justify-start gap-4 text-foreground"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span>
                            Larasalab
                        </span>
                        <RotatingCube size={50} className="mt-2" />
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-lg"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        A place where I share ideas, projects, thoughts, and sketches. Hoping they bring something valuable to you.
                    </motion.p>

                    <motion.div
                        className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-amber" />
                            <span>Generative AI</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-blue" />
                            <span>Automatization</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-pink" />
                            <span>Full Stack</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <motion.span
                        className="w-1.5 h-3 bg-amber rounded-full mt-2"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

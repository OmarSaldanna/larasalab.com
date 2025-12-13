'use client';

import { motion } from 'framer-motion';

interface RotatingCubeProps {
    size?: number;
    className?: string;
}

export function RotatingCube({ size = 200, className = '' }: RotatingCubeProps) {
    const half = size / 2;

    return (
        <motion.div
            className={`${className}`}
            style={{
                width: size,
                height: size,
                perspective: '800px',
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Front face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid currentColor',
                        opacity: 0.6,
                        transform: `translateZ(${half}px)`,
                        borderRadius: '4px',
                    }}
                    className="text-foreground"
                />

                {/* Back face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid currentColor',
                        opacity: 0.4,
                        transform: `rotateY(180deg) translateZ(${half}px)`,
                        borderRadius: '4px',
                    }}
                    className="text-foreground"
                />

                {/* Right face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid currentColor',
                        opacity: 0.5,
                        transform: `rotateY(90deg) translateZ(${half}px)`,
                        borderRadius: '4px',
                    }}
                    className="text-foreground"
                />

                {/* Left face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid currentColor',
                        opacity: 0.5,
                        transform: `rotateY(-90deg) translateZ(${half}px)`,
                        borderRadius: '4px',
                    }}
                    className="text-foreground"
                />

                {/* Top face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid currentColor',
                        opacity: 0.5,
                        transform: `rotateX(90deg) translateZ(${half}px)`,
                        borderRadius: '4px',
                    }}
                    className="text-foreground"
                />

                {/* Bottom face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px solid currentColor',
                        opacity: 0.5,
                        transform: `rotateX(-90deg) translateZ(${half}px)`,
                        borderRadius: '4px',
                    }}
                    className="text-foreground"
                />
            </motion.div>
        </motion.div>
    );
}

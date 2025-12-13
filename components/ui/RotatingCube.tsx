'use client';

import { motion } from 'framer-motion';

interface RotatingCubeProps {
    size?: number;
    className?: string;
}

export function RotatingCube({ size = 40, className = '' }: RotatingCubeProps) {
    const half = size / 2;

    return (
        <motion.div
            className={`inline-block ${className}`}
            style={{
                width: size,
                height: size,
                perspective: '400px',
                verticalAlign: 'super',
            }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Cube faces with monochrome colors to match text */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid currentColor',
                        opacity: 0.8,
                        transform: `translateZ(${half}px)`,
                        borderRadius: '2px',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid currentColor',
                        opacity: 0.6,
                        transform: `rotateY(180deg) translateZ(${half}px)`,
                        borderRadius: '2px',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid currentColor',
                        opacity: 0.7,
                        transform: `rotateY(90deg) translateZ(${half}px)`,
                        borderRadius: '2px',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid currentColor',
                        opacity: 0.7,
                        transform: `rotateY(-90deg) translateZ(${half}px)`,
                        borderRadius: '2px',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid currentColor',
                        opacity: 0.7,
                        transform: `rotateX(90deg) translateZ(${half}px)`,
                        borderRadius: '2px',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid currentColor',
                        opacity: 0.7,
                        transform: `rotateX(-90deg) translateZ(${half}px)`,
                        borderRadius: '2px',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

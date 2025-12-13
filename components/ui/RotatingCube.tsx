'use client';

import { motion } from 'framer-motion';

interface RotatingCubeProps {
    size?: number;
    className?: string;
}

export function RotatingCube({ size = 60, className = '' }: RotatingCubeProps) {
    const halfSize = size / 2;

    // Define cube vertices
    const vertices = [
        // Front face
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        // Back face
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    ].map(([x, y, z]) => [x * halfSize, y * halfSize, z * halfSize]);

    // Define edges (pairs of vertex indices)
    const edges = [
        // Front face
        [0, 1], [1, 2], [2, 3], [3, 0],
        // Back face
        [4, 5], [5, 6], [6, 7], [7, 4],
        // Connecting edges
        [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    return (
        <div
            className={`perspective-1000 ${className}`}
            style={{ width: size * 1.5, height: size * 1.5 }}
        >
            <motion.div
                className="preserve-3d relative w-full h-full"
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                <svg
                    viewBox={`${-size} ${-size} ${size * 2} ${size * 2}`}
                    className="w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <defs>
                        <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FDA303" />
                            <stop offset="50%" stopColor="#178EC5" />
                            <stop offset="100%" stopColor="#ED2D4C" />
                        </linearGradient>
                    </defs>

                    {/* Draw edges */}
                    {edges.map(([start, end], i) => {
                        const [x1, y1] = vertices[start];
                        const [x2, y2] = vertices[end];
                        return (
                            <motion.line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="url(#cubeGradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: [0.4, 0.8, 0.4],
                                }}
                                transition={{
                                    pathLength: { duration: 1, delay: i * 0.05 },
                                    opacity: { duration: 3, repeat: Infinity, delay: i * 0.1 },
                                }}
                            />
                        );
                    })}

                    {/* Draw vertices */}
                    {vertices.map(([x, y], i) => (
                        <motion.circle
                            key={`vertex-${i}`}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="#FDA303"
                            initial={{ scale: 0 }}
                            animate={{
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                scale: { duration: 2, repeat: Infinity, delay: i * 0.15 },
                            }}
                        />
                    ))}
                </svg>
            </motion.div>
        </div>
    );
}

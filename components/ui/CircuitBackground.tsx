'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface CircuitNode {
    id: number;
    x: number;
    y: number;
}

interface CircuitPath {
    id: number;
    from: CircuitNode;
    to: CircuitNode;
}

function generateCircuit(width: number, height: number): { nodes: CircuitNode[]; paths: CircuitPath[] } {
    const nodes: CircuitNode[] = [];
    const paths: CircuitPath[] = [];

    // Create a grid of nodes
    const cols = Math.floor(width / 150);
    const rows = Math.floor(height / 150);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Add some randomness to positions
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;

            nodes.push({
                id: i * cols + j,
                x: (j + 0.5) * (width / cols) + offsetX,
                y: (i + 0.5) * (height / rows) + offsetY,
            });
        }
    }

    // Connect nodes with paths (neural network style)
    nodes.forEach((node, idx) => {
        // Connect to 2-3 nearby nodes
        const connections = Math.floor(Math.random() * 2) + 1;
        for (let c = 0; c < connections; c++) {
            const targetIdx = Math.min(nodes.length - 1, idx + Math.floor(Math.random() * 5) + 1);
            if (targetIdx !== idx && nodes[targetIdx]) {
                paths.push({
                    id: paths.length,
                    from: node,
                    to: nodes[targetIdx],
                });
            }
        }
    });

    return { nodes, paths };
}

export function CircuitBackground() {
    const { scrollYProgress } = useScroll();
    const [dimensions, setDimensions] = useState({ width: 1920, height: 3000 });

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: document.documentElement.scrollHeight,
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: document.documentElement.scrollHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const circuit = useMemo(
        () => generateCircuit(dimensions.width, dimensions.height),
        [dimensions.width, dimensions.height]
    );

    // Animate circuit activation based on scroll
    const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0"
            >
                <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--circuit-active)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--circuit-active)" stopOpacity="0.2" />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Circuit paths */}
                {circuit.paths.map((path, i) => (
                    <motion.line
                        key={`path-${path.id}`}
                        x1={path.from.x}
                        y1={path.from.y}
                        x2={path.to.x}
                        y2={path.to.y}
                        stroke="var(--circuit-line)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: i * 0.02 }}
                    />
                ))}

                {/* Active paths (animated with scroll) */}
                {circuit.paths.slice(0, Math.floor(circuit.paths.length * 0.3)).map((path, i) => (
                    <motion.line
                        key={`active-path-${path.id}`}
                        x1={path.from.x}
                        y1={path.from.y}
                        x2={path.to.x}
                        y2={path.to.y}
                        stroke="url(#circuitGradient)"
                        strokeWidth="2"
                        filter="url(#glow)"
                        strokeDasharray="8 4"
                        className="animate-circuit-flow"
                        style={{
                            opacity: pathProgress,
                        }}
                    />
                ))}

                {/* Circuit nodes */}
                {circuit.nodes.map((node, i) => (
                    <motion.circle
                        key={`node-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r="3"
                        fill="var(--circuit-node)"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.01 }}
                    />
                ))}

                {/* Active nodes */}
                {circuit.nodes.slice(0, Math.floor(circuit.nodes.length * 0.2)).map((node) => (
                    <motion.circle
                        key={`active-node-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r="5"
                        fill="var(--circuit-active)"
                        filter="url(#glow)"
                        className="animate-circuit-pulse"
                        style={{
                            opacity: pathProgress,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

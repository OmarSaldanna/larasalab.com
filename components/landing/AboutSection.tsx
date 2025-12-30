'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DiagonalSection } from '@/components/ui/DiagonalSection';

export function AboutSection() {
    return (
        <DiagonalSection
            id="about"
            background="surface"
            diagonal="top"
            className="mt-[-2rem]"
        >
            <div className="max-w-4xl mx-auto px-8 md:px-16">
                <motion.div
                    className="flex flex-col md:flex-row gap-12 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Avatar placeholder */}
                    <motion.div
                        className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-amber via-pink to-blue p-1"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                            <Image
                                src="https://res.cloudinary.com/dddfztayk/image/upload/v1767116414/e1okf4qihkap3lzzq27h.png"
                                alt="Omar L"
                                width={192}
                                height={192}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Bio content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            About <span className="text-amber">Me</span>
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            I&apos;m a developer passionate about building intelligent systems
                            and automating processes, where I see something that can progressively grow
                            as an ecosystem. I have fun exploring the intersection of AI, cloud infrastructure,
                            and creative problem-solving.
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {['Machine Learning', 'Automation', 'n8n', 'Generative AI', 'Data Science', 'Full Stack'].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </DiagonalSection>
    );
}

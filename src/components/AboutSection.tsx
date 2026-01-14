'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCategory } from '@/types';
import { skillCategories, aboutContent } from '@/data/config';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.skill-category', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    return (
        <section id="about" className="py-24 bg-gray-50 dark:bg-black/50">
            <div className="container mx-auto px-6 max-w-4xl" ref={containerRef}>
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">About Me</h2>

                    <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none">
                        {aboutContent.bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div key={category.id} className="skill-category bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map((skill) => (
                                    <li key={skill} className="flex items-center text-gray-600 dark:text-gray-300">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

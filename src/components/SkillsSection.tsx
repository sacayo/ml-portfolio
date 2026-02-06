'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/data/config';
import { SkillCategory } from '@/types';
import { cn } from '@/lib/utils';
import { SkillsRadar } from './SkillsRadar';

gsap.registerPlugin(ScrollTrigger);

function SkillCategoryCard({ category }: { category: SkillCategory }) {
    const [expanded, setExpanded] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (barRef.current) {
            gsap.from(barRef.current, {
                scaleX: 0,
                duration: 1,
                ease: 'power2.out',
                transformOrigin: 'left',
                scrollTrigger: {
                    trigger: barRef.current,
                    start: 'top 90%',
                }
            });
        }
    });

    return (
        <div
            className="p-6 rounded-2xl bg-surface-elevated dark:bg-white/5 border border-border dark:border-white/10 cursor-pointer hover:border-accent/30 transition-all duration-300"
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="font-display font-bold text-lg text-text-primary min-w-0 truncate">{category.title}</h3>
                <span className="text-sm font-mono text-text-muted shrink-0">{category.proficiency}%</span>
            </div>

            {/* Proficiency bar */}
            <div className="h-2 bg-surface dark:bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                    ref={barRef}
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${category.proficiency}%` }}
                />
            </div>

            {/* Expandable skills */}
            <div className={cn(
                "overflow-hidden transition-all duration-300",
                expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="flex flex-wrap gap-2 pt-2">
                    {category.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Expand hint */}
            <p className={cn(
                "text-xs text-text-muted mt-2 transition-opacity",
                expanded ? "opacity-0" : "opacity-100"
            )}>
                Click to see skills
            </p>
        </div>
    );
}

export function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="skills" className="py-24 bg-surface-elevated dark:bg-black">
            <div className="container mx-auto px-6 max-w-6xl" ref={containerRef}>
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4">Skills & Expertise</h2>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        Technologies and frameworks I work with.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {skillCategories.map(category => (
                        <SkillCategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Radar chart as secondary visualization */}
                <div className="bg-surface dark:bg-white/5 rounded-2xl p-8 border border-border">
                    <SkillsRadar />
                </div>
            </div>
        </section>
    );
}

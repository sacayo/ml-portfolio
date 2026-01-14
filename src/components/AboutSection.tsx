'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCategory } from '@/types';
import { skillCategories, aboutContent } from '@/data/config';
import { cn } from '@/lib/utils';
import { SkillsRadar } from './SkillsRadar';


gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

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

                <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-sm">
                    <SkillsRadar />
                </div>
            </div>
        </section>
    );
}

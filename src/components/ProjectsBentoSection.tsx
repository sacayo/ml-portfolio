'use client';

import { Project } from '@/types';
import { ProjectTile } from '@/components/ProjectTile';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsBentoSectionProps {
    projects: Project[];
}

export function ProjectsBentoSection({ projects }: ProjectsBentoSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tiles = gsap.utils.toArray('.project-tile');

        gsap.from(tiles, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    return (
        <section id="projects" className="py-24 px-6 md:px-0 bg-gray-50/50 dark:bg-black/50">
            <div className="container mx-auto max-w-6xl" ref={containerRef}>
                <div className="mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                        A collection of machine learning systems, from end-to-end RAG applications to flight delay predictions using big data cloud platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
                    {projects.map((project, index) => {
                        // Priority 1 gets 2x2 or 2x1 span
                        const isPriority = project.priority === 1;
                        const isSecondary = project.priority === 2;

                        let gridClass = '';
                        if (isPriority) {
                            gridClass = 'md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1'; // Large tile on desktop
                        } else if (isSecondary) {
                            gridClass = 'md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1';
                        } else {
                            gridClass = 'col-span-1 row-span-1';
                        }

                        return (
                            <ProjectTile
                                key={project.id}
                                project={project}
                                className={cn('project-tile', gridClass)}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

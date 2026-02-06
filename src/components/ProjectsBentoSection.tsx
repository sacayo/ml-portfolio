'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { ProjectTile } from '@/components/ProjectTile';
import { cn } from '@/lib/utils';

interface ProjectsBentoSectionProps {
    projects: Project[];
}

const categories = ['All', 'GenAI', 'Deep Learning', 'Big Data', 'Statistics', 'ML'];

export function ProjectsBentoSection({ projects }: ProjectsBentoSectionProps) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.tags.some(t => t === activeFilter));

    return (
        <section id="projects" className="py-24 px-6 bg-surface dark:bg-black/50">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4">All Projects</h2>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        A collection of machine learning systems, from end-to-end RAG applications to predictive models at scale.
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                activeFilter === cat
                                    ? "bg-accent text-white"
                                    : "bg-surface-elevated dark:bg-white/5 text-text-secondary hover:text-accent border border-border"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((project) => (
                        <ProjectTile
                            key={project.id}
                            project={project}
                            className="project-tile"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

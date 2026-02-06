'use client';

import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const tagGradients: Record<string, string> = {
    'GenAI': 'from-cyan-500/20 to-blue-500/20',
    'Big Data': 'from-orange-500/20 to-red-500/20',
    'Deep Learning': 'from-purple-500/20 to-pink-500/20',
    'A/B Testing': 'from-green-500/20 to-emerald-500/20',
    'Graph Theory': 'from-yellow-500/20 to-amber-500/20',
    'ML': 'from-indigo-500/20 to-violet-500/20',
    'Statistics': 'from-teal-500/20 to-cyan-500/20',
};

function getGradient(tags: string[]): string {
    for (const tag of tags) {
        if (tagGradients[tag]) return tagGradients[tag];
    }
    return 'from-accent/10 to-secondary/10';
}

interface ProjectTileProps {
    project: Project;
    className?: string;
}

export function ProjectTile({ project, className }: ProjectTileProps) {
    const gradient = getGradient(project.tags);

    return (
        <div
            className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-elevated p-6 border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 dark:bg-white/5 dark:border-white/10 dark:hover:border-accent/30',
                className
            )}
            onClick={() => trackEvent('project_click', project.id)}
        >
            {/* Gradient header */}
            <div className={cn("absolute top-0 left-0 right-0 h-32 bg-gradient-to-br opacity-60", gradient)} />

            {/* Featured badge */}
            {project.isFeatured && (
                <span className="absolute top-4 right-4 z-10 px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                    Featured
                </span>
            )}

            <div className="z-10 relative pt-8">
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-lg font-bold font-display tracking-tight text-text-primary mb-2">
                    {project.title}
                </h3>

                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {project.impactStatement}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-text-muted font-mono bg-surface dark:bg-white/10 rounded px-2 py-0.5">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="text-xs text-text-muted font-mono px-1">+{project.techStack.length - 3}</span>
                    )}
                </div>
            </div>

            {/* Always-visible links */}
            <div className="z-10 relative mt-auto pt-3 flex items-center gap-3 border-t border-border">
                <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    Details
                </Link>
                {project.links.github && (
                    <Link
                        href={project.links.github}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaGithub className="w-3.5 h-3.5" /> Code
                    </Link>
                )}
                {(project.links.demo || project.links.writeup) && (
                    <Link
                        href={project.links.demo || project.links.writeup || '#'}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaExternalLinkAlt className="w-3 h-3" />
                        {project.links.demo ? 'Demo' : 'Case Study'}
                    </Link>
                )}
            </div>
        </div>
    );
}

'use client';

import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface ProjectTileProps {
    project: Project;
    className?: string;
}

export function ProjectTile({ project, className }: ProjectTileProps) {
    return (
        <div
            className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-white/5 dark:border dark:border-white/10 dark:hover:border-white/20',
                className
            )}
        >
            {/* Click overlay for whole card tracking/navigation (to be implemented) */}
            <div
                className="absolute inset-0 cursor-pointer z-0"
                onClick={() => trackEvent('project_click', project.id)}
            />

            {/* Background Thumbnail */}
            {project.assets?.thumbnail && (
                <div className="absolute inset-0 z-0 select-none overflow-hidden">
                    {/* Gradient overlay instead of solid block for better visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40 dark:from-black dark:via-black/80 dark:to-black/40 z-10" />
                    <img
                        src={project.assets.thumbnail}
                        alt=""
                        className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    {/* Re-add overlay on hover to ensure text readability if needed, or rely on z-10 bg */}
                </div>
            )}

            <div className="z-10 relative">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                    {project.impactStatement}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs text-gray-500 font-mono bg-gray-100 rounded px-2 py-1 dark:bg-white/10 dark:text-gray-400">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="text-xs text-gray-500 font-mono px-1 py-1">+ {project.techStack.length - 4}</span>
                    )}
                </div>
            </div>

            <div className="z-10 relative mt-auto pt-4 flex items-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                {project.links.github && (
                    <Link
                        href={project.links.github}
                        target="_blank"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                    >
                        <FaGithub className="w-5 h-5" />
                    </Link>
                )}
                {(project.links.demo || project.links.writeup) && (
                    <Link
                        href={project.links.demo || project.links.writeup || '#'}
                        target="_blank"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaExternalLinkAlt className="w-4 h-4" />
                    </Link>
                )}
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
}

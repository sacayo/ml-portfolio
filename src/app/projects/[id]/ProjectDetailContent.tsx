'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailContentProps {
    project: Project;
    prevProject: Project | null;
    nextProject: Project | null;
}

export function ProjectDetailContent({ project, prevProject, nextProject }: ProjectDetailContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = containerRef.current?.querySelectorAll('.animate-section') || [];
        sections.forEach((section) => {
            gsap.from(section, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                },
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-surface dark:bg-black pt-24">
            {/* Hero Banner */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-surface-elevated dark:bg-white/5">
                {project.assets?.thumbnail ? (
                    <>
                        <img
                            src={project.assets.thumbnail}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10" />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">
                            {project.title}
                        </h1>
                        <p className="text-lg text-white/80">{project.shortTagline}</p>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-4xl px-6 py-6">
                <nav className="flex items-center gap-2 text-sm text-text-muted">
                    <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/#projects" className="hover:text-accent transition-colors">Projects</Link>
                    <span>/</span>
                    <span className="text-text-primary">{project.title}</span>
                </nav>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-4xl px-6 pb-24">
                {/* Impact Statement */}
                <div className="animate-section py-8 mb-8 border-b border-border">
                    <p className="text-2xl md:text-3xl font-bold font-display text-accent">
                        {project.impactStatement}
                    </p>
                </div>

                {/* The Problem */}
                <section className="animate-section mb-16">
                    <div className="flex items-center gap-2 text-accent font-mono text-sm mb-4">
                        <span className="w-8 h-px bg-current" />
                        01. THE PROBLEM
                    </div>
                    <h2 className="text-2xl font-bold font-display mb-4">Context & Challenge</h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        {project.problem}
                    </p>
                </section>

                {/* The Approach */}
                <section className="animate-section mb-16">
                    <div className="flex items-center gap-2 text-accent font-mono text-sm mb-4">
                        <span className="w-8 h-px bg-current" />
                        02. THE APPROACH
                    </div>
                    <h2 className="text-2xl font-bold font-display mb-4">Architecture & Implementation</h2>
                    <p className="text-lg text-text-secondary leading-relaxed mb-8">
                        {project.approach}
                    </p>

                    {/* Tech Stack Grid */}
                    <div className="bg-surface-elevated dark:bg-white/5 rounded-2xl p-6 border border-border">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech, i) => (
                                <span
                                    key={`${tech}-${i}`}
                                    className="px-4 py-2 bg-surface dark:bg-white/10 rounded-full text-sm font-medium border border-border dark:border-transparent"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results */}
                <section className="animate-section mb-16">
                    <div className="flex items-center gap-2 text-accent font-mono text-sm mb-4">
                        <span className="w-8 h-px bg-current" />
                        03. RESULTS
                    </div>
                    <h2 className="text-2xl font-bold font-display mb-4">Impact & Metrics</h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        {project.results}
                    </p>
                </section>

                {/* CTAs */}
                <div className="animate-section flex flex-wrap gap-4 mb-20">
                    {project.links.github && (
                        <Link
                            href={project.links.github}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-colors font-medium"
                        >
                            <FaGithub /> View Code
                        </Link>
                    )}
                    {(project.links.demo || project.links.writeup) && (
                        <Link
                            href={project.links.demo || project.links.writeup || '#'}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-accent hover:text-accent transition-colors font-medium"
                        >
                            <FaExternalLinkAlt className="text-sm" />
                            {project.links.demo ? 'Live Demo' : 'Read Case Study'}
                        </Link>
                    )}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 text-text-muted hover:text-text-primary transition-colors font-medium"
                    >
                        <FaArrowLeft className="text-sm" /> Back to Home
                    </Link>
                </div>

                {/* Prev / Next Navigation */}
                <div className="border-t border-border pt-8 grid grid-cols-2 gap-6">
                    {prevProject ? (
                        <Link
                            href={`/projects/${prevProject.id}`}
                            className="group flex flex-col gap-1"
                        >
                            <span className="text-xs text-text-muted flex items-center gap-1">
                                <FaChevronLeft className="text-[10px]" /> Previous
                            </span>
                            <span className="text-sm font-semibold text-text-secondary group-hover:text-accent transition-colors line-clamp-1">
                                {prevProject.title}
                            </span>
                        </Link>
                    ) : <div />}

                    {nextProject ? (
                        <Link
                            href={`/projects/${nextProject.id}`}
                            className="group flex flex-col gap-1 text-right ml-auto"
                        >
                            <span className="text-xs text-text-muted flex items-center gap-1 justify-end">
                                Next <FaChevronRight className="text-[10px]" />
                            </span>
                            <span className="text-sm font-semibold text-text-secondary group-hover:text-accent transition-colors line-clamp-1">
                                {nextProject.title}
                            </span>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}

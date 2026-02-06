'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectSectionProps {
    projects: Project[];
}

export function FeaturedProjectSection({ projects }: FeaturedProjectSectionProps) {
    const featured = projects.filter(p => p.isFeatured);

    return (
        <section id="featured" className="py-24 bg-surface-elevated dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display">Deep Dives</h2>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        Detailed walkthroughs of high-impact systems.
                    </p>
                </div>

                <div className="space-y-48">
                    {featured.map((project, index) => (
                        <FeaturedProjectItem key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturedProjectItem({ project, index }: { project: Project; index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphicRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const reverse = index % 2 !== 0;

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const steps = containerRef.current?.querySelectorAll('.content-step') || [];
            steps.forEach((step: any) => {
                gsap.from(step, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                });
            });
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex flex-col lg:flex-row gap-12 lg:gap-20 min-h-screen",
                reverse && "lg:flex-row-reverse"
            )}
        >
            {/* Project number indicator */}
            <span className="absolute -top-12 left-0 text-[140px] font-bold text-accent/5 dark:text-accent/10 font-display select-none pointer-events-none leading-none">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Sticky Graphic Side */}
            <div className="lg:w-1/2 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:sticky lg:top-0">
                <div ref={graphicRef} className="w-full aspect-video bg-surface dark:bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-border relative group">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/5 to-secondary/5">
                        {project.assets?.thumbnail ? (
                            <img
                                src={project.assets.thumbnail}
                                alt={`${project.title} Preview`}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <span className="text-text-muted font-mono text-sm">{project.title} Architecture</span>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6 right-6 flex items-center gap-2 flex-wrap">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-3xl font-bold font-display mb-2 drop-shadow-lg">{project.title}</h3>
                        <p className="text-white/90 drop-shadow-md">{project.shortTagline}</p>
                    </div>
                </div>
            </div>

            {/* Scrolly Content Side */}
            <div ref={contentRef} className="lg:w-1/2 flex flex-col justify-center py-12 lg:py-0">
                <div className="space-y-24 pb-24">

                    {/* Step 1: Problem */}
                    <div className="content-step">
                        <div className="mb-4 flex items-center gap-2 text-accent font-mono text-sm">
                            <span className="w-6 h-px bg-current"></span>
                            01. THE PROBLEM
                        </div>
                        <h4 className="text-2xl font-bold font-display mb-4">Context & Challenge</h4>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {project.problem}
                        </p>
                    </div>

                    {/* Step 2: Approach */}
                    <div className="content-step">
                        <div className="mb-4 flex items-center gap-2 text-accent font-mono text-sm">
                            <span className="w-6 h-px bg-current"></span>
                            02. THE APPROACH
                        </div>
                        <h4 className="text-2xl font-bold font-display mb-4">Architecture & Implementation</h4>
                        <p className="text-lg text-text-secondary leading-relaxed mb-6">
                            {project.approach}
                        </p>

                        <div className="bg-surface dark:bg-white/5 rounded-xl p-6 border border-border">
                            <h5 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">Tech Stack</h5>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <span key={`${tech}-${i}`} className="px-3 py-1 bg-surface-elevated dark:bg-white/10 rounded-full text-sm shadow-sm border border-border dark:border-transparent">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Results */}
                    <div className="content-step">
                        <div className="mb-4 flex items-center gap-2 text-accent font-mono text-sm">
                            <span className="w-6 h-px bg-current"></span>
                            03. RESULTS
                        </div>
                        <h4 className="text-2xl font-bold font-display mb-4">Impact & Metrics</h4>
                        <div className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                            {project.impactStatement}
                        </div>
                        <p className="text-lg text-text-secondary leading-relaxed mb-8">
                            {project.results}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/projects/${project.id}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-colors"
                            >
                                View Details <FaArrowRight className="text-sm" />
                            </Link>
                            {project.links.github && (
                                <Link
                                    href={project.links.github}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                                >
                                    <FaGithub /> Code
                                </Link>
                            )}
                            {(project.links.demo || project.links.writeup) && (
                                <Link
                                    href={project.links.demo || project.links.writeup || '#'}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                                >
                                    <FaExternalLinkAlt className="text-sm" />
                                    {project.links.demo ? 'Demo' : 'Case Study'}
                                </Link>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

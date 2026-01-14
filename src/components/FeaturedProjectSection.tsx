'use client';

import { useRef, useEffect } from 'react';
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
    // Only show featured projects
    const featured = projects.filter(p => p.isFeatured);

    return (
        <section id="featured" className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Deep Dives</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                        Detailed walkthroughs of high-impact systems.
                    </p>
                </div>

                <div className="space-y-64">
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

    useGSAP(() => {
        // Media query for desktop only interactions
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Pinning is handled by CSS sticky for smoother behavior
            // ScrollTrigger.create({
            //     trigger: containerRef.current,
            //     start: "top center",
            //     end: "bottom bottom",
            //     pin: graphicRef.current,
            //     pinSpacing: false,
            // });

            // Animate content sections in
            gsap.utils.toArray('.content-step').forEach((step: any) => {
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
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-12 lg:gap-20 min-h-screen">
            {/* Sticky Graphic Side */}
            <div className="lg:w-1/2 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:sticky lg:top-0">
                <div ref={graphicRef} className="w-full aspect-video bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 relative group">
                    {/* Visual Placeholder or Image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5">
                        {project.assets?.thumbnail ? (
                            <img
                                src={project.assets.thumbnail}
                                alt={`${project.title} Preview`}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <span className="text-gray-400 font-mono text-sm">{project.title} Architecture</span>
                        )}
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                        <p className="text-white/80">{project.shortTagline}</p>
                    </div>
                </div>
            </div>

            {/* Scrolly Content Side */}
            <div ref={contentRef} className="lg:w-1/2 flex flex-col justify-center py-12 lg:py-0">
                <div className="space-y-24 pb-24">

                    {/* Step 1: Problem */}
                    <div className="content-step">
                        <div className="mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                            <span className="w-6 h-px bg-current"></span>
                            01. THE PROBLEM
                        </div>
                        <h4 className="text-2xl font-bold mb-4">Context & Challenge</h4>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {project.problem}
                        </p>
                    </div>

                    {/* Step 2: Approach */}
                    <div className="content-step">
                        <div className="mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                            <span className="w-6 h-px bg-current"></span>
                            02. THE APPROACH
                        </div>
                        <h4 className="text-2xl font-bold mb-4">Architecture & Implementation</h4>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {project.approach}
                        </p>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-100 dark:border-white/10">
                            <h5 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Tech Stack</h5>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                    <span key={`${tech}-${index}`} className="px-3 py-1 bg-white dark:bg-white/10 rounded-full text-sm shadow-sm border border-gray-200 dark:border-transparent">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Results */}
                    <div className="content-step">
                        <div className="mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                            <span className="w-6 h-px bg-current"></span>
                            03. RESULTS
                        </div>
                        <h4 className="text-2xl font-bold mb-4">Impact & Metrics</h4>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {project.impactStatement}
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {project.results}
                        </p>

                        <div className="flex gap-4">
                            {project.links.github && (
                                <Link
                                    href={project.links.github}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <FaGithub /> View Code
                                </Link>
                            )}
                            {(project.links.demo || project.links.writeup) && (
                                <Link
                                    href={project.links.demo || project.links.writeup || '#'}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
                                >
                                    <FaExternalLinkAlt className="text-sm" />
                                    {project.links.demo ? 'Live Demo' : 'Read Case Study'}
                                </Link>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

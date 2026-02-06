'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { siteConfig, socialLinks } from '@/data/config';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);
    const [roleIndex, setRoleIndex] = useState(0);

    // Entrance animations
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(badgeRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.6,
        })
            .from(headlineRef.current, {
                y: 60,
                opacity: 0,
                duration: 0.8,
            }, '-=0.3')
            .from(avatarRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
            }, '-=0.6')
            .from(subheadlineRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }, '-=0.5')
            .from(ctaRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
            }, '-=0.4');
    }, { scope: containerRef });

    // Role cycling animation
    useEffect(() => {
        const roles = siteConfig.roles;
        const interval = setInterval(() => {
            if (roleRef.current) {
                gsap.to(roleRef.current, {
                    opacity: 0,
                    y: -8,
                    duration: 0.3,
                    onComplete: () => {
                        setRoleIndex(prev => (prev + 1) % roles.length);
                        gsap.fromTo(roleRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
                    },
                });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden"
        >
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text content */}
                    <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                        {/* Status badge */}
                        {siteConfig.statusBadge?.active && (
                            <div
                                ref={badgeRef}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-8"
                            >
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                {siteConfig.statusBadge.text}
                            </div>
                        )}

                        <p className="text-sm font-medium text-accent mb-4 font-mono tracking-wider uppercase">
                            Hi, I&apos;m
                        </p>

                        <h1
                            ref={headlineRef}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            <span className="text-gradient">{siteConfig.name}</span>
                        </h1>

                        {/* Animated role */}
                        <div className="h-10 mb-6 flex items-center justify-center lg:justify-start">
                            <span
                                ref={roleRef}
                                className="text-xl md:text-2xl font-semibold text-text-secondary font-display"
                            >
                                {siteConfig.roles[roleIndex]}
                            </span>
                        </div>

                        <p
                            ref={subheadlineRef}
                            className="text-lg text-text-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            {siteConfig.subheadline}
                        </p>

                        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link
                                href={socialLinks.find(l => l.id === 'github')?.url || '#'}
                                target="_blank"
                                className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
                            >
                                View GitHub
                            </Link>
                            <Link
                                href="#contact"
                                className="px-8 py-3 rounded-full border border-border text-text-secondary font-medium hover:border-accent hover:text-accent transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Contact Me
                            </Link>
                        </div>
                    </div>

                    {/* Avatar with decorations */}
                    <div className="flex-shrink-0 order-1 lg:order-2">
                        <div ref={avatarRef} className="relative">
                            {/* Decorative ring */}
                            <div className="absolute -inset-4 rounded-full border-2 border-dashed border-accent/20 animate-[spin_20s_linear_infinite]" />

                            {/* Glow */}
                            <div className="absolute -inset-8 rounded-full bg-accent/10 blur-2xl" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />

                            {/* Avatar */}
                            {siteConfig.avatarUrl && (
                                <div className="relative w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-surface-elevated shadow-2xl">
                                    <Image
                                        src={siteConfig.avatarUrl}
                                        alt={siteConfig.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Floating accent shapes */}
                            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-accent/20 rotate-12" style={{ animation: 'float 3s ease-in-out infinite' }} />
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-secondary/30" style={{ animation: 'float 4s ease-in-out infinite 1s' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Dot pattern */}
                <div className="absolute inset-0 dot-pattern opacity-30 dark:opacity-10" />

                {/* Gradient blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]" />
            </div>
        </section>
    );
}

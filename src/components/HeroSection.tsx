'use client';

import { useEffect, useRef } from 'react';
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

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(avatarRef.current, {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
        })
            .from(headlineRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
            }, '-=0.5')
            .from(subheadlineRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
            }, '-=0.6')
            .from(ctaRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.8,
            }, '-=0.6');
    }, { scope: containerRef });

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center px-6 pt-20"
        >
            <div className="container mx-auto max-w-5xl">
                {siteConfig.avatarUrl && (
                    <div ref={avatarRef} className="mb-8">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl">
                            <Image
                                src={siteConfig.avatarUrl}
                                alt={siteConfig.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}
                <h1
                    ref={headlineRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-8 max-w-4xl"
                >
                    {siteConfig.headline}
                </h1>

                <p
                    ref={subheadlineRef}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed"
                >
                    {siteConfig.subheadline}
                </p>

                <div ref={ctaRef} className="flex flex-wrap gap-4">
                    <Link
                        href={socialLinks.find(l => l.id === 'github')?.url || '#'}
                        target="_blank"
                        className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    >
                        View GitHub
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Contact Me
                    </Link>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/30 blur-[100px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-400/30 blur-[100px]" />
            </div>
        </section>
    );
}

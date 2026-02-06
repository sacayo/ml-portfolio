'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutContent } from '@/data/config';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(containerRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    return (
        <section id="about" className="py-24 bg-surface dark:bg-black/50">
            <div className="container mx-auto px-6 max-w-4xl" ref={containerRef}>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-8">About Me</h2>

                    <div className="text-lg text-text-secondary max-w-none leading-relaxed">
                        {aboutContent.bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

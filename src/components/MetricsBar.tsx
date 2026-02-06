'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, skillCategories } from '@/data/config';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    {
        value: projects.length,
        suffix: '+',
        label: 'Projects Built',
    },
    {
        value: skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0),
        suffix: '+',
        label: 'Skills & Tools',
    },
    {
        value: 90,
        suffix: 'M+',
        label: 'Data Rows Analyzed',
    },
    {
        value: 3,
        suffix: '+',
        label: 'Production-Ready Models',
    },
];

function MetricItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const numRef = useRef<HTMLSpanElement>(null);
    const [displayed, setDisplayed] = useState(0);

    useGSAP(() => {
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: numRef.current,
                start: 'top 90%',
                once: true,
            },
            onUpdate: () => {
                setDisplayed(Math.round(obj.val));
            },
        });
    });

    return (
        <div className="text-center px-4 py-6">
            <div className="text-4xl md:text-5xl font-bold font-display text-accent mb-2">
                <span ref={numRef}>{displayed}</span>
                <span className="text-accent-light">{suffix}</span>
            </div>
            <p className="text-sm text-text-muted font-medium uppercase tracking-wider">{label}</p>
        </div>
    );
}

export function MetricsBar() {
    return (
        <section className="py-16 bg-surface-elevated dark:bg-black border-y border-border">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-border">
                    {metrics.map((metric) => (
                        <MetricItem
                            key={metric.label}
                            value={metric.value}
                            suffix={metric.suffix}
                            label={metric.label}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

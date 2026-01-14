'use client';

import { socialLinks, siteConfig } from '@/data/config';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { trackEvent } from '@/lib/analytics';

export function ContactSection() {
    return (
        <section id="contact" className="py-32 bg-white dark:bg-black">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let's Connect</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    I'm currently looking for new opportunities in Data Science, AI/ML Engineering.
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex flex-col items-center gap-8">
                    {/* Social Links Row */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {socialLinks.map((link) => {
                            // Helper to get icon based on ID since I didn't store component in config
                            let IconComp = FaEnvelope;
                            if (link.id === 'github') IconComp = FaGithub;
                            if (link.id === 'linkedin') IconComp = FaLinkedin;
                            if (link.id === 'cv') IconComp = FaFileDownload;

                            return (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    target={link.type === 'external' ? '_blank' : undefined}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all font-medium text-gray-900 dark:text-white"
                                    onClick={() => trackEvent('cta_click', link.id)}
                                >
                                    <IconComp />
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="text-gray-500 dark:text-gray-500 text-sm mt-12">
                        &copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, Tailwind, & GSAP.
                    </div>
                </div>
            </div>
        </section>
    );
}

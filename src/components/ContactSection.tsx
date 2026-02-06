'use client';

import { socialLinks, siteConfig } from '@/data/config';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { trackEvent } from '@/lib/analytics';

function getIcon(id: string) {
    switch (id) {
        case 'github': return FaGithub;
        case 'linkedin': return FaLinkedin;
        case 'cv': return FaFileDownload;
        default: return FaEnvelope;
    }
}

export function ContactSection() {
    return (
        <section id="contact" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-surface-elevated dark:bg-black -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] -z-10" />

            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
                    <span className="text-gradient">Let&apos;s Build Something Together</span>
                </h2>
                <p className="text-xl text-text-secondary mb-14 max-w-2xl mx-auto leading-relaxed">
                    I&apos;m currently looking for new opportunities in Data Science &amp; AI/ML Engineering. Whether you have a question or just want to say hi, I&apos;d love to hear from you.
                </p>

                {/* Social links as icon circles */}
                <div className="flex justify-center gap-6 mb-16">
                    {socialLinks.map((link) => {
                        const IconComp = getIcon(link.id);

                        return (
                            <Link
                                key={link.id}
                                href={link.url}
                                target={link.type === 'external' ? '_blank' : undefined}
                                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-surface dark:bg-white/5 border border-border hover:bg-accent hover:border-accent hover:text-white text-text-secondary transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                                onClick={() => trackEvent('cta_click', link.id)}
                            >
                                <IconComp className="w-5 h-5" />
                                <span className="absolute -bottom-8 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Email CTA */}
                <Link
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
                    onClick={() => trackEvent('cta_click', 'email_cta')}
                >
                    <FaEnvelope className="w-4 h-4" />
                    Say Hello
                </Link>

                {/* Footer */}
                <div className="text-text-muted text-sm mt-20 pt-8 border-t border-border">
                    &copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, Tailwind &amp; GSAP.
                </div>
            </div>
        </section>
    );
}

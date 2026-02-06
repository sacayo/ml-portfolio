'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/config';

const navLinks = [
    { name: 'Featured', href: '#featured' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        if (mobileOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
                    scrolled
                        ? 'glass border-border py-3 shadow-sm'
                        : 'bg-transparent py-5'
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight text-text-primary font-display"
                    >
                        {siteConfig.name}
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center relative z-50"
                        aria-label="Toggle menu"
                    >
                        <span className={cn(
                            "h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 origin-center",
                            mobileOpen && "rotate-45 translate-y-[4px]"
                        )} />
                        <span className={cn(
                            "h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300",
                            mobileOpen && "opacity-0 scale-0"
                        )} />
                        <span className={cn(
                            "h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 origin-center",
                            mobileOpen && "-rotate-45 -translate-y-[4px]"
                        )} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 md:hidden transition-all duration-300",
                    mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Menu panel */}
                <div className={cn(
                    "absolute top-0 right-0 w-full h-full bg-surface-elevated flex flex-col items-center justify-center gap-8 transition-transform duration-300",
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-2xl font-display font-semibold text-text-primary hover:text-accent transition-all duration-300",
                                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            )}
                            style={{ transitionDelay: mobileOpen ? `${i * 75}ms` : '0ms' }}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

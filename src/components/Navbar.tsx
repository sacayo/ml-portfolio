'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/config';

const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Featured', href: '#featured' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
                scrolled
                    ? 'bg-white/80 backdrop-blur-md border-gray-200 py-3 shadow-sm dark:bg-black/80 dark:border-white/10'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {siteConfig.name}
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button - simplified for v1 */}
                <div className="md:hidden">
                    {/* Add a simple hamburger menu here if needed later */}
                </div>
            </div>
        </nav>
    );
}

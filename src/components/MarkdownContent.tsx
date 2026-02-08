'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
    content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    const components: Components = {
        h2({ children }) {
            const text = String(children);
            // Match numbered sections like "01. The Problem"
            const numberedMatch = text.match(/^(\d{2})\.\s+(.+)/);

            if (numberedMatch) {
                return (
                    <div className="animate-section mb-4">
                        <div className="flex items-center gap-2 text-accent font-mono text-sm mb-4">
                            <span className="w-8 h-px bg-current" />
                            {numberedMatch[1]}. {numberedMatch[2].toUpperCase()}
                        </div>
                    </div>
                );
            }

            return (
                <h2 className="animate-section text-2xl font-bold font-display mb-4 text-text-primary">
                    {children}
                </h2>
            );
        },

        h3({ children }) {
            return (
                <h3 className="text-xl font-bold font-display mb-3 mt-8 text-text-primary">
                    {children}
                </h3>
            );
        },

        h4({ children }) {
            return (
                <h4 className="text-lg font-semibold mb-2 mt-6 text-text-primary">
                    {children}
                </h4>
            );
        },

        p({ children }) {
            return (
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                    {children}
                </p>
            );
        },

        strong({ children }) {
            return (
                <strong className="font-semibold text-text-primary">
                    {children}
                </strong>
            );
        },

        ul({ children }) {
            return (
                <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-lg text-text-secondary leading-relaxed">
                    {children}
                </ul>
            );
        },

        ol({ children }) {
            return (
                <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-lg text-text-secondary leading-relaxed">
                    {children}
                </ol>
            );
        },

        li({ children }) {
            return (
                <li className="leading-relaxed">
                    {children}
                </li>
            );
        },

        table({ children }) {
            return (
                <div className="overflow-x-auto mb-8 rounded-xl border border-border">
                    <table className="w-full text-sm">
                        {children}
                    </table>
                </div>
            );
        },

        thead({ children }) {
            return (
                <thead className="bg-surface-elevated dark:bg-white/5">
                    {children}
                </thead>
            );
        },

        th({ children }) {
            return (
                <th className="px-4 py-3 text-left font-semibold text-text-primary border-b border-border text-sm uppercase tracking-wider">
                    {children}
                </th>
            );
        },

        td({ children }) {
            return (
                <td className="px-4 py-3 text-text-secondary border-b border-border">
                    {children}
                </td>
            );
        },

        pre({ children }) {
            return (
                <div className="overflow-x-auto mb-6 rounded-xl border border-border bg-white dark:bg-[#0a0a0a]">
                    <pre className="p-5 text-sm font-mono leading-relaxed text-[#1a1a1a] dark:text-[#e0e0e0] overflow-x-auto">
                        {children}
                    </pre>
                </div>
            );
        },

        code({ children, className, node }) {
            // Block code: inside a <pre> tag (with or without language)
            const isBlock = node?.parentNode?.type === 'element' &&
                            (node.parentNode as unknown as { tagName: string }).tagName === 'pre';
            if (isBlock) {
                return <code className={className}>{children}</code>;
            }
            // Inline code
            return (
                <code className="px-1.5 py-0.5 rounded bg-accent-subtle text-accent font-mono text-[0.9em]">
                    {children}
                </code>
            );
        },

        blockquote({ children }) {
            return (
                <blockquote className="border-l-4 border-accent pl-6 my-6 italic text-text-secondary">
                    {children}
                </blockquote>
            );
        },

        hr() {
            return <hr className="my-12 border-border" />;
        },

        a({ href, children }) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark underline underline-offset-2 transition-colors"
                >
                    {children}
                </a>
            );
        },
    };

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

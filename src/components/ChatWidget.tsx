'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/config';
import { useChat } from '@ai-sdk/react';

const getMessageText = (msg: any): string => {
    if (msg.content) return msg.content;
    if (msg.parts && Array.isArray(msg.parts)) {
        return msg.parts
            .filter((part: any) => part.type === 'text')
            .map((part: any) => part.text)
            .join('');
    }
    return '';
};

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { messages, sendMessage, status, setMessages } = useChat();
    const isLoading = status === 'streaming' || status === 'submitted';

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    parts: [{ type: 'text', text: `Hi! I'm ${siteConfig.name.split(' ')[0]}'s AI Assistant. Ask me anything about his projects or experience!` }]
                }
            ] as any);
        }
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(chatWindowRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.2)' }
            );
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        await sendMessage({ text: inputValue });
        setInputValue('');
    };

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-surface-elevated dark:bg-black border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
                >
                    {/* Header */}
                    <div className="p-4 bg-accent text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="font-semibold text-sm font-display">Portfolio Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-white/70 transition-colors">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface dark:bg-black/50">
                        {messages.map((msg: any) => {
                            const text = getMessageText(msg);
                            if (!text) return null;

                            return (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "max-w-[80%] w-fit p-3 rounded-xl text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-accent text-white ml-auto rounded-br-none"
                                            : "bg-surface-elevated dark:bg-white/5 border border-border mr-auto rounded-bl-none text-text-secondary"
                                    )}
                                >
                                    {text}
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="bg-surface-elevated dark:bg-white/5 p-3 rounded-xl rounded-bl-none w-fit border border-border">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-surface-elevated dark:bg-black border-t border-border">
                        <form className="flex gap-2" onSubmit={handleSendMessage}>
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about my ML projects..."
                                className="flex-1 bg-surface dark:bg-white/5 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className="w-9 h-9 flex items-center justify-center bg-accent text-white rounded-full hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaPaperPlane className="text-xs" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button */}
            <div className="flex items-center gap-3">
                {!isOpen && (
                    <div className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-accent/25 animate-pulse">
                        Chat with AI
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 bg-accent text-white rounded-full shadow-lg shadow-accent/25 hover:scale-110 transition-transform flex items-center justify-center"
                >
                    {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-xl" />}
                </button>
            </div>
        </div>
    );
}

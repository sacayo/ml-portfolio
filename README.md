# ML Portfolio - Technical Documentation

A modern, interactive portfolio website built with Next.js 16, featuring an AI-powered chatbot assistant and dynamic skills visualization.

**Live Demo:** [Your Vercel URL]  
**Repository:** https://github.com/sacayo/ml-portfolio

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [AI Chatbot Integration](#ai-chatbot-integration)
6. [Data Configuration](#data-configuration)
7. [Styling System](#styling-system)
8. [Deployment](#deployment)
9. [Environment Variables](#environment-variables)
10. [Common Patterns](#common-patterns)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Next.js App (React 19 + Server Components)         │   │
│  │  ├── page.tsx (Main Layout)                         │   │
│  │  ├── Components (Client-side Interactive)           │   │
│  │  └── API Routes (Server-side)                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Groq API  │  │   Vercel    │  │  Vercel Analytics   │ │
│  │  (LLM Chat) │  │  (Hosting)  │  │  (Page Views)       │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow

1. **User visits site** → Vercel serves static HTML (SSR/SSG)
2. **User interacts with chat** → Client sends POST to `/api/chat`
3. **API route processes** → Converts messages → Calls Groq API
4. **LLM streams response** → Frontend renders incrementally

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with SSR/SSG | 16.1.1 |
| **React** | UI component library | 19.2.3 |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Utility-first styling | 4.x |
| **GSAP** | Smooth animations | 3.14 |
| **Recharts** | Skills radar chart | 3.6 |
| **Vercel AI SDK** | LLM integration | 6.0 |
| **Groq** | Fast LLM inference | - |

### Why These Choices?

- **Next.js 16**: Server Components reduce client bundle, API routes simplify backend
- **Tailwind CSS 4**: Rapid styling without context switching
- **GSAP**: Professional-grade animations impossible with CSS alone
- **Vercel AI SDK**: Handles streaming, message formatting, error handling
- **Groq**: Free tier, extremely fast inference (100+ tokens/sec)

---

## Project Structure

```
ml-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main page (imports all sections)
│   │   ├── layout.tsx         # Root layout (fonts, metadata)
│   │   ├── globals.css        # Global styles
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts   # AI chatbot API endpoint
│   │
│   ├── components/            # React components
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── HeroSection.tsx    # Landing hero with profile
│   │   ├── AboutSection.tsx   # Bio + Skills Radar
│   │   ├── SkillsRadar.tsx    # Interactive radar chart
│   │   ├── FeaturedProjectSection.tsx  # Project showcase
│   │   ├── ProjectTile.tsx    # Individual project card
│   │   ├── ContactSection.tsx # Contact info + links
│   │   ├── ChatWidget.tsx     # AI assistant widget
│   │   └── Footer.tsx         # Page footer
│   │
│   ├── data/
│   │   └── config.ts          # ALL site data (projects, skills, etc.)
│   │
│   ├── lib/
│   │   ├── utils.ts           # Utility functions (cn, etc.)
│   │   └── analytics.ts       # Vercel Analytics helpers
│   │
│   └── types/
│       └── index.ts           # TypeScript type definitions
│
├── public/                    # Static assets
│   └── images/               # Project thumbnails
│
├── .env.local                # Environment variables (gitignored)
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.ts            # Next.js configuration
```

---

## Core Components

### 1. HeroSection (`src/components/HeroSection.tsx`)

**Purpose:** First impression - profile photo, name, tagline, CTA buttons

**Key Features:**
- Animated entrance using GSAP
- Responsive layout (mobile/desktop)
- Dynamic profile image from `config.ts`

**Animation Pattern:**
```tsx
useGSAP(() => {
    gsap.from('.hero-element', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1  // Each element animates 0.1s after previous
    });
});
```

### 2. AboutSection (`src/components/AboutSection.tsx`)

**Purpose:** Biography and skills visualization

**Key Features:**
- Multi-paragraph bio from `config.ts`
- Embedded `SkillsRadar` component
- Scroll-triggered animations

### 3. SkillsRadar (`src/components/SkillsRadar.tsx`)

**Purpose:** Interactive radar chart showing skill proficiencies

**Data Structure:**
```typescript
const skillCategories = [
    {
        title: "Programming Languages",
        skills: ["Python", "SQL", "C/C++"]
    },
    // ... more categories
];
```

**How It Works:**
- Uses Recharts `RadarChart` component
- Data transformed into polar coordinates
- Color-coded by category
- Responsive container adapts to parent size

### 4. FeaturedProjectSection (`src/components/FeaturedProjectSection.tsx`)

**Purpose:** Showcase 3-5 highlighted projects

**Key Features:**
- Filters projects where `isFeatured: true`
- Split layout: image left, details right
- Tech stack pills with unique keys
- "View Project" links to external demos

### 5. ChatWidget (`src/components/ChatWidget.tsx`)

**Purpose:** Floating AI assistant for portfolio Q&A

**Key Features:**
- Fixed position (bottom-right corner)
- Smooth GSAP open/close animation
- Real-time message streaming
- Auto-scroll to latest message

**State Management:**
```tsx
const [isOpen, setIsOpen] = useState(false);        // Widget visibility
const [inputValue, setInputValue] = useState('');   // User input

const { messages, sendMessage, status, setMessages } = useChat();
const isLoading = status === 'streaming' || status === 'submitted';
```

---

## AI Chatbot Integration

### Overview

The chatbot uses the **Vercel AI SDK v3** with **Groq** as the LLM provider.

```
User Input → ChatWidget → /api/chat → Groq API → Streamed Response → UI
```

### Frontend (`ChatWidget.tsx`)

**Key Hook:** `useChat()` from `@ai-sdk/react`

```tsx
const { messages, sendMessage, status, setMessages } = useChat();
```

| Property | Type | Description |
|----------|------|-------------|
| `messages` | `UIMessage[]` | Chat history with `parts` array |
| `sendMessage` | `function` | Sends user message to API |
| `status` | `string` | `'ready'`, `'submitted'`, `'streaming'` |
| `setMessages` | `function` | Manually set messages (for greeting) |

**Message Structure (SDK v3):**
```typescript
interface UIMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    parts: Array<{
        type: 'text';
        text: string;
    }>;
}
```

### Backend (`src/app/api/chat/route.ts`)

**Flow:**
1. Receive POST with `messages` array
2. **Convert** UIMessage format → ModelMessage format
3. Call `streamText()` with Groq model
4. Return `toUIMessageStreamResponse()`

**Message Conversion:**
```typescript
const convertToModelMessages = (messages: any[]) => {
    return messages.map(msg => {
        if (typeof msg.content === 'string') {
            return { role: msg.role, content: msg.content };
        }
        if (msg.parts && Array.isArray(msg.parts)) {
            const textContent = msg.parts
                .filter(part => part.type === 'text')
                .map(part => part.text)
                .join('');
            return { role: msg.role, content: textContent };
        }
        return { role: msg.role, content: '' };
    }).filter(msg => msg.content);
};
```

**System Prompt:**
- Dynamically built from `config.ts` data
- Includes bio, skills, projects, contact info
- Sets tone and guardrails for responses

---

## Data Configuration

### Central Data File: `src/data/config.ts`

**Everything** about your portfolio comes from this file:

```typescript
// Site metadata
export const siteConfig = {
    name: "Sammy Cayo",
    title: "ML Engineer",
    email: "sacayo@berkeley.edu",
    // ...
};

// About section
export const aboutContent = {
    bio: ["Paragraph 1...", "Paragraph 2..."],
    profileImage: "https://github.com/sacayo.png"
};

// Skills for radar chart
export const skillCategories = [
    { title: "Languages", skills: ["Python", "SQL"] },
    // ...
];

// Projects
export const projects = [
    {
        id: "rag-pipeline",
        title: "Enterprise RAG Pipeline",
        description: "...",
        techStack: ["HuggingFace", "Pinecone", "AWS"],
        isFeatured: true,
        thumbnail: "/images/rag.jpg",
        // ...
    }
];
```

### Adding a New Project

1. Add image to `/public/images/`
2. Add entry to `projects` array in `config.ts`:
```typescript
{
    id: "unique-slug",
    title: "Project Name",
    category: "NLP",
    description: "Short description",
    impactStatement: "Achieved X% improvement in Y",
    techStack: ["Tech1", "Tech2"],
    isFeatured: true,  // Show in featured section
    thumbnail: "/images/your-image.png",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/..."
}
```

---

## Styling System

### Tailwind CSS 4

**Configuration:** Uses new CSS-based config in `src/app/globals.css`

**Common Patterns:**
```css
/* Responsive: mobile-first */
className="text-sm md:text-base lg:text-lg"

/* Dark mode: uses system preference */
className="bg-white dark:bg-black text-gray-900 dark:text-white"

/* Flexbox layout */
className="flex items-center justify-between gap-4"

/* Hover/transitions */
className="hover:scale-105 transition-transform duration-300"
```

### Utility Function: `cn()`

Located in `src/lib/utils.ts`, merges Tailwind classes safely:

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Usage
className={cn(
    "base-classes",
    condition && "conditional-classes",
    variant === 'primary' && "primary-variant"
)}
```

### Animation with GSAP

**Setup:**
```tsx
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

useGSAP(() => {
    gsap.from('.animated', { opacity: 0, y: 20, duration: 0.5 });
}, { scope: containerRef });  // Scope limits selector to container
```

**Common Animations:**
- `gsap.from()` - Animate FROM these values to current state
- `gsap.to()` - Animate TO these values from current state
- `gsap.fromTo()` - Explicit start and end values

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel dashboard
3. Add environment variables (see below)
4. Deploy

**Automatic:** Every push to `main` triggers a new deployment.

### Build Commands

```bash
npm run dev      # Local development (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint check
```

---

## Environment Variables

**Local Development:** Create `.env.local` in project root

```env
GROQ_API_KEY=gsk_your_key_here
```

**Vercel Production:**  
Settings → Environment Variables → Add `GROQ_API_KEY`

**Accessing in Code:**
```typescript
// Server-side only (API routes, Server Components)
process.env.GROQ_API_KEY

// Note: Never expose API keys to client-side code!
```

---

## Common Patterns

### 1. Client vs Server Components

```tsx
// Server Component (default) - runs on server
export default function Page() { ... }

// Client Component - runs in browser
'use client';
export function InteractiveWidget() { ... }
```

**Rule:** Add `'use client'` only when you need:
- `useState`, `useEffect`, hooks
- Browser APIs (window, localStorage)
- Event handlers (onClick, onChange)

### 2. TypeScript Patterns

```typescript
// Type for component props
interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    isFeature?: boolean;  // Optional prop
}

// Generic type for config
type SiteConfig = {
    name: string;
    title: string;
    // ...
};
```

### 3. Responsive Design

```tsx
// Mobile-first approach
<div className="
    flex flex-col        /* Mobile: stack vertical */
    md:flex-row          /* Tablet+: horizontal */
    gap-4 md:gap-8       /* Smaller gap on mobile */
">
```

### 4. Dynamic Imports (Performance)

```tsx
// Lazy load heavy components
const SkillsRadar = dynamic(() => import('./SkillsRadar'), {
    loading: () => <Skeleton />,
    ssr: false  // Don't render on server (Recharts needs window)
});
```

---

## Troubleshooting

### Chat not responding?
1. Check terminal for API errors
2. Verify `GROQ_API_KEY` is set
3. Ensure model name is valid (e.g., `llama-3.1-8b-instant`)

### Styles not applying?
1. Restart dev server
2. Check for typos in class names
3. Verify Tailwind config includes file paths

### Build errors?
1. Run `npm run lint` to find issues
2. Check for TypeScript errors in editor
3. Ensure all imports are valid

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Make changes and test locally
4. Commit: `git commit -m "Add feature"`
5. Push and open PR

---

## License

MIT License - feel free to use this as a template for your own portfolio!

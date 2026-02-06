# Portfolio Roadmap

## ~~Priority 1: Project Detail Pages~~ (Done)

~~Rewrite the `/projects/[id]` detail pages for all 4 featured projects with rich, narrative-driven content and architecture diagrams.~~

- [x] ~~**Full-Stack Gen AI Application (RAG Pipeline)**~~
- [x] ~~**Southwest Airlines Flight Delay Prediction**~~
- [x] ~~**RAG QA System Evaluation**~~
- [x] ~~**Google Customer Return Prediction**~~

---

## Priority 1.5: Bug Fixes

- [ ] **ASCII diagram accent color mismatch** — In `MarkdownContent.tsx`, the `<pre>` block uses hardcoded gray colors (`text-[#4b5563]` / `text-[#9ca3af]`) instead of theme-aware tokens. ASCII box-drawing diagrams (arrows, pipes, boxes) look washed out and disconnected from the accent color scheme. Fix by using semantic color classes (e.g., `text-text-secondary`) or applying accent-tinted styling to `<pre>` blocks.

---

## Priority 2: Suggested Improvements

### SEO & Discoverability
- [ ] **Sitemap & robots.txt** — Generate `sitemap.xml` and `robots.txt` via Next.js metadata API so search engines can crawl and index all project pages
- [ ] **JSON-LD structured data** — Add `Person` and `SoftwareApplication` schema markup to improve rich snippet appearance in Google results
- [ ] **Auto-generated OG images** — Use `next/og` (ImageResponse) to dynamically generate branded Open Graph images per project page with title + tech stack overlay

### Interactive UX
- [ ] **Dark/light mode toggle** — Add a theme switcher with `next-themes` (system preference detection + manual override) and persist choice in localStorage
- [ ] **Command palette (Cmd+K)** — Add a global search/navigation palette (e.g., `cmdk`) for power-user quick access to projects, sections, and contact
- [ ] **Project demo videos/GIFs** — Embed short screen recordings or animated GIFs showing each project in action on the detail pages

### Professional Credibility
- [ ] **GitHub activity widget** — Display a contribution heatmap or recent commit activity to show ongoing engagement
- [ ] **View count badges** — Add subtle view counters per project page (backed by Vercel KV or analytics) to signal traction
- [ ] **Testimonials or recommendations section** — Add quotes from professors, collaborators, or managers to build credibility

### Performance & UX
- [ ] **`next/image` optimization** — Replace raw GitHub URLs with optimized local images or use `next/image` with proper `sizes` and `priority` attributes
- [ ] **Lazy-load heavy components** — Dynamic import `SkillsRadar` and `ChatWidget` with `next/dynamic` and `ssr: false` to reduce initial bundle size
- [ ] **Font preloading** — Preload primary web fonts via `next/font` to eliminate FOUT (flash of unstyled text) on initial load
- [ ] **Loading states** — Add skeleton placeholders for the radar chart and project thumbnails while they load

### Content & Polish
- [ ] **Blog/writing section** — Link to Medium articles, technical write-ups, or whitepapers if available
- [ ] **Resume download** — Add a CTA button to download a PDF resume directly from the site
- [ ] **Favicon and OG image** — Create a custom favicon and a branded OG share image for social media previews

### Technical Debt
- [ ] **Input validation on API routes** — Add Zod schemas to validate chat messages and analytics payloads
- [ ] **Rate limiting** — Add basic rate limiting to `/api/chat` to prevent abuse
- [ ] **Accessibility audit** — Ensure all interactive elements have proper `aria` labels, focus states, and keyboard navigation
- [ ] **Error boundaries** — Wrap major sections in React error boundaries to prevent full-page crashes

### Analytics & Growth
- [ ] **Project click tracking** — Track which projects get the most engagement via Vercel Analytics custom events
- [ ] **Chat analytics** — Log common questions to understand what visitors care about most
- [ ] **A/B test hero copy** — Experiment with different headlines and CTAs to optimize engagement

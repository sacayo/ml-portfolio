# Future Features Roadmap

This document outlines potential enhancements for the ML Portfolio website.

---

## 🎯 High Impact

### Blog/Articles Section
- Create `/blog` route with MDX support
- Write tutorials about ML projects
- Add syntax highlighting for code snippets
- Include reading time estimates

### Project Demo Videos
- Record screen captures of projects in action
- Embed in project detail pages
- Use lightweight video player (e.g., Mux, Cloudflare Stream)

### Dark/Light Mode Toggle
- Add theme toggle button to Navbar
- Persist preference in localStorage
- Smooth transition animations

---

## 🚀 Interactive Enhancements

### Project Filters
- Filter by technology (Python, PyTorch, AWS, etc.)
- Filter by category (NLP, Computer Vision, MLOps)
- Animated filter transitions

### Command Palette (Cmd+K)
- Quick navigation to any section
- Search projects by name
- Keyboard-first UX

### Chat History Persistence
- Save conversations to localStorage
- Resume previous chats
- "Clear history" option

---

## 💼 Professional Features

### Resume Download Button
- Generate PDF from structured data in `config.ts`
- One-click download
- Auto-update when config changes

### Testimonials Section
- Carousel of quotes from colleagues/managers
- LinkedIn-style layout
- Star ratings optional

### GitHub Activity Widget
- Show recent contributions graph
- Display pinned repositories
- Real-time commit activity

### Case Studies
- Detailed 2-3 page write-ups for flagship projects
- Problem → Approach → Solution → Impact format
- Include diagrams, metrics, and learnings

---

## 📈 Analytics & SEO

### OpenGraph Images
- Auto-generated social cards per project
- Dynamic image with project title + tech stack
- Use `@vercel/og` for edge generation

### Sitemap & robots.txt
- Auto-generate sitemap.xml
- Improve Google indexing
- Add structured data (JSON-LD)

### View Count Analytics
- Track page views per project
- Display "X views" badge
- Use Vercel Analytics or custom solution

---

## 🛠 Technical Improvements

### Testing
- Add Jest + React Testing Library
- E2E tests with Playwright
- Test chat widget flow

### Performance
- Image optimization with next/image
- Lazy load below-fold components
- Preload critical fonts

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader testing

---

## Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Blog Section | High | Medium | P1 |
| Dark Mode Toggle | Medium | Low | P1 |
| Resume Download | High | Low | P1 |
| Project Filters | Medium | Medium | P2 |
| Command Palette | Medium | Medium | P2 |
| GitHub Widget | Low | Low | P2 |
| OpenGraph Images | Medium | Low | P2 |
| Case Studies | High | High | P3 |
| Testimonials | Medium | Medium | P3 |
| Chat History | Low | Low | P3 |

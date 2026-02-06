# Portfolio Roadmap

## Priority 1: Project Detail Pages (Next Session)

Rewrite the `/projects/[id]` detail pages for all 4 featured projects with rich, narrative-driven content and architecture diagrams. this readme should also be comprehensive enough where it will help me prep for common interview questions.

- [ ] **Full-Stack Gen AI Application (RAG Pipeline)**
  - Architecture diagram showing 4-pipeline system (ECS → Pinecone → EC2 GPU → Elastic Beanstalk)
  - Narrative: problem discovery, design decisions, deployment challenges
  - Data flow diagram for document ingestion → embedding → retrieval → generation

- [ ] **Southwest Airlines Flight Delay Prediction**
  - Architecture diagram showing Databricks/PySpark pipeline
  - Narrative: scaling to 90M+ rows, model comparison (LR vs XGBoost vs NN)
  - Results visualization: feature importance, confusion matrix insights

- [ ] **RAG QA System Evaluation**
  - Evaluation framework diagram (RAGAS metrics pipeline)
  - Narrative: why evaluation matters, hyperparameter tuning journey
  - Comparison charts: chunking strategies, embedding models, LLM selection

- [ ] **Google Customer Return Prediction**
  - LSTM model architecture diagram
  - Narrative: sequential behavior modeling, baseline comparison
  - Results: 93.72% recall achievement, business implications

---

## Priority 2: Suggested Improvements

### Performance & UX
- [ ] **Lazy-load heavy components** — Dynamic import `SkillsRadar` and `ChatWidget` with `next/dynamic` and `ssr: false` to reduce initial bundle size
- [ ] **Image optimization** — Replace raw GitHub URLs with optimized local images or use `next/image` with proper `sizes` and `priority` attributes
- [ ] **Loading states** — Add skeleton placeholders for the radar chart and project thumbnails while they load

### Content & Polish
- [ ] **Testimonials or recommendations section** — Add quotes from professors, collaborators, or managers to build credibility
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

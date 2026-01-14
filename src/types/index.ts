export interface Project {
  id: string;
  title: string;
  shortTagline: string;       // brief descriptor
  impactStatement: string;    // 1-line outcome
  problem: string;            // paragraph
  approach: string;           // paragraph
  results: string;            // metrics/impact
  techStack: string[];        // e.g., ["Python", "FastAPI", "Vertex AI", "Pinecone"]
  tags: string[];             // e.g., ["RAG", "Legal", "Vector Search"]
  priority: number;           // for ordering, lower = more prominent
  isFeatured: boolean;
  links: {
    github?: string;
    demo?: string;
    writeup?: string;         // blog/Notion
  };
  assets?: {
    thumbnail?: string;       // image path
    banner?: string;          // larger hero image
    diagram?: string;         // architecture diagram
    sequenceFramesPrefix?: string; // optional path prefix for scroll sequence images
  };
}

export interface SkillCategory {
  id: string;
  title: string;      // e.g., "RAG & Retrieval"
  skills: string[];   // e.g., ["BM25", "dense embeddings", "OpenSearch", "Pinecone"]
  proficiency?: number; // 0-100 score for radar chart
}

export interface SocialLink {
  id: string;
  label: string;        // "GitHub", "LinkedIn", "Email", "CV", "Blog"
  url: string;
  type: "external" | "mailto" | "download";
}

export interface AnalyticsEvent {
  id?: string;
  ipHash: string | null;      // hashed IP for privacy
  userAgent: string | null;
  referrer: string | null;
  path: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  eventType: "page_view" | "project_click" | "cta_click" | string;
  eventLabel: string | null;  // e.g., project id or CTA label
  timestamp: string;          // ISO string
}

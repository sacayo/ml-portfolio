import { Project, SkillCategory, SocialLink } from "@/types";

export const siteConfig = {
    name: "Sammy Cayo",
    headline: "Data Scientist & AI/ML Engineer",
    subheadline: "Master's graduate from UC Berkeley with a strong foundation in machine learning, statistics, and data engineering. Building scalable AI systems, from RAG pipelines to classical ML prediction models",
    avatarUrl: "https://avatars.githubusercontent.com/u/142691524?v=4",
    email: "sacayo@berkeley.edu",
};

export const aboutContent = {
    bio: [
        "I graduated with a Master's degree in Data Science from UC Berkeley. I've learned that the hardest problems aren't purely technical, they're about understanding how people actually work, translating messy requirements into robust solutions, and building trust across teams who speak different languages. The biggest problem across many industries is speaking to non-technical executives and managers who expect quick results without understanding the underlying complexity. This is often defined as the last-mile problem. I've found that the best way to solve this is to build strong communication skills along with the technical skills, and to have a deep understanding of the business domain."
    ]
};

export const socialLinks: SocialLink[] = [
    {
        id: "github",
        label: "GitHub",
        url: "https://github.com/sacayo/Data-Science-Projects",
        type: "external",
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/sammy-cayo/",
        type: "external",
    },
    {
        id: "email",
        label: "Email",
        url: "mailto:sacayo@berkeley.edu",
        type: "mailto",
    },
];

export const skillCategories: SkillCategory[] = [
    {
        id: "gen-ai",
        title: "Large Language Models (LLMs)",
        skills: ["Transformers", "RAG", "LangChain", "Prompt Engineering", "RAGAS", " Vertex AI", "OpenAI", "Claude", "Mistral"],
        proficiency: 90,
    },
    {
        id: "classic-ml",
        title: "Classical ML",
        skills: ["Scikit-learn", "XGBoost", "Classification", "Regression", "Clustering", "Logistic Regression", "Random Forest"],
        proficiency: 85,
    },
    {
        id: "deep-learning",
        title: "Deep Learning",
        skills: ["PyTorch", "TensorFlow", "Keras"],
        proficiency: 70,
    },
    {
        id: "data-eng",
        title: "Data Engineering",
        skills: ["PySpark", "Databricks", "SQL", "NoSQL", "PostgreSQL"],
        proficiency: 75,
    },
    {
        id: "mlops",
        title: "MLOps & Cloud",
        skills: ["AWS", "Docker", "EC2", "ECS", "Git Actions", "GCP"],
        proficiency: 75,
    },
    {
        id: "stats",
        title: "Statistics & Inference",
        skills: ["Causal Inference", "A/B Testing", "Experiment Design", "R"],
        proficiency: 70,
    },
];

export const projects: Project[] = [
    {
        id: "rag-pipeline",
        title: "Full-Stack Gen AI Application",
        shortTagline: "E2E Legal Document Retrieval System",
        impactStatement: "Built a complete production-grade RAG system with 4 integrated pipelines.",
        problem: "Legal document search is notoriously difficult due to complex terminology and the need for high-recall precision.",
        approach: "Architected a 4-stage pipeline: Text extraction (ECS/Fargate), Hybrid Embedding (Pinecone), RAG Query API (LLaMA 3.1 on EC2 GPU), and a Streamlit UI (AWS Elastic Beanstalk).",
        results: "Deployed a scalable, GPU-accelerated system capable of semantic search across thousands of legal PDFs with hybrid retrieval.",
        techStack: ["HuggingFace", "Pinecone", "AWS ECS/EC2", "Flask", "Streamlit", "AWS Elastic Beanstalk"],
        tags: ["GenAI", "Full Stack", "MLOps", "AWS"],
        priority: 1,
        isFeatured: true, // Featured
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/rag-pipeline",
            demo: "http://rag-pipeline-env.eba-3p3p3p3p.us-west-2.elasticbeanstalk.com/", // Placeholder or real if known
        },
        assets: {
            thumbnail: "https://raw.githubusercontent.com/sacayo/Data-Science-Projects/main/rag-pipeline/assets/graph.png",
        },
    },
    {
        id: "flight-delay",
        title: "Southwest Airlines Flight Delay Prediction",
        shortTagline: "PySpark at Scale",
        impactStatement: "Estimated business outcome of $20 million in cost savings for Southwest Airlines.",
        problem: "Flight delays incur massive costs. Predicting them allows for proactive fleet management.",
        approach: "Utilized Bureau of Transportation Statistics data and Databricks' PySpark to train Logistic Regression, XGBoost, and Neural Network models on 90+ million rows of flight data.",
        results: "Identified key delay drivers and produced a deployable model for real-time risk assessment.",
        techStack: ["PySpark", "Databricks", "XGBoost", "Neural Networks", "AWS" ],
        tags: ["Big Data", "Classification", "Aviation"],
        priority: 2,
        isFeatured: true, // Featured
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/Flight-Delay-Prediction",
        },
        assets: {
            thumbnail: "https://raw.githubusercontent.com/sacayo/Data-Science-Projects/main/Flight-Delay-Prediction/assets/W261_Phase_2_presentation.png",
        },
    },
    {
        id: "rag-eval",
        title: "RAG QA System Evaluation",
        shortTagline: "LLM Pipeline Optimization",
        impactStatement: "Optimized retrieval quality and response faithfulness using RAGAS metrics.",
        problem: "Ensuring reliability and accuracy in Retrieval Augmented Generation systems.",
        approach: "Designed an evaluation framework using RAGAS. Tuned hyperparameters including chunking strategies, embedding models, and LLM selection.",
        results: "Improved response quality through systematic hyperparameter tuning and evaluation.",
        techStack: ["RAGAS", "RAG", "LLM", "Python", "HuggingFace", "LangChain", "Generative AI", "LLMs", "HuggingFace"],
        tags: ["GenAI", "Evaluation", "NLP"],
        priority: 3,

        isFeatured: true, // Featured
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/RAG-QA-System-Evaluation",
        },
        assets: {
            thumbnail: "https://raw.githubusercontent.com/sacayo/Data-Science-Projects/main/RAG-QA-System-Evaluation/assets/model-evalution-graph.png",
        },
    },
    {
        id: "google-return",
        title: "Google Customer Return Prediction",
        shortTagline: "Deep Learning for User Retention",
        impactStatement: "Achieved 93.72% recall on test set, significantly outperforming baseline models.",
        problem: "Predicting user retention for Google's online merchandise store to optimize marketing efforts.",
        approach: "Developed an LSTM model to analyze sequential user behavior data, comparing performance against Logistic Regression baselines.",
        results: "Delivered a high-recall model capable of accurately identifying customers likely to return.",
        techStack: ["Keras", "Deep Learning", "Python", "TensorFlow", "Scikit-learn"],
        tags: ["Deep Learning", "Marketing", "Predictive Modeling"],
        priority: 4,
        isFeatured: true, // Featured
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/Google-Customer-Return-Prediction",
        },
        assets: {
            thumbnail: "https://raw.githubusercontent.com/sacayo/Data-Science-Projects/main/Google-Customer-Return-Prediction/assets/207%20Project%20Presentation.png",
        },
    },
    {
        id: "youtube-ab",
        title: "YouTube Engagement A/B Test",
        shortTagline: "Causal Inference on Social Data",
        impactStatement: "Investigated causal impact of Bitcoin-related comments on video engagement.",
        problem: "Distinguishing correlation from causation in social media engagement metrics.",
        approach: "Implemented a multi-level, between-subject randomized controlled trial using data collected via YouTube Data API and analyzed in R.",
        results: "Provided statistical evidence regarding the influence of specific comment topics on viewer engagement.",
        techStack: ["R", "YouTube API", "Causal Inference", "Statistics"],
        tags: ["A/B Testing", "Research", "Social Media"],
        priority: 5,
        isFeatured: false,
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/YouTube-AB-Test",
        },
    },
    {
        id: "refugee-network",
        title: "Refugee Network Analysis",
        shortTagline: "NoSQL Graph Analytics",
        impactStatement: "Mapped global refugee movements (2020-2022) to identify critical migration hubs.",
        problem: "Analyzing complex, interconnected migration flows beyond simple aggregate statistics.",
        approach: "Leveraged Neo4j for network analysis. Created graph representations of refugee flows and applied PageRank and community detection algorithms.",
        results: "Visualized complex migration networks and identified key structural properties of global refugee movements.",
        techStack: ["Neo4j", "NoSQL", "Graph Algorithms", "PageRank"],
        tags: ["Graph Theory", "Social Good", "Data Viz"],
        priority: 6,
        isFeatured: false,
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/Refugee-Network-Analysis-with-NoSQL",
        },
    },
    {
        id: "spotify-hit",
        title: "Spotify Hit Song Predictor",
        shortTagline: "Music Popularity Analysis",
        impactStatement: "Analyzed 32,000+ tracks to uncover key drivers of song popularity.",
        problem: "Understanding what acoustic features contribute to a song becoming a commercial hit.",
        approach: "Analyzed a large dataset of tracks using Random Forest Regression to model the relationship between audio features and popularity.",
        results: "Identified the most significant musical attributes and genre-specific trends influencing success.",
        techStack: ["Random Forest", "Python", "Scikit-Learn", "Data Analysis"],
        tags: ["ML", "Music", "Regression"],
        priority: 7,
        isFeatured: false,
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/Spotify-Hit-Song-Predictor",
        },
    },
    {
        id: "income-trends",
        title: "Generational Income Trends",
        shortTagline: "Socio-Economic Analysis",
        impactStatement: "Quantified the influence of age, education, and work hours on income.",
        problem: "Examining how income determinants vary and interact across different generations.",
        approach: "Analyzed General Social Survey data using Ordinary Least Squares (OLS) regression with robust standard errors.",
        results: "Delivered statistical insights into the changing landscape of logical income predictors.",
        techStack: ["R", "OLS Regression", "Statistics", "GSS Data"],
        tags: ["Statistics", "Economics", "Research"],
        priority: 8,
        isFeatured: false,
        links: {
            github: "https://github.com/sacayo/Data-Science-Projects/tree/main/Generational-Income-Trend-Analysis",
        },
    },
];

import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { siteConfig, aboutContent, skillCategories, projects } from '@/data/config';

// Convert UIMessage format (parts array) to standard format (content string)
const convertToModelMessages = (messages: any[]) => {
    return messages.map(msg => {
        // If message already has content string, use it directly
        if (typeof msg.content === 'string') {
            return { role: msg.role, content: msg.content };
        }

        // Extract text from parts array (SDK v3 UIMessage format)
        if (msg.parts && Array.isArray(msg.parts)) {
            const textContent = msg.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join('');
            return { role: msg.role, content: textContent };
        }

        // Fallback
        return { role: msg.role, content: '' };
    }).filter(msg => msg.content); // Remove empty messages
};

// explicit cast to standard map for system prompt construction
const getSystemPrompt = () => {
    const skillsContext = skillCategories
        .map(cat => `${cat.title}: ${cat.skills.join(', ')}`)
        .join('\n');

    const projectsContext = projects
        .filter(p => p.isFeatured) // Focus on featured first
        .map(p => `- ${p.title}: ${p.impactStatement} (Tech: ${p.techStack.join(', ')})`)
        .join('\n');

    return `
    You are an AI Portfolio Assistant for ${siteConfig.name}.
    
    Your goal is to answer questions about Sammy's background, skills, and projects in a professional but friendly tone. When answering question, dont just answer the question using exact words found from the project details. Make the answer concise and to the point. If the question is not about Sammy, his background, skills, or projects, answer with a generic response.
    
    Here is the context about Sammy:
    
    BIO:
    ${aboutContent.bio.join(' ')}
    
    SKILLS:
    ${skillsContext}
    
    FEATURED PROJECTS:
    ${projectsContext}
    
    CONTACT:
    Email: ${siteConfig.email || "sacayo@berkeley.edu"}
    GitHub: https://github.com/sacayo
    LinkedIn: https://www.linkedin.com/in/sammy-cayo/
    
    RULES:
    - Keep answers concise (1 or 2  sentences unless asked for detail).
    - Be enthusiastic about AI and Machine Learning.
    - If asked about a specific project not listed here, say you don't have details on that but suggest checking the GitHub.
    - Do not make up facts.
    - 
  `;
};

export async function POST(req: Request) {
    console.log("----- API ROUTE CALLED -----");
    console.log("Has Groq Key:", !!process.env.GROQ_API_KEY);

    const { messages } = await req.json();
    console.log("Received messages:", messages?.length);

    // Convert UIMessage format to standard ModelMessage format
    const modelMessages = convertToModelMessages(messages);
    console.log("Converted messages:", modelMessages);

    const result = streamText({
        model: groq('llama-3.1-8b-instant'),
        system: getSystemPrompt(),
        messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
}


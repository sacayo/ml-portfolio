import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { siteConfig, aboutContent, skillCategories, projects } from '@/data/config';
import MemoryClient from 'mem0ai';

export const runtime = 'nodejs';

let _mem0: MemoryClient | null = null;
function getMem0(): MemoryClient | null {
    if (_mem0) return _mem0;
    const apiKey = process.env.MEM0_API_KEY;
    if (!apiKey) return null;
    _mem0 = new MemoryClient({ apiKey });
    return _mem0;
}

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
const getSystemPrompt = (knownBlock: string | null = null) => {
    const skillsContext = skillCategories
        .map(cat => `${cat.title}: ${cat.skills.join(', ')}`)
        .join('\n');

    const featuredProjectsContext = projects
        .filter(p => p.isFeatured)
        .map(p => `- ${p.title}: ${p.impactStatement} (Tech: ${p.techStack.join(', ')})`)
        .join('\n');

    const otherProjectsContext = projects
        .filter(p => !p.isFeatured)
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
    ${featuredProjectsContext}

    OTHER PROJECTS:
    ${otherProjectsContext}
    
    CONTACT:
    Email: ${siteConfig.email || "sacayo@berkeley.edu"}
    GitHub: https://github.com/sacayo
    LinkedIn: https://www.linkedin.com/in/sammy-cayo/
    
    RULES:
    - Keep answers concise (1 or 2  sentences unless asked for detail).
    - Be enthusiastic about AI and Machine Learning.
    - If asked about a specific project not listed here, say you don't have details on that but suggest checking the GitHub.
    - Do not make up facts.
    ${knownBlock
        ? `\n\nKNOWN ABOUT VISITOR (from prior chats):\n${knownBlock}\nGreet by name when natural and tailor answers to their interests.`
        : `\n\nYou don't yet know who this visitor is. In your reply, naturally ask ONE open question (not every turn) to learn their name and role or company. Do not interrogate.`
    }
  `;
};

export async function POST(req: Request) {
    const { messages, userId } = await req.json();

    // Convert UIMessage format to standard ModelMessage format
    const modelMessages = convertToModelMessages(messages);
    const latestUser = [...modelMessages].reverse().find(m => m.role === 'user')?.content ?? '';

    // Retrieve relevant memories for this visitor
    let knownBlock: string | null = null;
    const mem0 = getMem0();
    if (userId && mem0 && latestUser) {
        try {
            const res = await mem0.search(latestUser, {
                filters: { user_id: userId },
                topK: 5,
            });
            const hits = (res as any)?.results ?? res ?? [];
            if (Array.isArray(hits) && hits.length) {
                knownBlock = hits.map((m: any) => `- ${m.memory}`).join('\n');
            }
        } catch (e) {
            console.error('[mem0.search] failed', e);
        }
    }

    const result = streamText({
        model: groq('llama-3.1-8b-instant'),
        system: getSystemPrompt(knownBlock),
        messages: modelMessages,
        onFinish: async ({ text }) => {
            if (!userId || !mem0 || !latestUser) return;
            try {
                await mem0.add(
                    [
                        { role: 'user', content: latestUser },
                        { role: 'assistant', content: text },
                    ],
                    { userId }
                );
            } catch (e) {
                console.error('[mem0.add] failed', e);
            }
        },
    });

    return result.toUIMessageStreamResponse();
}


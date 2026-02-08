import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { projects } from '@/data/config';
import { ProjectDetailContent } from './ProjectDetailContent';

function getProjectMarkdown(id: string): string | null {
    const filePath = path.join(process.cwd(), 'src', 'content', 'projects', `${id}.md`);
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch {
        return null;
    }
}

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return projects.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find(p => p.id === id);
    if (!project) return {};

    return {
        title: project.title,
        description: project.impactStatement,
        openGraph: {
            title: project.title,
            description: project.impactStatement,
            images: project.assets?.thumbnail ? [{ url: project.assets.thumbnail }] : [],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = projects.find(p => p.id === id);

    if (!project) notFound();

    const currentIndex = projects.findIndex(p => p.id === id);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
    const richContent = getProjectMarkdown(id);

    return (
        <ProjectDetailContent
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            richContent={richContent}
        />
    );
}

'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { skillCategories } from '@/data/config';

const data = skillCategories.map(cat => ({
    subject: cat.title.replace(' & ', '\n').replace('Big Data', ''),
    fullSubject: cat.title,
    A: cat.proficiency || 80,
    fullMark: 100,
    skills: cat.skills,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const categoryData = data.find(d => d.subject === label);
        if (!categoryData) return null;

        return (
            <div className="bg-surface-elevated/95 dark:bg-black/90 p-4 border border-border rounded-xl shadow-xl backdrop-blur-sm max-w-[250px]">
                <h4 className="font-bold font-display text-text-primary mb-2">{categoryData.fullSubject}</h4>
                <div className="flex flex-wrap gap-1.5">
                    {categoryData.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export function SkillsRadar() {
    return (
        <div className="w-full flex flex-col items-center justify-center relative">
            <div className="absolute top-0 right-0 p-2 bg-accent/10 text-accent text-xs rounded-lg font-mono">
                Hover axes for details
            </div>
            <div className="h-[400px] w-full max-w-2xl">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#94a3b8" strokeOpacity={0.4} />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }}
                            className="dark:[&_text]:!fill-gray-400"
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Proficiency"
                            dataKey="A"
                            stroke="#0284c7"
                            strokeWidth={3}
                            fill="#0EA5E9"
                            fillOpacity={0.25}
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

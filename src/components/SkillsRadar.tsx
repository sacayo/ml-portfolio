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

// Transform config data directly
const data = skillCategories.map(cat => ({
    subject: cat.title.replace(' & ', '\n').replace('Big Data', ''), // Simple formatting for labels
    fullSubject: cat.title,
    A: cat.proficiency || 80, // Use real proficiency or default
    fullMark: 100,
    skills: cat.skills, // Pass skills for the tooltip
}));

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const categoryData = data.find(d => d.subject === label);
        if (!categoryData) return null;

        return (
            <div className="bg-white/95 dark:bg-black/90 p-4 border border-gray-100 dark:border-white/10 rounded-xl shadow-xl backdrop-blur-sm max-w-[250px]">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{categoryData.fullSubject}</h4>
                <div className="flex flex-wrap gap-1.5">
                    {categoryData.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full border border-blue-100 dark:border-blue-800">
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
            <div className="absolute top-0 right-0 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-lg font-mono">
                Hover specific axes to see details
            </div>
            <div className="h-[400px] w-full max-w-2xl">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#e5e7eb" strokeOpacity={0.5} />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Proficiency"
                            dataKey="A"
                            stroke="#4f46e5"
                            strokeWidth={3}
                            fill="#6366f1"
                            fillOpacity={0.25}
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

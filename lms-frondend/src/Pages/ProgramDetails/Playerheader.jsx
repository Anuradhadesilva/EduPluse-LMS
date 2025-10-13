import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Breadcrumbs, Chip, Tooltip } from '@mui/material';
import { Star, Users, Clock, Languages, FileText, CheckCircle } from 'lucide-react';

export const PlayerHeader = ({ program }) => {
    if (!program) return null;

    const totalLessons =
        program.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0;

    return (
        <header className="p-6 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 border-b border-gray-800">
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ color: 'gray', mb: 2 }}>
                <Link to="/programs" className="hover:underline text-gray-400">My Courses</Link>
                <Typography className="text-gray-300">{program.category}</Typography>
            </Breadcrumbs>

            <h1 className="text-3xl font-bold text-white mb-1">{program.title}</h1>
            <p className="text-gray-400 text-sm mb-4">{program.subtitle}</p>

            <div className="flex items-center flex-wrap gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-2"><FileText size={16} /> {totalLessons} Lessons</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} /> {program.quizzes?.length || 0} Quizzes</span>
                <span className="flex items-center gap-2"><Languages size={16} /> {program.language}</span>
            </div>
        </header>

    );
};

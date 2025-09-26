import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Breadcrumbs } from '@mui/material';
import { Star, Users, Clock, Languages } from 'lucide-react';

export const PlayerHeader = ({ program }) => {
    if (!program) return null;

    const totalLessons = program.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0;

    return (
        <header className="p-6 bg-gray-800 border-b border-gray-700">
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ color: 'lightgray', mb: 2 }}>
                <Link to="/programs" className="hover:underline">My Courses</Link>
                <Typography className="text-white">{program.category}</Typography>
            </Breadcrumbs>

            <h1 className="text-3xl font-bold text-white mb-2">{program.title}</h1>
            <h2 className="text-lg text-gray-400 mb-4">{program.subtitle}</h2>

            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
                <span className="flex items-center gap-1.5"><Star size={16} className="text-yellow-400" /> 4.5 Stars</span>
                <span className="flex items-center gap-1.5"><Users size={16} /> {totalLessons} Lectures</span>
                <span className="flex items-center gap-1.5"><Languages size={16} /> {program.language}</span>
            </div>
        </header>
    );
};

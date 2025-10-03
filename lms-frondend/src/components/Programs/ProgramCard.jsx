import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Star, Book, Clock, Users, ArrowRight } from 'lucide-react';

export const ProgramCard = ({ program, isEnrolled, onEnroll }) => {
    // ✅ FIX: Add a check to ensure the 'program' prop exists before continuing.
    // This prevents the component from crashing if it's used incorrectly.
    if (!program) {
        return null; // Or return a placeholder/error component
    }

    const role = localStorage.getItem("role")

    const { id, image, category, rating, title, lessons, duration, price } = program;

    const gradientColors = [
        'from-purple-500 via-pink-500 to-indigo-500',
        'from-green-400 via-blue-400 to-purple-500',
        'from-yellow-400 via-red-400 to-pink-500',
        'from-indigo-500 via-purple-500 to-pink-500',
    ];
    const randomGradient = gradientColors[id % gradientColors.length];

    return (
        <div className="rounded-xl shadow-lg overflow-hidden h-full flex flex-col group transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            {/* Gradient placeholder for image */}
            <div className={`h-40 w-full ${randomGradient} bg-gradient-to-br flex items-center justify-center`}>
                <span className="text-white text-3xl font-bold uppercase">
                    {title.slice(0, 4)}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-grow bg-white">
                <span className="text-sm font-semibold text-blue-600 mb-1">{category}</span>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors flex-grow">
                    <Link to={`/programs/${id}`}>{title}</Link>
                </h3>

                <div className="my-4 flex items-center justify-between text-sm text-gray-500 border-t border-b py-2">
                    <span className="flex items-center gap-1.5"><Book size={14} /> {lessons} Lessons</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {duration}</span>
                </div>

                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-gray-900">{price}</span>
                    {isEnrolled || role === 'ROLE_ADMIN' ? (
                        <Button
                            component={Link}
                            to={`/programs/${id}`}
                            variant="outlined"
                            size="small"
                            endIcon={<ArrowRight size={16} />}
                        >
                            View
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={onEnroll}
                        >
                            Enroll
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
};
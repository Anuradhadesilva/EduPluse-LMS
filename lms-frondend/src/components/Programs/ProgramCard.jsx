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

    const { id, image, category, rating, title, lessons, duration, price } = program;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="relative">
                <img src={image || 'https://via.placeholder.com/400x200'} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 text-yellow-500 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                    <Star size={14} /> {rating}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <span className="text-sm font-semibold text-blue-600 mb-1">{category}</span>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors flex-grow">
                    <Link to={`/programs/${id}`}>{title}</Link>
                </h3>

                <div className="my-4 flex items-center justify-between text-sm text-gray-500 border-t border-b py-2">
                    <span className="flex items-center gap-1.5"><Book size={14} /> {lessons} Lessons</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {duration}</span>
                </div>

                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-gray-900">${price}</span>
                    {isEnrolled ? (
                        <Button
                            component={Link}
                            to={`/programs/${id}`}
                            variant="outlined"
                            size="small"
                            endIcon={<ArrowRight size={16} />}
                        >
                            View Program
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={onEnroll}
                        >
                            Enroll Now
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

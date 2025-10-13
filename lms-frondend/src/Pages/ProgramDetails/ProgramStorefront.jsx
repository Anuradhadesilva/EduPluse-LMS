import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, Button, Box, Divider, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { BookOpen, CheckCircle, ChevronDown, Award, Users, PlayCircle, FileText, CheckSquare, BarChart2, Languages } from 'lucide-react';
import { enrollProgram } from '../../state/Program/Action';
import { openLoginModal } from '../../state/UI/uiSlice';

// A helper function to get the correct icon for a lesson type
const getLessonIcon = (type) => {
    switch (type) {
        case 'VIDEO':
            return <PlayCircle size={18} className="text-blue-500" />;
        case 'DOCUMENT':
            return <FileText size={18} className="text-indigo-500" />;
        case 'QUIZ':
            return <CheckSquare size={18} className="text-green-500" />;
        default:
            return <BookOpen size={18} className="text-gray-500" />;
    }
};

export const ProgramStorefront = ({ program }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleEnroll = () => {
        if (!jwt) {
            dispatch(openLoginModal());
        } else {
            // Assuming you have an enrollProgram action
            dispatch(enrollProgram(jwt, program.id));
            alert(`Enrolling in ${program.title}`);
        }
    };

    // Calculate dynamic stats from the program object
    const totalLessons = program.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0;
    const totalQuizzes = program.quizzes?.length || 0;

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <Box className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-5xl">
                    <Chip label={program.category} color="primary" size="small" className="mb-4" />
                    <Typography variant="h2" component="h1" className="font-bold mb-2">{program.title}</Typography>
                    <Typography variant="h6" className="text-gray-300 mb-6">{program.subtitle}</Typography>
                    <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-gray-400">
                        <span className="flex items-center gap-1.5"><BarChart2 size={16} /> Level: {program.skillLevel}</span>
                        <span className="flex items-center gap-1.5"><Users size={16} /> {program.enrollmentCount || 0} Students</span>
                        <span className="flex items-center gap-1.5"><Languages size={16} /> Language: {program.language}</span>
                    </div>
                </div>
            </Box>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details & Curriculum */}
                    <main className="lg:col-span-2">
                        {/* What You'll Learn */}
                        <Paper className="p-8 rounded-xl shadow-lg mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Award size={28} className="text-blue-600" />
                                <Typography variant="h5" component="h2" className="font-semibold">What you'll learn</Typography>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                {program.learningObjectives?.map((objective, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                                        <span>{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </Paper>

                        {/* Course Curriculum */}
                        <div className="mb-8">
                            <Typography variant="h5" component="h2" className="font-semibold mb-4">Course Curriculum</Typography>
                            {program.sections?.map((section) => (
                                <Accordion key={section.id} defaultExpanded className="bg-white shadow-md rounded-lg mb-2">
                                    <AccordionSummary expandIcon={<ChevronDown />}>
                                        <Typography className="font-semibold">{section.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className="border-t border-gray-200">
                                        <ul className="space-y-3">
                                            {section.lessons?.map(lesson => (
                                                <li key={lesson.id} className="flex items-center gap-3 text-gray-700">
                                                    {getLessonIcon(lesson.lessonType)}
                                                    <span>{lesson.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>

                        {/* Description */}
                        <Paper className="p-8 rounded-xl shadow-lg mb-8">
                            <Typography variant="h5" component="h2" className="font-semibold mb-4">Description</Typography>
                            <Typography variant="body1" color="text.secondary" className="whitespace-pre-wrap">
                                {program.description}
                            </Typography>
                        </Paper>

                        {/* Prerequisites */}
                        <Paper className="p-8 rounded-xl shadow-lg">
                            <Typography variant="h5" component="h2" className="font-semibold mb-4">Prerequisites</Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {program.prerequisites?.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </Paper>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-1">
                        <Paper className="p-6 rounded-xl shadow-lg sticky top-24">
                            <img src={program.imageUrl || 'https://placehold.co/600x400/334155/E2E8F0?text=Course+Image'} alt={program.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                            {/* In a real app, you would have a price field on the program model */}
                            <Typography variant="h4" className="font-bold mb-4">$49.99</Typography>
                            <Button variant="contained" size="large" fullWidth onClick={handleEnroll}>Enroll Now</Button>
                            <Divider className="my-4" />
                            <Typography variant="subtitle1" className="font-bold mb-3">This program includes:</Typography>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-3"><BookOpen size={18} /><span>{totalLessons} Lessons</span></li>
                                <li className="flex items-center gap-3"><CheckSquare size={18} /><span>{totalQuizzes} Quizzes</span></li>
                                <li className="flex items-center gap-3"><BarChart2 size={18} /><span>Skill Level: {program.skillLevel}</span></li>
                            </ul>
                        </Paper>
                    </aside>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageTopBanner } from '../../components/PageTop/PageTopBanner';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import { Book, Clock, Users, Video, FileText, CheckSquare } from 'lucide-react';
import { enrollProgram } from '../../state/Program/Action';
import { openLoginModal } from '../../state/UI/uiSlice';

export const ProgramStorefront = ({ program }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const handleEnroll = () => {
        if (!jwt) {
            dispatch(openLoginModal());
        } else {
            dispatch(enrollProgram(jwt, program.id));
        }
    };

    return (
        // ✅ FIX: Add pt-20 (padding-top) to the main container to offset the navbar height
        <div className="bg-gray-50 min-h-screen pt-20">
            <PageTopBanner pageTitle={program.title} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-2">
                        <Paper className="p-8 rounded-xl shadow-lg">
                            <Typography variant="h4" component="h1" className="font-bold mb-4">{program.title}</Typography>
                            <Typography variant="body1" color="text.secondary" className="mb-6">
                                An in-depth program designed to help learners achieve mastery in their chosen field. Get access to structured video tutorials, comprehensive resource documents, and challenging quizzes to test your understanding.
                            </Typography>

                            <Divider className="my-6" />

                            {program.videos?.length > 0 && <ContentSection title="Video Lectures" icon={<Video />} items={program.videos} />}
                            {program.documents?.length > 0 && <ContentSection title="Documents & Resources" icon={<FileText />} items={program.documents} />}
                            {program.quizzes?.length > 0 && <ContentSection title="Quizzes & Assessments" icon={<CheckSquare />} items={program.quizzes} />}
                        </Paper>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <Paper className="p-6 rounded-xl shadow-lg sticky top-24">
                            <img src={program.image} alt={program.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <Typography variant="h4" className="font-bold mb-4">${program.price}</Typography>
                            <Button variant="contained" size="large" fullWidth onClick={handleEnroll}>Enroll Now</Button>
                            <Divider className="my-4" />
                            <Typography variant="subtitle1" className="font-bold mb-2">Program Includes</Typography>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-3"><Book size={18} /><span>{program.lessons} Lessons</span></li>
                                <li className="flex items-center gap-3"><Clock size={18} /><span>{program.duration}</span></li>
                                <li className="flex items-center gap-3"><Users size={18} /><span>{program.students} Students Enrolled</span></li>
                            </ul>
                        </Paper>
                    </aside>
                </div>
            </div>
        </div>
    );
};

// Helper component for rendering content sections neatly
const ContentSection = ({ title, icon, items }) => (
    <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
            {React.cloneElement(icon, { className: "text-2xl text-blue-600" })}
            <Typography variant="h5" component="h2" className="font-semibold">{title}</Typography>
        </div>
        <ul className="list-disc list-inside ml-2 space-y-2 text-gray-700">
            {items.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
    </div>
);
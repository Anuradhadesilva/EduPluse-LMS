import React, { useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab, Button, Divider } from '@mui/material';
import { CheckCircle, FileText, CheckSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index }) {
    return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

export const PlayerContentArea = ({ program, selectedLesson }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();

    const renderLessonContent = (lesson) => {
        if (!lesson) return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Please select a lesson to begin.
            </div>
        );

        switch (lesson.lessonType) {
            case 'VIDEO':
                return (
                    <iframe
                        src={lesson.video?.url?.replace('watch?v=', 'embed/') || ''}
                        title={lesson.title}
                        allowFullScreen
                        className="w-full h-full"
                    />
                );

            case 'DOCUMENT':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-gray-300">
                        <FileText size={48} className="text-gray-500 mb-4" />
                        <p className="text-lg mb-4">{lesson.title}</p>
                        <Button
                            variant="contained"
                            color="primary"
                            href={lesson.document.link}
                            target="_blank"
                        >
                            Open Document
                        </Button>
                    </div>
                );

            case 'QUIZ':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <CheckCircle size={48} className="text-blue-500 mb-4" />
                        <h3 className="text-xl text-gray-100 mb-2">{lesson.title}</h3>
                        <p className="text-gray-400 mb-4">Ready to test your knowledge?</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/quiz/${lesson.quiz.id}`)}
                        >
                            Start Quiz
                        </Button>
                    </div>
                );

            default:
                return (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        Content not available.
                    </div>
                );
        }
    };


    return (
        <div className="p-5 border-b border-gray-700 bg-gray-900 min-h-screen">
            {/* Video or Content Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
                {renderLessonContent(selectedLesson)}
            </div>

            {/* Info / Tabs Section */}
            <Paper
                elevation={0}
                className="rounded-2xl bg-gradient-to-br from-gray-850 via-gray-900 to-gray-950 text-white border border-gray-800 shadow-xl"
            >
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 3,
                    }}
                >
                    <Tabs
                        value={tabIndex}
                        onChange={(e, newValue) => setTabIndex(newValue)}
                        textColor="inherit"
                        indicatorColor="primary"
                        TabIndicatorProps={{ sx: { height: 3, borderRadius: 2, backgroundColor: '#3B82F6' } }}
                    >
                        <Tab label="Overview" />
                        <Tab label="Quizzes" />
                        <Tab label="Resources" />
                    </Tabs>
                </Box>

                {/* Overview Tab */}
                <TabPanel value={tabIndex} index={0}>
                    <div className="grid md:grid-cols-2 gap-10 bg-gradient-to-br bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-inner">

                        {/* Left: About Course */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-100">
                                About This Course
                            </h3>
                            <p className="text-gray-300 leading-relaxed tracking-wide">
                                {program.description || "No description provided yet."}
                            </p>
                        </div>

                        {/* Right: What You'll Learn */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-100">
                                What You'll Learn
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                {(program.learningObjectives || []).map((obj, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <CheckCircle size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                                        <span className="leading-snug">{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabPanel>


                {/* Quizzes Tab */}
                <TabPanel value={tabIndex} index={1}>
                    {program.quizzes?.length ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {program.quizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:bg-gray-850 transition"
                                >
                                    <h4 className="font-semibold text-gray-100 mb-2">{quiz.title}</h4>
                                    <p className="text-gray-400 text-sm mb-4">
                                        {quiz.questions?.length || 0} questions
                                    </p>
                                    <Link
                                        to={`/quiz/${quiz.id}`}
                                        className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
                                    >
                                        Start Quiz
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No quizzes available yet.</p>
                    )}
                </TabPanel>

                {/* Resources Tab */}
                <TabPanel value={tabIndex} index={2}>
                    <p
                        className="text-gray-400">
                        Resources and downloads will appear here soon.
                    </p>
                </TabPanel>
            </Paper>
        </div>
    );
};

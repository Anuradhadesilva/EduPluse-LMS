import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button } from '@mui/material';
import { PlayCircle, FileText, CheckSquare, ArrowLeft } from 'lucide-react';
import { CourseContentSidebar } from './CourseContentSidebar';

export const ProgramPlayer = ({ program }) => {
    const navigate = useNavigate();
    const [selectedContent, setSelectedContent] = useState(null);
    const [completedItems, setCompletedItems] = useState(new Set());

    // Set the first video as the default content when the page loads
    useEffect(() => {
        if (program?.videos?.[0]) {
            // ✅ FIX: Use a consistent, flat structure for the content object
            setSelectedContent({ ...program.videos[0], type: 'video' });
        }
    }, [program]);

    const handleContentSelect = (content) => {
        setSelectedContent(content);
        // ✅ FIX: Use the 'id' directly from the flat content object
        const contentId = `${content.type}-${content.id}`;
        setCompletedItems(prev => new Set(prev).add(contentId));
    };

    const renderContent = () => {
        if (!selectedContent) {
            return (
                <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-8 text-center">
                    <PlayCircle size={64} className="text-gray-400 mb-4" />
                    <Typography variant="h6" color="text.secondary">Select an item from the course content to begin.</Typography>
                </div>
            );
        }

        switch (selectedContent.type) {
            case 'video':
                // ✅ FIX: Read 'url' and 'title' directly from the flat selectedContent object
                const embedUrl = selectedContent.url.includes("embed") ? selectedContent.url : selectedContent.url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/");
                return (
                    <div className="p-4 h-full flex flex-col">
                        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-2xl flex-grow">
                            <iframe src={embedUrl} title={selectedContent.title} frameBorder="0" allowFullScreen className="w-full h-full" />
                        </div>
                        <Typography variant="h4" className="font-bold mt-6">{selectedContent.title}</Typography>
                    </div>
                );
            case 'document':
                return (
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                        <FileText size={48} className="mx-auto text-blue-500 mb-4" />
                        <Typography variant="h5" className="font-bold mb-2">{selectedContent.title}</Typography>
                        <Button variant="contained" href={selectedContent.link} target="_blank" rel="noopener noreferrer">
                            Download Document
                        </Button>
                    </div>
                );
            case 'quiz':
                return (
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                        <CheckSquare size={48} className="mx-auto text-green-500 mb-4" />
                        <Typography variant="h5" className="font-bold mb-2">{selectedContent.title}</Typography>
                        <Button variant="contained" onClick={() => navigate(`/quiz/${selectedContent.id}`)}>
                            Start Quiz
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        // ✅ FIX: Remove h-screen and add padding to create a scrolling layout that respects the navbar height
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen pt-20">
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col p-4 lg:p-6">
                <Button onClick={() => navigate('/enrolled-programs')} startIcon={<ArrowLeft size={16} />} sx={{ alignSelf: 'flex-start', mb: 2 }}>
                    Back to My Courses
                </Button>
                <Paper className="flex-1 rounded-xl shadow-lg overflow-hidden flex items-center justify-center min-h-[60vh]">
                    {renderContent()}
                </Paper>
            </main>

            {/* Course Content Sidebar */}
            <aside className="w-full lg:w-[400px] flex-shrink-0 bg-white shadow-2xl lg:shadow-none lg:border-l lg:border-gray-200 lg:h-screen lg:sticky lg:top-0">
                <div className="lg:pt-20 h-full">
                    <CourseContentSidebar
                        program={program}
                        selectedContent={selectedContent}
                        onContentSelect={handleContentSelect}
                        completedItems={completedItems}
                    />
                </div>
            </aside>
        </div>
    );
};
import React, { useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab, Button } from '@mui/material';
import { CheckCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

export const PlayerContentArea = ({ program, selectedLesson }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();

    const renderMainContent = () => {
        if (!selectedLesson) {
            return (
                <div className="bg-black flex items-center justify-center h-full">
                    <Typography>Please select a lesson to begin.</Typography>
                </div>
            );
        }

        const { lessonType, video, document, quiz, title } = selectedLesson;

        switch (lessonType) {
            case 'VIDEO':
                if (!video?.url)
                    return <div className="bg-black flex items-center justify-center h-full">
                        <Typography>
                            Video coming soon.
                        </Typography>
                    </div>;
                const embedUrl = video.url.includes("embed") ?
                    video.url : video.url.replace("watch?v=", "embed/");
                return <iframe src={embedUrl} title={title} frameBorder="0" allowFullScreen className="w-full h-full"></iframe>;

            case 'DOCUMENT':
                return <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                    <FileText
                        size={48}
                        className="mx-auto text-blue-400 mb-4" />
                    <Typography variant="h5"
                        className="font-bold mb-4">{title}</Typography>
                    <Button
                        variant="contained"
                        href={document.link}
                        target="_blank">Download Document</Button>
                </div>;

            case 'QUIZ':
                return <div className="p-8 text-center flex flex-col items-center justify-center h-full"><CheckSquare size={48} className="mx-auto text-green-400 mb-4" /><Typography variant="h5" className="font-bold mb-4">{title}</Typography><Button variant="contained" onClick={() => navigate(`/quiz/${quiz.id}`)}>Start Quiz</Button></div>;

            default:
                return <div className="bg-black flex items-center justify-center h-full"><Typography>Content loading...</Typography></div>;
        }
    };

    return (
        <div className="p-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                {renderMainContent()}
            </div>

            <Paper className="mt-6 rounded-lg bg-gray-800 text-white">
                <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                    <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} textColor="inherit" indicatorColor="primary">
                        <Tab label="Overview" />
                        <Tab label="Notes" />
                        <Tab label="Announcements" />
                    </Tabs>
                </Box>
                <TabPanel value={tabIndex} index={0}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Typography variant="h6" className="font-bold mb-3">Description</Typography>
                            <Typography className="text-gray-300 whitespace-pre-wrap">{program.description}</Typography>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <Typography variant="h6" className="font-bold mb-3">What You'll Learn</Typography>
                                <ul className="space-y-2">
                                    {(program.learningObjectives || []).map((obj, i) => (
                                        <li key={i} className="flex items-start gap-3"><CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" /><span>{obj}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <Typography variant="h6" className="font-bold mb-3">Prerequisites</Typography>
                                <ul className="list-disc list-inside ml-1 space-y-1 text-gray-300">
                                    {(program.prerequisites || []).map((pre, i) => <li key={i}>{pre}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}><Typography>Note-taking feature coming soon.</Typography></TabPanel>
                <TabPanel value={tabIndex} index={2}><Typography>No announcements yet.</Typography></TabPanel>
            </Paper>
        </div>
    );
};

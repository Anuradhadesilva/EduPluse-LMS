import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, ListItemIcon, ListItemText, LinearProgress } from '@mui/material';
import { CheckCircle2, CheckSquare, ExpandIcon, FileText, PlayCircle } from 'lucide-react';

export const CourseContentSidebar = ({ program, selectedContent, onContentSelect }) => {

    // --- PROGRESS & COMPLETION SIMULATION ---
    // In a real app, this would come from the backend based on user progress.
    const completedItems = useState(new Set(['video-0', 'quiz-0']))[0]; // Simulate first video and quiz as completed
    const totalItems = (program.videos?.length || 0) + (program.documents?.length || 0) + (program.quizzes?.length || 0);
    const progress = totalItems > 0 ? (completedItems.size / totalItems) * 100 : 0;
    console.log(program)
    return (
        <Box className="h-full flex flex-col">
            <Box className="p-4 border-b">
                <Typography variant="h6" className="font-bold">{program.title}</Typography>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
                    <Typography variant="body2" color="text.secondary" className="mt-1">{Math.round(progress)}% Complete</Typography>
                </Box>
            </Box>

            <Box className="flex-grow overflow-y-auto">
                {/* Section for Videos */}
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandIcon />}>
                        <Typography className="font-semibold">Video Lectures</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {program.videos.map((video, index) => {
                                const isSelected = selectedContent?.type === 'video' && selectedContent.data.id === video.id;
                                const isCompleted = completedItems.has(`video-${index}`);
                                return (
                                    <ListItemButton key={video.id} selected={isSelected} onClick={() => onContentSelect({ type: 'video', data: video })}>
                                        <ListItemIcon>
                                            {isCompleted ? <CheckCircle2 size={20} className="text-green-500" /> : <PlayCircle />}
                                        </ListItemIcon>
                                        <ListItemText primary={video.title} />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* Section for Documents */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandIcon />}>
                        <Typography className="font-semibold">Quizzes</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {program.quizzes.map((quiz, index) => {
                                const isCompleted = completedItems.has(`quiz-${index}`);
                                return (
                                    <ListItemButton key={quiz.id} onClick={() => onContentSelect({ type: 'quiz', data: quiz })}>
                                        <ListItemIcon>
                                            {isCompleted ? <CheckCircle2 size={20} className="text-green-500" /> : <CheckSquare />}
                                        </ListItemIcon>
                                        <ListItemText primary={quiz.title} />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};
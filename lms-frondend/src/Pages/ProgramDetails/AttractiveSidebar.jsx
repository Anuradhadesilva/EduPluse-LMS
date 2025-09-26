import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Chip } from '@mui/material';
import { ExpandMore, PlayCircleOutline, CheckCircle } from '@mui/icons-material';
import { FileText, CheckSquare } from 'lucide-react';

export const AttractiveSidebar = ({ program, selectedLesson, completedLessons, onSelectLesson }) => {

    const allLessons = program.sections?.flatMap(section => section.lessons) || [];
    const progress = allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0;

    return (
        <Box className=" flex flex-col text-white pt-20">
            <Box className="p-4 border-b border-gray-700">
                <Typography variant="h6" className="font-bold">Course Content</Typography>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <div className="flex justify-between items-center mb-1">
                        <Typography variant="body2" className="text-gray-400">{completedLessons.size} / {allLessons.length} Complete</Typography>
                        <Chip label={`${Math.round(progress)}%`} variant="filled" color="primary" size="small" />
                    </div>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
                </Box>
            </Box>

            <Box className="flex-grow overflow-y-auto">
                {(program.sections || []).map((section) => (
                    <Accordion key={section.id} defaultExpanded sx={{ bgcolor: 'transparent', color: 'white', boxShadow: 'none', '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'white' }} />} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                            <Typography className="font-semibold">{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <List dense>
                                {(section.lessons || []).map((lesson) => {
                                    const isSelected = selectedLesson?.id === lesson.id;
                                    const isCompleted = completedLessons.has(lesson.id);
                                    const getIcon = () => {
                                        const iconProps = { size: 20, className: "mr-2" };
                                        if (lesson.lessonType === 'VIDEO') return <PlayCircleOutline sx={{ mr: 2 }} />;
                                        if (lesson.lessonType === 'DOCUMENT') return <FileText {...iconProps} />;
                                        if (lesson.lessonType === 'QUIZ') return <CheckSquare {...iconProps} />;
                                    };
                                    return (
                                        <ListItemButton key={lesson.id} selected={isSelected}
                                            onClick={() => onSelectLesson(lesson)}
                                            sx={{ pl: 4, '&.Mui-selected': { bgcolor: 'rgba(255, 255, 255, 0.08)' } }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                {isCompleted ? <CheckCircle sx={{ color: 'success.main' }} /> : getIcon()}
                                            </ListItemIcon>
                                            <ListItemText primary={lesson.title} />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};
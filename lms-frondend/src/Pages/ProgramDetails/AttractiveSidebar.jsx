import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Chip } from '@mui/material';
import { ExpandMore, PlayCircleOutline, CheckCircle } from '@mui/icons-material';
import { FileText, CheckSquare } from 'lucide-react';

export const AttractiveSidebar = ({ program, selectedLesson, completedLessons, onSelectLesson }) => {

    const allLessons = program.sections?.flatMap(section => section.lessons) || [];
    const progress = allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0;

    return (
        <Box className="flex flex-col h-full text-white">
            {/* Progress Header */}
            <Box className="p-5 border-b border-gray-700 bg-gray-900">
                <Typography variant="h6" className="font-semibold mb-2">Course Progress</Typography>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
                    <span>{completedLessons.size} / {allLessons.length} Lessons</span>
                    <Chip label={`${Math.round(progress)}%`} size="small" color="primary" />
                </div>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
            </Box>

            {/* Scrollable Lesson List */}
            <Box className="flex-grow overflow-y-auto p-2 bg-gray-900">
                {(program.sections || []).map((section) => (
                    <Accordion
                        key={section.id}
                        disableGutters
                        defaultExpanded
                        sx={{
                            bgcolor: 'transparent',
                            color: 'white',
                            boxShadow: 'none',
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                            sx={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                                fontWeight: 600,
                            }}
                        >
                            {section.title}
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <List dense>
                                {(section.lessons || []).map((lesson) => {
                                    const isSelected = selectedLesson?.id === lesson.id;
                                    const isCompleted = completedLessons.has(lesson.id);

                                    const getIcon = () => {
                                        if (lesson.lessonType === 'VIDEO') return <PlayCircleOutline sx={{ mr: 1 }} />;
                                        if (lesson.lessonType === 'DOCUMENT') return <FileText size={18} className="mr-1" />;
                                        if (lesson.lessonType === 'QUIZ') return <CheckSquare size={18} className="mr-1" />;
                                    };

                                    return (
                                        <ListItemButton
                                            key={lesson.id}
                                            selected={isSelected}
                                            onClick={() => onSelectLesson(lesson)}
                                            sx={{
                                                pl: 4,
                                                py: 1,
                                                borderRadius: 2,
                                                mb: 0.5,
                                                '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.1)' },
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 30 }}>
                                                {isCompleted
                                                    ? <CheckCircle sx={{ color: 'success.main' }} />
                                                    : getIcon()}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={lesson.title}
                                                primaryTypographyProps={{
                                                    fontSize: 14,
                                                    fontWeight: isSelected ? 600 : 400,
                                                    color: isCompleted ? 'lightgreen' : 'white',
                                                }}
                                            />
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

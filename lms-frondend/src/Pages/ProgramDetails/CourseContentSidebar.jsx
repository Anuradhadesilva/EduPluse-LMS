import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Chip } from '@mui/material';
import { ExpandMore, PlayCircleOutline, DescriptionOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { CheckCircle2 } from 'lucide-react';

export const CourseContentSidebar = ({ program, selectedContent, onContentSelect, completedItems }) => {

    // Combine all content into a single array with a 'type' property
    const allContentItems = [
        ...(program.videos?.map(v => ({ ...v, type: 'video' })) || []),
        ...(program.documents?.map(d => ({ ...d, type: 'document' })) || []),
        ...(program.quizzes?.map(q => ({ ...q, type: 'quiz' })) || [])
    ];

    // Calculate progress based on the simulated 'completedItems' set
    const progress = allContentItems.length > 0 ? (completedItems.size / allContentItems.length) * 100 : 0;

    return (
        <Box className="h-full flex flex-col">
            <Box className="p-4 border-b">
                <Typography variant="h6" className="font-bold truncate">{program.title}</Typography>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <div className="flex justify-between items-center mb-1">
                        <Typography variant="body2" color="text.secondary">Your Progress</Typography>
                        <Chip label={`${Math.round(progress)}%`} color="primary" size="small" />
                    </div>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
                </Box>
            </Box>

            <Box className="flex-grow overflow-y-auto">
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography className="font-semibold">Course Content</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            {allContentItems.map((item) => {
                                const isSelected = selectedContent?.id === item.id && selectedContent?.type === item.type;
                                const isCompleted = completedItems.has(`${item.type}-${item.id}`);
                                const getIcon = () => {
                                    if (item.type === 'video') return <PlayCircleOutline />;
                                    if (item.type === 'document') return <DescriptionOutlined />;
                                    if (item.type === 'quiz') return <CheckCircleOutlined />;
                                };
                                return (
                                    <ListItemButton key={`${item.type}-${item.id}`} selected={isSelected} onClick={() => onContentSelect(item)}>
                                        <ListItemIcon>
                                            {isCompleted ? <CheckCircle2 size={20} className="text-green-500" /> : getIcon()}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
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

// import React from 'react';
// import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Chip } from '@mui/material';
// import { ExpandMore, PlayCircleOutline, DescriptionOutlined, CheckCircleOutlined } from '@mui/icons-material';
// import { CheckCircle2 } from 'lucide-react';

// export const CourseContentSidebar = ({ program, selectedContent, onContentSelect, completedItems }) => {

//     const allLessons = program.sections?.flatMap(section => section.lessons) || [];
//     const progress = allLessons.length > 0 ? (completedItems.size / allLessons.length) * 100 : 0;

//     return (
//         <Box className="h-full flex flex-col">
//             <Box className="p-4 border-b">
//                 <Typography variant="h6" className="font-bold truncate">{program.title}</Typography>
//                 <Box sx={{ width: '100%', mt: 2 }}>
//                     <div className="flex justify-between items-center mb-1">
//                         <Typography variant="body2" color="text.secondary">Your Progress</Typography>
//                         <Chip label={`${Math.round(progress)}%`} color="primary" size="small" />
//                     </div>
//                     <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
//                 </Box>
//             </Box>

//             <Box className="flex-grow overflow-y-auto">
//                 {/* ✅ FIX: Map over the new hierarchical structure of sections and lessons */}
//                 {(program.sections || []).map((section) => (
//                     <Accordion key={section.id} defaultExpanded>
//                         <AccordionSummary expandIcon={<ExpandMore />}>
//                             <Typography className="font-semibold">{section.title}</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ p: 0 }}>
//                             <List dense>
//                                 {(section.lessons || []).map((lesson) => {
//                                     const isSelected = selectedContent?.id === lesson.id;
//                                     const isCompleted = completedItems.has(lesson.id);
//                                     const getIcon = () => {
//                                         if (lesson.lessonType === 'VIDEO') return <PlayCircleOutline />;
//                                         if (lesson.lessonType === 'DOCUMENT') return <DescriptionOutlined />;
//                                         if (lesson.lessonType === 'QUIZ') return <CheckCircleOutlined />;
//                                     };
//                                     return (
//                                         <ListItemButton key={lesson.id} selected={isSelected} onClick={() => onContentSelect(lesson)}>
//                                             <ListItemIcon>
//                                                 {isCompleted ? <CheckCircle2 size={20} className="text-green-500" /> : getIcon()}
//                                             </ListItemIcon>
//                                             <ListItemText primary={lesson.title} />
//                                         </ListItemButton>
//                                     );
//                                 })}
//                             </List>
//                         </AccordionDetails>
//                     </Accordion>
//                 ))}
//             </Box>
//         </Box>
//     );
// };
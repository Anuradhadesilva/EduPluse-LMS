import React, { useState } from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { ExpandMore, PlayCircleOutline } from "@mui/icons-material";
import { FileText, CheckSquare } from "lucide-react";

export const AttractiveSidebar = ({ program, onSelectLesson }) => {
    const [selectedLessonId, setSelectedLessonId] = useState(null);

    const allLessons = program.sections?.flatMap((s) => s.lessons) || [];

    const handleLessonClick = (lesson) => {
        setSelectedLessonId(lesson.id);
        onSelectLesson(lesson);
    };

    const getIcon = (lessonType) => {
        switch (lessonType) {
            case "VIDEO":
                return <PlayCircleOutline sx={{ mr: 1 }} />;
            case "DOCUMENT":
                return <FileText size={18} className="mr-1" />;
            case "QUIZ":
                return <CheckSquare size={18} className="mr-1" />;
            default:
                return <PlayCircleOutline sx={{ mr: 1 }} />;
        }
    };

    return (
        <Box className="flex flex-col h-full text-white bg-gray-900">
            {/* Header */}
            <Box className="p-4 border-b border-gray-700">
                <Typography variant="h6" className="font-semibold">
                    Lessons ({allLessons.length})
                </Typography>
            </Box>

            {/* Lessons */}
            <Box className="flex-grow overflow-y-auto p-2">
                {(program.sections || []).map((section) => (
                    <Accordion
                        key={section.id}
                        disableGutters
                        defaultExpanded
                        sx={{
                            bgcolor: "transparent",
                            color: "white",
                            boxShadow: "none",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore sx={{ color: "white" }} />}
                            sx={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                                fontWeight: 600,
                            }}
                        >
                            {section.title || "Untitled Section"}
                        </AccordionSummary>

                        <AccordionDetails sx={{ p: 0 }}>
                            <List dense>
                                {(section.lessons || []).map((lesson) => {
                                    const isSelected = selectedLessonId === lesson.id;
                                    return (
                                        <ListItemButton
                                            key={lesson.id}
                                            onClick={() => handleLessonClick(lesson)}
                                            sx={{
                                                pl: 4,
                                                py: 1,
                                                mb: 0.5,
                                                borderRadius: 2,
                                                bgcolor: isSelected
                                                    ? "rgba(34,197,94,0.2)" // green background when clicked
                                                    : "transparent",
                                                transition: "background-color 0.2s ease",
                                                "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 30, color: "white" }}>
                                                {getIcon(lesson.lessonType)}
                                            </ListItemIcon>

                                            <ListItemText
                                                primary={lesson.title || "Untitled Lesson"}
                                                primaryTypographyProps={{
                                                    fontSize: 14,
                                                    fontWeight: isSelected ? 600 : 400,
                                                    sx: {
                                                        color: isSelected ? "#4ade80" : "white",
                                                    },
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

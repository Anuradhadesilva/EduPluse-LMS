import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, TextField, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { LessonEditor } from './LessonEditor';
import { Plus, Trash2 } from 'lucide-react';

export const SectionEditor = ({ section, onSectionChange, onRemoveSection }) => {
    const handleTitleChange = (e) => {
        onSectionChange({ ...section, title: e.target.value });
    };

    const handleAddLesson = () => {
        const newLesson = {
            id: `new-${Date.now()}`, title: '', type: 'VIDEO',
            video: { title: '', url: '' }, document: { title: '', link: '' }, contentId: null,
        };
        onSectionChange({ ...section, lessons: [...(section.lessons || []), newLesson] });
    };

    const handleLessonChange = (updatedLesson) => {
        onSectionChange({ ...section, lessons: (section.lessons || []).map(l => l.id === updatedLesson.id ? updatedLesson : l) });
    };

    const handleRemoveLesson = (lessonId) => {
        onSectionChange({ ...section, lessons: (section.lessons || []).filter(l => l.id !== lessonId) });
    };

    return (
        <Accordion defaultExpanded className="mb-4 shadow-md rounded-lg bg-white">
            <AccordionSummary expandIcon={<ExpandMore />}>
                <div className="flex items-center w-full">
                    <TextField fullWidth variant="standard" value={section.title || ''} onChange={handleTitleChange} onClick={(e) => e.stopPropagation()} placeholder="Section Title" className="font-semibold" />
                    {/* ✅ FIX: Stop the click event from propagating to the parent accordion button */}
                    <IconButton onClick={(e) => { e.stopPropagation(); onRemoveSection(); }} size="small" className="ml-2">
                        <Trash2 size={16} className="text-red-500" />
                    </IconButton>
                </div>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-50/50">
                <div className="space-y-3">
                    {(section.lessons || []).map((lesson) => (
                        <LessonEditor key={lesson.id} lesson={lesson} onLessonChange={handleLessonChange} onRemove={() => handleRemoveLesson(lesson.id)} />
                    ))}
                    <Button size="small" variant="text" startIcon={<Plus size={16} />} onClick={handleAddLesson}>Add Lesson</Button>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

import React, { useState } from 'react';
import { Paper, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Typography } from '@mui/material';
import { Trash2 } from 'lucide-react';

export const LessonEditor = ({ lesson, onLessonChange, onRemove }) => {

    const lessonType = lesson.lessonType || 'VIDEO';

    const handleChange = (field, value) => {
        onLessonChange({ ...lesson, [field]: value });
    };

    const handleContentDetailsChange = (contentType, field, value) => {
        onLessonChange({
            ...lesson,
            [contentType]: {
                ...lesson[contentType],
                [field]: value
            }
        });
    };

    return (
        <Paper elevation={2} className="p-4 space-y-4">
            {/* Lesson Title and Remove Button */}
            <div className="flex items-center justify-between">
                <TextField
                    label="Lesson Title"
                    variant="standard"
                    size="small"
                    value={lesson.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="flex-grow font-medium"
                />
                <IconButton onClick={onRemove} size="small"><Trash2 size={16} className="text-red-500" /></IconButton>
            </div>

            {/* Content Type Selector */}
            <FormControl fullWidth size="small">
                <InputLabel>Content Type</InputLabel>
                <Select value={lessonType} label="Content Type" onChange={(e) => handleChange('type', e.target.value)}>
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="DOCUMENT">Document</MenuItem>
                    <MenuItem value="QUIZ">Quiz</MenuItem>
                </Select>
            </FormControl>

            {/* ✅ SIMPLIFIED: Conditional form fields based on type */}
            {lessonType === 'VIDEO' && (
                <div className="p-3 bg-blue-50/50 rounded-md space-y-2 border border-blue-200">
                    <Typography variant="caption" color="text.secondary">Create a new video for this lesson:</Typography>
                    <TextField label="Video Title" size="small" fullWidth value={lesson.video?.title || ''} onChange={e => handleContentDetailsChange('video', 'title', e.target.value)} />
                    <TextField label="Video URL" size="small" fullWidth value={lesson.video?.url || ''} onChange={e => handleContentDetailsChange('video', 'url', e.target.value)} />
                </div>
            )}

            {lessonType === 'DOCUMENT' && (
                <div className="p-3 bg-green-50/50 rounded-md space-y-2 border border-green-200">
                    <Typography variant="caption" color="text.secondary">Create a new document for this lesson:</Typography>
                    <TextField label="Document Title" size="small" fullWidth value={lesson.document?.title || ''} onChange={e => handleContentDetailsChange('document', 'title', e.target.value)} />
                    <TextField label="Document Link" size="small" fullWidth value={lesson.document?.link || ''} onChange={e => handleContentDetailsChange('document', 'link', e.target.value)} />
                </div>
            )}

            {lessonType === 'QUIZ' && (
                <div className="p-3 bg-gray-100 rounded-md">
                    <TextField
                        label="Existing QUIZ ID"
                        size="small"
                        fullWidth
                        type="number"
                        value={lesson.quizId || ''}
                        onChange={(e) => handleChange('quizId', e.target.value)}
                        helperText="Enter the ID of the pre-existing quiz you want to link."
                    />
                </div>
            )}
        </Paper>
    );
};

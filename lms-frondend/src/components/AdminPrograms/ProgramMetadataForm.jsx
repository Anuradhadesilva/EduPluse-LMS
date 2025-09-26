import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, IconButton } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';

export const ProgramMetadataForm = ({ programData, setProgramData }) => {
    const handleChange = (e) => {
        setProgramData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleListChange = (listName, index, value) => {
        const currentList = programData[listName] || [];
        const newList = [...currentList];
        newList[index] = value;
        setProgramData(prev => ({ ...prev, [listName]: newList }));
    };

    const addListItem = (listName) => {
        const currentList = programData[listName] || [];
        setProgramData(prev => ({ ...prev, [listName]: [...currentList, ''] }));
    };

    const removeListItem = (listName, index) => {
        const currentList = programData[listName] || [];
        setProgramData(prev => ({ ...prev, [listName]: currentList.filter((_, i) => i !== index) }));
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField label="Program Title" name="title" value={programData.title || ''} onChange={handleChange} fullWidth required />
                <TextField label="Subtitle" name="subtitle" value={programData.subtitle || ''} onChange={handleChange} fullWidth />
            </div>
            <TextField label="Description" name="description" value={programData.description || ''} onChange={handleChange} fullWidth multiline rows={4} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField label="Category" name="category" value={programData.category || ''} onChange={handleChange} fullWidth />
                <TextField label="Price" name="price" type="number" value={programData.price || '0.00'} onChange={handleChange} fullWidth />
                <FormControl fullWidth>
                    <InputLabel>Skill Level</InputLabel>
                    <Select name="skillLevel" value={programData.skillLevel || 'BEGINNER'} label="Skill Level" onChange={handleChange}>
                        <MenuItem value="BEGINNER">Beginner</MenuItem>
                        <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                        <MenuItem value="ADVANCED">Advanced</MenuItem>
                        <MenuItem value="ALL_LEVELS">All Levels</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
                <h3 className="font-semibold mb-2 text-gray-700">Learning Objectives</h3>
                {/* ✅ FIX: Default to an empty array to prevent .map() of undefined error */}
                {(programData.learningObjectives || []).map((obj, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <TextField placeholder="e.g., Build a full-stack web application" fullWidth size="small" value={obj} onChange={(e) => handleListChange('learningObjectives', index, e.target.value)} />
                        <IconButton size="small" color="error" onClick={() => removeListItem('learningObjectives', index)}><Trash2 size={18} /></IconButton>
                    </div>
                ))}
                <Button size="small" startIcon={<Plus size={16} />} onClick={() => addListItem('learningObjectives')}>Add Objective</Button>
            </div>

            <div>
                <h3 className="font-semibold mb-2 text-gray-700">Prerequisites</h3>
                {/* ✅ FIX: Default to an empty array to prevent .map() of undefined error */}
                {(programData.prerequisites || []).map((pre, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <TextField placeholder="e.g., Basic understanding of HTML and CSS" fullWidth size="small" value={pre} onChange={(e) => handleListChange('prerequisites', index, e.target.value)} />
                        <IconButton size="small" color="error" onClick={() => removeListItem('prerequisites', index)}><Trash2 size={18} /></IconButton>
                    </div>
                ))}
                <Button size="small" startIcon={<Plus size={16} />} onClick={() => addListItem('prerequisites')}>Add Prerequisite</Button>
            </div>
        </div>
    );
};
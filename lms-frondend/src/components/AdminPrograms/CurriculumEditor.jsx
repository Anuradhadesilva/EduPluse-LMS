import React from 'react';
import { Button } from '@mui/material';
import { PlusCircle } from 'lucide-react';
import { SectionEditor } from './SectionEditor';

export const CurriculumEditor = ({ programData, setProgramData }) => {

    const handleAddSection = () => {
        const newSection = {
            id: `new-${Date.now()}`,
            title: 'New Section',
            lessons: [],
        };
        setProgramData(prev => ({
            ...prev,
            sections: [...(prev.sections || []), newSection],
        }));
    };

    const handleSectionChange = (updatedSection) => {
        setProgramData(prev => ({
            ...prev,
            sections: prev.sections.map(s => (s.id || s.tempId) === (updatedSection.id || updatedSection.tempId) ? updatedSection : s),
        }));
    };

    const handleRemoveSection = (sectionId) => {
        setProgramData(prev => ({
            ...prev,
            sections: prev.sections.filter(s => (s.id || s.tempId) !== sectionId)
        }));
    };

    return (
        <div>
            {programData.sections.map((section, index) => (
                <SectionEditor
                    key={section.id || `section-${index}`}
                    section={section}
                    onSectionChange={handleSectionChange}
                    onRemoveSection={() => handleRemoveSection(section.id || section.tempId)}
                />
            ))}
            <div className="mt-6">
                <Button
                    variant="outlined"
                    startIcon={<PlusCircle />}
                    onClick={handleAddSection}
                >
                    Add Section
                </Button>
            </div>
        </div>
    );
};

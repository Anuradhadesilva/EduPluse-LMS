import React, { useState, useEffect } from 'react';
import { PlayerHeader } from './Playerheader';
import { PlayerContentArea } from './PlayerContentArea';
import { AttractiveSidebar } from './AttractiveSidebar';
import { PreLoader } from '../../components/Loaders/Loader';


export const ProfessionalPlayerPage = ({ program, isLoading }) => {
    // State to manage the currently selected lesson from the sidebar
    const [selectedLesson, setSelectedLesson] = useState(null);
    // State to simulate which lessons have been completed
    const [completedLessons, setCompletedLessons] = useState(new Set());

    // When the page loads, automatically select the very first lesson from the first section
    useEffect(() => {
        if (program?.sections?.[0]?.lessons?.[0]) {
            setSelectedLesson(program.sections[0].lessons[0]);
        }
    }, [program]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    const handleSelectLesson = (lesson) => {
        setSelectedLesson(lesson);
        // Simulate marking a lesson as complete when it's selected
        setCompletedLessons(prev => new Set(prev).add(lesson.id));
    };



    return (
        <div className="text-white min-h-screen pt-20 ">
            <div className="flex flex-col lg:flex-row gap-8 container mx-auto pb-20 ">
                {/* Main Content Area */}
                <main className="flex-1 rounded-2xl overflow-hidden">
                    <PlayerHeader program={program} />
                    <PlayerContentArea program={program} selectedLesson={selectedLesson} />
                </main>

                {/* Sidebar (no fixed positioning) */}
                <aside className="w-full lg:w-80 xl:w-96 bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    <AttractiveSidebar
                        program={program}
                        selectedLesson={selectedLesson}
                        completedLessons={completedLessons}
                        onSelectLesson={handleSelectLesson}
                    />
                </aside>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 text-center py-6">
                © {new Date().getFullYear()} Your Company — All rights reserved.
            </footer>
        </div>
    );
};
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
        <div className=" text-white min-h-screen pt-20">
            <div className="flex flex-col lg:flex-row">
                {/* Main Content Area (Player and Overview) */}
                <main className="flex-1 lg:pr-80 xl:pr-96">
                    <PlayerHeader program={program} />
                    <PlayerContentArea program={program} selectedLesson={selectedLesson} />
                </main>

                {/* Course Content Sidebar */}
                <aside className="w-full lg:w-80 xl:w-96 lg:fixed lg:right-0 lg:top-0 min-h-screen mt-20 bg-gray-800 shadow-2xl">
                    <AttractiveSidebar
                        program={program}
                        selectedLesson={selectedLesson}
                        completedLessons={completedLessons}
                        onSelectLesson={handleSelectLesson}
                    />
                </aside>
            </div>
        </div>
    );
};

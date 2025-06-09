import React, { useContext, useState } from 'react';
import { AppContext } from '../Contexts/AppContext';

export const Admin = () => {
    const { addProgram, addQuizToProgram } = useContext(AppContext);
    const [newProgram, setNewProgram] = useState({ title: '', category: '', lessons: 0, students: 0, duration: '', price: '', image: '' });
    const [quiz, setQuiz] = useState({ programTitle: '', title: '', questions: [] });

    const handleAddProgram = () => {
        addProgram({ ...newProgram, id: Date.now() });
        alert('Program added');
    };

    const handleAddQuiz = () => {
        addQuizToProgram(quiz.programTitle, { id: Date.now(), title: quiz.title, questions: quiz.questions });
        alert('Quiz added');
    };

    return (
        <div className="min-h-screen ">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add Program</h2>
                <input onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })} placeholder="Title" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setNewProgram({ ...newProgram, category: e.target.value })} placeholder="Category" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setNewProgram({ ...newProgram, lessons: e.target.value })} placeholder="Lessons" type="number" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setNewProgram({ ...newProgram, students: e.target.value })} placeholder="Students" type="number" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })} placeholder="Duration" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setNewProgram({ ...newProgram, price: e.target.value })} placeholder="Price" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setNewProgram({ ...newProgram, image: e.target.value })} placeholder="Image URL" className="border p-2 w-full mb-2" />
                <button onClick={handleAddProgram} className="bg-blue-600 text-white px-4 py-2 rounded">Add Program</button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Add Quiz</h2>
                <input onChange={(e) => setQuiz({ ...quiz, programTitle: e.target.value })} placeholder="Program Title" className="border p-2 w-full mb-2" />
                <input onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} placeholder="Quiz Title" className="border p-2 w-full mb-2" />
                <button onClick={handleAddQuiz} className="bg-green-600 text-white px-4 py-2 rounded">Add Quiz</button>
            </div>
        </div>
    );
};
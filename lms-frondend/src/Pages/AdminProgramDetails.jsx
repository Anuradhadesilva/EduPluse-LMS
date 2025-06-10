import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Contexts/AppContext';
import { Quiz } from './Quiz';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';

export const AdminProgramDetails = () => {
    const { id } = useParams();
    const { programs, setPrograms, quizzes, setQuizzes, deleteQuizFromProgram, editProgram } = useContext(AppContext);
    const program = programs[id];

    if (!program) {
        return <div className="p-6 text-red-500">Program not found.</div>;
    }

    const relatedQuiz = quizzes.find(q => q.programTitle === program.title);
    const [formData, setFormData] = useState(program);
    const [quizTitle, setQuizTitle] = useState('');

    if (!program) {
        return <div className="p-6 text-red-500">Program not found.</div>;
    }

    const handleAddQuiz = () => {
        const updatedQuizzes = quizzes.map(q => {
            if (q.programTitle === program.title) {
                return {
                    ...q,
                    quizzes: [...q.quizzes, { id: Date.now(), title: quizTitle, questions: [] }]
                };
            }
            return q;
        });
        setQuizzes(updatedQuizzes);
        setQuizTitle('');
    };
    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner />
            <div className='w-full px-4 md:px-16 sm:px-10' >
                <h1 className="text-2xl font-bold">Edit Program</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData).map(key => (
                        key !== 'id' && (
                            <input
                                key={key}
                                value={formData[key]}
                                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                className="border p-2 w-full"
                            />
                        )
                    ))}
                </div>
                <button onClick={editProgram} className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Quizzes</h2>
                    <ul className="mt-2 space-y-2">
                        {relatedQuiz?.quizzes.map(quiz => (
                            <li key={quiz.id} className="border p-3 rounded flex justify-between">
                                <span>{quiz.title}</span>
                                <button onClick={() => handleDeleteQuiz(quiz.id)} className="text-red-600 underline">Delete</button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <input
                            value={quizTitle}
                            onChange={e => setQuizTitle(e.target.value)}
                            placeholder="New Quiz Title"
                            className="border p-2 mr-2"
                        />
                        <button onClick={handleAddQuiz} className="bg-blue-600 text-white px-4 py-2 rounded">Add Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

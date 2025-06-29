import React, { useState, useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const AddQuiz = ({ programId, programTitle }) => {
    const { id } = useParams();
    const { quizzes, setQuizzes } = useContext(AppContext);

    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
    });

    const handleAddQuestion = () => {
        const { question, optionA, optionB, optionC, optionD, correctAnswer } = currentQ;
        if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
            alert("Please fill in all fields");
            return;
        }

        setQuestions([...questions, { ...currentQ, id: Date.now() }]);
        setCurrentQ({
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctAnswer: '',
        });
        console.log(currentQ);
    };

    const handleCreateQuiz = async () => {
        const newQuiz = {
            title: quizTitle,
            programId: id,
            questions,
        };

        try {
            const response = await axios.post(
                'http://localhost:5454/api/quiz/create',
                newQuiz
            );
            alert('✅ Quiz added successfully!');
            console.log(response.data);
            setQuizTitle('');
            setQuestions([]);
        } catch (err) {
            console.error('❌ Failed to add quiz:', err);
            alert('Failed to add quiz. See console for details.');
        }
        // const newQuiz = {
        //     id: Date.now(),
        //     title: quizTitle,
        //     questions,
        // };

        // const existing = quizzes.find(q => q.programId === programId);
        // let updated;

        // if (existing) {
        //     updated = quizzes.map(q =>
        //         q.programId === programId
        //             ? { ...q, quizzes: [...q.quizzes, newQuiz] }
        //             : q
        //     );
        // } else {
        //     updated = [...quizzes, {
        //         programTitle,
        //         programId,
        //         quizzes: [newQuiz]
        //     }];
        // }

        // setQuizzes(updated);
        // setQuizTitle('');
        // setQuestions([]);
        // alert("Quiz added successfully!");
        // console.log(newQuiz);
    };

    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4">Create Quiz for: {programTitle}</h2>

            <input
                className="border p-2 mb-4 w-full"
                placeholder="Enter Quiz Title"
                value={quizTitle}
                onChange={e => setQuizTitle(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3 mb-4">
                <input className="border p-2" placeholder="Question" value={currentQ.question}
                    onChange={e => setCurrentQ({ ...currentQ, question: e.target.value })} />
                <input className="border p-2" placeholder="Correct Answer"
                    value={currentQ.correctAnswer}
                    onChange={e => setCurrentQ({ ...currentQ, correctAnswer: e.target.value })} />
                <input className="border p-2" placeholder="Option A"
                    value={currentQ.optionA}
                    onChange={e => setCurrentQ({ ...currentQ, optionA: e.target.value })} />
                <input className="border p-2" placeholder="Option B"
                    value={currentQ.optionB}
                    onChange={e => setCurrentQ({ ...currentQ, optionB: e.target.value })} />
                <input className="border p-2" placeholder="Option C"
                    value={currentQ.optionC}
                    onChange={e => setCurrentQ({ ...currentQ, optionC: e.target.value })} />
                <input className="border p-2" placeholder="Option D"
                    value={currentQ.optionD}
                    onChange={e => setCurrentQ({ ...currentQ, optionD: e.target.value })} />
            </div>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleAddQuestion}
            >
                ➕ Add Question
            </button>

            {questions.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6 mb-2">📋 Added Questions</h3>
                    <table className="w-full table-auto border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">#</th>
                                <th className="border px-2 py-1">Question</th>
                                <th className="border px-2 py-1">Correct</th>
                                <th className="border px-2 py-1">A</th>
                                <th className="border px-2 py-1">B</th>
                                <th className="border px-2 py-1">C</th>
                                <th className="border px-2 py-1">D</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, i) => (
                                <tr key={q.id}>
                                    <td className="border px-2 py-1 text-center">{i + 1}</td>
                                    <td className="border px-2 py-1">{q.question}</td>
                                    <td className="border px-2 py-1">{q.correctAnswer}</td>
                                    <td className="border px-2 py-1">{q.optionA}</td>
                                    <td className="border px-2 py-1">{q.optionB}</td>
                                    <td className="border px-2 py-1">{q.optionC}</td>
                                    <td className="border px-2 py-1">{q.optionD}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleCreateQuiz}
                    >
                        ✅ Save Quiz
                    </button>
                </>
            )}
        </div>
    );
};

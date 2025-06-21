import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import quizData from '../constants/quizData';
import axios from 'axios';

export const Quiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5454/api/quiz/${id}`);
                setQuiz(response.data);
            }
            catch (err) {
                console.error('❌ Failed to fetch quiz:', err);
                alert('Error fetching quiz from backend.');
            }
        };
        fetchQuiz();

    }, []);
    // const quizId = parseInt(id); // ✅ Convert to number


    // const allQuizzes = quizData.flatMap(program => program.quizzes);

    // Find quiz by id
    // const quiz = allQuizzes.find(q => q.id === quizId);

    if (!quiz) {
        return <div className="text-red-600 text-center mt-10">Quiz not found.</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

                {quiz.questions.map((q, index) => (
                    <div key={index} className="mb-6 border p-4 rounded-lg shadow">
                        <p className="mb-2 font-medium">{index + 1}. {q.question}</p>
                        <div className="grid gap-2">
                            <label><input type="radio" name={`q${index}`} /> {q.optionA}</label>
                            <label><input type="radio" name={`q${index}`} /> {q.optionB}</label>
                            <label><input type="radio" name={`q${index}`} /> {q.optionC}</label>
                            <label><input type="radio" name={`q${index}`} /> {q.optionD}</label>
                        </div>
                    </div>
                ))}

                <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import quizData from '../constants/quizData';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById, submitQuiz } from '../state/Quiz/Action';

export const Quiz = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = useSelector((state) => state.auth.user?.id);
    console.log(userId);

    const [answers, setAnswers] = useState({});
    const { selectedQuiz: quiz } = useSelector((store) => store.quiz);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getQuizById(id));
    }, [dispatch, id]);

    const submitQuizHandle = async () => {
        if (!quiz) return;

        // Build submission data
        const submissionData = {
            quizId: quiz.id,
            userId: userId,
            answers: quiz.questions.map((q, index) => ({
                questionId: q.id,            // assuming backend needs questionId
                selectedAnswer: answers[index] || null
            }))
        };

        try {
            await dispatch(submitQuiz(jwt, submissionData));
            console.log(submissionData);
        } catch (err) {
            alert("❌ Failed to submit quiz: " + err.message);
        }
    }

    const handleAnswerChange = (questionIndex, selectedOption) => {
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    // const quizId = parseInt(id); // ✅ Convert to number


    // const allQuizzes = quizData.flatMap(program => program.quizzes);

    // Find quiz by id
    // const quiz = allQuizzes.find(q => q.id === quizId);

    if (!quiz) {
        return <div className="text-red-600 text-center mt-10">Quiz not found.</div>;
    }

    return (
        <div className=" bg-gray-50 pt-[80px] px-4 sm:px-6 md:px-8 flex justify-center pb-[80px]">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                <button onClick={() => navigate(-1)} className='mb-4 text-blue-600 underline cursor-pointer'>Back</button>
                <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

                {quiz.questions.map((q, index) => (
                    <div key={q.id || index} className="mb-6 border p-4 rounded-lg shadow">
                        <p className="mb-2 font-medium">{index + 1}. {q.question}</p>
                        <div className="grid gap-2">
                            {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                                <label key={opt} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`q${index}`}
                                        value={q[opt]}
                                        checked={answers[index] === q[opt]}
                                        onChange={() => handleAnswerChange(index, q[opt])}
                                    />{" "}
                                    {q[opt]}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => submitQuizHandle()}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>

            </div>
        </div>
    );
}

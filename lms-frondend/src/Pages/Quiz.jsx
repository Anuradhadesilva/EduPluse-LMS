import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import quizData from '../constants/quizData';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById, getUserSubmissions, submitQuiz } from '../state/Quiz/Action';

export const Quiz = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const userId = useSelector((state) => state.auth.user?.id);
    console.log(userId);
    const [answers, setAnswers] = useState({});
    const { selectedQuiz: quiz, submissions } = useSelector((store) => store.quiz);
    const alreadyAttempted = submissions.some(sub => sub.quiz.id === parseInt(id));
    const sumbittedQuiz = submissions.find((sub) => sub.quiz.id === parseInt(id));
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getQuizById(id));
        dispatch(getUserSubmissions(userId));
        window.scrollTo(0, 0);
    }, [dispatch, id, userId]);

    const submitQuizHandle = async () => {
        if (!quiz) return;

        const submissionData = {
            quizId: quiz.id,
            userId: userId,
            answers: quiz.questions.map((q, index) => ({
                questionId: q.id,
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


    if (!quiz) {
        return <div className="text-red-600 text-center mt-10">Quiz not found.</div>;
    }

    if (alreadyAttempted) {
        return (
            <div className="w-full min-h-screen bg-gray-50 pt-[80px] px-4 sm:px-6 md:px-8 flex justify-center pb-[80px]">
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                    <button onClick={() => navigate(-1)} className='mb-4 text-blue-600 underline cursor-pointer'>Back</button>
                    <h2 className="text-xl font-bold text-red-600">You already attempted this quiz!</h2>
                    <p className="mt-2 text-xl font-bold text-black mb-2">Your score: {submissions.find(sub => sub.quiz.id === parseInt(id))?.score}</p>
                    {sumbittedQuiz.answers.map((ans, index) => (
                        <div key={ans.id || index} className="mb-4 p-3 border rounded">
                            <p className="mb-2 font-medium">{index + 1}. {ans.question.question}</p>
                            <div className='grid gap-2'>
                                {["optionA", "optionB", "optionC", "optionD"].map((opt) => {
                                    const optionValue = ans.question[opt];
                                    const isSelected = ans.selectedAnswer === optionValue;
                                    const isCorrect = ans.question.correctAnswer === optionValue;
                                    return (
                                        <label
                                            key={opt}
                                            className={`cursor-pointer px-2 py-1 rounded 
                                             ${isCorrect ? "bg-green-100 text-green-700 font-semibold" : ""}  
                                             ${isSelected && !isCorrect ? "bg-red-100 text-red-700 font-semibold" : ""}
                                              `}
                                        >
                                            <input
                                                type="radio"
                                                name={`ans${index}`}
                                                value={optionValue}
                                                checked={isSelected}
                                                onChange={() => handleAnswerChange(index, optionValue)}
                                                disabled
                                            />{" "}
                                            {optionValue}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
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
}

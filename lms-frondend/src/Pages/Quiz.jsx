import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById, getUserSubmissions, submitQuiz, saveQuizProgress, getInProgressAttempt } from '../state/Quiz/Action';
import { QuizNavigation } from '../components/Quiz/QuizNavigation';
import { QuizSummary } from '../components/Quiz/QuizSummary';
import { debounce } from 'lodash';

export const Quiz = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const userId = useSelector((state) => state.auth.user?.id);
    const { selectedQuiz: quiz, submissions, isLoading, inProgressAttempt } = useSelector((store) => store.quiz);

    // --- State for quiz interaction ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showSummary, setShowSummary] = useState(false);
    const [reviewingAttempt, setReviewingAttempt] = useState(null);

    // --- Auto-Save Logic ---
    const debouncedSaveProgress = useCallback(
        debounce((progressData) => dispatch(saveQuizProgress(jwt, progressData)), 2000),
        [jwt, dispatch]
    );

    useEffect(() => {
        const isCurrentlyAttempting = submissions.filter(sub => sub.quiz?.id === parseInt(id)).length === 0;
        if (isCurrentlyAttempting && Object.keys(answers).length > 0 && quiz) {
            debouncedSaveProgress({ quizId: quiz.id, answers });
        }
    }, [answers, debouncedSaveProgress, submissions, id, quiz]);


    // --- Load Quiz and Progress on Mount ---
    useEffect(() => {
        if (id && userId && jwt) {
            dispatch(getUserSubmissions(userId));
            dispatch(getQuizById(id));
            dispatch(getInProgressAttempt(jwt, id));
        }
        window.scrollTo(0, 0);
    }, [dispatch, id, userId, jwt]);

    useEffect(() => {
        if (inProgressAttempt && inProgressAttempt.answers) {
            setAnswers(inProgressAttempt.answers);
        }
    }, [inProgressAttempt]);


    // --- Handler Functions ---
    const handleAnswerChange = (questionIndex, selectedOption) => {
        setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleQuestionSelect = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleFinishAttempt = () => setShowSummary(true);
    const handleReturnToAttempt = () => setShowSummary(false);

    const submitQuizHandle = async () => {
        if (!quiz) return;
        const submissionData = {
            quizId: quiz.id,
            userId: userId,
            answers: quiz.questions.map((q, index) => ({
                questionId: q.id,
                selectedAnswer: answers[index] || null,
            })),
        };
        await dispatch(submitQuiz(jwt, submissionData));
        if (userId) {
            dispatch(getUserSubmissions(userId));
        }


    };

    // --- Render Logic ---
    if (isLoading || !quiz) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    const attemptsForThisQuiz = submissions.filter(sub => sub.quiz?.id === parseInt(id));

    if (attemptsForThisQuiz.length > 0) {
        if (reviewingAttempt) {
            return (
                <div className="w-full min-h-screen bg-gray-50 pt-[80px] px-4 sm:px-6 md:px-8 flex justify-center pb-[80px]">
                    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                        <button onClick={() => setReviewingAttempt(null)} className='mb-4 text-blue-600 underline cursor-pointer'>
                            ← Back to attempt summary
                        </button>
                        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                            <h2 className="text-xl font-bold mb-3">Reviewing Attempt</h2>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <p><strong>State:</strong> Finished</p>
                                <p><strong>Completed on:</strong> {new Date(reviewingAttempt.submittedAt).toLocaleString()}</p>
                                <p><strong>Score:</strong> {reviewingAttempt.score} / {reviewingAttempt.answers.length} ({((reviewingAttempt.score / reviewingAttempt.answers.length) * 100).toFixed(2)}%)</p>
                            </div>
                        </div>
                        {reviewingAttempt.answers.map((ans, index) => {
                            const isCorrect = ans.selectedAnswer === ans.question.correctAnswer;
                            return (
                                <div key={ans.id || index} className={`mb-4 p-4 border-l-4 rounded ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                                    <p className="mb-2 font-semibold">{index + 1}. {ans.question.question}</p>
                                    <div className='grid gap-2 mb-3'>
                                        {["optionA", "optionB", "optionC", "optionD"].map((opt) => {
                                            const optionValue = ans.question[opt];
                                            const isSelected = ans.selectedAnswer === optionValue;
                                            const isCorrectAnswer = ans.question.correctAnswer === optionValue;
                                            return (
                                                <label
                                                    key={opt}
                                                    className={`flex items-center cursor-default p-2 rounded ${isCorrectAnswer ? "bg-green-100 font-semibold text-green-800" : ""} ${isSelected && !isCorrectAnswer ? "bg-red-100 font-semibold text-red-800" : ""}`}
                                                >
                                                    <input type="radio" checked={isSelected} disabled className="mr-3" />
                                                    {optionValue}
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <div className={`p-3 rounded text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                        {isCorrect ? `Your answer is correct.` : `Your answer, "${ans.selectedAnswer}", is incorrect.`}
                                        <br />
                                        <strong>The correct answer is: {ans.question.correctAnswer}</strong>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="w-full min-h-screen bg-gray-50 pt-[80px] px-4 flex justify-center pb-[80px]">
                    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                        <button onClick={() => navigate(-1)} className='mb-4 text-blue-600 underline cursor-pointer'>Back to Program</button>
                        <h1 className="text-2xl font-bold mb-6">Summary of your previous attempts</h1>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 font-semibold border-b">Attempt</th>
                                    <th className="p-3 font-semibold border-b">State</th>
                                    <th className="p-3 font-semibold border-b">Grade / {attemptsForThisQuiz[0].answers.length}.00</th>
                                    <th className="p-3 font-semibold border-b">Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attemptsForThisQuiz.map((attempt, index) => (
                                    <tr key={attempt.id || index} className="hover:bg-gray-50">
                                        <td className="p-3 border-b">{index + 1}</td>
                                        <td className="p-3 border-b">Finished<br /><span className="text-xs text-gray-500">Submitted {new Date(attempt.submittedAt).toLocaleString()}</span></td>
                                        <td className="p-3 border-b">{attempt.score}.00</td>
                                        <td className="p-3 border-b">
                                            <button onClick={() => setReviewingAttempt(attempt)} className="text-blue-600 font-semibold hover:underline">
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={() => { /* TODO: Add retake logic if allowed by quiz policy */ }}
                            className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold disabled:bg-gray-400"
                            disabled={true}
                        >
                            Re-attempt quiz
                        </button>
                    </div>
                </div>
            );
        }
    }

    if (showSummary) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <QuizSummary
                    questions={quiz.questions}
                    answers={answers}
                    onReturn={handleReturnToAttempt}
                    onSubmit={submitQuizHandle}
                />
            </div>
        );
    }

    if (!quiz.questions || quiz.questions.length === 0) {
        return <div className="text-center mt-20">This quiz has no questions.</div>
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="bg-gray-50 min-h-screen pt-[80px] pb-[80px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4 text-lg font-bold text-gray-700">
                            Question {currentQuestionIndex + 1} of {quiz.questions.length}
                        </div>
                        <p className="mb-6 text-xl">{currentQuestion.question}</p>
                        <div className="grid gap-4">
                            {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                                <label key={opt} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name={`q${currentQuestionIndex}`}
                                        value={currentQuestion[opt]}
                                        checked={answers[currentQuestionIndex] === currentQuestion[opt]}
                                        onChange={() => handleAnswerChange(currentQuestionIndex, currentQuestion[opt])}
                                        className="h-5 w-5 text-blue-600"
                                    />
                                    <span className="ml-4 text-lg">{currentQuestion[opt]}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="bg-gray-300 px-6 py-2 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentQuestionIndex === quiz.questions.length - 1}
                                className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <QuizNavigation
                        questions={quiz.questions}
                        currentQuestionIndex={currentQuestionIndex}
                        answers={answers}
                        onQuestionSelect={handleQuestionSelect}
                        onFinishAttempt={handleFinishAttempt}
                    />
                </div>
            </div>
        </div>
    );
};

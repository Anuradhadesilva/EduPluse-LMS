import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuizById, updateQuiz } from '../../state/Quiz/Action';
import { getProgramById } from '../../state/Program/Action';

export const UpdateQuiz = ({ programId, programTitle, quizId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { selectedQuiz: quiz } = useSelector((store) => store.quiz);
    const [formData, setFormData] = useState({
        title: "",
        questions: []
    });

    const [showAddQuestion, setShowAddQuestion] = useState(false);
    useEffect(() => {
        if (quizId) {
            dispatch(getQuizById(quizId));
        }
    }, [dispatch, quizId])

    useEffect(() => {
        if (quiz) {
            setFormData({
                title: quiz.title,
                questions: quiz.questions || []
            });
        }
    }, [quiz]);
    console.log(quizId);

    const handleAddQuestion = () => {
        if (showAddQuestion) {
            // Cancel: remove the last added empty question
            setFormData((prev) => ({
                ...prev,
                questions: prev.questions.slice(0, -1),
            }));
        } else {
            // Add new question
            setFormData((prev) => ({
                ...prev,
                questions: [
                    ...prev.questions,
                    {
                        question: "",
                        optionA: "",
                        optionB: "",
                        optionC: "",
                        optionD: "",
                        correctAnswer: ""
                    }
                ]
            }));
        }
        setShowAddQuestion((prev) => !prev);
    };
    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updated = [...formData.questions];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, questions: updated }));
    };

    const handleSave = async () => {
        try {
            await dispatch(updateQuiz(jwt, quizId, formData));
            await dispatch(getProgramById(programId));
        } catch (err) {
            console.error('❌ Failed to update quiz:', err);
            alert('Failed to update quiz. See console for details.');
        }
        setShowAddQuestion((prev) => !prev);
    };
    return (
        <div className="border p-4 rounded mt-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Edit Quiz</h3>
            <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Quiz Title"
                className="border p-2 w-full mb-4"
            />

            <h4 className="font-medium">Questions</h4>
            {formData.questions.map((q, index) => (
                <div key={index} className="border p-3 mb-2 rounded">
                    <input
                        value={q.question}
                        onChange={(e) =>
                            handleQuestionChange(index, "question", e.target.value)
                        }
                        placeholder="Question text"
                        className="border p-2 w-full mb-2 bg-blue-200 text-black"
                    />
                    {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                        <input
                            key={opt}
                            value={q[opt]}
                            onChange={(e) =>
                                handleQuestionChange(index, opt, e.target.value)
                            }
                            placeholder={opt}
                            className="border p-2 w-full mb-1"
                        />
                    ))}
                    <input
                        value={q.correctAnswer}
                        onChange={(e) =>
                            handleQuestionChange(index, "correctAnswer", e.target.value)
                        }
                        placeholder="Correct Answer"
                        className="border p-2 w-full bg-green-200 text-black"
                    />
                </div>
            ))}
            <button
                onClick={handleAddQuestion}
                className={`px-4 py-2 rounded mr-3 text-white ${showAddQuestion ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
            >
                {showAddQuestion ? "❌ Cancel" : "➕ Add Question"}
            </button>

            <button
                onClick={() => handleSave()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Save Changes
            </button>
        </div>
    );
}

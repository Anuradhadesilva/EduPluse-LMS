import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addQuestion, getQuizById, updateQuiz } from '../../state/Quiz/Action';
import { getProgramById } from '../../state/Program/Action';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    TextField,
    Typography,
    Divider,
} from '@mui/material';
import { Save, X, Plus, Trash2, Edit3 } from 'lucide-react';

export const UpdateQuiz = ({ programId, onQuizUpdated, quizId, onCancel }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { selectedQuiz: quiz } = useSelector((store) => store.quiz);

    const [formData, setFormData] = useState({
        title: "",
        questions: []
    });

    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        if (quizId) {
            dispatch(getQuizById(quizId));
        }
    }, [dispatch, quizId]);

    useEffect(() => {
        if (quiz) {
            setFormData({
                title: quiz.title,
                questions: quiz.questions || []
            });
        }
    }, [quiz]);

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
        setFormData((prev) => {
            const updated = [...prev.questions];
            updated[index] = { ...updated[index], [field]: value }; // clone question object
            return { ...prev, questions: updated };
        });
    };

    const handleDeleteQuestion = (index) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index),
        }));
        setShowAddQuestion(false);
    };

    const handleSaveQuestion = async () => {
        if (editingIndex === null) return; // nothing to save

        for (let q of formData.questions) {
            const { question, optionA, optionB, optionC, optionD, correctAnswer } = q;
            if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
                alert("❌ Please fill in all fields for every question before saving.");
                return;
            }
        }

        try {
            await dispatch(updateQuiz(jwt, quizId, formData));
            alert("✅ Question saved successfully!");
            setEditingIndex(null); // ready to edit next question
        } catch (err) {
            console.error("❌ Failed to save question:", err);
            alert("Failed to save question. See console for details.");
        }
        setEditingIndex(null);
        setShowAddQuestion(false);
    };

    const handleSave = async () => {
        for (let q of formData.questions) {
            const { question, optionA, optionB, optionC, optionD, correctAnswer } = q;
            if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
                alert("❌ Please fill in all fields for every question before saving.");
                return;
            }
        }
        console.log(formData);
        try {
            const updatedQuiz = await dispatch(updateQuiz(jwt, quizId, formData));
            await dispatch(getProgramById(programId));
            if (updatedQuiz) {
                onQuizUpdated(updatedQuiz);
            }
        } catch (err) {
            console.error('❌ Failed to update quiz:', err);
            alert('Failed to update quiz. See console for details.');
        }
        setEditingIndex(null);
        setShowAddQuestion(false);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Typography variant="h6" gutterBottom>Edit Quiz</Typography>

            <TextField
                fullWidth
                label="Quiz Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
            />

            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Questions</Typography>

            {formData.questions.map((q, index) => (
                <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                        {editingIndex === index ? (
                            <div>
                                <TextField
                                    fullWidth
                                    label="Question"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                                    <TextField
                                        key={opt}
                                        fullWidth
                                        label={opt}
                                        value={q[opt]}
                                        onChange={(e) => handleQuestionChange(index, opt, e.target.value)}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                                <TextField
                                    fullWidth
                                    label="Correct Answer"
                                    value={q.correctAnswer}
                                    onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => setEditingIndex(null) && showAddQuestion(false)}
                                        variant="outlined"
                                        color="error"
                                        startIcon={<X size={16} />}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => handleSaveQuestion()}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Save size={16} />}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <div>
                                    <Typography variant="subtitle1">{q.question}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ✅ Correct Answer: {q.correctAnswer}
                                    </Typography>
                                </div>
                                <div>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => setEditingIndex(index)} color="primary">
                                            <Edit3 size={18} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDeleteQuestion(index)} color="error">
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Divider sx={{ my: 2 }} />
            <div className="flex gap-4">
                <Button
                    onClick={handleAddQuestion}
                    variant="contained"
                    color={showAddQuestion ? "error" : "primary"}
                    startIcon={showAddQuestion ? <X size={16} /> : <Plus size={16} />}
                >
                    {showAddQuestion ? "Cancel Add" : "Add New Question"}
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    startIcon={<Save size={16} />}
                >
                    Update Quiz
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        onCancel();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }
                    }
                    startIcon={<X size={16}
                    />}>
                    Cancel Edit

                </Button>
            </div>
        </div>
    );
};


// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getQuizById, updateQuiz } from '../../state/Quiz/Action';
// import { getProgramById } from '../../state/Program/Action';
// import { Button } from '@mui/material';
// import { Save, SaveIcon } from 'lucide-react';
// import { Cancel, Delete } from '@mui/icons-material';
// // import { Delete } from "@mui/icons-material"; // Material UI delete icon/

// export const UpdateQuiz = ({ programId, onQuizUpdated, quizId }) => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem("jwt");
//     const { selectedQuiz: quiz } = useSelector((store) => store.quiz);
//     const [formData, setFormData] = useState({
//         title: "",
//         questions: []
//     });

//     const [showAddQuestion, setShowAddQuestion] = useState(false);
//     const [editingIndex, setEditingIndex] = useState(null);
//     useEffect(() => {
//         if (quizId) {
//             dispatch(getQuizById(quizId));
//         }
//     }, [dispatch, quizId])

//     useEffect(() => {
//         if (quiz) {
//             setFormData({
//                 title: quiz.title,
//                 questions: quiz.questions || []
//             });
//         }
//     }, [quiz]);
//     console.log(quizId);

//     const handleAddQuestion = () => {

//         if (showAddQuestion) {
//             // Cancel: remove the last added empty question
//             setFormData((prev) => ({
//                 ...prev,
//                 questions: prev.questions.slice(0, -1),
//             }));
//         } else {
//             // Add new question
//             setFormData((prev) => ({
//                 ...prev,
//                 questions: [
//                     ...prev.questions,
//                     {
//                         question: "",
//                         optionA: "",
//                         optionB: "",
//                         optionC: "",
//                         optionD: "",
//                         correctAnswer: ""
//                     }
//                 ]
//             }));
//         }
//         setShowAddQuestion((prev) => !prev);
//     };
//     const handleInputChange = (e) => {
//         setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleQuestionChange = (index, field, value) => {
//         const updated = [...formData.questions];
//         updated[index][field] = value;
//         setFormData((prev) => ({ ...prev, questions: updated }));
//     };

//     const handleSave = async () => {
//         for (let q of formData.questions) {
//             const { question, optionA, optionB, optionC, optionD, correctAnswer } = q
//             if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
//                 alert("❌ Please fill in all fields for every question before saving.");
//                 return;
//             }
//         }
//         try {
//             const updatedQuiz = await dispatch(updateQuiz(jwt, quizId, formData));
//             await dispatch(getProgramById(programId));
//             if (updatedQuiz) {
//                 onQuizUpdated(updateQuiz)
//             }
//         } catch (err) {
//             console.error('❌ Failed to update quiz:', err);
//             alert('Failed to update quiz. See console for details.');
//         }
//         setEditingIndex(null);
//         setShowAddQuestion(false);
//     };
//     return (
//         <div className="border p-4 rounded mt-4 bg-gray-50">
//             <h3 className="text-lg font-semibold mb-3">Edit Quiz</h3>
//             <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 placeholder="Quiz Title"
//                 required
//                 className="border p-2 w-full mb-4"
//             />

//             <h4 className="font-medium">Questions</h4>


//             {formData.questions.map((q, index) => (
//                 <div
//                     key={index}
//                     className="border p-3 mb-2 rounded cursor-pointer relative"
//                 >
//                     {editingIndex === index ? (
//                         <div>
//                             <input
//                                 value={q.question}
//                                 onChange={(e) =>
//                                     handleQuestionChange(index, "question", e.target.value)
//                                 }
//                                 placeholder="Question text"
//                                 required
//                                 className="border p-2 w-full mb-2 bg-blue-200 text-black"
//                             />
//                             {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
//                                 <input
//                                     key={opt}
//                                     value={q[opt]}
//                                     onChange={(e) =>
//                                         handleQuestionChange(index, opt, e.target.value)
//                                     }
//                                     placeholder={opt}
//                                     required
//                                     className="border p-2 w-full mb-1"
//                                 />
//                             ))}
//                             <input
//                                 value={q.correctAnswer}
//                                 onChange={(e) =>
//                                     handleQuestionChange(index, "correctAnswer", e.target.value)
//                                 }
//                                 placeholder="Correct Answer"
//                                 required
//                                 className="border p-2 w-full bg-green-200 text-black"
//                             />
//                             <div className="flex justify-between items-center mt-2">
//                                 <Button
//                                     onClick={() => {
//                                         setFormData((prev) => ({
//                                             ...prev,
//                                             questions: prev.questions.filter((_, i) => i !== index),
//                                         }));
//                                         setEditingIndex(null);
//                                     }}
//                                     variant="outlined"
//                                     color="error"
//                                     startIcon={<Delete />}
//                                 >
//                                     Delete
//                                 </Button>
//                                 <Button
//                                     onClick={handleSave}
//                                     variant="contained"
//                                     color="primary"
//                                 >
//                                     Save
//                                 </Button>
//                             </div>
//                         </div>
//                     ) : (
//                         // Read-only mode
//                         <div className="flex justify-between items-center">
//                             <div onClick={() => setEditingIndex(index)}>
//                                 <p className="font-semibold">{q.question}</p>
//                                 <p className="text-sm text-gray-600">✅ {q.correctAnswer}</p>
//                             </div>
//                             <Button
//                                 onClick={() =>
//                                     setFormData((prev) => ({
//                                         ...prev,
//                                         questions: prev.questions.filter((_, i) => i !== index),
//                                     }))
//                                 }
//                                 variant="outlined"
//                                 color="error"
//                                 startIcon={<Delete />}
//                             >
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//             ))}

//             <div className="flex gap-4 pt-4 border-t">
//                 <Button
//                     onClick={handleAddQuestion}
//                     variant="contained"
//                     color={showAddQuestion ? "error" : "primary"}
//                     sx={{
//                         mr: 1.5,
//                         px: 4,
//                         py: 1.5,
//                         textTransform: "none",
//                     }}
//                     startIcon={showAddQuestion ? <Cancel /> : <Save size={16} />}
//                 >
//                     {showAddQuestion ? " Cancel" : "Add new question"}
//                 </Button>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleSave()}
//                     startIcon={<Save size={16} />}>
//                     Update Quiz
//                 </Button>
//             </div>
//         </div>

//         // <div className="flex gap-4 pt-4 border-t">
//         //     <Button variant="contained" color="primary" onClick={handleSave} startIcon={<Save size={16} />}>Save All Changes</Button>
//         //     <Button variant="text" onClick={onCancel} startIcon={<X size={16} />}>Cancel</Button>
//         // </div>
//     );
// }

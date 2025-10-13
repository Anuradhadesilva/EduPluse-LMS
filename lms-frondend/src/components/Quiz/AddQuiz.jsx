import React, { useState, useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createQuiz } from '../../state/Quiz/Action';
import quizData from '../../constants/quizData';
import { getProgramById } from '../../state/Program/Action';
import { Button, TextField, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Plus } from 'lucide-react';

export const AddQuiz = ({ programId, programTitle, onQuizCreated, onCancel }) => {
    const disptach = useDispatch();
    const jwt = localStorage.getItem("jwt");
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
        if (!quizTitle || questions.length === 0) {
            alert("Please provide a title and at least one question.");
            return;
        }
        const newQuiz = {
            title: quizTitle,
            programId: programId,
            questions,
        };

        try {
            const createdQuiz = await disptach(createQuiz(jwt, newQuiz));
            await disptach(getProgramById(programId));
            if (createdQuiz) {
                onQuizCreated(createdQuiz); // Pass the new quiz back to the parent
            }
            setQuizTitle('');
            setQuestions([]);
            console.log(programId);
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
        <Paper className="p-6 mt-4 border-t" elevation={0}>
            <Typography
                variant="h6"
                className="font-semibold mb-4">Create New Quiz
            </Typography>
            <div className="space-y-4">
                <TextField
                    label="Quiz Title"
                    fullWidth
                    value={quizTitle}
                    onChange={e => setQuizTitle(e.target.value)}
                />

                <Paper variant="outlined" className="p-4 space-y-3">
                    <Typography>Add a New Question</Typography>
                    <TextField
                        label="Question Text"
                        size="small"
                        fullWidth value={currentQ.question}
                        onChange={e => setCurrentQ({ ...currentQ, question: e.target.value })} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 ">
                        <TextField
                            label="Option A"
                            size="small"
                            value={currentQ.optionA}
                            onChange={e => setCurrentQ({ ...currentQ, optionA: e.target.value })}
                        />
                        <TextField
                            label="Option B"
                            size="small"
                            value={currentQ.optionB}
                            onChange={e => setCurrentQ({ ...currentQ, optionB: e.target.value })}
                        />
                        <TextField
                            label="Option C"
                            size="small"
                            value={currentQ.optionC}
                            onChange={e => setCurrentQ({ ...currentQ, optionC: e.target.value })}
                        />
                        <TextField
                            label="Option D"
                            size="small"
                            value={currentQ.optionD}
                            onChange={e => setCurrentQ({ ...currentQ, optionD: e.target.value })}
                        />
                    </div>
                    <TextField
                        label="Correct Answer"
                        size="small"
                        fullWidth value={currentQ.correctAnswer}
                        onChange={e => setCurrentQ({ ...currentQ, correctAnswer: e.target.value })}
                        helperText="The text of the correct option (e.g., the text from Option A)."
                    />
                    <Button
                        onClick={handleAddQuestion}
                        variant="contained"
                        startIcon={<Plus size={16} />}>
                        Add Question to List
                    </Button>
                </Paper>

                {questions.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Question </TableCell>
                                    <TableCell>Correct Answer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{questions.map((q, i) => (<TableRow key={q.id}><TableCell>{i + 1}</TableCell>
                                <TableCell>{q.question}</TableCell>
                                <TableCell>{q.correctAnswer}</TableCell>
                            </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <div className="flex gap-4">
                    <Button variant="contained"
                        color="primary"
                        onClick={handleCreateQuiz}
                        disabled={!quizTitle || questions.length === 0}>
                        Save Quiz
                    </Button>
                    <Button
                        variant="text"
                        onClick={onCancel}>Cancel
                    </Button>
                </div>
            </div>
        </Paper>
    );
};
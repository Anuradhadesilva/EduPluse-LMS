import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Typography, Divider, Box } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';

const SubmissionInspectorModal = ({ submission, open, handleClose }) => {
    if (!submission) return null;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Submission Details</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{submission.user.fullName}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{submission.quiz.title}</Typography>
                <Typography variant="h5" className="font-bold my-2">Final Score: {submission.score} / {submission.answers.length}</Typography>
                <Divider className="my-4" />
                <List>
                    {submission.answers.map(answer => {
                        const isCorrect = answer.selectedAnswer.toLowerCase() === answer.question.correctAnswer.toLowerCase();
                        return (
                            <ListItem key={answer.id} className="flex flex-col items-start">
                                <ListItemText
                                    primary={answer.question.question}
                                    secondary={`Your Answer: ${answer.selectedAnswer}`}
                                />
                                {isCorrect ? (
                                    <Box className="flex items-center text-green-600"><CheckCircle size={16} className="mr-1" /> Correct</Box>
                                ) : (
                                    <Box className="flex items-center text-red-600"><XCircle size={16} className="mr-1" /> Correct Answer: {answer.question.correctAnswer}</Box>
                                )}
                                <Divider style={{ width: '100%', marginTop: '10px' }} />
                            </ListItem>
                        )
                    })}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default SubmissionInspectorModal;
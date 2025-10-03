import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

import { getStudentsByProgram } from '../../state/Program/Action';
import { getSubmissionsByProgramId, getSubmissionsDetailsByProgramId } from '../../state/Quiz/Action';
import SubmissionInspectorModal from './SubmissionInspectorModal';

const ProgramDetailsModal = ({ program, open, handleClose }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [tab, setTab] = useState(0);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { enrollStudents } = useSelector(state => state.program);
    const { programSubmissions } = useSelector(state => state.quiz);


    const enrolledStudents = enrollStudents[program.id] || [];
    // const submissions = programSubmissions.filter(s => s.quiz.program.id === program.id);

    useEffect(() => {
        if (open) {
            dispatch(getStudentsByProgram(jwt, program.id));
            dispatch(getSubmissionsDetailsByProgramId(program.id));
        }
    }, [dispatch, program.id, open]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    console.log(programSubmissions);

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{program.title} - Details</DialogTitle>
                <DialogContent>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={handleTabChange}>
                            <Tab label={`Enrolled Students (${enrollStudents.length})`} />
                            <Tab label={`Quiz Submissions (${programSubmissions.length})`} />
                        </Tabs>
                    </Box>
                    {/* Students Tab */}
                    {tab === 0 && (
                        <List>{enrollStudents.map(student => (
                            <ListItem key={student.id}><ListItemText primary={student.fullName} secondary={student.email} /></ListItem>
                        ))}</List>
                    )}
                    {/* Submissions Tab */}
                    {tab === 1 && (
                        <List>{programSubmissions.map(sub => (
                            <ListItem key={sub.id} secondaryAction={
                                <Button edge="end" onClick={() => setSelectedSubmission(sub)}>View Answers</Button>
                            }><ListItemText primary={`${sub.user.fullName} - ${sub.quiz.title}`} secondary={`Score: ${sub.score}`} /></ListItem>
                        ))}</List>
                    )}
                </DialogContent>
            </Dialog>
            {selectedSubmission && (
                <SubmissionInspectorModal
                    submission={selectedSubmission}
                    open={!!selectedSubmission}
                    handleClose={() => setSelectedSubmission(null)}
                />
            )}
        </>
    );
};

export default ProgramDetailsModal;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, Chip, Typography, Dialog,
    DialogTitle, DialogContent, Tabs, Tab, Box, List, ListItem,
    ListItemText, Divider,
    Card,
    CardContent
} from "@mui/material";
import {
    BarChart, Bar, CartesianGrid, XAxis, YAxis,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Users, BookOpen, CheckCircle, XCircle } from "lucide-react";

import { getAllPrograms, getStudentsByProgram } from "../../state/Program/Action";
import { getAllStudents } from "../../state/Authentication/Action";
import { getSubmissionsDetailsByProgramId } from "../../state/Quiz/Action";
import { PreLoader } from "../../components/Loaders/Loader";


// =================== SUBMISSION MODAL ===================
const SubmissionInspectorModal = ({ submission, open, handleClose }) => {
    if (!submission) return null;

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle className="bg-blue-700 text-white font-bold">
                Submission Details
            </DialogTitle>
            <DialogContent className="space-y-2 mt-2">
                <Box className="flex items-center gap-2">
                    <Box className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow">
                        {getInitials(submission.user.fullName)}
                    </Box>
                    <Box>
                        <Typography variant="h6" className="font-semibold">
                            {submission.user.fullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {submission.quiz.title}
                        </Typography>
                    </Box>
                </Box>
                <Box className="p-2 bg-gray-100 rounded-lg">
                    <Typography variant="h7" className="font-bold text-blue-700">
                        Final Score: {submission.score} / {submission.answers.length}
                    </Typography>
                </Box>

                <Divider />

                <List className="space-y-3">
                    {submission.answers.map(answer => {
                        const isCorrect =
                            answer.selectedAnswer.toLowerCase() ===
                            answer.question.correctAnswer.toLowerCase();

                        return (
                            <Box
                                key={answer.id}
                                className={`p-3 rounded-lg shadow-sm ${isCorrect ? "bg-green-50" : "bg-red-50"
                                    }`}
                            >
                                <Typography className="font-medium mb-1">
                                    {answer.question.question}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className="mb-2"
                                >
                                    Your Answer:{" "}
                                    <span
                                        className={isCorrect ? "text-green-600" : "text-red-600"}
                                    >
                                        {answer.selectedAnswer}
                                    </span>
                                </Typography>
                                {isCorrect ? (
                                    <Box className="flex items-center text-green-600 font-medium">
                                        <CheckCircle size={16} className="mr-1" /> Correct
                                    </Box>
                                ) : (
                                    <Box className="flex items-center text-red-600 font-medium">
                                        <XCircle size={16} className="mr-1" /> Correct Answer:{" "}
                                        {answer.question.correctAnswer}
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </List>
            </DialogContent>
        </Dialog>
    );
};

// =================== PROGRAM DETAILS MODAL ===================
const ProgramDetailsModal = ({ program, open, handleClose }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [tab, setTab] = useState(0);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { enrollStudents } = useSelector(state => state.program);
    const { programSubmissions } = useSelector(state => state.quiz);

    const enrolledStudents = enrollStudents || [];

    useEffect(() => {
        if (open && program) {
            dispatch(getStudentsByProgram(jwt, program.id));
            dispatch(getSubmissionsDetailsByProgramId(program.id));
        }
    }, [dispatch, program, open]);

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold">
                    {program?.title} - Details
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary">
                            <Tab label={`Enrolled Students (${enrolledStudents.length})`} />
                            <Tab label={`Quiz Submissions (${programSubmissions.length})`} />
                        </Tabs>
                    </Box>

                    {/* Students Tab */}
                    {tab === 0 && (
                        <List className="space-y-2 mt-3">
                            {enrolledStudents.map(student => (
                                <ListItem
                                    key={student.id}
                                    className="rounded-lg shadow-sm border p-2 hover:bg-gray-50"
                                >
                                    <ListItemText
                                        primary={
                                            <span className="font-semibold">{student.fullName}</span>
                                        }
                                        secondary={
                                            <Chip
                                                label={student.email}
                                                variant="outlined"
                                                size="small"
                                            />
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {/* Submissions Tab */}
                    {tab === 1 && (
                        <List className="space-y-2 mt-3">
                            {programSubmissions.map(sub => (
                                <ListItem
                                    key={sub.id}
                                    className="rounded-lg shadow-sm border p-2 hover:bg-gray-50"
                                    secondaryAction={
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => setSelectedSubmission(sub)}
                                        >
                                            View Answers
                                        </Button>
                                    }
                                >
                                    <ListItemText
                                        primary={`${sub.user.fullName} - ${sub.quiz.title}`}
                                        secondary={
                                            <Chip
                                                label={`Score: ${sub.score}`}
                                                color="success"
                                                size="small"
                                            />
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
            </Dialog>

            {/* Nested Submission Modal */}
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

// =================== MAIN DASHBOARD ===================
const AdminDashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { programs, enrollStudents, loading: programsLoading } = useSelector(state => state.program);
    const { programSubmissions, isLoading: submissionsLoading } = useSelector(state => state.quiz);
    const { students, isLoading: studentsLoading } = useSelector(state => state.auth);

    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        dispatch(getAllPrograms());
        dispatch(getAllStudents(jwt));
    }, [dispatch, jwt]);

    useEffect(() => {
        if (programs.length > 0) {
            programs.forEach(program => {
                dispatch(getSubmissionsDetailsByProgramId(program.id));
            });
        }
    }, [programs, dispatch]);

    const dashboardStats = useMemo(() => {
        const activePrograms = programs.filter(p => p.status === "PUBLISHED").length;
        const topPrograms = [...programs]
            .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
            .slice(0, 5)
            .map(p => ({ name: p.title, value: p.enrollmentCount }));
        return { activePrograms, topPrograms };
    }, [programs]);

    const enrollmentTrendsData = [
        { name: "Jan", enrollments: 30 }, { name: "Feb", enrollments: 45 },
        { name: "Mar", enrollments: 60 }, { name: "Apr", enrollments: 50 },
        { name: "May", enrollments: 70 }, { name: "Jun", enrollments: 90 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    if (programsLoading || studentsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PreLoader />
            </div>
        );
    }

    return (
        <div className="space-y-12 p-6">
            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg">
                    <CardContent className="p-6 bg-red-600 text-white">
                        <Users size={32} />
                        <Typography variant="h3" className="font-bold mt-4">{students.length}</Typography>
                        <Typography>Total Students</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardContent className="p-6 bg-yellow-600 text-white ">
                        <BookOpen size={32} />
                        <Typography variant="h3" className="font-bold mt-4">{programs.length}</Typography>
                        <Typography>Total Programs</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardContent className="p-6 bg-purple-600 text-white">
                        <CheckCircle size={32} />
                        <Typography variant="h3" className="font-bold mt-4">{programSubmissions.length}</Typography>
                        <Typography>Quiz Submissions</Typography>
                    </CardContent>
                </Card>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <Paper className="p-6 shadow-md rounded-lg xl:col-span-2">
                    <Typography variant="h5" className="font-bold mb-4">Enrollment Trends (Last 6 Months)</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={enrollmentTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" /><YAxis />
                            <Tooltip />
                            <Bar dataKey="enrollments" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
                <Paper className="p-6 shadow-md rounded-lg">
                    <Typography variant="h5" className="font-bold mb-4">Top 5 Programs (Students)</Typography>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={dashboardStats.topPrograms} dataKey="value" nameKey="name"
                                cx="50%" cy="50%" outerRadius={80} label>
                                {dashboardStats.topPrograms.map((entry, index) =>
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                )}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </div>

            {/* PROGRAM PERFORMANCE TABLE */}
            <Paper className="p-6 shadow-md rounded-lg">
                <Typography variant="h4" className="mb-4 font-bold">Program Performance</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Program Title</TableCell>
                                <TableCell align="center">Enrolled Students</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {programs.map((program) => (
                                <TableRow key={program.id}>
                                    <TableCell>{program.title}</TableCell>
                                    <TableCell align="center">{program.enrollmentCount || 0}</TableCell>
                                    <TableCell align="center">
                                        <Chip label={program.status} color={program.status === "PUBLISHED" ? "success" : "warning"} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" onClick={() => setSelectedProgram(program)}>View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* MODALS */}
            {selectedProgram && (
                <ProgramDetailsModal
                    program={selectedProgram}
                    open={!!selectedProgram}
                    handleClose={() => setSelectedProgram(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;

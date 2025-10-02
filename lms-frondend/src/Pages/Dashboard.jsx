import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPrograms, getEnrolledPrograms, getStudentsByProgram } from '../state/Program/Action';
import { getSubmissionsDetailsByProgramId, getUserSubmissions } from '../state/Quiz/Action';
import { Paper, Typography, Button, CircularProgress, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BookOpen, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { PreLoader } from '../components/Loaders/Loader';
import { getAllStudents } from '../state/Authentication/Action';
import { at } from 'lodash';

// --- Student Dashboard Component ---
const StudentDashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const { user } = useSelector(state => state.auth);
    const { enrolled, isLoading: programsLoading } = useSelector(state => state.program);
    const { submissions, isLoading: submissionsLoading } = useSelector(state => state.quiz);

    useEffect(() => {
        if (jwt && user?.id) {
            dispatch(getEnrolledPrograms(jwt));
            dispatch(getUserSubmissions(user.id));
        }
    }, [dispatch, jwt, user?.id]);

    const averageScore = submissions.length > 0
        ? (submissions.reduce((acc, sub) => acc + (sub.score / sub.answers.length) * 100, 0) / submissions.length).toFixed(1)
        : 0;

    const latestEnrollment = enrolled.length > 0 ? enrolled[enrolled.length - 1] : null;

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="flex flex-col items-start p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                        <BookOpen size={32} />
                        <Typography variant="h3" className="font-bold mt-4">{enrolled.length}</Typography>
                        <Typography>Enrolled Programs</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="flex flex-col items-start p-6 bg-gradient-to-br from-green-500 to-green-700 text-white">
                        <CheckCircle size={32} />
                        <Typography variant="h3" className="font-bold mt-4">{submissions.length}</Typography>
                        <Typography>Quizzes Attempted</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="flex flex-col items-start p-6 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
                        <Users size={32} />
                        <Typography variant="h3" className="font-bold mt-4">{averageScore}%</Typography>
                        <Typography>Average Score</Typography>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Continue Learning */}
                <Paper className="p-6 shadow-md rounded-lg">
                    <Typography variant="h5" className="font-bold mb-4">Continue Learning</Typography>
                    {programsLoading ? <CircularProgress /> : latestEnrollment ? (
                        <div className="p-4 border rounded-md bg-sky-50">
                            <Typography variant="h6" className="font-semibold">{latestEnrollment.program.title}</Typography>
                            <Typography variant="body2" className="text-gray-600 mb-4">{latestEnrollment.program.category}</Typography>
                            <Button component={Link} to={`/programs/${latestEnrollment.program.id}`} variant="contained" endIcon={<ArrowRight />}>
                                Go to Program
                            </Button>
                        </div>
                    ) : (
                        <Typography className="text-gray-500">You are not enrolled in any programs yet. <Link to="/programs" className="text-blue-600 hover:underline">Explore programs</Link>.</Typography>
                    )}
                </Paper>

                {/* Recent Activity */}
                <Paper className="p-6 shadow-md rounded-lg">
                    <Typography variant="h5" className="font-bold mb-4">Recent Quiz Activity</Typography>
                    {submissionsLoading ? <CircularProgress /> : submissions.length > 0 ? (
                        <ul className="space-y-3">
                            {submissions.slice(-3).reverse().map(sub => (
                                <li key={sub.id} className="flex items-center justify-between p-3 border rounded-md">
                                    <div>
                                        <p className="font-semibold">{sub.quiz.title}</p>
                                        <p className="text-sm text-gray-500">Score: {sub.score} / {sub.answers.length}</p>
                                    </div>
                                    <Button component={Link} to={`/quiz/${sub.quiz.id}`} variant="outlined" size="small">Review</Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography className="text-gray-500">No recent quiz submissions.</Typography>
                    )}
                </Paper>
            </div>
        </div>
    );
};

// --- Admin Dashboard Component ---
const AdminDashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { programs, enrollStudents, loading: programsLoading } = useSelector(state => state.program);
    const { programSubmissions, isLoading: submissionsLoading } = useSelector(state => state.quiz);
    const { students, isLoading: studentsloading } = useSelector(state => state.auth);

    // We will assume you have a way to get all students, for now, we'll use a placeholder
    // In a real app, you would create a Redux action to fetch all students
    const totalStudents = 125; // Placeholder

    // Fetch programs, and then fetch submissions for each program
    useEffect(() => {
        dispatch(getAllPrograms());
        dispatch(getAllStudents(jwt));
    }, [dispatch, jwt]);

    console.log(students)
    useEffect(() => {
        // Once programs are loaded, fetch submissions for each one
        if (programs.length > 0) {
            programs.forEach(program => {
                dispatch(getSubmissionsDetailsByProgramId(program.id));
            });
        }
    }, [programs, dispatch]);


    console.log(programs);
    const dashboardStats = useMemo(() => {
        const activePrograms = programs.filter(p => p.status === 'PUBLISHED').length
        const topPrograms = [...programs]
            .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
            .slice(0, 5);
        return { activePrograms, topPrograms };
    }, [programs])
    // Memoize chart data calculation to prevent re-rendering
    const chartData = useMemo(() => {
        const months = Array(6).fill(0).map((_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            return {
                name: d.toLocaleString('default', { month: 'short' }),
                submissions: 0,
                year: d.getFullYear(),
                month: d.getMonth()
            };
        }).reverse();

        programSubmissions.forEach(submission => {
            const submissionDate = new Date(submission.submittedAt);
            const submissionMonth = submissionDate.getMonth();
            const submissionYear = submissionDate.getFullYear();

            const monthData = months.find(m => m.month === submissionMonth && m.year === submissionYear);
            if (monthData) {
                monthData.submissions++;
            }
        });

        return months;
    }, [programSubmissions]);

    if (programsLoading || submissionsLoading || studentsloading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PreLoader />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg">
                    <CardContent className="p-6 bg-red-600 text-white">
                        <Users size={32} />
                        <Typography variant="h3" className="font-bold mt-4">
                            {students.length}
                        </Typography>
                        <Typography>Total Students</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardContent className="p-6 bg-yellow-600 text-white">
                        <BookOpen size={32} />
                        <Typography variant="h3" className="font-bold mt-4">
                            {programs.length}
                        </Typography>
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Platform Analytics Chart */}
                <Paper className="p-6 shadow-md rounded-lg xl:col-span-2">
                    <Typography
                        variant="h5"
                        className="font-bold mb-4">Quiz Submissions (Last 6 Months)</Typography>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="submissions" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>

                {/* Quick Actions */}
                <Paper className="p-6 shadow-md rounded-lg">
                    <Typography variant="h5" className="font-bold mb-4">Quick Actions</Typography>
                    <div className="flex flex-row gap-2">
                        <Button
                            component={Link}
                            to="/programs"
                            variant="contained"
                            fullWidth
                        >
                            Manage Programs
                        </Button>
                        <Button
                            component={Link}
                            to="/program/create"
                            variant="outlined"
                            fullWidth
                        >
                            Create New Program
                        </Button>
                    </div>
                </Paper>
            </div>
        </div>
    );
};



// --- Main Dashboard Controller ---
export const Dashboard = () => {
    const role = localStorage.getItem("role")
    const { user } = useSelector((state) => state.auth);

    console.log(role)
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }


    const isAdmin = role === 'ROLE_ADMIN';

    return (
        <div className="w-full min-h-screen bg-gray-100 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                    <Typography variant="h4" component="h1" className="font-bold">Welcome back, {user.fullName}!</Typography>
                    <Typography color="text.secondary">
                        {isAdmin ? "Here's an overview of your learning platform." : "Here's a summary of your learning progress."}
                    </Typography>
                </div>

                {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
};

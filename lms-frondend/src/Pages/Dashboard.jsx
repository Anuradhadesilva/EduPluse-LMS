import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPrograms, getEnrolledPrograms, getStudentsByProgram } from '../state/Program/Action';
import { getSubmissionsDetailsByProgramId, getUserSubmissions } from '../state/Quiz/Action';
import { Paper, Typography, Button, CircularProgress, Card, CardContent, TableContainer, TableHead, TableRow, TableCell, TableBody, Chip, Collapse } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, CheckCircle, Users, ArrowRight, Grid, Table, ChevronUp, ChevronDown, TrendingUp, Clock } from 'lucide-react';
import { PreLoader } from '../components/Loaders/Loader';
import { getAllStudents } from '../state/Authentication/Action';
import { at } from 'lodash';
import AdminDashboard from './AdminDashboardHepler/AdminDashboard';

// --- Student Dashboard Component ---
const DashboardSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton variant="rectangular" width="100%" height={128} className="rounded-xl" />
            <Skeleton variant="rectangular" width="100%" height={128} className="rounded-xl" />
            <Skeleton variant="rectangular" width="100%" height={128} className="rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-4">
                <Skeleton variant="text" width="40%" height={40} />
                <Skeleton variant="rectangular" width="100%" height={80} className="rounded-lg" />
                <Skeleton variant="rectangular" width="100%" height={80} className="rounded-lg" />
            </div>
            <div className="lg:col-span-2 space-y-4">
                <Skeleton variant="text" width="40%" height={40} />
                <Skeleton variant="rectangular" width="100%" height={180} className="rounded-lg" />
            </div>
        </div>
    </div>
);


const StudentDashboard = () => {
    const { user } = useSelector(state => state.auth);
    const { enrolled, isLoading: programsLoading } = useSelector(state => state.program);
    const { submissions, isLoading: submissionsLoading } = useSelector(state => state.quiz);

    const { averageScore, recentEnrollments } = useMemo(() => {
        const avg = submissions.length > 0
            ? (submissions.reduce((acc, sub) => acc + (sub.score / sub.answers.length) * 100, 0) / submissions.length).toFixed(0)
            : 0;
        const recents = [...enrolled]
            .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
            .slice(0, 3);
        return { averageScore: avg, recentEnrollments: recents };
    }, [submissions, enrolled]);

    if (programsLoading || submissionsLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="space-y-8">

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <Typography className="font-bold text-gray-600">Enrolled Programs</Typography>
                            <BookOpen className="text-blue-500" />
                        </div>
                        <Typography variant="h3" className="font-bold mt-2">{enrolled.length}</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <Typography className="font-bold text-gray-600">Quizzes Attempted</Typography>
                            <CheckCircle className="text-green-500" />
                        </div>
                        <Typography variant="h3" className="font-bold mt-2">{submissions.length}</Typography>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <Typography className="font-bold text-gray-600">Average Score</Typography>
                            <TrendingUp className="text-indigo-500" />
                        </div>
                        <Typography variant="h3" className="font-bold mt-2">{averageScore}%</Typography>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* My Recent Programs */}
                <Paper className="p-6 shadow-md rounded-lg lg:col-span-3">
                    <Typography variant="h5" className="font-bold mb-4">My Recent Programs</Typography>
                    {recentEnrollments.length > 0 ? (
                        <div className="space-y-4">
                            {recentEnrollments.map(({ program }) => (
                                <Paper key={program.id} variant="outlined" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div>
                                        <Typography variant="h6" className="font-semibold">{program.title}</Typography>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <Chip label={program.category} size="small" />
                                            <span className="flex items-center gap-1"><Clock size={14} />{program.duration || 'Self-paced'}</span>
                                        </div>
                                    </div>
                                    <Button component={Link} to={`/programs/${program.id}`} variant="contained" endIcon={<ArrowRight />}>
                                        Continue
                                    </Button>
                                </Paper>
                            ))}
                        </div>
                    ) : (
                        <Typography className="text-gray-500">You are not enrolled in any programs yet. <Link to="/programs" className="text-blue-600 hover:underline">Explore programs</Link>.</Typography>
                    )}
                </Paper>

                {/* Recent Quiz Activity */}
                <Paper className="p-6 shadow-md rounded-lg lg:col-span-2">
                    <Typography variant="h5" className="font-bold mb-4">Recent Quiz Activity</Typography>
                    {submissions.length > 0 ? (
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


// const AdminDashboard = () => {
//     const dispatch = useDispatch();
//     const [expandedRowId, setExpandedRowId] = useState(null);
//     const jwt = localStorage.getItem("jwt");
//     // Select all necessary data from the Redux store
//     const { programs, isloading: programsLoading } = useSelector(state => state.program);
//     const { students, isloading: studentsLoading } = useSelector(state => state.auth);
//     const { programSubmissions, loading: submissionsLoading } = useSelector(state => state.quiz);

//     // Fetch initial data
//     useEffect(() => {
//         dispatch(getAllPrograms());
//         dispatch(getAllStudents(jwt));
//     }, [dispatch, jwt]);
//     console.log(students);
//     // Fetch submissions for each program once programs are loaded
//     useEffect(() => {
//         if (programs.length > 0) {
//             programs.forEach(program => {
//                 // To avoid re-fetching, you might add a check here if data already exists
//                 dispatch(getSubmissionsDetailsByProgramId(program.id));
//             });
//         }
//     }, [programs, dispatch]);

//     console.log(programSubmissions);
//     const handleRowClick = (programId) => {
//         setExpandedRowId(expandedRowId === programId ? null : programId);
//     };

//     // Memoize calculations for performance
//     const dashboardStats = useMemo(() => {
//         const activePrograms = programs.filter(p => p.status === 'PUBLISHED').length;
//         const topPrograms = [...programs]
//             .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
//             .slice(0, 5)
//             .map(p => ({ name: p.title, value: p.enrollmentCount || 0 }));
//         return { activePrograms, topPrograms, totalSubmissions: programSubmissions.length };
//     }, [programs, programSubmissions]);

//     console.log(dashboardStats.topPrograms)

//     const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899'];

//     if (programsLoading || studentsLoading) {
//         return <div className="flex justify-center items-center h-screen"><PreLoader /></div>;
//     }

//     return (
//         <Grid container spacing={4}>
//             {/* ----- Right Column: Stats & Charts ----- */}
//             <Grid item xs={12} lg={4}>
//                 <div className="space-y-6">
//                     <Card className="shadow-lg">
//                         <CardContent className="p-6 bg-red-600 text-white">
//                             <Users size={32} />
//                             <Typography variant="h3" className="font-bold mt-4">{students.length}</Typography>
//                             <Typography>Total Students</Typography>
//                         </CardContent>
//                     </Card>
//                     <Card className="shadow-lg">
//                         <CardContent className="p-6 bg-yellow-600 text-white">
//                             <BookOpen size={32} />
//                             <Typography
//                                 variant="h3"
//                                 className="font-bold mt-4">{dashboardStats.activePrograms}
//                             </Typography>
//                             <Typography>Active Programs</Typography></CardContent></Card>
//                     <Card className="shadow-lg">
//                         <CardContent
//                             className="p-6 bg-purple-600 text-white">
//                             <CheckCircle size={32} />
//                             <Typography
//                                 variant="h3"
//                                 className="font-bold mt-4">{dashboardStats.totalSubmissions}
//                             </Typography>
//                             <Typography>Total Quiz Submissions</Typography>
//                         </CardContent>
//                     </Card>

//                     <Paper className="p-4 shadow-md rounded-lg">
//                         <Typography variant="h6" className="font-bold mb-2">Top Programs by Enrollment</Typography>
//                         <ResponsiveContainer width="100%" height={250}>
//                             <PieChart>
//                                 <Pie data={dashboardStats.topPrograms} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
//                                     {dashboardStats.topPrograms.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                                 </Pie>
//                                 <Tooltip />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </Paper>
//                 </div>
//             </Grid>

//             {/* ----- Left Column: Program Performance Table ----- */}
//             <Grid item xs={12} lg={8}>
//                 <Paper className="p-4 shadow-md rounded-lg">
//                     <Typography variant="h4" className="mb-4 font-bold">Program Performance</Typography>
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell />
//                                     <TableCell>Program Title</TableCell>
//                                     <TableCell align="center">Enrolled Students</TableCell>
//                                     <TableCell align="center">Status</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {programs.map((program) => (
//                                     <React.Fragment key={program.id}>
//                                         <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
//                                             <TableCell>
//                                                 <Button size="small" onClick={() => handleRowClick(program.id)}>
//                                                     {expandedRowId === program.id ? <ChevronUp /> : <ChevronDown />}
//                                                 </Button>
//                                             </TableCell>
//                                             <TableCell component="th" scope="row">{program.title}</TableCell>
//                                             <TableCell align="center">{program.enrollmentCount || 0}</TableCell>
//                                             <TableCell align="center">
//                                                 <Chip label={program.status} color={program.status === 'PUBLISHED' ? 'success' : 'warning'} size="small" />
//                                             </TableCell>
//                                         </TableRow>
//                                         <TableRow>
//                                             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
//                                                 <Collapse in={expandedRowId === program.id} timeout="auto" unmountOnExit>
//                                                     {/* <ProgramExpansionPanel
//                                                         program={program}
//                                                         students={enrolledStudents[program.id]}
//                                                         submissions={programSubmissions[program.id]}
//                                                         loading={submissionsLoading && expandedRowId === program.id}
//                                                     /> */}
//                                                 </Collapse>
//                                             </TableCell>
//                                         </TableRow>
//                                     </React.Fragment>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>
//             </Grid>
//         </Grid>
//     );
// };

// const ProgramExpansionPanel = ({ program, submissions, students }) => {
//     const [tab, setTab] = useState(0);
//     const [selectedSubmission, setSelectedSubmission] = useState(null);

//     const handleTabChange = (event, newValue) => {
//         setTab(newValue);
//     };

//     return (
//         <Box sx={{ margin: 1, padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
//             <Typography variant="h6" gutterBottom component="div">
//                 {program.title} - Details
//             </Typography>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={tab} onChange={handleTabChange}>
//                     <Tab label={`Enrolled Students (${students.length})`} />
//                     <Tab label={`Quiz Submissions (${submissions.length})`} />
//                 </Tabs>
//             </Box>
//             {/* Students Tab */}
//             {tab === 0 && (
//                 <List dense>{students.map(student => (
//                     <ListItem key={student.id}><ListItemText primary={student.fullName} secondary={student.email} /></ListItem>
//                 ))}</List>
//             )}
//             {/* Submissions Tab */}
//             {tab === 1 && (
//                 <List dense>{submissions.map(sub => (
//                     <ListItem key={sub.id} secondaryAction={
//                         <Button size="small" edge="end" onClick={() => setSelectedSubmission(sub)}>View Answers</Button>
//                     }><ListItemText primary={`${sub.user.fullName} - ${sub.quiz.title}`} secondary={`Score: ${sub.score}`} /></ListItem>
//                 ))}</List>
//             )}
//             {selectedSubmission && (
//                 <SubmissionInspectorModal
//                     submission={selectedSubmission}
//                     open={!!selectedSubmission}
//                     handleClose={() => setSelectedSubmission(null)}
//                 />
//             )}
//         </Box>
//     );
// };


// --- Admin Dashboard Component ---

// const AdminDashboard = () => {
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem("jwt");
//     const { programs, enrollStudents, loading: programsLoading } = useSelector(state => state.program);
//     const { programSubmissions, isLoading: submissionsLoading } = useSelector(state => state.quiz);
//     const { students, isLoading: studentsloading } = useSelector(state => state.auth);

//     // We will assume you have a way to get all students, for now, we'll use a placeholder
//     // In a real app, you would create a Redux action to fetch all students
//     const totalStudents = 125; // Placeholder

//     // Fetch programs, and then fetch submissions for each program
//     useEffect(() => {
//         dispatch(getAllPrograms());
//         dispatch(getAllStudents(jwt));
//     }, [dispatch, jwt]);

//     console.log(students)
//     useEffect(() => {
//         // Once programs are loaded, fetch submissions for each one
//         if (programs.length > 0) {
//             programs.forEach(program => {
//                 dispatch(getSubmissionsDetailsByProgramId(program.id));
//             });
//         }
//     }, [programs, dispatch]);


//     console.log(programs);
//     const dashboardStats = useMemo(() => {
//         const activePrograms = programs.filter(p => p.status === 'PUBLISHED').length
//         const topPrograms = [...programs]
//             .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
//             .slice(0, 5)
//             .map(p => ({ name: p.title, value: p.enrollmentCount }));
//         return { activePrograms, topPrograms };
//     }, [programs])

//     // Memoize chart data calculation to prevent re-rendering
//     const chartData = useMemo(() => {
//         const months = Array(6).fill(0).map((_, i) => {
//             const d = new Date();
//             d.setMonth(d.getMonth() - i);
//             return {
//                 name: d.toLocaleString('default', { month: 'short' }),
//                 submissions: 0,
//                 year: d.getFullYear(),
//                 month: d.getMonth()
//             };
//         }).reverse();

//         programSubmissions.forEach(submission => {
//             const submissionDate = new Date(submission.submittedAt);
//             const submissionMonth = submissionDate.getMonth();
//             const submissionYear = submissionDate.getFullYear();

//             const monthData = months.find(m => m.month === submissionMonth && m.year === submissionYear);
//             if (monthData) {
//                 monthData.submissions++;
//             }
//         });

//         return months;
//     }, [programSubmissions]);

//     const enrollmentTrendsData = [
//         { name: 'Jan', enrollments: 30 }, { name: 'Feb', enrollments: 45 },
//         { name: 'Mar', enrollments: 60 }, { name: 'Apr', enrollments: 50 },
//         { name: 'May', enrollments: 70 }, { name: 'Jun', enrollments: 90 },
//     ];
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

//     if (programsLoading || submissionsLoading || studentsloading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <PreLoader />
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card className="shadow-lg">
//                     <CardContent className="p-6 bg-red-600 text-white">
//                         <Users size={32} />
//                         <Typography variant="h3" className="font-bold mt-4">
//                             {students.length}
//                         </Typography>
//                         <Typography>Total Students</Typography>
//                     </CardContent>
//                 </Card>
//                 <Card className="shadow-lg">
//                     <CardContent className="p-6 bg-yellow-600 text-white">
//                         <BookOpen size={32} />
//                         <Typography variant="h3" className="font-bold mt-4">
//                             {programs.length}
//                         </Typography>
//                         <Typography>Total Programs</Typography>
//                     </CardContent>
//                 </Card>
//                 <Card className="shadow-lg">
//                     <CardContent className="p-6 bg-purple-600 text-white">
//                         <CheckCircle size={32} />
//                         <Typography variant="h3" className="font-bold mt-4">{programSubmissions.length}</Typography>
//                         <Typography>Quiz Submissions</Typography>
//                     </CardContent>
//                 </Card>
//             </div>

//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//                 {/* Platform Analytics Chart */}
//                 <Paper className="p-6 shadow-md rounded-lg xl:col-span-2">
//                     <Paper className="p-6 shadow-md rounded-lg xl:col-span-2">
//                         <Typography variant="h5" className="font-bold mb-4">Enrollment Trends (Last 6 Months)</Typography>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart
//                                 data={enrollmentTrendsData}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="name" /><YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="enrollments" fill="#3b82f6" />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </Paper>
//                     <Paper className="p-6 shadow-md rounded-lg">
//                         <Typography variant="h5" className="font-bold mb-4">Top 5 Programs by Enrollment</Typography>
//                         <ResponsiveContainer width="100%" height={220}>
//                             <PieChart>
//                                 <Pie data={dashboardStats.topPrograms}
//                                     dataKey="value"
//                                     nameKey="name" cx="50%" cy="50%"
//                                     outerRadius={80} fill="#8884d8" label>
//                                     {dashboardStats.topPrograms.map((entry, index) =>
//                                         <Cell
//                                             key={`cell-${index}`}
//                                             fill={COLORS[index % COLORS.length]}
//                                         />
//                                     )}
//                                 </Pie>
//                                 <Tooltip />
//                             </PieChart>
//                         </ResponsiveContainer>
//                         {/* ✅ This is the connection to Layer 2 */}
//                         <Button component={Link} to="/admin/programs" variant="contained" fullWidth className="mt-4">
//                             Manage All Programs
//                         </Button>
//                     </Paper>
//                 </Paper>

//                 {/* Quick Actions */}
//                 <Paper className="p-6 shadow-md rounded-lg">
//                     <Typography variant="h5" className="font-bold mb-4">Quick Actions</Typography>
//                     <div className="flex flex-row gap-2">
//                         <Button
//                             component={Link}
//                             to="/programs"
//                             variant="contained"
//                             fullWidth
//                         >
//                             Manage Programs
//                         </Button>
//                         <Button
//                             component={Link}
//                             to="/program/create"
//                             variant="outlined"
//                             fullWidth
//                         >
//                             Create New Program
//                         </Button>
//                     </div>
//                 </Paper>
//             </div>
//         </div>
//     );
// };



// --- Main Dashboard Controller ---
export const Dashboard = () => {
    const role = localStorage.getItem("role")
    const { user } = useSelector((state) => state.auth);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };


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
                    <Typography variant="h4" className="font-bold">{getGreeting()}, {user.fullName.split(' ')[0]}!</Typography>
                    <Typography color="text.secondary">
                        {isAdmin ? "Here's an overview of your learning platform." : "Here's a summary of your learning progress."}
                    </Typography>
                </div>

                {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
};

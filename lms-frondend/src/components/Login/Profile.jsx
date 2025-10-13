import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Paper,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Button,
    Tooltip,
    Chip
} from '@mui/material';
import {
    BookOpen,
    CheckSquare,
    User,
    Settings,
    ArrowRight,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getEnrolledPrograms, unenrollProgram } from '../../state/Program/Action';
import { getUserSubmissions } from '../../state/Quiz/Action';
import { PreLoader } from '../Loaders/Loader';


// Helper for animated tab panels
const AnimatedTabPanel = ({ children, value, index }) => (
    <AnimatePresence mode="wait">
        {value === index && (
            <motion.div
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>
            </motion.div>
        )}
    </AnimatePresence>
);

export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const { enrolled, unenrollLoading } = useSelector(store => store.program);
    const { submissions, isLoading: submissionsLoading } = useSelector(store => store.quiz);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (auth.user?.id && jwt) {
            dispatch(getEnrolledPrograms(jwt));
            dispatch(getUserSubmissions(auth.user.id));
        }
    }, [dispatch, auth.user?.id, jwt]);


    if (!auth.user) {
        return (
            <div className="bg-gray-100 min-h-screen pt-24 pb-12">
                <div className="container mx-auto px-4 flex justify-center items-center">
                    <PreLoader />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <Paper className="max-w-5xl mx-auto shadow-xl rounded-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div
                        className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    fontSize: '3rem',
                                    border: '4px solid #fff'
                                }}
                            >
                                {auth.user.fullName[0].toUpperCase()}
                            </Avatar>
                        </motion.div>
                        <div>
                            <Typography variant="h4" component="h1" className="font-bold">
                                {auth.user.fullName}
                            </Typography>
                            <Typography variant="body1" className="text-indigo-200">
                                {auth.user.email}
                            </Typography>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={tabIndex}
                            onChange={(e, val) => setTabIndex(val)}
                            aria-label="profile tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab icon={<User />} iconPosition="start" label="Overview" />
                            <Tab
                                icon={<BookOpen />}
                                iconPosition="start"
                                label={`My Programs (${enrolled.length})`}
                            />
                            <Tab
                                icon={<CheckSquare />}
                                iconPosition="start"
                                label={`Quiz History (${submissions.length})`}
                            />
                            <Tab icon={<Settings />} iconPosition="start" label="Settings" />
                        </Tabs>
                    </Box>

                    {/* Tab Content */}
                    <AnimatedTabPanel value={tabIndex} index={0}>
                        <Typography variant="h5" className="font-semibold mb-4">
                            Welcome Back, {auth.user.fullName.split(' ')[0]}!
                        </Typography>
                        <Typography>
                            This is your personal dashboard. Track your learning, review past
                            quizzes, and manage your account all in one place.
                        </Typography>
                    </AnimatedTabPanel>

                    <AnimatedTabPanel value={tabIndex} index={1}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {enrolled.length > 0 ? enrolled.map(({ program, enrolledAt }) => (
                                <AnimatePresence key={program.id}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Paper
                                            variant="outlined"
                                            className="p-4 rounded-lg flex flex-col h-full"
                                        >
                                            <Typography variant="h6" className="font-bold flex-grow">
                                                {program.title}
                                            </Typography>
                                            <Chip
                                                label={program.category}
                                                size="small"
                                                className="my-2 self-start"
                                            />
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className="mb-4"
                                            >
                                                Enrolled: {new Date(enrolledAt).toLocaleDateString()}
                                            </Typography>
                                            <div className="flex items-center justify-between mt-auto">
                                                <Button
                                                    component={Link}
                                                    to={`/programs/${program.id}`}
                                                    endIcon={<ArrowRight size={16} />}
                                                >
                                                    View Program
                                                </Button>
                                                <Tooltip title="Unenroll from this program">
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => dispatch(unenrollProgram(jwt, program.id))}
                                                        disabled={unenrollLoading === program.id}
                                                    >
                                                        {unenrollLoading === program.id ? (
                                                            <CircularProgress size={20} />
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </Paper>
                                    </motion.div>
                                </AnimatePresence>
                            )) : (
                                <Typography color="text.secondary" className="md:col-span-2">
                                    You are not enrolled in any programs yet.
                                </Typography>
                            )}
                        </div>
                    </AnimatedTabPanel>

                    <AnimatedTabPanel value={tabIndex} index={2}>
                        {submissionsLoading ? (
                            <div className="text-center"><CircularProgress /></div>
                        ) : submissions.length > 0 ? (
                            <div className="space-y-4">
                                {submissions.map((sub) => (
                                    <Paper
                                        key={sub.id}
                                        variant="outlined"
                                        className="p-4 flex justify-between items-center rounded-lg"
                                    >
                                        <div>
                                            <Typography className="font-semibold">
                                                {sub.quiz.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Score: {sub.score} / {sub.answers.length}
                                            </Typography>
                                        </div>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => navigate(`/quiz/${sub.quiz.id}`)}
                                        >
                                            Review
                                        </Button>
                                    </Paper>
                                ))}
                            </div>
                        ) : (
                            <Typography color="text.secondary">
                                You have not submitted any quizzes yet.
                            </Typography>
                        )}
                    </AnimatedTabPanel>

                    <AnimatedTabPanel value={tabIndex} index={3}>
                        <Typography variant="h5" className="font-semibold mb-4">
                            Account Settings
                        </Typography>
                        <Button variant="contained">Change Password</Button>
                    </AnimatedTabPanel>
                </Paper>
            </div>
        </div>
    );
};

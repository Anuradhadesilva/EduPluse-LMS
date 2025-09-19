import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { Avatar, Box, Paper, Typography, List, ListItem, ListItemText, Divider, CircularProgress, Tabs, Tab, Button } from '@mui/material';
import { FiBookOpen, FiCheckSquare, FiUser, FiSettings } from 'react-icons/fi';
import { getEnrolledPrograms } from '../../state/Program/Action';
import { getUserSubmissions } from '../../state/Quiz/Action';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const { enrolled, isLoading: programsLoading } = useSelector(store => store.program);
    const { submissions, isLoading: submissionsLoading } = useSelector(store => store.quiz);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (auth.user?.id) {
            dispatch(getEnrolledPrograms(jwt));
            dispatch(getUserSubmissions(auth.user.id));
        }
    }, [dispatch, auth.user?.id, auth.jwt]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    if (!auth.user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Typography variant="h6">Please log in to view your profile.</Typography>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Paper className="max-w-5xl mx-auto shadow-lg rounded-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="p-8 bg-white border-b flex items-center space-x-6">
                        <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: '3.5rem' }}>
                            {auth.user.fullName[0].toUpperCase()}
                        </Avatar>
                        <div>
                            <Typography variant="h4" component="h1" className="font-bold">
                                {auth.user.fullName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {auth.user.email}
                            </Typography>
                            <Button variant="outlined" size="small" sx={{ mt: 2 }}>Edit Profile</Button>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="profile tabs" centered>
                            <Tab icon={<FiUser />} iconPosition="start" label="Overview" />
                            <Tab icon={<FiBookOpen />} iconPosition="start" label="Enrolled Programs" />
                            <Tab icon={<FiCheckSquare />} iconPosition="start" label="Quiz History" />
                            <Tab icon={<FiSettings />} iconPosition="start" label="Settings" />
                        </Tabs>
                    </Box>

                    {/* Tab Content */}
                    <TabPanel value={tabIndex} index={0}>
                        <Typography variant="h5" component="h2" className="font-semibold mb-4">Profile Overview</Typography>
                        <Typography>Welcome to your dashboard, {auth.user.fullName}. Here you can track your learning progress, manage your account settings, and view your achievements.</Typography>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        {programsLoading ? (
                            <div className="text-center"><CircularProgress /></div>
                        ) : enrolled.length > 0 ? (
                            <List>
                                {enrolled.map((enrollment) => (
                                    <ListItem key={enrollment.id} component={Link} to={`/programs/${enrollment.program.id}`} button className="hover:bg-gray-50 rounded-lg">
                                        <ListItemText primary={enrollment.program.title} secondary={`Enrolled on: ${new Date(enrollment.enrolledAt).toLocaleDateString()}`} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary">You are not enrolled in any programs yet.</Typography>
                        )}
                    </TabPanel>

                    <TabPanel value={tabIndex} index={2}>
                        {submissionsLoading ? (
                            <div className="text-center"><CircularProgress /></div>
                        ) : submissions.length > 0 ? (
                            <List>
                                {submissions.map((submission) => (
                                    <ListItem key={submission.id} secondaryAction={
                                        <Button variant="outlined" size="small" onClick={() => navigate(`/quiz/${submission.quiz.id}`)}>
                                            Review
                                        </Button>
                                    }>
                                        <ListItemText primary={submission.quiz.title} secondary={`Score: ${submission.score} / ${submission.answers.length}`} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary">You have not submitted any quizzes yet.</Typography>
                        )}
                    </TabPanel>

                    <TabPanel value={tabIndex} index={3}>
                        <Typography variant="h5" component="h2" className="font-semibold mb-4">Account Settings</Typography>
                        <div className="space-y-4">
                            <Button variant="contained">Change Password</Button>
                            <Typography color="text.secondary">More account settings will be available here in the future.</Typography>
                        </div>
                    </TabPanel>

                </Paper>
            </div>
        </div>
    );
};

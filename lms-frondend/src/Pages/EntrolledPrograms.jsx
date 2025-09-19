import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEnrolledPrograms } from '../state/Program/Action';
// We'll create this new card
import { PageTopBanner } from '../components/PageTop/PageTopBanner';
import { Typography, Skeleton, Button } from '@mui/material';
import { Book } from 'lucide-react';
import { ProgramCard } from '../components/Programs/ProgramCard';

export const EnrolledPrograms = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((state) => state);
    const { programs, enrolled, isLoading } = useSelector((state) => state.program);


    useEffect(() => {
        if (jwt) {
            dispatch(getEnrolledPrograms(jwt))
        } else {
            dispatch({ type: "CLEAR_ENROLLED" });
        }
    }, [dispatch, jwt]);
    console.log(programs)

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <PageTopBanner pageTitle="My Courses" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <div>
                            <Typography variant="h4" component="h1" className="font-bold text-gray-800">
                                My Learning Dashboard
                            </Typography>
                            <Typography color="text.secondary">
                                {enrolled.length > 0 ? `You are enrolled in ${enrolled.length} programs.` : 'Your enrolled programs will appear here.'}
                            </Typography>
                        </div>
                    </div>

                    {/* Program List or Empty State */}
                    {isLoading ? (
                        // Skeleton Loader
                        <div className="space-y-6">
                            {Array.from(new Array(3)).map((_, index) => (
                                <Skeleton key={index} variant="rectangular" height={150} className="rounded-xl" />
                            ))}
                        </div>
                    ) : enrolled.length > 0 ? (
                        // Enrolled Programs List
                        <div className="space-y-6">
                            {enrolled.map((enrollment) => (
                                <ProgramCard
                                    key={enrollment.program.id}
                                    program={enrollment.program}
                                    isEnrolled={enrolled?.some(e => e.program.id === enrollment.program.id)}
                                    onEnroll={() => handleEnroll(enrollment.program.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center bg-white p-12 rounded-xl shadow-md">
                            <Book size={48} className="mx-auto text-gray-400 mb-4" />
                            <Typography variant="h6" className="font-semibold text-gray-700">You haven't enrolled in any programs yet.</Typography>
                            <Typography color="text.secondary" className="max-w-md mx-auto mt-2 mb-6">
                                Start your learning journey by browsing our catalog of expert-led programs.
                            </Typography>
                            <Button component={Link} to="/programs" variant="contained" size="large">
                                Explore Programs
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
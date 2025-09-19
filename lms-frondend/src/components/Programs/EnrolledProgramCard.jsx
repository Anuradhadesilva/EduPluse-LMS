import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Button, Box, LinearProgress } from '@mui/material';
import { ArrowRight } from 'lucide-react';

export const EnrolledProgramCard = ({ enrollment }) => {
    // Guard clause in case enrollment or program is not defined
    if (!enrollment || !enrollment.program) {
        return null;
    }

    const { program } = enrollment;

    // --- PROGRESS SIMULATION ---
    // In a real application, this value would come from your backend.
    // We are simulating it here for demonstration purposes.
    const progress = Math.floor(Math.random() * (85 - 15 + 1)) + 15;

    return (
        <Paper className="p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col sm:flex-row items-center gap-6">
            {/* Program Image */}
            <div className="w-full sm:w-48 flex-shrink-0">
                <img src={program.image || 'https://via.placeholder.com/400x200'} alt={program.title} className="w-full h-32 object-cover rounded-lg" />
            </div>

            {/* Program Details */}
            <div className="flex-grow w-full">
                <Typography variant="body2" className="font-semibold text-blue-600">
                    {program.category}
                </Typography>
                <Typography variant="h6" component="h3" className="font-bold text-gray-800 mt-1">
                    {program.title}
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ width: '100%', mt: 2 }}>
                    <div className="flex justify-between items-center mb-1">
                        <Typography variant="body2" color="text.secondary">Progress</Typography>
                        <Typography variant="body2" className="font-semibold">{progress}%</Typography>
                    </div>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
                </Box>
            </div>

            {/* Action Button */}
            <div className="w-full sm:w-auto flex-shrink-0 mt-4 sm:mt-0">
                <Button
                    component={Link}
                    to={`/programs/${program.id}`}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight />}
                    fullWidth
                    sx={{ py: 1.5 }}
                >
                    Continue Learning
                </Button>
            </div>
        </Paper>
    );
};
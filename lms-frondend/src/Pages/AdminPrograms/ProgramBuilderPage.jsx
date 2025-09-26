import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramById, createProgram, updateProgram } from '../../state/Program/Action';
import { Button, Typography, Paper, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { ProgramMetadataForm } from '../../components/AdminPrograms/ProgramMetadataForm';
import { CurriculumEditor } from '../../components/AdminPrograms/CurriculumEditor';

const steps = ['Program Details', 'Build Curriculum'];

export const ProgramBuilderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const { selectedProgram: program, isLoading } = useSelector(state => state.program);
    const jwt = localStorage.getItem("jwt");
    const [programData, setProgramData] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(getProgramById(id));
        } else {
            setProgramData({
                title: '', subtitle: '', description: '', category: '', price: '0.00', skillLevel: 'BEGINNER',
                learningObjectives: [''], prerequisites: [''], sections: [],
            });
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (program) {
            setProgramData(JSON.parse(JSON.stringify(program)));
        }
    }, [program]);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSave = () => {
        const action = id
            ? updateProgram(jwt, id, programData)
            : createProgram(jwt, programData);
        dispatch(action);
        navigate('/programs');
    };
    console.log(programData);

    if (isLoading || !programData) {
        return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8 pt-24">
            <Paper className="max-w-5xl mx-auto p-6 rounded-xl shadow-2xl">
                <Typography variant="h4" className="font-bold mb-4">
                    {id ? `Editing: ${programData.title || ''}` : 'Create a New Program'}
                </Typography>

                <Stepper activeStep={activeStep} className="mb-8">
                    {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                </Stepper>

                {/* ✅ Use the fixed metadata form */}
                {activeStep === 0 && <ProgramMetadataForm programData={programData} setProgramData={setProgramData} />}

                {activeStep === 1 && <CurriculumEditor programData={programData} setProgramData={setProgramData} />}

                <div className="mt-8 flex justify-between">
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    {activeStep === steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={handleSave}>{id ? 'Save Changes' : 'Create Program'}</Button>
                    ) : (
                        <Button variant="contained" onClick={handleNext}>Next</Button>
                    )}
                </div>
            </Paper>
        </div>
    );
};
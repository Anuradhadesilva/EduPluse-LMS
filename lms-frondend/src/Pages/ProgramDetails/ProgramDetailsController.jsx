import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Box } from '@mui/material';
import { ProgramPlayer } from './ProgramPlayer';
import { getEnrolledPrograms, getProgramById } from '../../state/Program/Action';
import { ProgramStorefront } from './ProgramStoreFront';

export const ProgramDetailsController = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const { selectedProgram: program, enrolled, isLoading } = useSelector(store => store.program);

    useEffect(() => {
        if (id) {
            dispatch(getProgramById(id));
        }
        if (jwt) {
            dispatch(getEnrolledPrograms(jwt));
        }
    }, [dispatch, id, jwt]);

    console.log(program);
    if (isLoading || !program) {
        return (
            <Box className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </Box>
        );
    }

    const isEnrolled = enrolled.some(e => e.program.id === program.id);

    // If the user is enrolled, show the course player. Otherwise, show the storefront.
    return isEnrolled ? <ProgramPlayer program={program} /> : <ProgramStorefront program={program} />;
};

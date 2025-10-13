import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, TextField, Typography } from '@mui/material';

// We will create this next
import { getAllPrograms } from '../../state/Program/Action';
import ProgramDetailsModal from './ProgramDetailsModal';

const ProgramPerformance = () => {
    const dispatch = useDispatch();
    const { programs, isloading } = useSelector(state => state.program);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllPrograms());
    }, [dispatch]);

    const handleOpenModal = (program) => {
        setSelectedProgram(program);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProgram(null);
    };

    return (
        <Paper className="p-4">
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
                                <TableCell component="th" scope="row">{program.title}</TableCell>
                                <TableCell align="center">{program.enrollments?.length || 0}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={program.status}
                                        color={program.status === 'PUBLISHED' ? 'success' : 'warning'}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" onClick={() => handleOpenModal(program)}>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedProgram && (
                <ProgramDetailsModal
                    program={selectedProgram}
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                />
            )}
        </Paper>
    );
};

export default ProgramPerformance;
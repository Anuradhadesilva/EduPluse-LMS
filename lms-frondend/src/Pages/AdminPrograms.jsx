import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrograms, deleteProgram } from '../state/Program/Action';
import { Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete, PlusCircle } from 'lucide-react';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';

export const AdminPrograms = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const { programs, isLoading } = useSelector(state => state.program);
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        dispatch(getAllPrograms());
    }, [dispatch]);

    const handleDelete = (programId) => {
        if (window.confirm('Are you sure you want to delete this program and all its content? This action cannot be undone.')) {
            dispatch(deleteProgram(jwt, programId));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <PageTopBanner pageTitle="Admin Dashboard" />
            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                    <Typography variant="h4" component="h1" className="font-bold">Manage Programs</Typography>
                    <Button
                        variant="contained"
                        startIcon={<PlusCircle />}
                        onClick={() => navigate('/admin/program/create')}
                    >
                        Create New Program
                    </Button>
                </div>

                <Paper className="rounded-xl shadow-lg overflow-hidden">
                    <TableContainer>
                        <Table>
                            <TableHead className="bg-gray-50">
                                <TableRow>
                                    <TableCell className="font-bold">Title</TableCell>
                                    <TableCell className="font-bold">Category</TableCell>
                                    <TableCell className="font-bold">Status</TableCell>
                                    <TableCell className="font-bold">Price</TableCell>
                                    <TableCell align="right" className="font-bold">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell></TableRow>
                                ) : (
                                    programs.map((program) => (
                                        <TableRow key={program.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell className="font-semibold">{program.title}</TableCell>
                                            <TableCell>{program.category}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${program.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {program.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>${program.price}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => navigate(`/programs/${program.id}`)} color="primary" aria-label="edit">
                                                    <Edit size={20} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(program.id)} color="error" aria-label="delete">
                                                    <Delete size={20} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
};
// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress } from '@mui/material';
// import { Edit, Delete, PlusCircle } from 'lucide-react';
// import { AppContext } from '../Contexts/AppContext';
// import { deleteProgram, getAllPrograms } from '../state/Program/Action';
// import { PageTopBanner } from '../components/PageTop/PageTopBanner';

// export const AdminPrograms = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { auth } = useSelector(state => state);
//     const { programs, isLoading } = useSelector(state => state.program);
//     const { showLogin } = useContext(AppContext);
//     const jwt = localStorage.getItem("jwt");
//     useEffect(() => {
//         dispatch(getAllPrograms());
//     }, [dispatch]);

//     const handleDelete = (id) => {
//         if (!jwt) {
//             showLogin();
//             console.log("open login bar");
//             return;
//         } else if (window.confirm('Are you sure you want to delete this program and all its content?')) {
//             dispatch(deleteProgram(jwt, id));
//         }
//     }

//     return (
//         <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
//             <PageTopBanner pageTitle={"Programs"} />
//             <div className="max-w-7xl mx-auto px-4 md:px-16 sm:px-10">
//                 <div className="flex justify-between items-center mb-6">
//                     <Typography variant="h4" component="h1" className="font-bold">Manage Programs</Typography>
//                     <Button
//                         variant="contained"
//                         startIcon={<PlusCircle />}
//                         onClick={() => navigate('/admin')}
//                     >
//                         Create New Program
//                     </Button>
//                 </div>

//                 <Paper className="rounded-xl shadow-lg overflow-hidden">
//                     <TableContainer>
//                         <Table>
//                             <TableHead className="bg-gray-50">
//                                 <TableRow>
//                                     <TableCell className="font-bold">Title</TableCell>
//                                     <TableCell className="font-bold">Category</TableCell>
//                                     <TableCell className="font-bold">Status</TableCell>
//                                     <TableCell className="font-bold">Price</TableCell>
//                                     <TableCell align="right" className="font-bold">Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {isLoading ? (
//                                     <TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>
//                                 ) : (
//                                     programs.map((program) => (
//                                         <TableRow key={program.id} hover>
//                                             <TableCell className="font-semibold">{program.title}</TableCell>
//                                             <TableCell>{program.category}</TableCell>
//                                             <TableCell>
//                                                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${program.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                                                     {program.status}
//                                                 </span>
//                                             </TableCell>
//                                             <TableCell>${program.price}</TableCell>
//                                             <TableCell align="right">
//                                                 <IconButton onClick={() => navigate(`/programs/${program.id}`)} color="primary" aria-label="edit">
//                                                     <Edit />
//                                                 </IconButton>
//                                                 <IconButton onClick={() => handleDelete(program.id)} color="error" aria-label="delete">
//                                                     <Delete />
//                                                 </IconButton>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>
//             </div>
//         </div>
//     );
// };


// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { PageTopBanner } from '../components/PageTop/PageTopBanner';
// import axios from 'axios';
// import { deleteProgram, getAllPrograms } from '../state/Program/Action';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppContext } from '../Contexts/AppContext';

// export const AdminPrograms = () => {
//     const { id } = useParams();
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { programs } = useSelector((state) => state.program);
//     const { showLogin } = useContext(AppContext);
//     const jwt = localStorage.getItem("jwt");

//     // const filteredPrograms = programs.filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()));
//     // const deleteProgram = (id) => {
//     //     const confirm = window.confirm('Are you sure you want to delete this program?');
//     //     if (confirm) {
//     //         setPrograms(prev => prev.filter(p => p.id !== id));
//     //     }
//     // };

//     useEffect(() => {
//         dispatch(getAllPrograms());
//     }, [dispatch]);
//     console.log(programs)

//     const handleDeleteProgram = (id) => {
//         if (!jwt) {
//             showLogin();
//             console.log("open login bar");
//             return;
//         } else if (window.confirm('Are you sure you want to delete this program and all its content?')) {
//             dispatch(deleteProgram(jwt, id));
//         }
//     }

//     const filteredPrograms = programs.filter((program) =>
//         program.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
//             <PageTopBanner pageTitle={"Programs"} />
//             <div className='w-full px-4 md:px-16 sm:px-10'>
//                 <h1 className="text-2xl font-bold mb-4">Manage Programs</h1>
//                 <button onClick={() => navigate('/admin')} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">+ Add New Program</button>
//                 <ul className="space-y-4">
//                     {filteredPrograms.length > 0 ? (
//                         filteredPrograms.map((program, index) => {
//                             return (
//                                 <li key={index} className="border p-4 rounded shadow flex justify-between items-center">
//                                     <div>
//                                         <h2 className="text-lg font-semibold">{program.title}</h2>
//                                         <p>{program.category} | {program.duration}</p>
//                                     </div>
//                                     <div className="space-x-2">
//                                         <button onClick={() => navigate(`/programs/${program.id}`)} className="text-blue-600 underline">Edit</button>
//                                         <button onClick={() => handleDeleteProgram(program.id)} className="text-red-600 underline">Delete</button>
//                                     </div>
//                                 </li>


//                             )
//                         })) : (
//                         <p className="text-center col-span-full text-gray-500">
//                             No programs found.
//                         </p>
//                     )}
//                 </ul>
//             </div>
//         </div>
//     )
// }

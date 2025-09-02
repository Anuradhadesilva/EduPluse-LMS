import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';
import axios from 'axios';
import { deleteProgram, getAllPrograms } from '../state/Program/Action';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../Contexts/AppContext';

export const AdminPrograms = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { programs } = useSelector((state) => state.program);
    const { showLogin } = useContext(AppContext);
    const jwt = localStorage.getItem("jwt");

    // const filteredPrograms = programs.filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()));
    // const deleteProgram = (id) => {
    //     const confirm = window.confirm('Are you sure you want to delete this program?');
    //     if (confirm) {
    //         setPrograms(prev => prev.filter(p => p.id !== id));
    //     }
    // };

    useEffect(() => {
        dispatch(getAllPrograms());
    }, [dispatch]);
    console.log(programs)

    const handleDeleteProgram = (id) => {
        if (!jwt) {
            showLogin();
            console.log("open login bar");
            return;
        } else {
            dispatch(deleteProgram(jwt, id));
            console.log(id);
        }
    }

    const filteredPrograms = programs.filter((program) =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner pageTitle={"Programs"} />
            <div className='w-full px-4 md:px-16 sm:px-10'>
                <h1 className="text-2xl font-bold mb-4">Manage Programs</h1>
                <button onClick={() => navigate('/admin')} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">+ Add New Program</button>
                <ul className="space-y-4">
                    {filteredPrograms.length > 0 ? (
                        filteredPrograms.map((program, index) => {
                            return (
                                <li key={index} className="border p-4 rounded shadow flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-semibold">{program.title}</h2>
                                        <p>{program.category} | {program.duration}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => navigate(`/programs/${program.id}`)} className="text-blue-600 underline">Edit</button>
                                        <button onClick={() => handleDeleteProgram(program.id)} className="text-red-600 underline">Delete</button>
                                    </div>
                                </li>


                            )
                        })) : (
                        <p className="text-center col-span-full text-gray-500">
                            No programs found.
                        </p>
                    )}
                </ul>
            </div>
        </div>
    )
}

import React, { useContext, useState } from 'react'
import { AppContext } from '../Contexts/AppContext'
import { useNavigate, useParams } from 'react-router-dom';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';

export const AdminPrograms = () => {
    const { id } = useParams();
    const { programs, setPrograms } = useContext(AppContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const filteredPrograms = programs.filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const deleteProgram = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this program?');
        if (confirm) {
            setPrograms(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner pageTitle={"Programs"} />
            <div className='w-full px-4 md:px-16 sm:px-10'>
                <h1 className="text-2xl font-bold mb-4">Manage Programs</h1>
                <button onClick={() => navigate('/admin')} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">+ Add New Program</button>
                <ul className="space-y-4">
                    {filteredPrograms.map((program, index) => (
                        <li key={index} className="border p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{program.title}</h2>
                                <p>{program.category} | {program.duration}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => navigate(`/programs/${index}`)} className="text-blue-600 underline">Edit</button>
                                <button onClick={() => deleteProgram(program.id)} className="text-red-600 underline">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

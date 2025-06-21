import React, { useContext, useState } from 'react'
import { AppContext } from '../Contexts/AppContext'

export const Entrolled = () => {
    const [program, setProgram] = useState([]);

    const enrolledPrograms = programs.filter(p => enrolled.includes(p.id));
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className='flex flex-col'>
                <h1 className="text-2xl font-bold mb-4">Your Enrolled Programs</h1>
                {enrolledPrograms.length === 0 ? (
                    <p>No programs enrolled.</p>
                ) : (
                    <ul className="space-y-4">
                        {enrolledPrograms.map(program => (
                            <li key={program.id} className="border p-4 rounded shadow">
                                <h2 className="font-semibold text-lg">{program.title}</h2>
                                <p>{program.category} | {program.duration}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

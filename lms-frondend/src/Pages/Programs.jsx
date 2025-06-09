import React, { useContext, useState } from 'react'
import { PageTopBanner } from '../components/PageTop/PageTopBanner'
import { ProgramCard } from '../components/Programs/ProgramCard'
import { AppContext } from '../Contexts/AppContext'
import { useParams } from 'react-router-dom'

export const Programs = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const { programs, enrollProgram, enrolled } = useContext(AppContext);
    const filteredPrograms = programs.filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const isEnrolled = enrolled.includes(Number(id));

    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner pageTitle={"Programs"} />
            <div className='w-full px-4 md:px-16 sm:px-10'>
                <div className='w-full items-center gap-6'>
                    <input
                        type="text"
                        placeholder='Search Programs...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='max-w-sm w-full rounded-lg border border-neutral-300 px-3 h-12 bg-transparent focus:bg-gray-100' />
                </div>
                <div className='w-full grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
                    {filteredPrograms.length > 0 ? (
                        filteredPrograms.map((programs, index) => (
                            <ProgramCard key={index} image={programs.image} category={programs.category} rating={programs.rating} title={programs.title} lessions={programs.lessons} students={programs.students} duration={programs.duration} price={programs.price} index={index} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No programs found.</p>
                    )}
                </div>

            </div>
        </div>
    )
}

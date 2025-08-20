import React, { useContext, useEffect, useState } from 'react'
import { PageTopBanner } from '../components/PageTop/PageTopBanner'
import { ProgramCard } from '../components/Programs/ProgramCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPrograms } from '../state/Program/Action'

export const Programs = () => {
    const dispatch = useDispatch();
    const { programs, isloading, error } = useSelector((state) => state.program);
    const [searchTerm, setSearchTerm] = useState("");
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        dispatch(getAllPrograms()); // ✅ now this works
    }, [dispatch]);

    const filteredPrograms = programs.filter((program) =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEnroll = (id) => {
        if (!jwt) {
            alert("Please login first!");
            return;
        }
        // dispatch(enrollProgram(jwt, id));
    };

    return (
        <div className="w-full min-h-screen flex-col space-y-5 pb-16">
            <PageTopBanner pageTitle={"Programs"} />
            <div className="w-full px-4 md:px-16 sm:px-10">
                <div className="w-full items-center gap-6">
                    <input
                        type="text"
                        placeholder="Search Programs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm w-full rounded-lg border border-neutral-300 px-3 h-12 bg-transparent focus:bg-gray-100"
                    />
                </div>

                {isloading && <p className="text-gray-500">Loading programs...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                <div className="w-full grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {filteredPrograms.length > 0 ? (
                        filteredPrograms.map((program, index) => (
                            <ProgramCard
                                key={program.id}
                                id={program.id}
                                image={program.image}
                                category={program.category}
                                rating={program.rating}
                                title={program.title}
                                lessions={program.lessons}
                                students={program.students}
                                duration={program.duration}
                                price={program.price}
                                index={index}
                                onEnroll={handleEnroll(program.id)}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No programs found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
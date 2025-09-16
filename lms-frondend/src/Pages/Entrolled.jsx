import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AppContext'
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledPrograms } from '../state/Program/Action';
import { ProgramCard } from '../components/Programs/ProgramCard';

export const Entrolled = () => {

    const dispatch = useDispatch();
    const { programs, isloading, error, enrolled } = useSelector((state) => state.program);
    const jwt = localStorage.getItem("jwt");


    useEffect(() => {
        if (jwt) {
            dispatch(getEnrolledPrograms(jwt))
        } else {
            dispatch({ type: "CLEAR_ENROLLED" });
        }
    }, [dispatch, jwt]);
    console.log(programs)

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="flex flex-col w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-4">Your Enrolled Programs</h1>
                {(!enrolled || enrolled.length === 0) ? (
                    <p>No programs enrolled.</p>
                ) : (
                    <ul className="space-y-4">
                        {enrolled.map((enroll, index) => (
                            <li key={enroll.id} className="border p-4 rounded shadow">
                                <ProgramCard
                                    key={enroll.program.id}
                                    id={enroll.program.id}
                                    image={enroll.program.image}
                                    category={enroll.program.category}
                                    rating={enroll.program.rating}
                                    title={enroll.program.title}
                                    lessions={enroll.program.lessons}
                                    students={enroll.program.students}
                                    duration={enroll.program.duration}
                                    price={enroll.program.price}
                                    index={index}
                                // onEnroll={() => handleEnroll(enroll.program.id)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

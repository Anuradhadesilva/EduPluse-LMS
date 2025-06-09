import React, { createContext, useState } from 'react'
import programsData from '../constants/programsData';
import quizData from '../constants/quizData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [role, setRole] = useState("user"); // 'admin' or 'user'
    const [programs, setPrograms] = useState(programsData);
    const [quizzes, setQuizzes] = useState(quizData);
    const [enrolled, setEnrolled] = useState([]);

    const enrollProgram = (programId) => {
        const id = Number(programId); // ensure number type
        if (!enrolled.includes(id)) {
            setEnrolled([...enrolled, id]);
        }
    };
    const addProgram = (newProgram) => setPrograms([...programs, newProgram]);

    const addQuizToProgram = (programTitle, quiz) => {
        const updated = quizzes.map(p =>
            p.programTitle === programTitle
                ? { ...p, quizzes: [...p.quizzes, quiz] }
                : p
        );
        setQuizzes(updated);
    };

    return (
        <AppContext.Provider
            value={{
                role,
                setRole,
                programs,
                setPrograms,
                quizzes,
                setQuizzes,
                enrolled,
                enrollProgram,
                addProgram,
                addQuizToProgram
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

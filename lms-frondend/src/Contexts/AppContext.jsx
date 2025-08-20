import React, { createContext, useState } from 'react'
import programsData from '../constants/programsData';
import quizData from '../constants/quizData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [role, setRole] = useState("user"); // 'admin' or 'user'
    const [programs, setPrograms] = useState(programsData);
    const [quizzes, setQuizzes] = useState(quizData);
    const [enrolled, setEnrolled] = useState([]);
    const [openLoginBar, setOpenLoginBar] = useState(false);

    const showLogin = () => setOpenLoginBar(true);
    const hideLogin = () => setOpenLoginBar(false);
    const enrollProgram = (programId) => {
        const id = Number(programId); // ensure number type
        if (!enrolled.includes(id)) {
            setEnrolled([...enrolled, id]);
        }
    };
    const addProgram = (newProgram) => setPrograms([...programs, newProgram]);

    const editProgram = (updatedProgram) => {
        const updated = programs.map(p =>
            p.id === updatedProgram.id ? updatedProgram : p
        );
        setPrograms(updated);
    };

    const deleteProgram = (programId) => {
        setPrograms(programs.filter(p => p.id !== programId));
        setQuizzes(quizzes.filter(q => q.programTitle !== programs.find(p => p.id === programId)?.title));
        setEnrolled(enrolled.filter(id => id !== programId));
    };

    const addQuizToProgram = (programTitle, quiz) => {
        const updated = quizzes.map(p =>
            p.programTitle === programTitle
                ? { ...p, quizzes: [...p.quizzes, quiz] }
                : p
        );
        setQuizzes(updated);
    };

    const deleteQuizFromProgram = (programTitle, quizId) => {
        const updated = quizzes.map(p =>
            p.programTitle === programTitle
                ? { ...p, quizzes: p.quizzes.filter(q => q.id !== quizId) }
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
                editProgram,
                deleteProgram,
                addQuizToProgram,
                deleteQuizFromProgram,
                openLoginBar,
                showLogin,
                hideLogin
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

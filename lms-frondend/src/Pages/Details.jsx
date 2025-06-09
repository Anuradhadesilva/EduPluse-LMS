

import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageTopBanner } from '../components/PageTop/PageTopBanner'
import { AppContext } from '../Contexts/AppContext';

export const Details = () => {
    const { id } = useParams();
    const { programs, quizzes, enrollProgram, enrolled } = useContext(AppContext);
    const program = programs[id];
    const navigate = useNavigate();

    const programQuizzes = quizzes.find(p => p.programTitle === program.title)?.quizzes || [];

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (!program) {
        return <div className="p-10 text-red-600">Program not found.</div>;
    }

    const isEnrolled = enrolled.includes(Number(id));


    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner />
            <button onClick={() => navigate(-1)} className='mb-4 text-blue-600 px-4 md:px-16 sm:px-10 underline cursor-pointer'>Back</button>

            <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
                <div className="flex flex-col lg:flex-row items-start gap-8 mb-10">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="w-full lg:w-1/2 h-64 object-cover rounded-xl shadow-md"
                    />

                    <div className="flex flex-col space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 w-full">{program.title}</h1>
                        <div className="text-gray-500 text-sm">
                            <span className="mr-2">📁 {program.category}</span> |
                            <span className="mx-2">📚 {program.lessons}</span> |
                            <span className="mx-2">👨‍🎓 {program.students}</span> |
                            <span className="mx-2">⏱ {program.duration}</span>
                        </div>
                        {!isEnrolled && (
                            <button
                                onClick={() => enrollProgram(Number(id))}
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Enroll
                            </button>
                        )}
                        {isEnrolled && <p className="mt-4 text-green-600 font-medium">You are enrolled.</p>}
                        <div className="text-xl font-semibold text-blue-600">{program.price}</div>
                        <p className="text-gray-600 leading-relaxed">
                            This program offers in-depth content to help learners achieve mastery in their chosen field. You'll get access to structured video tutorials, resource documents, and quizzes to test your understanding.
                        </p>
                    </div>
                </div>


                {/* Documents */}
                {program.documents?.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">📄 Documents</h2>
                        <ul className="list-disc list-inside text-blue-700 space-y-2">
                            {program.documents.map((doc, i) => (
                                <li key={i}>
                                    <a
                                        href={doc.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {doc.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {programQuizzes.length > 0 && (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">📝 Related Quizzes</h2>
                        <ul className="space-y-4">
                            {programQuizzes.map((quiz) => (
                                <li key={quiz.id} className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">{quiz.title}</span>
                                    <Link
                                        to={`/quiz/${quiz.id}`}
                                        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 inline-block"
                                    >
                                        Take Quiz
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
};


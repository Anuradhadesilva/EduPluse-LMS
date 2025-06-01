

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import programsData from '../constants/programsData'
import { PageTopBanner } from '../components/PageTop/PageTopBanner'

export const Details = () => {
    const { id } = useParams();
    const program = programsData[id];
    const navigate = useNavigate();




    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner />
            <button onClick={() => navigate(-1)} className='mb-4 text-blue-600 px-4 md:px-16 sm:px-10'>Back</button>

            <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
                <div className="flex flex-col lg:flex-row items-start gap-8 mb-10">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="w-full lg:w-1/2 h-64 object-cover rounded-xl shadow-md"
                    />

                    <div className="flex flex-col space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">{program.title}</h1>
                        <div className="text-gray-500 text-sm">
                            <span className="mr-2">📁 {program.category}</span> |
                            <span className="mx-2">📚 {program.lessons}</span> |
                            <span className="mx-2">👨‍🎓 {program.students}</span> |
                            <span className="mx-2">⏱ {program.duration}</span>
                        </div>
                        <div className="text-xl font-semibold text-blue-600">{program.price}</div>
                        <p className="text-gray-600 leading-relaxed">
                            This program offers in-depth content to help learners achieve mastery in their chosen field. You'll get access to structured video tutorials, resource documents, and quizzes to test your understanding.
                        </p>
                    </div>
                </div>

                {program.videoTutorials?.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">📺 Video Tutorials</h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            {program.videoTutorials.map((video, i) => (
                                <div key={i}>
                                    <p className="font-medium mb-2">{video.title}</p>
                                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow">
                                        <iframe
                                            src={video.url}
                                            title={video.title}
                                            className="absolute top-0 left-0 w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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

                <div className="text-center mt-10">
                    <Link
                        to={`/programs/${id}/quiz`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition"
                    >
                        🎯 Take Quiz
                    </Link>
                </div>
            </div>

        </div>
    );
};


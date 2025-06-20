// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { PageTopBanner } from '../components/PageTop/PageTopBanner';

// export const AdminProgramDetails = () => {
//     const { id } = useParams(); // get program id from url
//     const [program, setProgram] = useState(null); // correct destructuring here
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProgram = async () => {
//             try {
//                 if (!id) {
//                     throw new Error('Program ID is missing');
//                 }
//                 const response = await axios.get(`http://localhost:5454/api/program/${id}`);
//                 setProgram(response.data);
//             } catch (err) {
//                 console.error('Failed to fetch program details', err);
//                 setError(err.message || 'Unknown error');
//             }
//         };

//         fetchProgram();
//     }, [id]);

//     if (error) return <div className="text-red-600">Error: {error}</div>;
//     if (!program) return <div>Loading program details...</div>;

//     return (
//         <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
//             <PageTopBanner pageTitle="Edit Program" />
//             <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
//             <img src={program.image} alt={program.title} className="w-64 mb-4 rounded" />
//             <p>Category: {program.category}</p>
//             <p>Rating: {program.rating}</p>
//             <p>Duration: {program.duration}</p>
//             <p>Students: {program.students}</p>
//             <p>Price: {program.price}</p>
//             <h2 className="text-2xl mt-6 mb-2">Quizzes</h2>
//             {program.quizzes && program.quizzes.length > 0 ? (
//                 program.quizzes.map((quiz) => (
//                     <div key={quiz.id} className="border p-4 rounded mb-4">
//                         <h3 className="font-semibold">{quiz.title}</h3>
//                         {quiz.questions.map((q) => (
//                             <div key={q.id} className="mt-2">
//                                 <p><strong>Q:</strong> {q.question}</p>
//                                 <ul className="list-disc ml-6">
//                                     <li>{q.optionA}</li>
//                                     <li>{q.optionB}</li>
//                                     <li>{q.optionC}</li>
//                                     <li>{q.optionD}</li>
//                                 </ul>
//                                 <p><em>Correct Answer: {q.correctAnswer}</em></p>
//                             </div>
//                         ))}
//                     </div>
//                 ))
//             ) : (
//                 <p>No quizzes available</p>
//             )}
//         </div>
//     );
// };

import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Contexts/AppContext';
import { Quiz } from './Quiz';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';
import { AddQuiz } from '../components/Quiz/AddQuiz';

export const AdminProgramDetails = () => {
    const { id } = useParams();
    const { programs, setPrograms, quizzes, setQuizzes } = useContext(AppContext);
    const program = programs[id];

    if (!program) {
        return <div className="p-6 text-red-500">Program not found.</div>;
    }

    const relatedQuiz = quizzes.find(q => q.programTitle === program.title);
    const [formData, setFormData] = useState(program);
    const [quizTitle, setQuizTitle] = useState('');
    const [showQuizForm, setShowQuizForm] = useState(false);

    if (!program) {
        return <div className="p-6 text-red-500">Program not found.</div>;
    }
    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleVideoChange = (index, field, value) => {
        const updated = [...formData.videoTutorials];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, videoTutorials: updated }));
    };

    const handleAddNewVideo = () => {
        setVideos
    }

    const handleDocumentChange = (index, field, value) => {
        const updated = [...formData.documents];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, documents: updated }));
    };

    const handleAddQuiz = () => {
        const updatedQuizzes = quizzes.map(q => {
            if (q.programTitle === program.title) {
                return {
                    ...q,
                    quizzes: [...q.quizzes, { id: Date.now(), title: quizTitle, questions: [] }]
                };
            }
            return q;
        });
        setQuizzes(updatedQuizzes);
        setQuizTitle('');
    };

    const handleSave = () => {
        const updatedPrograms = [...programs];
        updatedPrograms[id] = formData;
        setPrograms(updatedPrograms);
        alert("Program updated!");
    };

    const [addMoreVideo, setAddmoreVideo] = useState(false);
    const handleAddVideo = () => {
        // Add a new empty video to formData.videoTutorials
        const updatedVideos = [...(formData.videoTutorials || []), { title: '', url: '' }];
        const updatedFormData = { ...formData, videoTutorials: updatedVideos };
        setFormData(updatedFormData);

        // Hide the addMoreVideo input since it’s now part of the array
        setAddmoreVideo(false);
    };



    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner pageTitle="Edit Program" />
            <div className='w-full px-4 md:px-16 sm:px-10'>
                <h1 className="text-2xl font-bold mb-4">Edit Program</h1>

                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {Object.entries(formData).map(([key, value]) => {
                        if (key === 'videoTutorials' || key === 'documents') return null;
                        return (
                            <input
                                key={key}
                                value={value}
                                onChange={e => handleInputChange(key, e.target.value)}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                className="border p-2 w-full"
                            />
                        );
                    })}
                </div>

                {/* Video Tutorials */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg mb-2">Video Tutorials</h2>
                    {formData.videoTutorials.map((video, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                            <input
                                value={video.title}
                                onChange={e => handleVideoChange(index, 'title', e.target.value)}
                                placeholder="Video Title"
                                className="border p-2"
                            />
                            <input
                                value={video.url}
                                onChange={e => handleVideoChange(index, 'url', e.target.value)}
                                placeholder="Video URL"
                                className="border p-2"
                            />
                        </div>
                    ))}
                    <div>
                        <button
                            onClick={handleAddVideo}
                            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
                        >
                            Add More
                        </button>
                    </div>

                    {/* {addMoreVideo && (
                        <>
                            <input

                                onChange={e => handleVideoChange(index, 'title', e.target.value)}
                                placeholder="Video Title"
                                className="border p-2"
                            />
                            <input
                                // value={video.url}
                                onChange={e => handleVideoChange(index, 'url', e.target.value)}
                                placeholder="Video URL"
                                className="border p-2"
                            />
                        </>)}
                    <div>
                        <button onClick={() => setAddmoreVideo(true)} className={`${addMoreVideo ? 'hidden' : 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'} `}>Add More</button>

                    </div> */}
                </div>

                {/* Documents */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg mb-2">Documents</h2>
                    {formData.documents.map((doc, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                            <input
                                value={doc.title}
                                onChange={e => handleDocumentChange(index, 'title', e.target.value)}
                                placeholder="Document Title"
                                className="border p-2"
                            />
                            <input
                                value={doc.link}
                                onChange={e => handleDocumentChange(index, 'link', e.target.value)}
                                placeholder="Document Link"
                                className="border p-2"
                            />
                        </div>
                    ))}
                </div>

                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Program</button>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Quizzes</h2>
                    <ul className="mt-2 space-y-2">
                        {relatedQuiz?.quizzes.map(quiz => (
                            <li key={quiz.id} className="border p-3 rounded flex justify-between">
                                <span>{quiz.title}</span>
                                <button onClick={() => handleDeleteQuiz(quiz.id)} className="text-red-600 underline">Delete</button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <button
                            onClick={() => setShowQuizForm(prev => !prev)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {showQuizForm ? '✖ Cancel' : '➕ Add Quiz'}
                        </button>

                        {showQuizForm && (
                            <AddQuiz programId={program.id} programTitle={program.title} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

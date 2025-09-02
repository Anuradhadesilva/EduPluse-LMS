import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageTopBanner } from '../components/PageTop/PageTopBanner';
import { AddQuiz } from '../components/Quiz/AddQuiz';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramById, updateProgram } from '../state/Program/Action';
import { deleteQuiz } from '../state/Quiz/Action';

export const AdminProgramDetails = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');

    const [showQuizForm, setShowQuizForm] = useState(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { selectedProgram: program } = useSelector((store) => store.program)
    useEffect(() => {
        if (id) {
            dispatch(getProgramById(id));
        }

        window.scrollTo(0, 0);
    }, [dispatch, id]);

    useEffect(() => {
        if (program) {
            setFormData(program);
        }
    }, [program]);
    console.log(program)

    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
    if (!program || !formData) return <div className="p-6 text-gray-600">Loading...</div>;

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleVideoChange = (index, field, value) => {
        const updated = [...formData.videos];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, videos: updated }));
    };

    const handleAddVideo = () => {
        if (!formData.videos) formData.videos = [];

        console.log(formData.videos)

        const last = formData.videos[formData.videos.length - 1];
        if (last && (!last.title || !last.url)) {
            alert("Please fill the last video before adding a new one.");
            return;
        }
        const updatedVideos = [...(formData.videos || []), { title: '', url: '' }];
        setFormData(prev => ({ ...prev, videos: updatedVideos }));
    };
    const handleRemoveVideo = (index) => {
        const updated = formData.videos.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, videos: updated }))
    }

    const handleDocumentChange = (index, field, value) => {
        const updated = [...formData.documents];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, documents: updated }));
    };

    const handleAddDocument = () => {
        const updatedDocuments = [...(formData.documents || []), { title: '', link: '' }];
        setFormData(prev => ({ ...prev, documents: updatedDocuments }));
    }
    const handleDocumentDelete = (index) => {
        const updated = formData.documents.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, documents: updated }));

    }

    const handleDeleteQuiz = async (id) => {
        if (!jwt) {
            showLogin();
            console.log("open login bar");
            return;
        } else {
            try {
                await dispatch(deleteQuiz(jwt, id));
                await dispatch(getProgramById(program.id));
            } catch (err) {
                console.error('❌ Failed to add quiz:', err);
                alert('Failed to add quiz. See console for details.');
            }
            console.log(id);
        }
    }


    const handleSave = async () => {
        try {
            if (id) {
                dispatch(updateProgram(jwt, id, formData));
            }
        } catch (err) {
            alert('Failed to save program: ' + err.message);
        }
    };


    return (
        <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
            <PageTopBanner pageTitle="Edit Program" />
            <div className='w-full px-4 md:px-16 sm:px-10'>
                <h1 className="text-2xl font-bold mb-4">Edit Program</h1>

                {/* Editable Program Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {Object.entries(formData).map(([key, value]) => {
                        if (['videos', 'documents', 'quizzes', 'id'].includes(key)) return null;
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
                    {(formData.videos || []).map((video, index) => (
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
                            <button onClick={() => handleRemoveVideo(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddVideo}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        ➕ Add Video
                    </button>
                </div>

                {/* Documents */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg mb-2">Documents</h2>
                    {(formData.documents || []).map((doc, index) => (
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
                            <button
                                onClick={() => handleDocumentDelete(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddDocument}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        ➕ Add Document
                    </button>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    💾 Save Program
                </button>

                {/* Quizzes Section */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold">Quizzes</h2>
                    <ul className="mt-2 space-y-2">
                        {(program.quizzes || []).map(quiz => (
                            <li
                                key={quiz.id}
                                className="border p-3 rounded flex justify-between items-center"
                            >
                                <span>{quiz.title}</span>
                                <div className='space-x-4'>
                                    <button
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <button
                            onClick={() => setShowQuizForm(prev => !prev)}
                            className="bg-purple-600 text-white px-4 py-2 rounded"
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
};


// import React, { useContext, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../Contexts/AppContext';
// import { Quiz } from './Quiz';
// import { PageTopBanner } from '../components/PageTop/PageTopBanner';
// import { AddQuiz } from '../components/Quiz/AddQuiz';

// export const AdminProgramDetails = () => {
//     const { id } = useParams();
//     const { programs, setPrograms, quizzes, setQuizzes } = useContext(AppContext);
//     const program = programs[id];

//     if (!program) {
//         return <div className="p-6 text-red-500">Program not found.</div>;
//     }

//     const relatedQuiz = quizzes.find(q => q.programTitle === program.title);
//     const [formData, setFormData] = useState(program);
//     const [quizTitle, setQuizTitle] = useState('');
//     const [showQuizForm, setShowQuizForm] = useState(false);

//     if (!program) {
//         return <div className="p-6 text-red-500">Program not found.</div>;
//     }
//     const handleInputChange = (key, value) => {
//         setFormData(prev => ({ ...prev, [key]: value }));
//     };

//     const handleVideoChange = (index, field, value) => {
//         const updated = [...formData.videoTutorials];
//         updated[index][field] = value;
//         setFormData(prev => ({ ...prev, videoTutorials: updated }));
//     };

//     const handleAddNewVideo = () => {
//         setVideos
//     }

//     const handleDocumentChange = (index, field, value) => {
//         const updated = [...formData.documents];
//         updated[index][field] = value;
//         setFormData(prev => ({ ...prev, documents: updated }));
//     };

//     const handleAddQuiz = () => {
//         const updatedQuizzes = quizzes.map(q => {
//             if (q.programTitle === program.title) {
//                 return {
//                     ...q,
//                     quizzes: [...q.quizzes, { id: Date.now(), title: quizTitle, questions: [] }]
//                 };
//             }
//             return q;
//         });
//         setQuizzes(updatedQuizzes);
//         setQuizTitle('');
//     };

//     const handleSave = () => {
//         const updatedPrograms = [...programs];
//         updatedPrograms[id] = formData;
//         setPrograms(updatedPrograms);
//         alert("Program updated!");
//     };

//     const [addMoreVideo, setAddmoreVideo] = useState(false);
//     const handleAddVideo = () => {
//         // Add a new empty video to formData.videoTutorials
//         const updatedVideos = [...(formData.videoTutorials || []), { title: '', url: '' }];
//         const updatedFormData = { ...formData, videoTutorials: updatedVideos };
//         setFormData(updatedFormData);

//         // Hide the addMoreVideo input since it’s now part of the array
//         setAddmoreVideo(false);
//     };



//     return (
//         <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
//             <PageTopBanner pageTitle="Edit Program" />
//             <div className='w-full px-4 md:px-16 sm:px-10'>
//                 <h1 className="text-2xl font-bold mb-4">Edit Program</h1>

//                 {/* Basic Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     {Object.entries(formData).map(([key, value]) => {
//                         if (key === 'videoTutorials' || key === 'documents') return null;
//                         return (
//                             <input
//                                 key={key}
//                                 value={value}
//                                 onChange={e => handleInputChange(key, e.target.value)}
//                                 placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                                 className="border p-2 w-full"
//                             />
//                         );
//                     })}
//                 </div>

//                 {/* Video Tutorials */}
//                 <div className="mb-6">
//                     <h2 className="font-semibold text-lg mb-2">Video Tutorials</h2>
//                     {formData.videoTutorials.map((video, index) => (
//                         <div key={index} className="grid grid-cols-2 gap-2 mb-2">
//                             <input
//                                 value={video.title}
//                                 onChange={e => handleVideoChange(index, 'title', e.target.value)}
//                                 placeholder="Video Title"
//                                 className="border p-2"
//                             />
//                             <input
//                                 value={video.url}
//                                 onChange={e => handleVideoChange(index, 'url', e.target.value)}
//                                 placeholder="Video URL"
//                                 className="border p-2"
//                             />
//                         </div>
//                     ))}
//                     <div>
//                         <button
//                             onClick={handleAddVideo}
//                             className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
//                         >
//                             Add More
//                         </button>
//                     </div>

//                     {/* {addMoreVideo && (
//                         <>
//                             <input

//                                 onChange={e => handleVideoChange(index, 'title', e.target.value)}
//                                 placeholder="Video Title"
//                                 className="border p-2"
//                             />
//                             <input
//                                 // value={video.url}
//                                 onChange={e => handleVideoChange(index, 'url', e.target.value)}
//                                 placeholder="Video URL"
//                                 className="border p-2"
//                             />
//                         </>)}
//                     <div>
//                         <button onClick={() => setAddmoreVideo(true)} className={`${addMoreVideo ? 'hidden' : 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'} `}>Add More</button>

//                     </div> */}
//                 </div>

//                 {/* Documents */}
//                 <div className="mb-6">
//                     <h2 className="font-semibold text-lg mb-2">Documents</h2>
//                     {formData.documents.map((doc, index) => (
//                         <div key={index} className="grid grid-cols-2 gap-2 mb-2">
//                             <input
//                                 value={doc.title}
//                                 onChange={e => handleDocumentChange(index, 'title', e.target.value)}
//                                 placeholder="Document Title"
//                                 className="border p-2"
//                             />
//                             <input
//                                 value={doc.link}
//                                 onChange={e => handleDocumentChange(index, 'link', e.target.value)}
//                                 placeholder="Document Link"
//                                 className="border p-2"
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Program</button>

//                 <div className="mt-8">
//                     <h2 className="text-xl font-semibold">Quizzes</h2>
//                     <ul className="mt-2 space-y-2">
//                         {relatedQuiz?.quizzes.map(quiz => (
//                             <li key={quiz.id} className="border p-3 rounded flex justify-between">
//                                 <span>{quiz.title}</span>
//                                 <button onClick={() => handleDeleteQuiz(quiz.id)} className="text-red-600 underline">Delete</button>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4">
//                         <button
//                             onClick={() => setShowQuizForm(prev => !prev)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded"
//                         >
//                             {showQuizForm ? '✖ Cancel' : '➕ Add Quiz'}
//                         </button>

//                         {showQuizForm && (
//                             <AddQuiz programId={program.id} programTitle={program.title} />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

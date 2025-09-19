import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramById, createProgram, updateProgram } from '../state/Program/Action';
import {
    Button, Typography, Paper, Stepper, Step, StepLabel, CircularProgress,
    TextField, Select, MenuItem, FormControl, InputLabel, IconButton,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Plus, Trash2, PlusCircle } from 'lucide-react';

const ProgramMetadataForm = ({ programData, setProgramData }) => {
    const handleChange = (e) =>
        setProgramData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleListChange = (listName, index, value) => {
        const newList = [...(programData[listName] ?? [])];
        newList[index] = value;
        setProgramData((prev) => ({ ...prev, [listName]: newList }));
    };

    const addListItem = (listName) =>
        setProgramData((prev) => ({
            ...prev,
            [listName]: [...(programData[listName] ?? []), ''],
        }));

    const removeListItem = (listName, index) =>
        setProgramData((prev) => ({
            ...prev,
            [listName]: (programData[listName] ?? []).filter((_, i) => i !== index),
        }));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                    label="Program Title"
                    name="title"
                    value={programData.title || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Subtitle"
                    name="subtitle"
                    value={programData.subtitle || ''}
                    onChange={handleChange}
                    fullWidth
                />
            </div>

            <TextField
                label="Description"
                name="description"
                value={programData.description || ''}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField
                    label="Category"
                    name="category"
                    value={programData.category || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={programData.price || '0.00'}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Skill Level</InputLabel>
                    <Select
                        name="skillLevel"
                        value={programData.skillLevel || 'BEGINNER'}
                        onChange={handleChange}
                    >
                        <MenuItem value="BEGINNER">Beginner</MenuItem>
                        <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                        <MenuItem value="ADVANCED">Advanced</MenuItem>
                        <MenuItem value="ALL_LEVELS">All Levels</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Learning Objectives */}
            <div>
                <h3 className="font-semibold mb-2 text-gray-700">Learning Objectives</h3>
                {(programData.learningObjectives ?? []).map((obj, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <TextField
                            placeholder="e.g., Build a full-stack web application"
                            fullWidth
                            size="small"
                            value={obj}
                            onChange={(e) =>
                                handleListChange('learningObjectives', index, e.target.value)
                            }
                        />
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeListItem('learningObjectives', index)}
                        >
                            <Trash2 size={18} />
                        </IconButton>
                    </div>
                ))}
                <Button
                    size="small"
                    startIcon={<Plus size={16} />}
                    onClick={() => addListItem('learningObjectives')}
                >
                    Add Objective
                </Button>
            </div>

            {/* Prerequisites */}
            <div>
                <h3 className="font-semibold mb-2 text-gray-700">Prerequisites</h3>
                {(programData.prerequisites ?? []).map((pre, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <TextField
                            placeholder="e.g., Basic understanding of HTML and CSS"
                            fullWidth
                            size="small"
                            value={pre}
                            onChange={(e) =>
                                handleListChange('prerequisites', index, e.target.value)
                            }
                        />
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeListItem('prerequisites', index)}
                        >
                            <Trash2 size={18} />
                        </IconButton>
                    </div>
                ))}
                <Button
                    size="small"
                    startIcon={<Plus size={16} />}
                    onClick={() => addListItem('prerequisites')}
                >
                    Add Prerequisite
                </Button>
            </div>
        </div>
    );
};

/* ---------- Lesson Editor ---------- */
const LessonEditor = ({ lesson, onLessonChange, onRemove }) => {
    const handleChange = (field, value) =>
        onLessonChange({ ...lesson, [field]: value });

    const handleNestedChange = (objectKey, field, value) =>
        onLessonChange({
            ...lesson,
            [objectKey]: { ...(lesson[objectKey] ?? {}), [field]: value },
        });

    return (
        <Paper elevation={2} className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <TextField
                    label="Lesson Title"
                    variant="standard"
                    size="small"
                    value={lesson.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="flex-grow"
                />
                <IconButton onClick={onRemove} size="small">
                    <Trash2 size={16} className="text-red-500" />
                </IconButton>
            </div>

            {/* Lesson Type */}
            <FormControl fullWidth size="small">
                <InputLabel>Lesson Type</InputLabel>
                <Select
                    value={lesson.lessonType || 'VIDEO'}
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="DOCUMENT">Document</MenuItem>
                    <MenuItem value="QUIZ">Quiz</MenuItem>
                </Select>
            </FormControl>

            {/* Content Based on Type */}
            {lesson.lessonType === 'VIDEO' && (
                <div className="p-3 bg-blue-50 rounded-md space-y-2 border border-blue-200">
                    <Typography variant="caption">Video Content</Typography>
                    <TextField
                        label="Video Title"
                        size="small"
                        fullWidth
                        value={lesson.video?.title || ''}
                        onChange={(e) => handleNestedChange('video', 'title', e.target.value)}
                    />
                    <TextField
                        label="Video URL"
                        size="small"
                        fullWidth
                        value={lesson.video?.url || ''}
                        onChange={(e) => handleNestedChange('video', 'url', e.target.value)}
                    />
                </div>
            )}

            {lesson.lessonType === 'DOCUMENT' && (
                <div className="p-3 bg-green-50 rounded-md space-y-2 border border-green-200">
                    <Typography variant="caption">Document Content</Typography>
                    <TextField
                        label="Document Title"
                        size="small"
                        fullWidth
                        value={lesson.document?.title || ''}
                        onChange={(e) =>
                            handleNestedChange('document', 'title', e.target.value)
                        }
                    />
                    <TextField
                        label="Document Link"
                        size="small"
                        fullWidth
                        value={lesson.document?.link || ''}
                        onChange={(e) =>
                            handleNestedChange('document', 'link', e.target.value)
                        }
                    />
                </div>
            )}

            {lesson.lessonType === 'QUIZ' && (
                <div className="p-3 bg-gray-100 rounded-md space-y-2">
                    <Typography variant="caption">
                        Link an existing quiz (enter Quiz ID)
                    </Typography>
                    <TextField
                        label="Quiz ID"
                        size="small"
                        fullWidth
                        type="number"
                        value={lesson.quizId || ''}
                        onChange={(e) => handleChange('quizId', e.target.value)}
                    />
                </div>
            )}
        </Paper>
    );
};

/* ---------- Section Editor ---------- */
const SectionEditor = ({ section, onSectionChange, onRemoveSection }) => {
    const handleTitleChange = (e) =>
        onSectionChange({ ...section, title: e.target.value });

    const handleAddLesson = () => {
        const newLesson = {
            id: `new-${Date.now()}`,
            title: '',
            type: 'VIDEO',
            video: {},
            document: {},
            quizId: null,
        };
        onSectionChange({
            ...section,
            lessons: [...(section.lessons || []), newLesson],
        });
    };

    const handleLessonChange = (updatedLesson) =>
        onSectionChange({
            ...section,
            lessons: (section.lessons || []).map((l) =>
                l.id === updatedLesson.id ? updatedLesson : l
            ),
        });

    const handleRemoveLesson = (lessonId) =>
        onSectionChange({
            ...section,
            lessons: (section.lessons || []).filter((l) => l.id !== lessonId),
        });

    return (
        <Accordion defaultExpanded className="mb-4 shadow-md bg-white">
            <AccordionSummary expandIcon={<ExpandMore />}>
                <div className="flex items-center w-full">
                    <TextField
                        fullWidth
                        variant="standard"
                        value={section.title || ''}
                        onChange={handleTitleChange}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Section Title"
                    />
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemoveSection();
                        }}
                        size="small"
                        className="ml-2"
                    >
                        <Trash2 size={16} className="text-red-500" />
                    </IconButton>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="space-y-3">
                    {(section.lessons || []).map((lesson) => (
                        <LessonEditor
                            key={lesson.id}
                            lesson={lesson}
                            onLessonChange={handleLessonChange}
                            onRemove={() => handleRemoveLesson(lesson.id)}
                        />
                    ))}
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Plus size={16} />}
                        onClick={handleAddLesson}
                    >
                        Add Lesson
                    </Button>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

/* ---------- Curriculum Editor ---------- */
const CurriculumEditor = ({ programData, setProgramData }) => {
    const handleAddSection = () => {
        const newSection = {
            id: `new-${Date.now()}`,
            title: 'New Section',
            lessons: [],
        };
        setProgramData((prev) => ({
            ...prev,
            sections: [...(prev.sections || []), newSection],
        }));
    };

    const handleSectionChange = (updatedSection) =>
        setProgramData((prev) => ({
            ...prev,
            sections: (prev.sections || []).map((s) =>
                s.id === updatedSection.id ? updatedSection : s
            ),
        }));

    const handleRemoveSection = (sectionId) =>
        setProgramData((prev) => ({
            ...prev,
            sections: (prev.sections || []).filter((s) => s.id !== sectionId),
        }));

    return (
        <div>
            {(programData.sections || []).map((section) => (
                <SectionEditor
                    key={section.id}
                    section={section}
                    onSectionChange={handleSectionChange}
                    onRemoveSection={() => handleRemoveSection(section.id)}
                />
            ))}
            <div className="mt-6">
                <Button
                    variant="outlined"
                    startIcon={<PlusCircle />}
                    onClick={handleAddSection}
                >
                    Add Section
                </Button>
            </div>
        </div>
    );
};

/* ---------- Main Component ---------- */
export const AdminProgramDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProgram, isLoading } = useSelector((state) => state.program);
    const jwt = localStorage.getItem('jwt');

    const [programData, setProgramData] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (id) dispatch(getProgramById(id));
        else {
            setProgramData({
                title: '',
                subtitle: '',
                description: '',
                category: '',
                price: '0.00',
                skillLevel: 'BEGINNER',
                learningObjectives: [''],
                prerequisites: [''],
                sections: [],
            });
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProgram && id) {
            setProgramData(JSON.parse(JSON.stringify(selectedProgram)));
        }
    }, [selectedProgram, id]);

    const handleSave = () => {
        const requestDTO = {
            ...programData,
            sections: (programData.sections || []).map((section) => ({
                ...section,
                id: String(section.id).startsWith('new-') ? null : section.id,
                lessons: (section.lessons || []).map((lesson) => ({
                    id: String(lesson.id).startsWith('new-') ? null : lesson.id,
                    title: lesson.title,
                    type: lesson.lessonType,
                    video: lesson.lessonType === 'VIDEO' ? lesson.video : null,
                    document: lesson.lessonType === 'DOCUMENT' ? lesson.document : null,
                    quizId: lesson.lessonType === 'QUIZ' ? lesson.quizId : null,
                })),
            })),
        };

        const action = id
            ? updateProgram(jwt, id, requestDTO)
            : createProgram(jwt, requestDTO);
        dispatch(action);
        navigate('/programs');
    };

    if (isLoading || !programData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8 pt-24">
            <Paper className="max-w-5xl mx-auto p-6 rounded-xl shadow-2xl">
                <Typography variant="h4" className="font-bold mb-4">
                    {id ? `Editing: ${programData.title || ''}` : 'Create a New Program'}
                </Typography>

                <Stepper activeStep={activeStep} className="mb-8">
                    {['Program Details', 'Build Curriculum'].map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 &&
                    <ProgramMetadataForm
                        programData={programData}
                        setProgramData={setProgramData}
                    />
                }
                {activeStep === 1 && (
                    <CurriculumEditor
                        programData={programData}
                        setProgramData={setProgramData}
                    />
                )}

                <div className="mt-8 flex justify-between">
                    <Button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((s) => s - 1)}
                    >
                        Back
                    </Button>
                    {activeStep === 1 ? (
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            {id ? 'Save Changes' : 'Create Program'}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => setActiveStep((s) => s + 1)}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </Paper>
        </div>
    );
};


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { PageTopBanner } from '../components/PageTop/PageTopBanner';
// import { AddQuiz } from '../components/Quiz/AddQuiz';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProgramById, updateProgram } from '../state/Program/Action';
// import { deleteQuiz, updateQuiz } from '../state/Quiz/Action';
// import { UpdateQuiz } from '../components/Quiz/UpdateQuiz';

// export const AdminProgramDetails = () => {
//     const { id } = useParams();
//     const [formData, setFormData] = useState(null);
//     const [error, setError] = useState('');

//     const [showQuizForm, setShowQuizForm] = useState(false);
//     const [showUpdateQuizForm, setShowUpdateQuizForm] = useState(null);
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem("jwt");
//     const { selectedProgram: program } = useSelector((store) => store.program)
//     useEffect(() => {
//         if (id) {
//             dispatch(getProgramById(id));
//         }
//         window.scrollTo(0, 0);
//     }, [dispatch, id]);

//     useEffect(() => {
//         if (program) {
//             setFormData(program);
//         }
//     }, [program]);
//     console.log(program)

//     if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
//     if (!program || !formData) return <div className="p-6 text-gray-600">Loading...</div>;

//     const handleInputChange = (key, value) => {
//         setFormData(prev => ({ ...prev, [key]: value }));
//     };

//     const handleVideoChange = (index, field, value) => {
//         const updated = [...formData.videos];
//         updated[index][field] = value;
//         setFormData(prev => ({ ...prev, videos: updated }));
//     };

//     const handleAddVideo = () => {
//         if (!formData.videos) formData.videos = [];

//         console.log(formData.videos)

//         const last = formData.videos[formData.videos.length - 1];
//         if (last && (!last.title || !last.url)) {
//             alert("Please fill the last video before adding a new one.");
//             return;
//         }
//         const updatedVideos = [...(formData.videos || []), { title: '', url: '' }];
//         setFormData(prev => ({ ...prev, videos: updatedVideos }));
//     };
//     const handleRemoveVideo = (index) => {
//         const updated = formData.videos.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, videos: updated }))
//     }

//     const handleDocumentChange = (index, field, value) => {
//         const updated = [...formData.documents];
//         updated[index][field] = value;
//         setFormData(prev => ({ ...prev, documents: updated }));
//     };

//     const handleAddDocument = () => {
//         const updatedDocuments = [...(formData.documents || []), { title: '', link: '' }];
//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
//     }
//     const handleDocumentDelete = (index) => {
//         const updated = formData.documents.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, documents: updated }));

//     }

//     const handleDeleteQuiz = async (id) => {
//         if (!jwt) {
//             showLogin();
//             console.log("open login bar");
//             return;
//         } else {
//             try {
//                 await dispatch(deleteQuiz(jwt, id));
//                 await dispatch(getProgramById(program.id));
//             } catch (err) {
//                 console.error('❌ Failed to add quiz:', err);
//                 alert('Failed to add quiz. See console for details.');
//             }
//             console.log(id);
//         }
//     }


//     const handleSave = async () => {
//         try {
//             if (id) {
//                 dispatch(updateProgram(jwt, id, formData));
//             }
//         } catch (err) {
//             alert('Failed to save program: ' + err.message);
//         }
//     };


//     return (
//         <div className='w-full min-h-screen flex-col space-y-5 pb-16'>
//             <PageTopBanner pageTitle="Edit Program" />
//             <div className='w-full px-4 md:px-16 sm:px-10'>
//                 <h1 className="text-2xl font-bold mb-4">Edit Program</h1>

//                 {/* Editable Program Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     {Object.entries(formData).map(([key, value]) => {
//                         if (['videos', 'documents', 'quizzes', 'id'].includes(key)) return null;
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
//                     {(formData.videos || []).map((video, index) => (
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
//                             <button onClick={() => handleRemoveVideo(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
//                         </div>
//                     ))}
//                     <button
//                         onClick={handleAddVideo}
//                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                         ➕ Add Video
//                     </button>
//                 </div>

//                 {/* Documents */}
//                 <div className="mb-6">
//                     <h2 className="font-semibold text-lg mb-2">Documents</h2>
//                     {(formData.documents || []).map((doc, index) => (
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
//                             <button
//                                 onClick={() => handleDocumentDelete(index)}
//                                 className="bg-red-500 text-white px-3 py-1 rounded">
//                                 Remove
//                             </button>
//                         </div>
//                     ))}
//                     <button
//                         onClick={handleAddDocument}
//                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                         ➕ Add Document
//                     </button>
//                 </div>

//                 <button
//                     onClick={handleSave}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     💾 Save Program
//                 </button>

//                 {/* Quizzes Section */}
//                 <div className="mt-10">
//                     <h2 className="text-xl font-semibold">Quizzes</h2>
//                     <ul className="mt-2 space-y-2">
//                         {(program.quizzes || []).map(quiz => (
//                             <li
//                                 key={quiz.id}
//                                 className="border p-3 rounded flex flex-col gap-2"
//                             >
//                                 <div className="flex justify-between items-center">
//                                     <span>{quiz.title}</span>
//                                     <div className="space-x-4">
//                                         <button
//                                             className="text-blue-600 hover:underline"
//                                             onClick={() =>
//                                                 setShowUpdateQuizForm((prev) => (prev === quiz.id ? null : quiz.id))
//                                             }
//                                         >
//                                             {showUpdateQuizForm === quiz.id ? "Close" : "Edit"}
//                                         </button>

//                                         <button
//                                             onClick={() => handleDeleteQuiz(quiz.id)}
//                                             className="text-red-600 hover:underline"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Show UpdateQuiz directly below the clicked quiz */}
//                                 {showUpdateQuizForm === quiz.id && (
//                                     <div className="mt-3">
//                                         <UpdateQuiz
//                                             programId={program.id}
//                                             programTitle={program.title}
//                                             quizId={quiz.id}
//                                         />
//                                     </div>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4">
//                         <button
//                             onClick={() => setShowQuizForm(prev => !prev)}
//                             className="bg-purple-600 text-white px-4 py-2 rounded"
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
// };


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

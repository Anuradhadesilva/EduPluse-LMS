// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Paper, Typography, Box, Button } from '@mui/material';
// import { PlayCircle, FileText, CheckSquare, ArrowLeft } from 'lucide-react';
// import { CourseContentSidebar } from './CourseContentSidebar';

// export const ProgramPlayer = ({ program }) => {
//     const navigate = useNavigate();
//     const [selectedContent, setSelectedContent] = useState(null);
//     const [completedItems, setCompletedItems] = useState(new Set());

//     // ✅ FIX: Find the first lesson in the first section to display by default
//     useEffect(() => {
//         if (program?.sections?.[0]?.lessons?.[0]) {
//             setSelectedContent(program.sections[0].lessons[0]);
//         }
//     }, [program]);

//     const handleContentSelect = (lesson) => {
//         setSelectedContent(lesson);
//         // Simulate marking content as complete when selected
//         setCompletedItems(prev => new Set(prev).add(lesson.id));
//     };

//     const renderContent = () => {
//         if (!selectedContent) {
//             return (
//                 <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-8 text-center">
//                     <PlayCircle size={64} className="text-gray-400 mb-4" />
//                     <Typography variant="h6" color="text.secondary">Select a lesson to begin.</Typography>
//                 </div>
//             );
//         }

//         // ✅ FIX: Destructure the properties from the lesson object correctly
//         const { lessonType, video, document, quiz, title } = selectedContent;

//         switch (lessonType) {
//             case 'VIDEO':
//                 if (!video || !video.url) return <Typography color="error">Video content is missing.</Typography>;
//                 const embedUrl = video.url.includes("embed") ? video.url : video.url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/");
//                 return (
//                     <div className="p-4 h-full flex flex-col"><div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-2xl flex-grow"><iframe src={embedUrl} title={title} frameBorder="0" allowFullScreen className="w-full h-full" /></div><Typography variant="h4" className="font-bold mt-6">{title}</Typography></div>
//                 );
//             case 'DOCUMENT':
//                 if (!document || !document.link) return <Typography color="error">Document link is missing.</Typography>;
//                 return (<div className="p-8 text-center flex flex-col items-center justify-center h-full"><FileText size={48} className="mx-auto text-blue-500 mb-4" /><Typography variant="h5" className="font-bold mb-2">{title}</Typography><Button variant="contained" href={document.link} target="_blank" rel="noopener noreferrer">Download Document</Button></div>);
//             case 'QUIZ':
//                 if (!quiz || !quiz.id) return <Typography color="error">Quiz is not linked correctly.</Typography>;
//                 return (<div className="p-8 text-center flex flex-col items-center justify-center h-full"><CheckSquare size={48} className="mx-auto text-green-500 mb-4" /><Typography variant="h5" className="font-bold mb-2">{title}</Typography><Button variant="contained" onClick={() => navigate(`/quiz/${quiz.id}`)}>Start Quiz</Button></div>);
//             default:
//                 return <Typography>Content type not supported.</Typography>;
//         }
//     };

//     return (
//         <div className="flex flex-col lg:flex-row h-screen bg-gray-100 pt-20"><main className="flex-1 flex flex-col p-4 lg:p-6"><Button onClick={() => navigate('/enrolled-programs')} startIcon={<ArrowLeft size={16} />} sx={{ alignSelf: 'flex-start', mb: 2 }}>Back to My Courses</Button><Paper className="flex-1 rounded-xl shadow-lg overflow-hidden flex items-center justify-center">{renderContent()}</Paper></main><aside className="w-full lg:w-[400px] flex-shrink-0 bg-white shadow-2xl lg:shadow-none lg:border-l lg:border-gray-200 h-full overflow-y-auto"><CourseContentSidebar program={program} selectedContent={selectedContent} onContentSelect={handleContentSelect} completedItems={completedItems} /></aside></div>
//     );
// };


// {/* <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen pt-20"></div> */ }
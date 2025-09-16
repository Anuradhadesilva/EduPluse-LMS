import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPrograms } from '../state/Program/Action';
import { ProgramCard } from '../components/Programs/ProgramCard';
import { Hero } from '../components/Hero/Hero'; // Assuming you have this component
import { Skeleton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Icon Components for Features Section ---
const FeatureIcon = ({ children }) => (
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto mb-4">
        {children}
    </div>
);
const BookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5a2.5 2.5 0 0 1 0-5H20V9H6.5a2.5 2.5 0 0 1 0-5H20V2H6.5A2.5 2.5 0 0 1 4 4.5v15z" /></svg>);
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const AwardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline></svg>);


export const Home = () => {

    const dispatch = useDispatch();
    const { programs, isLoading } = useSelector(state => state.program);

    const scrollContainerRef = useRef(null);
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8; // Scroll by 80% of the container width
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        dispatch(getAllPrograms());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const featuredPrograms = programs.slice(0, 3);

    const testimonials = [
        { name: "Sarah L.", quote: "This platform transformed my understanding of web development. The interactive quizzes were key!", avatar: "https://i.pravatar.cc/150?img=1" },
        { name: "Michael B.", quote: "As a busy professional, the flexible learning schedule was a game-changer. Highly recommended.", avatar: "https://i.pravatar.cc/150?img=2" },
        { name: "Jessica P.", quote: "I've taken several courses here and each one has exceeded my expectations. The content is top-notch.", avatar: "https://i.pravatar.cc/150?img=3" },
    ];

    return (
        <div className='w-full min-h-screen flex flex-col'>
            {/* Hero Section */}
            <Hero />

            {/* Featured Programs Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Explore Our Top Programs</h2>
                            <p className="text-gray-600">Hand-picked courses to help you achieve your learning goals.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <ChevronLeft />
                            </button>
                            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
                        >
                            {isLoading ? (
                                Array.from(new Array(4)).map((_, index) => (
                                    <div key={index} className="snap-start flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
                                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                            <Skeleton variant="rectangular" height={192} />
                                            <div className="p-4">
                                                <Skeleton variant="text" width="40%" />
                                                <Skeleton variant="text" />
                                                <Skeleton variant="text" width="80%" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                programs.map((program) => (
                                    <div key={program.id} className="snap-start flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
                                        <ProgramCard program={program} />
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link to="/programs" className="text-lg font-medium text-white bg-blue-600 px-8 py-3 rounded-md hover:bg-blue-700 shadow-md transform hover:-translate-y-1 transition-all duration-300">
                                View All Programs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Why Choose Us Section */}
            <div id="why-choose-us" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Why EduPlus is Different</h2>
                        <p className="mt-4 text-xl text-gray-500">Your success is our mission.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <FeatureIcon><BookIcon /></FeatureIcon>
                            <h3 className="text-lg font-medium text-gray-900">Expert-Led Content</h3>
                            <p className="mt-2 text-base text-gray-500">Learn from industry professionals with real-world experience and insights.</p>
                        </div>
                        <div>
                            <FeatureIcon><ClockIcon /></FeatureIcon>
                            <h3 className="text-lg font-medium text-gray-900">Flexible Learning</h3>
                            <p className="mt-2 text-base text-gray-500">Study at your own pace, anytime, anywhere. Fit learning into your life.</p>
                        </div>
                        <div>
                            <FeatureIcon><AwardIcon /></FeatureIcon>
                            <h3 className="text-lg font-medium text-gray-900">Interactive Quizzes</h3>
                            <p className="mt-2 text-base text-gray-500">Solidify your knowledge with hands-on quizzes and assessments.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">What Our Students Say</h2>
                        <p className="mt-4 text-xl text-gray-500">We're trusted by thousands of learners worldwide.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm">
                                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                <div className="mt-4 flex items-center">
                                    <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="bg-blue-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block">Start your learning journey today.</span>
                    </h2>
                    <Link to="/programs" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto">
                        Explore Programs
                    </Link>
                </div>
            </div>
        </div>
    );
};

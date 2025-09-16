import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero-1.png'; // Make sure this path is correct

export const Hero = () => {
    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full min-h-screen bg-sky-50">
            <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4">
                        Unlock Your Potential with <span className="text-blue-600">EduPlus</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The premier destination for online learning. Explore expert-led courses, take engaging quizzes, and achieve your goals.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Link to="/programs" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                            Get Started
                        </Link>
                        <button onClick={scrollToFeatures} className="bg-transparent text-gray-700 font-bold py-3 px-8 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img src={heroImg} alt="Online Learning Platform" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

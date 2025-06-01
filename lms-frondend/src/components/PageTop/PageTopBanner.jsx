import React, { useEffect } from 'react'
import heroImg from '../../assets/hero-1.png'
import { BreadCrum } from './BreadCrum';

export const PageTopBanner = ({ pageTitle }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full h-[300px] bg-[url('/src/assets/page-top-bg.png')] bg-no-repeat bg-cover flex items-center justify-center text-white relative">
            <div className='absolute  top-20 z-20 left-4 sm:left-10 md:left-16 '>
                <BreadCrum />
            </div>
            <div className='text-center mt-12 px-10'>
                <h1 className="md:text-4xl text-2xl font-bold mb-2">Welcome to Our Learning Platform {pageTitle}</h1>
                <p className="md:text-lg text-sm">Explore courses, take quizzes, and track your progress.</p>
            </div>
        </div>
    );
}

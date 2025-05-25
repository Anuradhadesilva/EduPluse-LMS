import React, { useEffect } from 'react'
import heroImg from '../../assets/hero-1.png'
import { BreadCrum } from './BreadCrum';

export const PageTopBanner = ({ pageTitle }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full h-[300px] bg-[url('/src/assets/page-top-bg.png')] bg-no-repeat bg-cover flex items-center justify-center text-white relative">
            <div className='absolute md:left-16 md:top-20 z-20 top-15 '>
                <BreadCrum />
            </div>
            <div className='text-center mt-12 px-10'>
                <h1 className="text-4xl font-bold mb-2">Welcome to Our Learning Platform {pageTitle}</h1>
                <p className="text-lg">Explore courses, take quizzes, and track your progress.</p>
            </div>
            {/* <div className=" w-full h-full absolute top-0 left-0 z-0" />
            <div className="z-10 text-center px-4">
                <h1 className="text-4xl font-bold mb-2">Welcome to Our Learning Platform {pageTitle}</h1>
                <p className="text-lg">Explore courses, take quizzes, and track your progress.</p>
            </div> */}
        </div>
    );
}

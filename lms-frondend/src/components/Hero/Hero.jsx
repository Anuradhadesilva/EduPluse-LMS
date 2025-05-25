import React from 'react'
import heroImg from '../../assets/hero-1.png'

function Hero() {
    return (
        <div className='w-full md:h-screen h-auto flex items-end justify-center md:px-16 sm:px-10 px-4 md:pt-0 md:pb-0 pt-[10ch] pb-8'>
            <div className='w-full flex items-center justify-between md:gap-16 gap-4 md:flex-nowrap flex-wrap md:flex-row flex-col-reverse'>
                <div className='md:w-1/2 w-full h-auto md:space-y-8 space-y-6'>
                    <h2 className='text-2xl font-semibold'>The Leader in Online Learning</h2>
                    <h2 className='text-6xl md:w-[500px] leading-tight font-bold bg-gradient-to-r from-indigo-500 via-sky-700 via-20% to-purple-700 bg-clip-text text-transparent'>
                        Join Today & Start Learning
                    </h2>
                    <h3 className='text-sm md:text-lg font-medium'>The best place to discover new learning resources, books, and courses</h3>
                    <div className='flex flex-row gap-4'>
                        <button className='bg-gradient-to-tr hover:bg-gradient-to-tl from-indigo-500 via-sky-700 via-20% to-purple-700 text-neutral-50cursor-pointer py-2 px-6 rounded-xl text-base font-semibold ease-in-out duration-300 text-white'>Get Started</button>
                        <button className='p-2 px-4 border border-gray-400 text-gray-700 rounded-xl text-base font-semibold ease-in-out duration-300'>Learn More</button>
                    </div>
                </div>
                <div className='md:w-1/2 w-full h-auto md:space-y-8 space-y-6'>
                    <img src={heroImg} alt="" className='' />
                </div>

            </div>
        </div>
    )
}

export default Hero
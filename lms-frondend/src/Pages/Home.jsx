import React, { useEffect } from 'react'
import Hero from '../components/Hero/Hero';

export const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <div className='w-full min-h-screen flex flex-col pb-16'>
            <Hero />
        </div>
    )
}

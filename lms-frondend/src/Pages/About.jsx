import React, { useEffect } from "react";
import { Users, BookOpen, Award } from "lucide-react";

export const About = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <section
            id="about"
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-20 flex flex-col items-center"
        >
            <h2 className="text-4xl font-bold text-blue-700 mb-6">About Our LMS</h2>
            <p className="max-w-3xl text-lg text-gray-600 text-center leading-relaxed mb-12">
                Our Learning Management System is designed to provide learners with a
                seamless, engaging, and interactive educational journey. From structured
                programs and quizzes to real-time progress tracking, we empower learners
                to achieve their goals with confidence.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl">
                <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <Users className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                        10k+ Learners
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Thousands of learners trust our platform to upskill and succeed.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <BookOpen className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="font-bold text-xl text-gray-800 mb-2">500+ Courses</h3>
                    <p className="text-gray-600 text-sm">
                        Explore diverse programs designed by industry experts.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
                    <Award className="w-12 h-12 text-yellow-500 mb-4" />
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                        Expert Tutors
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Learn from certified instructors with years of experience.
                    </p>
                </div>
            </div>

            {/* Tutor Spotlight */}
            <div className="max-w-6xl w-full">
                <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
                    Meet Our Tutors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Dr. Sarah Johnson",
                            title: "Data Science Expert",
                            img: "https://via.placeholder.com/150",
                        },
                        {
                            name: "Michael Lee",
                            title: "Full-Stack Developer",
                            img: "https://via.placeholder.com/150",
                        },
                        {
                            name: "Sophia Martinez",
                            title: "UI/UX Designer",
                            img: "https://via.placeholder.com/150",
                        },
                    ].map((tutor, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition"
                        >
                            <img
                                src={tutor.img}
                                alt={tutor.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
                            />
                            <h4 className="font-bold text-lg text-gray-800">
                                {tutor.name}
                            </h4>
                            <p className="text-sm text-gray-500">{tutor.title}</p>
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

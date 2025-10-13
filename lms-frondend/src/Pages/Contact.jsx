import React, { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <section
            id="contact"
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20 flex flex-col items-center"
        >
            <h2 className="text-4xl font-bold text-blue-700 mb-6">Contact Us</h2>
            <p className="max-w-2xl text-lg text-gray-600 text-center mb-12">
                Have questions about our LMS, programs, or tutors? Reach out to us—we’d
                love to hear from you!
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-16">
                <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
                    <MapPin className="w-10 h-10 text-red-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-gray-800">Our Address</h3>
                    <p className="text-gray-600 text-sm mt-2">
                        61/2 Revatha Road, Balapitiya, Srilanka
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
                    <Mail className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-gray-800">Email Us</h3>
                    <p className="text-gray-600 text-sm mt-2">support@lms.com</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
                    <Phone className="w-10 h-10 text-green-600 mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-gray-800">Call Us</h3>
                    <p className="text-gray-600 text-sm mt-2">+94 77-123-4567</p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Send Us a Message
                </h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

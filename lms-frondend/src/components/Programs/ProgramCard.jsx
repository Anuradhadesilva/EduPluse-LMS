import React from 'react'
import { Link } from 'react-router-dom'

export const ProgramCard = ({ image, category, rating, title, lessions, students, duration, price, id, onEnroll, isEnrolled }) => {

    return (
        <div className="bg-white w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 space-y-2">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <span className="text-sm text-blue-600 font-semibold">{category}</span>
                <h2 className="text-lg font-bold mt-1 mb-2"> <Link to={`/programs/${id}`}> {title}</Link></h2>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    ⭐ {rating} &nbsp; | &nbsp; {students}
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li>📚 {lessions}</li>
                    <li>⏱️ {duration}</li>
                </ul>
                <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-semibold">{price}</span>
                    {isEnrolled ? (
                        <button
                            className="bg-gray-400 text-white text-sm px-3 py-1 rounded-full cursor-not-allowed"
                            disabled
                        >
                            Enrolled
                        </button>
                    ) : (
                        <button
                            className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition"
                            onClick={onEnroll}
                        >
                            Enroll
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

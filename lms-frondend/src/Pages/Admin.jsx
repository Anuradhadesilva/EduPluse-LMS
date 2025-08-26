import React, { useContext, useState } from 'react';
import { AppContext } from '../Contexts/AppContext';
import axios, { Axios } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProgram } from '../state/Program/Action';


export const Admin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const [newProgram, setNewProgram] = useState({
        title: '',
        category: '',
        lessons: '',
        students: '',
        rating: '',
        duration: '',
        price: '',
        image: ''
    });

    const handleChnage = (e) => {
        setNewProgram({ ...newProgram, [e.target.name]: e.target.value })
    }
    const handleAddProgram = async (e) => {
        e.preventDefault();
        if (!jwt) {
            alert("❌ Please login first");
            return;
        }
        try {
            dispatch(createProgram(jwt, newProgram));
            setNewProgram({
                title: '',
                category: '',
                lessons: '',
                students: '',
                rating: '',
                duration: '',
                price: '',
                image: ''
            });

        } catch (error) {
            console.error('❌ Failed to add program:', error);
            alert('Failed to add program. See console for details.');
        }
    };


    return (
        <div className='w-full min-h-screen flex-col space-y-5 pt-16'>
            <div className="min-h-screen p-6">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Add Program</h2>
                    <input
                        name="title"
                        value={newProgram.title}
                        onChange={handleChnage}
                        placeholder="Title"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="category"
                        value={newProgram.category}
                        onChange={handleChnage}
                        placeholder="Category"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="lessons"
                        value={newProgram.lessons}
                        onChange={handleChnage}
                        placeholder="Lessons"
                        type="number"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="students"
                        value={newProgram.students}
                        onChange={handleChnage}
                        placeholder="Students"
                        type="number"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="rating"
                        value={newProgram.rating}
                        onChange={handleChnage}
                        placeholder="Rating"
                        type="number"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="duration"
                        value={newProgram.duration}
                        onChange={handleChnage}
                        placeholder="Duration"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="price"
                        value={newProgram.price}
                        onChange={handleChnage}
                        placeholder="Price"
                        className="border p-2 w-full mb-2"
                    />

                    <input
                        name="image"
                        value={newProgram.image}
                        onChange={handleChnage}
                        placeholder="Image URL"
                        className="border p-2 w-full mb-2"
                    />

                    <button
                        onClick={handleAddProgram}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Program
                    </button>
                </div>
            </div>
        </div>
    );
};
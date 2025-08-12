// components/LoginSidebar.jsx
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';


export const Login = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <>
            {isOpen && (
                <div

                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6 h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Login</h2>
                        <IoCloseCircleOutline
                            size={28}
                            onClick={onClose}
                            className="cursor-pointer"
                        />
                    </div>

                    <form className="space-y-4" >
                        <div>
                            <label className="block mb-1 text-gray-700">Email:</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 "
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-800">Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 "
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 "
                        >
                            Login
                        </button>
                        <p className='text-sm underline text-center'>Forgot your password</p>
                        <Link
                            to='/create-account'
                            className="block w-full text-black text-center border border-black py-3"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Create Account
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

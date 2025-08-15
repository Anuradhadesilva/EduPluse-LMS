// components/LoginSidebar.jsx
import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../state/Authentication/Action';



export const Login = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { isLoading, error } = useSelector(state => state.auth);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ userData: loginData, navigate }));
    };
    return (
        <>
            {isOpen && (
                <div

                    className="fixed inset-0  bg-opacity-40 z-40"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-blue-50 shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
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

                    <form className="space-y-4" onSubmit={handleSubmit} >
                        <div>
                            <label className="block mb-1 text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 "
                                value={loginData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-800">Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 "
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
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

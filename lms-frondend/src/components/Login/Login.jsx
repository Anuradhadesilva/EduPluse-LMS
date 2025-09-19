import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeLoginModal } from '../../state/UI/uiSlice';
import { loginUser, registerUser, clearAuthError } from '../../state/Authentication/Action';
import { IoClose } from "react-icons/io5";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoginModalOpen } = useSelector(state => state.ui);
    const { auth } = useSelector(state => state);
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });


    useEffect(() => {
        if (isLoginModalOpen) {
            dispatch(clearAuthError());
        }
    }, [isLoginModalOpen, dispatch]);

    const handleClose = () => dispatch(closeLoginModal());

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the navigate function along with the form data
        const reqData = { userData: formData, navigate };
        if (isRegistering) {
            dispatch(registerUser(reqData));
        } else {
            dispatch(loginUser(reqData));
        }
    };

    // Function to toggle between Login and Register forms
    const toggleFormType = () => {
        dispatch(clearAuthError()); // Clear errors when switching
        setIsRegistering(!isRegistering);
        setFormData({ fullName: '', email: '', password: '' }); // Reset form fields
    };

    if (!isLoginModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-2">
                    {isRegistering ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    {isRegistering ? 'Join to start your learning journey.' : 'Log in to continue.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    )}
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

                    {auth.error && <p className="text-red-500 text-sm text-center mt-2">{auth.error}</p>}

                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300" disabled={auth.isLoading}>
                        {auth.isLoading ? 'Loading...' : (isRegistering ? 'Register' : 'Login')}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <button type="button" onClick={toggleFormType} className="ml-1 text-blue-600 font-semibold hover:underline">
                        {isRegistering ? 'Login' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};


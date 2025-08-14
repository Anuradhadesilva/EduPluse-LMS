import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import navItems from "../../constants/navbarData";
import { FiBookOpen } from "react-icons/fi";
import { AppContext } from "../../Contexts/AppContext";
import { Login } from "../Login/Login";
import { LuMenu } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@mui/material";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [openLoginBar, setOpenLoginBar] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

    // const { role, setRole } = useContext(AppContext);

    const location = useLocation(); // Get the current location

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    // Function to handle scroll event
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    // Adding event listener on mount and removing on unmount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <nav className="bg-white shadow-md">
                {/* Top navbar */}
                <div
                    id="navbar"
                    className={`w-full h-[8ch] backdrop-blur-sm flex items-center justify-between md:px-4 sm:px-4 px-4 fixed top-0 transition-all ease-in-out duration-300 z-50 ${isScrolled ? "bg-sky-50/50 border-b border-neutral-200" : "bg-transparent"
                        }`}
                >
                    {/* left: mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleNavbar} aria-label="Open menu">
                            {!isOpen ? <LuMenu size={28} /> : <IoCloseCircleOutline size={28} />}
                        </button>
                    </div>

                    {/* brand */}
                    <div className="flex items-center gap-2 md:pr-16 pr-0">
                        <Link to="/" className="text-lg font-semibold text-sky-700 flex items-center gap-x-2">
                            <FiBookOpen size={24} />
                            EduPlus
                        </Link>
                    </div>

                    {/* desktop menu + actions */}
                    <div className="hidden md:flex flex-1 items-center justify-between">
                        <ul className="flex items-center gap-4">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.path}
                                        className={`hover:text-sky-700 ease-in-out duration-300 ${location.pathname === item.path
                                            ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-700 to-purple-700 font-semibold"
                                            : "text-neutral-700"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="flex items-center gap-4">
                        {/* <button
                            onClick={() => setRole(role === "admin" ? "user" : "admin")}
                            className="px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-indigo-500 via-sky-700 to-purple-700"
                        >
                            {role === "admin" ? "User" : "Admin"}
                        </button> */}

                        {/* {role === "admin" && (
                            <Link
                                to="/admin"
                                className="px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-red-500 via-pink-600 to-purple-700"
                            >
                                Admin Panel
                            </Link>
                        )} */}


                        <button
                            variant="outlined"
                            href="#outlined-buttons"
                            className="px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-red-500 via-pink-600 to-purple-700"
                            onClick={() => setOpenLoginBar(true)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay (only on small screens when drawer open) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={closeNavbar}
                    aria-hidden="true"
                />
            )}

            {/* Mobile drawer (slides from left, 70% width on small screens) */}
            <aside
                className={`fixed md:hidden top-0 left-0 h-full w-[70%] max-w-[420px] bg-sky-50 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isOpen}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <Link to="/" onClick={closeNavbar} className="flex items-center gap-2 text-sky-700 font-semibold">
                        <FiBookOpen size={20} />
                        EduPlus
                    </Link>
                    <button onClick={closeNavbar} aria-label="Close menu">
                        <IoCloseCircleOutline size={28} />
                    </button>
                </div>

                <nav className="p-6 space-y-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={() => {
                                closeNavbar();
                            }}
                            className={`block text-lg ${location.pathname === item.path ? "font-semibold text-indigo-700" : "text-neutral-700"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Login modal / drawer */}
            <Login isOpen={openLoginBar} onClose={() => setOpenLoginBar(false)} />
        </>
    );
};

export default Navbar;

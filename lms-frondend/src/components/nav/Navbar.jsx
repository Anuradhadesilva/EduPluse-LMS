import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navItems from "../../constants/navbarData";
import { FiBookOpen } from "react-icons/fi";
import { Login } from "../Login/Login";
import { LuMenu } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Avatar, Divider, MenuItem, Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/Authentication/Action";
import { openLoginModal } from "../../state/UI/uiSlice";

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useSelector(store => store);

    const handleOpenLoginModal = () => dispatch(openLoginModal());
    const handleLogout = () => {
        dispatch(logout());
        handleCloseUserMenu();
        navigate("/");
    };

    const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorEl(null);
    const isUserMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigateTo = (path) => {
        navigate(path);
        handleCloseUserMenu();
    };

    return (
        <>
            <nav className={`w-full h-[8ch] backdrop-blur-sm flex items-center justify-between md:px-16 sm:px-10 px-4 fixed top-0 transition-colors ease-in-out duration-300 z-50 ${isScrolled ? "bg-white/80 border-b border-gray-200" : "bg-transparent"}`}>
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoCloseCircleOutline size={28} /> : <LuMenu size={28} />}
                    </button>
                    <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-x-2">
                        <FiBookOpen size={24} />
                        EduPlus
                    </Link>
                </div>

                {/* Center Navigation */}
                <div className="hidden md:flex flex-1 items-center justify-center">
                    <ul className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link to={item.path} className={`pb-1 border-b-2 transition-colors duration-300 ${location.pathname === item.path ? "text-blue-600 border-blue-600 font-semibold" : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300"}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side: Auth buttons or User Avatar */}
                <div className="flex items-center gap-4">
                    {auth.user ? (
                        <>
                            <Avatar onClick={handleOpenUserMenu} className="cursor-pointer bg-blue-600 text-white">
                                {auth.user.fullName[0].toUpperCase()}
                            </Avatar>
                            <Popover open={isUserMenuOpen} anchorEl={anchorEl} onClose={handleCloseUserMenu} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                <div className="p-4 min-w-[240px]">
                                    <Typography variant="subtitle1" fontWeight="bold">{auth.user.fullName}</Typography>
                                    <Typography variant="body2" color="text.secondary">{auth.user.email}</Typography>
                                    <Divider sx={{ my: 1 }} />
                                    {/* ✅ --- LINK TO PROFILE PAGE --- */}
                                    <MenuItem onClick={() => navigateTo("/profile")}>View Profile</MenuItem>
                                    <MenuItem onClick={() => navigateTo("/dashboard")}>Dashboard</MenuItem>
                                    {auth.role === 'ROLE_ADMIN' && <MenuItem onClick={() => navigateTo("/admin/programs")}>Admin Panel</MenuItem>}
                                    <MenuItem onClick={handleLogout} sx={{ color: "red" }}>Logout</MenuItem>
                                </div>
                            </Popover>
                        </>
                    ) : (
                        <button onClick={handleOpenLoginModal} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors">
                            Login
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Drawer and Login Modal would go here as before */}
            <Login />
        </>
    );
};

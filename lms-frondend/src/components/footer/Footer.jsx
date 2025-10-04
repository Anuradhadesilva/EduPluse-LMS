import React from 'react';
import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { Button, TextField, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Logo & Mission */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                        <Link to="/" className="text-3xl font-bold text-white flex items-center gap-x-2">
                            <FiBookOpen size={32} className="text-blue-400" />
                            EduPlus
                        </Link>
                        <Typography variant="body2" className="text-slate-400">
                            Empowering learners across the globe with accessible and high-quality educational content.
                        </Typography>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <Typography variant="h6" className="font-semibold tracking-wide">Quick Links</Typography>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link to="/programs" className="text-slate-400 hover:text-blue-400 transition-colors">All Courses</Link></li>
                            <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="text-slate-400 hover:text-blue-400 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <Typography variant="h6" className="font-semibold tracking-wide">Legal</Typography>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="space-y-4">
                        <Typography
                            variant="h6"
                            className="font-semibold tracking-wide">Stay Updated
                        </Typography>
                        <Typography variant="body2" className="text-slate-400">
                            Join our newsletter for the latest courses and offers.
                        </Typography>
                        <div className="flex gap-x-2 pt-2">
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Enter your email"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                    },
                                    '& .MuiInputBase-input': { color: 'white' }
                                }}
                            />
                            <Button variant="contained" color="primary">Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <Typography variant="body2" className="text-slate-500">
                        &copy; {new Date().getFullYear()} EduPlus. All Rights Reserved.
                    </Typography>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="https://twitter.com" className="text-slate-500 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                        <a href="https://facebook.com" className="text-slate-500 hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
                        <a href="https://instagram.com" className="text-slate-500 hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
                        <a href="https://linkedin.com" className="text-slate-500 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
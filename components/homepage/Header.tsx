'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            setCurrentDate(now.toLocaleDateString('en-US', options));
        };

        updateDate();
        // Update date every minute
        const interval = setInterval(updateDate, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-white border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Navigation Bar */}
                <div className="flex items-center py-2 border-b border-gray-200">
                    {/* Logo */}
                    <div className="bg-red-600 w-15 h-15 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M3</span>
                    </div>

                    {/* Primary Navigation Links */}
                    <nav className="flex items-center ml-4 ">
                        <Link
                            href="#front-page"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <div className="w-px h-4 bg-gray-300 mx-4"></div>
                        <Link
                            href="#about"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            About
                        </Link>
                        <div className="w-px h-4 bg-gray-300 mx-4"></div>
                        <Link
                            href="/essays"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Writing
                        </Link>
                        <div className="w-px h-4 bg-gray-300 mx-4"></div>
                        <Link
                            href="#archives"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Projects
                        </Link>
                        <div className="w-px h-4 bg-gray-300 mx-4"></div>
                        <Link
                            href="mailto:mumbamarkian@gmail.com"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                        <div className="w-px h-4 bg-gray-300 mx-4"></div>
                        <div className="relative group">
                            <button className="text-black font-inter hover:text-gray-600 transition-colors duration-200 flex items-center">
                                More
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="py-1">
                                    <Link
                                        href="https://github.com/markmumba"
                                        target="_blank"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        GitHub
                                    </Link>
                                    <Link
                                        href="https://linkedin.com/in/markmumba"
                                        target="_blank"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        LinkedIn
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Sub-Navigation/Tagline Section */}
                <div className="flex items-center py-1 ml-6">

                    {/* Sub-navigation content */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs flex-1">
                        <p className="text-black italic mb-1 sm:mb-0">
                            The personal website of Mark Mumba
                        </p>
                        <div className="flex items-center space-x-4">
                            <span className="text-black font-inter">
                                {currentDate}
                            </span>
                            <span className="text-black font-inter">
                                &quot;Engineer, learner, occasional philosopher&quot;
                            </span>
                        </div>
                    </div>
                </div>

                {/* Featured Section Label */}
                <div className="border-t border-gray-200 ">
                    <div className="flex items-center">
                        <span className="text-red-600 font-bold mr-2">A1</span>
                        <span className="text-black font-bold">|</span>
                        <span className="text-black font-bold ml-2">FEATURED</span>
                    </div>
                    <div className="flex space-x-1 mt-1">
                        <div className="w-8 h-0.5 bg-black"></div>
                        <div className="w-8 h-0.5 bg-black"></div>
                        <div className="w-12 h-0.5 bg-black"></div>
                    </div>
                </div>
            </div>
            <hr className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-black my-2'></hr>
            <hr className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-black my-2'></hr>

        </header>
    );
};

export default Header; 
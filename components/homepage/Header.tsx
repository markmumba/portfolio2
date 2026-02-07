'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((open) => !open);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMoreMenu = () => {
        setIsMoreOpen((open) => !open);
    };

    const closeMoreMenu = () => {
        setIsMoreOpen(false);
    };

    return (
        <header className=" border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Navigation Bar */}
                <div className="flex items-center justify-between py-2 border-b border-black">
                    {/* Logo */}
                    <div className="bg-red-600 w-15 h-15 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M3</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center ml-4">
                        <Link
                            href="#front-page"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <div className="w-px h-4 bg-black mx-4"></div>
                        <Link
                            href="#about"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            About
                        </Link>
                        <div className="w-px h-4 bg-black mx-4"></div>
                        <Link
                            href="/essays"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Writing
                        </Link>
                        <div className="w-px h-4 bg-black mx-4"></div>
                        <Link
                            href="#archives"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Projects
                        </Link>
                        <div className="w-px h-4 bg-black mx-4"></div>
                        <Link
                            href="/resume"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Resume
                        </Link>
                        <div className="w-px h-4 bg-black mx-4"></div>
                        <Link
                            href="mailto:mumbamarkian@gmail.com"
                            className="text-black font-inter hover:text-gray-600 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                        <div className="w-px h-4 bg-black mx-4"></div>
                        <div
                            className="relative"
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                                    closeMoreMenu();
                                }
                            }}
                        >
                            <button
                                type="button"
                                onClick={toggleMoreMenu}
                                onKeyDown={(event) => {
                                    if (event.key === 'Escape') {
                                        closeMoreMenu();
                                    }
                                }}
                                aria-haspopup="true"
                                aria-expanded={isMoreOpen}
                                aria-controls="more-menu"
                                className="text-black font-inter hover:text-gray-600 transition-colors duration-200 flex items-center"
                            >
                                More
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isMoreOpen && (
                                <div
                                    id="more-menu"
                                    className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-md shadow-lg transition-opacity duration-200 z-10"
                                >
                                <div className="py-1">
                                    <Link
                                        href="https://github.com/markmumba"
                                        target="_blank"
                                        onClick={closeMoreMenu}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        GitHub
                                    </Link>
                                    <Link
                                        href="https://linkedin.com/in/markmumba"
                                        target="_blank"
                                        onClick={closeMoreMenu}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        LinkedIn
                                    </Link>
                                </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Hamburger Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex items-center justify-center w-8 h-8 text-black hover:text-gray-600 transition-colors duration-200"
                        aria-label="Toggle mobile menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-b border-black bg-white">
                        <nav className="py-4 space-y-4">
                            <Link
                                href="#front-page"
                                onClick={closeMobileMenu}
                                className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                href="#about"
                                onClick={closeMobileMenu}
                                className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                            >
                                About
                            </Link>
                            <Link
                                href="/essays"
                                onClick={closeMobileMenu}
                                className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                            >
                                Writing
                            </Link>
                            <Link
                                href="#archives"
                                onClick={closeMobileMenu}
                                className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/resume"
                                onClick={closeMobileMenu}
                                className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                            >
                                Resume
                            </Link>
                            <Link
                                href="mailto:mumbamarkian@gmail.com"
                                onClick={closeMobileMenu}
                                className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                            >
                                Contact
                            </Link>
                            <div className="pt-2 border-t border-gray-200">
                                <p className="text-sm text-gray-600 font-inter mb-2">Social Links</p>
                                <Link
                                    href="https://github.com/markmumba"
                                    target="_blank"
                                    onClick={closeMobileMenu}
                                    className="block text-black font-inter hover:text-gray-600 transition-colors duration-200 mb-2"
                                >
                                    GitHub
                                </Link>
                                <Link
                                    href="https://linkedin.com/in/markmumba"
                                    target="_blank"
                                    onClick={closeMobileMenu}
                                    className="block text-black font-inter hover:text-gray-600 transition-colors duration-200"
                                >
                                    LinkedIn
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}

                {/* Sub-Navigation/Tagline Section */}
                <div className="flex items-center py-1 ml-2 md:ml-6">
                    {/* Sub-navigation content */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs flex-1">
                        <p className="text-black italic mb-1 sm:mb-0 hidden sm:block">
                            The personal website of Mark Mumba
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                            <span className="text-black font-inter text-xs sm:text-xs">
                                {currentDate}
                            </span>
                            <span className="text-black font-inter text-xs sm:text-xs hidden lg:block">
                                &quot;Engineer, learner, occasional philosopher&quot;
                            </span>
                        </div>
                    </div>
                </div>

                {/* Featured Section Label */}
                <div className="border-t border-black">
                    <div className="flex items-center">
                        <span className="text-red-600 font-bold mr-2 text-sm">A1</span>
                        <span className="text-black font-bold text-sm">|</span>
                        <span className="text-black font-bold ml-2 text-sm">FEATURED</span>
                    </div>
                    <div className="flex space-x-1 mt-1">
                        <div className="w-6 sm:w-8 h-0.5 bg-black"></div>
                        <div className="w-6 sm:w-8 h-0.5 bg-black"></div>
                        <div className="w-8 sm:w-12 h-0.5 bg-black"></div>
                    </div>
                </div>
            </div>
            <hr className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-black my-2'></hr>
            <hr className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-black my-2'></hr>
        </header>
    );
};

export default Header; 

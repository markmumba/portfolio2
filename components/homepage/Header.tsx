'use client';

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
        <header className="bg-newspaper-white border-b-4 border-black shadow-lg newspaper-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Masthead */}
                <div className="py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-newspaper font-black text-black tracking-tight leading-tight">
                            MARK MUMBA TECH JOURNAL
                        </h1>
                        <p className="text-lg md:text-xl text-newspaper-gray mt-3 font-newspaper italic">
                            &quot;Building the backbone of tomorrow&apos;s applications&quot;
                        </p>
                        <div className="text-sm text-newspaper-gray mt-3 font-mono border-t border-gray-300 pt-2 inline-block">
                            {currentDate}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="border-t-2 border-black py-4">
                    <ul className="flex flex-wrap justify-center items-center space-x-6 md:space-x-12 text-sm md:text-base font-newspaper">
                        <li>
                            <a
                                href="#front-page"
                                className="flex items-center space-x-1 hover:text-accent-red transition-colors duration-200 font-medium"
                            >
                                <span className="text-lg">📰</span>
                                <span>Front Page</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#archives"
                                className="flex items-center space-x-1 hover:text-accent-red transition-colors duration-200 font-medium"
                            >
                                <span className="text-lg">📂</span>
                                <span>Archives</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#essays"
                                className="flex items-center space-x-1 hover:text-accent-red transition-colors duration-200 font-medium"
                            >
                                <span className="text-lg">🧠</span>
                                <span>Essays</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#investigations"
                                className="flex items-center space-x-1 hover:text-accent-red transition-colors duration-200 font-medium"
                            >
                                <span className="text-lg">🔍</span>
                                <span>Tech Investigations</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="flex items-center space-x-1 hover:text-accent-red transition-colors duration-200 font-medium"
                            >
                                <span className="text-lg">👤</span>
                                <span>About the Editor</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 
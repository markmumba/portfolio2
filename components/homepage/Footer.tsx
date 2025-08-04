const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-newspaper-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* Contact Information */}
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-2">
                                Contact the Editor
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">📧</span>
                                    <a
                                        href="mailto:mark@example.com"
                                        className="text-newspaper-gray font-newspaper hover:text-accent-red transition-colors duration-200"
                                    >
                                        mark@example.com
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">📍</span>
                                    <span className="text-newspaper-gray font-newspaper">
                                        Nairobi, Kenya
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">🌐</span>
                                    <span className="text-newspaper-gray font-newspaper">
                                        Available for remote work worldwide
                                    </span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6">
                                <h4 className="text-sm font-mono uppercase tracking-wider text-accent-red mb-3">
                                    Follow the Journal
                                </h4>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://github.com/markmumba"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-newspaper-gray hover:text-accent-red transition-colors duration-200"
                                    >
                                        <span className="text-lg">🐙</span>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/markmumba"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-newspaper-gray hover:text-accent-red transition-colors duration-200"
                                    >
                                        <span className="text-lg">💼</span>
                                    </a>
                                    <a
                                        href="https://twitter.com/markmumba"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-newspaper-gray hover:text-accent-red transition-colors duration-200"
                                    >
                                        <span className="text-lg">🐦</span>
                                    </a>
                                    <a
                                        href="https://medium.com/@markmumba"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-newspaper-gray hover:text-accent-red transition-colors duration-200"
                                    >
                                        <span className="text-lg">📝</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-2">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#front-page"
                                        className="text-newspaper-gray font-newspaper hover:text-accent-red transition-colors duration-200"
                                    >
                                        Front Page
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#archives"
                                        className="text-newspaper-gray font-newspaper hover:text-accent-red transition-colors duration-200"
                                    >
                                        Archives
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#essays"
                                        className="text-newspaper-gray font-newspaper hover:text-accent-red transition-colors duration-200"
                                    >
                                        Essays
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#about"
                                        className="text-newspaper-gray font-newspaper hover:text-accent-red transition-colors duration-200"
                                    >
                                        About the Editor
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Signup */}
                        <div>
                            <h3 className="text-xl font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-2">
                                Stay Updated
                            </h3>
                            <p className="text-sm text-newspaper-gray font-newspaper mb-4">
                                Get weekly insights on backend architecture and engineering leadership.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-3 py-2 border-2 border-black text-black font-newspaper-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent-red"
                                />
                                <button className="w-full bg-accent-red text-white px-4 py-2 text-sm font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="border-t-2 border-gray-300 py-6">
                    <div className="text-center">
                        <h3 className="text-lg font-newspaper font-bold text-black mb-3">
                            Ready to Build Something Amazing?
                        </h3>
                        <p className="text-newspaper-gray font-newspaper mb-4">
                            Let's collaborate on your next project. I'm always interested in challenging problems and meaningful work.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="mailto:mark@example.com"
                                className="inline-block bg-black text-white px-6 py-3 font-newspaper-sans hover:bg-gray-800 transition-colors duration-200 border-2 border-black"
                            >
                                Start a Conversation
                            </a>
                            <a
                                href="/resume.pdf"
                                className="inline-block border-2 border-black text-black px-6 py-3 font-newspaper-sans hover:bg-black hover:text-white transition-colors duration-200"
                            >
                                Download Résumé
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t-2 border-gray-300 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-newspaper-gray font-mono">
                        <div>
                            © {currentYear} Mark Mumba Tech Journal. All rights reserved.
                        </div>
                        <div className="flex space-x-4 mt-2 md:mt-0">
                            <a
                                href="/privacy"
                                className="hover:text-accent-red transition-colors duration-200"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="hover:text-accent-red transition-colors duration-200"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
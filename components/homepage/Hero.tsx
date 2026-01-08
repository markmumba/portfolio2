import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section id="front-page" className="py-8 md:py-16 ">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Main Content */}
                    <div className="order-2 lg:order-1">
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4 font-heading">
                                Welcome to my digital living room
                            </h1>
                            <div className="text-xs sm:text-sm text-gray-600 font-inter uppercase tracking-wider">
                                ENGINEER • LEARNER • OCCASIONAL PHILOSOPHER
                            </div>
                        </div>

                        <p className="text-base sm:text-lg text-gray-600 font-inter leading-relaxed mb-6">
                            Hi, I&apos;m Mark. I&apos;m a software engineer who believes the best code solves real problems for real people.
                            This is where I share my learnings, explore ideas, and occasionally ramble about the intersection of technology and life.
                        </p>

                        <div className="bg-white p-3 sm:p-4 border-l-4 border-black mb-6 sm:mb-8">
                            <h3 className="text-sm font-bold text-black mb-2">Currently:</h3>
                            <p className="text-xs sm:text-sm text-gray-700 font-inter">
                                Exploring distributed systems, reading &quot;Designing Data-Intensive Applications&quot;,
                                and diving deep into the psychology of debugging.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                            <Link
                                href="/essays"
                                className="w-full sm:w-auto text-center bg-black text-white px-4 sm:px-6 py-3 font-inter hover:bg-gray-800 transition-colors duration-200 text-sm"
                            >
                                Read My Writing →
                            </Link>
                            <Link
                                href="/resume"
                                className="w-full sm:w-auto text-center border border-black text-black px-4 sm:px-6 py-3 font-inter hover:bg-gray-100 transition-colors duration-200 text-sm"
                            >
                                View Resume →
                            </Link>
                            <Link
                                href="#archives"
                                className="w-full sm:w-auto text-center sm:text-left text-gray-600 font-inter hover:text-black transition-colors duration-200 text-sm"
                            >
                                View Projects →
                            </Link>
                        </div>
                    </div>

                    {/* Portrait */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 relative overflow-hidden">
                                <Image
                                    src="/hero.webp"
                                    alt="Portrait of Mark Mumba"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Photo Caption */}
                            <div className="mt-3 sm:mt-4 text-center">
                                <p className="text-xs text-gray-600 font-inter italic">
                                    This is how I look when I&apos;m debugging
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 
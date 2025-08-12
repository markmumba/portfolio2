import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section id="front-page" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Main Content */}
                    <div>
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-4">
                                Welcome to my digital living room
                            </h1>
                            <div className="text-sm text-gray-600 font-inter uppercase tracking-wider">
                                ENGINEER • LEARNER • OCCASIONAL PHILOSOPHER
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 font-inter leading-relaxed mb-6">
                            Hi, I&apos;m Mark. I&apos;m a software engineer who believes the best code solves real problems for real people.
                            This is where I share my learnings, explore ideas, and occasionally ramble about the intersection of technology and life.
                        </p>

                        <div className="bg-gray-100 p-4 border-l-4 border-black mb-8">
                            <h3 className="text-sm font-bold text-black mb-2">Currently:</h3>
                            <p className="text-sm text-gray-700 font-inter">
                                Exploring distributed systems, reading &quot;Designing Data-Intensive Applications&quot;,
                                and diving deep into the psychology of debugging.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/essays"
                                className="bg-black text-white px-6 py-3 font-inter hover:bg-gray-800 transition-colors duration-200 text-sm"
                            >
                                Read My Writing →
                            </Link>
                            <Link
                                href="#archives"
                                className="text-gray-600 font-inter hover:text-black transition-colors duration-200 text-sm"
                            >
                                View Projects →
                            </Link>
                        </div>
                    </div>

                    {/* Portrait */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="w-80 h-80 relative overflow-hidden">
                                <Image
                                    src="/hero.webp"
                                    alt="Portrait of Mark Mumba"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Photo Caption */}
                            <div className="mt-4 text-center">
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
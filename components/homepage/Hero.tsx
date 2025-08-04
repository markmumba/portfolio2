import Image from 'next/image';

const Hero = () => {
    return (
        <section id="front-page" className="py-12 bg-newspaper-white border-b-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                    {/* Main Headline - Takes up 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="border-b-4 border-black pb-6 mb-6">
                            {/* Main Headline - Updated */}
                            <h2 className="text-3xl md:text-5xl font-newspaper font-black text-black leading-tight mb-4">
                                "Early Days, Big Ideas: One Engineer's Journey Into Building Systems That Matter"
                            </h2>
                            <div className="text-sm text-newspaper-gray font-mono uppercase tracking-wider">
                                FROM THE FIELD • LEARNING CURVES • REAL ENGINEERING
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {/* Paragraph - Honest & Grounded */}
                            <p className="text-lg md:text-xl text-black font-newspaper leading-relaxed mb-6">
                                I'm a software engineer exploring how to build systems that are scalable, reliable, and genuinely useful. I work mostly with Java, Spring Boot, and Next.js — and I'm learning how to turn complex problems into clean, maintainable solutions.
                            </p>

                            {/* Quote Block - Authentic and Human */}
                            <div className="bg-gray-100 p-4 border-l-4 border-accent-red">
                                <p className="text-sm text-newspaper-gray font-newspaper italic">
                                    "Sometimes I stare at the screen for hours, thinking, refactoring, and wondering if there's a better way.
                                    It's messy, it's real, and that's what makes the process worth it."
                                </p>
                                <div className="text-xs text-newspaper-gray mt-2 font-mono">
                                    — Mark Mumba, Software Engineer
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portrait - Takes up 1 column */}
                    <div className="lg:col-span-1">
                        <div className="relative">
                            {/* Portrait Image */}
                            <div className="w-full aspect-square border-4 border-black shadow-lg relative overflow-hidden">
                                <Image
                                    src="/hero.webp"
                                    alt="Portrait of Mark Mumba"
                                    width={500}
                                    height={500}
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Image Caption - Humorous & Honest */}
                            <div className="mt-4 text-center">
                                <p className="text-sm text-newspaper-gray font-newspaper italic">
                                    This is me, trying to debug something that worked yesterday.
                                </p>
                                <p className="text-xs text-newspaper-gray font-mono mt-1">
                                    Usually deep in thought, or stuck in a stack trace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="mt-8 pt-6 border-t-2 border-gray-300">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-2xl font-newspaper font-bold text-black">2+</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-2xl font-newspaper font-bold text-black">4+</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Projects Delivered</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-2xl font-newspaper font-bold text-black">4</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Core Technologies</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-2xl font-newspaper font-bold text-black">100%</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 
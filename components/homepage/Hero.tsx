import Image from 'next/image';

const Hero = () => {
    return (
        <section id="front-page" className="py-8 bg-newspaper-white border-b-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

                    {/* Main Headline - Takes up 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="border-b-4 border-black pb-4 mb-4">
                            {/* Main Headline - Updated */}
                            <h2 className="text-2xl md:text-4xl font-newspaper font-black text-black leading-tight mb-3">
                                &quot;Early Days, Big Ideas: One Engineer&apos;s Journey Into Building Systems That Matter&quot;
                            </h2>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">
                                FROM THE FIELD • LEARNING CURVES • REAL ENGINEERING
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {/* Paragraph - Honest & Grounded */}
                            <p className="text-base md:text-lg text-black font-newspaper leading-relaxed mb-4">
                                I&apos;m a software engineer exploring how to build systems that are scalable, reliable, and genuinely useful. I work mostly with Java, Spring Boot, and Next.js — and I&apos;m learning how to turn complex problems into clean, maintainable solutions.
                            </p>

                            {/* Quote Block - Authentic and Human */}
                            <div className="bg-gray-100 p-3 border-l-4 border-accent-red">
                                <p className="text-xs text-newspaper-gray font-newspaper italic">
                                    &quot;Sometimes I stare at the screen for hours, thinking, refactoring, and wondering if there&apos;s a better way.
                                    It&apos;s messy, it&apos;s real, and that&apos;s what makes the process worth it.&quot;
                                </p>
                                <div className="text-xs text-newspaper-gray mt-1 font-mono">
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
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Image Caption - Humorous & Honest */}
                            <div className="mt-3 text-center">
                                <p className="text-xs text-newspaper-gray font-newspaper italic">
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
                <div className="mt-6 pt-4 border-t-2 border-gray-300">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-xl font-newspaper font-bold text-black">2+</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-xl font-newspaper font-bold text-black">4+</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Projects Delivered</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-xl font-newspaper font-bold text-black">4</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Core Technologies</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                            <div className="text-xl font-newspaper font-bold text-black">100%</div>
                            <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 
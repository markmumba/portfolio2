import Link from "next/link";

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

interface Skill {
    category: string;
    items: string[];
}

const timelineEvents: TimelineEvent[] = [
    {
        year: '2025',
        title: 'Fullstack Developer at Cloudit',
        description: 'Building tailored software applications for clients across industries. Working across the stack to deliver production-grade systems with impact.'
    },
    {
        year: '2025',
        title: 'Backend Engineer at Kyosk',
        description: 'Joined the payments squad, contributed to Java-based microservices, and improved test coverage to 80% on SonarQube.'
    },
    {
        year: '2023',
        title: 'Freelance Developer',
        description: 'Built client-facing websites using Next.js and CMS platforms. Designed and deployed a pharmacy inventory system with ERPNext.'
    },

];

const skills: Skill[] = [
    {
        category: 'Languages & Frameworks',
        items: ['Java', 'Spring Boot', 'Next.js', 'TypeScript', 'Python', 'React', 'Tailwind CSS']
    },
    {
        category: 'Infrastructure & Tools',
        items: ['Docker', 'PostgreSQL', 'MongoDB', 'VPS', 'Linux', 'Git', 'Nginx', 'CI/CD']
    },
    {
        category: 'Architecture & Design',
        items: ['Microservices', 'REST APIs', 'DDD']
    }
];

const About = () => {
    return (
        <section id="about" className="py-8 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-newspaper font-black text-black mb-4">
                        ABOUT THE EDITOR
                    </h2>
                    <p className="text-base text-newspaper-gray font-newspaper italic">
                        The story behind the engineer, thinker & problem-solver
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Profile Content - 2 columns */}
                    <div className="lg:col-span-2">
                        {/* Backstory */}
                        <div className="bg-newspaper-white border-2 border-black p-6 mb-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-3">
                                From Smartphones to Scalable Systems
                            </h3>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-base text-black font-newspaper leading-relaxed mb-4">
                                    My fascination with technology began with smartphones. I remember the day my dad brought home a Samsung Note 5—it wasn&apos;t just a phone to me, it was a marvel. I&apos;d sit for hours in local movie shops with WiFi, watching videos on things like octa-core processors, hyperthreading, and multitasking. That curiosity opened the door to a world I couldn&apos;t stop exploring.
                                </p>
                                <p className="text-base text-black font-newspaper leading-relaxed mb-4">
                                    Years later, I chose to pursue Computer Science, and it was like discovering a new universe. Compiler construction, distributed systems, concurrency—each concept revealed just how deep the rabbit hole goes. I was hooked.
                                </p>
                                <p className="text-base text-black font-newspaper leading-relaxed mb-4">
                                    If there&apos;s one thing this journey has taught me, it&apos;s the importance of curiosity. Try, fail, learn, and try again. As Alan Watts said: &quot;The purpose of music is not the end of the composition... the whole point of the dancing is the dance.&quot; For me, software engineering is the same—the beauty is in the process, the iteration, and the joy of building something meaningful.
                                </p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-newspaper-white border-2 border-black p-6 mb-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-3">
                                Engineering Timeline
                            </h3>
                            <div className="space-y-4">
                                {timelineEvents.map((event, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-mono text-xs font-bold">
                                                {event.year}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-newspaper font-bold text-black mb-1">
                                                {event.title}
                                            </h4>
                                            <p className="text-newspaper-gray font-newspaper text-sm">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="bg-newspaper-white border-2 border-black p-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-3">
                                Core Values
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🏗️</div>
                                    <h4 className="font-newspaper font-bold text-black mb-2 text-sm">Reliable Systems</h4>
                                    <p className="text-xs text-newspaper-gray font-newspaper">
                                        Building infrastructure that users can depend on, day in and day out.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🤔</div>
                                    <h4 className="font-newspaper font-bold text-black mb-2 text-sm">Thoughtful Engineering</h4>
                                    <p className="text-xs text-newspaper-gray font-newspaper">
                                        Every decision is made with careful consideration of long-term implications.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🔮</div>
                                    <h4 className="font-newspaper font-bold text-black mb-2 text-sm">Long-term Thinking</h4>
                                    <p className="text-xs text-newspaper-gray font-newspaper">
                                        Designing solutions that will scale and evolve with your business needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="lg:col-span-1">
                        {/* Skills & Technologies */}
                        <div className="bg-newspaper-white border-2 border-black p-4 mb-6">
                            <h3 className="text-lg font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-2">
                                Languages & Stacks
                            </h3>
                            <div className="space-y-4">
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <h4 className="text-xs font-mono uppercase tracking-wider text-accent-red mb-2">
                                            {skill.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                            {skill.items.map((item, itemIndex) => (
                                                <span
                                                    key={itemIndex}
                                                    className="bg-gray-100 text-newspaper-gray px-2 py-1 text-xs font-mono border border-gray-300"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-accent-red text-white border-2 border-black p-4 mb-6">
                            <h3 className="text-lg font-newspaper font-bold mb-3">
                                Let&apos;s Build Something Amazing
                            </h3>
                            <p className="text-xs mb-4 font-newspaper">
                                Ready to collaborate on your next project? I&apos;m always interested in challenging
                                problems and meaningful work.
                            </p>
                            <div className="space-y-2">
                                <Link
                                    href="mailto:mumbamarkian@gmail.com"
                                    className="block w-full bg-white text-accent-red px-3 py-2 text-center font-newspaper-sans font-bold hover:bg-gray-100 transition-colors duration-200 border-2 border-white text-sm"
                                >
                                    Hire Me
                                </Link>
                                <Link
                                    href="#contact"
                                    className="block w-full border-2 border-white text-white px-3 py-2 text-center font-newspaper-sans hover:bg-white hover:text-accent-red transition-colors duration-200 text-sm"
                                >
                                    Collaborate
                                </Link>
                                <Link
                                    href="/resume.pdf"
                                    className="block w-full border-2 border-white text-white px-3 py-2 text-center font-newspaper-sans hover:bg-white hover:text-accent-red transition-colors duration-200 text-sm"
                                >
                                    Download Résumé
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-newspaper-white border-2 border-black p-4">
                            <h3 className="text-lg font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-2">
                                Quick Stats
                            </h3>
                            <div className="space-y-3">
                                <div className="text-center">
                                    <div className="text-xl font-newspaper font-bold text-black">2+</div>
                                    <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-newspaper font-bold text-black">4+</div>
                                    <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Projects Delivered</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-newspaper font-bold text-black">4</div>
                                    <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Core Technologies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About; 
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
        year: '2024',
        title: 'Lead Software Engineer',
        description: 'Building scalable platforms and mentoring junior developers'
    },
    {
        year: '2022',
        title: 'Started Building Microservices',
        description: 'Transitioned from monoliths to distributed systems architecture'
    },
    {
        year: '2020',
        title: 'First Production System',
        description: 'Deployed my first Java/Spring Boot application to production'
    },
    {
        year: '2019',
        title: 'Engineering Journey Begins',
        description: 'Started learning Java and web development fundamentals'
    }
];

const skills: Skill[] = [
    {
        category: 'Languages & Frameworks',
        items: ['Java', 'Spring Boot', 'Next.js', 'TypeScript', 'Python', 'React']
    },
    {
        category: 'Infrastructure & Tools',
        items: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
        category: 'Architecture & Design',
        items: ['Microservices', 'REST APIs', 'Event-Driven Architecture', 'Clean Code', 'TDD']
    }
];

const About = () => {
    return (
        <section id="about" className="py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-newspaper font-black text-black mb-4">
                        ABOUT THE EDITOR
                    </h2>
                    <p className="text-lg text-newspaper-gray font-newspaper italic">
                        The story behind the engineer, thinker & problem-solver
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Profile Content - 2 columns */}
                    <div className="lg:col-span-2">
                        {/* Backstory */}
                        <div className="bg-newspaper-white border-2 border-black p-8 mb-8">
                            <h3 className="text-2xl font-newspaper font-bold text-black mb-6 border-b-2 border-black pb-4">
                                From Nairobi to the Cloud
                            </h3>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-lg text-black font-newspaper leading-relaxed mb-6">
                                    My journey into software engineering began with a simple curiosity about how things work.
                                    Growing up in Nairobi, I was fascinated by the rapid technological transformation happening
                                    around me, especially in mobile money and fintech solutions that were changing how people
                                    lived and worked.
                                </p>
                                <p className="text-lg text-black font-newspaper leading-relaxed mb-6">
                                    Today, I'm a software engineer who specializes in building scalable, reliable systems
                                    that solve real-world problems. I believe in clean architecture, thoughtful engineering,
                                    and long-term thinking. My work spans from distributed systems and microservices to
                                    full-stack applications that serve millions of users.
                                </p>
                                <div className="bg-gray-100 p-6 border-l-4 border-accent-red">
                                    <p className="text-newspaper-gray font-newspaper italic text-lg">
                                        "I focus on building systems that are not just functional, but reliable, scalable,
                                        and maintainable for years to come. The best code is the code that solves real
                                        problems for real people."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-newspaper-white border-2 border-black p-8 mb-8">
                            <h3 className="text-2xl font-newspaper font-bold text-black mb-6 border-b-2 border-black pb-4">
                                Engineering Timeline
                            </h3>
                            <div className="space-y-6">
                                {timelineEvents.map((event, index) => (
                                    <div key={index} className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-mono text-sm font-bold">
                                                {event.year}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-newspaper font-bold text-black mb-2">
                                                {event.title}
                                            </h4>
                                            <p className="text-newspaper-gray font-newspaper">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="bg-newspaper-white border-2 border-black p-8">
                            <h3 className="text-2xl font-newspaper font-bold text-black mb-6 border-b-2 border-black pb-4">
                                Core Values
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🏗️</div>
                                    <h4 className="font-newspaper font-bold text-black mb-2">Reliable Systems</h4>
                                    <p className="text-sm text-newspaper-gray font-newspaper">
                                        Building infrastructure that users can depend on, day in and day out.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🤔</div>
                                    <h4 className="font-newspaper font-bold text-black mb-2">Thoughtful Engineering</h4>
                                    <p className="text-sm text-newspaper-gray font-newspaper">
                                        Every decision is made with careful consideration of long-term implications.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🔮</div>
                                    <h4 className="font-newspaper font-bold text-black mb-2">Long-term Thinking</h4>
                                    <p className="text-sm text-newspaper-gray font-newspaper">
                                        Designing solutions that will scale and evolve with your business needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="lg:col-span-1">
                        {/* Skills & Technologies */}
                        <div className="bg-newspaper-white border-2 border-black p-6 mb-8">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-6 border-b-2 border-black pb-3">
                                Languages & Stacks
                            </h3>
                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <h4 className="text-sm font-mono uppercase tracking-wider text-accent-red mb-3">
                                            {skill.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skill.items.map((item, itemIndex) => (
                                                <span
                                                    key={itemIndex}
                                                    className="bg-gray-100 text-newspaper-gray px-3 py-1 text-sm font-mono border border-gray-300"
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
                        <div className="bg-accent-red text-white border-2 border-black p-6 mb-8">
                            <h3 className="text-xl font-newspaper font-bold mb-4">
                                Let's Build Something Amazing
                            </h3>
                            <p className="text-sm mb-6 font-newspaper">
                                Ready to collaborate on your next project? I'm always interested in challenging
                                problems and meaningful work.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="mailto:mark@example.com"
                                    className="block w-full bg-white text-accent-red px-4 py-3 text-center font-newspaper-sans font-bold hover:bg-gray-100 transition-colors duration-200 border-2 border-white"
                                >
                                    Hire Me
                                </a>
                                <a
                                    href="#contact"
                                    className="block w-full border-2 border-white text-white px-4 py-3 text-center font-newspaper-sans hover:bg-white hover:text-accent-red transition-colors duration-200"
                                >
                                    Collaborate
                                </a>
                                <a
                                    href="/resume.pdf"
                                    className="block w-full border-2 border-white text-white px-4 py-3 text-center font-newspaper-sans hover:bg-white hover:text-accent-red transition-colors duration-200"
                                >
                                    Download Résumé
                                </a>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-newspaper-white border-2 border-black p-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-6 border-b-2 border-black pb-3">
                                Quick Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-2xl font-newspaper font-bold text-black">5+</div>
                                    <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-newspaper font-bold text-black">20+</div>
                                    <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Projects Delivered</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-newspaper font-bold text-black">100%</div>
                                    <div className="text-xs text-newspaper-gray font-mono uppercase tracking-wider">Client Satisfaction</div>
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
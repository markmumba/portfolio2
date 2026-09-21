import Link from "next/link";

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

interface Skill {
    category: string;
    technologies: string[];
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
        technologies: ['Java', 'Spring Boot', 'Next.js', 'TypeScript', 'Python', 'React', 'Tailwind CSS']
    },
    {
        category: 'Infrastructure & Tools',
        technologies: ['Docker', 'PostgreSQL', 'MongoDB', 'VPS', 'Linux', 'Git', 'Nginx', 'CI/CD']
    },
    {
        category: 'Architecture & Design',
        technologies: ['Microservices', 'REST APIs', 'Domain-Driven Design', 'Event-Driven Architecture']
    }
];

const funFacts = [
    "I think distributed systems are beautiful puzzles waiting to be solved",
    "I enjoy diving into youtube videos where the person is talking about a niche topic… 'what is attention?? and then goes to explain something so indepth'",
    "I love reading books on philosophy and life lessons",
    "I genuinely believe music heals the soul",
    "Working out is second nature to me",
    "I enjoy film… not movies. Film!!!",
    "Big tech nerd… if money allowed i would have the latest macbook pro each year",

];

const About = () => {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-heading">
                        My Story
                    </h2>
                    <p className="text-lg text-gray-600 font-inter">
                        How I got here, what I&apos;m learning, and what keeps me curious
                    </p>
                </div>

                {/* Personal Story */}
                <div className="mb-16">
                    <p className="text-gray-700 font-inter leading-relaxed mb-6 font-semibold">
                        Software Engineer specializing in backend engineering, distributed systems, and scalable application architecture.
                    </p>
                    <p className="text-gray-700 font-inter leading-relaxed mb-6">
                        I build backend systems that are reliable, maintainable, and designed to scale—from REST APIs and microservices to asynchronous workflows and cloud-native applications.
                    </p>
                    <p className="text-gray-700 font-inter leading-relaxed mb-6">
                        My primary stack includes Java, Spring Boot, MongoDB, PostgreSQL, gRPC, Docker, and cloud technologies, with hands-on experience building and deploying production systems across domains such as fintech, e-commerce, HR systems, and workflow automation.
                    </p>
                    <div className="mb-6">
                        <p className="text-gray-700 font-inter leading-relaxed mb-3">I enjoy solving problems around:</p>
                        <ul className="space-y-1 pl-2">
                            {[
                                'Backend architecture and API design',
                                'Distributed systems and microservices',
                                'Database design and performance optimization',
                                'Event-driven systems and asynchronous processing',
                                'Cloud infrastructure and containerized deployments',
                                'Reliability, resilience, and scalable software design',
                            ].map((item, i) => (
                                <li key={i} className="text-gray-700 font-inter text-sm flex items-start gap-2">
                                    <span className="font-mono text-gray-500 mt-0.5">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-gray-700 font-inter leading-relaxed mb-6">
                        Beyond writing code, I am deeply interested in the engineering principles behind great systems—studying topics such as distributed systems, data-intensive applications, system design, and software architecture to continuously improve how I build software.
                    </p>
                    <p className="text-gray-700 font-inter leading-relaxed mb-6">
                        I enjoy collaborating with teams that value technical excellence, ownership, and building products that create meaningful impact.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 p-5">
                        <p className="text-gray-700 font-inter leading-relaxed mb-3 font-semibold text-sm uppercase tracking-wider">Currently open to opportunities involving:</p>
                        <ul className="space-y-1">
                            {[
                                'Backend Engineering',
                                'Software Engineering',
                                'Distributed Systems',
                                'Platform Engineering',
                                'Cloud & Infrastructure Engineering',
                            ].map((item, i) => (
                                <li key={i} className="text-gray-700 font-inter text-sm flex items-center gap-2">
                                    <span className="text-black font-bold">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Currently Section */}
                <div className="bg-gray-100 p-6 border-l-4 border-black mb-16">
                    <h3 className="text-xl font-bold text-black mb-4">What I&apos;m Currently Curious About</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-black mb-2">📚 Reading</h4>
                            <p className="text-gray-700 font-inter text-sm">
                                &quot;Designing Data-Intensive Applications&quot; by Martin Kleppmann and anything about distributed systems.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-black mb-2">🔧 Building</h4>
                            <p className="text-gray-700 font-inter text-sm">
                                Exploring microservices patterns, learning Rust, and experimenting with event-driven architectures.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-black mb-2">🤔 Exploring</h4>
                            <p className="text-gray-700 font-inter text-sm">
                                How philosophy intersects with software design, and the art of writing code that humans can understand.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-black mb-2">🎯 Learning</h4>
                            <p className="text-gray-700 font-inter text-sm">
                                Advanced concurrency patterns, system design at scale, and the balance between performance and maintainability.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-black mb-8 font-heading">My Journey</h3>
                    <div className="space-y-8">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-mono text-sm font-bold">
                                        {event.year}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-black mb-2 font-heading">
                                        {event.title}
                                    </h4>
                                    <p className="text-gray-700 font-inter">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-black mb-8 font-heading">My Toolkit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {skills.map((skill, index) => (
                            <div key={index}>
                                <h4 className="text-sm font-mono uppercase tracking-wider text-gray-600 mb-3">
                                    {skill.category}
                                </h4>
                                <div className="space-y-2">
                                    {skill.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="inline-block bg-gray-100 text-gray-800 px-3 py-1 text-xs font-inter mr-2 mb-2 border border-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fun Facts */}
                <div className="bg-gray-100 p-6 border-l-4 border-black mb-16">
                    <h3 className="text-xl font-bold text-black mb-6">Fun Facts About Me</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {funFacts.map((fact, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <span className="text-sm font-mono text-gray-600 mt-1">•</span>
                                <p className="text-gray-700 font-inter text-sm">{fact}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-black mb-4">Let&apos;s Connect</h3>
                    <p className="text-lg text-gray-600 font-inter mb-8 max-w-2xl mx-auto">
                        I love meeting fellow learners and builders. Whether you want to discuss ideas,
                        collaborate on something interesting, or just say hello.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link
                            href="mailto:mumbamarkian@gmail.com"
                            className="bg-black text-white px-6 py-3 font-inter hover:bg-gray-800 transition-colors duration-200 text-sm"
                        >
                            Send a Message
                        </Link>
                        <Link
                            href="https://github.com/markmumba"
                            target="_blank"
                            className="text-gray-600 font-inter hover:text-black transition-colors duration-200 text-sm"
                        >
                            GitHub →
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/markian-mumba-67231517a/"
                            target="_blank"
                            className="text-gray-600 font-inter hover:text-black transition-colors duration-200 text-sm"
                        >
                            LinkedIn →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About; 

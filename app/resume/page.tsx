import Link from 'next/link';

const experience = [
    {
        company: 'Cloudit',
        role: 'Fullstack Developer',
        period: '2025 – Present',
        location: 'Nairobi, KE',
        summary:
            'Building tailored software applications for clients across industries, working across the stack to ship production-grade systems.',
    },
    {
        company: 'Kyosk',
        role: 'Backend Engineer (Payments Squad)',
        period: '2025',
        location: 'Nairobi, KE',
        summary:
            'Contributed to Java-based microservices, improved test coverage, and supported reliable payment flows in a fast-moving environment.',
    },
    {
        company: 'Freelance',
        role: 'Fullstack Developer',
        period: '2023 – 2024',
        location: 'Remote',
        summary:
            'Designed and shipped client-facing systems, including content-driven websites and a pharmacy inventory system using ERPNext.',
    },
];

const education = [
    {
        school: 'Moringa School',
        credential: 'Web Development Certificate – JavaScript, Python, Angular, Flask, Django',
        period: '2020',
        location: 'Nairobi, KE',
    },
    {
        school: 'Computer Science',
        credential: 'Calculus, Distributed Systems, Theory of Computation',
        period: '2019 – 2025',
        location: 'Nairobi, KE',
    },
];

const projects = [
    {
        name: 'FolioCuts',
        description:
            'Digital barbershop management platform for Kenyan barbershops. Replaces paper ledgers with intelligent commission tracking, M-Pesa payment integration (STK push, automated receipts), and automated loyalty rewards. Features live analytics, staff performance dashboards, and 3-minute guided onboarding.',
        tech: 'Java, Spring Boot, Next.js, PostgreSQL, M-Pesa',
        link: 'https://folio.blazor-movies.online/',
    },
    {
        name: 'BolloApp',
        description:
            'Fullstack waste management platform connecting households with local collectors. Tracks pickups in real time and automates payments and payouts. Built with Next.js, Spring Boot, and PostgreSQL.',
        tech: 'Java, Spring Boot, Next.js, PostgreSQL, Geolocation, WebSocket',
        link: 'https://bolla.blazor-movies.online/',
    },
    {
        name: 'RentItUp',
        description:
            'Rental platform connecting machinery owners with people who need them. Built as a microservices system handling listings, bookings, payments, and secure communication between users.',
        tech: 'Java, Spring Boot, Next.js, REST API, PostgreSQL',
        link: 'https://rentitup.blazor-movies.online/',
    },
];

const skills = [
    'Java, Spring Boot, REST APIs',
    'Next.js, React, TypeScript, Tailwind CSS',
    'PostgreSQL, MongoDB, data modeling',
    'Microservices, event-driven and distributed systems',
    'Testing, CI/CD, code review and collaboration',
];

const tools = [
    'IntelliJ IDEA, VS Code',
    'Docker, Linux, Nginx',
    'Git & GitHub',
    'Contentful, ERPNext',
    'Notion, Figma, Miro',
];

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4 py-10">
            <article className="w-full max-w-4xl bg-neutral-950 text-neutral-100 border border-neutral-800 shadow-2xl shadow-black/40 px-6 py-8 md:px-12 md:py-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-10">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
                        Markian Mumba
                    </h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-neutral-300">
                        <span>
                            <Link
                                href="mailto:mumbamarkian@gmail.com"
                                className="hover:text-white underline underline-offset-4"
                            >
                                mumbamarkian@gmail.com
                            </Link>
                        </span>
                        <span>
                            <Link
                                href="https://github.com/markmumba"
                                target="_blank"
                                className="hover:text-white underline underline-offset-4"
                            >
                                github.com/markmumba
                            </Link>
                        </span>
                        <span>
                            <Link
                                href="https://www.linkedin.com/in/markian-mumba-67231517a/"
                                target="_blank"
                                className="hover:text-white underline underline-offset-4"
                            >
                                LinkedIn
                            </Link>
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,3fr)] gap-x-10 gap-y-8 text-sm md:text-[15px] leading-relaxed">
                    {/* Experience */}
                    <section className="contents">
                        <div className="uppercase tracking-[0.2em] text-xs text-neutral-400">
                            Experience
                        </div>
                        <div className="space-y-6">
                            {experience.map((item) => (
                                <div key={`${item.company}-${item.role}`}>
                                    <h2 className="font-semibold text-neutral-50">
                                        <span className="font-semibold">{item.company}</span>{' '}
                                        <span className="font-normal text-neutral-300">
                                            {item.role}
                                        </span>
                                    </h2>
                                    <p className="text-xs text-neutral-400 mb-1">
                                        {item.period} — {item.location}
                                    </p>
                                    <p className="text-neutral-200">{item.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="contents">
                        <div className="uppercase tracking-[0.2em] text-xs text-neutral-400">
                            Education
                        </div>
                        <div className="space-y-4">
                            {education.map((item) => (
                                <div key={item.school}>
                                    <p className="font-semibold text-neutral-50">{item.school}</p>
                                    <p className="text-neutral-200">{item.credential}</p>
                                    <p className="text-xs text-neutral-400">
                                        {item.period} — {item.location}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    <section className="contents">
                        <div className="uppercase tracking-[0.2em] text-xs text-neutral-400">
                            Projects
                        </div>
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <div key={project.name}>
                                    <h2 className="font-semibold text-neutral-50 mb-1">
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white underline underline-offset-4"
                                        >
                                            {project.name}
                                        </Link>
                                    </h2>
                                    <p className="text-neutral-200 mb-1">{project.description}</p>
                                    <p className="text-xs text-neutral-400">{project.tech}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="contents">
                        <div className="uppercase tracking-[0.2em] text-xs text-neutral-400">
                            Skills
                        </div>
                        <ul className="space-y-1.5 text-neutral-200">
                            {skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Tools */}
                    <section className="contents">
                        <div className="uppercase tracking-[0.2em] text-xs text-neutral-400">
                            Tools
                        </div>
                        <ul className="space-y-1.5 text-neutral-200">
                            {tools.map((tool) => (
                                <li key={tool}>{tool}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Download */}
                    <section className="contents">
                        <div className="uppercase tracking-[0.2em] text-xs text-neutral-400">
                            Download
                        </div>
                        <div>
                            <a
                                href="/resume .pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-neutral-200 hover:text-white underline underline-offset-4"
                            >
                                View PDF version
                                <span className="text-xs">↗</span>
                            </a>
                        </div>
                    </section>
                </div>
            </article>
        </main>
    );
}



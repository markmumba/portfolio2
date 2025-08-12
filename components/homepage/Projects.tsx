import Image from 'next/image';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    publishDate?: string;
    gridSize?: 'large' | 'medium' | 'small';
}

const projects: Project[] = [
    {
        id: '1',
        title: 'Garbage Collection System',
        excerpt: 'A fullstack waste management platform that connects households with local collectors, tracks pickups in real time, and automates payments and payouts — all built with Next.js, Spring Boot, and PostgreSQL.',
        category: 'PROJECT',
        tags: ['Java', 'Spring Boot', 'Next.js', 'PostgreSQL', 'Geolocation', 'WebSocket'],
        imageUrl: '/bolla.webp',
        githubUrl: 'https://github.com/markmumba/bolloapp-frontend',
        liveUrl: 'https://app.blazor-movies.online/',
        featured: true,
        publishDate: '2 MONTHS AGO',
        gridSize: 'large'
    },
    {
        id: '2',
        title: 'Rentitup',
        excerpt: "A rental platform that connects machinery owners with people who need them — from small contractors to everyday homeowners. Built as a microservices system with Spring Boot and REST APIs, RentItUp handles listings, bookings, payments, and secure communication between users.",
        category: 'PROJECT',
        tags: ['Java', 'Spring Boot', 'Next.js', 'REST API', 'PostgreSQL'],
        imageUrl: '/rentitup.webp',
        githubUrl: 'https://github.com/markmumba/rentitup-frontend',
        liveUrl: 'https://rentitup.blazor-movies.online/',
        publishDate: '3 MONTHS AGO',
        gridSize: 'medium'
    },
    {
        id: '3',
        title: 'ESTC Website',
        excerpt: "A corporate website for ESTC, a professional training organization offering custom programs in Leadership, ICT, HR, and more. Built with Next.js and Tailwind CSS, the site communicates services clearly, showcases key programs, and supports client engagement through a responsive, modern UI.",
        category: 'PROJECT',
        tags: ['Next.js', 'Tailwind CSS', 'Corporate Website', 'Responsive Design', 'Content Strategy'],
        imageUrl: '/estc.webp',
        liveUrl: 'https://exceptionalskills.co.ke/',
        githubUrl: 'https://github.com/markmumba/estc',
        publishDate: '1 MONTH AGO',
        gridSize: 'medium'
    },
    {
        id: '4',
        title: 'Bag street Kenya',
        excerpt: "A platform for selling bags, shoes and scarves. Gives a variety of goods to choose from and uses WhatsApp when you want to order. The seller uses Contentful CMS to manage the items listed.",
        category: 'PROJECT',
        tags: ['Next.js', 'Tailwind CSS', 'Contentful CMS', 'Responsive Design', 'E-commerce', 'WhatsApp Integration'],
        imageUrl: '/bsk.webp',
        githubUrl: 'https://github.com/markmumba/bag_street_kenya',
        liveUrl: 'https://bag-street-kenya-t4mz.vercel.app/',
        publishDate: '4 MONTHS AGO',
        gridSize: 'small'
    }
];

const getGridClasses = (gridSize: string) => {
    switch (gridSize) {
        case 'large':
            return 'col-span-1 md:col-span-2 row-span-1 md:row-span-1';
        case 'medium':
            return 'col-span-1 row-span-1';
        case 'small':
            return 'col-span-1 row-span-1';
        default:
            return 'col-span-1 row-span-1';
    }
};

const ProjectCard = ({ project }: { project: Project }) => {
    const gridClasses = getGridClasses(project.gridSize || 'medium');
    const isLarge = project.gridSize === 'large';

    return (
        <article className={`bg-white hover:bg-gray-50 transition-colors duration-200 ${gridClasses}`}>
            {/* Project Illustration */}
            <div className={`relative bg-gray-100 overflow-hidden ${isLarge ? 'h-64 md:h-96' : 'h-48 md:h-56'}`}>
                <Image
                    src={project.imageUrl}
                    alt={`Illustration for ${project.title}`}
                    fill
                    className="object-cover "
                />
                {/* Grainy overlay effect */}
                <div className="absolute inset-0 bg-black opacity-5 mix-blend-multiply"></div>
            </div>

            {/* Project Content */}
            <div className={`p-4 ${isLarge ? 'md:p-6' : 'md:p-4'}`}>
                {/* Title */}
                <h3 className={`font-bold text-black mb-2 leading-tight ${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
                    {project.title}
                </h3>

                {/* Metadata */}
                <div className="text-xs text-gray-600 font-inter mb-3">
                    {project.category} • {project.publishDate}
                </div>

                {/* Excerpt */}
                <p className={`text-gray-700 font-inter leading-relaxed mb-4 ${isLarge ? 'text-sm md:text-base' : 'text-sm'}`}>
                    {isLarge ? project.excerpt : project.excerpt.substring(0, 120) + '...'}
                </p>

                {/* Action Links */}
                <div className="flex gap-4">
                    {project.githubUrl && (
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 font-inter hover:text-black transition-colors duration-200"
                        >
                            View Code →
                        </Link>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 font-inter hover:text-black transition-colors duration-200"
                        >
                            Live Demo →
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

const Projects = () => {
    return (
        <section id="archives" className="py-12 bg-white border-b-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                        STORIES FROM THE FIELD
                    </h2>
                    <p className="text-base text-gray-600 font-inter italic">
                        Projects that taught me something worth sharing
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                {/* Projects Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-min gap-4 mb-12">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Editorial Note */}
                <div className="bg-gray-100 border-2 border-gray-300 p-6 mb-8 shadow-lg rounded-lg">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl">📰</div>
                        <div>
                            <h3 className="text-lg font-bold text-black mb-3">
                                EDITORIAL: Why I Build Things
                            </h3>
                            <p className="text-gray-700 font-inter leading-relaxed text-sm">
                                Every project is a story of problem-solving, learning, and sometimes failing spectacularly.
                                I build things not just to solve problems, but to understand them better. Each project
                                teaches me something about people, systems, or myself.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-black text-white p-8 shadow-xl rounded-lg border-2 border-black">
                        <h3 className="text-lg font-bold text-white mb-4">
                            WANT TO BUILD SOMETHING TOGETHER?
                        </h3>
                        <p className="text-white font-inter mb-6 max-w-2xl mx-auto text-sm opacity-90">
                            I&apos;m always looking for interesting technical challenges and opportunities to build
                            systems that solve real problems. Let&apos;s discuss your project.
                        </p>
                        <a
                            href="mailto:mumbamarkian@gmail.com"
                            className="inline-block bg-white text-black px-8 py-3 text-base font-inter hover:bg-gray-100 transition-colors duration-200 border-2 border-white font-bold"
                        >
                            Let&apos;s Talk
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects; 
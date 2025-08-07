import Image from 'next/image';

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
}

const projects: Project[] = [
    {
        id: '1',
        title: 'Garbage Collection System',
        excerpt: 'A fullstack waste management platform that connects households with local collectors, tracks pickups in real time, and automates payments and payouts — all built with Next.js, Spring Boot, and PostgreSQL.',
        category: 'System Spotlight',
        tags: ['Java', 'Spring Boot', 'Next.js', 'PostgreSQL', 'Geolocation', 'WebSocket'],
        imageUrl: '/bolla.webp',
        githubUrl: 'https://github.com/markmumba/bolloapp-frontend',
        liveUrl: 'https://app.blazor-movies.online/',
        featured: true
    },
    {
        id: '2',
        title: 'Rentitup',
        excerpt: "A rental platform that connects machinery owners with people who need them — from small contractors to everyday homeowners. Built as a microservices system with Spring Boot and REST APIs, RentItUp handles listings, bookings, payments, and secure communication between users.",
        category: 'Microservices Series',
        tags: ['Java', 'Spring Boot', 'Next.js', 'REST API', 'PostgreSQL'],
        imageUrl: '/rentitup.webp',
        githubUrl: 'https://github.com/markmumba/rentitup-frontend',
        liveUrl: 'https://rentitup.blazor-movies.online/'
    },
    {
        id: '3',
        title: 'ESTC Website',
        excerpt: "A corporate website for ESTC, a professional training organization offering custom programs in Leadership, ICT, HR, and more. Built with Next.js and Tailwind CSS, the site communicates services clearly, showcases key programs, and supports client engagement through a responsive, modern UI.",
        category: 'Client Features',
        tags: ['Next.js', 'Tailwind CSS', 'Corporate Website', 'Responsive Design', 'Content Strategy'],
        imageUrl: '/estc.webp',
        liveUrl: 'https://estc-ivory.vercel.app/',
        githubUrl: 'https://github.com/markmumba/estc',
    },
    {
        id: '4',
        title: 'Bag street Kenya',
        excerpt: "A platform for selling bags shoes and scarves.Gives a variety of goods to choose from and uses what app when you want to order. The seller uses contnentful CMS to manage the items listed.",
        category: 'Client Features',
        tags: ['Next.js', 'Tailwind CSS', 'Contentful CMS', 'Responsive Design', 'E-commerce', 'Whatsapp Integration'],
        imageUrl: '/bsk.webp',
        githubUrl: 'https://github.com/markmumba/bag_street_kenya',
        liveUrl: 'https://bag-street-kenya-t4mz.vercel.app/'
    }
];

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <article className="bg-newspaper-white border-2 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Project Image */}
            <div className="relative h-48 bg-gray-200 border-b-2 border-black overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover"
                />
                {project.featured && (
                    <div className="absolute top-2 left-2 bg-accent-red text-white px-2 py-1 text-xs font-mono uppercase tracking-wider">
                        Featured
                    </div>
                )}
            </div>

            {/* Project Content */}
            <div className="p-6">
                {/* Category */}
                <div className="text-xs text-accent-red font-mono uppercase tracking-wider mb-2">
                    {project.category}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-newspaper font-bold text-black mb-3 leading-tight">
                    {project.title}
                </h3>

                {/* Excerpt */}
                <p className="text-newspaper-gray font-newspaper leading-relaxed mb-4">
                    {project.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-newspaper-gray px-2 py-1 text-xs font-mono border border-gray-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white px-4 py-2 text-sm font-newspaper-sans hover:bg-gray-800 transition-colors duration-200"
                        >
                            View Code
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-black text-black px-4 py-2 text-sm font-newspaper-sans hover:bg-black hover:text-white transition-colors duration-200"
                        >
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

const Projects = () => {
    const featuredProject = projects.find(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <section id="archives" className="py-8 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-newspaper font-black text-black mb-4">
                        FEATURE ARTICLES
                    </h2>
                    <p className="text-base text-newspaper-gray font-newspaper italic">
                        Recent projects and technical investigations from the field
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                {/* Featured Project */}
                {featuredProject && (
                    <div className="mb-8">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-newspaper font-bold text-black uppercase tracking-wider">
                                System Spotlight
                            </h3>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <ProjectCard project={featuredProject} />
                        </div>
                    </div>
                )}

                {/* Other Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="text-center mt-8">
                    <a
                        href="#all-projects"
                        className="inline-block bg-accent-red text-white px-6 py-2 text-base font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red"
                    >
                        View All Archives
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects; 
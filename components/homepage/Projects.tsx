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
        title: 'Smart Garbage Collection System',
        excerpt: 'A distributed IoT platform that optimizes waste collection routes using real-time sensor data and machine learning algorithms.',
        category: 'System Spotlight',
        tags: ['Java', 'Spring Boot', 'Docker', 'IoT', 'Machine Learning'],
        imageUrl: '/api/placeholder/400/300',
        githubUrl: 'https://github.com/markmumba/smart-garbage',
        liveUrl: 'https://smart-garbage.demo.com',
        featured: true
    },
    {
        id: '2',
        title: 'M-Pesa Integration Platform',
        excerpt: 'Enterprise-grade fintech integration system for East African mobile money services with real-time transaction processing.',
        category: 'Microservices Series',
        tags: ['Java', 'Spring Boot', 'Microservices', 'Fintech', 'REST API'],
        imageUrl: '/api/placeholder/400/300',
        githubUrl: 'https://github.com/markmumba/mpesa-platform'
    },
    {
        id: '3',
        title: 'Healthcare Management System',
        excerpt: 'Comprehensive patient management and appointment scheduling system for healthcare facilities across Kenya.',
        category: 'Client Features',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Healthcare', 'Full Stack'],
        imageUrl: '/api/placeholder/400/300',
        liveUrl: 'https://healthcare-system.demo.com'
    },
    {
        id: '4',
        title: 'E-Commerce Analytics Dashboard',
        excerpt: 'Real-time analytics and reporting dashboard for online retailers with advanced data visualization capabilities.',
        category: 'Hackathon Dispatch',
        tags: ['React', 'Node.js', 'MongoDB', 'Analytics', 'Data Visualization'],
        imageUrl: '/api/placeholder/400/300',
        githubUrl: 'https://github.com/markmumba/analytics-dashboard'
    }
];

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <article className="bg-newspaper-white border-2 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Project Image */}
            <div className="relative h-48 bg-gray-200 border-b-2 border-black overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <p className="text-sm text-newspaper-gray font-mono">Project Screenshot</p>
                    </div>
                </div>
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
        <section id="archives" className="py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-newspaper font-black text-black mb-4">
                        FEATURE ARTICLES
                    </h2>
                    <p className="text-lg text-newspaper-gray font-newspaper italic">
                        Recent projects and technical investigations from the field
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                {/* Featured Project */}
                {featuredProject && (
                    <div className="mb-12">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-newspaper font-bold text-black uppercase tracking-wider">
                                System Spotlight
                            </h3>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <ProjectCard project={featuredProject} />
                        </div>
                    </div>
                )}

                {/* Other Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="text-center mt-12">
                    <a
                        href="#all-projects"
                        className="inline-block bg-accent-red text-white px-8 py-3 text-lg font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red"
                    >
                        View All Archives
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects; 
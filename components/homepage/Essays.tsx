interface Essay {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    categoryIcon: string;
    readTime: string;
    publishDate: string;
    tags: string[];
    featured?: boolean;
}

const essays: Essay[] = [
    {
        id: '1',
        title: 'The Case for Modular Monoliths in Early-Stage Startups',
        excerpt: 'Why building a well-structured monolith first, then gradually decomposing it, often beats jumping straight into microservices for young companies.',
        category: 'The Backend Column',
        categoryIcon: '⚙️',
        readTime: '8 min read',
        publishDate: 'December 15, 2024',
        tags: ['Architecture', 'Microservices', 'Startups'],
        featured: true
    },
    {
        id: '2',
        title: 'How I Write Scalable Code Without Burning Out',
        excerpt: 'Practical strategies for maintaining code quality and developer sanity when building systems that need to handle millions of users.',
        category: 'Code & Culture',
        categoryIcon: '🧠',
        readTime: '6 min read',
        publishDate: 'December 10, 2024',
        tags: ['Productivity', 'Code Quality', 'Mental Health']
    },
    {
        id: '3',
        title: 'Why I Started Learning Distributed File Systems',
        excerpt: 'My journey into understanding how systems like HDFS and S3 work, and why every backend engineer should know the basics.',
        category: 'Editor\'s Notes',
        categoryIcon: '📝',
        readTime: '5 min read',
        publishDate: 'December 5, 2024',
        tags: ['Learning', 'Distributed Systems', 'Career Growth']
    },
    {
        id: '4',
        title: 'M-Pesa Integration: Lessons from Building Fintech in Africa',
        excerpt: 'Real-world challenges and solutions when integrating with mobile money systems in emerging markets.',
        category: 'The Backend Column',
        categoryIcon: '⚙️',
        readTime: '10 min read',
        publishDate: 'November 28, 2024',
        tags: ['Fintech', 'Africa', 'Integration']
    },
    {
        id: '5',
        title: 'The Hidden Costs of Technical Debt in Growing Teams',
        excerpt: 'How technical debt compounds differently in teams of 5 vs 50, and strategies for managing it effectively.',
        category: 'Code & Culture',
        categoryIcon: '🧠',
        readTime: '7 min read',
        publishDate: 'November 20, 2024',
        tags: ['Technical Debt', 'Team Management', 'Scaling']
    },
    {
        id: '6',
        title: 'Weekly Reflection: What I Learned from Debugging Production Issues',
        excerpt: 'A candid look at the most challenging bugs I\'ve encountered this week and the lessons they taught me.',
        category: 'Editor\'s Notes',
        categoryIcon: '📝',
        readTime: '4 min read',
        publishDate: 'November 15, 2024',
        tags: ['Debugging', 'Production', 'Learning']
    }
];

const EssayCard = ({ essay }: { essay: Essay }) => {
    return (
        <article className="bg-newspaper-white border-2 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{essay.categoryIcon}</span>
                    <span className="text-xs text-accent-red font-mono uppercase tracking-wider">
                        {essay.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-newspaper font-bold text-black mb-3 leading-tight">
                    {essay.title}
                </h3>

                {/* Excerpt */}
                <p className="text-newspaper-gray font-newspaper leading-relaxed mb-4">
                    {essay.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {essay.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-newspaper-gray px-2 py-1 text-xs font-mono border border-gray-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-newspaper-gray font-mono border-t border-gray-300 pt-3">
                    <span>{essay.publishDate}</span>
                    <span>{essay.readTime}</span>
                </div>

                {/* Read More Button */}
                <div className="mt-4">
                    <a
                        href={`#essay-${essay.id}`}
                        className="inline-block border-2 border-black text-black px-4 py-2 text-sm font-newspaper-sans hover:bg-black hover:text-white transition-colors duration-200"
                    >
                        Read Full Article →
                    </a>
                </div>
            </div>
        </article>
    );
};

const Essays = () => {
    const featuredEssay = essays.find(e => e.featured);
    const otherEssays = essays.filter(e => !e.featured);

    return (
        <section id="essays" className="py-12 bg-newspaper-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-newspaper font-black text-black mb-4">
                        ESSAYS & REFLECTIONS
                    </h2>
                    <p className="text-lg text-newspaper-gray font-newspaper italic">
                        Opinion columns and weekly thoughts from the editor's desk
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                {/* Featured Essay */}
                {featuredEssay && (
                    <div className="mb-12">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-newspaper font-bold text-black uppercase tracking-wider">
                                Featured Column
                            </h3>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <EssayCard essay={featuredEssay} />
                        </div>
                    </div>
                )}

                {/* Category Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* The Backend Column */}
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-2">
                                ⚙️ The Backend Column
                            </h3>
                            <p className="text-sm text-newspaper-gray font-newspaper italic">
                                Technical deep dives and architecture insights
                            </p>
                        </div>
                        <div className="space-y-6">
                            {otherEssays
                                .filter(essay => essay.category === 'The Backend Column')
                                .map(essay => (
                                    <EssayCard key={essay.id} essay={essay} />
                                ))}
                        </div>
                    </div>

                    {/* Code & Culture */}
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-2">
                                🧠 Code & Culture
                            </h3>
                            <p className="text-sm text-newspaper-gray font-newspaper italic">
                                Team dynamics and developer well-being
                            </p>
                        </div>
                        <div className="space-y-6">
                            {otherEssays
                                .filter(essay => essay.category === 'Code & Culture')
                                .map(essay => (
                                    <EssayCard key={essay.id} essay={essay} />
                                ))}
                        </div>
                    </div>

                    {/* Editor's Notes */}
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-newspaper font-bold text-black mb-2">
                                📝 Editor's Notes
                            </h3>
                            <p className="text-sm text-newspaper-gray font-newspaper italic">
                                Weekly reflections and personal insights
                            </p>
                        </div>
                        <div className="space-y-6">
                            {otherEssays
                                .filter(essay => essay.category === 'Editor\'s Notes')
                                .map(essay => (
                                    <EssayCard key={essay.id} essay={essay} />
                                ))}
                        </div>
                    </div>
                </div>

                {/* Subscribe to Newsletter */}
                <div className="mt-12 text-center bg-gray-100 p-8 border-2 border-black">
                    <h3 className="text-2xl font-newspaper font-bold text-black mb-4">
                        Subscribe to The Engineer's Times
                    </h3>
                    <p className="text-newspaper-gray font-newspaper mb-6">
                        Get weekly insights on backend architecture, team culture, and engineering leadership delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 border-2 border-black text-black font-newspaper-sans focus:outline-none focus:ring-2 focus:ring-accent-red"
                        />
                        <button className="bg-accent-red text-white px-6 py-3 font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Essays; 
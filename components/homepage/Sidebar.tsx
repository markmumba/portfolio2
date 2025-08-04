'use client';

interface UpcomingArticle {
    id: string;
    title: string;
    category: string;
    estimatedDate: string;
}

const upcomingArticles: UpcomingArticle[] = [
    {
        id: '1',
        title: 'Building Resilient Microservices with Circuit Breakers',
        category: 'The Backend Column',
        estimatedDate: 'Next Week'
    },
    {
        id: '2',
        title: 'The Psychology of Code Reviews',
        category: 'Code & Culture',
        estimatedDate: 'In 2 Weeks'
    },
    {
        id: '3',
        title: 'My Experience with Event Sourcing',
        category: 'Tech Investigations',
        estimatedDate: 'In 3 Weeks'
    }
];

const Sidebar = () => {
    return (
        <aside className="hidden lg:block w-80 bg-newspaper-white border-l-4 border-black min-h-screen sticky top-0">
            <div className="p-6">

                {/* Upcoming Articles */}
                <div className="mb-8">
                    <h3 className="text-lg font-newspaper font-bold text-black mb-4 border-b-2 border-black pb-2">
                        Upcoming Articles
                    </h3>
                    <div className="space-y-4">
                        {upcomingArticles.map((article) => (
                            <div key={article.id} className="border-l-4 border-accent-red pl-3">
                                <h4 className="text-sm font-newspaper font-bold text-black mb-1">
                                    {article.title}
                                </h4>
                                <div className="text-xs text-newspaper-gray font-mono">
                                    {article.category} • {article.estimatedDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-accent-red text-white p-4 border-2 border-black">
                    <h3 className="text-lg font-newspaper font-bold mb-3">
                        Get in Touch
                    </h3>
                    <p className="text-newspaper-gray font-newspaper text-sm">
                        I&apos;m a backend engineer passionate about building reliable, scalable systems.
                    </p>
                    <a
                        href="mailto:mark@example.com"
                        className="inline-block bg-white text-accent-red px-4 py-2 text-sm font-newspaper-sans font-bold hover:bg-gray-100 transition-colors duration-200 border-2 border-white"
                    >
                        Send Message
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 
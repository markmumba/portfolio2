import { getEssays } from "@/lib/contentful";
import { EssayCard } from "@/components/shared/EssayCard";
import { Essays } from "@/lib/definition";
import Link from "next/link";

export default async function EssaysPage() {
    const essays = await getEssays();

    return (
        <div className="min-h-screen bg-newspaper-white">
            {/* Newspaper Header */}
            <header className="bg-white text-black py-8 border-b-4 border-black shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-newspaper font-black mb-2">
                            THE DAILY ESSAY
                        </h1>
                        <p className="text-lg font-newspaper-sans text-newspaper-gray">
                            Opinion columns and weekly thoughts from the editor&apos;s desk
                        </p>
                        <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Editorial Note */}
                    <div className="bg-gray-100 border-2 border-gray-300 p-6 mb-12 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl text-accent-red font-newspaper">📰</div>
                            <div>
                                <h2 className="text-xl font-newspaper font-bold text-black mb-2">
                                    EDITORIAL NOTE
                                </h2>
                                <p className="text-newspaper-gray font-newspaper leading-relaxed">
                                    Pro tip: At the end of each essay there is a random nugget from what I have read recently in terms of life, philosophy and the likes so don&apos;t get thrown off by it.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Essays Grid */}
                    {essays.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {essays.map((essay) => (
                                <EssayCard key={String(essay.id)} essay={essay as Essays} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-2xl font-newspaper font-bold text-black mb-2">
                                NO ESSAYS PUBLISHED
                            </h3>
                            <p className="text-newspaper-gray font-newspaper">
                                Check back soon for new articles from the editor&apos;s desk.
                            </p>
                        </div>
                    )}  

                    <div className="text-center">
                        <Link href="/" className="text-newspaper-gray font-newspaper">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}